const api = process.env.EXPO_PUBLIC_API_URL;
async function checkout(purchase) {
  try {
    const response = await fetch(api + '/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchase),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `Error status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log('[DEBUG]: error en checkout() de purchases.js'); //Estoy haciendo los errores lo mas parecidos a los del benja para tener consistencia nya
    console.error(err.message);
    return err;
  }
}

async function compra(id) {
  try {
    const response = await fetch(api + `/purchases/${id}`);
    if (!response.ok) {
      throw new Error(`Error en get de purchase. Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log('[DEBUG]: error en purchase() de purchases.js');
    console.error(err.message);
    return err;
  }
}

// async function deleteReservation(id) {
//   try {
//     const response = await fetch(api + `/Reservations/${id}`, {
//       method: "DELETE",
//     });
//     if (!response.ok) {
//       throw new Error(
//         `Error en delete de reservation . Status: ${response.status}`,
//       );
//     }
//     const result = await response.json();
//     console.log(result);
//     return result;
//   } catch (err) {
//     console.log("[DEBUG]: error en deleteReservation() de reservations.js");
//     console.error(err.message);
//     return err;
//   }
// }
// usando el otro de template

function purchaseAPI() {
  return {
    getByID: (id) => compra(id),
    post: (id) => checkout(id),
  }; //deberiamos tener el borrar en purchases para evadir impuestos
}

export default purchaseAPI;
