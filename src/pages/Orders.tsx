import { useStore } from "@/lib/store-context";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const statusConfig: Record<string, { label: string; color: string; icon: string }> = {
  pending: { label: "Ожидает", color: "bg-amber-100 text-amber-700", icon: "Clock" },
  processing: { label: "В обработке", color: "bg-blue-100 text-blue-700", icon: "Loader" },
  shipped: { label: "Отправлен", color: "bg-purple-100 text-purple-700", icon: "Truck" },
  delivered: { label: "Доставлен", color: "bg-green-100 text-green-700", icon: "CheckCircle" },
};

const Orders = () => {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
          <Icon name="Package" size={40} className="text-muted-foreground" />
        </div>
        <h2 className="font-heading font-bold text-2xl mb-2">Нет заказов</h2>
        <p className="text-muted-foreground mb-6">Ваши заказы появятся здесь после оформления</p>
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
      <h1 className="font-heading font-bold text-3xl mb-8">Мои заказы</h1>

      <div className="space-y-4">
        {orders.map((order, i) => {
          const status = statusConfig[order.status];
          return (
            <div
              key={order.id}
              className="bg-card border rounded-2xl p-6 animate-fade-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                    <Icon name="Package" size={18} className="text-white" />
                  </div>
                  <div>
                    <span className="font-heading font-semibold">Заказ #{order.id.slice(-6)}</span>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
                <Badge className={`${status.color} border-0 font-medium`}>
                  <Icon name={status.icon} size={12} className="mr-1" />
                  {status.label}
                </Badge>
              </div>

              <div className="flex gap-2 mb-4 overflow-x-auto">
                {order.items.map((item) => (
                  <img
                    key={item.product.id}
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between border-t pt-3">
                <span className="text-sm text-muted-foreground">{order.items.length} товаров</span>
                <span className="font-heading font-bold">{order.total.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
