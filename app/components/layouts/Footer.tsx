import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Youtube,  } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 text-center sm:text-left">
            <div className="flex justify-center sm:justify-start">
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Habit Tracker</p>
              <p className="text-sm text-[hsl(0_0%_63.9%)]">
                Building better habits, a day at a time.
              </p>
              <p className="text-sm text-[hsl(0_0%_63.9%)]">
                Copyright © {new Date().getFullYear()} - All rights reserved
              </p>
            </div>
            <Link
              href="#"
              className="text-sm hover:text-[hsl(0_0%_83.1%)] transition-colors inline-block"
            >
              Admin View
            </Link>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h6 className="text-lg font-semibold">Company</h6>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-[hsl(0_0%_63.9%)] hover:text-[hsl(0_0%_83.1%)] transition-colors"
              >
                About us
              </Link>
              <Link
                href="#"
                className="text-[hsl(0_0%_63.9%)] hover:text-[hsl(0_0%_83.1%)] transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="text-[hsl(0_0%_63.9%)] hover:text-[hsl(0_0%_83.1%)] transition-colors"
              >
                Jobs
              </Link>
              <Link
                href="#"
                className="text-[hsl(0_0%_63.9%)] hover:text-[hsl(0_0%_83.1%)] transition-colors"
              >
                Press kit
              </Link>
            </nav>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h6 className="text-lg font-semibold">Legal</h6>
            <nav className="flex flex-col space-y-2">
              <Link
                href="#"
                className="text-[hsl(0_0%_63.9%)] hover:text-[hsl(0_0%_83.1%)] transition-colors"
              >
                Terms of use
              </Link>
              <Link
                href="#"
                className="text-[hsl(0_0%_63.9%)] hover:text-[hsl(0_0%_83.1%)] transition-colors"
              >
                Privacy policy
              </Link>
              <Link
                href="#"
                className="text-[hsl(0_0%_63.9%)] hover:text-[hsl(0_0%_83.1%)] transition-colors"
              >
                Cookie policy
              </Link>
            </nav>
          </div>

          <div className="space-y-4 text-center sm:text-left">
            <h6 className="text-lg font-semibold">Follow Us</h6>
            <div className="flex justify-center sm:justify-start space-x-6">
              <Link
                href="#"
                className="hover:text-[hsl(0_0%_83.1%)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="hover:text-[hsl(0_0%_83.1%)] transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="hover:text-[hsl(0_0%_83.1%)] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
