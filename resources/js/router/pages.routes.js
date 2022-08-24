export default [
    /**
     * RUTAS PARA EL SISTEMA
     */
    {
        path: "/tienda",
        name: "tienda",
        component: () => import("@/pages/tienda/index.vue"),
        meta: {
            layout: "default",
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
];
