import React, { useState } from "react";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${apiUrl}/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Reset link sent successfully.");
        setEmail("");
      } else {
        toast.error(data.message || "Unable to send reset link.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      toast.error("Unable to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="login px-5 py-10 min-h-[100vh] flex items-center justify-center text-2xl w-full bg-center bg-cover bg-no-repeat" style={{ backgroundImage: `url('/SliderImages/bg18.jpg')` }}>
        <form onSubmit={handleSubmit} className="login-form m-4 p-12 flex flex-col rounded border border-solid border-[#a8a297] bg-white/90">
          <h1 className="text-center text-3xl mb-5 font-semibold">Forgot Password</h1>
          <p className="mb-6 text-xl">Enter your account email and we will send you a password reset link.</p>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            autoComplete="email"
            className="box p-2 mb-7 w-full rounded border border-solid border-[#a8a297] focus:border-[#ff9421] bg-transparent normal-case"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="submit"
            value={isSubmitting ? "Sending..." : "Send Reset Link"}
            disabled={isSubmitting}
            className="btn p-3 rounded text-white cursor-pointer w-full text-2xl"
          />
        </form>
      </section>
    </div>
  );
};

export default ForgotPassword;
