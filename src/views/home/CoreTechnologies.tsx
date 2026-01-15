import { HomeSection } from './shared';

export default function CoreTechnologies() {
  return (
    <HomeSection
      subtitle="Core Technologies"
      title="Where I Am Expert"
      variant="secondary"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Add your technology categories here */}
        <p className="text-center text-fg-secondary col-span-full">
          Technology categories content goes here
        </p>
      </div>
    </HomeSection>
  );
}
