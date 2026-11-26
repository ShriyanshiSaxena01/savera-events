import { ArrowRight, CalendarCheck2, Heart, Sparkles, Star, Wand2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { homeServices } from '../data/services';
import { galleryItems } from '../data/gallery';

const featureList = [
  { icon: CalendarCheck2, title: 'Personalised Planning', text: 'Every detail is designed around your story.' },
  { icon: Wand2, title: 'Creative Concepts', text: 'Distinctive styling shaped by your vision.' },
  { icon: Sparkles, title: 'Seamless Execution', text: 'Smooth, stress-free experiences from concept to final moment.' },
  { icon: Heart, title: 'Memorable Moments', text: 'Beautiful guest experiences that linger long after the event.' },
];

export default function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container hero-shell">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">LUXURY EVENT PLANNING</p>
            <h1>
              Every celebration,
              <span> A beautiful beginning</span>
            </h1>
            <p className="hero-copy">
              From intimate gatherings to grand celebrations, Savera Events crafts moments that feel like you.
            </p>
            <div className="button-row">
              <Link to="/plan-your-event" className="button button-primary">LET'S PLAN</Link>
              <Link to="/services" className="button button-secondary">EXPLORE OUR SERVICES</Link>
            </div>
          </div>
        </div>
      </section>

      <main className="page-shell">
        <section className="services-overview">
          <div className="container services-block">
            <div className="section-heading align-center">
              <p className="eyebrow">OUR SERVICES</p>
              <h2>
                Tailored Celebrations
                <span> for Every Occasion</span>
              </h2>
              <p>
                Whether it’s a wedding, corporate gathering, or intimate celebration, we bring your vision to life with creativity, care, and seamless planning.
              </p>
            </div>

            <div className="service-card-grid">
              {homeServices.map((item) => (
                <Link key={item.id} to={`/services#${item.id}`} className="service-card-image">
                  <img src={item.image} alt={item.title} />
                  <div className="service-overlay">
                    <span>{item.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="features-band">
          <div className="container feature-inner">
            <div className="section-heading align-center invert">
              <p className="eyebrow">WHY CHOOSE US</p>
              <h2>
                More Than Just Events,
                <span> We Create Experiences</span>
              </h2>
            </div>

            <div className="feature-grid">
              {featureList.map(({ icon: Icon, title, text }) => (
                <div key={title} className="feature-item">
                  <div className="feature-icon"><Icon size={22} /></div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="about-feature">
          <div className="container split-layout">
            <div className="split-image">
              <img src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80" alt="Luxury event planning" />
            </div>
            <div className="split-copy">
              <p className="eyebrow">ABOUT SAVERA</p>
              <h2>
                Thoughtfully Planned,
                <span> Beautifully Celebrated</span>
              </h2>
              <p>
                Savera Events creates refined, personal experiences with warmth, creativity, and precision. We believe the best celebrations feel effortless because every meaningful detail has been considered.
              </p>
              <Link to="/about" className="button button-primary">LEARN MORE</Link>
            </div>
          </div>
        </section>

        <section className="featured-section">
          <div className="container">
            <div className="section-heading align-center">
              <p className="eyebrow">FEATURED CELEBRATIONS</p>
            </div>
            <div className="gallery-preview-grid">
              {galleryItems.slice(0, 4).map((item) => (
                <article key={item.id} className="preview-card">
                  <img src={item.image} alt={item.title} />
                  <div className="preview-copy">
                    <span>{item.category}</span>
                    <h3>{item.title}</h3>
                  </div>
                </article>
              ))}
            </div>
            <div className="cta-center">
              <Link to="/gallery" className="button button-primary">VIEW OUR GALLERY</Link>
            </div>
          </div>
        </section>

        <section className="cta-band">
          <div className="container cta-box">
            <div>
              <p className="eyebrow">START YOUR STORY</p>
              <h2>Your Dream Celebration Starts Here</h2>
            </div>
            <p>Tell us your vision, and let’s create something unforgettable.</p>
            <Link to="/plan-your-event" className="button button-primary">PLAN YOUR EVENT</Link>
          </div>
        </section>
      </main>
    </>
  );
}
