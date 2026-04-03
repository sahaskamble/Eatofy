"use client";

import React from "react";

const features = [
  {
    title: "Lightning-fast billing",
    description: "Check out guests in seconds with a frictionless, optimized billing flow.",
    icon: "⚡",
  },
  {
    title: "Order management system",
    description: "Track dine-in, takeaway, and delivery orders from one smart workspace.",
    icon: "🧾",
  },
  {
    title: "Inventory tracking",
    description: "Monitor stock usage in real time and avoid ingredient shortages.",
    icon: "📦",
  },
  {
    title: "Real-time analytics",
    description: "Get live performance metrics across outlets, shifts, and menu items.",
    icon: "📈",
  },
  {
    title: "Multi-device support",
    description: "Run Eatofy seamlessly on desktop, tablets, and mobile devices.",
    icon: "📱",
  },
  {
    title: "Cloud sync",
    description: "Securely sync data across teams and locations with automatic backup.",
    icon: "☁️",
  },
];

const steps = [
  { title: "Take Order", description: "Capture orders quickly from any device.", icon: "📝" },
  { title: "Process Instantly", description: "Send to kitchen and bill with zero delay.", icon: "⚙️" },
  { title: "Track & Manage", description: "Monitor table status and fulfillment live.", icon: "🔄" },
  { title: "Analyze Sales", description: "Understand trends and make smarter decisions.", icon: "📊" },
];

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Owner, Urban Tandoor",
    quote:
      "Eatofy reduced our billing queues by almost half. Staff onboarding is simple and service is much faster.",
  },
  {
    name: "Sophia Reed",
    role: "Cafe Manager, Daily Grind",
    quote:
      "The dashboard is crystal clear. We now track top-selling items and peak hours without spreadsheets.",
  },
  {
    name: "Nikhil Sharma",
    role: "Ops Lead, CloudBowl Kitchens",
    quote:
      "Managing multi-kitchen delivery orders became effortless. Eatofy keeps our entire workflow in sync.",
  },
];

const pricing = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Best for small cafes and single-counter setups.",
    points: ["1 outlet", "Core billing", "Basic reports", "Email support"],
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$79",
    period: "/month",
    description: "Perfect for growing restaurants and busy operations.",
    points: ["Up to 3 outlets", "Advanced order flow", "Inventory + analytics", "Priority support"],
    highlighted: true,
  },
  {
    name: "Pro",
    price: "$149",
    period: "/month",
    description: "Built for scaling brands and cloud kitchen networks.",
    points: ["Unlimited outlets", "Role-based controls", "Custom integrations", "Dedicated success manager"],
    highlighted: false,
  },
];

export default function HomePage() {
  return (
    <div className="bg-slate-950 text-slate-100">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-bold tracking-tight text-orange-500">Eatofy</div>
          <nav className="hidden gap-8 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#workflow" className="hover:text-white">How it works</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </nav>
          <button className="rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-400">
            Start Free Trial
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 px-6 pb-20 pt-20 md:pt-28">
        <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.2em] text-orange-300">
              Smart Restaurant POS
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Run Your Restaurant Smarter with Eatofy POS
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-300">
              Fast billing, real-time order tracking, and seamless management — all in one system.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-orange-500 px-7 py-3 font-semibold text-white shadow-xl shadow-orange-500/30 transition hover:-translate-y-0.5 hover:bg-orange-400">
                Start Free Trial
              </button>
              <button className="rounded-2xl border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white backdrop-blur transition hover:bg-white/10">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl">
              <div className="rounded-2xl bg-slate-900 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Eatofy Dashboard</h3>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">Live</span>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-xs text-slate-400">Today Sales</p>
                    <p className="mt-1 text-2xl font-bold">$4,280</p>
                  </div>
                  <div className="rounded-xl bg-slate-800 p-4">
                    <p className="text-xs text-slate-400">Orders</p>
                    <p className="mt-1 text-2xl font-bold">186</p>
                  </div>
                  <div className="h-28 rounded-xl bg-gradient-to-r from-orange-400/50 to-orange-700/30 p-4 md:col-span-2">
                    <p className="text-xs text-orange-100">Sales Trend</p>
                    <div className="mt-4 h-10 rounded-lg bg-slate-950/30" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-6 top-10 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
              <p className="text-xs text-slate-300">New Orders</p>
              <p className="text-xl font-bold">+24</p>
            </div>
            <div className="absolute -right-6 bottom-8 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
              <p className="text-xs text-slate-300">Bills Closed</p>
              <p className="text-xl font-bold">132</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="bg-slate-50 px-6 py-20 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Built for modern food businesses</h2>
          <p className="mt-4 max-w-2xl text-slate-600">
            Designed for restaurants, cafes, cloud kitchens, and growing teams that need speed and control.
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100 text-xl">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Dashboard previews</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {["Sales charts", "Orders panel", "Menu management", "Kitchen workflow"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg">
                <p className="text-sm text-orange-300">Preview</p>
                <h3 className="mt-1 text-xl font-semibold">{item}</h3>
                <div className="mt-4 h-40 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="bg-slate-50 px-6 py-20 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">How Eatofy works</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="text-2xl">{step.icon}</span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-orange-500">Step {index + 1}</p>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900 px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Why teams choose Eatofy</h2>
            <ul className="mt-8 space-y-4 text-slate-200">
              {[
                "Reduce wait time with ultra-fast billing flows",
                "Increase order accuracy with centralized order tracking",
                "Boost revenue insights with clear performance analytics",
                "Simplify staff operations with intuitive workflows",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-lg">
            <div className="h-80 rounded-2xl bg-gradient-to-br from-orange-500/30 to-emerald-500/20 p-6">
              <div className="h-full rounded-xl border border-white/10 bg-slate-900/60 p-4" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-20 text-slate-900">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold md:text-4xl">Loved by operators</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-200 font-semibold">
                    {item.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.role}</p>
                  </div>
                </div>
                <p className="text-slate-600">“{item.quote}”</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-slate-900 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold md:text-4xl">Simple pricing that scales</h2>
            <div className="inline-flex rounded-full border border-white/20 p-1 text-sm">
              <button className="rounded-full bg-orange-500 px-4 py-2 font-semibold text-white">Monthly</button>
              <button className="rounded-full px-4 py-2 text-slate-300">Yearly</button>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.highlighted
                    ? "border-orange-400 bg-orange-500/10 shadow-2xl shadow-orange-500/20"
                    : "border-white/10 bg-white/5"
                }`}
              >
                {plan.highlighted && (
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold">Most Popular</span>
                )}
                <h3 className="mt-4 text-2xl font-semibold">{plan.name}</h3>
                <p className="mt-2 text-slate-300">{plan.description}</p>
                <p className="mt-6 text-4xl font-bold">
                  {plan.price}
                  <span className="text-base font-medium text-slate-400">{plan.period}</span>
                </p>
                <ul className="mt-6 space-y-2 text-sm text-slate-200">
                  {plan.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
                <button
                  className={`mt-8 w-full rounded-xl px-4 py-3 font-semibold transition ${
                    plan.highlighted
                      ? "bg-orange-500 text-white hover:bg-orange-400"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-6 py-20 text-slate-950">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Upgrade Your Restaurant Operations Today</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-900/80">
            Join modern food businesses using Eatofy to move faster, serve better, and grow profitably.
          </p>
          <button className="mt-8 rounded-2xl bg-slate-950 px-10 py-4 text-lg font-semibold text-white shadow-[0_0_30px_rgba(15,23,42,0.55)] transition hover:-translate-y-0.5 hover:bg-slate-800">
            Start Free Trial
          </button>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 text-sm text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-xl font-bold text-orange-500">Eatofy</p>
            <p className="mt-1">POS built for fast-moving restaurants.</p>
          </div>
          <div className="flex flex-wrap gap-6">
            <a href="#features" className="hover:text-white">Product</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#" className="hover:text-white">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
