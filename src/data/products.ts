export interface Product {
  id: string;
  name: string;
  diagnosis: string;
  price: number;
  image: string;
  description: string;
  material: string;
  care: string;
  sizing: string;
  state: string[];
  inStock: boolean;
  createdAt: string;
}

// Начальные товары
export const initialProducts: Product[] = [
  {
    id: 'hoodie-forensic',
    name: 'ХУДИ "СУДЕБНАЯ ЭКСПЕРТИЗА"',
    diagnosis: 'ДИАГНОЗ: ПАРАНОИДАЛЬНОЕ РАССТРОЙСТВО',
    price: 8900,
    image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_3.png',
    description:
      'Худи с принтом в стиле судебной фотографии. Тяжелый хлопок, оверсайз крой, детали в виде маркировочных меток.',
    material: '100% хлопок плотностью 380 г/м². Внутренняя сторона с начесом.',
    care: 'Машинная стирка при 30°C. Не отбеливать. Гладить при низкой температуре.',
    sizing: 'Оверсайз крой. Рекомендуем выбирать ваш обычный размер для свободной посадки.',
    state: ['Агрессия', 'Апатия'],
    inStock: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'tee-xray',
    name: 'ФУТБОЛКА "РЕНТГЕН"',
    diagnosis: 'ДИАГНОЗ: ДЕПЕРСОНАЛИЗАЦИЯ',
    price: 4500,
    image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_4.png',
    description:
      'Футболка с рентгеновским принтом. Мягкий хлопок, прямой крой, контрастная печать.',
    material: '100% органический хлопок плотностью 180 г/м².',
    care: 'Машинная стирка при 40°C. Не использовать отбеливатель.',
    sizing: 'Классический крой. Выбирайте ваш обычный размер.',
    state: ['Апатия', 'Ностальгия'],
    inStock: true,
    createdAt: '2024-01-02',
  },
  {
    id: 'jacket-glitch',
    name: 'КУРТКА "ГЛИТЧ"',
    diagnosis: 'ДИАГНОЗ: ДИССОЦИАТИВНОЕ СОСТОЯНИЕ',
    price: 12900,
    image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_5.png',
    description:
      'Техническая куртка с глитч-принтом. Водоотталкивающая ткань, множество карманов, регулируемый капюшон.',
    material: 'Полиэстер с водоотталкивающей пропиткой. Подкладка из сетки.',
    care: 'Ручная стирка или деликатная машинная стирка при 30°C.',
    sizing: 'Оверсайз крой. Для более облегающей посадки выбирайте размер меньше.',
    state: ['Эйфория', 'Агрессия'],
    inStock: true,
    createdAt: '2024-01-03',
  },
  {
    id: 'pants-medical',
    name: 'БРЮКИ "МЕДИЦИНСКАЯ КАРТА"',
    diagnosis: 'ДИАГНОЗ: ОБСЕССИВНО-КОМПУЛЬСИВНОЕ РАССТРОЙСТВО',
    price: 7900,
    image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_6.png',
    description:
      'Брюки с принтом медицинских документов. Удобный крой, множество карманов.',
    material: '65% хлопок, 35% полиэстер. Плотность 240 г/м².',
    care: 'Машинная стирка при 30°C. Гладить при средней температуре.',
    sizing: 'Прямой крой. Выбирайте ваш обычный размер.',
    state: ['Апатия', 'Ностальгия'],
    inStock: true,
    createdAt: '2024-01-04',
  },
  {
    id: 'tee-eeg',
    name: 'ФУТБОЛКА "ЭЭГ"',
    diagnosis: 'ДИАГНОЗ: ТРЕВОЖНОЕ РАССТРОЙСТВО',
    price: 4200,
    image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_2.png',
    description: 'Футболка с принтом электроэнцефалограммы. Легкий хлопок, комфортная посадка.',
    material: '100% хлопок плотностью 160 г/м².',
    care: 'Машинная стирка при 40°C.',
    sizing: 'Классический крой.',
    state: ['Агрессия', 'Эйфория'],
    inStock: true,
    createdAt: '2024-01-05',
  },
  {
    id: 'hoodie-static',
    name: 'ХУДИ "СТАТИЧЕСКИЙ ШУМ"',
    diagnosis: 'ДИАГНОЗ: ШИЗОФРЕНИЧЕСКОЕ РАССТРОЙСТВО',
    price: 9500,
    image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_5.png',
    description: 'Худи с принтом VHS-статики. Плотный хлопок, оверсайз крой.',
    material: '100% хлопок плотностью 400 г/м².',
    care: 'Машинная стирка при 30°C.',
    sizing: 'Оверсайз крой.',
    state: ['Эйфория', 'Ностальгия'],
    inStock: true,
    createdAt: '2024-01-06',
  },
];

// Функции для работы с localStorage
const STORAGE_KEY = 'palata98_products';

export const loadProducts = (): Product[] => {
  if (typeof window === 'undefined') return initialProducts;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Error loading products:', e);
      return initialProducts;
    }
  }
  return initialProducts;
};

export const saveProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = loadProducts();
  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const updatedProducts = [...products, newProduct];
  saveProducts(updatedProducts);
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | null => {
  const products = loadProducts();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  const updatedProduct = { ...products[index], ...updates };
  products[index] = updatedProduct;
  saveProducts(products);
  return updatedProduct;
};

export const deleteProduct = (id: string): boolean => {
  const products = loadProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  
  saveProducts(filtered);
  return true;
};

export const getProductById = (id: string): Product | undefined => {
  const products = loadProducts();
  return products.find((p) => p.id === id);
};
