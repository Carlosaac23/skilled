import { ClerkProvider, useUser } from '@clerk/tanstack-react-start';
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router';
import { PostHogProvider, usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

import Crosshair from '@/components/Crosshair';
import NavBar from '@/components/NavBar';

import appCss from '../styles.css?url';

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: '2026-01-30',
} as const;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Skilled | The Developer Platform',
      },
      {
        name: 'description',
        content: 'Discover and share top development skills.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
});

function PostHogUserIdentifier() {
  const { user, isSignedIn } = useUser();
  const posthog = usePostHog();

  useEffect(() => {
    if (isSignedIn && user) {
      posthog.identify(user.id, {
        email: user.primaryEmailAddress?.emailAddress,
        name: user.fullName,
      });
    } else if (isSignedIn === false) {
      posthog.reset();
    }
  }, [isSignedIn, user, posthog]);

  return null;
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <HeadContent />
      </head>
      <body className='font-sans wrap-anywhere antialiased'>
        <PostHogProvider
          apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_PROJECT_TOKEN}
          options={options}
        >
          <ClerkProvider>
            <PostHogUserIdentifier />
            <div id='root-layout'>
              <header>
                <div className='frame'>
                  <NavBar />
                  <Crosshair />
                  <Crosshair />
                </div>
              </header>

              <main>
                <div className='frame'>{children}</div>
              </main>
            </div>
          </ClerkProvider>
        </PostHogProvider>
        <Scripts />
      </body>
    </html>
  );
}
