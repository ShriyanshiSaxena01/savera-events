import EnquiryForm from '../components/EnquiryForm';
import { contactDetails } from '../data/contact';
import { Mail, MapPin, Phone, MessageCircle, Camera } from 'lucide-react';

export default function Contact() {
  return (
    <main className="page-shell page-section">
      <section className="container contact-hero">
        <div>
          <p className="eyebrow">CONTACT</p>
          <h1>Let’s Begin Something Beautiful</h1>
        </div>
      </section>

      <section className="container contact-layout">
        <div className="contact-details">
          <h2>Get in touch</h2>
          <ul>
            <li><Phone size={16} /> <a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a></li>
            <li><Mail size={16} /> <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a></li>
            <li><Camera size={16} /> <a href={`https://instagram.com/${contactDetails.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">{contactDetails.instagram}</a></li>
            <li><MessageCircle size={16} /> <a href={`https://wa.me/${contactDetails.whatsapp}`} target="_blank" rel="noreferrer">{contactDetails.whatsapp}</a></li>
            <li><MapPin size={16} /> <span>{contactDetails.location}</span></li>
          </ul>
        </div>

        <EnquiryForm title="Tell us about your event" />
      </section>
    </main>
  );
}
