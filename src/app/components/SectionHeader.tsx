interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="text-center mb-16 max-w-2xl mx-auto">
      <span className="font-accent block text-sm font-semibold uppercase tracking-widest text-[#363636] mb-3">
        {eyebrow}
      </span>
      <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
