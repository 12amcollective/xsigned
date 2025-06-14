import { useState } from "react";
import "./App.css";
import apiClient from "./config/api";

function App() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Debug environment variables on component mount
  console.log("🔧 App Debug Info:");
  console.log("- VITE_ENV:", import.meta.env.VITE_ENV);
  console.log("- VITE_API_URL:", import.meta.env.VITE_API_URL);
  console.log("- MODE:", import.meta.env.MODE);
  console.log("- DEV:", import.meta.env.DEV);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError("");

    try {
      // Call your backend API to join the waitlist
      await apiClient.joinWaitlist(email);

      setIsSubmitted(true);
      console.log("Email successfully submitted to waitlist:", email);
    } catch (error) {
      console.error("Failed to submit email:", error);

      // More detailed error handling
      if (error instanceof Error) {
        if (error.message.includes("HTTP error! status:")) {
          const statusMatch = error.message.match(/status: (\d+)/);
          const status = statusMatch ? statusMatch[1] : "unknown";
          setError(`Server error (${status}). Please try again.`);
        } else if (error.message.includes("Failed to fetch")) {
          setError("Cannot connect to server. Please check your connection.");
        } else {
          setError(`Error: ${error.message}`);
        }
      } else {
        setError("Failed to join waitlist. Please try again.");
      }
    } finally {
      setIsLoading(false);
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
                disabled={isLoading}
              />
              <button
                type="submit"
                className="join-button"
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join Waitlist"}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p>Thank you for joining our waitlist!</p>
              <p>We'll be in touch soon.</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <p>{error}</p>
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
