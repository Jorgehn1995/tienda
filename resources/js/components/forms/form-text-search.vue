<template>
  <v-text-field
    ref="field"
    :prepend-icon="icon"
    :append-outer-icon="close ? 'mdi-chevron-right' : ''"
    v-model="search"
    class="pb-0 mb-0 rounded-lg"
    @keyup.enter="realizarBusqueda(0)"
    outlined
    hide-details=""
    name="buscar"
    dense
    clearable
    :placeholder="placeholder"
    @click:append-outer="cerrar()"
  >
    <template v-slot:append>
      <v-fade-transition hide-on-leave>
        <v-progress-circular
          v-if="isLoading"
          size="19"
          width="2"
          color="info"
          indeterminate
        ></v-progress-circular>
      </v-fade-transition>
    </template>
  </v-text-field>
</template>

<script>
export default {
  props: {
    close: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: "mdi-magnify",
    },
    placeholder: {
      type: String,
      default: "Buscar:",
    },
    prefix: {
      type: String,
      default: "q",
    },
    time: {
      type: Number,
      default: 1000,
    },
  },
  mounted() {
    if (this.final) {
      this.search = this.final;
    }
    this.ready = true;
  },
  data: () => ({
    isLoading: false,
    search: "",
    ready: false,
    timer: null,
    updates: 0,
  }),
  methods: {
    realizarBusqueda() {
      this.isLoading = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.final = this.search;
        this.isLoading = false;
      }, this.time);
    },
    actualizarRuta(parametro, nuevoValor, del = false) {
      let query = this.$route.query;

      if (del) {
        delete query[parametro];
      } else {
        query[parametro] = nuevoValor.toString();
      }

      this.$router
        .replace({
          query: { ...query, t: this.updates++ },
        })
        .catch(() => {});
    },
    cerrar() {
      this.$emit("close", false);
    },
  },
  computed: {
    final: {
      get: function () {
        return this.$route.query[this.prefix] || "";
      },
      set: function (nuevoValor) {
        if (nuevoValor == null) {
          this.actualizarRuta(this.prefix, "", true);
        } else {
          this.actualizarRuta(this.prefix, nuevoValor, nuevoValor == "");
        }
      },
    },
  },
  watch: {
    search() {
      //console.log(this.ready + " - " + this.search);
      if (this.ready) {
        this.realizarBusqueda();
      } else {
        this.ready = true;
      }
    },
    final() {
      //this.ready = false;
      this.search = this.final;
    },
  },
};
</script>

<style></style>
