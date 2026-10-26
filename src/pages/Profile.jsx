import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات المستخدم الحالي من الباك إند (عبر توكن الجلسة)
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/accounts/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          localStorage.removeItem('access_token');
          navigate('/login');
        }
      } catch (err) {
        setError('تعذر الاتصال بالخادم لجلب بيانات الحساب.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // دالة تسجيل الخروج وتنظيف الجلسة
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-lg text-[#003046]">
        جاري تحميل تفاصيل الحساب...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* رأسية البروفايل بلون الشعار الأساسي */}
        <div className="bg-[#003046] px-8 py-8 text-white relative">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* الأفاتار (صورة المستخدم الرمزية) */}
            <div className="w-24 h-24 rounded-full bg-white text-[#003046] flex items-center justify-center text-4xl font-black shadow-lg border-4 border-white/20">
              {userData?.username ? userData.username.charAt(0).toUpperCase() : 'U'}
            </div>
            
            <div className="text-center sm:text-start">
              <h1 className="text-2xl sm:text-3xl font-bold">
                مرحباً، {userData?.first_name || userData?.username}
              </h1>
              <p className="text-gray-300 text-sm mt-1">
                {userData?.email || 'info@luxuryshop.sa'}
              </p>
              <span className="inline-block mt-3 bg-amber-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                عضو متجر Luxury Shop
              </span>
            </div>
          </div>
        </div>

        {/* محتوى بيانات الحساب التفصيلية */}
        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-3">
            تفاصيل الملف الشخصي
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="block text-xs text-gray-400 font-medium mb-1">اسم المستخدم (Username)</span>
              <span className="text-gray-800 font-bold text-base">{userData?.username}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="block text-xs text-gray-400 font-medium mb-1">البريد الإلكتروني (Email)</span>
              <span className="text-gray-800 font-bold text-base">{userData?.email || 'غير متوفر'}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="block text-xs text-gray-400 font-medium mb-1">الاسم الأول</span>
              <span className="text-gray-800 font-bold text-base">{userData?.first_name || 'غير محدد'}</span>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="block text-xs text-gray-400 font-medium mb-1">اسم العائلة</span>
              <span className="text-gray-800 font-bold text-base">{userData?.last_name || 'غير محدد'}</span>
            </div>
          </div>

          {/* تنبيه أو ملاحظة لتسجيل الدخول المستقبلي عبر جوجل */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-8 flex items-center justify-between">
            <div className="text-xs sm:text-sm text-amber-800">
              <span className="font-bold block mb-0.5">ملاحظة أمان:</span>
              سيتم قريباً تفعيل ميزة تسجيل الدخول السريع عبر Google لتسهيل الوصول لحسابك.
            </div>
            <button disabled className="bg-amber-200 text-amber-800 text-xs px-3 py-1.5 rounded-lg font-bold cursor-not-allowed">
              قريباً
            </button>
          </div>

          {/* أزرار التنقل وتسجيل الخروج */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <Link 
              to="/" 
              className="text-[#003046] hover:underline font-semibold text-sm transition"
            >
              ← العودة إلى تصفح المنتجات
            </Link>

            <button 
              onClick={handleLogout}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>تسجيل الخروج</span>
              <span>🚪</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}