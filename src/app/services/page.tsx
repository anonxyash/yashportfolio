import React from "react";
import Spline from '@splinetool/react-spline/next';
import { Heading, Flex, Text, Button, Avatar, RevealFx, Arrow, Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL, routes } from "@/app/resources";
import { home, about, person, newsletter } from "@/app/resources/content";
import { Mailchimp } from "@/components";
import { Posts } from "@/components/blog/Posts";


export default function Services() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      {/* Spline 3D background, fixed and non-scrolling */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, width: '100vw', height: '100vh', pointerEvents: 'none', overflow: 'hidden', backgroundColor: '#000' }}>
        <Spline scene="https://prod.spline.design/Yd64S3XYXTtoacxJ/scene.splinecode" />
      </div>
      {/* Page content overlays Spline bg and scrolls */}
      <Column maxWidth="m">
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: home.title,
              description: home.description,
              url: `https://${baseURL}`,
              image: `${baseURL}/og?title=${encodeURIComponent(home.title)}`,
              publisher: {
                "@type": "Person",
                name: person.name,
                image: {
                  "@type": "ImageObject",
                  url: `${baseURL}${person.avatar}`,
                },
              },
            }),
          }}
        />
        <Projects />
        {newsletter.display && <Mailchimp newsletter={newsletter} />}
      </Column>
    </div>
  );
}
