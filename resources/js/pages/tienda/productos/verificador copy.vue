<template>
  <div>
    <div class="">
      <v-row dense>
        <v-col cols="12" class="mb-1">
          <v-form ref="formCodigo" @submit="skBuscar">
            <v-card outlined elevation="3" tile>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="8">
                    <v-text-field
                      label="Código de Barras o Nombre del Producto [CTRL+Q]"
                      v-shortkey="['ctrl', 'q']"
                      @shortkey.native="skBuscarCodigo"
                      v-model="data.codigo"
                      :rules="[rules.requerido]"
                      ref="buscarCodigo"
                      prepend-icon="mdi-barcode"
                      placeholder="Ingrese el Codigo"
                      @keypress.enter="skBuscar"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    class="d-flex justify-center align-center"
                  >
                    <v-btn
                      outlined
                      block
                      color="accent"
                      @click="skBuscar"
                      :loading="isLoading"
                      v-shortkey="['ctrl', 'b']"
                      @shortkey.native="skBuscar"
                    >
                      Por Codigo [CTRL+B]
                      <v-icon right>mdi-cloud-search-outline</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    class="d-flex justify-center align-center"
                  >
                    <v-btn
                      outlined
                      block
                      color="grey"
                      @click="skLimpiar"
                      v-shortkey="['ctrl', 'alt', 'b']"
                      @shortkey="skLimpiar"
                      :loading="isLoading"
                    >
                      Por Texto [CTRL+L]
                      <v-icon right>mdi-text-box-search-outline</v-icon>
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

      <v-container v-if="!isLoading">
        <v-row>
          <v-col cols="12" sm="6" md="4" v-for="(item, index) in data">
            <v-card>
              <v-card-title class="pb-1">
                <v-icon left>mdi-barcode</v-icon>
                {{ item.codigo }}</v-card-title
              >
              <v-card-title class="py-1">{{ item.nombre }}</v-card-title>
              <v-card-text>
                <span class="title">
                  {{ item.existencia }} unidades disponibles
                </span>
                <v-card v-for="precio in item.precios" outlined class="mt-1">
                  <v-card-text class="mx-0">
                    <v-row>
                      <v-col
                        cols="6"
                        class="d-flex justify-center align-center"
                      >
                        <div
                          class="d-flex flex-column justify-center align-center"
                        >
                          <span class="headline black--text">
                            {{ precio.cantidad }}
                          </span>
                          <span class="text-capitalize"> Unidades por </span>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div
                          class="d-flex flex-column justify-center align-center"
                        >
                          <span class="headline black--text">
                            Q{{ precio.precio }}
                          </span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-nice-modal v-model="saved" @go="confirmado()">
        <template v-slot:titulo> Registro Editado </template>
        <template v-slot:descripcion> El registro ha sido guardado </template>
        <template v-slot:btn>
          <v-icon left>mdi-check</v-icon>
          Ok, entendido
        </template>
      </v-nice-modal>
      <v-nice-modal
        v-model="error.status"
        color="error"
        @go="error.status = false"
        icon="mdi-alert-outline"
      >
        <template v-slot:titulo> Error </template>
        <template v-slot:descripcion>
          <div v-html="error.msg"></div>
        </template>
        <template v-slot:btn> Ok, entendido </template>
      </v-nice-modal>
    </div>
  </div>
</template>

<script>
import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
  components: { VNiceModal, ProductosPrecios },
  mounted() {
    this.$refs.buscarCodigo.$refs.input.focus();
    if (this.$route.query.codigo) {
      this.data.codigo = this.$route.query.codigo;
      this.$nextTick(() => {
        this.skBuscar();
      });
    }
  },
  data: () => ({
    isLoading: false,
    isNew: false,
    isFound: false,
    saved: false,
    data: [],
    error: {
      status: false,
      msg: "",
    },
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
    skBuscarCodigo() {
      this.$refs.buscarCodigo.$refs.input.select();
      this.$refs.buscarCodigo.$refs.input.focus();
    },
    async skBuscar(e) {
      if (e) {
        e.preventDefault();
      }
      if (this.$refs.formCodigo.validate()) {
        this.isLoading = true;
        this.$axios
          .get("/productos?search=" + this.data.codigo)
          .then((result) => {
            this.isLoading = false;
            this.data = result.data.data;
            //this.data = result.data;
            //this.isNew = result.data.nombre == "";
            //this.isFound = true;
            //if (this.isNew) {
            //  this.$nextTick(() => {
            //    this.$refs.nombre.$refs.input.focus();
            //  });
            //} else {
            //  this.$nextTick(() => {
            //    this.$refs.existencia.$refs.input.select();
            //    this.$refs.existencia.$refs.input.focus();
            //  });
            //}
          })
          .catch((err) => {
            //this.error.msg = "Usuario no encontrado";
            //this.error.status = true;
            //setTimeout(() => {
            //  this.$router.go(-1);
            //}, 3000);
          });
      }
    },
    skLimpiar() {
      this.data.codigo = "";
      this.isLoading = false;
      this.isNew = false;
      this.isFound = false;
      this.$refs.buscarCodigo.$refs.input.focus();
    },
    skEnfocarTextField(n) {
      this.$refs[n].$refs.input.select();
      this.$refs[n].$refs.input.focus();
    },

    confirmar() {
      if (this.$refs.form.validate()) {
        this.procesar();
      }
    },
    async procesar() {
      if (this.$refs.formProducto.validate()) {
        this.isLoading = true;
        await this.$axios
          .post("/productos", this.data)
          .then((result) => {
            this.skLimpiar();
            this.saved = true;
            setTimeout(() => {
              this.saved = false;
            }, 200);
          })
          .catch((err) => {
            let errores = err.response.data.errors;
            for (const key in errores) {
              for (const error in errores[key]) {
                this.error.msg = "• " + errores[key][error] + "<br>";
              }
            }

            this.error.status = true;
          });
        this.isLoading = false;
      }
    },
    confirmado() {
      this.$router.go(-1);
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
