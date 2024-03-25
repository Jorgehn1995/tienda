import Turnos from "./turnos.routes";
import Usuarios from "./usuarios.routes";
import Productos from "./productos.routes";
export default [
    /**
     * RUTAS PARA EL SISTEMA
     */
    {
        path: "/tienda",
        name: "index",
        redirect: (to) => {
            return {
                path: "/tienda/inicio",
            };
        },
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/verificador",
        name: "index",
        redirect: (to) => {
            return {
                path: "/tienda/inicio",
            };
        },
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/inicio",
        name: "tienda.home",
        component: () => import("@/pages/tienda/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    ...Turnos,
    ...Usuarios,
    ...Productos,

    /**
     * CLIENTES
     */
    {
        path: "/tienda/clientes",
        name: "",
        component: () => import("@/pages/tienda/clientes/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/clientes/crear",
        name: "",
        component: () => import("@/pages/tienda/clientes/crear.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/clientes/editar",
        name: "",
        component: () => import("@/pages/tienda/clientes/editar.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/clientes/eliminar",
        name: "",
        component: () => import("@/pages/tienda/clientes/eliminar.vue"),
        meta: {
            layout: "autorizado",
        },
    },

    {
        path: "/tienda/productos/:idproducto",
        name: "",
        component: () => import("@/pages/tienda/productos/_idproducto.vue"),
        meta: {
            layout: "autorizado",
        },
    },

    {
        path: "/tienda/productos/eliminar",
        name: "",
        component: () => import("@/pages/tienda/productos/eliminar.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/productos/verificador",
        name: "",
        component: () => import("@/pages/tienda/productos/verificador.vue"),
        meta: {
            layout: "autorizado",
        },
    },
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

    /**
     * CAJAS
     */
    {
        path: "/tienda/ventas/:codigo",
        name: "",
        component: () => import("@/pages/tienda/ventas/_codigo.vue"),
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
    },
    {
        path: "/tienda/cajas/habilitar",
        name: "",
        component: () => import("@/pages/tienda/cajas/habilitar.vue"),
        meta: {
            layout: "autorizado",
        },
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
    },
];
