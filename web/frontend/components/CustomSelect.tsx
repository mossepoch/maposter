'use client';

import { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  className = ''
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get current selected option
  const selectedOption = options.find(opt => opt.value === value);

  // Filter options based on search
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      {/* Select Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full appearance-none border-4 border-ink bg-newsprint px-4 py-3 pr-10
          font-mono text-sm uppercase tracking-wide hard-shadow text-left
          hover:bg-muted focus:bg-muted focus:outline-none transition-all
          ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {selectedOption ? selectedOption.label : placeholder}

        {/* Arrow Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-ink">
          <svg
            className={`h-5 w-5 fill-current transition-transform ${isOpen ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-2 border-4 border-ink bg-newsprint hard-shadow max-h-80 overflow-hidden flex flex-col">
          {/* Search Input (for long lists) */}
          {options.length > 10 && (
            <div className="p-2 border-b-2 border-ink">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 border-2 border-ink bg-white font-mono text-sm uppercase focus:outline-none focus:bg-muted"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          {/* Options List */}
          <div className="overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={`
                    w-full px-4 py-3 text-left font-mono text-sm uppercase tracking-wide
                    border-b-2 border-ink last:border-b-0 transition-colors
                    ${option.value === value
                      ? 'bg-ink text-newsprint'
                      : 'bg-newsprint text-ink hover:bg-muted'
                    }
                  `}
                >
                  {option.value === value && (
                    <span className="mr-2">✓</span>
                  )}
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-center font-mono text-sm text-ink opacity-60">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
