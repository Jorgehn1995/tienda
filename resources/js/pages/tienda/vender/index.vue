<template>
    <div>
        <caja-habilitada v-slot="{ caja }">
            <turno-habilitado :caja="caja" v-slot="{ turno }">
                <caja-vender :caja="caja" :turno="turno"></caja-vender>
            </turno-habilitado>
        </caja-habilitada>
    </div>
</template>

<script>
import CajaVender from "../../../components/ventas/caja-vender.vue";
import TurnoHabilitado from "../../../components/ventas/turno-habilitado.vue";
import CajaHabilitada from "../../../components/ventas/caja-habilitada.vue";

export default {
    components: {
        CajaHabilitada,
        TurnoHabilitado,
        CajaVender,
        CajaHabilitada,
        TurnoHabilitado,
        CajaVender,
    },
};
</script>

<style></style>
