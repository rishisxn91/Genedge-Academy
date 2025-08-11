"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

/**
 * GenEdge Academy – Conversion-Optimized Homepage (GMC-friendly)
 * - Broad audience positioning (students, professionals, freelancers, founders, lifelong learners)
 * - Psychology: anchoring, decoy pricing, scarcity, social proof, risk reversal
 * - GMC safety: no false income guarantees; clear CTAs; policy links
 * - Mobile-first, accessible, Lighthouse-friendly
 */

const SEATS_START = 200;

export default function Home() {
  // --- Scarcity: "seats left" (visual only; keep truthful if you wire real data) ---
  const [seats, setSeats] = useState(SEATS_START);
  useEffect(() => {
    const id = setInterval(() => setSeats((n) => (n > 12 ? n - Math.floor(Math.random() * 3) : n)), 15000);
    return () => clearInterval(id);
  }, []);

  // --- Countdown to end of offer (midnight IST next Sunday) ---
  const end = useMemo(() => {
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
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
            ⏰ LIMITED TIME: 30% OFF Professional Plan - Ends Soon!
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 pt-16 pb-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-sm/6">
              Launch Offer • Bilingual (EN + HI) • Seats left: <strong aria-live="polite">{seats}</strong>
            </span>
            <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight md:text-6xl">
              AI Skills for Every Future — Learn, Apply, and Stay Ahead
            </h1>
            <p className="mt-4 text-pretty text-lg/8 opacity-95">
              From students to CEOs, master practical AI with self‑paced lessons, real projects, an AI doubt solver,
              and verified certificates. No fluff — just outcomes.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/catalog"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-yellow-400 px-5 font-bold text-black hover:bg-yellow-300"
              >
                Start Free Demo
              </Link>
              <Link
                href={primaryHref}
                onClick={onEnrollClick}
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-5 font-semibold hover:bg-white/15"
              >
                See Course Plans
              </Link>
              <span className="ml-2 text-sm opacity-90">
                Offer ends in <strong aria-live="polite">{remaining}</strong>
              </span>
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-6 text-sm opacity-95 sm:grid-cols-4">
              <div>
                <dt className="font-semibold">Learners</dt>
                <dd>500+</dd>
              </div>
              <div>
                <dt className="font-semibold">Courses</dt>
                <dd>25+</dd>
              </div>
              <div>
                <dt className="font-semibold">Access</dt>
                <dd>100% self‑paced</dd>
              </div>
              <div>
                <dt className="font-semibold">Fees</dt>
                <dd>₹0 hidden charges</dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-bold">Made for Everyone</h2>
        <p className="mt-2 text-gray-600">
          Not just for techies — AI boosts outcomes in study, work, business, and life.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Students", desc: "Build future‑proof skills before you graduate." },
            { title: "Professionals", desc: "Automate routine tasks and save hours weekly." },
            { title: "Freelancers", desc: "Offer in‑demand AI services with confidence." },
            { title: "Business Owners", desc: "Use AI to grow revenue and cut costs." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <div className="text-lg font-semibold">{c.title}</div>
              <div className="mt-1 text-sm text-gray-600">{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LEARNING PATH */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-bold">Your Learning Path</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { step: "1", title: "Foundation", text: "AI basics, prompt skills, practical tools." },
            { step: "2", title: "Specialize", text: "Pick a track: productivity, business, content, or dev." },
            { step: "3", title: "Apply", text: "Build real projects you can show employers or clients." },
            { step: "4", title: "Advance", text: "Earn a certificate and level up career or business." },
          ].map((s) => (
            <li key={s.step} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <div className="text-sm font-bold text-indigo-600">Step {s.step}</div>
              <div className="mt-1 text-lg font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-gray-600">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* DEMO COURSES */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-3xl font-bold">Free Demo Courses</h2>
          <Link href="/catalog" className="text-indigo-700 hover:underline">
            Browse all →
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "AI in 1 Hour — Beginner Kickstart",
              desc: "Understand key concepts and ship your first AI mini‑project.",
              tag: "Beginner • English/Hindi",
            },
            {
              title: "AI Tools to Save 10 Hours/Week",
              desc: "Email, docs, sheets, and research — streamlined with AI.",
              tag: "All Levels • English/Hindi",
            },
            {
              title: "Prompt Engineering Essentials",
              desc: "Reliable prompts for ChatGPT, Claude, and Gemini.",
              tag: "Beginner+ • English/Hindi",
            },
          ].map((c) => (
            <article
              key={c.title}
              className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200"
            >
              <div className="text-lg font-semibold">{c.title}</div>
              <p className="mt-1 text-sm text-gray-600">{c.desc}</p>
              <div className="mt-2 text-xs font-medium text-emerald-700">{c.tag}</div>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/auth/signin"
                  className="inline-flex min-h-10 items-center justify-center rounded-lg bg-indigo-600 px-4 text-white hover:bg-indigo-500"
                >
                  Start Free
                </Link>
                <Link
                  href="/course/ai-in-1-hour"
                  className="inline-flex min-h-10 items-center justify-center rounded-lg border border-gray-300 px-4 hover:bg-gray-50"
                >
                  View Syllabus
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* POPULAR COURSES BY GOAL */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-bold">Popular Paths by Goal</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "AI for Business Owners", line: "Automate marketing, sales & ops." },
            { title: "AI Productivity for Professionals", line: "Save hours every week." },
            { title: "AI Side Hustles", line: "Freelancing & content systems." },
            { title: "Prompt Engineering Mastery", line: "Communicate with AI like a pro." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <div className="text-lg font-semibold">{c.title}</div>
              <div className="mt-1 text-sm text-gray-600">{c.line}</div>
              <Link href="/catalog" className="mt-3 inline-block text-indigo-700 hover:underline">
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING – Decoy Effect (push Professional) */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <h2 className="text-3xl font-bold">Simple, Transparent Pricing</h2>
        <p className="mt-1 text-gray-600">No hidden charges. 7‑day refund policy.</p>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Starter */}
          <Plan
            name="Starter"
            price="₹999"
            badge=""
            features={[
              "5 core courses",
              "Certificate",
              "Standard community",
              "Limited AI doubt solver",
            ]}
            cta={{ label: "Choose Starter", href: "/checkout?plan=starter" }}
          />
          {/* Professional (Most Popular) */}
          <Plan
            highlight
            name="Professional"
            price="₹2,499"
            badge="🔥 Most Popular — Save 30%"
            features={[
              "All 25+ courses",
              "Verified certificate",
              "Premium community",
              "Unlimited AI doubt solver",
              "Priority updates",
            ]}
            cta={{ label: "Join Professional", href: "/checkout?plan=pro" }}
          />
          {/* Lifetime Pro */}
          <Plan
            name="Lifetime Pro"
            price="₹4,999"
            badge=""
            features={[
              "All current & future courses",
              "Verified certificate",
              "Premium community",
              "Unlimited AI doubt solver",
              "Lifetime updates",
            ]}
            cta={{ label: "Get Lifetime Access", href: "/checkout?plan=lifetime" }}
          />
        </div>
        <p className="mt-4 text-sm text-gray-600">
          * Majority of learners pick <strong>Professional</strong> for best value. Prices inclusive of taxes; terms apply.
        </p>
      </section>

      {/* SOCIAL PROOF */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <h2 className="text-3xl font-bold">What Learners Say</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
                     {[
             { q: '"Implemented automation in my business within 2 months."', a: "Priya • Business Owner" },
             { q: '"My productivity doubled — my manager noticed."', a: "Anuj • Working Professional" },
             { q: '"Landed my first freelance project after the Professional plan."', a: "Sahil • Student" },
           ].map((t) => (
            <figure key={t.a} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <blockquote className="text-balance">{t.q}</blockquote>
              <figcaption className="mt-3 text-sm text-gray-600">— {t.a}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* FOOTER – GMC trust */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-lg font-extrabold">GenEdge Academy</div>
            <div className="text-sm text-gray-600">
              Transparent pricing • Secure checkout • 7‑day refunds
            </div>
          </div>
          <nav className="flex flex-wrap gap-5 text-sm text-gray-700">
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
        "relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200",
        highlight ? "border-2 border-yellow-400 shadow-md" : "",
      ].join(" ")}
      aria-label={`${name} plan`}
    >
      {badge ? (
        <div className="absolute -top-3 left-4 rounded-full bg-yellow-300 px-3 py-1 text-xs font-bold text-black">
          {badge}
        </div>
      ) : null}
      <div className="text-lg font-bold">{name}</div>
      <div className="mt-1 text-3xl font-extrabold">{price}</div>
      <ul className="mt-3 space-y-2 text-sm text-gray-700">
        {features.map((f) => (
          <li key={f}>✅ {f}</li>
        ))}
      </ul>
      <Link
        href={cta.href}
        className={[
          "mt-5 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 font-semibold",
          highlight ? "bg-indigo-600 text-white hover:bg-indigo-500" : "border border-gray-300 hover:bg-gray-50",
        ].join(" ")}
      >
        {cta.label}
      </Link>
      <p className="mt-2 text-xs text-gray-500">No hidden charges. 7‑day refund policy.</p>
    </div>
  );
}
