import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, cartTotal, placeOrder } = useStore();
  const navigate = useNavigate();

  const handleOrder = () => {
    placeOrder();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Icon name="ShoppingCart" size={40} className="text-muted-foreground" />
        </div>
        <h2 className="font-heading font-bold text-2xl mb-2">Корзина пуста</h2>
        <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
        <Link to="/catalog">
          <Button className="gradient-primary border-0 text-white rounded-xl font-heading font-semibold px-8">
            Перейти в каталог
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-heading font-bold text-3xl mb-8">Корзина</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, i) => (
            <div
              key={item.product.id}
              className="flex gap-4 bg-card border rounded-2xl p-4 animate-fade-in"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Link to={`/product/${item.product.id}`} className="shrink-0">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${item.product.id}`}>
                  <h3 className="font-heading font-semibold text-sm mb-1 truncate hover:text-primary transition-colors">
                    {item.product.name}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mb-3">{item.product.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <Icon name="Minus" size={14} />
                    </button>
                    <span className="font-medium w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <Icon name="Plus" size={14} />
                    </button>
                  </div>
                  <span className="font-heading font-bold">
                    {(item.product.price * item.quantity).toLocaleString("ru-RU")} ₽
                  </span>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="text-muted-foreground hover:text-destructive transition-colors self-start"
              >
                <Icon name="X" size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 bg-card border rounded-2xl p-6">
            <h3 className="font-heading font-bold text-lg mb-4">Итого</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары ({cart.length})</span>
                <span>{cartTotal.toLocaleString("ru-RU")} ₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span className="text-green-600 font-medium">Бесплатно</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-heading font-bold text-lg">К оплате</span>
                <span className="font-heading font-bold text-lg">{cartTotal.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>
            <Button
              onClick={handleOrder}
              className="w-full gradient-primary border-0 text-white rounded-xl font-heading font-semibold h-12 shadow-lg shadow-primary/25"
            >
              <Icon name="CreditCard" size={18} className="mr-2" />
              Оформить заказ
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Безопасная оплата • Гарантия возврата
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
