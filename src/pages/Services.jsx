import { Link } from 'react-router-dom';
import { serviceHighlights } from '../data/services';

export default function Services() {
  return (
    <main className="page-shell page-section">
      <section className="container services-intro">
        <p className="eyebrow">OUR SERVICES</p>
        <h1>Every Occasion Deserves Something Extraordinary</h1>
      </section>

      {serviceHighlights.map((service, index) => (
        <section key={service.id} id={service.id} className="service-detail-section">
          <div className="container service-detail-grid">
            <div className={index % 2 === 0 ? 'service-media' : 'service-media order-2'}>
              <img src={service.image} alt={service.title} />
            </div>
            <div className={index % 2 === 0 ? 'service-content' : 'service-content order-1'}>
              <p className="eyebrow">{service.category}</p>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <ul className="offer-list">
                {service.offerings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link
                to="/plan-your-event"
                className="button button-primary"
                state={{ category: service.category }}
              >
                CUSTOMISE YOUR EVENT
              </Link>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
