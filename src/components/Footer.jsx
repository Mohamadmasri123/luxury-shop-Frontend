import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaFileSignature } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaTiktok } from "react-icons/fa";
import { FaSnapchat } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
export default function Footer() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <footer className="bg-[#003046] text-gray-200 pt-12 pb-8 border-t border-[#002233] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* الأعمدة الثلاثة الرئيسية (متجاوبة: عمود واحد في الموبايل، 3 أعمدة في الشاشات الكبيرة) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 pb-10 border-b border-slate-700/60">
          
          {/* 1. العمود الأول: روابط تهمك */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold text-amber-400 mb-4">
              {isArabic ? 'روابط تهمك' : 'Important Links'}
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm text-gray-300">
              <Link to="/about" className="hover:text-amber-300 transition py-1">
                {isArabic ? 'عن المتجر' : 'About Us'}
              </Link>
              <Link to="/privacy-policy" className="hover:text-amber-300 transition py-1">
                {isArabic ? 'سياسة الاستخدام والخصوصية' : 'Privacy Policy'}
              </Link>
              <Link to="/return-policy" className="hover:text-amber-300 transition py-1">
                {isArabic ? 'سياسة الاستبدال والاسترجاع' : 'Return Policy'}
              </Link>
              <Link to="/faq" className="hover:text-amber-300 transition py-1">
                {isArabic ? 'الأسئلة الشائعة' : 'FAQ'}
              </Link>
              <Link to="/wholesale" className="hover:text-amber-300 transition py-1">
                {isArabic ? 'طلبات الجملة' : 'Wholesale'}
              </Link>
            </div>
          </div>

          {/* 2. العمود الأوسط: الشعار + الوصف + السوشيال ميديا */}
          <div className="flex flex-col items-center text-center">
            {/* الشعار بالألوان الفاتحة المتناسقة مع الخلفية الداكنة */}
            <Link to="/" className="mb-4 inline-block">
              <div className="leading-none">
                <span className="block text-3xl font-black text-white tracking-wider">LS</span>
                <span className="block text-[9px] font-bold text-amber-400 tracking-widest uppercase mt-0.5">LUXURY SHOP</span>
              </div>
            </Link>

            {/* الوصف */}
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md mb-6">
              {isArabic
                ? 'هدفنا هو أن نكون وجهتكم الأولى للمنتجات الجلدية والأحذية الفاخرة الموثوقة، مع تجربة تسوق سهلة وخدمة عملاء مميزة، وتوصيل سريع لكل مدن المملكة.'
                : 'Our goal is to be your premier destination for trusted luxury leather goods and shoes, with a seamless shopping experience and fast delivery across Saudi Arabia.'}
            </p>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex items-center justify-center gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-[#002233] border border-slate-600 flex items-center justify-center text-gray-200 hover:text-amber-400 hover:border-amber-400 transition shadow-sm">
                <FaSquareInstagram />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#002233] border border-slate-600 flex items-center justify-center text-gray-200 hover:text-amber-400 hover:border-amber-400 transition shadow-sm">
                <FaSnapchat /   >
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#002233] border border-slate-600 flex items-center justify-center text-gray-200 hover:text-amber-400 hover:border-amber-400 transition shadow-sm">
                <FaTiktok />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-[#002233] border border-slate-600 flex items-center justify-center text-gray-200 hover:text-amber-400 hover:border-amber-400 transition shadow-sm">
                <FaFacebook />
              </a>
            </div>
          </div>

          {/* 3. العمود الثالث: تواصل معنا */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-lg font-bold text-amber-400 mb-4 w-full text-center md:text-right">
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-gray-300 w-full">
              {/* واتساب */}
              <a href="https://wa.me/96171089546" className="flex items-center justify-center md:justify-end gap-3 hover:text-amber-300 transition">
                <span className="font-mono text-xs sm:text-sm" dir="ltr">+96171089546</span>
                <div className="w-8 h-8 rounded-full bg-[#002233] border border-slate-600 flex items-center justify-center text-emerald-400 shadow-sm">
<IoLogoWhatsapp />                </div>
              </a>

              {/* هاتف */}
              <a href="tel:+96171089546" className="flex items-center justify-center md:justify-end gap-3 hover:text-amber-300 transition">
                <span className="font-mono text-xs sm:text-sm" dir="ltr">+96171089546</span>
                <div className="w-8 h-8 rounded-full bg-[#002233] border border-slate-600 flex items-center justify-center text-gray-300 shadow-sm">
                  <FaPhoneAlt />
                </div>
              </a>

              {/* إيميل */}
              <a href="mailto:info@luxuryshop.sa" className="flex items-center justify-center md:justify-end gap-3 hover:text-amber-300 transition">
                <span className="font-mono text-xs sm:text-sm">info@luxuryshop.sa</span>
                <div className="w-8 h-8 rounded-full bg-[#002233] border border-slate-600 flex items-center justify-center text-gray-300 shadow-sm">
                  <MdEmail />
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* القسم السفلي: التوثيق والتراخيص السعودية الرسمية (متجانس ومريح للعين على الخلفية الكحلية) */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-gray-300">
          
          {/* السجل التجاري */}
          <div className="flex items-center gap-2.5 bg-[#002233] px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-sm">
            <div className="text-right">
              <span className="block text-[10px] text-gray-400">{isArabic ? 'السجل التجاري' : 'CR Number'}</span>
              <span className="font-mono font-bold text-white">0000</span>
            </div>
            <div className="w-7 h-7 bg-emerald-800 text-white flex items-center justify-center rounded-lg text-xs"><FaFileSignature /></div>
          </div>

          {/* الرقم الضريبي VAT */}
          <div className="flex items-center gap-2.5 bg-[#002233] px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-sm">
            <div className="text-right">
              <span className="block text-[10px] text-gray-400">{isArabic ? 'الرقم الضريبي' : 'VAT Number'}</span>
              <span className="font-mono font-bold text-white">000000</span>
            </div>
            <div className="bg-emerald-700 text-white font-bold text-[15px] px-1.5 py-0.5 rounded">VAT</div>
          </div>

          {/* توثيق منصة الأعمال */}
          <div className="flex items-center gap-2.5 bg-[#002233] px-3.5 py-2 rounded-xl border border-slate-700/80 shadow-sm">
            <div className="text-right">
              <span className="block text-[10px] text-gray-400">{isArabic ? 'موثوق لدى' : 'Verified by'}</span>
              <span className="font-bold text-purple-300">company</span>
            </div>
            <span className="bg-emerald-700  text-white font-bold text-[20px] px-1.5 py-0.5 rounded"><VscWorkspaceTrusted /></span>
          </div>

        </div>

        {/* حقوق النشر */}
        <div className="text-center text-[11px] text-gray-400 mt-8 pt-4 border-t border-slate-800/80">
          © {new Date().getFullYear()} LUXURY SHOP. {isArabic ? 'جميع الحقوق محفوظة' : 'All rights reserved.'}
        </div>

      </div>
    </footer>
  );
}