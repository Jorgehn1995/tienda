export default [
    /**
     * RUTAS PARA EL SISTEMA
     */
    {
        path: "/tienda",
        name: "tienda",
        component: () => import("@/pages/tienda/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },
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
    },
    {
        path: "/tienda/usuarios/crear",
        name: "",
        component: () => import("@/pages/tienda/usuarios/crear.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/usuarios/editar",
        name: "",
        component: () => import("@/pages/tienda/usuarios/editar.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/usuarios/eliminar",
        name: "",
        component: () => import("@/pages/tienda/usuarios/eliminar.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    /**
     * PRODUCTOS
     */
     {
        path: "/tienda/productos",
        name: "",
        component: () => import("@/pages/tienda/productos/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },

    {
        path: "/tienda/productos/editar",
        name: "",
        component: () => import("@/pages/tienda/productos/editar.vue"),
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
];
