import Hero from '@/components/Hero';
import ServicesGrid from '@/components/ServicesGrid';
import WhyUsCards from '@/components/WhyUsCards';
import ProcessSteps from '@/components/ProcessSteps';
import AboutExpert from '@/components/AboutExpert';
import CTASection from '@/components/CTASection';
import LeadMagnet from '@/components/LeadMagnet';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServicesGrid />
      <WhyUsCards count={4} />
      <ProcessSteps namespace="Home" />
      <AboutExpert />
      <CTASection namespace="Home" />
      <LeadMagnet />
    </main>
  );
}
