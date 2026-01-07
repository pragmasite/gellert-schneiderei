import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const Services = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [expandedCategory, setExpandedCategory] = useState<number | null>(0);

  return (
    <section id="services" ref={ref} className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.services.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            {t.services.title}
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            {t.services.description}
          </p>
        </motion.div>

        {/* Services Categories */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {t.services.items.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="bg-background rounded-xl border shadow-soft overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedCategory(
                    expandedCategory === categoryIndex ? null : categoryIndex
                  )
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="font-serif text-lg font-bold text-primary">
                  {category.title}
                </h3>
                <motion.div
                  animate={{
                    rotate: expandedCategory === categoryIndex ? 180 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5" />
                </motion.div>
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: expandedCategory === categoryIndex ? "auto" : 0,
                  opacity: expandedCategory === categoryIndex ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 space-y-3 border-t">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-start justify-between gap-4 pb-3 last:pb-0"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {item.desc}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-primary whitespace-nowrap">
                        {item.price}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Service Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-foreground/70 mb-4">
            Benötigen Sie ein Angebot für Ihre Änderungen?
          </p>
          <a
            href="tel:+41613116538"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Kontaktieren Sie uns
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
