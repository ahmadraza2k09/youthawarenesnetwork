import { Users, Award, TrendingUp } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const PILLARS = [
  {
    icon: Users,
    title: 'Youth-Led',
    description: 'Driven by young individuals who understand real challenges, ensuring relevant solutions and authentic impact.',
  },
  {
    icon: Award,
    title: 'Action-Oriented',
    description: 'Focused on delivering practical awareness, structured guidance, and real opportunities—not just ideas.',
  },
  {
    icon: TrendingUp,
    title: 'Growth-Focused',
    description: 'Committed to supporting academic, personal, and professional development through continuous learning and exposure.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Who We Are"
          title="About Us"
          subtitle="Discover the story behind our mission to empower and inspire the next generation."
        />

        <div className="bg-gray-50 p-8 md:p-10 rounded-xl border border-gray-200 mb-16 max-w-4xl mx-auto">
          <p className="text-gray-700 text-lg mb-5 leading-relaxed">
            <span className="text-[#363636] font-semibold">Youth Awareness Network (YAN)</span> is a youth-led initiative focused on providing free access to awareness, guidance, and global opportunities for students, especially those with limited resources or direction.
          </p>
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            We support young individuals in understanding their academic and career paths, building strong profiles, and connecting with international peers through structured programs and virtual exchanges.
          </p>
          <p className="font-accent text-[#363636] text-2xl font-semibold text-center">
            Lead by Youth to Lead Youth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-xl p-8 text-center border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="text-[#1F2937] text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}