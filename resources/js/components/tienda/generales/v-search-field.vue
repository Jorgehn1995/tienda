<template>
  <div>
    <v-scroll-x-transition leave-absolute>
      <v-btn
        icon
        height="40"
        v-if="mini"
        @click="abrir"
        class="ml-1 d-flex d-inline-flex"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-text-field
        v-else
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        class="pb-0 mb-0"
        @keyup.enter="realizarBusqueda(0)"
        filled
        rounded
        hide-details=""
        :name="name"
        dense
        clearable
        :placeholder="placeholder"
        @click:prepend-inner="abrir"
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
    </v-scroll-x-transition>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: "search_field",
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Buscar...",
    },
    mini_disabled: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    if (this.mini_disabled) {
      this.mini = false;
    } else {
      this.mini = this.$vuetify.breakpoint.xsOnly;
    }
  },
  mounted() {
    if (this.final) {
      this.search = this.final;
    }
  },
  data: () => ({
    isLoading: false,
    mini: false,
    search: "",
    timer: null,
    ready: false,
  }),
  methods: {
    realizarBusqueda(time = 1000) {
      this.isLoading = true;
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.final = this.search;
        this.isLoading = false;
      }, time);
    },
    abrir() {
      if (this.mini_disabled) {
        this.mini = false;
      } else {
        this.mini = !this.mini;
      }
    },
  },
  computed: {
    final: {
      get() {
        return this.value;
      },
      set(n) {
        if (n === null || n === undefined) {
          this.$emit("input", "");
        } else {
          this.$emit("input", n);
        }
      },
    },
  },
  watch: {
    search() {
      if (this.ready) {
        this.realizarBusqueda();
      } else {
        this.ready = true;
      }
    },
  },
};
</script>

<style scoped>
v-input__slot {
  padding-left: 5px;
}
</style>
