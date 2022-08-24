import Vue from "vue";
export default {
  setLista: (state, data) => {
    if (!state[data.ruta]) {
      Vue.set(state, data.ruta, {});
    }
    Vue.set(state, data.ruta, data.data);
  },
};
