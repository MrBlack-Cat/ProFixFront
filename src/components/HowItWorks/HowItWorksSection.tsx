import SectionTitle from '../SectionTitle/SectionTitle';
import StepCard from './StepCard';

const steps: { step: string; text: string; direction: 'left' | 'right' }[] = [
    {
      step: '1. Post a Job',
      text: 'Describe your project and publish it for freelancers to apply.',
      direction: 'left',
    },
    {
      step: '2. Receive Proposals',
      text: 'Compare offers, review freelancer profiles, and chat directly.',
      direction: 'right',
    },
    {
      step: '3. Hire & Collaborate',
      text: 'Hire the best expert and manage your project with built-in tools.',
      direction: 'left',
    },
  ];
  

const HowItWorksSection = () => (
  <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-300 to-gray-400">
    <div className="max-w-6xl mx-auto px-2 text-center">
      <SectionTitle
        title="How It Works"
        subtitle="Getting started with ProFix is simple and intuitive."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-12">
        {steps.map((s, i) => (
          <StepCard key={i} {...s} />
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorksSection;
