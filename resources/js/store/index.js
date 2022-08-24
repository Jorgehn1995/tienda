import Vue from "vue";
import Vuex from "vuex";

// Global vuex
import AppModule from "./app";
import AppData from "./datos";
import AppListar from "./listar";

Vue.use(Vuex);

/**
 * Main Vuex Store
 */
const store = new Vuex.Store({
    modules: {
        app: AppModule,
        datos: AppData,
        listar: AppListar,
    },
});

export default store;
