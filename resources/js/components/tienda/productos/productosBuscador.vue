<template>
  <div>
    <div class="">
      <v-row dense>
        <v-col cols="12" class="mb-1">
          <v-form ref="formCodigo" @submit="skBuscarCodigo">
            <v-card outlined :elevation="elevation" tile>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      height="60"
                      style="font-size: 25px"
                      label="Código de Barras o Nombre del Producto [CTRL+Q]"
                      outlined
                      v-shortkey="['ctrl', 'q']"
                      @shortkey.native="skEnfocarCodigo"
                      v-model="search"
                      :rules="[rules.requerido]"
                      ref="buscarCodigo"
                      prepend-icon="mdi-barcode"
                      placeholder="Ingrese el Codigo [CTRL+Q]"
                      @keypress.enter="skBuscarCodigo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="d-flex align-center">
                    <v-btn
                      outlined
                      color="primary"
                      class="ml-2"
                      @click="skBuscarCodigo"
                      :loading="isLoading"
                      v-shortkey="['ctrl', 'b']"
                      @shortkey.native="skBuscarCodigo"
                    >
                      Buscar Codigo [CTRL + B]
                      <v-icon right>mdi-cloud-search-outline</v-icon>
                    </v-btn>
                    <v-btn
                      outlined
                      color="accent"
                      class="ml-2"
                      @click="skBuscarTexto"
                      :loading="isLoading"
                      v-shortkey="['ctrl', 't']"
                      @shortkey.native="skBuscarTexto"
                    >
                      Buscar Texto [CTRL + T]
                      <v-icon right>mdi-cloud-search-outline</v-icon>
                    </v-btn>
                    <v-btn
                      outlined
                      color="grey"
                      class="ml-2"
                      @click="skLimpiar"
                      :loading="isLoading"
                      v-shortkey="['ctrl', 'l']"
                      @shortkey.native="skLimpiar"
                    >
                      Limpiar[CTRL + L]
                      <v-icon right>mdi-cloud-search-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
        <v-col
          cols="12"
          class="d-flex justify-center align-center"
          v-if="isLoading"
        >
          <v-progress-circular
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
  components: { VNiceModal, ProductosPrecios },
  props: {
    elevation: {
      default: 3,
    },
  },
  mounted() {
    this.$refs.buscarCodigo.$refs.input.focus();
    if (this.$route.query.codigo) {
      this.search = this.$route.query.codigo;
      this.$nextTick(() => {
        this.skBuscar();
      });
    }
  },
  data: () => ({
    isLoading: false,
    search: "",
    data: [],
    rules: {
      requerido: (v) => !!v || "Campo Requerido",
      min40: (v) =>
        (v && v.length <= 40) ||
        "La información no deben superar los 40 caracteres",
      min200: (v) =>
        (v && v.length <= 200) ||
        "La información no deben superar los 200 caracteres",
      min0: (v) => (v >= 0 && v <= 10000) || "El campo estas entre 0 y 10000",
    },
  }),
  methods: {
    skEnfocarCodigo() {
      this.$refs.buscarCodigo.$refs.input.select();
      this.$refs.buscarCodigo.$refs.input.focus();
    },
    async skBuscarCodigo(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.$refs.formCodigo.validate()) {
        this.isLoading = true;
        this.$axios
          .get("/productos?codigo=" + this.search)
          .then((result) => {
            this.isLoading = false;
            this.$emit("porcodigo", result.data);
            this.skEnfocarCodigo();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    async skBuscarTexto(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.$refs.formCodigo.validate()) {
        this.isLoading = true;
        this.$axios
          .get("/productos?search=" + this.search)
          .then((result) => {
            this.isLoading = false;
            this.$emit("portexto", result.data.data);
            this.skEnfocarCodigo();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    skLimpiar() {
      this.search = "";
      this.$refs.buscarCodigo.$refs.input.focus();
    },
  },
  computed: {
    id() {
      return this.$route.query.id || 0;
    },
  },
};
</script>

<style>
</style>
