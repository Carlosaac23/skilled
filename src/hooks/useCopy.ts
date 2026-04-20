import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';

type UseCopyProps = {
  title: string;
  category: string;
  installCommand: string;
};

export function useCopy({ title, category, installCommand }: UseCopyProps) {
  const posthog = usePostHog();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(installCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      posthog.capture('install_command_copied', {
        skill_title: title,
        skill_category: category,
        install_command: installCommand,
      });
    } catch {
      setCopied(false);
    }
  }

  return { copied, handleCopy };
}
