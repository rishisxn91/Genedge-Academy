"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PRICING_CONFIG, formatPrice, getSavingsAmount, getSavingsPercentage } from "@/lib/pricing";

/**
 * GenEdge Academy – Conversion-Optimized Homepage (GMC-friendly)
 * - Broad audience positioning (students, professionals, freelancers, founders, lifelong learners)
 * - Psychology: anchoring, decoy pricing, scarcity, social proof, risk reversal
 * - GMC safety: no false income guarantees; clear CTAs; policy links
 * - Mobile-first, accessible, Lighthouse-friendly
 */

export default function Home() {
  // --- Scarcity: "seats left" (feature flag controlled) ---
  const [seats, setSeats] = useState(PRICING_CONFIG.scarcity.seatsLeft || 0);
  useEffect(() => {
    if (!PRICING_CONFIG.scarcity.enabled) return;
    const id = setInterval(() => setSeats((n) => (n > 12 ? n - Math.floor(Math.random() * 3) : n)), 15000);
    return () => clearInterval(id);
  }, []);

  // --- Countdown to end of offer (feature flag controlled) ---
  const end = useMemo(() => {
    if (PRICING_CONFIG.scarcity.countdownEnd) {
      return new Date(PRICING_CONFIG.scarcity.countdownEnd);
    }
    const now = new Date();
    const day = now.getDay(); // 0=Sun
    const daysToSun = (7 - day) % 7;
    const d = new Date(now);
    d.setDate(now.getDate() + (daysToSun || 7));
    d.setHours(23, 59, 59, 999);
    return d;
  }, []);
  const [remaining, setRemaining] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const diff = +end - +new Date();
      if (diff <= 0) return setRemaining("00:00:00");
      const h = Math.floor(diff / 3_600_000).toString().padStart(2, "0");
      const m = Math.floor((diff % 3_600_000) / 60_000).toString().padStart(2, "0");
      const s = Math.floor((diff % 60_000) / 1000).toString().padStart(2, "0");
      setRemaining(`${h}:${m}:${s}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);

  // --- Shared CTA handler (replace href with your checkout route/id later) ---
  const primaryHref = "/pricing"; // or your checkout link
  const onEnrollClick = () => {
    // optional: analytics/track
  };

  return (
    <main className="bg-gray-50 text-gray-900">
      {/* HERO */}
      <header className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 text-white">
        {/* Moving Live Icon */}
        <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse max-w-[90vw] text-center">
            ⏰ LIMITED TIME: 30% OFF Professional Plan - Ends Soon!
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 sm:pt-16 pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1 sm:gap-2 rounded-full border border-white/30 bg-white/10 px-2 sm:px-3 py-1 text-xs sm:text-sm/6">
              Launch Offer • Bilingual (EN + HI) {PRICING_CONFIG.scarcity.enabled && seats > 0 && `• Seats left: ${seats}`}
            </span>
            <h1 className="mt-4 sm:mt-6 text-balance text-2xl sm:text-4xl font-extrabold leading-tight md:text-6xl">
              AI Skills for Every Future — Learn, Apply, and Stay Ahead
            </h1>
            <p className="mt-3 sm:mt-4 text-pretty text-base sm:text-lg/8 opacity-95">
              From students to CEOs, master practical AI with self‑paced lessons, real projects, an AI doubt solver,
              and verified certificates. No fluff — just outcomes.
            </p>

            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-wrap sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex min-h-[44px] sm:min-h-12 items-center justify-center rounded-xl bg-yellow-400 px-4 sm:px-5 font-bold text-black hover:bg-yellow-300 text-sm sm:text-base"
              >
                Start Free Demo
              </Link>
              <Link
                href={primaryHref}
                onClick={onEnrollClick}
                className="inline-flex min-h-[44px] sm:min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-4 sm:px-5 font-semibold hover:bg-white/15 text-sm sm:text-base"
              >
                See Course Plans
              </Link>
              {PRICING_CONFIG.scarcity.enabled && (
                <span className="text-center sm:text-left text-xs sm:text-sm opacity-90 mt-2 sm:mt-0 sm:ml-2">
                  Offer ends in <strong aria-live="polite">{remaining}</strong>
                </span>
              )}
            </div>

            <dl className="mt-6 sm:mt-8 grid grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm opacity-95 sm:grid-cols-4">
              <div className="text-center sm:text-left">
                <dt className="font-semibold">Learners</dt>
                <dd>500+</dd>
              </div>
              <div className="text-center sm:text-left">
                <dt className="font-semibold">Courses</dt>
                <dd>25+</dd>
              </div>
              <div className="text-center sm:text-left">
                <dt className="font-semibold">Access</dt>
                <dd>100% self‑paced</dd>
              </div>
              <div className="text-center sm:text-left">
                <dt className="font-semibold">Fees</dt>
                <dd>₹0 hidden charges</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Made for Everyone</h2>
        <p className="mt-2 text-gray-600 text-center sm:text-left">
          Not just for techies — AI boosts outcomes in study, work, business, and life.
        </p>
        <div className="mt-6 sm:mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Students", desc: "Build future‑proof skills before you graduate." },
            { title: "Professionals", desc: "Automate routine tasks and save hours weekly." },
            { title: "Freelancers", desc: "Offer in‑demand AI services with confidence." },
            { title: "Business Owners", desc: "Use AI to grow revenue and cut costs." },
          ].map((c) => (
            <div key={c.title} className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-gray-200">
              <div className="text-base sm:text-lg font-semibold">{c.title}</div>
              <div className="mt-1 text-sm text-gray-600">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Your Journey to AI Mastery
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our proven 4-step learning path that has helped thousands of learners transform their careers with AI
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ge-300 to-transparent transform -translate-y-1/2 z-0"></div>
          
          <ol className="grid gap-6 sm:gap-8 md:grid-cols-4 relative z-10">
            {[
              {
                step: "1",
                title: "Foundation",
                subtitle: "Build Your Base",
                text: "Master AI fundamentals, prompt engineering, and essential tools. Get comfortable with ChatGPT, Claude, and other AI platforms.",
                icon: "🎯",
                color: "from-blue-500 to-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200"
              },
              {
                step: "2",
                title: "Specialize",
                subtitle: "Choose Your Path",
                text: "Pick your specialization: AI for Business, Content Creation, Productivity, or Development. Deep dive into your chosen domain.",
                icon: "🚀",
                color: "from-purple-500 to-purple-600",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200"
              },
              {
                step: "3",
                title: "Apply",
                subtitle: "Build & Deploy",
                text: "Create real-world projects and solutions. Build your portfolio with practical applications that showcase your AI skills.",
                icon: "⚡",
                color: "from-green-500 to-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200"
              },
              {
                step: "4",
                title: "Advance",
                subtitle: "Scale & Earn",
                text: "Earn your certificate, land opportunities, and scale your AI expertise. Start earning from your new skills immediately.",
                icon: "🏆",
                color: "from-orange-500 to-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200"
              }
            ].map((s, index) => (
              <li key={s.step} className="relative group">
                {/* Step Number Badge */}
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r ${s.color} text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {s.step}
                </div>
                
                {/* Main Card */}
                <div className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border-2 ${s.borderColor} ${s.bgColor} hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                    <div className="text-4xl sm:text-6xl">{s.icon}</div>
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-center mb-4">
                      <div className="text-3xl sm:text-4xl mb-2">{s.icon}</div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">{s.title}</h3>
                      <p className="text-sm sm:text-base font-medium text-gray-600">{s.subtitle}</p>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-center">
                      {s.text}
                    </p>
                    
                    {/* Progress Indicator */}
                    <div className="mt-6 flex justify-center">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              parseInt(s.step) >= step 
                                ? `bg-gradient-to-r ${s.color}` 
                                : 'bg-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl sm:rounded-3xl"></div>
                </div>
                
                {/* Arrow for Desktop */}
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center">
                      <svg className="w-4 h-4 text-ge-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-ge-600 to-ge-700 rounded-2xl p-6 sm:p-8 text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Ready to Start Your AI Journey?
            </h3>
            <p className="text-sm sm:text-base text-ge-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Join thousands of learners who have already transformed their careers with our proven learning path. Start with Step 1 today!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/catalog"
                className="btn-primary bg-white text-ge-600 hover:bg-gray-100"
              >
                Start Learning Now
              </Link>
              <Link
                href="/auth/signup"
                className="btn-outline border-white text-white hover:bg-white hover:text-ge-600"
              >
                Get Free Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO COURSES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Free Demo Courses</h2>
          <Link href="/catalog" className="text-indigo-700 hover:underline text-center sm:text-left">
            Browse all →
          </Link>
        </div>
        <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI Essentials & Prompt Engineering",
              desc: "Master generative AI and LLM basics, learn clear prompt writing and bias mitigation.",
              tag: "5 hours • Beginner • English/Hindi",
            },
            {
              title: "AI for Marketing & E-Commerce",
              desc: "Automate content creation, run AI-powered ad campaigns, perform segmentation and personalization.",
              tag: "7 hours • Intermediate • English/Hindi",
            },
            {
              title: "AI Productivity Tools & Workflow Automation",
              desc: "Integrate AI assistants (ChatGPT, Gemini) into everyday tasks. Master summarization and automation.",
              tag: "4 hours • Beginner • English/Hindi",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-gray-200"
            >
              <div className="text-base sm:text-lg font-semibold">{c.title}</div>
              <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
              <div className="mt-2 text-xs font-medium text-emerald-700">{c.tag}</div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link
                  href="/auth/signin"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-indigo-600 px-4 text-white hover:bg-indigo-500 text-sm"
                >
                  Start Free
                </Link>
                <Link
                  href="/course/cme7cx67g000413ofoxnp6dw4"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-gray-300 px-4 hover:bg-gray-50 text-sm"
                >
                  View Syllabus
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES BY GOAL */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Popular Paths by Goal</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "AI for Business Owners", line: "Automate marketing, sales & ops." },
            { title: "AI Productivity for Professionals", line: "Save hours every week." },
            { title: "AI Side Hustles", line: "Freelancing & content systems." },
            { title: "Prompt Engineering Mastery", line: "Communicate with AI like a pro." },
          ].map((c) => (
            <div key={c.title} className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-gray-200">
              <div className="text-base sm:text-lg font-semibold">{c.title}</div>
              <div className="mt-1 text-sm text-gray-600">{c.line}</div>
              <Link href="/catalog" className="mt-3 inline-block text-indigo-700 hover:underline">
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING – Decoy Effect (push Professional) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">Simple, Transparent Pricing</h2>
        <p className="mt-1 text-gray-600 text-center sm:text-left">No hidden charges. {PRICING_CONFIG.refundWindow}‑day refund policy.</p>
        <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Individual Course */}
          <Plan
            name="Individual Course"
            price="₹1,999 - ₹7,999"
            badge=""
            features={[
              "Single course access",
              "Certificate upon completion",
              "Self-paced learning",
              "Bilingual (English/Hindi)",
              "30-day refund policy",
            ]}
            cta={{ label: "Browse Courses", href: "/catalog" }}
          />
          {/* Membership (Most Popular) */}
          <Plan
            highlight
            name="Annual Membership"
            price={formatPrice(PRICING_CONFIG.membership.pricePaise)}
            badge={`🔥 Most Popular — Save ${getSavingsPercentage()}`}
            features={[
              "Unlimited access to all 5 courses",
              "Quarterly AI updates",
              "Verified certificates",
              "Premium community access",
              "Priority support",
            ]}
            cta={{ label: "Join Membership", href: "/checkout?plan=membership" }}
          />
          {/* Enterprise */}
          <Plan
            name="Enterprise"
            price="Custom"
            badge=""
            features={[
              "Team training programs",
              "Custom AI solutions",
              "Dedicated support",
              "Progress tracking",
              "Bulk pricing available",
            ]}
            cta={{ label: "Contact Sales", href: `mailto:${PRICING_CONFIG.contactEmail}` }}
          />
        </div>
        <p className="mt-4 text-sm text-gray-600 text-center sm:text-left">
          * Majority of learners pick <strong>Annual Membership</strong> for best value. Prices inclusive of taxes; terms apply.
        </p>
        <p className="mt-2 text-sm text-gray-600 text-center sm:text-left">
          Contact: <a href={`mailto:${PRICING_CONFIG.contactEmail}`} className="text-indigo-600 hover:underline">{PRICING_CONFIG.contactEmail}</a>
        </p>
      </section>

            {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-8 sm:pb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-center sm:text-left">What Learners Say</h2>
        <div className="mt-6 grid gap-4 sm:gap-6 md:grid-cols-3">
          {[
            { q: '"Implemented automation in my business within 2 months."', a: "Priya • Business Owner" },
            { q: '"My productivity doubled — my manager noticed."', a: "Anuj • Working Professional" },
            { q: '"Landed my first freelance project after the Professional plan."', a: "Sahil • Student" },
          ].map((t) => (
            <figure key={t.a} className="rounded-xl sm:rounded-2xl bg-white p-4 sm:p-5 shadow-sm ring-1 ring-gray-200">
              <blockquote className="text-balance text-sm sm:text-base">{t.q}</blockquote>
              <figcaption className="mt-3 text-xs sm:text-sm text-gray-600">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FOOTER – GMC trust */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 py-6 sm:py-8 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <div className="text-base sm:text-lg font-extrabold">GenEdge Academy</div>
            <div className="text-xs sm:text-sm text-gray-600">
              Transparent pricing • Secure checkout • {PRICING_CONFIG.refundWindow}‑day refunds
            </div>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-5 text-xs sm:text-sm text-gray-700">
            <Link href="/pricing" className="hover:underline">Pricing</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
            <Link href="/refund" className="hover:underline">Refund Policy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:underline">Privacy</Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

/* ---------- components ---------- */

function Plan({
  name,
  price,
  features,
  badge,
  cta,
  highlight,
}: {
  name: string;
  price: string;
  features: string[];
  badge?: string;
  cta: { label: string; href: string };
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "relative rounded-xl sm:rounded-2xl bg-white p-4 sm:p-6 shadow-sm ring-1 ring-gray-200",
        highlight ? "border-2 border-yellow-400 shadow-md" : "",
      ].join(" ")}
      aria-label={`${name} plan`}
    >
      {badge ? (
        <div className="absolute -top-2 sm:-top-3 left-2 sm:left-4 rounded-full bg-yellow-300 px-2 sm:px-3 py-1 text-xs font-bold text-black">
          {badge}
        </div>
      ) : null}
      <div className="text-base sm:text-lg font-bold">{name}</div>
      <div className="mt-1 text-2xl sm:text-3xl font-extrabold">{price}</div>
      <ul className="mt-3 space-y-2 text-xs sm:text-sm text-gray-700">
        {features.map((f) => (
          <li key={f}>✅ {f}</li>
        ))}
      </ul>
      <Link
        href={cta.href}
        className={[
          "mt-4 sm:mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 sm:px-5 py-2 sm:py-3 font-semibold min-h-[44px] sm:min-h-[48px] text-sm sm:text-base",
          highlight ? "bg-indigo-600 text-white hover:bg-indigo-500" : "border border-gray-300 hover:bg-gray-50",
        ].join(" ")}
      >
        {cta.label}
      </Link>
      <p className="mt-2 text-xs text-gray-500">No hidden charges. {PRICING_CONFIG.refundWindow}‑day refund policy.</p>
    </div>
  );
}
