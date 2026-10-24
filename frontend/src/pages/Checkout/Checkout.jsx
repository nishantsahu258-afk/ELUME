import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, Lock, ShieldCheck, CreditCard } from "lucide-react";
import { useState } from "react";

export default function Checkout() {
  const { cart, setCart } = useCart();
  const { addOrder } = useOrder();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  });

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 12.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal > 0 ? (subtotal + shipping + tax) : 0;
  
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: `EL-${orderNumber}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: "Processing",
      total: `$${total.toFixed(2)}`,
      items: cart
    };
    addOrder(newOrder);
    setCart([]);
    navigate("/order-success", { state: { orderNumber } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center font-sans text-[#333]">
        <h2 className="text-2xl font-serif mb-4 text-[#1a1a1a]">Your checkout is empty</h2>
        <Link to="/products" className="rounded-md bg-[#8a755d] px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-[#725e47]">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] pt-8 pb-24 font-sans text-[#333]">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12 flex flex-col lg:flex-row lg:gap-16">
        
        {/* Left Column: Forms */}
        <div className="flex-1">
          <Link to="/cart" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition mb-8">
            <ChevronLeft size={16} className="mr-1" /> Back to Cart
          </Link>
          
          <h1 className="font-serif text-[32px] font-light text-[#1a1a1a] mb-8">Secure Checkout</h1>

          <form onSubmit={handleCheckout}>
            {/* Contact Information */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Contact Information</h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email address" 
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#8a755d] focus:ring-1 focus:ring-[#8a755d]"
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name" 
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#8a755d] focus:ring-1 focus:ring-[#8a755d]"
                  required
                />
                <input 
                  type="text" 
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name" 
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#8a755d] focus:ring-1 focus:ring-[#8a755d]"
                  required
                />
                <input 
                  type="text" 
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Address" 
                  className="col-span-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#8a755d] focus:ring-1 focus:ring-[#8a755d]"
                  required
                />
                <input 
                  type="text" 
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City" 
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#8a755d] focus:ring-1 focus:ring-[#8a755d]"
                  required
                />
                <input 
                  type="text" 
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal code" 
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#8a755d] focus:ring-1 focus:ring-[#8a755d]"
                  required
                />
              </div>
            </div>

            {/* Payment */}
            <div className="mb-10">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4">Payment Details</h2>
              <div className="rounded-xl border border-gray-300 bg-white p-4 space-y-4 shadow-sm">
                <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
                  <CreditCard size={20} className="text-gray-400" />
                  <span className="text-sm font-medium">Credit or Debit Card</span>
                </div>
                <input 
                  type="text" 
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  placeholder="Card number" 
                  className="w-full rounded-lg border border-gray-300 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-[#8a755d] focus:bg-white"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    name="expiry"
                    value={form.expiry}
                    onChange={handleChange}
                    placeholder="MM / YY" 
                    className="w-full rounded-lg border border-gray-300 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-[#8a755d] focus:bg-white"
                    required
                  />
                  <input 
                    type="text" 
                    name="cvc"
                    value={form.cvc}
                    onChange={handleChange}
                    placeholder="CVC" 
                    className="w-full rounded-lg border border-gray-300 bg-[#fafafa] px-4 py-3 text-sm outline-none transition focus:border-[#8a755d] focus:bg-white"
                    required
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="flex w-full items-center justify-center bg-[#1a1a1a] py-4 text-sm font-bold uppercase tracking-[2px] text-white transition hover:bg-[#333] shadow-lg shadow-black/10">
              Pay ${total.toFixed(2)}
            </button>
            <p className="mt-4 flex items-center justify-center text-xs text-gray-500">
              <Lock size={12} className="mr-1.5" /> All transactions are secure and encrypted.
            </p>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="mt-12 w-full lg:mt-0 lg:w-[440px] shrink-0">
          <div className="sticky top-28 rounded-2xl border border-[#e5e0d8] bg-[#f0eee4] p-8 shadow-sm">
            <h2 className="mb-6 text-lg font-bold text-[#1a1a1a]">Order Summary</h2>
            
            {/* Products List */}
            <div className="mb-6 max-h-[320px] overflow-y-auto pr-2 space-y-5 custom-scrollbar">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#e5e0d8] border border-black/5">
                      <img src={item.thumbnail} alt={item.title} className="h-full w-full object-cover mix-blend-multiply" />
                      <div className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] text-white">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-[#1a1a1a] line-clamp-1">{item.title}</span>
                      <span className="text-xs text-gray-500 mt-0.5">Standard</span>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#1a1a1a]">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-gray-300 pt-6 text-sm text-gray-600">
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
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-gray-300 pt-6">
              <span className="text-base font-bold text-[#1a1a1a]">Total</span>
              <span className="text-2xl font-bold text-[#1a1a1a]">${total.toFixed(2)}</span>
            </div>

            <div className="mt-8 flex items-start gap-3 rounded-xl bg-white/50 p-4 border border-[#e5e0d8]">
              <ShieldCheck size={20} className="text-[#8a755d] shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                <strong className="text-[#1a1a1a] font-semibold block mb-1">Eleum Buyer Protection</strong>
                Get full refund if the item is not as described or if is not delivered.
              </p>
            </div>
            
          </div>
        </div>
        
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4d0c5;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b5b1a5;
        }
      `}} />
    </div>
  );
}
