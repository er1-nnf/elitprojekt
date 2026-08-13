export const DEFAULT_PREFS = { necessary: true, analytics: false, marketing: false };

export const getConsent = () => {
  try {
    return JSON.parse(localStorage.getItem("cookieConsent")) || null;
  } catch {
    return null;
  }
};

export const saveConsent = (prefs) => {
  localStorage.setItem("cookieConsent", JSON.stringify(prefs));
};

// Track which scripts have been loaded
let gaLoaded = false;
let metaPixelLoaded = false;

// Load Google Analytics dynamically
const loadGoogleAnalytics = () => {
  if (gaLoaded) return;
  gaLoaded = true;

  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-0DEQVMMTNG';
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.gtag('js', new Date());
    window.gtag('config', 'G-0DEQVMMTNG');
  };
};

// Load Meta Pixel dynamically
const loadMetaPixel = () => {
  if (metaPixelLoaded) return;
  metaPixelLoaded = true;

  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', '1986178298836299');
  window.fbq('track', 'PageView');
};

export const applyConsentToGTM = (prefs) => {
  const payload = {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage:       prefs.marketing ? "granted" : "denied",
    ad_user_data:     prefs.marketing ? "granted" : "denied",
    ad_personalization: prefs.marketing ? "granted" : "denied",
  };

  // Update consent state
  if (window.gtag) {
    window.gtag("consent", "update", payload);
  } else {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "consent_update", ...payload });
  }

  // Load scripts only if consent is granted
  if (prefs.analytics) {
    loadGoogleAnalytics();
  }
  if (prefs.marketing) {
    loadMetaPixel();
  }
};

// Call this once on app load to re-apply stored consent
export const initConsentFromStorage = () => {
  const prefs = getConsent();
  if (prefs) applyConsentToGTM(prefs);
};
