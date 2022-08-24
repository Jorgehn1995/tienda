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
        component: () => import("@/pages/tienda/clientes.vue"),
        meta: {
            layout: "autorizado",
        },
    },
];
