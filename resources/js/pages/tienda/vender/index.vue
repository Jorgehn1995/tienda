<template>
  <div>
    <v-row dense no-gutters>
      <v-col cols="12" md="8">
        <v-card tile elevation="0">
          <v-card-text>
            <v-list-item>
              <v-list-item-subtitle class="align-right text-h6">
                Cliente [CTRL+C]:
              </v-list-item-subtitle>
              <v-list-item-title class="align-right">
                <div class="text-subtitle-1">C/F</div>
              </v-list-item-title>
            </v-list-item>
          </v-card-text>
        </v-card>
        <buscar-para-vender @producto="agregarProducto"></buscar-para-vender>
        <v-card tile elevation="0">
          <v-card-text>
            <v-card outlined tile>
              <v-card-text>
                <v-row dense no-gutters>
                  <v-col cols="12" md="3"> Producto - Codigo </v-col>
                  <v-col cols="12" md="3"> Precio - Presentación </v-col>
                  <v-col cols="12" md="3"> Cantidad </v-col>
                  <v-col cols="12" md="3"> Total </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card outlined tile v-for="(item, index) in carrito">
              <v-card-text class="text-h6 py-1">
                <v-row dense>
                  <v-col cols="12" md="3">
                    {{ item.nombre }} <br />
                    <span class="text-subtitle-1">{{ item.codigo }}</span>
                  </v-col>
                  <v-col cols="12" md="3">
                     {{ item.precio }}<br />
                    <span class="text-subtitle-1">Unidad</span>
                  </v-col>
                  <v-col cols="12" md="3">
                    {{ item.cantidad }}
                  </v-col>
                  <v-col cols="12" md="3">
                    Q {{ item.cantidad * item.precio }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4" height="100%">
        <v-card tile>
          <v-list>
            <v-list-item>
              <v-list-item-subtitle class="text-h6">
                Subtotal
              </v-list-item-subtitle>
              <v-list-item-title class="text-right text-h6 grey--text pr-3">
                Q {{ subtotal }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle class="text-h6">
                Descuento
              </v-list-item-subtitle>
              <v-list-item-title class="text-right">
                <v-text-field
                  v-model="descuento"
                  outlined
                  min="0"
                  type="number"
                  prefix="Q"
                  placeholder="##.##"
                  class="text-h6 elevation-0 grey--text right-input"
                ></v-text-field>
              </v-list-item-title>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-subtitle class="align-right text-h6">
                TOTAL
              </v-list-item-subtitle>
              <v-list-item-title class="text-right">
                <div class="d-flex flex-column">
                  <div>
                    <span class="text-h4">Q</span>
                    <span class="green--text text--darken-2 text-h2">
                      {{ subtotal - descuento }}
                    </span>
                  </div>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <div class="mx-4">
            <v-btn elevation="0" depressed block large color="green" dark>
              Procesar Venta
            </v-btn>
          </div>
          <v-list>
            <v-list-item>
              <v-list-item-subtitle class="text-h6">
                Efectivo
              </v-list-item-subtitle>
              <v-list-item-title class="text-right text-h6">
                0.00
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-subtitle class="text-h6">
                Cambio
              </v-list-item-subtitle>
              <v-list-item-title class="text-right text-h6">
                0.00
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BuscarParaVender from "../../../components/tienda/productos/buscarParaVender.vue";

import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
  components: { VNiceModal, ProductosPrecios, BuscarParaVender },
  mounted() {},
  data: () => ({
    isLoading: false,
    isNew: false,
    isFound: false,
    saved: false,
    carrito: [],
    descuento: 0,
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
    agregarProducto(e) {
      let codCarrito = e.carrito;

      let index = this.carrito.findIndex((e) => e.carrito == codCarrito);

      if (index >= 0) {
        this.carrito[index].cantidad = this.carrito[index].cantidad + 1;
        console.log(this.carrito[index].cantidad%3);
      } else {
        this.carrito.unshift(e);
      }
    },

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
    subtotal() {
      let t = 0;

      this.carrito.forEach((e) => {
        t += e.cantidad * e.precio;
      });

      return t;
    },
  },
};
</script>

<style scoped>
.right-input >>> input {
  text-align: right;
}
</style>
