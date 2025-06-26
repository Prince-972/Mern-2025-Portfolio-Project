import { useState } from 'react';
import { useRouter } from 'next/router';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    const newErrors = {};
    if (!validateEmail(email)) newErrors.email = 'Invalid email format.';
    if (!validatePassword(password)) newErrors.password = 'Password must be at least 8 characters, include uppercase, lowercase, and a number.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setTouched({ email: true, password: true });
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      setTimeout(() => {
        // Simulate login, store token in localStorage
        localStorage.setItem('portfolio_token', 'demo_token');
        setLoading(false);
        router.push('/generate');
      }, 1200);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-DeepNightBlack">
      <form
        onSubmit={handleSubmit}
        className="bg-EveningBlack/95 p-8 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in"
        autoComplete="off"
      >
        <h2 className="text-3xl font-circular-bold text-Green mb-8 text-center tracking-wide">Login to Your Portfolio</h2>
        <div className="mb-6">
          <label className="block text-SilverGray mb-2 font-circular-medium" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className={`input_stylings ${errors.email && touched.email ? 'ring-2 ring-red-500' : ''}`}
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="you@example.com"
            autoFocus
          />
          {errors.email && touched.email && (
            <div className="text-red-500 text-xs mt-1 transition-all animate-pulse">{errors.email}</div>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-SilverGray mb-2 font-circular-medium" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className={`input_stylings ${errors.password && touched.password ? 'ring-2 ring-red-500' : ''}`}
            value={password}
            onChange={e => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            placeholder="Enter your password"
          />
          {errors.password && touched.password && (
            <div className="text-red-500 text-xs mt-1 transition-all animate-pulse">{errors.password}</div>
          )}
        </div>
        <button
          type="submit"
          className={`button w-full mt-2 ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-LightGray text-xs mt-6 text-center">
          <span>Demo: Use any valid email and a strong password (min 8 chars, 1 uppercase, 1 lowercase, 1 number)</span>
        </div>
      </form>
    </div>
  );
} 