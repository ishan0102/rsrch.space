export function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
}

export function getBaseDomain(url) {
  const domain = getDomain(url);
  const parts = domain.replace(/^www\./, "").split(".");
  if (parts.length >= 2) {
    return parts.slice(-2).join(".");
  }
  return domain;
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}

export function normalizeForSearch(str) {
  return str?.replace(/\s+/g, "").toLowerCase() || "";
}

export function transformArxivUrl(url) {
  return url.replace(/pdf(?=.)/, "abs").replace(/v\d+$/, "");
}
