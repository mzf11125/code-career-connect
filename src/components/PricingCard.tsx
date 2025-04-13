
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

export const PricingCard = ({ title, price, description, features, highlighted = false }: PricingCardProps) => {
  return (
    <div className={`${highlighted ? 'border-csgreen shadow-[0_0_30px_rgba(74,227,181,0.3)]' : 'border-gray-800'} 
                      border rounded-xl p-6 transition-all duration-300`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-gray-400">/month</span>
      </div>
      <p className="text-gray-400 text-sm mb-6">{description}</p>
      
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="text-csgreen" size={16} />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button className={`w-full ${highlighted ? 'bg-csgreen text-black hover:bg-csgreen/90' : 'bg-gray-800 hover:bg-gray-700'}`}>
        {highlighted ? 'Subscribe' : 'Sign Up'}
      </Button>
    </div>
  );
};
