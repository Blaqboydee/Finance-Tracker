import React from 'react'

const SpendlyLogo = ({ size = 48, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 200 200" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Background Circle */}
    <defs>
      <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#10B981", stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:"#3B82F6", stopOpacity:1}} />
      </linearGradient>
      
      {/* Shadow filter */}
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="rgba(0,0,0,0.15)"/>
      </filter>
      
      {/* Inner shadow for depth */}
      <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feOffset dx="0" dy="2"/>
        <feGaussianBlur stdDeviation="3" result="offset-blur"/>
        <feFlood floodColor="rgba(255,255,255,0.2)"/>
        <feComposite in2="offset-blur" operator="in"/>
      </filter>
    </defs>
    
    {/* Main circle background */}
    <circle cx="100" cy="100" r="85" fill="url(#bgGradient)" filter="url(#shadow)"/>
    
    {/* Inner highlight circle */}
    <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
    
    {/* Dollar sign */}
    <g transform="translate(100, 100)">
      <path d="M-8,-45 L-8,-35 M-8,35 L-8,45 M-25,-25 C-25,-35 -18,-40 -8,-40 C2,-40 15,-35 15,-20 C15,-8 5,-3 -8,0 C-21,3 -31,8 -31,20 C-31,35 -18,40 -8,40 C2,40 15,35 25,25" 
            stroke="white" 
            strokeWidth="6" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"/>
    </g>
    
    {/* Subtle accent elements */}
    <circle cx="140" cy="60" r="3" fill="rgba(255,255,255,0.3)"/>
    <circle cx="60" cy="140" r="2" fill="rgba(255,255,255,0.2)"/>
    
    {/* Small chart elements for finance theme */}
    <g transform="translate(150, 150)" opacity="0.3">
      <path d="M-10,5 L-5,0 L0,8 L5,-3 L10,2" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <circle cx="-10" cy="5" r="2" fill="rgba(255,255,255,0.4)"/>
      <circle cx="10" cy="2" r="2" fill="rgba(255,255,255,0.4)"/>
    </g>
  </svg>
);

export default SpendlyLogo