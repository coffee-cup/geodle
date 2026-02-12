import {
  HeadContent,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Geodle — Guess the Country" },
      {
        name: "description",
        content:
          "A daily geography guessing game. Identify countries from their silhouettes.",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Sans+3:wght@400;600&display=swap",
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
      </head>
      <body className="bg-paper text-ink font-sans antialiased min-h-dvh">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
