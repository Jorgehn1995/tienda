<template>
  <v-container>
    <div>
      <v-row>
        <v-col cols="12" sm="8" md="4" offset-sm="2" offset-md="4">
          <v-form ref="form">
            <v-card outlined elevation="3">
              <v-card-title> Agregar Cliente </v-card-title>
              <v-card-text class="py-2">
                <v-row>
                  <v-col cols="12" class="py-0">
                    <span class="subtitle">
                      NIT <span class="red--text">*</span>
                    </span>
                    <v-text-field
                      v-model="data.nit"
                      :rules="[rules.requerido, rules.min40]"
                      dense
                      outlined
                      prepend-icon="mdi-barcode"
                      placeholder="NIT"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <span class="subtitle">
                      Nombre <span class="red--text">*</span>
                    </span>
                    <v-text-field
                      v-model="data.nombre"
                      :rules="[rules.requerido, rules.min200]"
                      dense
                      outlined
                      prepend-icon="mdi-account-circle-outline"
                      placeholder="Nombre"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <span class="subtitle">
                      Telefono <span class="red--text">*</span>
                    </span>
                    <v-text-field
                      v-model="data.telefono"
                      :rules="[rules.requerido, rules.min200]"
                      dense
                      outlined
                      prepend-icon="mdi-phone-outline"
                      placeholder="Telefono"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="py-0">
                    <span class="subtitle">
                      Dirección <span class="red--text">*</span>
                    </span>
                    <v-textarea
                      v-model="data.direccion"
                      :rules="[rules.requerido, rules.min200]"
                      dense
                      outlined
                      prepend-icon="mdi-map-marker-outline"
                      placeholder="NIT"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-btn>
                  <v-icon left>mdi-chevron-left</v-icon>
                  Regresar
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="confirmar()"
                  :loading="isLoading"
                >
                  <v-icon left>mdi-content-save-outline</v-icon>
                  Guardar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>

      <v-nice-modal v-model="saved" @go="confirmado()">
        <template v-slot:titulo> Registro Guardado </template>
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
  mounted() {},
  data: () => ({
    isLoading: false,

    saved: false,
    data: {
      idcliente: 0,
      nit: "",
      nombre: "",
      telefono: "",
      direccion: "",
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
    confirmar() {
      if (this.$refs.form.validate()) {
        this.guardar();
      }
    },
    async guardar() {
      this.isLoading = true;

      await this.$axios
        .post("/clientes", this.data)
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
};
</script>

<style>
</style>
