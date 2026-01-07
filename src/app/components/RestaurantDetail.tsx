import { ImageWithFallback } from './figma/ImageWithFallback';
import { MapPin, DollarSign, ArrowLeft } from 'lucide-react';
import { OfferCard } from './OfferCard';
import { BookingForm, BookingData } from './BookingForm';

interface Offer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  location: string;
  image: string;
  description: string;
  seatPrice: number;
  offers: Offer[];
}

interface RestaurantDetailProps {
  restaurant: Restaurant;
  onBack: () => void;
  onRedeemOffer: (offerId: string) => void;
  onBook: (booking: BookingData) => void;
  redeemedOffers: string[];
}

export function RestaurantDetail({ 
  restaurant, 
  onBack, 
  onRedeemOffer,
  onBook,
  redeemedOffers
}: RestaurantDetailProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Back to Restaurants</span>
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-80">
          <ImageWithFallback 
            src={restaurant.image} 
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2>{restaurant.name}</h2>
              <p className="text-gray-600 mt-2">{restaurant.cuisine}</p>
              <div className="flex items-center gap-2 text-gray-500 mt-2">
                <MapPin size={18} />
                <span>{restaurant.location}</span>
              </div>
            </div>
            <div className="bg-orange-100 px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2 text-orange-600">
                <DollarSign size={18} />
                <span>${restaurant.seatPrice} per seat</span>
              </div>
            </div>
          </div>

          <p className="text-gray-700 mb-8">{restaurant.description}</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h3 className="mb-4">Available Offers</h3>
              {restaurant.offers.length > 0 ? (
                <div className="space-y-4">
                  {restaurant.offers.map((offer) => (
                    <OfferCard
                      key={offer.id}
                      {...offer}
                      onRedeem={() => onRedeemOffer(offer.id)}
                      isRedeemed={redeemedOffers.includes(offer.id)}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No offers available at the moment.</p>
              )}
            </div>

            <div>
              <BookingForm
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
                seatPrice={restaurant.seatPrice}
                onBook={onBook}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
