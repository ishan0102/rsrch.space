"use client";

import { useState } from "react";
import { Globe } from "lucide-react";

function getFaviconUrls(domain: string | undefined): string[] {
  if (!domain) return [];
  const clean = domain.replace(/^www\./, "");
  const parts = clean.split(".");
  const base = parts.length >= 3 ? parts.slice(-2).join(".") : clean;
  return [
    `https://www.google.com/s2/favicons?domain=${base}&sz=128`,
    `https://www.google.com/s2/favicons?domain=www.${base}&sz=128`,
    `https://www.google.com/s2/favicons?domain=${clean}&sz=128`,
  ];
}

interface FaviconProps {
  domain: string | undefined;
}

export function Favicon({ domain }: FaviconProps) {
  const [urlIndex, setUrlIndex] = useState(0);
  const [showFallback, setShowFallback] = useState(false);
  const urls = getFaviconUrls(domain);

  const handleError = () => {
    if (urlIndex < urls.length - 1) {
      setUrlIndex(urlIndex + 1);
    } else {
      setShowFallback(true);
    }
  };

  if (showFallback || !urls.length) {
    return <Globe className="w-4 h-4 flex-shrink-0 text-gray-400" />;
  }

  return (
    <img
      src={urls[urlIndex]}
      alt=""
      className="w-4 h-4 rounded-full flex-shrink-0 object-cover"
      onError={handleError}
    />
  );
}
