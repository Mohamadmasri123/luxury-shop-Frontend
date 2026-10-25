import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';

  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // الاتصال برابط الباك إند في Django
      const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // إذا نجح التسجيل، نحول المستخدم لصفحة تسجيل الدخول
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.username || data.password || (isArabic ? 'فشل إنشاء الحساب، يرجى المحاولة لاحقاً' : 'Registration failed'));
      }
    } catch (err) {
      setError(isArabic ? 'حدث خطأ في الاتصال بالسيرفر (تأكد أن Django يعمل)' : 'Server connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        
        <div className="text-center mb-8">
          <span className="text-3xl font-black text-[#003046] tracking-wider block">LS</span>
          <h2 className="mt-3 text-2xl font-bold text-[#003046]">
            {isArabic ? 'إنشاء حساب جديد' : 'Create Account'}
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              {isArabic ? 'اسم المستخدم' : 'Username'}
            </label>
            <input
              type="text"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:outline-none focus:border-[#003046] focus:bg-white transition"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
            </label>
            <input
              type="email"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:outline-none focus:border-[#003046] focus:bg-white transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              {isArabic ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-800 focus:outline-none focus:border-[#003046] focus:bg-white transition"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003046] hover:bg-[#002233] text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 mt-2 cursor-pointer"
          >
            {loading ? (isArabic ? 'جاري التسجيل...' : 'Creating...') : (isArabic ? 'تسجيل حساب' : 'Register')}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          {isArabic ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
          <Link to="/login" className="font-bold text-[#003046] hover:underline">
            {isArabic ? 'تسجيل الدخول' : 'Sign In'}
          </Link>
        </div>

      </div>
    </div>
  );
}