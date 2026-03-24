import React from 'react';
import './Footer.css';

/**
 * Footer - THE BLOG footer matching Figma node 1:324.
 * © 2023 + social links row with gap 14px per Figma layout_3HG6IS.
 */
// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer className="tb-footer" role="contentinfo">
      <div className="tb-footer-inner">
        <span className="tb-footer-copy">© 2023</span>
        <nav className="tb-footer-menu" aria-label="Footer navigation">
          <a href="#twitter" className="tb-footer-link">Twitter</a>
          <a href="#linkedin" className="tb-footer-link">LinkedIn</a>
          <a href="#email" className="tb-footer-link">Email</a>
          <a href="#rss" className="tb-footer-link">RSS feed</a>
          <a href="#feedly" className="tb-footer-link">Add to Feedly</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
