import { useEffect, useState } from 'react';
import eventApi from '../services/events';
const api = eventApi();

// Vale este archivo deberia tener casi todo para que funque, si no lo tiene me avisan
// Notaran que cada Hook tiene tanto su data, que retorna la respuesta que da el hook, no su accion
// Tiene loading y error, que son fundamentales para tratar con los componentes que interactuan
// AHora intentare ver que explicar de los hooks

export function useGetbyId() {
  console.log('[DEBUG]: Ejecutando useGetbyId');

  const [edata, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Declaramos una funcion asincrona para ser retornada y sacarla de la funcion
  async function get(id) {
    if (!id) {
      return;
    }
    setLoading(true);
    //
    try {
      // Aca llamamos la capa de servicios, todo el resto es mero tratado de funciones asincronas
      const dato = await api.getbyId(id);
      setData(dato);
      return edata;
    } catch (err) {
      console.log('[DEBUG]: Error en useGetbyId()');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  //
  return { get, edata, isLoading, error };
}
export function useDelete() {
  console.log('[DEBUG]: Ejecutando useDelete');
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function borrar(id) {
    if (!id) return;
    setLoading(true);
    //
    try {
      const dato = await api.borra(id);
      setData(dato);
      return data;
    } catch (err) {
      console.log('[DEBUG]: Error en useDelete');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return { borrar, data, isLoading, error };
}

export function usePost() {
  console.log('[DEBUG]: Ejecutando usePost');

  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function post(evento) {
    if (!evento) return;

    setLoading(true);
    try {
      const dato = await api.post(evento);
      setData(dato);
      return data;
    } catch (err) {
      console.log('[DEBUG]: Error en usePost');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return { post, data, isLoading, error };
}

export function usePatch() {
  console.log('[DEBUG]: Ejecutando usePatch');
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function patch(id, parche) {
    console.log('[DEBUG]: Iniciando patch');
    if (!id || !parche) {
      console.log('[DEBUG]: No se incluyo id o parche');
      return;
    }
    setLoading(true);
    try {
      console.log('Intentamos llamar patch');
      const dato = await api.patch(id, parche);
      setData(dato);
      console.log('Parch llamado');
      return data;
    } catch (err) {
      console.log('[DEBUG]: Error en usePartch');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }
  return { patch, data, isLoading, error };
}
export function useGetEvents() {
  console.log('[DEBU]: Ejecutando useGetEvents');
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getEvents(params) {
    console.log('[DEBUG]: Iniciando getEvents');
    setLoading(true);
    // IMPORTANTE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // ESTA FUNCION NO DEBE VERIFICAR SI SE RECIBEN PARAMETROS
    // PORQUE SI NO RECIBE PARAMETROS RETONRA LA LISTA ENTERA
    // JUSTO COMO CORRESPONDE
    // NO INCLUYAN ESA WEA !!!!!!!!!!
    //
    try {
      const dato = await api.getEvents(params);
      setData(dato);
      return dato;
    } catch (err) {
      console.log('[DEBUG]: Error en useGetEvents, de useEvents.js');
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  //
  return { getEvents, data, isLoading, error };
}
