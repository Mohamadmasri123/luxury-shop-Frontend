import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/accounts/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // بعد نجاح التسجيل، نقوم بتوجيهه لصفحة تسجيل الدخول ليقوم بالدخول بحسابه الجديد
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.username || data.email || 'حدث خطأ أثناء إنشاء الحساب، تأكد من البيانات');
      }
    } catch (err) {
      setError('تعذر الاتصال بالخادم، تأكد من تشغيل الباك إند');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative">
        <Link to="/" className="absolute top-5 left-5 text-gray-400 hover:text-gray-700 text-lg">
          ✕
        </Link>

        <h2 className="text-2xl font-bold text-[#003046] mb-6 text-center">إنشاء حساب جديد - Luxury Shop</h2>

        {error && <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl mb-4 text-center">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">الاسم الأول</label>
              <input 
                type="text" 
                name="first_name"
                value={formData.first_name} 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#003046]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">اسم العائلة</label>
              <input 
                type="text" 
                name="last_name"
                value={formData.last_name} 
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#003046]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">اسم المستخدم</label>
            <input 
              type="text" 
              name="username"
              value={formData.username} 
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#003046]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">البريد الإلكتروني</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#003046]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">كلمة المرور</label>
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#003046]"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#003046] hover:bg-[#002233] text-white font-bold py-3 rounded-xl shadow-lg transition text-sm"
          >
            إنشاء الحساب
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500">
          لديك حساب بالفعل؟ <Link to="/login" className="text-[#003046] font-bold hover:underline">سجل دخولك هنا</Link>
        </div>
      </div>
    </div>
  );
}