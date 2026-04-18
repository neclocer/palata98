import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get all orders (admin only)
router.get('/', authenticateAdmin, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        customer: true,
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения заказов' });
  }
});

// Create order (public)
router.post('/', async (req, res) => {
  try {
    const { customer, items } = req.body;
    
    // Create or find customer
    const customerRecord = await prisma.customer.upsert({
      where: { email: customer.email },
      update: { name: customer.name, phone: customer.phone },
      create: customer
    });

    // Calculate total
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Create order
    const order = await prisma.order.create({
      data: {
        customerId: customerRecord.id,
        total,
        items: {
          create: items.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    res.status(201).json(order);
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Ошибка создания заказа' });
  }
});

// Update order status (admin only)
router.patch('/:id/status', authenticateAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления статуса' });
  }
});

export default router;
