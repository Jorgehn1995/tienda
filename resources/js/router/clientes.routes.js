export default [
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
];
