import Vue from "vue";
export default {
  /**
   * Theme and Layout
   */
  setLista: (state, data) => {
    if (!state[data.ruta]) {
      Vue.set(state, data.ruta, {});
    }

    Vue.set(state[data.ruta], "paginas", data.data.links.length - 2);
    Vue.set(state[data.ruta], "data", data.data.data);
  },

  setInformacion: (state, data) => {
    if (Array.isArray(data)) {
      data.forEach((e) => {
        Vue.set(state.informacion, e.idmateria, e);
      });
    } else {
      Vue.set(state.informacion, data.idmateria, data);
    }
  },
};
