// components/Payment.tsx
"use client";

import React, { useEffect, useRef } from "react";

type PaymentProps = {
  widgetUrl?: string; // the data-url / iframe src used by the widget
  height?: string | number; // CSS height, e.g. "500px" or 500
  className?: string;
};

export default function Tix({
  widgetUrl = "https://widget.tix.africa/jungleparadise/VXNlci1iMGVhOWMyNC1jNjhlLTQ4ZWYtOTkxZi1jOGYxMjExY2YxNjQ=",
  height = "500px",
  className = "",
}: PaymentProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const scriptId = "tix-africa-widget-script";
  const scriptSrc = "https://widget.tix.africa/widget.js";

  useEffect(() => {
    // Only run on client
    const root = rootRef.current;
    if (!root) return;

    // If widget script already exists on the page, we still keep fallback iframe.
    // Many widget scripts scan the DOM on load. If it's already loaded, try re-initializing if possible.
    let added = false;
    const existing = document.getElementById(
      scriptId
    ) as HTMLScriptElement | null;

    if (!existing) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = scriptSrc;
      script.async = true;
      // set data-url attribute (same as your original snippet)
      script.setAttribute("data-url", widgetUrl);

      // Some widget libs expect the script to be a child of the widget container.
      // We'll append it to the widget root to keep it scoped.
      root.appendChild(script);
      added = true;

      // If the widget exposes a global initializer, it may run automatically.
      // Otherwise, the script will likely locate .tt-widget elements and instantiate.
      script.onerror = () => {
        // Script failed to load — silently fail but keep iframe fallback visible.
        // You can optionally set an error flag here to show a friendly message.
        // console.error("Tix Africa widget failed to load");
      };
    } else {
      // If the script already exists, ensure it has correct data-url (some libs read it once)
      // and attempt a re-scan if the library exposes a global function (unknown here).
      // We cannot rely on a specific API, so keep fallback iframe only.
      // Example (if library exposes window.TixWidget?.init):
      // if ((window as any).TixWidget?.init) (window as any).TixWidget.init();
    }

    return () => {
      // Optional cleanup: remove script if we added it.
      // Note: removing script might break other widget instances. Keep this if you only use widget once.
      if (added) {
        const s = document.getElementById(scriptId);
        if (s && s.parentNode) s.parentNode.removeChild(s);
      }
    };
    // Only run once on mount/unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widgetUrl]);

  // styles for the container and fallback iframe (keeps 100% width/height)
  const wrapperStyle: React.CSSProperties = {
    width: "100%",
    height: typeof height === "number" ? `${height}px` : height,
    minHeight: "200px",
  };

  return (
    <div
      ref={rootRef}
      className={`tt-widget ${className}`}
      style={wrapperStyle}
    >
      <div
        className="tt-widget-fallback"
        style={{ width: "100%", height: "100%" }}
      >
        <iframe
          src={widgetUrl}
          style={{ width: "100%", height: "100%", border: "none" }}
          title="Ticket Widget"
        />
      </div>
    </div>
  );
}
