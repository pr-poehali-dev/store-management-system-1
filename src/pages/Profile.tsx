import { useState } from "react";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Icon from "@/components/ui/icon";

const Profile = () => {
  const { isAdmin, setIsAdmin, orders, cart } = useStore();
  const [name, setName] = useState(() => localStorage.getItem("profile_name") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("profile_email") || "");
  const [phone, setPhone] = useState(() => localStorage.getItem("profile_phone") || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    localStorage.setItem("profile_name", name);
    localStorage.setItem("profile_email", email);
    localStorage.setItem("profile_phone", phone);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const stats = [
    { icon: "Package", label: "Заказов", value: orders.length, color: "from-violet-500 to-purple-600" },
    { icon: "ShoppingCart", label: "В корзине", value: cart.length, color: "from-pink-500 to-rose-600" },
    { icon: "Star", label: "Бонусы", value: orders.length * 150, color: "from-amber-500 to-orange-600" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading font-bold text-3xl mb-8">Профиль</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-2xl p-5 text-white animate-slide-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color}`} />
            <div className="relative flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Icon name={stat.icon} size={24} />
              </div>
              <div>
                <p className="text-white/70 text-sm">{stat.label}</p>
                <p className="font-heading font-bold text-2xl">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-card border rounded-2xl p-6 animate-fade-in">
          <h2 className="font-heading font-semibold text-lg mb-6 flex items-center gap-2">
            <Icon name="User" size={20} className="text-primary" />
            Личные данные
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Имя</label>
              <Input
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email</label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Телефон</label>
              <Input
                placeholder="+7 (999) 999-99-99"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-xl"
              />
            </div>

            <Button
              onClick={handleSave}
              className="w-full gradient-primary border-0 text-white rounded-xl font-heading font-semibold"
            >
              {saved ? (
                <>
                  <Icon name="Check" size={18} className="mr-2" />
                  Сохранено!
                </>
              ) : (
                "Сохранить"
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
              <Icon name="Settings" size={20} className="text-primary" />
              Настройки
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <Icon name="Shield" size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <span className="font-medium text-sm">Режим администратора</span>
                    <p className="text-xs text-muted-foreground">Управление товарами</p>
                  </div>
                </div>
                <Switch checked={isAdmin} onCheckedChange={setIsAdmin} />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h2 className="font-heading font-semibold text-lg mb-4 flex items-center gap-2">
              <Icon name="Truck" size={20} className="text-primary" />
              Доставка
            </h2>
            <div className="space-y-3">
              {[
                { icon: "MapPin", text: "Адрес доставки не указан" },
                { icon: "CreditCard", text: "Способ оплаты не добавлен" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                  <Icon name={item.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
