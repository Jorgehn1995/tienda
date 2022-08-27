<template>
  <v-container>
    <div>
      <v-row dense>
        <v-col cols="12">
          <v-form ref="formCodigo" @submit="buscar">
            <v-card outlined elevation="3">
              <v-card-title> Codigo de Producto </v-card-title>
              <v-card-text>
                <v-row dense>
                  <v-col cols="12" sm="10">
                    <v-text-field
                      v-model="data.codigo"
                      :rules="[rules.requerido]"
                      ref="buscarCodigo"
                      prepend-icon="mdi-barcode"
                      placeholder="Ingrese el Codigo"
                      @keypress.enter="buscar"
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
                      color="primary"
                      @click="buscar"
                      :loading="isLoading"
                    >
                      Buscar
                      <v-icon right>mdi-cloud-search-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-form>
        </v-col>
        <v-col cols="12" md="4">
          <v-card outlined elevation="3" v-if="isFound">
            <v-card-title>
              Producto
              <v-chip color="green--text" class="v-chip--active" v-if="isNew">
                Producto Nuevo
              </v-chip>
            </v-card-title>

            <v-card-text class="py-2">
              <v-row>
                <v-col cols="12" class="py-0">
                  <span class="subtitle">
                    Codigo <span class="red--text">*</span>
                  </span>
                  <v-text-field
                    v-model="data.codigo"
                    ref="codigo"
                    :rules="[rules.requerido]"
                    dense
                    outlined
                    prepend-icon="mdi-barcode"
                    placeholder="Nombre"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <span class="subtitle">
                    Nombre <span class="red--text">*</span>
                  </span>
                  <v-text-field
                    ref="nombre"
                    v-model="data.nombre"
                    :rules="[rules.requerido, rules.min200]"
                    dense
                    outlined
                    prepend-icon="mdi-account-circle-outline"
                    placeholder="Nombre"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <span class="subtitle"> Costo </span>
                  <v-text-field
                    ref="costo"
                    v-model="data.costo"
                    dense
                    outlined
                    prepend-icon="mdi-hand-coin-outline"
                    placeholder="Telefono"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card outlined elevation="3" v-if="isFound">
            <v-card-title> Stock Actual {{ data.existencia }} </v-card-title>
            <v-card-text class="py-2">
              <v-row>
                <v-col cols="12" class="py-0">
                  <span class="subtitle">
                    Caducidad <span class="red--text">*</span>
                  </span>
                  <v-text-field
                    v-model="data.caducidad"
                    ref="Fecha de vencimiento"
                    type="date"
                    :rules="[rules.requerido]"
                    dense
                    outlined
                    prepend-icon="mdi-calendar-outline"
                    placeholder="Nombre"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="py-0">
                  <span class="subtitle">
                    Agregar Stock <span class="red--text">*</span>
                  </span>
                  <v-text-field
                    ref="nombre"
                    v-model="data.nombre"
                    :rules="[rules.requerido, rules.min200]"
                    dense
                    outlined
                    prepend-icon="mdi-package-variant-plus"
                    placeholder="Agregar Existencias"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

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
  </v-container>
</template>

<script>
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
  components: { VNiceModal },
  mounted() {
    this.$refs.buscarCodigo.$refs.input.focus();
  },
  data: () => ({
    isLoading: false,
    isNew: false,
    isFound: false,
    saved: false,
    data: {
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
    },
  }),
  methods: {
    async buscar(e) {
      e.preventDefault();
      if (this.$refs.formCodigo.validate()) {
        this.isLoading = true;
        this.$axios
          .get("/productos/" + this.data.codigo)
          .then((result) => {
            this.isLoading = false;
            this.data = result.data;
            this.isNew = result.data.nombre == "";
            this.isFound = true;
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
    confirmar() {
      if (this.$refs.form.validate()) {
        this.procesar();
      }
    },
    async procesar() {
      this.isLoading = true;

      await this.$axios
        .put("/usuarios/" + this.id, this.data)
        .then((result) => {
          console.log(result.data);
          this.saved = true;
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
