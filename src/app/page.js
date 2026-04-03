"use client";

import React from "react";

const features = [
  { title: "Lightning-fast billing", description: "Close bills in seconds with a minimal-click checkout flow.", icon: "⚡" },
  { title: "Order management system", description: "Handle dine-in, takeaway, and delivery from one place.", icon: "🧾" },
  { title: "Inventory tracking", description: "Track stock movement and prevent rush-hour shortages.", icon: "📦" },
  { title: "Real-time analytics", description: "Monitor sales, order mix, and revenue performance live.", icon: "📈" },
  { title: "Multi-device support", description: "Run smoothly on POS desktop, tablet, and mobile devices.", icon: "📱" },
  { title: "Cloud sync", description: "Secure cloud sync for teams, branches, and shift handovers.", icon: "☁️" },
];

const screenshots = [
  { src: "/screenshots/login.png", title: "Secure Login" },
  { src: "/screenshots/dashboard.png", title: "Smart Dashboard" },
  { src: "/screenshots/table-overview.png", title: "Table Overview" },
  { src: "/screenshots/order-history.png", title: "Order History" },
  { src: "/screenshots/financial-report.png", title: "Financial Reports" },
  { src: "/screenshots/sales-report.png", title: "Sales Reports" },
];

const steps = ["Take Order", "Process Instantly", "Track & Manage", "Analyze Sales"];

export default function HomePage() {
  return (
    <div className="bg-white text-zinc-900">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold text-red-600">Eatofy</div>
          <nav className="hidden gap-7 text-sm text-zinc-700 md:flex">
            <a href="#features" className="hover:text-black">Features</a>
            <a href="#screens" className="hover:text-black">Screens</a>
            <a href="#pricing" className="hover:text-black">Pricing</a>
          </nav>
          <button className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-500/30 hover:bg-red-500">
            Start Free Trial
          </button>
        </div>
      </header>

      <section className="bg-black px-6 py-20 text-white md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-red-400/50 bg-red-600/15 px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-red-300">
              Restaurant POS Platform
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Run Your Restaurant Smarter with Eatofy POS</h1>
            <p className="mt-6 max-w-xl text-lg text-zinc-300">
              Fast billing, real-time order tracking, and seamless management — all in one system.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-red-600 px-8 py-3 font-semibold text-white shadow-xl shadow-red-600/35 hover:bg-red-500">
                Start Free Trial
              </button>
              <button className="rounded-2xl border border-white/30 bg-white/5 px-8 py-3 font-semibold text-white hover:bg-white/10">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <img
              src="/screenshots/dashboard.png"
              alt="Eatofy dashboard"
              className="h-[360px] w-full rounded-2xl border border-white/10 object-cover"
            />
            <div className="absolute -left-6 top-8 rounded-2xl border border-red-300/30 bg-black/70 p-4 shadow-2xl">
              <p className="text-xs text-zinc-300">Orders Today</p>
              <p className="text-2xl font-bold text-white">186</p>
            </div>
            <div className="absolute -right-6 bottom-8 rounded-2xl border border-red-300/30 bg-black/70 p-4 shadow-2xl">
              <p className="text-xs text-zinc-300">Revenue</p>
              <p className="text-2xl font-bold text-white">₹1,820</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Built for restaurants, cafés, and cloud kitchens</h2>
          <p className="mt-3 max-w-2xl text-zinc-600">Modern controls for billing speed, staff efficiency, and daily business visibility.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-xl">{feature.icon}</div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-zinc-600">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="screens" className="bg-zinc-100 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-zinc-900 md:text-4xl">Real product UI previews</h2>
          <p className="mt-3 text-zinc-600">Using your red, black, and white application style across key workflows.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {screenshots.map((screen) => (
              <figure key={screen.title} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <img src={screen.src} alt={screen.title} className="h-52 w-full object-cover" />
                <figcaption className="border-t border-zinc-100 px-4 py-3 text-sm font-medium text-zinc-700">{screen.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">How it works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-red-300">Step {i + 1}</p>
                <p className="mt-2 text-lg font-semibold">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-3xl font-bold md:text-4xl">Pricing plans</h2>
            <div className="inline-flex rounded-full border border-zinc-200 p-1 text-sm">
              <button className="rounded-full bg-red-600 px-4 py-2 font-semibold text-white">Monthly</button>
              <button className="rounded-full px-4 py-2 text-zinc-600">Yearly</button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Starter", price: "$29", desc: "For small cafés and compact counters." },
              { name: "Growth", price: "$79", desc: "For growing teams and busy shifts.", featured: true },
              { name: "Pro", price: "$149", desc: "For multi-branch and high-volume brands." },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${plan.featured ? "border-red-500 bg-red-50 shadow-xl" : "border-zinc-200 bg-white"}`}
              >
                {plan.featured && <p className="inline-flex rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white">Most Popular</p>}
                <h3 className="mt-4 text-2xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-zinc-600">{plan.desc}</p>
                <p className="mt-5 text-4xl font-bold text-zinc-900">{plan.price}<span className="text-base text-zinc-500">/month</span></p>
                <button className={`mt-8 w-full rounded-xl px-4 py-3 font-semibold ${plan.featured ? "bg-red-600 text-white" : "bg-black text-white"}`}>
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-black via-zinc-900 to-red-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Upgrade Your Restaurant Operations Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-200">Move faster with a POS system built for modern food operations.</p>
          <button className="mt-8 rounded-2xl bg-red-600 px-12 py-4 text-lg font-semibold text-white shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:bg-red-500">
            Start Free Trial
          </button>
        </div>
      </section>

      <footer className="bg-black px-6 py-10 text-sm text-zinc-400">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xl font-bold text-red-500">Eatofy</p>
            <p className="mt-1">Smart POS for fast-moving restaurants.</p>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-white">Product</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
