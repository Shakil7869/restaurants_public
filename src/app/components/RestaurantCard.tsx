import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, Tag } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  image: string;
  offerCount: number;
  onClick: () => void;
}

export function RestaurantCard({ 
  name, 
  cuisine, 
  location, 
  image, 
  offerCount,
  onClick 
}: RestaurantCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
    >
      <div className="relative h-48">
        <ImageWithFallback 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        {offerCount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Tag size={14} />
            <span>{offerCount} Offers</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3>{name}</h3>
        <p className="text-gray-600 mt-1">{cuisine}</p>
        <div className="flex items-center gap-1 text-gray-500 mt-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
