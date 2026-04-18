import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin, checkIpAddress } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Login
router.post('/login', checkIpAddress, async (req, res) => {
  try {
    const { password } = req.body;
    const clientIp = req.ip || req.socket.remoteAddress;

    // Check if admin exists
    const admin = await prisma.admin.findFirst({
      where: { allowedIp: clientIp || '' }
    });

    if (!admin) {
      return res.status(401).json({ error: 'Неверные учетные данные' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Неверный пароль' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { adminId: admin.id },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({ token, adminId: admin.id });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// Verify token
router.get('/verify', authenticateAdmin, (req, res) => {
  res.json({ valid: true });
});

// Get admin info
router.get('/info', authenticateAdmin, async (req: any, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId },
      select: { id: true, username: true, allowedIp: true }
    });

    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

export default router;
