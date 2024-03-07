<template>
  <v-text-field
    ref="field"
    :prepend-icon="icon"
    :append-icon="close ? 'mdi-chevron-right' : ''"
    v-model="search"
    class="pb-0 mb-0 rounded-lg"
    @keyup.enter="realizarBusqueda(0)"
    outlined
    hide-details=""
    name="buscar"
    dense
    :clearable="!isLoading"
    :placeholder="placeholder"
    @click:append="cerrar()"
    :append-outer-icon="appendIcon"
    @click:append-outer="$emit('click:right')"
    autocomplete="off"
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
    "append-icon": {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
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
    loading: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.final) {
      this.search = this.final;
    }
    this.ready = true;
  },
  data: () => ({
    isProccesed: false,
    search: "",
    ready: false,
    timer: null,
    updates: 0,
  }),
  methods: {
    realizarBusqueda() {
      this.isProccesed = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.final = this.search;
        this.isProccesed = false;
      }, this.time);
    },

    cerrar() {
      this.$emit("close", false);
    },
  },
  computed: {
    final: {
      get: function () {
        return this.value;
      },
      set: function (n) {
        this.$emit("input", n);
      },
    },
    isLoading() {
      return this.isProccesed || this.loading;
    },
  },
  watch: {
    search() {
      this.realizarBusqueda();
    },
  },
};
</script>

<style></style>
