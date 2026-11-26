import EnquiryForm from '../components/EnquiryForm';
import { founders } from '../data/founders';

const values = [
  { title: 'Thoughtful Planning', text: 'We design every celebration with intention, clarity, and quiet confidence.' },
  { title: 'Beautiful Details', text: 'From florals to flow, every touchpoint feels elevated and personal.' },
  { title: 'Meaningful Experiences', text: 'The result is a celebration that feels warm, memorable, and truly yours.' },
];

export default function About() {
  return (
    <main className="page-shell page-section">
      <section className="page-hero" style={{ backgroundImage: 'linear-gradient(rgba(19, 12, 14, 0.45), rgba(19, 12, 14, 0.45)), url(https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1400&q=80)' }}>
        <div className="container">
          <p className="eyebrow">ABOUT US</p>
          <h1>The Story Behind Savera</h1>
          <p>
            We design meaningful celebrations with a refined eye for detail, warm hospitality, and unforgettable atmosphere.
          </p>
        </div>
      </section>

      <section className="container about-story">
        <div className="story-copy">
          <p className="eyebrow">OUR STORY</p>
          <h2>Celebrations shaped by feeling, detail, and intention.</h2>
          <p>
            Savera Events was created to make celebration planning feel personal, effortless, and beautifully considered. We believe every event should reflect the people, moments, and emotions at its heart — not just the visual design.
          </p>
          <p>
            Whether it is an intimate gathering or a grand occasion, we approach each project with thoughtful coordination, elevated styling, and a dedication to making every guest feel warmly welcomed.
          </p>
        </div>
        <div className="story-image">
          <img src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1000&q=80" alt="Wedding table styling" />
        </div>
      </section>

      <section className="container founders-section">
        <div className="section-heading align-center">
          <p className="eyebrow">THE PEOPLE BEHIND THE MAGIC</p>
          <h2>The People Behind the Magic</h2>
        </div>

        <div className="founders-grid">
          {founders.map((founder) => (
            <article key={founder.id} className="founder-card">
              <img src={founder.image} alt={founder.name} />
              <div className="founder-content">
                <h3>{founder.name}</h3>
                <p className="role">{founder.role}</p>
                <p>{founder.intro}</p>
                <a href={founder.social}>Connect</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="container philosophy-section">
        <div className="section-heading align-center">
          <p className="eyebrow">OUR PHILOSOPHY</p>
          <h2>Designing celebrations with heart and intention</h2>
        </div>

        <div className="philosophy-grid">
          {values.map((value) => (
            <div key={value.title} className="philosophy-card">
              <h3>{value.title}</h3>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container contact-form-wrap">
        <EnquiryForm />
      </section>
    </main>
  );
}
