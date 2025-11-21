import { useState, useEffect } from "react";
import purchaseAPI from "../services/purchases";

const api = purchaseAPI();

export function usePurchase(id) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //console.log(id);
  useEffect(() => {
    if (!id) {
      console.log("[DEBUG nuro] no hay una id proporcionada");
      return; //no yamamos a la api poque no hay id
    }
    const response = async () => {
      setLoading(true);
      setError(null);

      console.log("[DEBUG nuro] intentando...");
      try {
        const purchase = await api.getByID(id);
        setData(purchase);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    response(); //la llamamos
  }, [id]); //VIM se queja de las dependencias de data id blablabla pero si las pongo hace while true asi q no las puse funca iwal asi q eso miau

  return { id, data, loading, error };
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
export function useCheckout(purchase) {
  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    const response = async () => {
      setLoading(true);
      setError(null);

      try {
        const post = api.post(purchase);
        setData(post);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
        setId(data._id); //retorno el id de la reservacion recien creada
      }
    };

    response();
  }, [purchase, id, data]);
  return { id, purchase, loading, error };
} // yippie
