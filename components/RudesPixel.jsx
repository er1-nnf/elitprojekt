"use client";

import { useEffect } from "react";

// Meta Pixel initialization for the "projekt-zagreb-rudes" project page.
// Rendered by the in-plan detail server page ONLY when the slug matches.
// Pixel logic ported 1:1 from the old InPlanDetails.jsx.
const RudesPixel = () => {
  useEffect(() => {
    // Initialize Meta Pixel
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

    window.fbq("init", "24882242551467322");
    window.fbq("track", "PageView");
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=24882242551467322&ev=PageView&noscript=1"
        alt=""
      />
    </noscript>
  );
};

export default RudesPixel;
