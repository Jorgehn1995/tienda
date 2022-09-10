<template>
  <div>
    <div class="d-flex flex-column justify-center align-center">
      <span class="subtitle-1" v-if="cantidad == 1 && !nombre">
        <strong>Precio Unitario</strong>
      </span>
      <span class="text-h5" v-else>
        <strong>{{ nombre || "N/E" }}</strong>
      </span>
      <div style="" class="d-flex d-flex-row justify-start">
        <div class="text-h3 black--text">{{ numero(precio) }}</div>
        <span class="text-h5 font-weight-black">.{{ decimales(precio) }}</span>
      </div>

      <span class="subtitle-1">
        <strong v-if="cantidad == 1">{{ cantidad }} Unidad</strong>
        <strong v-else>{{ cantidad }} Unidades</strong>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nombre: {
      type: [Number, String],
      default: "Precio Unitario",
    },
    precio: {
      type: [Number, String],
      default: 0,
    },
    cantidad: {
      type: [Number, String],
      default: 0,
    },
  },
  methods: {
    numero(p) {
      let n = (p + "").split(".");
      return n[0];
    },
    decimales(p) {
      let n = (p + "").split(".");
      return n[1];
    },
  },
};
</script>

<style>
</style>
