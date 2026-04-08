import './ProductCard.css';

function ProductCard({ product, style }) {
  return (
    <div className="product-card" style={style}>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        {product.description && (
          <p className="product-description">{product.description}</p>
        )}
      </div>
      <span className="product-price">{Number(product.price).toFixed(2)}</span>
    </div>
  );
}

export default ProductCard;
