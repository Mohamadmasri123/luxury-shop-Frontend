import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// النصوص الافتراضية للغات المتجر
const resources = {
  ar: {
    translation: {
      searchPlaceholder: "ابحث...",
      account: "حسابي",
      login: "تسجيل الدخول",
      language: "اللغة",
      currentLang: "العربية",
      currencyModalTitle: "العملة",
      confirm: "موافق",
      cart: "السلة",
      welcomeBanner: "حصرياً من بانكوك إلى السعودية",
      heroTitle: "أحذية وحقائب جلدية أصلية بمواصفات عالمية",
      browseBtn: "تصفح التشكيلة الآن"
    }
  },
  en: {
    translation: {
      searchPlaceholder: "Search...",
      account: "My Account",
      login: "Sign In",
      language: "Language",
      currentLang: "English",
      currencyModalTitle: "Currency",
      confirm: "Confirm",
      cart: "Cart",
      welcomeBanner: "Exclusive from Bangkok to Saudi Arabia",
      heroTitle: "Original leather shoes & bags with global standards",
      browseBtn: "Browse Collection Now"
    }
  }
};

i18n
  .use(LanguageDetector) // لاكتشاف لغة المتصفح تلقائياً
  .use(initReactI18next) // لربطها مع React
  .init({
    resources,
    fallbackLng: 'ar', // اللغة الافتراضية في حال لم تتوفر اللغة
    interpolation: {
      escapeValue: false // تفادي مشاكل الـ XSS
    }
  });

export default i18n;