<template>
  <div>
    <div class="d-flex flex-column justify-center align-center">
      <span class="subtitle-1" v-if="precio.cantidad == 1 && !precio.nombre">
        <strong>Precio Unitario</strong>
      </span>
      <span class="text-h5" v-else>
        <strong>{{ precio.nombre || "N/E" }}</strong>
      </span>
      <div style="" class=" d-flex d-flex-row justify-start">
        <div class="text-h3 black--text"> {{ numero(precio.precio) }} </div>
        <span class="text-h5 font-weight-black">.{{ decimales(precio.precio) }}</span>
      </div>

      <span class="subtitle-1">
        <strong v-if="precio.cantidad == 1"
          >{{ precio.cantidad }} Unidad</strong
        >
        <strong v-else>{{ precio.cantidad }} Unidades</strong>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    precio: {
      type: Object,
      default: () => ({}),
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
