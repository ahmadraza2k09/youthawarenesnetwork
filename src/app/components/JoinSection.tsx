import { Users, Target, CheckCircle, Lightbulb, Heart, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';

interface JoinSectionProps {
  onContactClick: () => void;
}

const JOIN_CARDS = [
  {
    icon: Target,
    title: 'Why Join YAN?',
    items: ['Build leadership skills', 'Create social impact', 'Learn through real activities', 'Network with like-minded youth'],
  },
  {
    icon: Users,
    title: 'Who Can Apply?',
    items: ['Students', 'Young professionals', 'Volunteers passionate about awareness', 'Anyone committed to social change'],
  },
  {
    icon: Lightbulb,
    title: "What You'll Do",
    items: ['Awareness campaigns', 'Research & content writing', 'Community activities', 'Educational workshops'],
  },
];

export function JoinSection({ onContactClick }: JoinSectionProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('message', formData.message);

      const response = await fetch('https://formspree.io/f/xrejbekg', {
        method: 'POST',
        body: formDataToSend,
        redirect: 'manual',
      });

      if (response.status === 303 || response.ok) {
        setIsSubmitted(true);
      } else {
        console.error('Form submission failed', response.status, response.statusText);
        setIsSubmitted(false);
      }
    } catch (err) {
      console.error('Form submission error', err);
      setIsSubmitted(false);
    }

    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="join" className="py-24 md:py-28 px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Get Involved"
          title="Join Us"
          subtitle="If you're a student or young individual eager to learn, grow, and contribute to society, we welcome you to join Youth Awareness Network. Together, we create awareness and drive positive change."
        />

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {JOIN_CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-5 text-center text-[#1F2937]">{card.title}</h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-gray-600">
                      <CheckCircle className="text-[#363636] flex-shrink-0 mt-1" size={18} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 md:p-10 border border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-[#1F2937] mb-2">Application Form</h3>
            <p className="text-gray-600">Fill out the form below to join our network</p>
          </div>

          {isSubmitted ? (
            <div className="bg-[#363636] text-white rounded-xl p-10 text-center">
              <div className="flex justify-center mb-4">
                <Heart className="text-white" size={48} />
              </div>
              <h4 className="text-2xl font-bold mb-2">Thank You!</h4>
              <p className="text-lg">We've received your application. We'll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter your full name' },
                { name: 'email', label: 'Email Address', type: 'email', placeholder: 'your.email@example.com' },
                { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+92 XXX XXXXXXX' },
              ].map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="block mb-2 text-sm font-medium text-gray-700">
                    {field.label} *
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  Tell us why you want to join Youth Awareness Network *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors resize-none"
                  placeholder="Tell us about your motivation, skills, and how you'd like to contribute to YAN..."
                />
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-[#363636] text-white px-10 py-3.5 rounded-lg font-semibold hover:bg-[#4a4a4a] transition-colors"
                >
                  Submit Application
                  <ArrowRight size={20} />
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-2">Have questions before applying?</p>
          <button onClick={onContactClick} className="text-[#363636] font-semibold hover:underline">
            Contact Us Directly →
          </button>
        </div>
      </div>
    </section>
  );
}