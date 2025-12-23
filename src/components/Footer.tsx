import Link from "next/link";
import Image from "next/image";

const LOGO_WHITE_URL = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/logo-white-1766092584771.png?width=8000&height=8000&resize=contain";

export default function Footer() {
  return (
    <footer className="bg-[#041324] text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-72 h-24">
                <Image 
                  src={LOGO_WHITE_URL}
                  alt="TechBrother Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-white/70 max-w-sm">
              Your trusted partner for managed IT services, projects, and consulting. Currently serving a select group of clients with 10+ years of expertise.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/services/managed-it" className="hover:text-primary transition-colors">Managed IT</Link></li>
              <li><Link href="/services/one-off-projects" className="hover:text-primary transition-colors">IT Projects</Link></li>
              <li><Link href="/services/it-consulting" className="hover:text-primary transition-colors">Consulting</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-2 text-white/70">
              <li><Link href="/#about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><a href="https://www.linkedin.com/company/officialtechbrother" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} TechBrother. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
