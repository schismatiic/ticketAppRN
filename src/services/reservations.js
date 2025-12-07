const api = process.env.EXPO_PUBLIC_API_URL;
// POST: crear una nueva reserva
async function postReservation(newReservation) {
  try {
    const response = await fetch(`${api}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReservation),
    });

    if (!response.ok) {
      throw new Error(`Error en POST de reservation. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[DEBUG]: Reserva creada correctamente:', result);
    return result;
  } catch (err) {
    console.log('[DEBUG]: error en postReservation() de reservations.js');
    console.error(err);
    return null;
  }
}

// GET: obtener una reserva por ID
async function getReservation(id) {
  try {
    const response = await fetch(`${api}/reservations/${id}`);
    if (!response.ok) {
      throw new Error(`Error en GET de reservation. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[DEBUG]: Reserva obtenida:', result);
    return result;
  } catch (err) {
    console.log('[DEBUG]: error en getReservation() de reservations.js');
    console.error(err.message);
    return null;
  }
}

// DELETE: eliminar una reserva
async function deleteReservation(id) {
  try {
    const response = await fetch(`${api}/reservations/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error en DELETE de reservation. Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[DEBUG]: Reserva eliminada:', result);
    return result;
  } catch (err) {
    console.log('[DEBUG]: error en deleteReservation() de reservations.js');
    console.error(err.message);
    return null;
  }
}

// API pública
function reservationAPI() {
  return {
    getByID: (id) => getReservation(id),
    post: (newReservation) => postReservation(newReservation), // ✅ CORREGIDO
    borrar: (id) => deleteReservation(id),
  };
}

export default reservationAPI;
