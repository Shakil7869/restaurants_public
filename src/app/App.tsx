import { useState } from 'react';
import { RestaurantCard } from './components/RestaurantCard';
import { RestaurantDetail } from './components/RestaurantDetail';
import { UserDashboard } from './components/UserDashboard';
import { RestaurantAdmin } from './components/RestaurantAdmin';
import { BookingData } from './components/BookingForm';
import { Store, User, LayoutDashboard } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

interface Offer {
  id: string;
  restaurantId: string;
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
}

interface RedeemedOffer {
  id: string;
  restaurantName: string;
  offerTitle: string;
  discount: string;
  redeemedAt: string;
}

interface Booking {
  id: string;
  restaurantId: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  totalPrice: number;
}

const initialRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'La Bella Italia',
    cuisine: 'Italian Cuisine',
    location: 'Downtown, 123 Main St',
    image: 'https://images.unsplash.com/photo-1672636401339-88d7b84cb1df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMGZvb2R8ZW58MXx8fHwxNzY3MDMwODkwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Experience authentic Italian flavors in a cozy, elegant atmosphere. Our chefs bring traditional recipes from Italy with locally sourced ingredients.',
    seatPrice: 25
  },
  {
    id: '2',
    name: 'Tokyo Sushi Bar',
    cuisine: 'Japanese Cuisine',
    location: 'Midtown, 456 Oak Ave',
    image: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBzdXNoaXxlbnwxfHx8fDE3NjcwMTA0NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Fresh sushi and sashimi prepared by master chefs. Enjoy the finest Japanese dining experience with our omakase menu.',
    seatPrice: 35
  },
  {
    id: '3',
    name: 'El Mariachi',
    cuisine: 'Mexican Cuisine',
    location: 'Westside, 789 Pine Rd',
    image: 'https://images.unsplash.com/photo-1665541620643-38a95ca78e6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMHRhY29zfGVufDF8fHx8MTc2NzAwMTQ5M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Vibrant Mexican restaurant serving traditional dishes with a modern twist. Live mariachi music on weekends!',
    seatPrice: 20
  },
  {
    id: '4',
    name: 'The Grand Bistro',
    cuisine: 'French Cuisine',
    location: 'Uptown, 321 Elm St',
    image: 'https://images.unsplash.com/photo-1751563820356-a62570b187ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzY3MDY2NTE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Classic French bistro with an extensive wine collection. Perfect for romantic dinners and special occasions.',
    seatPrice: 40
  }
];

const initialOffers: Offer[] = [
  {
    id: 'o1',
    restaurantId: '1',
    title: 'Weekend Special',
    description: 'Get 20% off on all pasta dishes this weekend!',
    discount: '20% OFF',
    validUntil: '2025-01-05'
  },
  {
    id: 'o2',
    restaurantId: '1',
    title: 'Happy Hour',
    description: 'Buy one get one free on selected appetizers from 4-6 PM',
    discount: 'BOGO',
    validUntil: '2025-01-31'
  },
  {
    id: 'o3',
    restaurantId: '2',
    title: 'Sushi Combo Deal',
    description: 'Special combo platter with 30% discount',
    discount: '30% OFF',
    validUntil: '2025-01-10'
  },
  {
    id: 'o4',
    restaurantId: '3',
    title: 'Taco Tuesday',
    description: 'All tacos at half price every Tuesday!',
    discount: '50% OFF',
    validUntil: '2025-02-28'
  },
  {
    id: 'o5',
    restaurantId: '4',
    title: 'Wine & Dine',
    description: 'Complimentary wine with any main course',
    discount: 'Free Wine',
    validUntil: '2025-01-15'
  }
];

export default function App() {
  const [view, setView] = useState<'restaurants' | 'detail' | 'dashboard' | 'admin'>('restaurants');
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [restaurants, setRestaurants] = useState(initialRestaurants);
  const [offers, setOffers] = useState(initialOffers);
  const [redeemedOfferIds, setRedeemedOfferIds] = useState<string[]>([]);
  const [redeemedOffers, setRedeemedOffers] = useState<RedeemedOffer[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setView('detail');
  };

  const handleRedeemOffer = (offerId: string) => {
    if (redeemedOfferIds.includes(offerId)) {
      toast.error('Offer already redeemed!');
      return;
    }

    const offer = offers.find(o => o.id === offerId);
    const restaurant = restaurants.find(r => r.id === offer?.restaurantId);
    
    if (offer && restaurant) {
      setRedeemedOfferIds([...redeemedOfferIds, offerId]);
      setRedeemedOffers([
        ...redeemedOffers,
        {
          id: `r-${Date.now()}`,
          restaurantName: restaurant.name,
          offerTitle: offer.title,
          discount: offer.discount,
          redeemedAt: new Date().toLocaleDateString()
        }
      ]);
      toast.success('Offer redeemed successfully!');
    }
  };

  const handleBook = (booking: BookingData) => {
    setBookings([
      ...bookings,
      {
        id: `b-${Date.now()}`,
        ...booking
      }
    ]);
    toast.success('Table booked successfully!');
  };

  const handleAddOffer = (offer: Omit<Offer, 'id'>) => {
    setOffers([
      ...offers,
      {
        id: `o-${Date.now()}`,
        ...offer
      }
    ]);
    toast.success('Offer added successfully!');
  };

  const handleDeleteOffer = (offerId: string) => {
    setOffers(offers.filter(o => o.id !== offerId));
    toast.success('Offer deleted successfully!');
  };

  const handleUpdateSeatPrice = (restaurantId: string, price: number) => {
    setRestaurants(restaurants.map(r => 
      r.id === restaurantId ? { ...r, seatPrice: price } : r
    ));
    toast.success('Seat price updated successfully!');
  };

  const getRestaurantWithOffers = (restaurant: Restaurant) => ({
    ...restaurant,
    offers: offers.filter(o => o.restaurantId === restaurant.id)
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Store className="text-orange-600" size={32} />
              <h1>RestaurantHub</h1>
            </div>
            <nav className="flex gap-4">
              <button
                onClick={() => setView('restaurants')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  view === 'restaurants' || view === 'detail'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Store size={18} />
                <span>Restaurants</span>
              </button>
              <button
                onClick={() => setView('dashboard')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  view === 'dashboard'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <User size={18} />
                <span>My Dashboard</span>
              </button>
              <button
                onClick={() => setView('admin')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  view === 'admin'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LayoutDashboard size={18} />
                <span>Admin Panel</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {view === 'restaurants' && (
          <div>
            <h2 className="mb-6">Browse Restaurants</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant.id}
                  {...restaurant}
                  offerCount={offers.filter(o => o.restaurantId === restaurant.id).length}
                  onClick={() => handleRestaurantClick(restaurant)}
                />
              ))}
            </div>
          </div>
        )}

        {view === 'detail' && selectedRestaurant && (
          <RestaurantDetail
            restaurant={getRestaurantWithOffers(selectedRestaurant)}
            onBack={() => setView('restaurants')}
            onRedeemOffer={handleRedeemOffer}
            onBook={handleBook}
            redeemedOffers={redeemedOfferIds}
          />
        )}

        {view === 'dashboard' && (
          <UserDashboard
            redeemedOffers={redeemedOffers}
            bookings={bookings}
          />
        )}

        {view === 'admin' && (
          <RestaurantAdmin
            restaurants={restaurants}
            offers={offers}
            bookings={bookings}
            redeemedOffers={redeemedOffers}
            onAddOffer={handleAddOffer}
            onDeleteOffer={handleDeleteOffer}
            onUpdateSeatPrice={handleUpdateSeatPrice}
          />
        )}
      </main>
    </div>
  );
}