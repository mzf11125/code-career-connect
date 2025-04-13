
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-cssecondary">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-gray-400 text-sm">
            Helping CS students transform their careers through mentorship, 
            learning, and job opportunities.
          </p>
        </div>
        
        <div>
          <h3 className="font-bold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Blog</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Community</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Webinars</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-white mb-4">Company</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">About Us</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Careers</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Contact</a>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-bold text-white mb-4">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Terms</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Privacy</a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-csgreen text-sm">Cookies</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto mt-12 pt-8 border-t border-gray-800">
        <p className="text-gray-500 text-sm text-center">
          © {new Date().getFullYear()} UnemployedCS Students. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
