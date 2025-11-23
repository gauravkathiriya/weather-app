'use client';

import './LoadingSkeleton.css';

export default function LoadingSkeleton() {
  return (
    <div className="loading-skeleton glass-card">
      <div className="skeleton-header">
        <div className="skeleton skeleton-text skeleton-title"></div>
        <div className="skeleton skeleton-icon"></div>
      </div>
      <div className="skeleton skeleton-temp"></div>
      <div className="skeleton skeleton-desc"></div>
      <div className="skeleton-stats">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton skeleton-stat"></div>
        ))}
      </div>
    </div>
  );
}

