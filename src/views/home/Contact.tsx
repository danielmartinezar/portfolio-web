import { HomeSection } from './shared';

export default function Contact() {
  return (
    <HomeSection
      subtitle="Lets Talk"
      title="Ways To Contact me"
      variant="primary"
    >
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {/* Add your contact methods here */}
        <p className="text-center text-fg-secondary">
          Contact methods content goes here
        </p>
      </div>
    </HomeSection>
  );
}
