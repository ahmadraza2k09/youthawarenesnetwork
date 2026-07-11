import { MessageCircle, BookOpen, Megaphone, Users, Award, TrendingUp } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const ACTIVITIES = [
  {
    icon: MessageCircle,
    title: 'Awareness Sessions',
    description: 'Interactive sessions covering education, careers, and scholarships to provide clear direction and informed decision-making.',
  },
  {
    icon: BookOpen,
    title: 'Guidance & Resources',
    description: 'Curated content and support to help students build strong profiles and access opportunities effectively.',
  },
  {
    icon: Megaphone,
    title: 'Digital Outreach',
    description: 'Strategic online initiatives to share relevant information, opportunities, and student-focused insights.',
  },
  {
    icon: Users,
    title: 'Global Exchange Programs',
    description: 'Virtual programs connecting youth internationally to promote cultural exchange and global perspective.',
  },
  {
    icon: Award,
    title: 'Community Engagement',
    description: 'Encouraging participation in meaningful initiatives and collaborative projects that create real impact.',
  },
  {
    icon: TrendingUp,
    title: 'Continuously Expanding',
    description: 'YAN is continuously expanding, with new initiatives focused on increasing access, reach, and impact.',
  },
];

export function ActivitiesSection() {
  return (
    <section id="activities" className="py-24 md:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="What We Do"
          title="Activities & Initiatives"
          subtitle="Structured programs designed to deliver practical guidance, awareness, and global exposure to students."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {ACTIVITIES.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
                <h3 className="text-[#1F2937] text-lg font-bold mb-2 text-center">{activity.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{activity.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-[#363636] text-white rounded-xl p-8 text-center">
          <p className="text-lg">
            <span className="font-accent font-semibold">Note:</span> Our journey is just beginning—more impactful activities will be added as YAN grows and expands its reach!
          </p>
        </div>
      </div>
    </section>
  );
}