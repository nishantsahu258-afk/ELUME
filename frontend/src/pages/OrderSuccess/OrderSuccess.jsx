import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight, Truck } from "lucide-react";
import { useState } from "react";

export default function OrderSuccess() {
  const location = useLocation();
  const [orderNumber] = useState(() => location.state?.orderNumber || Math.floor(100000 + Math.random() * 900000));

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center py-12 px-6 font-sans text-[#333]">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-[#8a755d] px-8 py-10 flex flex-col items-center text-center">
          <div className="relative w-full max-w-[200px] h-24 mb-4 flex items-center justify-center overflow-hidden">
            {/* Success Checkmark (appears at the end) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 animate-success-reveal z-10">
              <div className="bg-white/20 p-4 rounded-full">
                <CheckCircle2 size={48} className="text-white" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* The Truck */}
            <div className="absolute opacity-0 animate-truck-drive z-20 flex items-end">
              <Truck size={48} className="text-white" strokeWidth={1.5} />
            </div>

            {/* The Box */}
            <div className="absolute opacity-0 animate-box-load z-0 mt-3">
              <Package size={24} className="text-[#f5f5f0]" strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-serif text-white mb-2">Order Confirmed!</h1>
          <p className="text-[#f5f5f0]/80 text-sm">
            Thank you for your purchase. We've received your order and are getting it ready.
          </p>
        </div>

        {/* Details Section */}
        <div className="px-8 py-8 bg-[#fafafa]">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center text-gray-500">
              <Package size={18} className="mr-2" />
              <span className="text-sm font-medium">Order Number</span>
            </div>
            <span className="text-sm font-bold text-[#1a1a1a]">#{orderNumber}</span>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 leading-relaxed">
              We'll send a confirmation email with your order details and tracking information once your package has shipped.
            </p>
          </div>

          <div className="space-y-3">
            <Link 
              to="/products" 
              className="flex w-full items-center justify-center bg-[#1a1a1a] py-4 text-sm font-bold uppercase tracking-[2px] text-white transition hover:bg-[#333] shadow-md"
            >
              Continue Shopping <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link 
              to="/profile" 
              className="flex w-full items-center justify-center bg-transparent border border-gray-300 py-4 text-sm font-bold uppercase tracking-[2px] text-[#1a1a1a] transition hover:bg-gray-50"
            >
              View Order Status
            </Link>
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes truckDrive {
          0%, 10% { transform: translateX(-150px); opacity: 0; }
          25%, 45% { transform: translateX(0); opacity: 1; }
          60%, 100% { transform: translateX(150px); opacity: 0; }
        }
        @keyframes boxLoad {
          0% { transform: translateY(-50px) rotate(-15deg); opacity: 0; }
          12% { transform: translateY(0) rotate(0); opacity: 1; }
          30% { transform: translateY(0); opacity: 1; }
          40%, 100% { transform: translateY(0) scale(0); opacity: 0; }
        }
        @keyframes successReveal {
          0%, 65% { transform: scale(0.5); opacity: 0; }
          80% { transform: scale(1.1); opacity: 1; }
          90%, 100% { transform: scale(1); opacity: 1; }
        }
        .animate-truck-drive {
          animation: truckDrive 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-box-load {
          animation: boxLoad 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-success-reveal {
          animation: successReveal 3.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}} />
    </div>
  );
}
