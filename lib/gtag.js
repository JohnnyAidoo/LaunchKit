export const GA_TRACKING_ID = "G-6Y3ZPYW79W";

export const pageview = (url) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
  });
};
