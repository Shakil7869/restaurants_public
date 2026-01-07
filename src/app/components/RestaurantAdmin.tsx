import { useState } from 'react';
import { Plus, Trash2, DollarSign, LayoutDashboard, Settings } from 'lucide-react';
import { AdminDashboard } from './AdminDashboard';

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
  seatPrice: number;
}

interface RestaurantAdminProps {
  restaurants: Restaurant[];
  offers: Offer[];
  bookings: any[];
  redeemedOffers: any[];
  onAddOffer: (offer: Omit<Offer, 'id'>) => void;
  onDeleteOffer: (offerId: string) => void;
  onUpdateSeatPrice: (restaurantId: string, price: number) => void;
}

export function RestaurantAdmin({ 
  restaurants, 
  offers,
  bookings,
  redeemedOffers,
  onAddOffer,
  onDeleteOffer,
  onUpdateSeatPrice
}: RestaurantAdminProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'manage'>('dashboard');
  const [selectedRestaurant, setSelectedRestaurant] = useState(restaurants[0]?.id || '');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [discount, setDiscount] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [seatPrice, setSeatPrice] = useState(
    restaurants.find(r => r.id === selectedRestaurant)?.seatPrice || 0
  );

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    onAddOffer({
      restaurantId: selectedRestaurant,
      title,
      description,
      discount,
      validUntil
    });
    setTitle('');
    setDescription('');
    setDiscount('');
    setValidUntil('');
  };

  const handleUpdatePrice = () => {
    onUpdateSeatPrice(selectedRestaurant, seatPrice);
  };

  const currentRestaurant = restaurants.find(r => r.id === selectedRestaurant);
  const restaurantOffers = offers.filter(o => o.restaurantId === selectedRestaurant);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex gap-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'dashboard'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </button>
        <button
          onClick={() => setActiveTab('manage')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 transition-colors ${
            activeTab === 'manage'
              ? 'border-orange-600 text-orange-600'
              : 'border-transparent text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings size={20} />
          <span>Manage Offers & Pricing</span>
        </button>
      </div>

      {/* Dashboard Tab */}
      {activeTab === 'dashboard' && (
        <AdminDashboard
          restaurants={restaurants}
          offers={offers}
          bookings={bookings}
          redeemedOffers={redeemedOffers}
        />
      )}

      {/* Manage Tab */}
      {activeTab === 'manage' && (
        <div>
          <h2 className="mb-6">Manage Offers & Pricing</h2>

          <div className="mb-6">
            <label className="text-gray-700 mb-2 block">Select Restaurant</label>
            <select
              value={selectedRestaurant}
              onChange={(e) => {
                setSelectedRestaurant(e.target.value);
                const restaurant = restaurants.find(r => r.id === e.target.value);
                setSeatPrice(restaurant?.seatPrice || 0);
              }}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
                <h3 className="mb-4">Update Seat Price</h3>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="flex items-center gap-2 text-gray-700 mb-2">
                      <DollarSign size={18} />
                      <span>Price per Seat</span>
                    </label>
                    <input
                      type="number"
                      value={seatPrice}
                      onChange={(e) => setSeatPrice(parseFloat(e.target.value))}
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <button
                    onClick={handleUpdatePrice}
                    className="self-end bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Update
                  </button>
                </div>
                <p className="text-gray-500 mt-2">
                  Current price: ${currentRestaurant?.seatPrice}
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="mb-4">Add New Offer</h3>
                <form onSubmit={handleSubmitOffer} className="space-y-4">
                  <div>
                    <label className="text-gray-700 mb-2 block">Offer Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Weekend Special"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 mb-2 block">Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={3}
                      placeholder="Describe the offer..."
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 mb-2 block">Discount</label>
                    <input
                      type="text"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 20% OFF"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 mb-2 block">Valid Until</label>
                    <input
                      type="date"
                      value={validUntil}
                      onChange={(e) => setValidUntil(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus size={20} />
                    <span>Add Offer</span>
                  </button>
                </form>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="mb-4">Current Offers</h3>
                {restaurantOffers.length > 0 ? (
                  <div className="space-y-3">
                    {restaurantOffers.map((offer) => (
                      <div 
                        key={offer.id}
                        className="bg-orange-50 rounded-lg p-4 border border-orange-200"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h4>{offer.title}</h4>
                            <p className="text-gray-700 mt-1">{offer.description}</p>
                            <div className="flex items-center gap-4 mt-2 text-gray-600">
                              <span className="text-orange-600">{offer.discount}</span>
                              <span>Valid until {offer.validUntil}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => onDeleteOffer(offer.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No offers added yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
