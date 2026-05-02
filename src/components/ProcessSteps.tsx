interface ProcessStepsProps {
  t: (key: string) => string;
}

export default function ProcessSteps({ t }: ProcessStepsProps) {
  // Support two formats:
  // 1. Home: processTitle + processStep{N}Title + processStep{N}Desc
  // 2. ServiceCommon: howTitle + howSteps (comma-separated, "title — desc" format)
  let title: string;
  const stepList: Array<{ title: string; desc: string }> = [];

  // Try Home-style format first
  const step1Title = t('processStep1Title');
  if (step1Title) {
    // Home-style
    title = t('processTitle');
    for (let i = 1; i <= 6; i++) {
      const stepTitle = t(`processStep${i}Title`);
      const stepDesc = t(`processStep${i}Desc`);
      if (stepTitle && stepDesc) {
        stepList.push({ title: stepTitle, desc: stepDesc });
      }
    }
  } else {
    // ServiceCommon-style
    title = t('howTitle');
    const stepsText = t('howSteps');
    const steps = stepsText.split(',').map((s: string) => s.trim());
    for (const step of steps) {
      const [stepTitle, ...descParts] = step.split(' — ');
      const desc = descParts.join(' — ');
      stepList.push({ title: stepTitle, desc });
    }
  }

  const gridClass = stepList.length <= 2 ? 'md:grid-cols-2' : stepList.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4';

  return (
    <section className="py-16 bg-bg-ice">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-navy mb-12 text-center">{title}</h2>
        <div className={`grid ${gridClass} gap-8`}>
          {stepList.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <div className="w-10 h-10 bg-accent-blue text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-primary-navy mb-2">{step.title}</h3>
                <p className="text-text-muted text-sm">{step.desc}</p>
              </div>
              {i < stepList.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 border-t-2 border-dashed border-accent-gold" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
