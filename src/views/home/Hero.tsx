import { useState } from "react";
import ContactButton from "./components/ContactButton";
import SocialIcons from "../../components/SocialIcons";
import danielImage from "../../assets/DanielMartinez.webp";
import danielImageBlur from "../../assets/DanielMartinezBlur.webp";

export default function Hero() {
  const [blurLoaded, setBlurLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="flex items-start md:items-center md:pt-0">
      <div className="w-full">
        {/* Mobile & Desktop Layout */}
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-16 md:items-center">
          {/* Text Content */}
          <div className="mb-0 md:mb-0">
            <div className="space-y-2 md:space-y-6">
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
            </div>
            <ContactButton className="mt-4 md:mt-1" />
          </div>

          {/* Image Container */}
          <div className="md:justify-end justify-center flex">
            {/* Photo */}
            <div className="relative flex justify-center max-w-[250px] md:max-w-[300px]">
              {/* Low quality placeholder - stays in DOM, fades out */}
              <img
                src={danielImageBlur}
                alt=""
                className={`rounded-2xl w-full h-auto object-cover transition-opacity duration-700 ${
                  imageLoaded ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden="true"
                onLoad={() => setBlurLoaded(true)}
              />
              {/* High quality image - absolute positioned, fades in */}
              <img
                src={danielImage}
                alt="Daniel Martinez"
                className={`rounded-2xl w-full h-auto object-cover absolute inset-0 transition-opacity duration-700 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setImageLoaded(true)}
              />
              {/* Social Icons - Positioned absolutely on the left */}
              {blurLoaded && (
                <SocialIcons
                  direction="vertical"
                  size="sm"
                  className="absolute -left-12 bottom-5 flex"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
