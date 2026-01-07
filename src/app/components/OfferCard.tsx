import { Tag, Calendar } from 'lucide-react';

interface OfferCardProps {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  onRedeem: () => void;
  isRedeemed?: boolean;
}

export function OfferCard({ 
  title, 
  description, 
  discount, 
  validUntil,
  onRedeem,
  isRedeemed = false
}: OfferCardProps) {
  return (
    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-5 border border-orange-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Tag className="text-orange-600" size={20} />
            <h4 className="text-orange-900">{title}</h4>
          </div>
          <p className="text-gray-700 mb-3">{description}</p>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={16} />
            <span>Valid until {validUntil}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-orange-600 text-white px-4 py-2 rounded-lg mb-2">
            <div>{discount}</div>
          </div>
          <button
            onClick={onRedeem}
            disabled={isRedeemed}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isRedeemed 
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            {isRedeemed ? 'Redeemed' : 'Redeem'}
          </button>
        </div>
      </div>
    </div>
  );
}
