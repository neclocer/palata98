import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'palata98admin', 10);
  const allowedIps = process.env.ALLOWED_IPS?.split(',') || ['127.0.0.1'];

  const admin = await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: hashedPassword,
      allowedIp: allowedIps[0]
    }
  });

  console.log('Admin created:', admin.username);

  // Create initial products
  const products = [
    {
      name: 'ХУДИ "СУДЕБНАЯ ЭКСПЕРТИЗА"',
      diagnosis: 'ДИАГНОЗ: ПАРАНОИДАЛЬНОЕ РАССТРОЙСТВО',
      price: 8900,
      image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_3.png',
      description: 'Худи с принтом в стиле судебной фотографии. Тяжелый хлопок, оверсайз крой, детали в виде маркировочных меток.',
      material: '100% хлопок плотностью 380 г/м². Внутренняя сторона с начесом.',
      care: 'Машинная стирка при 30°C. Не отбеливать. Гладить при низкой температуре.',
      sizing: 'Оверсайз крой. Рекомендуем выбирать ваш обычный размер для свободной посадки.',
      state: ['Агрессия', 'Апатия'],
      inStock: true
    },
    {
      name: 'ФУТБОЛКА "РЕНТГЕН"',
      diagnosis: 'ДИАГНОЗ: ДЕПЕРСОНАЛИЗАЦИЯ',
      price: 4500,
      image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_4.png',
      description: 'Футболка с рентгеновским принтом. Мягкий хлопок, прямой крой, контрастная печать.',
      material: '100% органический хлопок плотностью 180 г/м².',
      care: 'Машинная стирка при 40°C. Не использовать отбеливатель.',
      sizing: 'Классический крой. Выбирайте ваш обычный размер.',
      state: ['Апатия', 'Ностальгия'],
      inStock: true
    },
    {
      name: 'КУРТКА "ГЛИТЧ"',
      diagnosis: 'ДИАГНОЗ: ДИССОЦИАТИВНОЕ СОСТОЯНИЕ',
      price: 12900,
      image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_5.png',
      description: 'Техническая куртка с глитч-принтом. Водоотталкивающая ткань, множество карманов, регулируемый капюшон.',
      material: 'Полиэстер с водоотталкивающей пропиткой. Подкладка из сетки.',
      care: 'Ручная стирка или деликатная машинная стирка при 30°C.',
      sizing: 'Оверсайз крой. Для более облегающей посадки выбирайте размер меньше.',
      state: ['Эйфория', 'Агрессия'],
      inStock: true
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }

  console.log('Products seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
