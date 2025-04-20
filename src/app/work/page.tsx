import { getPosts } from "@/app/utils/utils";
import { Column } from "@/once-ui/components";
import { Projects } from "@/components/work/Projects";
import { baseURL } from "@/app/resources";
import { person, work } from "@/app/resources/content";
import Spline from '@splinetool/react-spline/next';

export async function generateMetadata() {
  const title = work.title;
  const description = work.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/work/`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Work() {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
      {/* Static Spline background */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', userSelect: 'none', backgroundColor: '#000' }}>
        <Spline scene="https://prod.spline.design/Yd64S3XYXTtoacxJ/scene.splinecode" />
      </div>
      <div style={{ position: 'relative', zIndex: 2, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Column maxWidth="m">
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                headline: work.title,
                description: work.description,
                url: `https://${baseURL}/projects`,
                image: `${baseURL}/og?title=Design%20Projects`,
                author: {
                  "@type": "Person",
                  name: person.name,
                },
                hasPart: allProjects.map((project) => ({
                  "@type": "CreativeWork",
                  headline: project.metadata.title,
                  description: project.metadata.summary,
                  url: `https://${baseURL}/projects/${project.slug}`,
                  image: `${baseURL}/${project.metadata.image}`,
                })),
              }),
            }}
          />
          <Projects />
        </Column>
      </div>
    </div>
  );
}
