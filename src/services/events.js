const api = process.env.EXPO_PUBLIC_API_URL;
//===================================================
// Funcion para obtener un evento segun su id
async function getEventbyId(id) {
  try {
    //Primero obtenemos la respuesta desde la api del profe
    const response = await fetch(api + `/events/${id}`);

    //Vemos si la respuesta llega, si no llega error, si llega, seguimos
    if (!response.ok) {
      throw new Error(`Response Status ${response.status}`);
    }

    //Guardamos la respuesta como un json la tiramos a la consola y la retornamos
    const result = await response.json();
    console.log('[DEBUG]: Respuesta de getEventbyId en events.js ', result);
    return result;
  } catch (err) {
    //Esto automaticamente detecta errores y los retorna
    console.log('[DEBUG]: Error en getEventbyId, en event.js');
    console.error(err.message);
    throw err;
  }
}
//======================================================
// Funcion que borra un evento segun su id
async function borra(id) {
  try {
    // Esperamos una respuesta de la api, notar que fetch tiene un argumento DELETE
    const response = await fetch(api + `/events/${id}`, { method: 'DELETE' });

    // Vemos si llega una respuesta
    if (!response.ok) {
      throw new Error(`Status borra ${response.status}`);
    }

    // Retornamos la respuesta como string
    const result = await response.text();
    console.log(result);
    return result;
  } catch (err) {
    // Recibimos error
    console.log('[DEBUG]: Error en borrar, en eventjs');
    console.error(err.message);
    throw err;
  }
}

//============================================================
//Funcion que crea un nuevo evento
async function post(newEvent) {
  try {
    //Creamos un nuevo evento, notar que recibe 4 argumentos, el link, el metodo, la cabecera y la info
    const response = await fetch(api + `/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newEvent),
    });
    // Ya la saben si la respuesta llega, seguimos sino cagamos todos
    if (!response.ok) {
      throw new Error(`Error en post. Status: ${response.status}`);
    }

    //retornamos el resultado de la consulta en un json
    // Recordar que la accion ocurrio arribita, aca solo estamos dando la respuesta
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log('[DEBUG]: Error en post, de event.js');
    console.error(err.message);
    throw err;
  }
}
//======================================
// Esta funcion es para cambiar parametros de objetos de forma modular
async function patch(id, parche) {
  //Recibimos la wea de resputa lol lean la wea de arriba nomas andres qlo
  try {
    const response = await fetch(api + `/events/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(parche),
    });
    if (!response.ok) {
      throw new Error(`Error en path. Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log('[DEBUG]: Error en post, en event.js');
    console.error(err.message);
    throw err;
  }
}
//==========================================================================
// Esta funcion recibe parametros para retornar un json filtrado
async function getP(params = {}) {
  //=====================================================
  //Este bloque se encarga de analizar los parametros insertados y filtra los que esten vacios
  const cleanParams = {};
  for (const key in params) {
    const value = params[key];

    if (value !== null && value !== undefined && value !== '') {
      cleanParams[key] = value;
    }
  }
  //======================================================

  // Insertamos en formato string los parametros usando URLSearchParams que automaticamente lo deja en el formaco correcto
  const queryString = new URLSearchParams(cleanParams).toString();
  // Aca creamos la url basicamente preguntandonos si cada seccion es correcta o no y finalmente la retornamos
  const url = `${api}/events${queryString ? `?${queryString}` : ''}`;
  console.log('[DEBUG]: URL generada es =>', url);

  // Ahora si, ya que tenemos el URL procedemos normalmente
  try {
    // Chantamos el url en fetch y vemos si esta bien
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error en getEvents, Status ${response.status}`);
    }

    // Guardamos la respuesta de la api en un json y lo retornamos
    const result = await response.json();
    console.log('[DEBUG]: Respuesta getEvents', result);
    return result;

    // Retornamos y erroes y tal ya se la saben desgraciados
  } catch (err) {
    console.log('[DEBUG]: Error, en getEvents, en event.js');
    console.error(err.message);
    throw err;
  }
}
function eventApi() {
  return {
    getEvents: (params) => getP(params),
    getbyId: (id) => getEventbyId(id),
    borra: (id) => borra(id),
    post: (evento) => post(evento),
    patch: (id, parche) => patch(id, parche),
  };
}
export default eventApi;
