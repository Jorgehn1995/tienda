import Turnos from "./turnos.routes";
import Usuarios from "./usuarios.routes";
import Productos from "./productos.routes";
import Clientes from "./clientes.routes";
import Ventas from "./ventas.routes";

const cookieValidator = (to, from, next) => {
    // Aquí debes implementar la lógica para validar la cookie
    const cookieExists = document.cookie.includes("miCookie");

    if (cookieExists) {
        next();
    } else {
        // Si la cookie no existe, redirige a otra ruta (puedes cambiar 'login' por la ruta que desees)
        next("/login");
    }
};
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
        path: "/tienda/drawer",
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
        path: "/tienda/noauth",
        name: "index",
        component: () => import("@/pages/tienda/noauth.vue"),
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
    ...Clientes,
    ...Ventas,
];
