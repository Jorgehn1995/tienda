<template>
  <div>
    <v-skeleton-loader
      v-if="isLoading && !item"
      :type="loader"
    ></v-skeleton-loader>
    <slot v-else name="default" v-bind:item="item"></slot>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    itemId: {
      type: [String, Number],
      default: 0,
    },
    ruta: {
      type: String,
      required: true,
    },
    loader: {
      type: String,
      default: "article, actions",
    },
  },
  mounted() {
    this.iniciar();
  },
  data: () => ({
    isLoading: true,
  }),
  methods: {
    ...mapActions({ solicitar: "general/datos/solicitar" }),
    async iniciar() {
      this.isLoading = true;
      if (!this.informacion) {
        await this.solicitar(this.url);
      } else {
        this.solicitar(this.url);
      }
      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters({ obtener: "general/datos/obtener" }),
    url() {
      return this.ruta + this.itemId;
    },
    item() {
      return this.obtener(this.url);
    },
  },
};
</script>

<style>
</style>
