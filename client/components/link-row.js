"use client";

import { Favicon } from "./favicon";
import { getDomain, getBaseDomain, formatDate } from "@/lib/utils";

export function LinkRow({ title, created, link, onDomainClick }) {
  const domain = getDomain(link);
  const baseDomain = getBaseDomain(link);

  const handleDomainClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDomainClick?.(baseDomain);
  };

  return (
    <div className="flex items-start justify-between py-1 gap-4">
      <a
        href={link}
        target="_blank"
        className="flex items-start gap-2 min-w-0 group flex-1"
      >
        <span className="mt-1 flex-shrink-0">
          <Favicon domain={domain} />
        </span>
        <strong className="break-word font-medium text-gray-900 group-hover:text-primary sm:break-normal">
          {title}
        </strong>
      </a>
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={handleDomainClick}
          className="hidden sm:block text-xs text-gray-500 hover:text-primary"
        >
          {baseDomain}
        </button>
        <p className="font-berkeley text-gray-500 text-sm whitespace-nowrap">
          {formatDate(created)}
        </p>
      </div>
    </div>
  );
}
