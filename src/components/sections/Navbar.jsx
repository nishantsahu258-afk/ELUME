import { Heart } from "lucide-react";
import { useWishlist } from "../../context/WishlistContext";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";

import {Link, useLocation} from 'react-router-dom';
import { Search ,ShoppingBag, User } from 'lucide-react';

function Navbar(){
    const location = useLocation();
    const isProductDetails = location.pathname.startsWith('/product/');
    const isProfile = location.pathname === '/profile';
    const isCheckout = location.pathname === '/checkout';
    const { wishlist } = useWishlist();
    const { user } = useAuth();
    const { cart } = useCart();
    const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

    const navLinks = (
      <>
        <Link to="/products?search=mascara" className='font-serif text-md'> Mascara </Link>
        <Link to="/products?search=eyeshadow" className='font-serif text-md'> Eyeshadow </Link>
        <Link to="/products?search=powder" className='font-serif text-md'> Powder </Link>
        <Link to="/products?search=lipstick" className='font-serif text-md'> Lipstick </Link>  
        <Link to="/products?search=nail" className='font-serif text-md'> Nail Polish </Link>
      </>
    );

    return(
      <div className='sticky w-full top-0 z-50 border-b border-black/10 backdrop-blur bg-[#f7f3ed]/95'>
        <div className="flex items-center justify-between w-full h-20 px-8 border border-gray-300" >

          <div className='flex ml-20 items-center gap-8'>
            <Link to="/products">
              <Search size={18}/>
            </Link>
          </div>

         {isProductDetails ? (
           <div className='flex items-center gap-8'>
             {navLinks}
           </div>
         ) : (
           <Link to="/" className='font-serif text-3xl'> ELUME </Link>
         )}

         <div className='flex items-center mr-20 gap-5'>
           <Link to="/wishlist" className="relative flex items-center">
             <Heart size={22} />
             {wishlist.length > 0 && (
               <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                 {wishlist.length}
               </span>
             )}
           </Link>
           <Link to={user ? "/profile" : "/login"}>
             <User size={18} />
           </Link>
           <Link to="/cart" className="relative flex items-center">
             <ShoppingBag size={18} />
             {cartItemsCount > 0 && (
               <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                 {cartItemsCount}
               </span>
             )}
           </Link>
         </div>
        </div>
        
        {!isProductDetails && !isProfile && !isCheckout && (
          <div className='flex items-center justify-between mx-auto h-10 max-w-3xl px-8'>
            {navLinks}
          </div>
        )}
      </div>
    );
}
export default Navbar;