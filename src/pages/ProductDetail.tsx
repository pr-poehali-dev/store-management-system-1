import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useStore } from "@/lib/store-context";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { StarRating } from "@/components/ProductCard";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, reviews, addToCart, addReview } = useStore();
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const product = products.find((p) => p.id === id);
  const productReviews = reviews.filter((r) => r.productId === id);
  const related = products.filter((p) => p.id !== id && p.category === product?.category).slice(0, 4);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Icon name="PackageX" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h2 className="font-heading font-bold text-xl mb-2">Товар не найден</h2>
        <Link to="/catalog">
          <Button className="gradient-primary border-0 text-white rounded-xl mt-4">
            Вернуться в каталог
          </Button>
        </Link>
      </div>
    );
  }

  const handleSubmitReview = () => {
    if (!reviewName.trim() || !reviewText.trim()) return;
    addReview({ productId: product.id, author: reviewName, rating: reviewRating, text: reviewText });
    setReviewName("");
    setReviewText("");
    setReviewRating(5);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Главная</Link>
        <Icon name="ChevronRight" size={14} />
        <Link to="/catalog" className="hover:text-foreground transition-colors">Каталог</Link>
        <Icon name="ChevronRight" size={14} />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="rounded-2xl overflow-hidden border animate-fade-in">
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
          <span className="text-sm text-primary font-medium">{product.category}</span>
          <h1 className="font-heading font-bold text-3xl mt-2 mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <StarRating rating={product.rating} size={18} />
            <span className="text-sm text-muted-foreground">{product.rating} ({product.reviewCount} отзывов)</span>
          </div>

          <p className="text-muted-foreground mb-6 leading-relaxed">{product.description}</p>

          <div className="flex items-end gap-3 mb-6">
            <span className="font-heading font-black text-4xl">{product.price.toLocaleString("ru-RU")} ₽</span>
            {product.oldPrice && (
              <span className="text-lg text-muted-foreground line-through mb-1">
                {product.oldPrice.toLocaleString("ru-RU")} ₽
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mb-6">
            <div className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-sm">{product.inStock ? "В наличии" : "Нет в наличии"}</span>
          </div>

          <div className="flex gap-3">
            <Button
              size="lg"
              disabled={!product.inStock}
              onClick={() => addToCart(product)}
              className="gradient-primary border-0 text-white rounded-xl font-heading font-semibold flex-1 shadow-lg shadow-primary/25"
            >
              <Icon name="ShoppingCart" size={18} className="mr-2" />
              В корзину
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { icon: "Truck", label: "Бесплатная доставка" },
              { icon: "RotateCcw", label: "Возврат 30 дней" },
              { icon: "Shield", label: "Гарантия качества" },
            ].map((item) => (
              <div key={item.label} className="text-center p-3 rounded-xl bg-muted">
                <Icon name={item.icon} size={20} className="mx-auto mb-1 text-primary" />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="font-heading font-bold text-2xl mb-6">Отзывы ({productReviews.length})</h2>

        <div className="bg-muted rounded-2xl p-6 mb-6">
          <h3 className="font-heading font-semibold mb-4">Оставить отзыв</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input
              placeholder="Ваше имя"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              className="rounded-xl"
            />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Оценка:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setReviewRating(star)} className="transition-transform hover:scale-125">
                  <Icon
                    name="Star"
                    size={22}
                    className={star <= reviewRating ? "text-amber-400 fill-amber-400" : "text-gray-300"}
                  />
                </button>
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Расскажите о вашем опыте..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="rounded-xl mb-4"
            rows={3}
          />
          <Button onClick={handleSubmitReview} className="gradient-primary border-0 text-white rounded-xl">
            Отправить отзыв
          </Button>
        </div>

        {productReviews.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">Пока нет отзывов. Будьте первым!</p>
        ) : (
          <div className="space-y-4">
            {productReviews.map((review) => (
              <div key={review.id} className="bg-card border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                      {review.author[0]}
                    </div>
                    <div>
                      <span className="font-medium text-sm">{review.author}</span>
                      <div className="flex items-center gap-1">
                        <StarRating rating={review.rating} size={12} />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="font-heading font-bold text-2xl mb-6">Похожие товары</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
