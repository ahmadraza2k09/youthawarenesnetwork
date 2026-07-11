import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import { SectionHeader } from './SectionHeader';

const CONTACT_METHODS = [
  {
    icon: Mail,
    title: 'Email',
    content: 'youthawarenessnetwork@gmail.com',
    href: 'mailto:youthawarenessnetwork@gmail.com',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    content: '+92 340 5463601',
    href: 'https://wa.me/923405463601',
  },
  {
    icon: MapPin,
    title: 'Location',
    content: 'Pakistan',
    href: null,
  },
];

export function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formData = new FormData();
      formData.append('name', formState.name);
      formData.append('email', formState.email);
      formData.append('message', formState.message);

      const response = await fetch('https://formspree.io/f/xrejbekg', {
        method: 'POST',
        body: formData,
        redirect: 'manual',
      });

      if (response.status === 303 || response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 4000);
      } else {
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 4000);
      }
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 md:py-28 px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Let's Talk"
          title="Contact Us"
          subtitle="Have questions or want to get involved? We're here to connect, collaborate, and create change together."
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {CONTACT_METHODS.map((item) => {
            const Icon = item.icon;
            const content = item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-gray-600 hover:text-[#363636] transition-colors break-all"
              >
                {item.content}
              </a>
            ) : (
              <p className="text-gray-600">{item.content}</p>
            );

            return (
              <div
                key={item.title}
                className="bg-white rounded-xl p-8 text-center border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex justify-center mb-5">
                  <div className="bg-[#363636] p-4 rounded-xl">
                    <Icon className="text-white" size={28} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1F2937] mb-3">{item.title}</h3>
                <div className="text-base">{content}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 rounded-xl p-8 md:p-10 max-w-3xl mx-auto border border-gray-200 mb-12">
          <h3 className="text-2xl font-bold text-[#1F2937] mb-6 text-center">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#363636]/20 focus:border-[#363636] transition-colors resize-none"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#363636] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-[#4a4a4a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              <Send size={20} />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {submitStatus === 'success' && (
              <p className="text-center text-green-600 font-semibold">
                ✓ Message sent successfully! Thank you for reaching out.
              </p>
            )}
            {submitStatus === 'error' && (
              <p className="text-center text-red-600 font-semibold">
                ✗ Failed to send message. Please try again.
              </p>
            )}
          </form>
        </div>

        <div className="bg-[#363636] rounded-xl p-8 md:p-10 text-white text-center max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-3">Ready to Make a Difference?</h3>
          <p className="text-lg mb-6 leading-relaxed text-gray-200">
            Whether you want to join YAN, collaborate on projects, or simply learn more about our mission, we'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:youthawarenessnetwork@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#363636] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <Mail size={18} />
              Send Email
            </a>
            <a
              href="https://wa.me/923405463601"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#363636] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}