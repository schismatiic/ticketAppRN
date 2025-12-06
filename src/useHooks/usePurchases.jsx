import { useState, useEffect } from 'react';
import purchaseAPI from '../services/purchases';

const api = purchaseAPI();

export function usePurchase() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  //console.log(id);

  async function getPurchaseById(id) {
    if (!id) {
      console.error('[DEBUG]: No se inserto ID');
      return;
    }
    setLoading(true);

    try {
      const purchase = await api.getByID(id);
      setData(purchase);
      return purchase;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  return { getPurchaseById, data, loading, error };
} //get

// purchase body
// {
//   "_id": "68f7bb32b3d1304d0e014071",
//   "reservation_id": "68f7bb32b3d1304d0e014070",
//   "event_id": "68f7b9d771fbcc686dd144e8",
//   "tickets": [
//     {"code": "T-4e8-0001", "type": "General"},
//     {"code": "T-4e8-0002", "type": "General"}
//   ],
//   "buyer": {"name": "Cliente Demo", "email": "demo@example.com"},
//   "total_price": 50000.0,
//   "confirmed_at": "2025-10-21T16:39:40.123Z"
// }
//
export function useCheckout() {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function checkout(purchase) {
    if (!purchase) return;
    setLoading(true);

    try {
      const dato = await api.post(purchase);
      setData(dato);
      return dato;
    } catch (err) {
      console.warn('[DEBUG]: Error wn useCheckout');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return { checkout, data, loading, error };
} // yippie
