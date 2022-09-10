<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="12">
        <v-card tile elevation="0">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <v-list-item>
                  <v-list-item-subtitle class="text-h6"
                    >Subtotal</v-list-item-subtitle
                  >
                  <v-list-item-title class="align-right text-h3"
                    >0.00</v-list-item-title
                  >
                </v-list-item>
              </v-col>
              <v-col cols="12" md="4">
                <v-list-item>
                  <v-list-item-subtitle class="text-h6"
                    >Descuento</v-list-item-subtitle
                  >
                  <v-list-item-title class="align-right text-h3"
                    >0.00</v-list-item-title
                  >
                </v-list-item>
              </v-col>
              <v-col cols="12" md="4">
                <v-list-item>
                  <v-list-item-subtitle class="align-right text-h6"
                    >TOTAL</v-list-item-subtitle
                  >
                  <v-list-item-title class="align-right">
                    <div class="text-h1">69.00</div>
                  </v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card tile>
          <v-card-text>
            <v-list-item>
              <v-list-item-subtitle class="align-right text-h6"
                >Cliente [CTRL+C]:</v-list-item-subtitle
              >
              <v-list-item-title class="align-right">
                <div class="text-subtitle-1">C/F</div>
              </v-list-item-title>
            </v-list-item>
          </v-card-text>
        </v-card>
        <productos-buscador :elevation="0"></productos-buscador>
      </v-col>
      <v-col cols="12" md="6">
        <v-card tile elevation="0">
          <v-card-text>
            <v-card outlined tile>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" md="4"> Producto - Codigo </v-col>
                  <v-col cols="12" md="4"> Cantidad x Precio </v-col>
                  <v-col cols="12" md="4"> Total </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card outlined tile>
              <v-card-text class="text-h5">
                <v-row dense>
                  <v-col cols="12" md="4">
                    Pepsi 3L <br />
                    <span class="text-subtitle-1">684571232455</span>
                  </v-col>
                  <v-col cols="12" md="4"> 1 x Q15.00 </v-col>
                  <v-col cols="12" md="4"> Q15.00 </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card outlined tile>
              <v-card-text class="text-h5">
                <v-row dense>
                  <v-col cols="12" md="4">
                    Aceite Ideal 1L <br />
                    <span class="text-subtitle-1">7844561254487</span>
                  </v-col>
                  <v-col cols="12" md="4"> 2 x Q27.00 </v-col>
                  <v-col cols="12" md="4"> Q54.00 </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card outlined tile>
              <v-card-text class="text-h5">
                <v-row dense>
                  <v-col cols="12" md="4">
                    Azucar 5L <br />
                    <span class="text-subtitle-1">974584123</span>
                  </v-col>
                  <v-col cols="12" md="4"> 1 x Q24.00 </v-col>
                  <v-col cols="12" md="4" class="text-h6"> Q24.00 </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card outlined tile>
              <v-card-text class="text-h5">
                <v-row dense>
                  <v-col cols="12" md="4">
                    Chetos 800g <br />
                    <span class="text-subtitle-1">58745236978</span>
                  </v-col>
                  <v-col cols="12" md="4"> 1 x Q3.00 </v-col>
                  <v-col cols="12" md="4"> Q3.00 </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductosBuscador from "../../../components/tienda/productos/productosBuscador.vue";
import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
  components: { VNiceModal, ProductosPrecios, ProductosBuscador },
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
    data: {
      idproducto: 0,
      codigo: "",
      nombre: "",
      costo: 0,
      caducidad: "",
      existencia: 0,
    },
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
          .get("/productos/" + this.data.codigo)
          .then((result) => {
            this.isLoading = false;
            this.data = result.data;
            this.isNew = result.data.nombre == "";
            this.isFound = true;
            if (this.isNew) {
              this.$nextTick(() => {
                this.$refs.nombre.$refs.input.focus();
              });
            } else {
              this.$nextTick(() => {
                this.$refs.existencia.$refs.input.select();
                this.$refs.existencia.$refs.input.focus();
              });
            }
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
