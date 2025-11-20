import React from "react";
import { Link } from "react-router-dom";
import "../styles/productcard.css";

export default function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card" role="article" aria-label={product.name}>
      <div className="media">
        <img src={product.image} alt={product.name} onError={(e)=> e.target.src="/assets/images/placeholder.jpg"} />
      </div>

      <div className="body">
        <div>
          <div className="name">{product.name}</div>
          <div className="cat">{product.category}</div>
        </div>

        <div>
          <p className="desc">{product.description ?? `Category: ${product.category}`}</p>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:".6rem",marginTop:".6rem"}}>
            <div className="price">₹{product.price.toFixed ? product.price.toFixed(2) : product.price}</div>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn" onClick={() => onAdd(product)}>Add</button>
        <Link to={`/product/${product.id}`} className="btn outline" aria-label={`View ${product.name}`}>View</Link>
      </div>
    </article>
  );
}
