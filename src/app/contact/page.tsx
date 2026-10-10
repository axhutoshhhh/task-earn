"use client";

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional form for now
    alert("This form is not yet connected. Please email us directly.");
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f7f4fd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-4 text-slate-900">Contact Us</h1>
        
        <p className="text-slate-600 mb-8">
          This form is not yet connected. For now, please reach out via email at <a href="mailto:support@taskearn.com" className="text-[#793FFF] font-semibold hover:underline">support@taskearn.com</a>.
        </p>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#793FFF]/15">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              id="message"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#793FFF] py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/25 hover:bg-[#682FF8] transition active:scale-95"
          >
            Send Message →
          </button>
        </form>
      </div>
    </div>
  </div>
  );
}
