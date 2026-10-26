import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تحديد اتجاه الصفحة ديناميكياً (RTL للعربية، LTR للإنجليزية)
  const currentDir = i18n.language.startsWith('ar') ? 'rtl' : 'ltr';

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/store/products/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Accept-Language': i18n.language // تمرير لغة المتجر الحالية
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else if (response.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Server connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [i18n.language, navigate]);

  // دالة استخراج الترجمة (للعنوان والوصف)
  const getTranslated = (translationsObj, fieldName) => {
    if (!translationsObj) return '';
    const lang = i18n.language.startsWith('ar') ? 'ar' : 'en';
    
    if (translationsObj[lang] && translationsObj[lang][fieldName]) {
      return translationsObj[lang][fieldName];
    }
    return translationsObj['en']?.[fieldName] || '';
  };

  // دالة معالجة رابط الصورة لضمان ظهورها من السيرفر
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    const backendUrl = 'http://127.0.0.1:8000'; 
    return `${backendUrl}${imagePath}`;
  };

  if (loading) return <div className="text-center py-10 text-xl">Loading luxury items...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div dir={currentDir} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-[#003046]">
{t('titleproduct')}      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const title = getTranslated(product.translations, 'title');
          const description = getTranslated(product.translations, 'description');
          const imageUrl = getImageUrl(product.image); // معالجة رابط الصورة القادم من Neon

          return (
            <div key={product.id} className="border rounded-lg p-4 shadow-md bg-white flex flex-col justify-between">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={title} 
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400">
                  No Image Available
                </div>
              )}
              
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
              </div>
              
              <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="text-lg font-bold text-green-600">
                  {product.price} {t('sar', 'SAR')}
                </span>
                <button className="bg-[#003046] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition">
                  {t('add_to_cart', 'Add to Cart')}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}