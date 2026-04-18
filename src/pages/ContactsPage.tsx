import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

export default function ContactsPage() {
  const [formData, setFormData] = useState({
    name: '',
    complaint: '',
    prescription: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('ЖАЛОБА ПЕРЕДАНА В ПАЛАТУ. МЫ СВЯЖЕМСЯ С ВАМИ В БЛИЖАЙШЕЕ ВРЕМЯ.');
    setFormData({ name: '', complaint: '', prescription: '' });
  };

  return (
    <div className="min-h-screen py-24 md:py-32 px-8">
      <div className="container mx-auto max-w-6xl">
        <h1 className="font-mono text-3xl md:text-5xl font-bold mb-8 text-foreground text-center">
          ПРИЕМНАЯ ПАЛАТЫ
        </h1>
        <p className="font-mono text-sm text-muted-foreground text-center mb-16">
          Опишите свои симптомы, и мы подберем правильный диагноз
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="border-2 border-border p-8 bg-card">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                ФОРМА ОБРАЩЕНИЯ
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-sm text-foreground">
                    ФИО ПАЦИЕНТА
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complaint" className="font-mono text-sm text-foreground">
                    ЖАЛОБА
                  </Label>
                  <Input
                    id="complaint"
                    type="email"
                    value={formData.complaint}
                    onChange={(e) => setFormData({ ...formData, complaint: e.target.value })}
                    required
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="Ваш email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prescription" className="font-mono text-sm text-foreground">
                    РЕЦЕПТ (СООБЩЕНИЕ)
                  </Label>
                  <Textarea
                    id="prescription"
                    value={formData.prescription}
                    onChange={(e) => setFormData({ ...formData, prescription: e.target.value })}
                    required
                    rows={6}
                    className="bg-background border-border text-foreground font-mono resize-none"
                    placeholder="Опишите ваш запрос"
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                >
                  ПЕРЕДАТЬ В ПАЛАТУ
                  <Send className="ml-2 h-5 w-5" strokeWidth={1.5} />
                </Button>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="border-2 border-border p-8 bg-card">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                КОНТАКТНЫЕ ДАННЫЕ
              </h2>
              <div className="space-y-4 font-mono text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">АДРЕС КЛИНИКИ:</p>
                  <p className="text-foreground">Палата №98, Интернет-клиника</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">EMAIL:</p>
                  <a
                    href="mailto:info@98shizmut.ru"
                    className="text-primary hover:underline"
                  >
                    info@98shizmut.ru
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">TELEGRAM:</p>
                  <a
                    href="https://t.me/palata98"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    @palata98
                  </a>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">РЕЖИМ РАБОТЫ:</p>
                  <p className="text-foreground">Круглосуточно, без выходных</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    (Ответ на обращения в течение 24 часов)
                  </p>
                </div>
              </div>
            </div>

            <div className="border-2 border-border p-8 bg-tertiary">
              <h2 className="font-mono text-xl font-bold mb-4 text-foreground">
                РАСПОЛОЖЕНИЕ
              </h2>
              <div className="aspect-video w-full border-2 border-border overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.4447!2d37.6173!3d55.7558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzIwLjkiTiAzN8KwMzcnMDIuMyJF!5e0!3m2!1sen!2sru!4v1234567890&key=YOUR_API_KEY"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Расположение Палаты №98"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
