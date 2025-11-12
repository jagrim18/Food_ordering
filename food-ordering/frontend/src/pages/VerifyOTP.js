// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/VerifyOTP.css";

// const VerifyOTP = () => {
//   const navigate = useNavigate();
//   const { verifyOTP, resendOTP, pendingEmail } = useContext(AuthContext);

//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const [cooldown, setCooldown] = useState(0);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (value, index) => {
//     if (!/^\d*$/.test(value)) return;
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);
//   };

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join("");
//     if (enteredOtp.length !== 4) {
//       setError("Please enter 4-digit OTP");
//       return;
//     }
//     setLoading(true);
//     try {
//       const data = await verifyOTP(enteredOtp);
//       setSuccess("✅ Verified successfully!");
//       setTimeout(() => navigate("/restaurants"), 1500);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     try {
//       setCooldown(120);
//       await resendOTP();
//       setSuccess("New OTP sent! Check backend console.");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     }
//   };

//   useEffect(() => {
//     if (cooldown > 0) {
//       const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [cooldown]);

//   return (
//     <div className="otp-container">
//       <div className="otp-card">
//         <h2>Email Verification</h2>
//         <p className="otp-subtitle">
//           Enter the 4-digit code sent to <strong>{pendingEmail}</strong>
//         </p>

//         <form onSubmit={handleVerify}>
//           <div className="otp-boxes">
//             {otp.map((digit, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 maxLength="1"
//                 value={digit}
//                 onChange={(e) => handleChange(e.target.value, i)}
//                 className="otp-digit"
//               />
//             ))}
//           </div>

//           <button type="submit" disabled={loading} className="otp-button">
//             {loading ? "Verifying..." : "Verify OTP"}
//           </button>
//         </form>

//         {error && <p className="otp-error">{error}</p>}
//         {success && <p className="otp-success">{success}</p>}

//         <div className="otp-footer">
//           {cooldown > 0 ? (
//             <p>Resend available in {cooldown}s</p>
//           ) : (
//             <button className="resend-btn" onClick={handleResend}>
//               Resend OTP
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerifyOTP;
