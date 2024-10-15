import React from "react";
import productItems from "../../data/ProductItems";
import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProductList.css";
import LazyLoad from "react-lazyload";
import Image1 from '../../assets/images/img-1.jpg';
import Image2 from '../../assets/images/img-2.jpg';
import Image3 from '../../assets/images/img-3.jpg';
import Image4 from '../../assets/images/img-4.jpg';
import Image5 from '../../assets/images/img-5.jpg';
import Image6 from '../../assets/images/img-6.jpg';
import Image7 from '../../assets/images/img-7.jpg';
import Image8 from '../../assets/images/img-8.jpg';
import Image9 from '../../assets/images/img-9.jpg';
import Image10 from '../../assets/images/img-10.jpg';
import Image11 from '../../assets/images/img-11.jpg';
import Image12 from '../../assets/images/img-12.jpg';
import motor from '../../assets/images/motor.jpg';
import ss from '../../assets/images/ss.png';
import liver from '../../assets/images/liver.png';
import lungs from '../../assets/images/lungs.png';

const ProductList = ({ addToWishlist, wishlist, removeFromWishlist, searchTerm }) => {
  // Filter products based on search term
  const filteredItems = productItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7,motor,ss,liver,lungs];
  const images2 = [Image8, Image9, Image10, Image11, Image12];

  return (
    <>
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
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '2rem 0',
      }} >
        <h2 style={{
          textAlign: 'center',
          padding: '2rem',
          borderBottom: '2px dotted #ccc',
          borderTop: '2px dotted #ccc',
        }}>Image Visualization...</h2>
        {images.map((image, idx) => (
          <img key={idx} src={image} alt="product" style={{ width: "300px", margin: "1rem", objectFit: 'contain' }} />
        ))}
      </section>
      <section style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        margin: '2rem 0',
      }} >
        <h2 style={{
          textAlign: 'center',
          padding: '2rem',
          borderBottom: '2px dotted #ccc',
          borderTop: '2px dotted #ccc',
        }}>Audio Visualization...</h2>
        {images2.map((image, idx) => (
          <img key={idx} src={image} alt="product" style={{ width: "300px", margin: "1rem", objectFit: 'contain' }} />
        ))}
      </section>
    </>
  );
};

export default ProductList;
