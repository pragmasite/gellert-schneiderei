import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";

const Gallery = () => {
  const { t } = useLanguage();
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Placeholder gallery items - in real scenario these would be actual images
  const images = [
    { id: 1, alt: "Änderung Hosen", color: "bg-primary/20" },
    { id: 2, alt: "Änderung Jacke", color: "bg-accent/20" },
    { id: 3, alt: "Änderung Kleid", color: "bg-primary/10" },
    { id: 4, alt: "Reparaturarbeit", color: "bg-secondary/20" },
    { id: 5, alt: "Massgeschneidert", color: "bg-primary/15" },
    { id: 6, alt: "Vorhänge", color: "bg-accent/10" },
  ];

  return (
    <section id="gallery" ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="text-sm uppercase tracking-widest text-primary">
            {t.gallery.label}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl mt-2">
            {t.gallery.title}
          </h2>
          <p className="text-foreground/70 mt-4 max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <motion.button
              key={image.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl bg-muted"
              whileHover={{ scale: 1.02 }}
            >
              {/* Placeholder with gradient */}
              <div className={`h-full w-full ${image.color} flex items-center justify-center`} />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Label */}
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-medium text-white">{image.alt}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Full Screen Image Viewer */}
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white text-2xl font-bold hover:text-accent transition-colors"
              >
                ✕
              </button>
              <div
                className={`w-full aspect-[4/3] ${images[selectedImage].color} rounded-lg flex items-center justify-center`}
              />
              <p className="text-center text-white mt-4">
                {images[selectedImage].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
