"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const images = [
    "https://res.cloudinary.com/dzifkqomf/image/upload/v1764333191/home_wpipca.avif",
    "https://res.cloudinary.com/dzifkqomf/image/upload/v1764354052/home2_wykgxz.avif",
    "https://res.cloudinary.com/dzifkqomf/image/upload/v1764354052/photo-1582467029039-e3b110cbe8d9_abn3nd.avif",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={img}
              alt="Auto de lujo"
              fill
              className="object-cover"
              priority={idx === current}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      <div className="relative z-10 text-center space-y-8 px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          {t("home.title")}
          <br />
          <span className="text-muted-foreground">{t("home.subtitle")}</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t("home.slogan")}
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full transition ${
              idx === current ? "bg-white w-8" : "bg-white/50 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;