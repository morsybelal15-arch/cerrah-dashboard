"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowLeft } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // تأثير تحويل النافبار عند النزول بالصفحة
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // إخفاء النافبار تماماً في مسارات لوحة التحكم
  if (pathname?.includes('/patient') || pathname?.includes('/doctor')) {
    return null;
  }

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'عن العيادة', path: '/about' },
    { name: 'خدماتنا', path: '/services' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-[1600px] mx-auto px-4 md:px-8">
        <nav className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'glass-card rounded-full px-6 py-2 shadow-2xl' : 'px-2'}`}>
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 z-50">
            <span className="text-2xl md:text-3xl font-black tracking-wider text-white drop-shadow-md">
              CERRAH <span className="text-[#8DC63F] text-4xl leading-none">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 rounded-full p-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  href={link.path}
                  className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#8DC63F] text-[#030805] shadow-[0_0_15px_rgba(141,198,63,0.4)]' 
                      : 'text-green-50 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-4 z-50">
            <Link href="/patient" className="hidden md:flex items-center gap-2 btn-glow btn-glow-gold px-6 py-2.5 rounded-full font-extrabold text-sm border-none shadow-lg">
              لوحة التحكم <ArrowLeft size={16} />
            </Link>
            
            <button 
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#030805]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-[fadeIn_0.2s_ease-out]">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-black transition-colors ${pathname === link.path ? 'text-[#8DC63F]' : 'text-white hover:text-[#8DC63F]'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/patient" 
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 flex items-center gap-2 btn-glow btn-glow-gold px-8 py-4 rounded-full font-extrabold text-lg border-none shadow-lg"
          >
            لوحة التحكم <ArrowLeft size={20} />
          </Link>
        </div>
      )}
    </header>
  );
}