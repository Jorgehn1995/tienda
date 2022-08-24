export default {
  listar: (state) => (data) => {
    if (!state[data.ruta]) {
      return false;
    }

    return state[data.ruta][data.tipo];
  },
  informacion: (state) => (id) => {
    return state.informacion[id];
  },
};
