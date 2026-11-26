import { useState } from 'react';

const initialValues = {
  fullName: '',
  phone: '',
  email: '',
  occasion: 'Wedding',
  message: '',
};

export default function EnquiryForm({ title = 'Let\'s Create Something Beautiful Together' }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!values.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!values.phone.trim()) nextErrors.phone = 'Phone number is required';
    if (!values.email.trim()) nextErrors.email = 'Email address is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) nextErrors.email = 'Enter a valid email address';
    if (!values.occasion.trim()) nextErrors.occasion = 'Please select an occasion';

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSuccess('');
      return;
    }

    const payload = {
      ...values,
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem('saveraEnquiryForm', JSON.stringify(payload));
    setSuccess('Your enquiry has been saved successfully. Our team will reach out soon.');
    setValues(initialValues);
    setErrors({});
  };

  return (
    <form className="enquiry-form" onSubmit={handleSubmit} noValidate>
      <h3>{title}</h3>
      <div className="form-grid two-col">
        <label>
          <span>Full Name</span>
          <input name="fullName" value={values.fullName} onChange={handleChange} />
          {errors.fullName && <small>{errors.fullName}</small>}
        </label>

        <label>
          <span>Phone Number</span>
          <input name="phone" value={values.phone} onChange={handleChange} />
          {errors.phone && <small>{errors.phone}</small>}
        </label>

        <label>
          <span>Email Address</span>
          <input name="email" type="email" value={values.email} onChange={handleChange} />
          {errors.email && <small>{errors.email}</small>}
        </label>

        <label>
          <span>Occasion / Event Type</span>
          <select name="occasion" value={values.occasion} onChange={handleChange}>
            <option value="Wedding">Wedding</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Social Gathering">Social Gathering</option>
            <option value="Private Event">Private Event</option>
          </select>
          {errors.occasion && <small>{errors.occasion}</small>}
        </label>
      </div>

      <label>
        <span>Message</span>
        <textarea name="message" rows="5" value={values.message} onChange={handleChange} placeholder="Tell us about your vision..." />
      </label>

      {success && <p className="form-success">{success}</p>}
      <button type="submit" className="button button-primary">SEND ENQUIRY</button>
    </form>
  );
}
