import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { signup } = useAuth();
  const location = useLocation();

  const isSignup = location.pathname === "/signup";

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signup(name, email, password);
    if (result.success) {
      navigate("/");
    } else {
      alert(result.message);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-[#fdfbf7] overflow-hidden">
      {/* Custom Top Navigation */}
      <header className="flex h-20 shrink-0 items-center justify-between border-b border-gray-200 px-8">
        <Link to="/" className="flex items-center text-sm text-gray-500 transition hover:text-black">
          <span className="mr-2 text-lg leading-none">&lsaquo;</span> Back to home
        </Link>
        <Link to="/" className="font-serif text-2xl tracking-[0.2em] text-[#222222]">
         ELUME
        </Link>
        <Link to="/products" className="text-sm text-gray-500 transition hover:text-black">
          Continue Shopping
        </Link>
      </header>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side: Image Area */}
        <div className="relative hidden w-1/2 md:block">
          <img
            src="https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80"
            alt="Luxury Beauty"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="absolute bottom-12 left-12 right-12 text-white">
            <h2 className="font-serif text-3xl font-light italic leading-snug drop-shadow-md">
              "Luxury is not a necessity to me, but beautiful and good things are."
            </h2>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest drop-shadow-md">
              — ANAÏS NIN
            </p>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="w-full overflow-y-auto md:w-1/2">
          <div className="flex min-h-full flex-col items-center justify-center px-6 py-4">
            <div className="w-full max-w-md">
              
              {/* Tabs */}
            <div className="mb-4 flex border-b border-gray-200">
              <Link
                to="/login"
                className={`flex-1 border-b-2 pb-4 text-center text-sm font-semibold transition ${
                  !isSignup ? "border-[#9f815d] text-black" : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className={`flex-1 border-b-2 pb-4 text-center text-sm font-semibold transition ${
                  isSignup ? "border-[#9f815d] text-black" : "border-transparent text-gray-400 hover:text-black"
                }`}
              >
                Create Account
              </Link>
            </div>

            {/* Social Buttons */}
            <div className="space-y-3">
              <button className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-white py-2.5 text-sm font-medium transition hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <button className="flex w-full items-center justify-center gap-3 border border-gray-300 bg-white py-2.5 text-sm font-medium transition hover:bg-gray-50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                Continue with Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-4 flex items-center justify-center">
              <div className="absolute inset-x-0 border-t border-gray-200"></div>
              <span className="relative bg-[#fdfbf7] px-4 text-xs text-gray-400">
                or sign up with email
              </span>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-xs font-semibold tracking-wider text-gray-500">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[#9f815d]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold tracking-wider text-gray-500">
                  EMAIL ADDRESS
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@email.com"
                  className="w-full border border-gray-300 px-4 py-2.5 outline-none transition focus:border-[#9f815d]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold tracking-wider text-gray-500">
                  PASSWORD
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-300 px-4 py-2.5 tracking-widest outline-none transition focus:border-[#9f815d]"
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full bg-[#9f815d] py-3 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-[#8a6e4d]"
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <p className="mt-4 text-center text-xs text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-black hover:underline">
                Sign In
              </Link>
            </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
