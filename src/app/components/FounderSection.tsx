import { SectionHeader } from './SectionHeader';

const FOUNDER_PHOTO_URL =
  'https://res.cloudinary.com/zse1lija/image/upload/v1795586997/PXL_20261119_081326611.RAW-01.COVER_v0f1ft.jpg';

export function FounderSection() {
  return (
    <section id="founder" className="scroll-mt-20 py-24 md:py-28 px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Founder's Message"
          title="About the Founder"
          subtitle="Meet the vision and commitment driving Youth Awareness Network forward."
        />

        <div className="max-w-5xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-center">
            {/* Founder Portrait */}
            <div className="md:col-span-5">
              <div className="aspect-[4/5] max-w-xs mx-auto md:max-w-none w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                <img
                  src={FOUNDER_PHOTO_URL}
                  alt="Muhammad Ahmad Raza — Founder of Youth Awareness Network"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Single Paragraph Bio & Message */}
            <div className="md:col-span-7">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#1F2937] mb-1">
                Muhammad Ahmad Raza
              </h3>
              <p className="text-sm font-medium text-gray-500 mb-5">
                Founder, Youth Awareness Network · Pakistan
              </p>

              <p className="text-gray-700 text-base sm:text-[17px] leading-relaxed">
                <strong className="text-[#1F2937] font-semibold">Muhammad Ahmad Raza</strong> is a 17-year-old student, youth leader, and technology enthusiast from Pakistan. He is the founder of <strong className="text-[#1F2937] font-semibold">Youth Awareness Network (YAN)</strong>, built on a simple belief: every young person should have access to knowledge, opportunities, and the tools they need to grow. He has also founded{' '}
                <a
                  href="https://www.ahmadmart.store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#1F2937] underline decoration-[#363636]/45 underline-offset-4 hover:text-[#363636] hover:decoration-[#363636] transition-colors"
                >
                  Ahmad Mart
                </a>
                , a zero-commission marketplace supporting small sellers, and{' '}
                <a
                  href="https://credento.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#1F2937] underline decoration-[#363636]/45 underline-offset-4 hover:text-[#363636] hover:decoration-[#363636] transition-colors"
                >
                  Credento
                </a>
                , a student networking platform that helps young people connect, share their abilities, and collaborate with like-minded peers. His vision is to use <strong className="text-[#1F2937] font-semibold">knowledge, technology, and collaboration to turn opportunities into real change</strong>, especially for young people and organisations who may not have easy access to them. Ahmad has been recognised as a <strong className="text-[#1F2937] font-semibold">Top 100 Emerging Innovator by the University of Delaware</strong> and a <strong className="text-[#1F2937] font-semibold">Top 100 Global Student Leader by Volunteer Force Pakistan</strong>, and he is also an alumnus of the <strong className="text-[#1F2937] font-semibold">U.S. Department of State’s English Access Microscholarship Program</strong>. Through YAN, he continues to learn, build, and create opportunities for others.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
