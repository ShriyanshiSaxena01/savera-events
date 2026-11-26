import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, X } from 'lucide-react';
import { serviceHighlights } from '../data/services';

const categoryOptions = {
  weddings: [
    'Venue Selection',
    'Event Decoration',
    'Floral Arrangements',
    'Catering Coordination',
    'Photography',
    'Videography',
    'Entertainment / DJ',
    'Guest Management',
    'Invitation Design',
    'Lighting and Sound',
    'Makeup Artist Coordination',
    'Transportation',
    'Complete Event Management',
  ],
  corporate: [
    'Venue',
    'Stage and Branding',
    'Catering',
    'Photography',
    'Videography',
    'Audio-Visual Setup',
    'Guest Registration',
    'Entertainment',
    'Event Coordination',
  ],
  social: [
    'Theme Decoration',
    'Food and Beverage',
    'Photography',
    'Entertainment',
    'Guest Hospitality',
    'Music and DJ',
    'Cake and Dessert Styling',
    'Invitation & RSVP Coordination',
    'Event Coordination',
  ],
  private: [
    'Private Dining Setup',
    'Décor Styling',
    'Catering',
    'Floral Arrangements',
    'Lighting',
    'Entertainment',
    'Guest Seating',
    'Personalised Details',
    'Event Coordination',
  ],
};

const budgetOptions = [
  'Under ₹50,000',
  '₹50,000 – ₹1,00,000',
  '₹1,00,000 – ₹3,00,000',
  '₹3,00,000 – ₹5,00,000',
  'Above ₹5,00,000',
  'Not Decided Yet',
];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  eventDate: '',
  location: '',
  occasion: 'Weddings',
  services: [],
  guestCount: '',
  budget: '',
  preferredVenue: '',
  theme: '',
  requirements: '',
  otherServices: '',
};

function validateStepOne(values) {
  const errors = {};

  if (!values.fullName.trim()) errors.fullName = 'Full name is required';
  if (!values.email.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Valid email is required';
  if (!values.phone.trim()) errors.phone = 'Phone number is required';
  else if (!/^(\+91|91)?[6-9]\d{9}$/.test(values.phone.replace(/\s+/g, ''))) errors.phone = 'Enter a valid Indian mobile number';

  return errors;
}

export default function PlanEventModal({ open, onClose, initialCategory = 'Weddings' }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ ...initialForm, occasion: initialCategory });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setSubmitted(false);
      setStep(1);
      setForm({ ...initialForm, occasion: initialCategory });
      setErrors({});
    }
  }, [open, initialCategory]);

  const serviceList = useMemo(() => {
    const normalized = form.occasion.toLowerCase().replace(/[^a-z]/g, '');

    if (normalized.includes('wedding')) return categoryOptions.weddings;
    if (normalized.includes('corporate')) return categoryOptions.corporate;
    if (normalized.includes('social')) return categoryOptions.social;
    if (normalized.includes('private')) return categoryOptions.private;

    return categoryOptions.weddings;
  }, [form.occasion]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleOccasionSelect(occasion) {
    setForm((current) => ({ ...current, occasion, services: [] }));
  }

  function toggleService(service) {
    setForm((current) => {
      const exists = current.services.includes(service);
      return {
        ...current,
        services: exists ? current.services.filter((item) => item !== service) : [...current.services, service],
      };
    });
  }

  function removeService(service) {
    setForm((current) => ({
      ...current,
      services: current.services.filter((item) => item !== service),
    }));
  }

  function nextStep() {
    if (step === 1) {
      const validation = validateStepOne(form);
      setErrors(validation);
      if (Object.keys(validation).length) return;
    }
    setStep((current) => Math.min(current + 1, 5));
  }

  function prevStep() {
    setStep((current) => Math.max(current - 1, 1));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validation = validateStepOne(form);
    setErrors(validation);
    if (Object.keys(validation).length) {
      setStep(1);
      return;
    }

    const enquiry = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      eventDate: form.eventDate,
      location: form.location,
      occasion: form.occasion,
      services: form.services,
      guestCount: form.guestCount,
      budget: form.budget,
      preferredVenue: form.preferredVenue,
      theme: form.theme,
      requirements: form.requirements,
      otherServices: form.otherServices,
      submittedAt: new Date().toISOString(),
    };

    const whatsappNumber = '919999999999';
    const message = encodeURIComponent(
      `Hello Savera Events,\n\nI would like to enquire about a ${form.occasion} event.\nName: ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nDate: ${form.eventDate || 'Not specified'}\nLocation: ${form.location || 'Not specified'}\nGuest Count: ${form.guestCount || 'Not specified'}\nBudget: ${form.budget || 'Not specified'}\nSelected Services: ${form.services.join(', ') || 'Not specified'}\nAdditional Requirements: ${form.requirements || form.otherServices || 'None'}\n\nPlease contact me soon.`
    );

    const emailBody = encodeURIComponent(
      `Event enquiry from ${form.fullName}\nEmail: ${form.email}\nPhone: ${form.phone}\nOccasion: ${form.occasion}\nDate: ${form.eventDate || 'Not specified'}\nLocation: ${form.location || 'Not specified'}\nGuest Count: ${form.guestCount || 'Not specified'}\nBudget: ${form.budget || 'Not specified'}\nServices: ${form.services.join(', ') || 'Not specified'}\nAdditional Requirements: ${form.requirements || form.otherServices || 'None'}`
    );

    enquiry.whatsappMessage = `https://wa.me/${whatsappNumber}?text=${message}`;
    enquiry.emailLink = `mailto:hello@saveraevents.com?subject=${encodeURIComponent(`Event Enquiry - ${form.occasion}`)}&body=${emailBody}`;

    localStorage.setItem('saveraEnquiry', JSON.stringify(enquiry));
    setSubmitted(true);
  }

  if (!open) return null;

  return (
    <div className="modal-overlay" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="event-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close plan your event form">
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div className="modal-header">
              <p className="eyebrow">PLAN YOUR EVENT</p>
              <h2>Let us shape your next celebration</h2>
            </div>

            <div className="progress-steps" aria-label="Progress indicator">
              {[1, 2, 3, 4, 5].map((value) => (
                <span key={value} className={value <= step ? 'step active' : 'step'}>{value}</span>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="event-form">
              {step === 1 && (
                <div className="form-step">
                  <h3>Your Details</h3>
                  <div className="form-grid two-col">
                    <label>
                      <span>Full Name</span>
                      <input name="fullName" value={form.fullName} onChange={handleInputChange} />
                      {errors.fullName && <small>{errors.fullName}</small>}
                    </label>
                    <label>
                      <span>Email Address</span>
                      <input name="email" type="email" value={form.email} onChange={handleInputChange} />
                      {errors.email && <small>{errors.email}</small>}
                    </label>
                    <label>
                      <span>Phone Number</span>
                      <input name="phone" value={form.phone} onChange={handleInputChange} placeholder="+91 98765 43210" />
                      {errors.phone && <small>{errors.phone}</small>}
                    </label>
                    <label>
                      <span>Event Date</span>
                      <input name="eventDate" type="date" value={form.eventDate} onChange={handleInputChange} />
                    </label>
                    <label className="full-width">
                      <span>Event City / Location</span>
                      <input name="location" value={form.location} onChange={handleInputChange} placeholder="Mumbai, Delhi, Bengaluru..." />
                    </label>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="form-step">
                  <h3>Choose Your Occasion</h3>
                  <div className="occasion-grid">
                    {serviceHighlights.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        className={form.occasion === service.category ? 'occasion-card selected' : 'occasion-card'}
                        onClick={() => handleOccasionSelect(service.category)}
                      >
                        <span>{service.category}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="form-step">
                  <h3>Make It Yours</h3>
                  <p className="muted-copy">Every celebration is unique. Choose the services you need, and we’ll craft a personalised experience around your vision.</p>
                  <div className="service-checkboxes">
                    {serviceList.map((service) => (
                      <label key={service} className="check-item">
                        <input
                          type="checkbox"
                          checked={form.services.includes(service)}
                          onChange={() => toggleService(service)}
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                    <label className="full-width">
                      <span>Other Services</span>
                      <input name="otherServices" value={form.otherServices} onChange={handleInputChange} placeholder="Describe anything else you need" />
                    </label>
                  </div>

                  <div className="package-summary">
                    <h4>Your Custom Package</h4>
                    {form.services.length ? (
                      <ul>
                        {form.services.map((service) => (
                          <li key={service}>
                            <span>{service}</span>
                            <button type="button" onClick={() => removeService(service)} aria-label={`Remove ${service}`}>
                              <X size={12} />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No services selected yet.</p>
                    )}
                    <div className="custom-quote">Custom Quote</div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="form-step">
                  <h3>Event Preferences</h3>
                  <div className="form-grid two-col">
                    <label>
                      <span>Estimated Guest Count</span>
                      <input name="guestCount" value={form.guestCount} onChange={handleInputChange} placeholder="e.g. 250 guests" />
                    </label>
                    <label>
                      <span>Approximate Budget</span>
                      <select name="budget" value={form.budget} onChange={handleInputChange}>
                        <option value="">Select budget range</option>
                        {budgetOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Preferred Venue / Location</span>
                      <input name="preferredVenue" value={form.preferredVenue} onChange={handleInputChange} placeholder="Desired venue or city" />
                    </label>
                    <label>
                      <span>Theme or Style Preference</span>
                      <input name="theme" value={form.theme} onChange={handleInputChange} placeholder="Modern, vintage, floral, etc." />
                    </label>
                    <label className="full-width">
                      <span>Additional Requirements</span>
                      <textarea name="requirements" value={form.requirements} onChange={handleInputChange} rows="4" placeholder="Share any ideas, must-haves, or special notes" />
                    </label>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="form-step">
                  <h3>Review & Submit</h3>
                  <div className="summary-panel">
                    <div><strong>Name:</strong> {form.fullName}</div>
                    <div><strong>Email:</strong> {form.email}</div>
                    <div><strong>Phone:</strong> {form.phone}</div>
                    <div><strong>Event type:</strong> {form.occasion}</div>
                    <div><strong>Event date:</strong> {form.eventDate || 'Not provided'}</div>
                    <div><strong>Location:</strong> {form.location || 'Not provided'}</div>
                    <div><strong>Guest count:</strong> {form.guestCount || 'Not provided'}</div>
                    <div><strong>Budget:</strong> {form.budget || 'Not provided'}</div>
                    <div><strong>Selected services:</strong> {form.services.length ? form.services.join(', ') : 'None selected'}</div>
                    <div><strong>Additional requirements:</strong> {form.requirements || form.otherServices || 'None'}</div>
                  </div>
                </div>
              )}

              <div className="modal-actions">
                {step > 1 && (
                  <button type="button" className="button button-secondary" onClick={prevStep}>
                    <ArrowLeft size={16} /> Back
                  </button>
                )}
                {step < 5 ? (
                  <button type="button" className="button button-primary" onClick={nextStep}>
                    Next <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" className="button button-primary">
                    SEND MY EVENT ENQUIRY
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          <div className="thank-you-panel">
            <Check size={48} />
            <h3>Thank you for choosing Savera Events!</h3>
            <p>Your celebration begins here. Our team will get in touch with you soon.</p>
            <div className="submit-links">
              <a href={JSON.parse(localStorage.getItem('saveraEnquiry')).whatsappMessage} target="_blank" rel="noreferrer" className="button button-primary">
                Send via WhatsApp
              </a>
              <a href={JSON.parse(localStorage.getItem('saveraEnquiry')).emailLink} className="button button-secondary">
                Send via Email
              </a>
            </div>
            <button type="button" className="button button-primary" onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
}
