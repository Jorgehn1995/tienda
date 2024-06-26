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
     * USUARIOS
     */
    {
        path: "/tienda/usuarios",
        name: "",
        component: () => import("@/pages/tienda/usuarios/index.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },
    {
        path: "/tienda/usuarios/crear",
        name: "",
        component: () => import("@/pages/tienda/usuarios/crear.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },
    {
        path: "/tienda/usuarios/editar",
        name: "",
        component: () => import("@/pages/tienda/usuarios/editar.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },
    {
        path: "/tienda/usuarios/eliminar",
        name: "",
        component: () => import("@/pages/tienda/usuarios/eliminar.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },
];
