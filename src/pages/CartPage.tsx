import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <h1 className="font-mono text-2xl md:text-4xl font-bold mb-4 text-foreground">
            ИСТОРИЯ БОЛЕЗНИ ПУСТА
          </h1>
          <p className="font-mono text-sm text-muted-foreground mb-8">
            Добавьте симптомы для диагностики
          </p>
          <Link to="/catalog">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
              ПЕРЕЙТИ В КАТАЛОГ
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 md:py-32 px-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-mono text-3xl md:text-5xl font-bold mb-12 text-foreground text-center">
          ИСТОРИЯ БОЛЕЗНИ
        </h1>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="p-6 border-2 border-border bg-card">
                  <div className="flex gap-6">
                    <div className="w-32 h-32 flex-shrink-0 overflow-hidden border border-border">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <h3 className="font-mono text-base font-bold text-card-foreground mb-2">
                          {item.name}
                        </h3>
                        <p className="font-mono text-lg text-foreground">{item.price} ₽</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                          >
                            <Minus className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                          <span className="font-mono text-sm w-8 text-center text-foreground">
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                          >
                            <Plus className="h-4 w-4" strokeWidth={1.5} />
                          </Button>
                        </div>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeItem(item.id)}
                          className="bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-5 w-5" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="p-6 border-2 border-border bg-card sticky top-24">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                ИТОГОВЫЙ ДИАГНОЗ
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between font-mono text-sm">
                  <span className="text-muted-foreground">Симптомов:</span>
                  <span className="text-foreground">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <Separator className="bg-border" />
                <div className="flex justify-between font-mono text-lg font-bold">
                  <span className="text-card-foreground">ИТОГО:</span>
                  <span className="text-foreground">{getTotalPrice()} ₽</span>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
              >
                ПОДТВЕРДИТЬ ДИАГНОЗ
              </Button>
              <Link to="/catalog">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full mt-3 bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-mono"
                >
                  ПРОДОЛЖИТЬ ДИАГНОСТИКУ
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
