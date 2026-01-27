import { SvgIcon } from '@mui/material';

function Logo({ sx, ...props }) {
  return (
    <SvgIcon sx={sx} {...props} viewBox="0 0 100 100">
      {/* Speech bubble outline - Purple gradient */}
      <defs>
        <linearGradient id="bubbleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#667eea', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#764ba2', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#f093fb', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#f5576c', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="briefcaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4facfe', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#00f2fe', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      
      {/* Speech bubble outer */}
      <path
        d="M 20 25 Q 20 15 30 15 L 70 15 Q 80 15 80 25 L 80 55 Q 80 65 70 65 L 55 65 L 50 75 L 45 65 L 30 65 Q 20 65 20 55 Z"
        fill="url(#bubbleGradient)"
      />
      
      {/* Inner speech bubble (white background) */}
      <path
        d="M 25 28 Q 25 20 32 20 L 68 20 Q 75 20 75 28 L 75 52 Q 75 60 68 60 L 54 60 L 50 68 L 46 60 L 32 60 Q 25 60 25 52 Z"
        fill="white"
      />
      
      {/* Stylized "W" - Purple - Bold and clear */}
      <text
        x="50"
        y="48"
        fontSize="28"
        fontWeight="900"
        fontFamily="Arial, sans-serif"
        fill="#667eea"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        W
      </text>
      
      {/* Book - Pink/Red gradient */}
      <rect x="62" y="70" width="28" height="20" rx="2" fill="url(#bookGradient)" />
      <rect x="64" y="72" width="24" height="16" rx="1" fill="white" />
      <line x1="67" y1="76" x2="85" y2="76" stroke="#f5576c" strokeWidth="1.5" opacity="0.7" />
      <line x1="67" y1="80" x2="85" y2="80" stroke="#f5576c" strokeWidth="1.5" opacity="0.7" />
      <line x1="67" y1="84" x2="80" y2="84" stroke="#f5576c" strokeWidth="1.5" opacity="0.7" />
      
      {/* Briefcase - Blue gradient */}
      <rect x="10" y="75" width="22" height="15" rx="2" fill="url(#briefcaseGradient)" />
      <path d="M 15 75 L 15 72 Q 15 70 17 70 L 25 70 Q 27 70 27 72 L 27 75" fill="#4facfe" />
      <rect x="12" y="82" width="18" height="1.5" rx="0.5" fill="white" opacity="0.6" />
    </SvgIcon>
  );
}

export default Logo;
