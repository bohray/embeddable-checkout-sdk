declare const CHECKOUT_APP_URL: string;

export function createCheckoutIframe() {
  const iframe = document.createElement("iframe");
  iframe.src = CHECKOUT_APP_URL || "http://localhost:3000";

  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  iframe.style.zIndex = "999999";

  return iframe;
}
