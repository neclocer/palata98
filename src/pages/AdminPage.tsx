import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Lock, LogOut, Package, Users, Settings, BarChart, Trash2, Edit } from 'lucide-react';
import { useProducts } from '../contexts/ProductsContext';
import { Product } from '../data/products';

const ADMIN_PASSWORD = 'palata98admin';
const ALLOWED_IPS = ['91.105.233.219', 'localhost'];

export default function AdminPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [userIP, setUserIP] = useState('');
  const [error, setError] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    diagnosis: '',
    price: 0,
    image: '',
    description: '',
    material: '',
    care: '',
    sizing: '',
    state: [] as string[],
    inStock: true,
  });
  const [orders, setOrders] = useState([
    {
      id: '001',
      date: '2024-01-15',
      customer: 'Иван Петров',
      email: 'ivan@example.com',
      total: 8900,
      status: 'Обработан',
      items: ['ХУДИ "СУДЕБНАЯ ЭКСПЕРТИЗА"'],
    },
    {
      id: '002',
      date: '2024-01-16',
      customer: 'Мария Сидорова',
      email: 'maria@example.com',
      total: 17400,
      status: 'В обработке',
      items: ['ФУТБОЛКА "РЕНТГЕН"', 'КУРТКА "ГЛИТЧ"'],
    },
  ]);

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => setUserIP(data.ip))
      .catch(() => setUserIP('unknown'));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== ADMIN_PASSWORD) {
      setError('НЕВЕРНЫЙ ПАРОЛЬ');
      return;
    }

    if (!ALLOWED_IPS.includes(userIP) && userIP !== 'unknown') {
      setError('ДОСТУП ЗАПРЕЩЕН: IP АДРЕС НЕ АВТОРИЗОВАН');
      return;
    }

    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Заполните обязательные поля: название и цена');
      return;
    }
    addProduct(newProduct);
    setNewProduct({
      name: '',
      diagnosis: '',
      price: 0,
      image: '',
      description: '',
      material: '',
      care: '',
      sizing: '',
      state: [],
      inStock: true,
    });
    alert('Товар успешно добавлен!');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Вы уверены, что хотите удалить этот товар?')) {
      deleteProduct(id);
      alert('Товар удален');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      diagnosis: product.diagnosis,
      price: product.price,
      image: product.image,
      description: product.description,
      material: product.material,
      care: product.care,
      sizing: product.sizing,
      state: product.state,
      inStock: product.inStock,
    });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    updateProduct(editingProduct.id, newProduct);
    setEditingProduct(null);
    setNewProduct({
      name: '',
      diagnosis: '',
      price: 0,
      image: '',
      description: '',
      material: '',
      care: '',
      sizing: '',
      state: [],
      inStock: true,
    });
    alert('Товар обновлен!');
  };

  const handleStateToggle = (state: string) => {
    setNewProduct((prev) => ({
      ...prev,
      state: prev.state.includes(state)
        ? prev.state.filter((s) => s !== state)
        : [...prev.state, state],
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 border-2 border-primary bg-card">
            <div className="flex justify-center mb-6">
              <Lock className="h-12 w-12 text-primary" strokeWidth={1.5} />
            </div>
            <h1 className="font-mono text-2xl font-bold mb-2 text-center text-card-foreground">
              АДМИНИСТРАТИВНАЯ ПАНЕЛЬ
            </h1>
            <p className="font-mono text-sm text-muted-foreground text-center mb-6">
              ПАЛАТА №98 - СИСТЕМА УПРАВЛЕНИЯ
            </p>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-sm text-foreground">
                  ПАРОЛЬ ДОСТУПА
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background border-border text-foreground font-mono"
                  placeholder="Введите пароль"
                />
              </div>
              {error && (
                <div className="p-3 border-2 border-destructive bg-destructive/10">
                  <p className="font-mono text-xs text-destructive text-center">{error}</p>
                </div>
              )}
              <div className="p-3 border border-border bg-tertiary">
                <p className="font-mono text-xs text-muted-foreground">
                  IP АДРЕС: {userIP || 'Определение...'}
                </p>
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
              >
                ВОЙТИ В СИСТЕМУ
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 md:py-32 px-8 bg-background">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="font-mono text-3xl md:text-5xl font-bold text-foreground mb-2">
              ПАНЕЛЬ УПРАВЛЕНИЯ
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              IP: {userIP} | Сессия активна
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="bg-transparent text-foreground border-border hover:bg-destructive hover:text-destructive-foreground hover:border-destructive font-mono"
          >
            <LogOut className="mr-2 h-5 w-5" strokeWidth={1.5} />
            ВЫХОД
          </Button>
        </div>

        <Tabs defaultValue="orders" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-tertiary">
            <TabsTrigger
              value="orders"
              className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Package className="mr-2 h-4 w-4" strokeWidth={1.5} />
              ЗАКАЗЫ
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Settings className="mr-2 h-4 w-4" strokeWidth={1.5} />
              ТОВАРЫ
            </TabsTrigger>
            <TabsTrigger
              value="customers"
              className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="mr-2 h-4 w-4" strokeWidth={1.5} />
              КЛИЕНТЫ
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="font-mono text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart className="mr-2 h-4 w-4" strokeWidth={1.5} />
              АНАЛИТИКА
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            <Card className="p-6 border-2 border-border bg-card">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                СПИСОК ЗАКАЗОВ
              </h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-4 border-2 border-dashed border-border bg-tertiary"
                  >
                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground mb-1">
                          НОМЕР ЗАКАЗА
                        </p>
                        <p className="font-mono text-sm text-foreground">#{order.id}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground mb-1">ДАТА</p>
                        <p className="font-mono text-sm text-foreground">{order.date}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground mb-1">КЛИЕНТ</p>
                        <p className="font-mono text-sm text-foreground">{order.customer}</p>
                        <p className="font-mono text-xs text-muted-foreground">{order.email}</p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground mb-1">СУММА</p>
                        <p className="font-mono text-sm text-foreground">{order.total} ₽</p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="font-mono text-xs text-muted-foreground mb-2">ТОВАРЫ:</p>
                      <ul className="space-y-1">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="font-mono text-sm text-foreground">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span
                        className={`font-mono text-xs px-3 py-1 border ${
                          order.status === 'Обработан'
                            ? 'border-primary text-primary'
                            : 'border-muted-foreground text-muted-foreground'
                        }`}
                      >
                        {order.status}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-mono text-xs"
                      >
                        ПОДРОБНЕЕ
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card className="p-6 border-2 border-border bg-card">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                {editingProduct ? 'РЕДАКТИРОВАТЬ ТОВАР' : 'ДОБАВИТЬ ТОВАР'}
              </h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="product-name" className="font-mono text-sm text-foreground">
                    НАЗВАНИЕ ТОВАРА *
                  </Label>
                  <Input
                    id="product-name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="ХУДИ 'НАЗВАНИЕ'"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-diagnosis" className="font-mono text-sm text-foreground">
                    ДИАГНОЗ
                  </Label>
                  <Input
                    id="product-diagnosis"
                    value={newProduct.diagnosis}
                    onChange={(e) => setNewProduct({ ...newProduct, diagnosis: e.target.value })}
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="ДИАГНОЗ: ..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price" className="font-mono text-sm text-foreground">
                    ЦЕНА *
                  </Label>
                  <Input
                    id="product-price"
                    type="number"
                    value={newProduct.price || ''}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: Number(e.target.value) })
                    }
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-image" className="font-mono text-sm text-foreground">
                    URL ИЗОБРАЖЕНИЯ
                  </Label>
                  <Input
                    id="product-image"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-desc" className="font-mono text-sm text-foreground">
                    ОПИСАНИЕ
                  </Label>
                  <Textarea
                    id="product-desc"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    rows={3}
                    className="bg-background border-border text-foreground font-mono resize-none"
                    placeholder="Описание товара"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-material" className="font-mono text-sm text-foreground">
                    МАТЕРИАЛ
                  </Label>
                  <Input
                    id="product-material"
                    value={newProduct.material}
                    onChange={(e) => setNewProduct({ ...newProduct, material: e.target.value })}
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="100% хлопок..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-care" className="font-mono text-sm text-foreground">
                    УХОД
                  </Label>
                  <Input
                    id="product-care"
                    value={newProduct.care}
                    onChange={(e) => setNewProduct({ ...newProduct, care: e.target.value })}
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="Машинная стирка..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-sizing" className="font-mono text-sm text-foreground">
                    РАЗМЕРНАЯ СЕТКА
                  </Label>
                  <Input
                    id="product-sizing"
                    value={newProduct.sizing}
                    onChange={(e) => setNewProduct({ ...newProduct, sizing: e.target.value })}
                    className="bg-background border-border text-foreground font-mono"
                    placeholder="Оверсайз крой..."
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-mono text-sm text-foreground">СОСТОЯНИЕ</Label>
                  <div className="flex flex-wrap gap-3">
                    {['Агрессия', 'Апатия', 'Эйфория', 'Ностальгия'].map((state) => (
                      <Button
                        key={state}
                        type="button"
                        size="sm"
                        variant={newProduct.state.includes(state) ? 'default' : 'outline'}
                        onClick={() => handleStateToggle(state)}
                        className={
                          newProduct.state.includes(state)
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs'
                            : 'bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-mono text-xs'
                        }
                      >
                        {state}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  {editingProduct ? (
                    <>
                      <Button
                        size="lg"
                        onClick={handleUpdateProduct}
                        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                      >
                        ОБНОВИТЬ ТОВАР
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        onClick={() => {
                          setEditingProduct(null);
                          setNewProduct({
                            name: '',
                            diagnosis: '',
                            price: 0,
                            image: '',
                            description: '',
                            material: '',
                            care: '',
                            sizing: '',
                            state: [],
                            inStock: true,
                          });
                        }}
                        className="flex-1 bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground font-mono"
                      >
                        ОТМЕНА
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="lg"
                      onClick={handleAddProduct}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono"
                    >
                      ДОБАВИТЬ ТОВАР
                    </Button>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-border bg-card">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                СПИСОК ТОВАРОВ ({products.length})
              </h2>
              <div className="space-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="p-4 border-2 border-dashed border-border bg-tertiary"
                  >
                    <div className="flex gap-4">
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-20 h-20 object-cover border border-border"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-mono text-sm font-bold text-foreground mb-1">
                          {product.name}
                        </h3>
                        <p className="font-mono text-xs text-muted-foreground mb-2">
                          {product.diagnosis}
                        </p>
                        <p className="font-mono text-sm text-foreground">{product.price} ₽</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleEditProduct(product)}
                          className="bg-transparent text-foreground border-border hover:bg-accent hover:text-accent-foreground"
                        >
                          <Edit className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-transparent text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <Card className="p-6 border-2 border-border bg-card">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                БАЗА КЛИЕНТОВ
              </h2>
              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-border bg-tertiary">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">ИМЯ</p>
                      <p className="font-mono text-sm text-foreground">Иван Петров</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">EMAIL</p>
                      <p className="font-mono text-sm text-foreground">ivan@example.com</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">ЗАКАЗОВ</p>
                      <p className="font-mono text-sm text-foreground">3</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-2 border-dashed border-border bg-tertiary">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">ИМЯ</p>
                      <p className="font-mono text-sm text-foreground">Мария Сидорова</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">EMAIL</p>
                      <p className="font-mono text-sm text-foreground">maria@example.com</p>
                    </div>
                    <div>
                      <p className="font-mono text-xs text-muted-foreground mb-1">ЗАКАЗОВ</p>
                      <p className="font-mono text-sm text-foreground">1</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-2 border-border bg-card">
                <p className="font-mono text-xs text-muted-foreground mb-2">ВСЕГО ЗАКАЗОВ</p>
                <p className="font-mono text-3xl font-bold text-foreground">127</p>
              </Card>
              <Card className="p-6 border-2 border-border bg-card">
                <p className="font-mono text-xs text-muted-foreground mb-2">ВЫРУЧКА</p>
                <p className="font-mono text-3xl font-bold text-foreground">1,234,500 ₽</p>
              </Card>
              <Card className="p-6 border-2 border-border bg-card">
                <p className="font-mono text-xs text-muted-foreground mb-2">КЛИЕНТОВ</p>
                <p className="font-mono text-3xl font-bold text-foreground">89</p>
              </Card>
            </div>
            <Card className="p-6 border-2 border-border bg-card">
              <h2 className="font-mono text-xl font-bold mb-6 text-card-foreground">
                ПОПУЛЯРНЫЕ ТОВАРЫ
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border border-border bg-tertiary">
                  <span className="font-mono text-sm text-foreground">
                    ХУДИ "СУДЕБНАЯ ЭКСПЕРТИЗА"
                  </span>
                  <span className="font-mono text-sm text-primary">45 продаж</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border bg-tertiary">
                  <span className="font-mono text-sm text-foreground">КУРТКА "ГЛИТЧ"</span>
                  <span className="font-mono text-sm text-primary">38 продаж</span>
                </div>
                <div className="flex justify-between items-center p-3 border border-border bg-tertiary">
                  <span className="font-mono text-sm text-foreground">ФУТБОЛКА "РЕНТГЕН"</span>
                  <span className="font-mono text-sm text-primary">32 продажи</span>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
