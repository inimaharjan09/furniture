import React from 'react';

export default function Info() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6 sm:px-20 py-30 bg-gray-50 ">
      <div>
        <h3 className="font-bold text-lg mb-2">Free Delivery</h3>
        <p className="text-sm text-gray-600">
          For all orders over $50, consectetur adipim scing elit.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">90 Days Return</h3>
        <p className="text-sm text-gray-600">
          If goods have problems, consectetur adipim scing elit.
        </p>
      </div>
      <div>
        <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
        <p className="text-sm text-gray-600">
          100% secure payment, consectetur adipim scing elit.
        </p>
      </div>
    </div>
  );
}
