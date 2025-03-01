import React from "react";
import { useNavigate } from "react-router-dom";
import navpulseLogo from '../assets/images/navpulse.png';
import styles from "../assets/styles/LandingPage.module.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Header/Navigation */}
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <img src={navpulseLogo} alt="Navpulse Logo" className={styles.logo} />
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navLinks}>
            <li><a href="#features">Features</a></li>
            <li><a href="#howItWorks">How It Works</a></li>
            <li><a href="#forBusinesses">For Businesses</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <button
            className={styles.signInButton}
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h2 className={styles.heroTitle}>Explore Downtown. Earn Rewards.</h2>
          <p className={styles.heroSubtitle}>
            Discover local businesses, collect digital coins, and unlock exclusive deals
            as you walk through downtown.
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.primaryButton}
              onClick={() => window.open("https://apps.apple.com/app/navpulse", "_blank")}
            >
              Download on App Store
            </button>
            <button
              className={styles.secondaryButton}
              onClick={() => window.open("https://play.google.com/store/apps/details?id=com.navpulse", "_blank")}
            >
              Get it on Google Play
            </button>
          </div>
        </div>
        <div className={styles.heroImage}>
          {/* Placeholder for hero image - mobile app screenshot or downtown scene */}
          <img
            src="/api/placeholder/280/550"
            alt="Navpulse app screenshot"
            className={styles.appScreenshot}
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={styles.features}>
        <h2 className={styles.sectionTitle}>Why Use Navpulse?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img src="/api/placeholder/64/64" alt="Gamification icon" />
            </div>
            <h3>Gamified Experience</h3>
            <p>Turn downtown exploration into a fun, interactive game as you collect coins at each store you visit.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img src="/api/placeholder/64/64" alt="Deals icon" />
            </div>
            <h3>Exclusive Deals</h3>
            <p>Unlock special promotions, discounts, and offers available only to Navpulse users.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img src="/api/placeholder/64/64" alt="Discovery icon" />
            </div>
            <h3>Discover Local Gems</h3>
            <p>Find new businesses and hidden treasures in your downtown area you might have overlooked.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>
              <img src="/api/placeholder/64/64" alt="Rewards icon" />
            </div>
            <h3>Earn Real Rewards</h3>
            <p>Redeem collected coins for tangible benefits, coupons, and entry into exclusive raffles.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="howItWorks" className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepContent}>
              <h3>Download the App</h3>
              <p>Get Navpulse on your iOS or Android device for free.</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepContent}>
              <h3>Explore Downtown</h3>
              <p>Walk around downtown and discover participating businesses.</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepContent}>
              <h3>Scan & Collect</h3>
              <p>Scan BLE beacons at storefronts to collect digital coins.</p>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepContent}>
              <h3>Redeem Rewards</h3>
              <p>Use your coins for exclusive deals and promotions at local businesses.</p>
            </div>
          </div>
        </div>
        <div className={styles.appDemoContainer}>
          <img
            src="/api/placeholder/800/400"
            alt="App demonstration"
            className={styles.appDemoImage}
          />
        </div>
      </section>

      {/* For Businesses Section */}
      <section id="forBusinesses" className={styles.forBusinesses}>
        <div className={styles.businessContent}>
          <h2 className={styles.sectionTitle}>For Downtown Businesses</h2>
          <p className={styles.businessIntro}>
            Join the Navpulse network and bring more foot traffic to your storefront.
          </p>
          <div className={styles.businessBenefits}>
            <div className={styles.benefit}>
              <h3>Increase Foot Traffic</h3>
              <p>Attract more visitors to your physical location through gamified incentives.</p>
            </div>
            <div className={styles.benefit}>
              <h3>Customer Insights</h3>
              <p>Gain valuable data on customer behavior and foot traffic patterns.</p>
            </div>
            <div className={styles.benefit}>
              <h3>Targeted Promotions</h3>
              <p>Offer special deals to motivated customers already in your downtown area.</p>
            </div>
            <div className={styles.benefit}>
              <h3>Community Engagement</h3>
              <p>Be part of a collaborative effort to revitalize downtown commerce.</p>
            </div>
          </div>
          <button
            className={styles.businessSignupButton}
            onClick={() => navigate("/business-signup")}
          >
            Join as a Business Partner
          </button>
        </div>
        <div className={styles.businessImage}>
          <img
            src="/api/placeholder/450/400"
            alt="Business owners with Navpulse"
            className={styles.storePicture}
          />
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonials}>
        <h2 className={styles.sectionTitle}>What People Are Saying</h2>
        <div className={styles.testimonialSlider}>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "Since implementing Navpulse, we've seen a 30% increase in foot traffic and new customers discovering our shop."
            </p>
            <div className={styles.testimonialAuthor}>
              <img src="/api/placeholder/50/50" alt="Business owner" className={styles.authorAvatar} />
              <div>
                <p className={styles.authorName}>Jane Smith</p>
                <p className={styles.authorTitle}>Owner, Downtown Boutique</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "I've discovered so many amazing local shops I never knew existed, and the deals are fantastic!"
            </p>
            <div className={styles.testimonialAuthor}>
              <img src="/api/placeholder/50/50" alt="App user" className={styles.authorAvatar} />
              <div>
                <p className={styles.authorName}>David Johnson</p>
                <p className={styles.authorTitle}>Navpulse User</p>
              </div>
            </div>
          </div>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              "As a business improvement district, Navpulse has been a game-changer for increasing downtown engagement."
            </p>
            <div className={styles.testimonialAuthor}>
              <img src="/api/placeholder/50/50" alt="Downtown director" className={styles.authorAvatar} />
              <div>
                <p className={styles.authorName}>Robert Chen</p>
                <p className={styles.authorTitle}>Downtown Development Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Downtown Experience?</h2>
          <p>Join the growing community of businesses and explorers using Navpulse to revitalize downtown areas.</p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.primaryButton}
              onClick={() => window.open("https://apps.apple.com/app/navpulse", "_blank")}
            >
              Download Now
            </button>
            <button
              className={styles.businessButton}
              onClick={() => navigate("/business-signup")}
            >
              Partner With Us
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <h2 className={styles.sectionTitle}>Contact Us</h2>
        <div className={styles.contactContainer}>
          <div className={styles.contactForm}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your email" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="subject">Subject</label>
                <select id="subject">
                  <option value="general">General Inquiry</option>
                  <option value="business">Business Partnership</option>
                  <option value="support">Technical Support</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your message"></textarea>
              </div>
              <button type="submit" className={styles.submitButton}>Send Message</button>
            </form>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3>Email Us</h3>
              <p>info@navpulse.com</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Call Us</h3>
              <p>(555) 123-4567</p>
            </div>
            <div className={styles.infoCard}>
              <h3>Follow Us</h3>
              <div className={styles.socialIcons}>
                <a href="https://facebook.com/navpulse" target="_blank" rel="noopener noreferrer">
                  <img src="/api/placeholder/24/24" alt="Facebook" />
                </a>
                <a href="https://twitter.com/navpulse" target="_blank" rel="noopener noreferrer">
                  <img src="/api/placeholder/24/24" alt="Twitter" />
                </a>
                <a href="https://instagram.com/navpulse" target="_blank" rel="noopener noreferrer">
                  <img src="/api/placeholder/24/24" alt="Instagram" />
                </a>
                <a href="https://linkedin.com/company/navpulse" target="_blank" rel="noopener noreferrer">
                  <img src="/api/placeholder/24/24" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Navpulse</h3>
            <p className={styles.footerDescription}>
              Revitalizing downtowns through interactive exploration and local business promotion.
            </p>
          </div>
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Quick Links</h3>
            <ul className={styles.footerLinks}>
              <li><a href="#features">Features</a></li>
              <li><a href="#howItWorks">How It Works</a></li>
              <li><a href="#forBusinesses">For Businesses</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Resources</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/about">About Us</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/support">Support</a></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h3 className={styles.footerTitle}>Download App</h3>
            <div className={styles.appStoreButtons}>
              <a href="https://apps.apple.com/app/navpulse" target="_blank" rel="noopener noreferrer">
                <img src="/api/placeholder/120/40" alt="App Store" />
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.navpulse" target="_blank" rel="noopener noreferrer">
                <img src="/api/placeholder/120/40" alt="Google Play" />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} Navpulse. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms-of-service">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;