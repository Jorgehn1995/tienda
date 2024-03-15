import moment from "moment/moment";

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
        path: "/tienda/productos/existencias",
        name: "",
        component: () => import("@/pages/tienda/productos/existencias.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/productos/vencimientos",
        name: "",
        component: () => import("@/pages/tienda/productos/vencimientos.vue"),
        meta: {
            layout: "autorizado",
        },
        children: [
            {
                path: "/",
                redirect: (to) => {
                    // the function receives the target route as the argument
                    // we return a redirect path/location here.
                    return {
                        path: "pendientes",
                        query: {
                            vencimientos_search: moment().format("Y-MM-DD"),
                        },
                    };
                },
                meta: {
                    layout: "autorizado",
                },
            },
            {
                path: "pendientes",
                name: "",
                component: () =>
                    import(
                        "@/pages/tienda/productos/vencimientos/pendientes.vue"
                    ),
                meta: {
                    layout: "autorizado",
                },
            },
        ],
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
        path: "/tienda/vender/cajas",
        name: "",
        component: () => import("@/pages/tienda/vender/cajas/index.vue"),
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/vender/cajas/:idcaja",
        name: "",
        component: () => import("@/pages/tienda/vender/cajas/_idcaja.vue"),
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
