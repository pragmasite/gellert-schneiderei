import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Clock, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Hours = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  // Opening hours based on business data
  const schedule = [
    { hours: "09:00 - 12:15, 14:00 - 18:30" }, // Monday
    { hours: "09:00 - 12:15, 14:00 - 18:30" }, // Tuesday
    { hours: "09:00 - 12:15, 14:00 - 18:30" }, // Wednesday
    { hours: "09:00 - 12:15, 14:00 - 18:30" }, // Thursday
    { hours: "09:00 - 12:15, 14:00 - 18:30" }, // Friday
    { hours: "09:00 - 14:00" }, // Saturday
    { hours: t.hours.closed }, // Sunday
  ];

  const todayIndex = new Date().getDay();
  // JavaScript getDay: 0 = Sunday, 1 = Monday, etc.
  // We want: 0 = Monday, 1 = Tuesday, ..., 6 = Sunday
  const adjustedTodayIndex = (todayIndex + 6) % 7;

  return (
    <section id="hours" ref={ref} className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.hours.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            {t.hours.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-xl rounded-2xl border bg-background shadow-soft overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b bg-primary/5 px-6 py-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-serif text-lg font-bold">
              {t.hours.header}
            </span>
          </div>

          {/* Hours List */}
          <div className="divide-y">
            {schedule.map((item, i) => {
              const isToday = i === adjustedTodayIndex;
              const isClosed = item.hours === t.hours.closed;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.05 }}
                  className={`px-6 py-4 flex justify-between items-center transition-colors ${
                    isToday ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isToday && (
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    )}
                    <span
                      className={`${
                        isToday ? "font-bold text-primary" : "font-medium"
                      }`}
                    >
                      {t.hours.days[i]}
                    </span>
                    {isToday && (
                      <span className="text-xs bg-primary/20 text-primary px-2.5 py-1 rounded-full font-medium">
                        {t.hours.today}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      isClosed ? "text-muted-foreground" : "font-medium"
                    }`}
                  >
                    {item.hours}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="px-6 py-4 bg-muted/30 text-center text-xs text-muted-foreground">
            Montag bis Freitag Mittagspause 12:15 - 14:00
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-foreground/70 mb-4">
            Haben Sie noch Fragen zu unseren Öffnungszeiten?
          </p>
          <a
            href="tel:+41613116538"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Rufen Sie uns an
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hours;
