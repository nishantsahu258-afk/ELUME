import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useOrder } from "../../context/OrderContext";
import { Link, useNavigate } from "react-router-dom";
import { User, MapPin, CreditCard, Package, LogOut, ChevronRight, Heart, ShoppingBag, X } from "lucide-react";

function Profile() {
  const { user, logout, updateUser } = useAuth();
  const { orders } = useOrder();
  const navigate = useNavigate();

  // Modal States
  const [activeModal, setActiveModal] = useState(null); // 'editProfile', 'password', 'addresses', 'payment'
  const [modalData, setModalData] = useState({});

  // Local Storage States
  const [addresses, setAddresses] = useState(() => JSON.parse(localStorage.getItem(`addresses_${user?.email}`)) || []);
  const [paymentMethods, setPaymentMethods] = useState(() => JSON.parse(localStorage.getItem(`payment_${user?.email}`)) || []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`addresses_${user.email}`, JSON.stringify(addresses));
    }
  }, [addresses, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`payment_${user.email}`, JSON.stringify(paymentMethods));
    }
  }, [paymentMethods, user]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };



  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const res = updateUser({ name: modalData.name, email: modalData.email });
    if (res.success) {
      setActiveModal(null);
    } else {
      alert(res.message);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (modalData.newPassword !== modalData.confirmPassword) {
      return alert("Passwords do not match");
    }
    // Very basic check, in real app need proper hash check
    if (user.password !== modalData.currentPassword) {
      return alert("Incorrect current password");
    }
    const res = updateUser({ password: modalData.newPassword });
    if (res.success) {
      setActiveModal(null);
      alert("Password changed successfully");
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    setAddresses([...addresses, { id: Date.now(), ...modalData }]);
    setActiveModal(null);
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    setPaymentMethods([...paymentMethods, { id: Date.now(), ...modalData }]);
    setActiveModal(null);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f5f5f0] pt-12 pb-24 font-sans text-[#333]">
      <div className="mx-auto max-w-6xl px-6 lg:px-12">
        
        {/* Breadcrumbs */}
        <div className="mb-8 text-xs text-gray-500">
          <Link to="/" className="hover:text-black">Home</Link>
          <span className="mx-2">&rsaquo;</span>
          <span>My Account</span>
        </div>

        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <h1 className="font-serif text-[42px] font-light text-[#1a1a1a]">Welcome, {user?.name || "Guest"}</h1>
            <p className="mt-2 text-sm text-gray-500">Manage your account details and orders here.</p>
          </div>
          <button onClick={handleLogout} 
            className="flex w-fit items-center gap-2 border border-gray-300 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[2px] text-[#1a1a1a] transition hover:bg-gray-100"
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Left Column */}
          <div className="md:col-span-1 space-y-8">
            
            {/* Account Details Box */}
            <div className="rounded-2xl border border-[#e5e0d8] bg-[#f0eee4] p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#8a755d] text-white shadow-sm">
                <User size={24} />
              </div>
              <h2 className="mb-6 text-lg font-bold text-[#1a1a1a]">Account Details</h2>
              <div className="space-y-1 text-sm text-gray-600 mb-8">
                <p className="font-semibold text-[#1a1a1a] text-base">{user?.name || "Jane Doe"}</p>
                <p>{user?.email || "jane@example.com"}</p>
              </div>
              <div className="flex flex-col gap-4 text-sm border-t border-gray-300 pt-6">
                <button 
                  onClick={() => {
                    setModalData({ name: user?.name, email: user?.email });
                    setActiveModal("editProfile");
                  }}
                  className="text-left font-semibold text-[#8a755d] transition hover:text-[#6a5843]">Edit Profile</button>
                <button 
                  onClick={() => {
                    setModalData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                    setActiveModal("password");
                  }}
                  className="text-left font-semibold text-[#8a755d] transition hover:text-[#6a5843]">Change Password</button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-6 text-xs font-bold text-gray-500 uppercase tracking-widest">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/wishlist" className="flex items-center justify-between rounded-lg p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black">
                    <span className="flex items-center gap-3"><Heart size={18} className="text-gray-400" /> My Wishlist</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="flex items-center justify-between rounded-lg p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black">
                    <span className="flex items-center gap-3"><ShoppingBag size={18} className="text-gray-400" /> Shopping Cart</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal("addresses")}
                    className="flex w-full items-center justify-between rounded-lg p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black">
                    <span className="flex items-center gap-3"><MapPin size={18} className="text-gray-400" /> Addresses ({addresses.length})</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setActiveModal("payment")}
                    className="flex w-full items-center justify-between rounded-lg p-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-black">
                    <span className="flex items-center gap-3"><CreditCard size={18} className="text-gray-400" /> Payment Methods ({paymentMethods.length})</span>
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Order History */}
          <div className="md:col-span-2">
            <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
              <div className="mb-8 flex items-center gap-3 border-b border-gray-200 pb-6">
                <Package size={24} className="text-[#8a755d]" />
                <h2 className="text-xl font-bold text-[#1a1a1a]">Order History</h2>
              </div>

              {orders.length > 0 ? (
                <div className="space-y-6">
                  {orders.map(order => (
                    <div key={order.id} className="flex flex-col justify-between border border-gray-100 bg-gray-50 p-6 sm:flex-row sm:items-center">
                      <div>
                        <p className="font-bold text-[#1a1a1a]">Order {order.id}</p>
                        <p className="mt-1 text-sm text-gray-500">Placed on {order.date}</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between sm:mt-0 sm:flex-col sm:items-end">
                        <p className="text-base font-bold text-[#1a1a1a]">{order.total}</p>
                        <span className="mt-2 bg-[#f0eee4] px-3 py-1 text-xs font-semibold text-[#8a755d]">
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button className="mt-4 w-full border border-gray-300 py-3.5 text-sm font-bold uppercase tracking-[2px] text-[#1a1a1a] transition hover:bg-gray-50 hover:border-black">
                    View All Orders
                  </button>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <Package size={48} className="mb-4 text-gray-300" />
                  <p className="text-lg font-medium text-gray-600">No orders yet</p>
                  <p className="mt-2 text-sm text-gray-500">When you place an order, it will appear here.</p>
                  <Link to="/products" className="mt-6 font-medium text-[#8a755d] hover:underline">
                    Start Shopping &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl sm:p-8 relative">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
            >
              <X size={20} />
            </button>

            {activeModal === "editProfile" && (
              <form onSubmit={handleUpdateProfile}>
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Full Name</label>
                    <input type="text" value={modalData.name || ""} onChange={e => setModalData({...modalData, name: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Email Address</label>
                    <input type="email" value={modalData.email || ""} onChange={e => setModalData({...modalData, email: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <button type="submit" className="w-full mt-6 bg-[#222] text-white py-3 text-sm font-bold uppercase tracking-[2px] hover:bg-black transition">Save Changes</button>
                </div>
              </form>
            )}

            {activeModal === "password" && (
              <form onSubmit={handleChangePassword}>
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Current Password</label>
                    <input type="password" value={modalData.currentPassword || ""} onChange={e => setModalData({...modalData, currentPassword: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">New Password</label>
                    <input type="password" value={modalData.newPassword || ""} onChange={e => setModalData({...modalData, newPassword: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Confirm Password</label>
                    <input type="password" value={modalData.confirmPassword || ""} onChange={e => setModalData({...modalData, confirmPassword: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <button type="submit" className="w-full mt-6 bg-[#222] text-white py-3 text-sm font-bold uppercase tracking-[2px] hover:bg-black transition">Update Password</button>
                </div>
              </form>
            )}

            {activeModal === "addresses" && (
              <div>
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Saved Addresses</h3>
                {addresses.length === 0 ? (
                  <p className="text-sm text-gray-500 mb-6">You have no saved addresses.</p>
                ) : (
                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                    {addresses.map(addr => (
                      <div key={addr.id} className="p-4 border border-gray-200 rounded-lg">
                        <p className="font-bold text-sm text-[#1a1a1a]">{addr.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{addr.street}, {addr.city}</p>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => { setModalData({}); setActiveModal("addAddress"); }} className="w-full border border-gray-300 text-[#1a1a1a] py-3 text-sm font-bold uppercase tracking-[2px] hover:bg-gray-50 transition">Add New Address</button>
              </div>
            )}

            {activeModal === "addAddress" && (
              <form onSubmit={handleAddAddress}>
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Add Address</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Title (e.g. Home, Work)</label>
                    <input type="text" value={modalData.title || ""} onChange={e => setModalData({...modalData, title: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Street Address</label>
                    <input type="text" value={modalData.street || ""} onChange={e => setModalData({...modalData, street: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">City</label>
                    <input type="text" value={modalData.city || ""} onChange={e => setModalData({...modalData, city: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <button type="submit" className="w-full mt-6 bg-[#222] text-white py-3 text-sm font-bold uppercase tracking-[2px] hover:bg-black transition">Save Address</button>
                </div>
              </form>
            )}

            {activeModal === "payment" && (
              <div>
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Payment Methods</h3>
                {paymentMethods.length === 0 ? (
                  <p className="text-sm text-gray-500 mb-6">You have no saved payment methods.</p>
                ) : (
                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                    {paymentMethods.map(pm => (
                      <div key={pm.id} className="p-4 border border-gray-200 rounded-lg flex items-center gap-4">
                        <CreditCard size={20} className="text-gray-400" />
                        <div>
                          <p className="font-bold text-sm text-[#1a1a1a]">Card ending in {pm.card.slice(-4)}</p>
                          <p className="text-sm text-gray-500 mt-1">Expires {pm.expiry}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => { setModalData({}); setActiveModal("addPayment"); }} className="w-full border border-gray-300 text-[#1a1a1a] py-3 text-sm font-bold uppercase tracking-[2px] hover:bg-gray-50 transition">Add New Card</button>
              </div>
            )}

            {activeModal === "addPayment" && (
              <form onSubmit={handleAddPayment}>
                <h3 className="text-2xl font-serif text-[#1a1a1a] mb-6">Add Card</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-600 mb-1 block">Card Number</label>
                    <input type="text" maxLength="16" placeholder="1234 5678 1234 5678" value={modalData.card || ""} onChange={e => setModalData({...modalData, card: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">Expiry (MM/YY)</label>
                      <input type="text" placeholder="12/26" value={modalData.expiry || ""} onChange={e => setModalData({...modalData, expiry: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                    </div>
                    <div className="flex-1">
                      <label className="text-sm text-gray-600 mb-1 block">CVV</label>
                      <input type="text" maxLength="3" placeholder="123" value={modalData.cvv || ""} onChange={e => setModalData({...modalData, cvv: e.target.value})} className="w-full border-b border-gray-300 py-2 outline-none focus:border-black" required />
                    </div>
                  </div>
                  <button type="submit" className="w-full mt-6 bg-[#222] text-white py-3 text-sm font-bold uppercase tracking-[2px] hover:bg-black transition">Save Card</button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default Profile;
