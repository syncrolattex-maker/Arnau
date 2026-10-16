import React from 'react';

/**
 * SuperHi Decorative Shapes Layer
 * 5 primitives: pentagon, triangle, semicircle, star, circle
 * 5 accent colors: #ffda00 (hi-yellow), #ff4141 (marker-red), #ffbac4 (bubblegum-pink), #91d8ec (powder-sky), #16ab59 (jelly-green)
 * 0px border-radius, zero shadow, rotated -15deg to +15deg, overflowing canvas edges
 */
export const DecorativeShapes: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {/* 1. Large Marker-Red Semicircle - Top Left spilling off-screen */}
      <svg
        width="380"
        height="380"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '-100px',
          left: '-90px',
          transform: 'rotate(-12deg)',
        }}
      >
        <path d="M 0,100 A 100,100 0 0,1 200,100 Z" fill="#ff4141" />
      </svg>

      {/* 2. Hi-Yellow Pentagon - Top Right spilling off */}
      <svg
        width="420"
        height="420"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '-60px',
          right: '-120px',
          transform: 'rotate(14deg)',
        }}
      >
        <polygon
          points="100,10 195,78 160,190 40,190 5,78"
          fill="#ffda00"
        />
      </svg>

      {/* 3. Jelly-Green Triangle - Mid Left */}
      <svg
        width="280"
        height="280"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '38%',
          left: '-80px',
          transform: 'rotate(9deg)',
        }}
      >
        <polygon points="100,15 190,185 10,185" fill="#16ab59" />
      </svg>

      {/* 4. Bubblegum-Pink Star - Mid Right */}
      <svg
        width="340"
        height="340"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          top: '46%',
          right: '-100px',
          transform: 'rotate(-8deg)',
        }}
      >
        <polygon
          points="100,10 125,70 190,75 140,118 155,185 100,150 45,185 60,118 10,75 75,70"
          fill="#ffbac4"
        />
      </svg>

      {/* 5. Powder-Sky Circle - Bottom Left */}
      <svg
        width="360"
        height="360"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '5%',
          transform: 'rotate(6deg)',
        }}
      >
        <circle cx="100" cy="100" r="95" fill="#91d8ec" />
      </svg>

      {/* 6. Hi-Yellow Triangle - Bottom Right */}
      <svg
        width="300"
        height="300"
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          bottom: '-90px',
          right: '-50px',
          transform: 'rotate(-14deg)',
        }}
      >
        <polygon points="20,180 180,180 100,20" fill="#ffe54d" />
      </svg>
    </div>
  );
};
