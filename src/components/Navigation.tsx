'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Navigation.css';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { path: '/', label: '🌦️ Weather', icon: '🌦️' },
    { path: '/countries', label: '🌍 Countries', icon: '🌍' },
    { path: '/news', label: '📰 News', icon: '📰' },
  ];

  return (
    <nav className="navigation">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`nav-link ${pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

