import React, { useState } from "react";
import {
  Mail,
  FileDown,
  Send,
  CheckCircle,
  Copy,
  Check,
  ArrowUp,
  Linkedin,
  Github,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { portfolioData } from "@/content/portfolio.ts";

export const ContactFooter: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sentNotice, setSentNotice] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [clipboardError, setClipboardError] = useState(false);

  const emailAddress = portfolioData.personal.email;
  const linkedinUrl = portfolioData.personal.linkedinUrl;
  const githubUrl = portfolioData.personal.githubUrl;

  const handleCopyEmail = async () => {
    if (navigator?.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(emailAddress);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } catch {
        setClipboardError(true);
      }
    } else {
      setClipboardError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${portfolioData.personal.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name || "Portfolio Visitor"}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSentNotice(true);
    setTimeout(() => setSentNotice(false), 5000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Contact Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 text-left">
          {/* Left Column: Three Prominent Contact Buttons & Resume */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
                Get In Touch
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
                Let&apos;s Connect
              </h2>
              <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-8">
                Feel free to reach out directly via email or connect with me on LinkedIn and GitHub.
              </p>

              {/* Three Contact Buttons */}
              <div className="flex flex-col gap-4 mb-8">
                {/* 1. Email Button with Copy Option */}
                <div className="flex items-center gap-2 p-2 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#4A9EFF]/50 transition-all">
                  <a
                    href={`mailto:${emailAddress}`}
                    className="flex-1 flex items-center gap-3.5 p-2 rounded-lg text-white hover:text-[#4A9EFF] transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4A9EFF]/15 text-[#4A9EFF] shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-white/50 uppercase font-medium">
                        Email
                      </div>
                      <div className="text-sm sm:text-base font-semibold">
                        {emailAddress}
                      </div>
                    </div>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label="Copy email address"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/15 bg-white/5 text-xs font-medium text-white/80 hover:bg-white/10 hover:text-white transition-all cursor-pointer mr-1"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-[#4A9EFF]" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                {clipboardError && (
                  <div className="text-xs text-white/60 pl-2">
                    Direct email: <span className="text-white font-mono select-all">{emailAddress}</span>
                  </div>
                )}

                {/* 2. LinkedIn Button */}
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#4A9EFF]/50 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0077B5]/20 text-[#0077B5] group-hover:bg-[#0077B5] group-hover:text-white transition-colors shrink-0">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-white/50 uppercase font-medium">
                        LinkedIn
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-white group-hover:text-[#4A9EFF] transition-colors">
                        linkedin.com/in/prathamesh-patil-900190336
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-[#4A9EFF] transition-colors shrink-0 mr-1" />
                </a>

                {/* 3. GitHub Button */}
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-[#4A9EFF]/50 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors shrink-0">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-white/50 uppercase font-medium">
                        GitHub
                      </div>
                      <div className="text-sm sm:text-base font-semibold text-white group-hover:text-[#4A9EFF] transition-colors">
                        github.com/pp9603395-max
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-white/40 group-hover:text-[#4A9EFF] transition-colors shrink-0 mr-1" />
                </a>
              </div>

              {/* Action: Download Resume Button */}
              <div>
                <Button
                  asChild
                  size="lg"
                  className="w-full sm:w-auto shadow-lg shadow-[#4A9EFF]/20"
                >
                  <a href={portfolioData.personal.resumeUrl} download="Prathamesh_Patil_Resume.pdf">
                    <FileDown className="mr-2 h-4 w-4" />
                    Download Resume (PDF)
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Email Composer (Client-Side mailto link) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-white/15 bg-[#161618]/90 p-7 sm:p-9 shadow-2xl backdrop-blur-xl">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Quick Email Composer
              </h3>
              <p className="text-sm text-white/60 mb-6">
                Fills and launches your default email client with your message pre-formatted, addressed directly to{" "}
                <span className="text-[#4A9EFF] font-mono">{portfolioData.personal.email}</span>.
              </p>

              {sentNotice && (
                <div className="mb-6 flex items-center gap-2 rounded-lg bg-[#4A9EFF]/10 border border-[#4A9EFF]/30 p-3 text-sm text-[#4A9EFF]">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Opening your mail app to dispatch your drafted message...</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-white/70 mb-1.5"
                  >
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#4A9EFF] focus:outline-none focus:ring-1 focus:ring-[#4A9EFF] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-white/70 mb-1.5"
                  >
                    Your Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="e.g. alex@company.com"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#4A9EFF] focus:outline-none focus:ring-1 focus:ring-[#4A9EFF] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-medium text-white/70 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="e.g. Project Collaboration / Opportunity"
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#4A9EFF] focus:outline-none focus:ring-1 focus:ring-[#4A9EFF] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-medium text-white/70 mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Write your note or project details here..."
                    className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#4A9EFF] focus:outline-none focus:ring-1 focus:ring-[#4A9EFF] transition-colors resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full justify-center shadow-lg shadow-[#4A9EFF]/20"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Compose in Email Client
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Formal Declaration from Resume */}
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 mb-16 text-left">
          <div className="text-xs uppercase tracking-widest text-[#4A9EFF] font-semibold mb-2">
            Formal Declaration
          </div>
          <blockquote className="text-xs sm:text-sm text-white/70 italic leading-relaxed">
            &ldquo;{portfolioData.personal.declaration}&rdquo;
          </blockquote>
          <div className="mt-3 flex items-center justify-between text-xs text-white/40">
            <span>— {portfolioData.personal.name}</span>
            <span>Sangli, Maharashtra</span>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white font-display">PP</span>
            <span>·</span>
            <span>© 2026 {portfolioData.personal.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#hero" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-white transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projects
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-[#4A9EFF] hover:underline cursor-pointer"
              aria-label="Scroll to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ContactFooter;
