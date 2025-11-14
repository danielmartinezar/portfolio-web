import { useState } from "react";
import ContactButton from "./components/ContactButton";
import SocialIcons from "../../components/SocialIcons";
import danielImage from "../../assets/DanielMartinez1.webp";
import danielImageBlur from "../../assets/DanielMartinez1.webp";

export default function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="flex items-start md:items-center pt-8 md:pt-0">
      <div className="w-full">
        {/* Mobile & Desktop Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center">
          {/* Text Content */}
          <div className="space-y-2 md:space-y-6 mb-0 md:mb-0">
            {/* Name with yellow underline */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-fg-primary leading-[1.1]">
                Daniel
                <br className="md:hidden" />
                <span className="hidden md:inline"> </span>
                Martinez.
              </h1>
              <div className="w-20 md:w-24 h-1 bg-primary"></div>
            </div>

            {/* Description */}
            <p className="text-base md:text-lg text-fg-secondary leading-relaxed">
              Hi! I'm a Mid-level Software Engineer, specialized in full stack
              development with Node.js and Flutter. I bring ideas to life
              through clean and scalable solutions.
            </p>
            <ContactButton />
          </div>

          {/* Image Container */}
          <div className="md:justify-end justify-center flex">
            {/* Photo */}
            <div className="relative flex justify-center max-w-[250px] md:max-w-[300px]">
              {/* Low quality placeholder - fades out then removed */}
              {!imageLoaded && (
                <img
                  src={danielImageBlur}
                  alt=""
                  className="rounded-2xl w-full h-auto object-cover transition-opacity duration-500"
                  aria-hidden="true"
                />
              )}
              {/* High quality image - fades in */}
              <img
                src={danielImage}
                alt="Daniel Martinez"
                className={`rounded-2xl w-full h-auto object-cover transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {/* Social Icons - Positioned absolutely on the left */}
              {imageLoaded && (
                <SocialIcons
                  direction="vertical"
                  size="sm"
                  className="absolute -left-12 bottom-0 flex"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
