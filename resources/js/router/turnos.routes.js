export default [
    {
        path: "/tienda/turnos",
        name: "",
        component: () => import("@/pages/tienda/turnos/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/turnos/registrar",
        name: "",
        component: () => import("@/pages/tienda/turnos/registrar.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/turnos/:idturno",
        name: "",
        component: () => import("@/pages/tienda/turnos/_idturno.vue"),
        meta: {
            layout: "autorizado",
        },
    },
];
