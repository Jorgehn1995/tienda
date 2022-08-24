import axios from "axios"
export default {
  async solicitar({ commit }, ruta) {
    return await axios
      .get(ruta)
      .then((result) => {
        let data = {
          ruta: ruta,
          data: result.data,
        };
        commit("setLista", data);

        return Promise.resolve(result.data);
      })
      .catch((err) => {
        console.log(err);
        commit("aplicacion/setSnack", err.response, { root: true });
        return Promise.reject(err);
      });
  },
};
