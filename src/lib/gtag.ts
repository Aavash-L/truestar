export function trackEvent(eventName: string) {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName);
  } else {
    // gtag script hasn't loaded yet — queue so GA4 processes it on init
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(["event", eventName]);
  }
}
