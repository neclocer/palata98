import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 md:py-32 px-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-mono text-3xl md:text-5xl font-bold mb-16 text-foreground text-center">
          ИСТОРИЯ БОЛЕЗНИ
        </h1>

        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="border-2 border-border p-6 bg-card">
              <h2 className="font-mono text-xl font-bold mb-4 text-card-foreground">
                АНАМНЕЗ ПАЛАТЫ №98
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                Проект возник в 2024 году как реакция на перенасыщенность визуального пространства
                идеальными образами и фальшивой эстетикой. Мы решили создать бренд, который говорит
                правду через язык артефактов и глитчей.
              </p>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Палата №98 — это не просто магазин одежды. Это пространство для тех, кто устал от
                притворства, кто готов признать свои "симптомы" и носить их с гордостью.
              </p>
            </div>

            <div className="border-2 border-border p-6 bg-card">
              <h2 className="font-mono text-xl font-bold mb-4 text-card-foreground">
                КЛИНИЧЕСКАЯ КАРТИНА
              </h2>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
                Каждая коллекция — это новый диагноз. Мы исследуем состояния современного человека
                через призму медицинской эстетики, VHS-артефактов и цифрового распада.
              </p>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Наша одежда создается для тех, кто не боится быть несовершенным, кто видит красоту
                в искажениях и находит смысл в шуме.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="aspect-square overflow-hidden border-2 border-border">
              <img
                src="https://c.animaapp.com/mizty0xc0MFsWV/img/ai_2.png"
                alt="eeg brain scan texture"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-video overflow-hidden border-2 border-border">
              <img
                src="https://c.animaapp.com/mizty0xc0MFsWV/img/ai_4.png"
                alt="xray pattern background"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-2 border-border p-8 md:p-12 bg-tertiary"
        >
          <h2 className="font-mono text-2xl font-bold mb-8 text-foreground text-center">
            РАСШИФРОВКА ДИАГНОЗА
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="font-mono text-base font-bold text-primary">АГРЕССИЯ</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Коллекция для тех, кто не скрывает свой гнев. Резкие линии, контрастные принты,
                провокационные детали.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-mono text-base font-bold text-primary">АПАТИЯ</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Одежда для состояния безразличия. Приглушенные тона, минималистичные формы,
                комфортные силуэты.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-mono text-base font-bold text-primary">ЭЙФОРИЯ</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Для моментов экстаза и потери контроля. Яркие акценты, динамичные принты,
                неожиданные сочетания.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
