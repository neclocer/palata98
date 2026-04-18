import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductsContext';

export default function ProductPage() {
  const { productId } = useParams();
  const { addItem } = useCart();
  const { getProductById, products } = useProducts();
  const [selectedSize, setSelectedSize] = useState('M');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const product = getProductById(productId || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center">
          <h1 className="font-mono text-2xl font-bold mb-4 text-foreground">СИМПТОМ НЕ НАЙДЕН</h1>
          <Link to="/catalog">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono">
              ВЕРНУТЬСЯ В КАТАЛОГ
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 3);

  return (
    <div className="min-h-screen py-24 md:py-32 px-8">
      <div className="container mx-auto">
        <Link to="/catalog">
          <Button
            variant="ghost"
            className="mb-8 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground font-mono"
          >
            <ArrowLeft className="mr-2 h-5 w-5" strokeWidth={1.5} />
            НАЗАД В КАТАЛОГ
          </Button>
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[3/4] overflow-hidden border-2 border-border bg-card">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-mono text-2xl md:text-4xl font-bold mb-4 text-foreground">
                {product.name}
              </h1>
              <p className="font-mono text-sm text-primary mb-6">{product.diagnosis}</p>
              <p className="font-mono text-3xl text-foreground">{product.price} ₽</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-sm font-bold text-foreground">ДОЗИРОВКА:</h3>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? 'default' : 'outline'}
                    onClick={() => setSelectedSize(size)}
                    className={
                      selectedSize === size
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-mono'
                        : 'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-mono'
                    }
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              onClick={() =>
                addItem({
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                  quantity: 1,
                })
              }
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-base"
            >
              ДОБАВИТЬ В ИСТОРИЮ БОЛЕЗНИ
            </Button>

            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-tertiary">
                <TabsTrigger
                  value="description"
                  className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  НОМЕНКЛАТУРА
                </TabsTrigger>
                <TabsTrigger
                  value="material"
                  className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  СИМПТОМАТИКА
                </TabsTrigger>
                <TabsTrigger
                  value="care"
                  className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  ПОКАЗАНИЯ
                </TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </TabsContent>
              <TabsContent value="material" className="mt-6">
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {product.material}
                </p>
              </TabsContent>
              <TabsContent value="care" className="mt-6">
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  {product.care}
                </p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed mt-4">
                  {product.sizing}
                </p>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        <div className="border-t border-border pt-16">
          <h2 className="font-mono text-2xl font-bold mb-8 text-foreground">СВЯЗАННЫЕ СИМПТОМЫ</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} to={`/catalog/${relatedProduct.id}`}>
                <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 bg-card cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-mono text-sm font-bold text-card-foreground group-hover:text-primary transition-colors mb-2">
                      {relatedProduct.name}
                    </h3>
                    <p className="font-mono text-base text-foreground">{relatedProduct.price} ₽</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
