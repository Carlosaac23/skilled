import { useState } from 'react';

export function useCopy(textToCopy: string) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return { copied, handleCopy };
}
