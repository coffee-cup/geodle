import {
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import appCss from "../styles/app.css?url";

const siteUrl = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : "http://localhost:5543";

const title = "Geodle — Guess the Country";
const description =
  "A daily geography guessing game. Identify countries from their silhouettes.";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title },
      { name: "description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: `${siteUrl}/og.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: `${siteUrl}/og.png` },
    ],
    links: [
      { rel: "icon", href: "https://fav.farm/%F0%9F%8C%8D" },
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital,wght@0,400;1,400&family=DM+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('geodle-theme');var d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark')})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=JSON.parse(localStorage.getItem('geodle-state'));if(s&&s.guesses&&s.guesses.length){var e=document.createElement('style');e.id='geodle-hydration';e.textContent='[data-game-area]{visibility:hidden}';document.head.appendChild(e)}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-paper text-ink font-sans antialiased min-h-dvh">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
