import React from "react";
import useForm from "../hooks/useForm";
import DisplayComponent from './DisplayComponent';

const ContactForm = () => {

  const [form, errors, displayData, handleSubmit, handleChange] = useForm();

  return (
    <div className="App">
      <h1>Contact Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name*</label>
          <input
            onChange={handleChange}
            name="firstName"
            value={form.firstName}
            id="firstName"
            placeholder="Edd"
          />
          {(errors.firstName) && <p data-testid="error">Error: {errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName">Last Name*</label>
          <input
            onChange={handleChange}
            id="lastName"
            name="lastName"
            value={form.lastName}
            placeholder="Burke"
          />
          {(errors.lastName) && <p data-testid="error">Error: {errors.lastName}</p>}
        </div>

        <div>
          <label htmlFor="email">Email*</label>
          <input 
            onChange={handleChange}
            id="email"
            name="email" 
            value={form.email}
            placeholder="bluebill1049@hotmail.com"
          />
          {(errors.email) && <p data-testid="error">Error: {errors.email}</p>}
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <input
            onChange={handleChange}
            name="message"
            id="message"
            value={form.message}
          />
          {(errors.message) && <p data-testid="error">Error: {errors.message}</p>}
        </div>

        {displayData && <DisplayComponent form={form}/>}

        <button>Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;