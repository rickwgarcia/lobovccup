import { useEffect, useState } from 'react';
import Container from '@/components/common/Container';
import SectionLabel from '@/components/common/SectionLabel';
import Button from '@/components/common/Button';
import { socialUpdates } from '@/data/updates';
import type { SocialPost } from '@/types/content';

const MAX_POSTS = 5;

const platformLabel = { instagram: 'Instagram', linkedin: 'LinkedIn' } as const;

// Behold.so JSON feed (free): https://behold.so -> connect Instagram -> copy the feed URL
// into VITE_INSTAGRAM_FEED_URL. Shape is parsed defensively.
const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL as string | undefined;

interface FeedPost {
  permalink?: string;
  mediaUrl?: string;
  thumbnailUrl?: string;
  mediaType?: string;
  caption?: string;
  sizes?: { medium?: { mediaUrl?: string }; large?: { mediaUrl?: string } };
}

function useInstagramFeed(): SocialPost[] {
  const [feed, setFeed] = useState<SocialPost[]>([]);
  useEffect(() => {
    if (!FEED_URL) return;
    const controller = new AbortController();
    fetch(FEED_URL, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { posts?: FeedPost[] } | FeedPost[]) => {
        const list = Array.isArray(data) ? data : (data.posts ?? []);
        setFeed(
          list.flatMap((p) => {
            const img =
              p.sizes?.large?.mediaUrl ??
              p.sizes?.medium?.mediaUrl ??
              (p.mediaType === 'VIDEO' ? p.thumbnailUrl : p.mediaUrl) ??
              p.thumbnailUrl;
            if (!p.permalink || !img) return [];
            return [{
              platform: 'instagram' as const,
              href: p.permalink,
              imageSrc: img,
              alt: p.caption?.slice(0, 100) || 'Lobo VC Cup Instagram post',
            }];
          }),
        );
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return feed;
}

export default function UpdatesSection() {
  const { instagramProfileUrl, linkedinCompanyUrl, posts } = socialUpdates;
  const instagramFeed = useInstagramFeed();
  // Live Instagram posts first, then any manually added posts (e.g. LinkedIn).
  const visible = [...instagramFeed, ...posts].slice(0, MAX_POSTS);

  return (
    <section id="updates" className="py-12 lg:py-16">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
        <SectionLabel size="h2">Latest Updates</SectionLabel>
        <p className="max-w-[580px] font-grotesk text-body text-black">
          The latest from Lobo VC Cup on Instagram and LinkedIn.
        </p>
      </Container>

      <Container className="mt-8 flex flex-col gap-6">
        {visible.length === 0 && (
          <div className="grid gap-[30px] md:grid-cols-2">
            {[
              { label: 'Instagram', handle: '@lobovccup', href: instagramProfileUrl, bg: 'bg-turquoise' },
              { label: 'LinkedIn', handle: 'Lobo VC Cup', href: linkedinCompanyUrl, bg: 'bg-brand-silver' },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col gap-2 rounded-card border border-ink ${c.bg} px-6 py-8 shadow-hard transition-transform hover:-translate-y-1 sm:px-10 sm:py-12`}
              >
                <span className="font-grotesk text-2xl font-medium text-black sm:text-h3">{c.label}</span>
                <span className="font-grotesk text-body text-black">
                  {c.handle} &mdash; see our latest posts &rarr;
                </span>
              </a>
            ))}
          </div>
        )}

        {visible.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {visible.map((post) => (
              <li key={post.href} className="first:col-span-2 sm:first:col-span-1">
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${post.alt} (view on ${platformLabel[post.platform]})`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-card border border-ink bg-brand-silver shadow-hard transition-transform hover:-translate-y-1"
                >
                  <img
                    src={post.imageSrc}
                    alt={post.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 rounded-pill bg-turquoise px-2 py-0.5 font-grotesk text-xs text-black">
                    {platformLabel[post.platform]}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-4">
          <Button href={instagramProfileUrl} target="_blank" rel="noopener noreferrer">
            Follow on Instagram
          </Button>
          <Button
            href={linkedinCompanyUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="solid-turquoise"
          >
            Follow on LinkedIn
          </Button>
        </div>
      </Container>
    </section>
  );
}
