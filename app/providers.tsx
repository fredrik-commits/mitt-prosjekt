"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export function PostHogClientProvider({ children }: Props) {
  const [isPosthogReady, setIsPosthogReady] = useState(false);

  useEffect(() => {
    if (!posthog.__loaded) {
      const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
      const host =
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.posthog.com";

      if (key) {
        posthog.init(key, {
          api_host: host,
          capture_pageview: true,
          capture_pageleave: true,
          session_recording: {},
          autocapture: true,
        });
      }
    }

    setIsPosthogReady(true);
  }, []);

  if (!isPosthogReady) {
    return null;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

