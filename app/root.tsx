import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { scan } from "react-scan";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

import "./tailwind.css";

export const links: LinksFunction = () => [
  { rel: "dns-prefetch", href: "https://s3.yhw.tw" },
];

function StartingComponent() {
  const [showContent, setShowContent] = useState(false);
  const sureClick = () => {
    localStorage.setItem("userConsent", "true");
    window.location.reload();
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return;
  }
  return (
    <div className="flex flex-col absolute inset-0 justify-center align-center items-center bg-gray-700/50 shadow-lg backdrop-blur-md">
      <h1 className="text-4xl text-bold text-transparent bg-gradient-to-tl from-sky-400 to-stone-400 bg-clip-text">
        HDRify your image
      </h1>
      <h3 className="text-lg text-gray-300">
        Are you sure you want to blow your friend's eyes?
      </h3>
      <button
        onClick={sureClick}
        className="bg-red-400 p-2 rounded-xl hover:bg-red-600 text-black transition-all duration-200"
      >
        Sure! Why not.
      </button>
      <span className="text-xs text-gray-500 mt-1">
        I'm not responsible for your actions, this is for funises only.
      </span>
      <span className="text-xs text-gray-500 mt-1">
        By clicking this button, everything WILL be on YOU, not the creator of
        the platform.
      </span>
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    scan({
      enabled: true,
    });
  }, []);
  const [hasConsent, setHasConsent] = useState(false);
  useEffect(() => {
    const consent = localStorage.getItem("userConsent");
    setHasConsent(consent === "true");
  }, []);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {!hasConsent && <StartingComponent />}
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export default function App() {
  return <Outlet />;
}