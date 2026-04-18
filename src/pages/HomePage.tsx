import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../contexts/ProductsContext';

export default function HomePage() {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="w-full">
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 z-10" />
        <motion.video
          src="https://c.animaapp.com/mizty0xc0MFsWV/img/ai_1.mp4"
          poster="https://c.animaapp.com/mizty0xc0MFsWV/img/ai_1-poster.png"
          alt="vhs noise static screen"
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-8 text-center">
          <motion.h1
            className="font-mono text-3xl md:text-5xl lg:text-6xl font-bold mb-8 text-foreground tracking-wider"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            ДОБРО ПОЖАЛОВАТЬ В ПАЛАТУ №98
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/catalog">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-base px-8 py-6"
              >
                ВОЙТИ В СИСТЕМУ
                <ArrowRight className="ml-2 h-5 w-5" strokeWidth={1.5} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-8 relative">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(https://c.animaapp.com/mizty0xc0MFsWV/img/ai_2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container mx-auto relative z-10">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-mono text-2xl md:text-4xl font-bold mb-12 text-foreground text-center">
              МАНИФЕСТ ПАЛАТЫ
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Мы не продаем одежду. Мы диагностируем состояния. Каждая вещь — это симптом, каждая
                  покупка — это признание. В эпоху цифровой перегрузки мы предлагаем честность через
                  эстетику распада.
                </p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Палата №98 — это пространство, где глитч становится языком, а VHS-шум — медитацией.
                  Здесь нет места идеальным картинкам и фальшивым улыбкам.
                </p>
              </motion.div>
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Мы верим в красоту несовершенства, в силу артефактов, в правду искаженного сигнала.
                  Наша одежда — это не маска, а рентген души.
                </p>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                  Добро пожаловать в клинику, где лечат не от болезни, а от иллюзии здоровья. Здесь
                  каждый находит свой диагноз.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-8 bg-tertiary">
        <div className="container mx-auto">
          <h2 className="font-mono text-2xl md:text-4xl font-bold mb-16 text-foreground text-center">
            ИЗБРАННЫЕ АРТЕФАКТЫ
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link to={`/catalog/${product.id}`}>
                  <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 bg-card cursor-pointer">
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <p className="font-mono text-sm text-primary">{product.diagnosis}</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-mono text-base font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center">
            <Link to="/catalog">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-foreground border-primary hover:bg-primary hover:text-primary-foreground font-mono"
              >
                ПРОСМОТРЕТЬ ВСЕ СИМПТОМЫ
                <ArrowRight className="ml-2 h-5 w-5" strokeWidth={1.5} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
