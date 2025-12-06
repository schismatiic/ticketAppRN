import { useState, useEffect } from 'react';
import reservationAPI from '../services/reservations';

const api = reservationAPI();

// 🔹 GET RESERVATION BY ID
export function useReservation() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function getReservationById(id) {
    if (!id) {
      console.log('[DEBUG nuro] no hay una id proporcionada');
      return;
    }

    setLoading(true);

    console.log('[DEBUG nuro] intentando obtener reservación...');
    try {
      const reservacion = await api.getByID(id);
      console.log('[DEBUG nuro] reservación obtenida:', reservacion);
      setData(reservacion);
      return reservacion;
    } catch (err) {
      console.log('[DEBUG nuro] error en getReservation()');
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }
  return { getReservationById, data, loading, error };
}

// 🔹 DELETE RESERVATION
export function useDeleteReservation() {
  const [deleted, setDeleted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function deleteReservationById(id) {
    if (!id) {
      console.log('[DEBUG nuro] no hay una id proporcionada');
      return;
    }
    setLoading(true);
    try {
      console.log('[DEBUG nuro] eliminando reserva con id:', id);
      const result = await api.borrar(id);
      console.log('[DEBUG nuro] reserva eliminada:', result);
      setDeleted(result);
    } catch (err) {
      console.log('[DEBUG nuro] error en deleteReservation()');
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return { deleteReservationById, deleted, loading, error };
}

// 🔹 POST (CREAR NUEVA RESERVA)
// Reservation body esperado:
// {
//   "event_id": "68f7b9d771fbcc686dd144e8",
//   "items": [
//     { "quantity": 2, "type": "General" }
//   ]
// }

export function usePostReservation() {
  const [id, setId] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // vamos a reescribir esto q el leo la embarro en la presentacion pasada y aun asi no funciono
  // aunque funciono cuando lo probamos pasamo a presentar y no funco
  // pero bueno voy a reescribir esta funcion como los hooks del benja

  async function post(reservation) {
    if (!reservation) return;

    setLoading(true);
    try {
      const dato = await api.post(reservation);
      setData(dato);
      return dato;
    } catch (err) {
      console.log('Error en usePostReservation');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return { post, data, loading, error };
}
