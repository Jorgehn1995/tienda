import axios from "axios"
export default {
  async obtenerDatos({ commit }, data) {
    let ruta = data.ruta || "";
    let busqueda = data.busqueda || "init-page";
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
        //commit("aplicacion/setSnack", err.response, { root: true });
        return Promise.reject(err);
      });
  },
  async obtenerDatosPost({ commit }, data) {
    let ruta = data.ruta || "";
    let busqueda = data.busqueda || "init-page";
    return await axios
      .post(ruta, data.data)
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
        //commit("aplicacion/setSnack", err.response, { root: true });
        return Promise.reject(err);
      });
  },
};
