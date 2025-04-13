
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-csgreen to-blue-500 flex items-center justify-center">
        <span className="text-black font-bold">CS</span>
      </div>
      <span className="font-bold text-white text-xl">
        UnemployedCS <span className="text-csgreen">Students</span>
      </span>
    </Link>
  );
};
