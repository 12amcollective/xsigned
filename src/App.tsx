import { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email);
    }
  };

  return (
    <div className="app">
      <main className="main-content">
        <div className="coming-soon">COMING SOON</div>

        <h1 className="main-title">
          The music industry is about to change... forever
        </h1>

        <div className="signup-section">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="email-form">
              <input
                type="email"
                placeholder="your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="email-input"
                required
              />
              <button type="submit" className="join-button">
                Join Waitlist
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p>Thank you for joining our waitlist!</p>
              <p>We'll be in touch soon.</p>
            </div>
          )}
        </div>

        <div className="tagline">
          <p>Be first to access the future of music marketing.</p>
          <p>Powered by AI.</p>
        </div>

        <div className="logo-section">
          <div className="sound-wave-logo">
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-bar"></div>
            <div className="wave-dot"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
