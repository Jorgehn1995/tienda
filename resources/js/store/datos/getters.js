export default {
  obtener: (state) => (ruta) => {
    if (!state[ruta]) {
      return false;
    }

    return state[ruta];
  },
};
