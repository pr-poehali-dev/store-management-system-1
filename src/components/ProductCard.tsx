import { useStore, Product } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  index?: number;
}

const StarRating = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Icon
        key={star}
        name="Star"
        size={size}
        className={star <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-200"}
      />
    ))}
  </div>
);

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addToCart } = useStore();

  return (
    <div
      className="group bg-card rounded-2xl overflow-hidden border hover-lift animate-fade-in"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.oldPrice && (
          <Badge className="absolute top-3 left-3 gradient-accent border-0 text-white font-semibold">
            -{Math.round((1 - product.price / product.oldPrice) * 100)}%
          </Badge>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-heading font-bold text-lg">Нет в наличии</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading font-semibold text-sm mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-muted-foreground mb-3">
          {product.category}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <span className="font-heading font-bold text-lg">{product.price.toLocaleString("ru-RU")} ₽</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through ml-2">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>
          <Button
            size="sm"
            disabled={!product.inStock}
            onClick={(e) => { e.preventDefault(); addToCart(product); }}
            className="gradient-primary border-0 text-white rounded-xl h-9 w-9 p-0"
          >
            <Icon name="Plus" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export { StarRating };
export default ProductCard;
