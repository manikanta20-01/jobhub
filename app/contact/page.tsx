'use client';

import { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

// WhatsApp number - replace with your actual number
const WHATSAPP_NUMBER = "919876543210"; // Format: country code + number without +

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Construct WhatsApp message
    const message = encodeURIComponent(
      `Hello! I'm ${formData.name}\n\n` +
        `Email: ${formData.email}\n` +
        `Subject: ${formData.subject || 'General Inquiry'}\n\n` +
        `Message:\n${formData.message}\n\n` +
        `Sent via JobsHub Contact Form`
    );

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

    // Show success state briefly before redirect
    setIsSubmitted(true);

    // Redirect to WhatsApp after a short delay
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsLoading(false);
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Have a question or feedback? We&apos;d love to hear from you. Send us a
          message and we&apos;ll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
            <p className="text-gray-600 text-sm">support@jobshub.in</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Call Us</h3>
            <p className="text-gray-600 text-sm">+91-98765-43210</p>
            <p className="text-gray-500 text-xs mt-1">Mon-Sat, 9 AM - 6 PM</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Visit Us</h3>
            <p className="text-gray-600 text-sm">
              JobsHub Technologies Pvt Ltd
              <br />
              123 Tech Park, Whitefield
              <br />
              Bangalore - 560066
            </p>
          </div>

          {/* WhatsApp Quick Contact */}
          <Link
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello! I'm interested in job listings.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-xl border border-green-200 transition-colors"
          >
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Chat on WhatsApp</p>
              <p className="text-xs text-gray-500">Quick response guaranteed</p>
            </div>
          </Link>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-600 mb-4">
                  Redirecting you to WhatsApp to complete your message...
                </p>
                <div className="animate-pulse flex items-center justify-center gap-2 text-green-600">
                  <MessageCircle className="w-5 h-5" />
                  <span>Opening WhatsApp...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Send us a Message
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Fill out the form below and we&apos;ll redirect you to WhatsApp
                    with your message pre-filled.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Send via WhatsApp
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 mt-4">
                    By submitting this form, you&apos;ll be redirected to WhatsApp
                    with your message pre-filled. Standard data rates may apply.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
