"use client";

import { useEffect, useState } from "react";

type NavbarContent = {
  logo: string;
  cta: { label: string; href: string };
};

type NavbarProps = {
  content: NavbarContent;
};

export function Navbar({ content }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrolledState = () => setIsScrolled(window.scrollY > 12);

    updateScrolledState();
    window.addEventListener("scroll", updateScrolledState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolledState);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar-inner">
        <a className="navbar-logo" href="#top" aria-label={`${content.logo} home`}>
          <span className="navbar-logo-mark" aria-hidden="true" />
          <span>{content.logo}</span>
        </a>

        <div className="navbar-actions">
          <button className="navbar-menu" type="button" aria-label="Open navigation menu" aria-expanded="false">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
          <a className="premium-button primary navbar-cta" href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      </div>
    </header>
  );
}
