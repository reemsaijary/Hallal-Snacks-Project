
import "../Styling/Contact.css";
function Contact() {

  const pageStyle = {
    backgroundImage: "url('/assets/contact-bg.png')",
  };
  return (
    <div className="contact-page" style={pageStyle}>
      
      {/* Header */}
      <section className="contact-header text-center py-5">
        <h1 className="contact-title text-white mb-3">Contact Us</h1>
        <h3 className="get-in-touch text-white-50 mt-5 mb-3 fw-bold">
         GET IN TOUCH
        </h3>
        <p className="description text-white-50 mx-auto" style={{ maxWidth: '700px' }}>
            We're here to help! Whether you need to make a reservation or 
            want to let us know about your experience, we encourage you to connect
            directly with the Hallal Snacks team. We genuinely value your feedback 
            as it helps us deliver the best possible service and quality.
        </p>
      </section>

      {/* Main Section */}
      <section className="contact-content container py-5">
        <div className="row justify-content-center">

          {/* LEFT INFO */}
          <div className="col-lg-5 col-md-10 col-12 contact-info">
            <div className="info-block">
              <h5 className="info-title">Address</h5>
              <p className="info-text">Al Berke street, Ankoun, South Lebanon</p>
            </div>
            <div className="info-block">
              <h5 className="info-title">Phone Number</h5>
              <p className="info-text">+961 03 675 158</p>
            </div>
            <div className="info-block">
              <h5 className="info-title">Email</h5>
              <p className="info-text">hallalsnacks@gmail.com</p>
            </div>
            <div className="info-block">
              <h5 className="info-title">Follow Us</h5>
              <div className="social-icons d-flex gap-2">
                <a href="https://wa.me/96103675158" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/icons/Whatsapp.png" alt="WhatsApp" />
                </a>
                <a href="https://www.facebook.com/@hallalsnacks" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/icons/facebook.png" alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/hallalsnacks" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/icons/instagram.png" alt="Instagram" />
                </a>
                <a href="https://www.tiktok.com/@hallalsnacks26" target="_blank" rel="noopener noreferrer">
                  <img src="/assets/icons/tiktok.png" alt="TikTok" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-5 col-md-10 col-12">
            <div className="contact-form-card p-4">
              <form>
                <div className="row mb-3">
                  <div className="col-6 pe-2">
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                  <div className="col-6 ps-2">
                    <input type="text" className="form-control" placeholder="Your Phone Number" required />
                  </div>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subject" required />
                </div>
                <div className="mb-4">
                  <textarea className="form-control" rows="5" placeholder="Your Feedback" required></textarea>
                </div>
                <button type="submit" className="btn book-table-btn w-100">SEND MESSAGE</button>
              </form>
            </div>
          </div>

        </div>
      </section>
      
    </div>
  );
}

export default Contact;
