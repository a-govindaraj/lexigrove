import { SvgIcon } from '@mui/material';

// Lexigrove mark: a sprout rising from an open book, set in a rounded tile so it
// stays crisp and visible on both the green app bar and light backgrounds.
function Logo({ sx, ...props }) {
  return (
    <SvgIcon sx={sx} {...props} viewBox="0 0 64 64">
      <defs>
        <linearGradient id="lgLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5FA777" />
          <stop offset="100%" stopColor="#2E6B4F" />
        </linearGradient>
      </defs>

      {/* App tile */}
      <rect x="3" y="3" width="58" height="58" rx="16" fill="#FFFFFF" />
      <rect x="3" y="3" width="58" height="58" rx="16" fill="none" stroke="rgba(31,77,56,0.12)" strokeWidth="1.5" />

      {/* Stem */}
      <path d="M32 46 L32 27" stroke="#2E6B4F" strokeWidth="3.2" strokeLinecap="round" fill="none" />

      {/* Left leaf */}
      <path d="M32 35 C25 35 19.5 31 18 24 C25.5 23 32 27 32 35 Z" fill="url(#lgLeaf)" />
      {/* Right leaf (the sprout tip) */}
      <path d="M32 30 C32 22 38 14.5 46.5 13 C48 22 42 30 32 30 Z" fill="url(#lgLeaf)" />

      {/* Open book */}
      <path
        d="M14 44 C21 40 28 40 32 44 C36 40 43 40 50 44 L50 51 C43 47 36 47 32 51 C28 47 21 47 14 51 Z"
        fill="#1F4D38"
      />
      {/* Spine + page hints */}
      <path d="M32 44 L32 51" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />

      {/* Sparkles shining off the leaves */}
      <path d="M47 7.5 L47.9 11.1 L51.5 12 L47.9 12.9 L47 16.5 L46.1 12.9 L42.5 12 L46.1 11.1 Z" fill="#F4B740">
        <animate attributeName="opacity" values="0.25;1;0.25" dur="2.4s" repeatCount="indefinite" />
      </path>
      <path d="M53 20.4 L53.5 22.5 L55.6 23 L53.5 23.5 L53 25.6 L52.5 23.5 L50.4 23 L52.5 22.5 Z" fill="#F4B740">
        <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" begin="0.6s" repeatCount="indefinite" />
      </path>
    </SvgIcon>
  );
}

export default Logo;
