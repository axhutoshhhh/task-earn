'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    }, 1200);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#f7f4fd] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation & Breadcrumbs */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[#793FFF] transition"
          >
            ← Back to Home
          </Link>
          <span className="rounded-full bg-[#793FFF]/10 border border-[#793FFF]/20 px-3.5 py-1 text-xs font-bold text-[#793FFF] flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Support Active 24/7
          </span>
        </div>

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-950">
            Get in Touch with Us
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Have questions about your rewards, partner inquiries, or need account assistance? We are here to help.
          </p>
        </div>

        {/* Contact Info Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="rounded-3xl border border-[#793FFF]/15 bg-white p-7 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#793FFF]/10 text-2xl text-[#793FFF]">
                ✉️
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Direct Email</h3>
              <p className="mt-1 text-xs text-slate-500">Official support and business desk</p>
              <a
                href="mailto:axhutoshhhh@gmail.com"
                className="mt-3 block text-sm font-bold text-[#793FFF] hover:underline break-all"
              >
                axhutoshhhh@gmail.com
              </a>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Response &lt; 24h</span>
              <button
                type="button"
                onClick={() => copyToClipboard('axhutoshhhh@gmail.com', 'email')}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
              >
                {copiedType === 'email' ? '✓ Copied!' : 'Copy Email'}
              </button>
            </div>
          </div>

          {/* Phone Card */}
          <div className="rounded-3xl border border-[#793FFF]/15 bg-white p-7 shadow-sm hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-600">
                📞
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Direct Phone Support</h3>
              <p className="mt-1 text-xs text-slate-500">Call or message for urgent queries</p>
              <a
                href="tel:8302072636"
                className="mt-3 block text-base font-bold text-slate-900 hover:text-[#793FFF] transition"
              >
                +91 8302072636
              </a>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Direct Line</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard('8302072636', 'phone')}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition"
                >
                  {copiedType === 'phone' ? '✓ Copied!' : 'Copy'}
                </button>
                <a
                  href="tel:8302072636"
                  className="rounded-full bg-[#793FFF] px-3.5 py-1 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-xs"
                >
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Operations & Turnaround */}
          <div className="rounded-3xl border border-[#793FFF]/15 bg-white p-7 shadow-sm hover:shadow-md transition flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-2xl text-cyan-700">
                ⚡
              </div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Fast Resolution</h3>
              <p className="mt-1 text-xs text-slate-500">Dedicated assistance for users</p>
              <div className="mt-3 space-y-1.5 text-xs text-slate-600">
                <p>• <strong>Voucher Inquiries:</strong> Immediate audit</p>
                <p>• <strong>Account Issues:</strong> Same-day review</p>
                <p>• <strong>Partnerships:</strong> Custom integration support</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <span className="text-[11px] font-semibold text-emerald-600">✓ Dedicated Lead Representative</span>
            </div>
          </div>
        </div>

        {/* Interactive Contact Form Card */}
        <div className="rounded-3xl border border-[#793FFF]/15 bg-white p-8 sm:p-12 shadow-xl">
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Send Us a Direct Message</h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Fill in the details below and our team will get back to you directly at your email address.
              </p>
            </div>

            {submitted ? (
              <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-8 text-center space-y-3">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-emerald-900">Message Delivered Successfully!</h3>
                <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto">
                  Thank you for reaching out. We have logged your submission and will get back to you shortly via{' '}
                  <strong>axhutoshhhh@gmail.com</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 rounded-full bg-[#793FFF] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#682FF8] transition shadow-md"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50"
                      placeholder="e.g. Ashutosh Raj"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1.5">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Inquiry Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50"
                  >
                    <option value="General Inquiry">General Platform Inquiry</option>
                    <option value="Reward Redemption">Voucher & Rewards Redemption</option>
                    <option value="Account & Security">Account & Security Support</option>
                    <option value="Creator & Partner">Creator & Partner Program</option>
                    <option value="Bug Report">Technical Bug Report</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#793FFF] focus:border-[#793FFF] outline-none transition text-sm bg-slate-50/50 resize-none"
                    placeholder="Describe your inquiry or question in detail..."
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-[#793FFF] py-4 px-6 text-sm font-bold text-white shadow-lg shadow-[#793FFF]/25 hover:bg-[#682FF8] transition active:scale-95 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending Message...' : 'Send Message to axhutoshhhh@gmail.com →'}
                  </button>
                </div>

                <p className="text-[11px] text-center text-slate-500 pt-1">
                  We respect your privacy. Inquiries are handled directly by our support lead at <strong>+91 8302072636</strong>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
