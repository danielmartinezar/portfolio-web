import { HomeSection } from './shared';

export default function Portfolio() {
  return (
    <HomeSection
      subtitle="Portfolio"
      title="What I've Worked On"
      variant="primary"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Add your portfolio project cards here */}
        <p className="text-center text-fg-secondary col-span-full">
          Portfolio projects content goes here
        </p>
      </div>
    </HomeSection>
  );
}
