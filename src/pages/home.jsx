import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tag">✨ WE CREATE UNFORGETTABLE MOMENTS</p>

          <h1>
            Your Event.
            <br />
            <span>Our Expertise.</span>
          </h1>

          <p className="hero-text">
            From weddings and birthdays to corporate celebrations,
            we plan beautiful events that you and your guests will never forget.
          </p>

          <div className="hero-buttons">
            <Link to="/events" className="primary-btn">
              Explore Events →
            </Link>

            <Link to="/register" className="secondary-btn">
              Get Started
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-image">
            <span>EVENT PLANNING</span>
          </div>

          <div className="floating-card">
            <strong>500+</strong>
            <small>Events Created</small>
          </div>
        </div>
      </section>


      {/* SERVICES */}
      <section className="services">
        <div className="section-heading">
          <p>WHAT WE DO</p>
          <h2>Everything You Need For Your Perfect Event</h2>
        </div>

        <div className="service-grid">

          <div className="service-card">
            <div className="service-icon">💍</div>
            <h3>Wedding Planning</h3>
            <p>
              We take care of every detail so you can focus on
              celebrating your special day.
            </p>
            <Link to="/events">Learn More →</Link>
          </div>

          <div className="service-card">
            <div className="service-icon">🎂</div>
            <h3>Birthday Parties</h3>
            <p>
              Create unforgettable birthday experiences with
              beautiful decorations and entertainment.
            </p>
            <Link to="/events">Learn More →</Link>
          </div>

          <div className="service-card">
            <div className="service-icon">🏢</div>
            <h3>Corporate Events</h3>
            <p>
              Professional event planning for conferences,
              meetings, launches and corporate celebrations.
            </p>
            <Link to="/events">Learn More →</Link>
          </div>

        </div>
      </section>

      {/* PACKAGES */}
<section className="packages">

  <div className="section-heading">
    <p>OUR PACKAGES</p>
    <h2>Choose The Perfect Package For Your Event</h2>
    <span>
      Flexible event packages designed to fit different celebrations and budgets.
    </span>
  </div>

  <div className="package-grid">

    {/* SILVER */}
    <div className="package-card">

      <p className="package-name">SILVER</p>

      <h3>
        ₦150,000
      </h3>

      <span className="package-subtitle">
        Perfect for intimate celebrations
      </span>

      <ul>
        <li>✓ Event planning</li>
        <li>✓ Basic decoration</li>
        <li>✓ Guest coordination</li>
        <li>✓ Event day support</li>
      </ul>

      <Link to="/register" className="package-button">
        Choose Silver
      </Link>

    </div>


    {/* GOLD */}
    <div className="package-card featured">

      <div className="popular-badge">
        MOST POPULAR
      </div>

      <p className="package-name">GOLD</p>

      <h3>
        ₦350,000
      </h3>

      <span className="package-subtitle">
        Our complete event experience
      </span>

      <ul>
        <li>✓ Full event planning</li>
        <li>✓ Premium decoration</li>
        <li>✓ Guest coordination</li>
        <li>✓ Entertainment coordination</li>
        <li>✓ Event day management</li>
      </ul>

      <Link to="/register" className="package-button">
        Choose Gold
      </Link>

    </div>


    {/* PLATINUM */}
    <div className="package-card">

      <p className="package-name">PLATINUM</p>

      <h3>
        ₦700,000
      </h3>

      <span className="package-subtitle">
        The ultimate premium experience
      </span>

      <ul>
        <li>✓ Complete event planning</li>
        <li>✓ Luxury decoration</li>
        <li>✓ Full guest management</li>
        <li>✓ Entertainment management</li>
        <li>✓ Dedicated event coordinator</li>
      </ul>

      <Link to="/register" className="package-button">
        Choose Platinum
      </Link>

    </div>

  </div>

</section>


{/* GALLERY */}
<section className="gallery-section">

  <div className="section-heading">
    <p>OUR WORK</p>
    <h2>Moments We've Helped Create</h2>
    <span>
      A glimpse of the beautiful experiences we create for our clients.
    </span>
  </div>

  <div className="gallery-grid">

    <div className="gallery-item">
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80"
        alt="Wedding event"
      />
      <div className="gallery-overlay">
        <span>WEDDING</span>
      </div>
    </div>

    <div className="gallery-item">
      <img
        src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80"
        alt="Birthday celebration"
      />
      <div className="gallery-overlay">
        <span>BIRTHDAY</span>
      </div>
    </div>

    <div className="gallery-item">
      <img
        src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80"
        alt="Corporate event"
      />
      <div className="gallery-overlay">
        <span>CORPORATE</span>
      </div>
    </div>

    <div className="gallery-item">
      <img
        src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
        alt="Event celebration"
      />
      <div className="gallery-overlay">
        <span>CELEBRATION</span>
      </div>
    </div>

  </div>

</section>


{/* STATISTICS */}
<section className="stats-section">

  <div className="stat-item">
    <h3>500+</h3>
    <p>Events Created</p>
  </div>

  <div className="stat-item">
    <h3>300+</h3>
    <p>Happy Clients</p>
  </div>

  <div className="stat-item">
    <h3>50+</h3>
    <p>Professional Staff</p>
  </div>

  <div className="stat-item">
    <h3>10+</h3>
    <p>Years Experience</p>
  </div>

</section>

      {/* CTA */}
      <section className="home-cta">
        <div>
          <p>READY TO CREATE SOMETHING AMAZING?</p>
          <h2>Let's Make Your Next Event Unforgettable.</h2>
        </div>

        <Link to="/register" className="cta-button">
          Start Planning →
        </Link>
      </section>

    </div>
  );
}

export default Home;