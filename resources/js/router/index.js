import Vue from "vue";
import Router from "vue-router";

// Routes
import PagesRoutes from "./pages.routes";

Vue.use(Router);

export const routes = [
    {
        path: "/",
        name: "login",
        component: () => import("@/pages/index.vue"),
        meta: {
            title: "Iniciar Sesion",
            layout: "login",
        },
    },

    ...PagesRoutes,
];

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL || "/",
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;

        return { x: 0, y: 0 };
    },
    routes,
});

/**
 * Before each route update
 */
router.beforeEach((to, from, next) => {
    return next();
});

/**
 * After each route update
 */
router.afterEach((to, from) => {});

export default router;
