import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Problem from '@/components/Problem';
import Solution from '@/components/Solution';
import LeadMagnet from '@/components/LeadMagnet';
import AboutExpert from '@/components/AboutExpert';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <LeadMagnet />
      <AboutExpert />
      <Footer />
    </main>
  );
}