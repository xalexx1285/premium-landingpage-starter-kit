"use client";

import { useEffect, useRef, useState } from "react";

type NavLink = {
  label: string;
  href: string;
};

type NavbarContent = {
  logo: string;
  cta: { label: string; href: string };
};

type NavbarProps = {
  content: NavbarContent;
  navLinks?: readonly NavLink[];
};

export function Navbar({ content, navLinks }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement>(null);
  const mobileLinks = navLinks?.length ? navLinks : [content.cta];

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 12);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

  return (
    <header ref={headerRef} className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a className="navbar-logo" href="#top" aria-label={`${content.logo} home`}>
          <span className="navbar-logo-mark" aria-hidden="true" />
          <span>{content.logo}</span>
        </a>

        <div className="navbar-actions">
          <button
            className="navbar-menu"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <a className="premium-button primary navbar-cta" href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {mobileLinks.map((link) => (
            <a key={`${link.label}-${link.href}`} href={link.href} onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
