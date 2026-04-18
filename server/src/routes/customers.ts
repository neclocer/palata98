import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all customers (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        orders: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения клиентов' });
  }
});

// Get customer stats (admin only)
router.get('/stats', authenticateAdmin, async (req, res) => {
  try {
    const totalCustomers = await prisma.customer.count();
    const totalOrders = await prisma.order.count();
    const totalRevenue = await prisma.order.aggregate({
      _sum: { total: true }
    });

    res.json({
      totalCustomers,
      totalOrders,
      totalRevenue: totalRevenue._sum.total || 0
    });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения статистики' });
  }
});

export default router;
