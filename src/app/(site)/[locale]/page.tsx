import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import LeadMagnet from '@/components/LeadMagnet';
import Expert from '@/components/AboutExpert';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <Solution />
      <LeadMagnet />
      <Expert />
    </>
  );
}
