import { useState } from "react";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

const Admin = () => {
  const { products, deleteProduct, addProduct, isAdmin } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    image: "",
    category: "",
    description: "",
    inStock: true,
  });

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Icon name="ShieldOff" size={40} className="text-muted-foreground" />
        </div>
        <h2 className="font-heading font-bold text-2xl mb-2">Доступ закрыт</h2>
        <p className="text-muted-foreground mb-6">Включите режим администратора в профиле</p>
        <Link to="/profile">
          <Button className="gradient-primary border-0 text-white rounded-xl font-heading font-semibold px-8">
            Перейти в профиль
          </Button>
        </Link>
      </div>
    );
  }

  const handleAdd = () => {
    if (!form.name || !form.price || !form.category) return;
    addProduct({
      name: form.name,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      image: form.image || "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/266329ea-698f-44d2-af84-1e10def144aa.jpg",
      category: form.category,
      description: form.description,
      inStock: form.inStock,
    });
    setForm({ name: "", price: "", oldPrice: "", image: "", category: "", description: "", inStock: true });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading font-bold text-3xl">Админ-панель</h1>
          <p className="text-muted-foreground mt-1">{products.length} товаров</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="gradient-primary border-0 text-white rounded-xl font-heading font-semibold"
        >
          <Icon name={showForm ? "X" : "Plus"} size={18} className="mr-2" />
          {showForm ? "Отмена" : "Добавить товар"}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border rounded-2xl p-6 mb-8 animate-fade-in">
          <h3 className="font-heading font-semibold text-lg mb-4">Новый товар</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Название *</label>
              <Input
                placeholder="Название товара"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Категория *</label>
              <Input
                placeholder="Электроника, Аксессуары..."
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Цена *</label>
              <Input
                type="number"
                placeholder="9990"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Старая цена</label>
              <Input
                type="number"
                placeholder="12990"
                value={form.oldPrice}
                onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Ссылка на фото</label>
              <Input
                placeholder="https://..."
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="flex items-center gap-3 self-end pb-2">
              <Switch
                checked={form.inStock}
                onCheckedChange={(v) => setForm({ ...form, inStock: v })}
              />
              <span className="text-sm">В наличии</span>
            </div>
            <div className="md:col-span-2">
              <label className="text-sm text-muted-foreground mb-1.5 block">Описание</label>
              <Textarea
                placeholder="Описание товара..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="rounded-xl"
                rows={3}
              />
            </div>
          </div>
          <Button onClick={handleAdd} className="mt-4 gradient-primary border-0 text-white rounded-xl font-heading font-semibold">
            <Icon name="Plus" size={18} className="mr-2" />
            Добавить
          </Button>
        </div>
      )}

      <div className="space-y-3">
        {products.map((product, i) => (
          <div
            key={product.id}
            className="flex items-center gap-4 bg-card border rounded-2xl p-4 animate-fade-in"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading font-semibold text-sm truncate">{product.name}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-sm font-bold">{product.price.toLocaleString("ru-RU")} ₽</span>
                <span className="text-xs text-muted-foreground">{product.category}</span>
                <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Link to={`/product/${product.id}`}>
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Icon name="Eye" size={14} />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl text-destructive hover:bg-destructive hover:text-white"
                onClick={() => deleteProduct(product.id)}
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
