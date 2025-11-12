import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/OtpModal.css";

const OtpModal = ({ email, onClose, onSuccess }) => {
  const { verifyOTP, resendOTP } = useContext(AuthContext);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle typing input
  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to next input automatically
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      if (next) next.focus();
    }
  };

  // Handle keyboard events (Backspace navigation)
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        // Move to previous field if empty
        if (index > 0) {
          const prev = document.getElementById(`otp-${index - 1}`);
          if (prev) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            prev.focus();
          }
        }
      } else {
        // Delete current value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      setError("Please enter a 4-digit code");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await verifyOTP(enteredOtp);
      setSuccess("✅ Email verified successfully!");
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1000);
    } catch (err) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      setCooldown(120);
      await resendOTP();
      setSuccess("📩 New code sent!");
    } catch (err) {
      setError(err.message || "Failed to resend");
    }
  };

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const t = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [cooldown]);

  return (
    <div className="otp-overlay">
      <div className="otp-popup">
        <button className="otp-close" onClick={onClose}>×</button>

        <div className="otp-icon">
          <span role="img" aria-label="mail">📧</span>
        </div>

        <h2>Verify Your Email</h2>
        <p className="otp-subtitle">
          We've sent a 4-digit verification code to <strong>{email}</strong>
        </p>

        <form onSubmit={handleVerify}>
          <div className="otp-inputs">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleKeyDown(e, i)} // 🧠 added for backspace navigation
                className="otp-box"
                autoFocus={i === 0}
              />
            ))}
          </div>

          <button type="submit" className="verify-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        {error && <p className="otp-error">{error}</p>}
        {success && <p className="otp-success">{success}</p>}

        <div className="resend-section">
          <p>
            Didn’t receive the code?
            {cooldown > 0 ? (
              <span className="cooldown"> Resend in {cooldown}s</span>
            ) : (
              <button type="button" className="resend-link" onClick={handleResend}>
                Resend Code
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
