import React, { useState } from 'react';
import { FcCustomerSupport } from 'react-icons/fc';

const CustomerSupportForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSupportModal = () => {
    setIsModalOpen(true);
  };

  const closeSupportModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log('Form submitted');
  
    // Show an alert to the user
    window.alert('Your message has been submitted ! We will get back to you soon Thank you For your patience.');
  
    // Optionally, you can close the modal or reset the form after submission
    closeSupportModal();
  };

  return (
    <div>
      <div className="s-icon" onClick={openSupportModal}>
        <FcCustomerSupport />
      </div>

      {isModalOpen && (
        <div className="customer-support-form">
          <div className="blur-background"></div>
          <div className="form-container">
            <div className="close-button" onClick={closeSupportModal}>
              X
            </div>

            <h2>Contact Customer Support</h2>
            <p>
              Please provide details about your inquiry, and we'll get back to
              you as soon as possible.
            </p>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input type="text" name="name" />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" name="email" />
              </div>
              <div>
                <label>Message:</label>
                <textarea name="message" />
              </div>
              <button type="submit">Submit</button>
            </form>

            {/* <button onClick={closeSupportModal}>Close</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSupportForm;
