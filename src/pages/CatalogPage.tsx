import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';

export default function CatalogPage() {
  const { addItem } = useCart();
  const { products } = useProducts();
  const [selectedStates, setSelectedStates] = useState<string[]>([]);

  const states = ['Агрессия', 'Апатия', 'Эйфория', 'Ностальгия'];

  const handleStateToggle = (state: string) => {
    setSelectedStates((prev) =>
      prev.includes(state) ? prev.filter((s) => s !== state) : [...prev, state]
    );
  };

  const filteredProducts =
    selectedStates.length === 0
      ? products
      : products.filter((product) =>
          product.state.some((state) => selectedStates.includes(state))
        );

  return (
    <div className="min-h-screen py-24 md:py-32 px-8">
      <div className="container mx-auto">
        <h1 className="font-mono text-3xl md:text-5xl font-bold mb-12 text-foreground text-center">
          КАТАЛОГ СИМПТОМОВ
        </h1>

        <div className="sticky top-20 z-40 bg-background/95 backdrop-blur border-y border-border py-6 mb-12">
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <span className="font-mono text-sm text-muted-foreground">СОСТОЯНИЕ:</span>
            {states.map((state) => (
              <div key={state} className="flex items-center space-x-2">
                <Checkbox
                  id={state}
                  checked={selectedStates.includes(state)}
                  onCheckedChange={() => handleStateToggle(state)}
                  className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label
                  htmlFor={state}
                  className="font-mono text-sm cursor-pointer text-foreground hover:text-primary transition-colors"
                >
                  {state}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="group overflow-hidden border-2 border-dashed border-border hover:border-primary transition-all duration-300 bg-card">
                <Link to={`/catalog/${product.id}`}>
                  <div className="aspect-[3/4] overflow-hidden relative cursor-pointer">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="font-mono text-xs text-primary">{product.diagnosis}</p>
                    </div>
                  </div>
                </Link>
                <div className="p-4 space-y-3">
                  <Link to={`/catalog/${product.id}`}>
                    <h3 className="font-mono text-sm font-bold text-card-foreground group-hover:text-primary transition-colors cursor-pointer">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="font-mono text-base text-foreground">{product.price} ₽</p>
                  <Button
                    size="sm"
                    onClick={() =>
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                      })
                    }
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs"
                  >
                    ДОБАВИТЬ В ИСТОРИЮ БОЛЕЗНИ
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="font-mono text-lg text-muted-foreground">
              СИМПТОМЫ НЕ ОБНАРУЖЕНЫ. ПОПРОБУЙТЕ ДРУГИЕ ФИЛЬТРЫ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
