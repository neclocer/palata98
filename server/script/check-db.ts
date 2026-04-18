import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Проверка подключения к базе данных...\n');

  try {
    // Проверка подключения
    await prisma.$connect();
    console.log('✅ Подключение к базе данных успешно\n');

    // Статистика
    const productsCount = await prisma.product.count();
    const ordersCount = await prisma.order.count();
    const customersCount = await prisma.customer.count();
    const adminsCount = await prisma.admin.count();

    console.log('📊 Статистика базы данных:');
    console.log(`   Товаров: ${productsCount}`);
    console.log(`   Заказов: ${ordersCount}`);
    console.log(`   Клиентов: ${customersCount}`);
    console.log(`   Администраторов: ${adminsCount}\n`);

    // Последние товары
    if (productsCount > 0) {
      console.log('🛍️ Последние товары:');
      const recentProducts = await prisma.product.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { name: true, price: true, inStock: true }
      });
      recentProducts.forEach(p => {
        console.log(`   - ${p.name} (${p.price}₽) ${p.inStock ? '✅' : '❌'}`);
      });
      console.log();
    }

    // Последние заказы
    if (ordersCount > 0) {
      console.log('📦 Последние заказы:');
      const recentOrders = await prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { customer: true }
      });
      recentOrders.forEach(o => {
        console.log(`   - Заказ #${o.id.slice(0, 8)} от ${o.customer.name} (${o.total}₽) - ${o.status}`);
      });
      console.log();
    }

    console.log('✅ Проверка завершена успешно');
  } catch (error) {
    console.error('❌ Ошибка подключения к базе данных:');
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
