import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <div>
            <h3 className="font-mono text-sm font-bold mb-4 text-foreground">ПАЛАТА №98</h3>
            <p className="text-sm text-muted-foreground font-mono">
              Цифровое пространство манифестации
            </p>
          </div>

          <div>
            <h3 className="font-mono text-sm font-bold mb-4 text-foreground">НАВИГАЦИЯ</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/catalog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Каталог
              </Link>
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                История болезни
              </Link>
              <Link to="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Доставка и возврат
              </Link>
              <Link to="/contacts" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="font-mono text-sm font-bold mb-4 text-foreground">СВЯЗЬ</h3>
            <div className="flex flex-col gap-2">
              <a
                href="https://t.me/palata98"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Telegram
              </a>
              <a
                href="mailto:info@98shizmut.ru"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                info@98shizmut.ru
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground font-mono text-center">
            © 2025 Палата №98. Все симптомы защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
