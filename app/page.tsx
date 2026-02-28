"use client";

import posthog from "posthog-js";
import { useFeatureFlagVariantKey } from "posthog-js/react";
import type { FormEvent } from "react";

/**
 * A/B-test: landing-page-design
 * - control  = original design (tilsvarer det som var på main før A/B-branchen)
 * - variant  = nytt Apple-design (full-width hero, egen kontaktseksjon)
 * Når eksperimentet er ferdig: behold én variant i koden og fjern flagget.
 */
const FEATURE_FLAG_KEY = "landing-page-design";

export default function Home() {
  const variant = useFeatureFlagVariantKey(FEATURE_FLAG_KEY);
  const isControl = variant === "control";

  const captureIfReady = (...args: Parameters<typeof posthog.capture>) => {
    if (!posthog.__loaded) return;
    posthog.capture(...args);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    captureIfReady("form_submitted");
  };

  if (isControl) {
    return (
      <LandingControl
        onCtaClick={() => captureIfReady("cta_clicked")}
        onSubmit={handleSubmit}
      />
    );
  }

  return (
    <LandingVariant
      onCtaClick={() => captureIfReady("cta_clicked")}
      onSubmit={handleSubmit}
    />
  );
}

/** Control (A): tidligere design med kort, nøytraltokens, mer kompakt. */
function LandingControl({
  onCtaClick,
  onSubmit,
}: {
  onCtaClick: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-6 py-16 font-sans dark:bg-neutral-950">
      <div className="w-full max-w-2xl space-y-10 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-neutral-200 dark:bg-neutral-900 dark:ring-neutral-800">
        <section className="space-y-4 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Bygg og forstå brukeratferd raskt
          </h1>
          <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            En enkel startside der du kan teste PostHog-eventer for CTA-klikk og
            skjemainnsendinger i ditt Next.js-prosjekt.
          </p>
          <button
            type="button"
            onClick={onCtaClick}
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus-visible:ring-neutral-50 dark:focus-visible:ring-offset-neutral-950"
          >
            Kom i gang
          </button>
        </section>
        <section className="space-y-4">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-neutral-50">
            Kontakt oss
          </h2>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="name-control"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                Navn
              </label>
              <input
                id="name-control"
                name="name"
                type="text"
                autoComplete="name"
                className="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-0 transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-50 dark:focus:ring-neutral-50"
                required
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="email-control"
                className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
              >
                E-post
              </label>
              <input
                id="email-control"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm outline-none ring-0 transition placeholder:text-neutral-400 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-50 dark:focus:border-neutral-50 dark:focus:ring-neutral-50"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full border border-neutral-300 bg-transparent px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-50 dark:border-neutral-700 dark:text-neutral-50 dark:hover:bg-neutral-900 dark:focus-visible:ring-neutral-50 dark:focus-visible:ring-offset-neutral-950"
            >
              Send
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

/** Variant (B): nytt Apple-inspirert design, full-width, py-32 hero, egen kontaktseksjon. */
function LandingVariant({
  onCtaClick,
  onSubmit,
}: {
  onCtaClick: () => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="flex min-h-screen items-center py-32">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
            PRODUKTINNSIKT
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Se hva brukerne dine faktisk gjør.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            En rolig, fokusert landingsside der du kan teste PostHog‑eventer for
            klikk og skjemainnsending – uten å miste følelsen av et Apple‑rent
            grensesnitt.
          </p>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onCtaClick}
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-sm font-medium text-white shadow-sm transition hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Kom i gang
            </button>
          </div>
        </div>
      </section>
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
            Kontakt
          </h2>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-gray-900">
            La oss ta en prat.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Fyll inn navn og e‑post, så kan du teste hvordan skjema‑eventer
            fanges opp i PostHog.
          </p>
          <form onSubmit={onSubmit} className="mt-10 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="name-variant"
                className="block text-sm font-medium text-gray-800"
              >
                Navn
              </label>
              <input
                id="name-variant"
                name="name"
                type="text"
                autoComplete="name"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 shadow-sm outline-none ring-0 transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email-variant"
                className="block text-sm font-medium text-gray-800"
              >
                E‑post
              </label>
              <input
                id="email-variant"
                name="email"
                type="email"
                autoComplete="email"
                className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 shadow-sm outline-none ring-0 transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                required
              />
            </div>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full border border-gray-900 bg-white px-5 py-3 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50"
            >
              Send
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
