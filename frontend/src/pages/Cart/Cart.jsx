import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { X, Heart, Apple, ChevronLeft, RefreshCw, Lock } from "lucide-react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 12.00 : 0;
  const tax = subtotal * 0.08;
  const discount = subtotal > 0 ? 34.70 : 0;
  
  const total = subtotal > 0 ? (subtotal + shipping + tax - discount) : 0;
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#f5f5f0] pt-12 pb-24 font-sans text-[#333]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        
        {/* Breadcrumbs */}
        <div className="mb-8 text-xs text-gray-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <span>Shopping Cart</span>
        </div>

        {/* Title */}
        <div className="mb-12 flex items-baseline gap-4">
          <h1 className="font-serif text-[42px] font-light text-[#1a1a1a]">Your Cart</h1>
          <span className="text-sm font-medium text-gray-500">{totalItems} items</span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-[#f0eee4] p-16 text-center shadow-sm">
            <p className="font-serif text-[32px] font-light text-[#1a1a1a] mb-8">Your cart is currently empty.</p>
            <Link
              to="/products"
              className="inline-flex bg-[#8a755d] px-8 py-4 text-sm font-semibold uppercase tracking-[2px] text-white transition hover:bg-[#725e47]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row lg:gap-16">
            
            {/* Left Column: Cart Items */}
            <div className="flex-1">
              
              {/* Header */}
              <div className="hidden grid-cols-12 border-b border-gray-300 pb-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 sm:grid">
                <div className="col-span-7">PRODUCT</div>
                <div className="col-span-3 text-center">QUANTITY</div>
                <div className="col-span-2 text-right">PRICE</div>
              </div>

              {/* Items */}
              <div className="flex flex-col">
                {cart.map((item) => (
                  <div key={item.id} className="grid grid-cols-1 items-start border-b border-gray-200 py-8 sm:grid-cols-12">
                    
                    {/* Product Info */}
                    <div className="col-span-7 flex gap-6">
                      <div className="h-28 w-28 shrink-0 overflow-hidden bg-[#e5e0d8]">
                        <Link to={`/product/${item.id}`}>
                          <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover mix-blend-multiply" />
                        </Link>
                      </div>
                      
                      <div className="flex flex-col justify-center">
                        <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                          SKIN CARE
                        </span>
                        <Link to={`/product/${item.id}`} className="text-base font-medium text-[#1a1a1a] hover:underline">
                          {item.title}
                        </Link>
                        <span className="mt-1 text-xs text-gray-500">200ml &middot; Standard</span>
                        
                        <button className="mt-4 flex items-center text-xs text-gray-400 hover:text-black transition w-fit">
                          <Heart size={14} className="mr-1.5" /> Save for later
                        </button>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="col-span-3 flex justify-center mt-6 sm:mt-0">
                      <div className="flex h-9 w-24 items-center justify-between border border-gray-300 bg-white">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="flex h-full w-8 items-center justify-center text-gray-400 transition hover:text-black"
                        >
                          &minus;
                        </button>
                        <span className="text-sm font-semibold text-[#1a1a1a]">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="flex h-full w-8 items-center justify-center text-gray-400 transition hover:text-black"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Price & Remove */}
                    <div className="col-span-2 flex justify-end gap-6 mt-6 sm:mt-0">
                      <span className="text-base font-bold text-[#1a1a1a]">
                        ${(item.price).toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="mt-1 text-gray-300 hover:text-black transition"
                        title="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Actions Footer */}
              <div className="mt-8 flex items-center justify-between">
                <Link to="/products" className="flex items-center border border-gray-300 bg-transparent px-5 py-2.5 text-xs font-semibold text-[#1a1a1a] transition hover:bg-gray-100">
                  <ChevronLeft size={14} className="mr-1.5" /> Continue Shopping
                </Link>
                <button className="flex items-center border border-gray-300 bg-transparent px-5 py-2.5 text-xs font-semibold text-[#1a1a1a] transition hover:bg-gray-100">
                  <RefreshCw size={14} className="mr-1.5" /> Update Cart
                </button>
              </div>

            </div>

            {/* Right Column: Order Summary */}
            <div className="mt-16 w-full lg:mt-0 lg:w-[380px] shrink-0">
              
              {/* Free Shipping Banner */}
              <div className="mb-6 border border-gray-200 bg-[#fcfbf9] p-5 shadow-sm">
                <p className="mb-3 text-xs font-medium text-[#1a1a1a]">
                  Add <span className="font-bold">$38.00</span> more for free shipping!
                </p>
                <div className="h-1.5 w-full bg-gray-200">
                  <div className="h-full bg-[#8a755d]" style={{ width: '70%' }}></div>
                </div>
              </div>

              {/* Summary Box */}
              <div className="border border-[#e5e0d8] bg-[#f0eee4] p-8 shadow-sm">
                <h2 className="mb-8 text-lg font-bold text-[#1a1a1a]">Order Summary</h2>
                
                <div className="space-y-4 border-b border-gray-300 pb-6 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-[#1a1a1a]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#1a1a1a]">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span className="font-semibold text-[#1a1a1a]">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount (WELCOME10)</span>
                    <span className="font-semibold text-[#1a1a1a]">&minus;${discount.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="my-6 flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Promo code" 
                    className="w-full border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#8a755d]"
                  />
                  <button className="border border-gray-300 bg-[#e8e5dc] px-5 py-2.5 text-sm font-semibold text-[#1a1a1a] transition hover:bg-[#dfdcd1]">
                    Apply
                  </button>
                </div>

                {/* Total */}
                <div className="mb-8 flex items-end justify-between">
                  <span className="text-base font-bold text-[#1a1a1a]">Total</span>
                  <span className="text-2xl font-bold text-[#1a1a1a]">${total.toFixed(2)}</span>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3">
                  <Link to="/checkout" className="flex w-full items-center justify-center bg-[#8a755d] py-4 text-sm font-bold uppercase tracking-[2px] text-white transition hover:bg-[#725e47] shadow-md">
                    Proceed to Checkout
                  </Link>
                  <button className="flex w-full items-center justify-center bg-black py-4 text-sm font-bold uppercase tracking-[2px] text-white transition hover:bg-gray-800 shadow-md">
                    <Apple size={18} className="mr-1.5 pb-0.5" /> Pay with Apple Pay
                  </button>
                </div>
                
                {/* Trust Badges */}
                <div className="mt-8 flex flex-col items-center">
                  <p className="flex items-center text-[10px] text-gray-500">
                    <Lock size={10} className="mr-1" /> Secure 256-bit SSL encryption
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="rounded bg-white px-2.5 py-1 text-[9px] font-bold border border-gray-200 text-gray-700">VISA</span>
                    <span className="rounded bg-white px-2.5 py-1 text-[9px] font-bold border border-gray-200 text-gray-700">MC</span>
                    <span className="rounded bg-white px-2.5 py-1 text-[9px] font-bold border border-gray-200 text-gray-700">AMEX</span>
                    <span className="rounded bg-white px-2.5 py-1 text-[9px] font-bold border border-gray-200 text-gray-700">PayPal</span>
                  </div>
                </div>

              </div>
            </div>
            
          </div>
        )}
      </div>
    </div>
  );
}
