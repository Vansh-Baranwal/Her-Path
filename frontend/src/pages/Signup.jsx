import { useState } from 'react';
import { Icons } from '../utils/icons.jsx';

export default function Signup({ navigate }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Check password strength
  const checkPasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData(prev => ({
      ...prev,
      [name]: fieldValue
    }));

    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 2) {
      newErrors.password = 'Password is too weak. Use uppercase, numbers, and symbols';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms';
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
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // Navigate to home after successful signup
      navigate('home');
    }, 1500);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return '#8A93A6';
    if (passwordStrength === 1) return '#FF6B6B';
    if (passwordStrength === 2) return '#FFA500';
    if (passwordStrength === 3) return '#4ECDC4';
    return '#00E0FF';
  };

  return (
    <div className="flex-1 flex items-center justify-center px-6 relative z-10 pt-24 pb-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-[#131620] p-8 md:p-10 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle,rgba(255,51,102,0.1),transparent)] pointer-events-none"></div>

          {/* Header */}
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Create Account
            </h2>
            <p className="text-[#8A93A6] text-sm">
              Join HerPath and stay protected
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#8A93A6] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full bg-[#080A10] border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-all ${
                  errors.fullName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-[#FF3366]'
                }`}
                placeholder="Ananya Sharma"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

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

            {/* Phone */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#8A93A6] mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full bg-[#080A10] border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-all ${
                  errors.phone
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-[#FF3366]'
                }`}
                placeholder="+91 98765 43210"
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
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
                placeholder="Create a strong password"
              />

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${(passwordStrength / 4) * 100}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <span className="text-xs text-[#8A93A6]">
                    {passwordStrength === 0 && 'Weak'}
                    {passwordStrength === 1 && 'Fair'}
                    {passwordStrength === 2 && 'Good'}
                    {passwordStrength === 3 && 'Strong'}
                    {passwordStrength === 4 && 'Very Strong'}
                  </span>
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs md:text-sm font-medium text-[#8A93A6] mb-1.5">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full bg-[#080A10] border rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none transition-all ${
                  errors.confirmPassword
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-white/10 focus:border-[#FF3366]'
                }`}
                placeholder="Confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2 pt-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-white/20 bg-[#080A10] cursor-pointer accent-[#FF3366]"
              />
              <label className="text-xs text-[#8A93A6] cursor-pointer leading-relaxed">
                I agree to the{' '}
                <button type="button" className="text-[#FF3366] hover:underline">
                  Terms of Service
                </button>
                {' '}and{' '}
                <button type="button" className="text-[#FF3366] hover:underline">
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.agreeTerms && (
              <p className="text-xs text-red-500">{errors.agreeTerms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF3366] text-white font-semibold rounded-lg py-2.5 md:py-3 mt-6 hover:bg-[#FF4477] transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 pt-6 border-t border-white/10">
              <p className="text-xs text-[#8A93A6]">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('login')}
                  className="text-[#FF3366] font-semibold hover:underline"
                >
                  Sign In
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
