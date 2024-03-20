export default [
    {
        path: "/tienda/turnos",
        name: "",
        component: () => import("@/pages/tienda/turnos/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },
];
