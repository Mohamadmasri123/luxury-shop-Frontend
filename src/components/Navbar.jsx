import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('ريال سعودي');
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // تحديث اتجاه الصفحة (RTL أو LTR) وتلقائياً حسب اللغة الحالية
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'en' ? 'ltr' : 'rtl';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangDropdownOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      
      {/* 1. الشريط العلوي الرفيع بلون الشعار #003046 */}
      <div className="bg-[#003046] text-gray-200 text-xs py-1.5 px-3 sm:px-8 flex justify-between items-center">
        <button
          onClick={() => setIsCurrencyModalOpen(true)}
          className="flex items-center gap-1.5 cursor-pointer hover:text-amber-300 transition focus:outline-none"
        >
          <span>{selectedCurrency}</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
        <div className="text-left font-mono text-[11px] sm:text-xs">
          info@luxuryshop.sa
        </div>
      </div>

      {/* 2. الشريط الرئيسي */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* زر القائمة للموبايل */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-700 hover:text-[#003046] focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* الشعار المعتمد على لون #003046 */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <div className={i18n.language === 'ar' ? 'text-left' : 'text-right'}>
              <span className="block text-xl sm:text-2xl font-black text-[#003046] tracking-wider">LS</span>
              <span className="block text-[8px] sm:text-[10px] font-bold text-gray-500 tracking-widest uppercase">LUXURY SHOP</span>
            </div>
          </Link>
        </div>

        {/* شريط البحث مع تأثير التركيز بلون الشعار */}
        <div className="flex-grow max-w-xl mx-2 sm:mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              className={`w-full bg-gray-50 border border-gray-300 rounded-full py-2 sm:py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#003046] focus:bg-white transition shadow-inner ${
                i18n.language === 'ar' ? 'pr-9 pl-3 sm:pr-10 sm:pl-4' : 'pl-9 pr-3 sm:pl-10 sm:pr-4'
              }`}
            />
            <span className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${
              i18n.language === 'ar' ? 'right-3' : 'left-3'
            }`}>
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
          </div>
        </div>

        {/* الأيقونات */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          
          {/* سلة المشتريات */}
          <Link to="/cart" className="relative text-gray-700 hover:text-[#003046] transition">
            <div className="p-1.5 sm:p-2">
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
              </svg>
              <span className={`absolute top-0.5 sm:top-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-600 rounded-full ring-2 ring-white ${
                i18n.language === 'ar' ? 'right-0.5 sm:right-1' : 'left-0.5 sm:left-1'
              }`}></span>
            </div>
          </Link>

          {/* تبديل اللغة */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 text-gray-700 hover:text-[#003046] transition text-sm sm:text-base py-1 px-1.5 sm:px-2 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div className="hidden sm:block text-start">
                <span className="block text-[10px] text-gray-400 font-medium">{t('language')}</span>
                <span className="block font-bold text-xs sm:text-sm text-gray-800 leading-tight">{t('currentLang')}</span>
              </div>
            </button>

            {isLangDropdownOpen && (
              <div className={`absolute mt-2 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 ${
                i18n.language === 'ar' ? 'left-0' : 'right-0'
              }`}>
                <button
                  onClick={() => changeLanguage('ar')}
                  className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003046] transition flex items-center justify-between"
                >
                  <span>العربية</span>
                  {i18n.language === 'ar' && <span className="text-[#003046] font-bold">✓</span>}
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className="w-full text-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#003046] transition flex items-center justify-between"
                >
                  <span>English</span>
                  {i18n.language === 'en' && <span className="text-[#003046] font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

          {/* حسابي */}
          <Link to="/login" className="flex items-center gap-1.5 sm:gap-2 text-gray-700 hover:text-[#003046] transition">
            <div className="p-1.5 sm:p-2 bg-gray-50 rounded-full border border-gray-200">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div className="hidden md:block text-start">
              <span className="block text-[10px] text-gray-400 leading-tight">{t('account')}</span>
              <span className="block font-medium text-xs">{t('login')}</span>
            </div>
          </Link>

        </div>
      </div>

      {/* نافذة اختيار العملة المنبثقة */}
      {isCurrencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl relative text-start">
            <button
              onClick={() => setIsCurrencyModalOpen(false)}
              className={`absolute top-5 text-gray-400 hover:text-gray-700 transition ${
                i18n.language === 'ar' ? 'left-5' : 'right-5'
              }`}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              {t('currencyModalTitle')}
            </h3>
            <div className="mb-8">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full bg-white border border-[#003046] rounded-xl py-3 px-4 text-gray-700 text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="ريال سعودي">ريال سعودي (SAR)</option>
                <option value="درهم اماراتي">درهم إماراتي (AED)</option>
                <option value="دولار امريكي">دولار أمريكي (USD)</option>
              </select>
            </div>
            <button
              onClick={() => setIsCurrencyModalOpen(false)}
              className="w-full bg-[#003046] hover:bg-[#002233] text-white font-bold py-3 rounded-full shadow-lg transition text-center"
            >
              {t('confirm')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}