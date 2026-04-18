import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('⚠️  ВНИМАНИЕ: Это удалит все данные из базы данных!');
  console.log('Начинаем сброс через 3 секунды...\n');

  await new Promise(resolve => setTimeout(resolve, 3000));

  console.log('🗑️  Удаление всех данных...');

  // Удаление в правильном порядке (из-за foreign keys)
  await prisma.orderItem.deleteMany();
  console.log('   ✅ OrderItem удалены');

  await prisma.order.deleteMany();
  console.log('   ✅ Order удалены');

  await prisma.customer.deleteMany();
  console.log('   ✅ Customer удалены');

  await prisma.product.deleteMany();
  console.log('   ✅ Product удалены');

  await prisma.admin.deleteMany();
  console.log('   ✅ Admin удалены');

  console.log('\n📝 Создание начальных данных...');

  // Создание админа
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'palata98admin', 10);
  const allowedIps = process.env.ALLOWED_IPS?.split(',') || ['127.0.0.1'];

  await prisma.admin.create({
    data: {
      username: 'admin',
      password: hashedPassword,
      allowedIp: allowedIps[0]
    }
  });
  console.log('   ✅ Администратор создан');

  // Создание товаров
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
    },
    {
      name: 'БРЮКИ "МЕДИЦИНСКАЯ КАРТА"',
      diagnosis: 'ДИАГНОЗ: ОБСЕССИВНО-КОМПУЛЬСИВНОЕ РАССТРОЙСТВО',
      price: 7900,
      image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_6.png',
      description: 'Брюки с принтом медицинских документов. Удобный крой, множество карманов.',
      material: '65% хлопок, 35% полиэстер. Плотность 240 г/м².',
      care: 'Машинная стирка при 30°C. Гладить при средней температуре.',
      sizing: 'Прямой крой. Выбирайте ваш обычный размер.',
      state: ['Апатия', 'Ностальгия'],
      inStock: true
    },
    {
      name: 'ФУТБОЛКА "ЭЭГ"',
      diagnosis: 'ДИАГНОЗ: ТРЕВОЖНОЕ РАССТРОЙСТВО',
      price: 4200,
      image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_2.png',
      description: 'Футболка с принтом электроэнцефалограммы. Легкий хлопок, комфортная посадка.',
      material: '100% хлопок плотностью 160 г/м².',
      care: 'Машинная стирка при 40°C.',
      sizing: 'Классический крой.',
      state: ['Агрессия', 'Эйфория'],
      inStock: true
    },
    {
      name: 'ХУДИ "СТАТИЧЕСКИЙ ШУМ"',
      diagnosis: 'ДИАГНОЗ: ШИЗОФРЕНИЧЕСКОЕ РАССТРОЙСТВО',
      price: 9500,
      image: 'https://c.animaapp.com/mizty0xc0MFsWV/img/ai_5.png',
      description: 'Худи с принтом VHS-статики. Плотный хлопок, оверсайз крой.',
      material: '100% хлопок плотностью 400 г/м².',
      care: 'Машинная стирка при 30°C.',
      sizing: 'Оверсайз крой.',
      state: ['Эйфория', 'Ностальгия'],
      inStock: true
    }
  ];

  for (const product of products) {
    await prisma.product.create({ data: product });
  }
  console.log(`   ✅ Создано ${products.length} товаров`);

  console.log('\n✅ База данных успешно сброшена и заполнена начальными данными');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
