import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://c.animaapp.com/mizty0xc0MFsWV/img/ai_5.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center relative z-10"
      >
        <h1 className="font-mono text-6xl md:text-8xl font-bold mb-6 text-primary glitch-text">
          404
        </h1>
        <h2 className="font-mono text-2xl md:text-4xl font-bold mb-4 text-foreground">
          СИМПТОМ НЕ НАЙДЕН
        </h2>
        <p className="font-mono text-base text-muted-foreground mb-8 max-w-md mx-auto">
          ВОЗМОЖНО, ВЫ ВЫЗДОРОВЕЛИ? ИЛИ ПРОСТО ЗАБЛУДИЛИСЬ В КОРИДОРАХ ПАЛАТЫ.
        </p>
        <Link to="/">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
          >
            <Home className="mr-2 h-5 w-5" strokeWidth={1.5} />
            ВЕРНУТЬСЯ В ПАЛАТУ
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
