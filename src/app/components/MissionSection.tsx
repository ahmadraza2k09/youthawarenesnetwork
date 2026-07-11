import { BookOpen, Users, Award, Heart } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const MISSIONS = [
  {
    icon: BookOpen,
    title: 'Education & Critical Thinking',
    description: 'Equipping students with clear knowledge, direction, and decision-making skills for academic and career growth.',
  },
  {
    icon: Users,
    title: 'Awareness & Opportunity Access',
    description: 'Bridging information gaps by sharing relevant opportunities, resources, and guidance often inaccessible to many students.',
  },
  {
    icon: Award,
    title: 'Leadership & Global Engagement',
    description: 'Developing confident individuals through collaboration, virtual exchange programs, and international exposure.',
  },
  {
    icon: Heart,
    title: 'Holistic Growth',
    description: 'Supporting academic, personal, and professional development to prepare youth for real-world challenges.',
  },
];

export function MissionSection() {
  return (
    <section id="mission" className="py-24 md:py-28 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Our Purpose"
          title="Our Mission"
          subtitle="To provide free access to awareness, guidance, and global opportunities, enabling youth to make informed decisions and grow beyond limitations."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {MISSIONS.map((mission) => {
            const Icon = mission.icon;
            return (
              <div
                key={mission.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-5">
                  <div className="bg-[#363636] p-4 rounded-xl flex-shrink-0">
                    <Icon className="text-white" size={28} />
                  </div>
                  <div>
                    <h3 className="text-[#1F2937] text-xl font-bold mb-2">{mission.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{mission.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}