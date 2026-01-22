'use client';

import { useLang } from '@/lib/language-context';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t-4 border-ink bg-newsprint mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest opacity-60">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
