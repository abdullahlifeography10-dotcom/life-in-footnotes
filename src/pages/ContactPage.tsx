import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Instagram, Facebook, Send, MapPin, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { content } = useContent();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Photo Collaboration / Story Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage('Please fill out all required fields before sending.');
      return;
    }
    setErrorMessage(null);

    setSubmitted(true);
    setTimeout(() => {
      setFormState({
        name: '',
        email: '',
        subject: 'Photo Collaboration / Story Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="py-12 md:py-20 max-w-7xl mx-auto px-6 w-full space-y-16">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#A9A77A] font-tech block">
          Get in Touch · Correspondence
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl text-[#071A12] dark:text-[#F1EBDD] font-normal tracking-tight">
          Say Hello & Share a Story
        </h1>
        <p className="text-sm sm:text-base text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed max-w-2xl">
          Whether you have a question about a photograph, want to collaborate on a travel story, or simply want to exchange thoughts about life and light in Bangladesh.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Social Media & Presence */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-[#F1EBDD] dark:bg-[#183526] p-6 sm:p-8 rounded-sm border border-[#344A3B] space-y-6 shadow-sm">
            <h2 className="font-editorial text-2xl text-[#071A12] dark:text-[#F1EBDD]">
              Creative Channels
            </h2>
            <p className="text-xs text-[#435547] dark:text-[#B7BDAF] font-light leading-relaxed">
              I share daily behind-the-scenes snapshots, stories, and raw unedited frames on social media.
            </p>

            <div className="space-y-4 pt-2">
              {/* Instagram */}
              <a
                href={`https://instagram.com/${content.profile.instagram}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3.5 bg-[#EBE2CF] dark:bg-[#10291D] hover:bg-[#A9A77A]/15 border border-[#344A3B] rounded-sm transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#071A12] text-[#A9A77A] border border-[#344A3B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Instagram className="w-5 h-5 text-[#A9A77A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#A9A77A] font-tech">Instagram</div>
                  <div className="text-sm text-[#071A12] dark:text-[#F1EBDD] font-medium truncate">
                    @{content.profile.instagram}
                  </div>
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-3.5 bg-[#EBE2CF] dark:bg-[#10291D] hover:bg-[#A9A77A]/15 border border-[#344A3B] rounded-sm transition-colors group shadow-xs"
              >
                <div className="w-10 h-10 rounded-full bg-[#071A12] text-[#A9A77A] border border-[#344A3B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Facebook className="w-5 h-5 text-[#A9A77A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#A9A77A] font-tech">Facebook Page</div>
                  <div className="text-sm text-[#071A12] dark:text-[#F1EBDD] font-medium truncate">
                    {content.profile.facebook}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-3.5 bg-[#EBE2CF] dark:bg-[#10291D] border border-[#344A3B] rounded-sm shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#071A12] text-[#A9A77A] border border-[#344A3B] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#A9A77A]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-[#A9A77A] font-tech">Location & Base</div>
                  <div className="text-sm text-[#071A12] dark:text-[#F1EBDD] font-light truncate">
                    {content.profile.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#10291D]/70 dark:bg-[#10291D] border border-[#344A3B] rounded-sm text-xs font-tech text-[#435547] dark:text-[#B7BDAF] leading-relaxed">
            Privacy notice: Direct email messages and collaboration inquiries are processed privately. Personal contact numbers are strictly guarded against unsolicited marketing.
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-[#F1EBDD] dark:bg-[#183526] p-6 sm:p-8 md:p-10 rounded-sm border border-[#344A3B] space-y-6 shadow-sm">
            <h2 className="font-editorial text-2xl sm:text-3xl text-[#071A12] dark:text-[#F1EBDD]">
              Send a Note
            </h2>

            {submitted ? (
              <div className="p-8 bg-[#10291D] border border-[#A9A77A]/40 rounded-sm text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h3 className="font-editorial text-2xl text-[#F1EBDD]">
                  Message Dispatched
                </h3>
                <p className="text-xs text-[#B7BDAF] max-w-sm mx-auto font-light leading-relaxed">
                  Thank you for reaching out. Your note has been received with warm regards. I will reply to your email as soon as lectures and photo walks permit.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-tech text-[#A9A77A] hover:text-[#F1EBDD] underline cursor-pointer"
                  >
                    Send another note
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs font-tech rounded-sm">
                    {errorMessage}
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sayeeda / Tanvir"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#EBE2CF] dark:bg-[#10291D] border border-[#344A3B] text-sm text-[#071A12] dark:text-[#F1EBDD] px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#EBE2CF] dark:bg-[#10291D] border border-[#344A3B] text-sm text-[#071A12] dark:text-[#F1EBDD] px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                    Topic
                  </label>
                  <select
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-[#EBE2CF] dark:bg-[#10291D] border border-[#344A3B] text-sm text-[#071A12] dark:text-[#F1EBDD] px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                  >
                    <option value="Photo Collaboration / Story Inquiry">Photo Collaboration / Story Inquiry</option>
                    <option value="Print or Frame Request">Print or Frame Request</option>
                    <option value="Travel Discussion">Travel Discussion</option>
                    <option value="General Greetings & Thoughts">General Greetings & Thoughts</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-tech text-[#A9A77A] mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Write your note, thoughts, or questions here..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#EBE2CF] dark:bg-[#10291D] border border-[#344A3B] text-sm text-[#071A12] dark:text-[#F1EBDD] px-3.5 py-2.5 rounded-sm focus:outline-none focus:border-[#A9A77A]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#A9A77A] hover:bg-[#b8b688] text-[#071A12] font-semibold text-xs tracking-wider uppercase rounded-sm transition-colors cursor-pointer flex items-center gap-2 shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>

                  <a
                    href={`mailto:${content.profile.email}?subject=${encodeURIComponent(formState.subject)}`}
                    className="text-xs text-[#A9A77A] hover:text-[#071A12] dark:hover:text-[#F1EBDD] font-tech transition-colors hidden sm:inline"
                  >
                    Or open email client directly
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
