<template>
    <span> {{ cantidad }} </span>
</template>

<script>
export default {
    props: {
        existencia: {
            type: Number,
            default: 0,
        },
        presentaciones: {
            type: Array,
            default: () => [],
        },
    },
    mounted() {
        this.calcular();
    },
    data: () => ({
        isLoading: false,
        cantidad: "Sin Existencias",
    }),
    methods: {
        calcular() {
            let presentaciones = JSON.parse(
                JSON.stringify(this.presentaciones)
            );
            presentaciones = presentaciones.reverse();
            console.log(presentaciones);
            let existencias = this.existencia;
            let restante = 0;

            var presentacionesDisponibles = [];

            presentaciones.forEach((presentacion) => {
                var cantidadPresentaciones = Math.floor(
                    existencias / presentacion.cantidad
                );
                presentacionesDisponibles[presentacion.nombre] = isNaN(
                    cantidadPresentaciones
                )
                    ? 0
                    : cantidadPresentaciones;
                existencias -= cantidadPresentaciones * presentacion.unidades;
            });

            this.cantidad = presentacionesDisponibles;
        },
    },
};
</script>

<style></style>
