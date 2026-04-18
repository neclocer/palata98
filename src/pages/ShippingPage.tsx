import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ShippingPage() {
  return (
    <div className="min-h-screen py-24 md:py-32 px-8">
      <div className="container mx-auto max-w-4xl">
        <h1 className="font-mono text-3xl md:text-5xl font-bold mb-8 text-foreground text-center">
          ИНСТРУКЦИЯ ПО ПРИМЕНЕНИЮ
        </h1>
        <p className="font-mono text-sm text-muted-foreground text-center mb-16">
          Фармакологическое действие и показания к применению
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="border-2 border-border p-8 bg-card">
            <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
              ФАРМАКОЛОГИЧЕСКОЕ ДЕЙСТВИЕ
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-4">
              Палата №98 осуществляет доставку симптомов по всей территории Российской Федерации.
              Каждый заказ упаковывается в специальную медицинскую упаковку с соблюдением всех
              протоколов конфиденциальности.
            </p>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Мы работаем с проверенными курьерскими службами, гарантирующими сохранность и
              своевременную доставку вашего диагноза.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="delivery" className="border-2 border-border bg-card">
              <AccordionTrigger className="px-8 py-6 font-mono text-base font-bold text-card-foreground hover:text-primary hover:no-underline">
                ИНКУБАЦИОННЫЙ ПЕРИОД (СРОКИ ДОСТАВКИ)
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 font-mono text-sm text-muted-foreground leading-relaxed">
                <ul className="space-y-3">
                  <li>• Москва и Санкт-Петербург: 1-2 рабочих дня</li>
                  <li>• Крупные города России: 3-5 рабочих дней</li>
                  <li>• Отдаленные регионы: 5-10 рабочих дней</li>
                  <li>• Экспресс-доставка: доступна для Москвы (доставка в день заказа)</li>
                </ul>
                <p className="mt-4">
                  Стоимость доставки рассчитывается автоматически при оформлении заказа в
                  зависимости от региона и веса посылки.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment" className="border-2 border-border bg-card">
              <AccordionTrigger className="px-8 py-6 font-mono text-base font-bold text-card-foreground hover:text-primary hover:no-underline">
                СПОСОБЫ ОПЛАТЫ
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 font-mono text-sm text-muted-foreground leading-relaxed">
                <ul className="space-y-3">
                  <li>• Банковские карты (Visa, Mastercard, МИР)</li>
                  <li>• Электронные кошельки (ЮMoney, QIWI)</li>
                  <li>• Оплата при получении (для заказов до 10 000 ₽)</li>
                  <li>• Банковский перевод для юридических лиц</li>
                </ul>
                <p className="mt-4">
                  Все платежи защищены SSL-сертификатом. Мы не храним данные ваших банковских карт.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="returns" className="border-2 border-border bg-card">
              <AccordionTrigger className="px-8 py-6 font-mono text-base font-bold text-card-foreground hover:text-primary hover:no-underline">
                РЕМИССИЯ (ВОЗВРАТ И ОБМЕН)
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 font-mono text-sm text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  Вы можете вернуть или обменять товар в течение 14 дней с момента получения при
                  соблюдении следующих условий:
                </p>
                <ul className="space-y-3 mb-4">
                  <li>• Товар не был в употреблении и сохранил товарный вид</li>
                  <li>• Сохранены все ярлыки и бирки</li>
                  <li>• Сохранена оригинальная упаковка</li>
                  <li>• Предоставлен чек или подтверждение заказа</li>
                </ul>
                <p className="mb-4">
                  Для оформления возврата свяжитесь с нами по email: returns@98shizmut.ru или через
                  форму обратной связи.
                </p>
                <p>
                  Возврат денежных средств осуществляется в течение 10 рабочих дней после получения
                  товара на наш склад.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="warranty" className="border-2 border-border bg-card">
              <AccordionTrigger className="px-8 py-6 font-mono text-base font-bold text-card-foreground hover:text-primary hover:no-underline">
                ГАРАНТИЯ КАЧЕСТВА
              </AccordionTrigger>
              <AccordionContent className="px-8 pb-6 font-mono text-sm text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  Мы гарантируем качество всех наших изделий. Каждый товар проходит контроль перед
                  отправкой.
                </p>
                <p className="mb-4">
                  Если вы обнаружили производственный брак, свяжитесь с нами в течение 30 дней с
                  момента получения. Мы бесплатно заменим товар или вернем полную стоимость.
                </p>
                <p>
                  Гарантия не распространяется на повреждения, возникшие в результате неправильного
                  ухода или эксплуатации.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="border-2 border-border p-8 bg-tertiary">
            <h2 className="font-mono text-xl font-bold mb-4 text-foreground">
              ПРОТИВОПОКАЗАНИЯ
            </h2>
            <p className="font-mono text-sm text-muted-foreground leading-relaxed">
              Не рекомендуется использовать нашу продукцию лицам, не готовым к честному диалогу с
              собой. Возможны побочные эффекты в виде повышенной осознанности и критического
              мышления.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
