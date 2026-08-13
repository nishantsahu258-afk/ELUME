import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white">

      <div className="mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>
            <h2 className="mb-6 text-3xl font-light">
              Elume
            </h2>

            <p className="max-w-xs text-sm leading-7 text-gray-400">
              Premium skincare, fragrance and
              lifestyle essentials crafted with
              care and intention.
            </p>
          </div>

          {/* Shop */}

          <div>
            <h3 className="mb-5 text-sm uppercase tracking-[3px]">
              Shop
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/products">
                  All Products
                </Link>
              </li>

              <li>
                <Link to="/">
                  Skincare
                </Link>
              </li>

              <li>
                <Link to="/">
                  Body Care
                </Link>
              </li>

              <li>
                <Link to="/">
                  Fragrance
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="mb-5 text-sm uppercase tracking-[3px]">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>About Us</li>
              <li>Journal</li>
              <li>Careers</li>
              <li>Contact</li>
            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-5 text-sm uppercase tracking-[3px]">
              Support
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>Shipping</li>
              <li>Returns</li>
              <li>FAQs</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8">

          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

            <p className="text-sm text-gray-500">
              © 2026 Élume. All rights reserved.
            </p>

            <div className="flex gap-6 text-sm text-gray-500">
              <span>Instagram</span>
              <span>Facebook</span>
              <span>Pinterest</span>
            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;