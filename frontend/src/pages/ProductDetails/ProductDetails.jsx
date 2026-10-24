import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getProductById } from "../../services/productService";
import { useCart } from "../../context/CartContext";

import RelatedProducts from "../../components/product/RelatedProducts";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4 bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-[#8a755d]"></div>
        <p className="text-xs uppercase tracking-[3px] text-gray-500">Loading</p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Image */}

          <div>
            <div className="overflow-hidden bg-[#f7f3ed] p-12">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-[500px] object-cover"
              />
            </div>
          </div>

          {/* Content */}

          <div>

            <p className="mb-2 text-sm uppercase tracking-[3px] text-gray-500">
              {product.category}
            </p>

            <h1 className="mb-6 text-5xl font-light">
              {product.title}
            </h1>

            <div className="mb-4 flex items-center gap-4">
              <span className="text-2xl font-medium">
                ${product.price}
              </span>

              <span className="text-sm text-gray-500">
                ⭐ {product.rating} ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            <p className="mb-8 leading-8 text-gray-600">
              {product.description}
            </p>

            <div className="mb-8">
              <p className="text-sm text-gray-500">
                Stock Available: {product.stock}
              </p>
            </div>

            {/* Quantity */}

            <div className="mb-8 flex items-center gap-4">

              <button
                onClick={() =>
                  setQuantity(
                    Math.max(1, quantity - 1)
                  )
                }
                className="border px-4 py-2"
              >
                -
              </button>

              <span className="text-lg">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity(quantity + 1)
                }
                className="border px-4 py-2"
              >
                +
              </button>

            </div>

            {/* Buttons */}

            <div className="flex gap-4">

              <button
                onClick={handleAddToCart}
                className="bg-black px-8 py-4 text-white"
              >
                Add To Cart
              </button>

              <button 
                onClick={handleBuyNow}
                className="border border-black px-8 py-4"
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>

      </div>
      </section>

      <RelatedProducts currentProductId={id} />
    </>
  );
}

export default ProductDetails;