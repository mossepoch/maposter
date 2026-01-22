'use client';

import { useLang } from '@/lib/language-context';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const { t } = useLang();

  return (
    <header className="border-b-4 border-ink bg-newsprint sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => onNavigate('gallery')}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 513 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path d="M373.005 83.356C369.289 85.4794 364.511 88.1337 362.388 89.2713C352.15 94.9591 317.416 114.449 305.889 120.971C304.448 121.806 294.892 127.19 284.654 132.954C274.416 138.641 265.468 143.874 264.709 144.557C263.496 145.618 263.42 153.278 263.572 289.103L263.799 432.511L267.97 432.284C272.445 432.056 284.124 429.857 291.631 427.885C302.552 425.079 317.416 418.026 329.323 409.912C339.03 403.314 352.301 390.422 358.52 381.397C368.758 366.684 376.266 348.711 379.603 330.813L381.347 321.789L381.499 215.996C381.65 114.677 381.347 79.4883 380.285 79.4883C380.058 79.4883 376.797 81.2325 373.005 83.356ZM219.813 268.778C212.685 272.798 204.343 277.424 201.233 279.092C198.124 280.837 190.464 285.083 184.17 288.648C166.651 298.582 161.798 301.237 156.489 304.194C139.577 313.447 131.463 327.325 131.463 347.043C131.539 363.272 136.999 376.316 150.498 392.318C160.357 403.996 173.78 413.704 190.692 421.363C203.357 427.051 222.468 432.132 231.265 432.132H234.602V346.815C234.602 278.789 234.374 261.498 233.616 261.498C233.161 261.498 226.866 264.759 219.813 268.778Z" fill="currentColor"/>
            </svg>
            <h1 className="font-serif text-4xl font-black tracking-tight">
              MAPOSTER
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex gap-6 items-center">
            <button
              onClick={() => onNavigate('gallery')}
              className={`font-mono text-sm uppercase tracking-widest transition-colors ${
                currentPage === 'gallery' || currentPage === 'detail'
                  ? 'text-ink font-bold border-b-2 border-ink'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              {t('gallery')}
            </button>
            <button
              onClick={() => onNavigate('generate')}
              className={`font-mono text-sm uppercase tracking-widest transition-colors ${
                currentPage === 'generate'
                  ? 'text-ink font-bold border-b-2 border-ink'
                  : 'text-ink/60 hover:text-ink'
              }`}
            >
              {t('generate')}
            </button>
            <a
              href="https://github.com/mossepoch/maposter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink/60 hover:text-ink transition-colors"
              aria-label="GitHub"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"/>
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
