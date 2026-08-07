import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stack SaaS Platform",
  description: "Enterprise SaaS built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
