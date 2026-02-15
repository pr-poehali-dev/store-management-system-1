import { Link } from "react-router-dom";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import ProductCard from "@/components/ProductCard";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8b304bc3-243a-4cbe-816a-1dc07d3decdb/files/a298a9c4-3513-4a04-b2b5-8cf25b45a039.jpg";

const categories = [
  { name: "Электроника", icon: "Cpu", color: "from-violet-500 to-purple-600" },
  { name: "Аксессуары", icon: "Watch", color: "from-pink-500 to-rose-600" },
  { name: "Новинки", icon: "Sparkles", color: "from-amber-500 to-orange-600" },
];

const Index = () => {
  const { products } = useStore();
  const topProducts = products.filter((p) => p.inStock).slice(0, 4);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm mb-6 animate-fade-in">
              <Icon name="Zap" size={14} className="text-amber-400" />
              Новая коллекция 2026
            </div>
            <h1 className="font-heading font-black text-4xl md:text-6xl text-white mb-4 leading-tight animate-fade-in" style={{ animationDelay: "100ms" }}>
              Стиль без <br />
              <span className="gradient-text">границ</span>
            </h1>
            <p className="text-white/70 text-lg mb-8 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Премиальные товары с доставкой по всей России. Яркие тренды и проверенное качество.
            </p>
            <div className="flex gap-3 animate-fade-in" style={{ animationDelay: "300ms" }}>
              <Link to="/catalog">
                <Button size="lg" className="gradient-primary border-0 text-white rounded-xl font-heading font-semibold px-8 shadow-lg shadow-primary/25">
                  <Icon name="Grid3x3" size={18} className="mr-2" />
                  Каталог
                </Button>
              </Link>
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="rounded-xl font-heading font-semibold px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Новинки
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              to="/catalog"
              className="group relative overflow-hidden rounded-2xl p-6 hover-lift animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-90`} />
              <div className="relative flex items-center justify-between text-white">
                <div>
                  <h3 className="font-heading font-bold text-xl mb-1">{cat.name}</h3>
                  <p className="text-white/70 text-sm">Смотреть все →</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Icon name={cat.icon} size={28} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-heading font-bold text-2xl md:text-3xl">Хиты продаж</h2>
            <p className="text-muted-foreground mt-1">Самые популярные товары</p>
          </div>
          <Link to="/catalog">
            <Button variant="ghost" className="font-medium">
              Все товары <Icon name="ArrowRight" size={16} className="ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <div className="gradient-hero rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="font-heading font-bold text-2xl md:text-3xl mb-3">Присоединяйся к NOVA</h2>
          <p className="text-white/80 max-w-md mx-auto mb-6">Получай скидки до 50% и узнавай о новинках первым</p>
          <div className="flex justify-center gap-3">
            <Link to="/profile">
              <Button size="lg" className="bg-white text-foreground rounded-xl font-heading font-semibold hover:bg-white/90">
                <Icon name="User" size={18} className="mr-2" />
                Создать профиль
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
              <Icon name="Rocket" size={14} className="text-white" />
            </div>
            <span className="font-heading font-bold gradient-text">NOVA</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 NOVA Store. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
