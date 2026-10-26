import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]  = useState('');

  // 1. تسجيل الدخول التقليدي
  const handleTraditionalLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        navigate('/');
      } else {
        setError('اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم، تأكد من تشغيل الباك إند');
    }
  };

  // 2. تسجيل الدخول عبر جوجل (محدث لضمان الاستقرار ومنع مشاكل الـ Popup)
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google Credential Success:", credentialResponse);

      const response = await fetch('http://127.0.0.1:8000/api/accounts/google-login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        navigate('/');
      } else {
        const errData = await response.json();
        setError(`فشل التحقق من جوجل: ${errData.error || 'خطأ غير معروف'}`);
      }
    } catch (err) {
      setError('حدث خطأ في الاتصال بالخادم أثناء معالجة جوجل');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">
        
        <Link to="/" className="absolute top-5 left-5 text-gray-400 hover:text-gray-700 text-lg">
          ✕
        </Link>

        <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-400 shadow-sm">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">تسجيل الدخول</h2>

        {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

        {/* نموذج تسجيل الدخول التقليدي */}
        <form onSubmit={handleTraditionalLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">اسم المستخدم</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#003046]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">كلمة المرور</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#003046]"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#003046] hover:bg-[#002233] text-white font-bold py-3 rounded-xl shadow-lg transition text-sm"
          >
            دخول بالنظام التقليدي
          </button>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <span className="relative bg-white px-3 text-xs text-gray-400 font-medium">أو المتابعة عبر</span>
        </div>

        {/* زر جوجل بخصائص معيارية مستقرة */}
        <div className="flex justify-center items-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('فشل الاتصال بخدمة جوجل')}
            useOneTap={false} // إلغاء الـ One Tap لمنع مشاكل تقاطع النوافذ
            theme="outline"
            size="large"
            shape="pill"
          />
        </div>

        <div className="mt-6 text-center text-xs text-gray-500">
          ليس لديك حساب؟ <Link to="/register" className="text-[#003046] font-bold hover:underline">أنشئ حساباً جديداً</Link>
        </div>

      </div>
    </div>
  );
}