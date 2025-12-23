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
  const dateObj = new Date(timestamp);
  const easternTime = dateObj.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const date = easternTime.split(",")[0];
  return new Date(date).toISOString().split("T")[0];
}

export function normalizeForSearch(str) {
  return str?.replace(/\s+/g, "").toLowerCase() || "";
}

export function transformArxivUrl(url) {
  return url.replace(/pdf(?=.)/, "abs").replace(/v\d+$/, "");
}
