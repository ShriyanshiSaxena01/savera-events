import { Link } from 'react-router-dom';
import { Camera, Globe, Mail, MapPin, Phone } from 'lucide-react';
import { brand } from '../data/brand';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="brand-block footer-brand">
            <span className="brand-mark">✦</span>
            <div>
              <div className="brand-name">{brand.name}</div>
              <div className="brand-tag">{brand.tagline}</div>
            </div>
          </Link>
          <p className="footer-tagline">Every celebration, A beautiful beginning</p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4>Services</h4>
          <ul className="footer-links">
            <li><Link to="/services">Weddings</Link></li>
            <li><Link to="/services">Corporate</Link></li>
            <li><Link to="/services">Social Gatherings</Link></li>
            <li><Link to="/services">Private Events</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-links contact-list">
            <li><Phone size={14} /><span>{brand.phone}</span></li>
            <li><Mail size={14} /><span>{brand.email}</span></li>
            <li><MapPin size={14} /><span>{brand.location}</span></li>
          </ul>
          <div className="social-links">
            <a href="https://instagram.com" aria-label="Instagram"><Camera size={16} /></a>
            <a href="https://facebook.com" aria-label="Facebook"><Globe size={16} /></a>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2025 Savera Events</span>
      </div>
    </footer>
  );
}
