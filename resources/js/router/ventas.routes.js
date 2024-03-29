import moment from "moment/moment";
import Vue from "vue";
const validarTipo = (to, from, next) => {
    const tipo = Vue.cookie.get("tipo");
    if (tipo == 1) {
        next();
    } else {
        next("/tienda/noauth");
    }
};
export default [
    /**
     * VENDER
     */
    {
        path: "/tienda/vender",
        name: "",
        component: () => import("@/pages/tienda/vender/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },

    {
        path: "/tienda/cajas",
        name: "",
        component: () => import("@/pages/tienda/cajas/index.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },
    {
        path: "/tienda/cajas/habilitar",
        name: "",
        component: () => import("@/pages/tienda/cajas/habilitar.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },

    /**
     * REPORTES
     */
    {
        path: "/tienda/reportes",
        name: "",
        component: () => import("@/pages/tienda/reportes/index.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },
];
