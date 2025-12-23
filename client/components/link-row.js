"use client";

import { Favicon } from "./favicon";
import { getDomain, formatDate } from "@/lib/utils";

export function LinkRow({ title, created, link }) {
  return (
    <a
      href={link}
      target="_blank"
      className="text-secondary text-md group flex justify-between py-1"
    >
      <span className="flex items-start gap-2 min-w-0">
        <span className="mt-1 flex-shrink-0">
          <Favicon domain={getDomain(link)} />
        </span>
        <strong className="break-word font-medium text-gray-900 group-hover:text-primary sm:break-normal">
          {title}
        </strong>
      </span>
      <p className="font-berkeley text-gray-500 ml-4 whitespace-nowrap sm:ml-12">
        {formatDate(created)}
      </p>
    </a>
  );
}
