
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-csgreen to-blue-500 flex items-center justify-center transform transition-transform group-hover:rotate-6">
          <span className="text-black font-bold text-lg">CS</span>
        </div>
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-csgreen to-blue-500 opacity-50 blur-sm group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="flex flex-col items-start">
        <span className="font-bold text-white text-xl leading-none">
          UnemployedCS
        </span>
        <span className="text-csgreen text-sm font-medium leading-none">
          Students Network
        </span>
      </div>
    </Link>
  );
};
