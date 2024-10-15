import React from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import LazyLoad from "react-lazyload";

const ProductList = ({ addToWishlist, wishlist, removeFromWishlist, searchTerm }) => {
  // Filter products based on search term
  const filteredItems = productItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="list-view">
      {filteredItems.length > 0 ? (
        filteredItems.map((item, idx) => (
          <LazyLoad key={idx}>
            <ModelViewer
              item={item}
              addToWishlist={addToWishlist}
              wishlist={wishlist}
              removeFromWishlist={removeFromWishlist}
            />
          </LazyLoad>
        ))
      ) : (
        <p>No products found</p>
      )}
    </section>
  );
};

export default ProductList;
