import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  ar: {
    translation: {
      searchPlaceholder: "ابحث...",
      account: "حسابي",
      login: "تسجيل الدخول",
      language: "اللغة",
      currentLang: "العربية",
      currencyModalTitle: "اختر العملة المفضلة",
      confirm: "تأكيد",
      cart: "السلة",
      welcomeBanner: "حصرياً من بانكوك إلى السعودية",
      heroTitle: "أحذية وحقائب جلدية أصلية بمواصفات عالمية",
      browseBtn: "تصفح التشكيلة الآن",
      welcomePrefix: "حياك",
      welcomeMessage: "مرحباً،",
      notifications: "الإشعارات",
      orders: "الطلبات",
      pendingOrders: "طلبات بانتظار الدفع",
      wishlist: "قائمة الأمنيات",
      wallet: "محفظتي",
      myProfile: "حسابي",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      titleproduct: "المجموعة الفاخرة (الأحذية والحقائب)",
      sar: "ريال",
      addToCart: "أضف للسلة",
      loadingProducts: "جاري تحميل المنتجات الفاخرة..."
    }
  },
  en: {
    translation: {
      searchPlaceholder: "Search...",
      account: "Account",
      login: "Sign In",
      language: "Language",
      currentLang: "English",
      currencyModalTitle: "Select Preferred Currency",
      confirm: "Confirm",
      cart: "Cart",
      welcomeBanner: "Exclusive from Bangkok to Saudi Arabia",
      heroTitle: "Original leather shoes & bags with global standards",
      browseBtn: "Browse Collection Now",
      welcomePrefix: "Welcome",
      welcomeMessage: "Hello,",
      notifications: "Notifications",
      orders: "Orders",
      pendingOrders: "Pending Payments",
      wishlist: "Wishlist",
      wallet: "My Wallet",
      myProfile: "My Profile",
      settings: "Settings",
      logout: "Sign Out",
      titleproduct: "Luxury Collection (Shoes & Bags)",
      sar: "SAR",
      addToCart: "Add to Cart",
      loadingProducts: "Loading luxury items..."
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;