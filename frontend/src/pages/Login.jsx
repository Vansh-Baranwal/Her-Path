import { useState } from 'react';
import { Icons } from '../utils/icons.jsx';

export default function Login({ navigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('home');
    }, 1500);
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 relative z-10 pt-24 pb-16">
      <div className="w-full max-w-md">
        <div className="bg-[#131620] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle,rgba(255,51,102,0.1),transparent)] pointer-events-none"></div>

          <div className="text-center mb-8 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-[#8A93A6] text-sm">
              Sign in to access your safety network
            </p>
          </div>

          <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#8A93A6] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full bg-[#080A10] border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-all ${
                  errors.email
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-[#FF3366]'
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#8A93A6] mb-1.5">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full bg-[#080A10] border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-all ${
                  errors.password
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-[#FF3366]'
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF3366] text-white font-semibold rounded-lg py-2.5 md:py-3 mt-6 hover:bg-[#FF4477] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Signup Link */}
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-[#8A93A6]">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('signup')}
                  className="text-[#FF3366] font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </form>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center text-xs text-[#8A93A6] flex items-center justify-center gap-2">
          <Icons.Shield className="w-4 h-4 text-[#00E0FF]" />
          <span>Your data is encrypted and secure</span>
        </div>
      </div>
    </div>
  );
}
