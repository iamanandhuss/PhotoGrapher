interface SectionHeaderProps {
  tag: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  tag,
  title,
  titleHighlight,
  subtitle,
  align = 'center',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  const renderTitle = () => {
    if (!titleHighlight) return title;
    const parts = title.split(titleHighlight);
    return (
      <>
        {parts[0]}
        <em className="text-[#c8a97e] not-italic">{titleHighlight}</em>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`mb-14 ${isCenter ? 'text-center' : 'text-left'}`}>
      <div className={`flex items-center gap-3 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <div className="w-8 h-px bg-[#c8a97e]" />
        <span className="text-[#c8a97e] text-xs font-semibold tracking-[0.3em] uppercase">{tag}</span>
        <div className="w-8 h-px bg-[#c8a97e]" />
      </div>
      <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-semibold text-white leading-[1.15] mb-4">
        {renderTitle()}
      </h2>
      {subtitle && (
        <p className={`text-[#8a8a82] text-base leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-lg'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
