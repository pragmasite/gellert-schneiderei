import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const Contact = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });

  const contactInfo = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: "+41 61 311 65 38",
      href: "tel:+41613116538",
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: "shekhuahmad85@gmail.com",
      href: "mailto:shekhuahmad85@gmail.com",
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: "Hardstrasse 105, 4052 Basel, CH",
      href: "https://maps.google.com/?q=Hardstrasse+105,+4052+Basel",
    },
    {
      icon: Clock,
      label: "Öffnungszeiten",
      value: "Mo-Fr 09:00-18:30, Sa 09:00-14:00",
      href: "#hours",
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.contact.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            {t.contact.title1}
            <br />
            <span className="text-primary">{t.contact.title2}</span>
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            {t.contact.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  href={info.href}
                  whileHover={{ translateX: 8 }}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground font-medium">
                      {info.label}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden shadow-medium border h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2699.4238633450005!2d7.607237!3d47.549359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4791b5c5c5c5c5c5%3A0x5c5c5c5c5c5c5c5c!2sHardstrasse%20105%2C%204052%20Basel!5e0!3m2!1sen!2sch!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-primary/5 rounded-2xl p-8 border">
            <h3 className="font-serif text-2xl font-bold mb-4">
              Bereit für Ihre Änderungen?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-md mx-auto">
              Kontaktieren Sie uns noch heute für ein Angebot oder um einen Termin zu vereinbaren.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+41613116538"
                className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors gap-2"
              >
                <Phone className="h-5 w-5" />
                Jetzt anrufen
              </a>
              <a
                href="mailto:shekhuahmad85@gmail.com"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors gap-2"
              >
                <Mail className="h-5 w-5" />
                Email senden
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
