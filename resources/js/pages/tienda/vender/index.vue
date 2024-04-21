<template>
  <div>
    <caja-habilitada v-slot="{ caja }">
      <turno-habilitado :caja="caja" v-slot="{ turno }">
        <caja-vender
          :key="update"
          :caja="caja"
          :turno="turno"
          @nuevo="update++"
        ></caja-vender>
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
  data: () => ({
    isLoading: false,
    update: 0,
  }),
};
</script>

<style></style>
