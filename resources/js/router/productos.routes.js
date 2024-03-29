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
     * PRODUCTOS
     */
    {
        path: "/tienda/productos",
        name: "",
        redirect: (to) => {
            return {
                path: "/tienda/productos/inicio",
            };
        },
        meta: {
            layout: "autorizado",
        },
    },
    {
        path: "/tienda/productos/inicio",
        name: "",
        component: () => import("@/pages/tienda/productos/index.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
    },
    {
        path: "/tienda/productos/editar",
        name: "",
        component: () => import("@/pages/tienda/productos/editar.vue"),
        meta: {
            layout: "autorizado",
        },
        beforeEnter: validarTipo,
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
            {
                path: "revisados",
                name: "",
                component: () =>
                    import(
                        "@/pages/tienda/productos/vencimientos/revisados.vue"
                    ),
                meta: {
                    layout: "autorizado",
                },
            },
        ],
    },
];
