'use client';

import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Page() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for your message! We will get back to you soon.', {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    e.currentTarget.reset();
  };

  return (
    <main className="min-h-screen bg-gradient-to-tr from-emerald-100 via-white to-blue-100 text-emerald-900 px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h1 className="text-5xl font-extrabold text-emerald-800 tracking-tight mb-3 drop-shadow-md">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Have questions, ideas, or want to collaborate? We’d love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column: Contact Info */}
          <div className="space-y-10 bg-white rounded-3xl p-10 shadow-xl border border-green-200">
            <ContactItem icon={<MapPin className="w-7 h-7 text-emerald-600 animate-pulse" />} title="Our Office">
              123 Greenway Lane<br />Eco City, Earth 1010
            </ContactItem>

            <ContactItem icon={<Phone className="w-7 h-7 text-emerald-600 animate-pulse delay-75" />} title="Phone">
              +1 (800) 123-4567
            </ContactItem>

            <ContactItem icon={<Mail className="w-7 h-7 text-emerald-600 animate-pulse delay-150" />} title="Email">
              contact@climateaware.org
            </ContactItem>

            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-6 text-gray-600">
                <SocialIcon href="#" color="text-blue-500"><Twitter className="w-7 h-7 hover:scale-110 transition-transform" /></SocialIcon>
                <SocialIcon href="#" color="text-blue-700"><Facebook className="w-7 h-7 hover:scale-110 transition-transform" /></SocialIcon>
                <SocialIcon href="#" color="text-pink-600"><Instagram className="w-7 h-7 hover:scale-110 transition-transform" /></SocialIcon>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <form
            className="bg-white rounded-3xl p-10 shadow-xl border border-emerald-200 flex flex-col gap-6"
            onSubmit={handleSubmit}
          >
            <InputField label="Full Name" id="name" type="text" placeholder="John Doe" required />
            <InputField label="Email Address" id="email" type="email" placeholder="you@example.com" required />
            <InputField label="Message" id="message" as="textarea" placeholder="Your message..." rows={5} required />

            <button
              type="submit"
              className="mt-4 bg-emerald-600 text-white font-semibold py-3 rounded-2xl shadow-md hover:bg-emerald-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </main>
  );
}

function ContactItem({ icon, title, children }) {
  return (
    <div className="flex gap-5 items-start">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h4 className="text-lg font-semibold text-emerald-800 mb-1">{title}</h4>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{children}</p>
      </div>
    </div>
  );
}

function SocialIcon({ href, color, children }) {
  return (
    <a href={href} className={`${color} hover:opacity-80 transition-opacity`} aria-label="Social media link" target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

function InputField({ label, id, type = 'text', placeholder, as = 'input', rows, required }) {
  const Tag = as;
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2 font-medium text-gray-700">
        {label}
      </label>
      <Tag
        id={id}
        type={type}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className="resize-none px-5 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-300 transition"
      />
    </div>
  );
}
