import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Password reset successful.");
        navigate("/login");
      } else {
        toast.error(data.message || "Unable to reset password.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      toast.error("Unable to reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="login px-5 py-10 min-h-[100vh] flex items-center justify-center text-2xl w-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('/SliderImages/bg18.jpg')` }}>
        <form onSubmit={handleSubmit} className="login-form m-4 p-12 flex flex-col rounded border border-solid border-[#a8a297] bg-white/90">
          <h1 className="text-center text-3xl mb-5 font-semibold">Reset Password</h1>
          <p className="mb-6 text-xl">Create a new password for your account.</p>

          <label htmlFor="password">New Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            autoComplete="new-password"
            className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            autoComplete="new-password"
            className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input
            type="submit"
            value={isSubmitting ? "Resetting..." : "Reset Password"}
            disabled={isSubmitting}
            className="btn p-3 rounded text-white cursor-pointer w-full text-2xl"
          />
        </form>
      </section>
    </div>
  );
};

export default ResetPassword;
