<template>
  <div>
    <div class="d-flex justify-center align-center" v-if="isLoading.verify">
      <v-card outlined class="rounded-lg" width="450" height="350">
        <v-card-text>
          <div class="d-flex justify-center align-center" style="height: 350px">
            <v-progress-circular indeterminate></v-progress-circular>
          </div>
        </v-card-text>
      </v-card>
    </div>
    <div v-else-if="tipo != 1 && !caja.estado" class="d-flex justify-center">
      <v-card outlined class="rounded-lg mt-2" width="450">
        <v-card-title> Dispositivo No Reconocido </v-card-title>
        <v-card-subtitle>
          Este dispositivo no ha sido habilitado por un administrador para
          realizar operaciones de venta, solo los administradores pueden
          habilitar un dispositivo
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="teal" outlined disabled :loading="isLoading.status">
            <v-icon left>mdi-cellphone-link</v-icon>
            Habilitar Dispositivo
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-else-if="caja.estado">
      <slot
        v-bind:caja="caja"
        v-bind:cambiarEstado="cambiarEstado"
        v-bind:isLoading="isLoading.status"
      ></slot>
    </div>
    <div
      v-else-if="!caja.estado && caja.idcaja > 0"
      class="d-flex justify-center"
    >
      <v-card outlined class="rounded-lg" width="450">
        <v-card-title>
          Dispositivo Deshabilitado
          <v-icon>mdi-close</v-icon>
        </v-card-title>
        <v-card-subtitle>
          Este dispositivo ya ha sido registrado pero se encuentra deshabilitado
          y no puede ser utilizado para ventas
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="teal"
            outlined
            @click="cambiarEstado(caja)"
            :loading="isLoading.status"
          >
            <v-icon left>mdi-cellphone-link</v-icon>
            Habilitar Dispositivo
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div class="d-flex justify-center align-center" v-else>
      <v-card outlined class="rounded-lg" width="450">
        <v-card-title> Registrar Dispositivo </v-card-title>
        <v-card-subtitle>
          Registra este dispositivo para poder realizar ventas
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
            id="habilitar-dispositivo"
            @submit.prevent="save"
          >
            <form-text-field
              v-model="caja.nombre"
              label="Nombre del Dispositivo"
              placeholder="Indica el nombre del dispositivo"
              :rules="[rules.text.required, rules.text.min(5)]"
            ></form-text-field>
            <form-text-area
              v-model="caja.descripcion"
              :rules="[rules.text.required]"
              placeholder="Descripción del Dispositivo ej. 'Compu del Negocio'"
              label="Descripción"
              :rows="3"
            ></form-text-area>
            <p>
              {{
                "Navegador " +
                caja.navegador +
                " versión " +
                caja.version +
                " en " +
                caja.os
              }}
            </p>
            <v-alert type="error" text v-if="error.status">
              {{ error.msg }}
            </v-alert>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="$router.go(-1)">
            <v-icon left>mdi-chevron-left</v-icon>
            Regresar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            type="submit"
            form="habilitar-dispositivo"
            :loading="isLoading.save"
          >
            <v-icon left> mdi-content-save </v-icon>
            Registrar Caja
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import FormTextArea from "../forms/form-text-area.vue";
import FormTextField from "../forms/form-text-field.vue";
import rules from "@/configs/rules";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { FormTextField, FormTextArea },

  mounted() {
    //this.init();
    this.verificar();
  },
  data: () => ({
    isLoading: {
      verify: true,
      status: false,
      init: false,
      save: false,
    },
    registrado: false,
    caja: {
      idcaja: "",
      idusuario: 0,
      codigo: "",
      nombre: "",
      descripcion: "",
      usuario: "",
      navegador: "",
      version: "",
      os: "",
      estado: 0,
    },
    error: {
      status: false,
      msg: "",
    },
    keys: {
      id: "CAJA_ID",
      nombre: "CAJA_NOMBRE",
      estado: "CAJA_ESTADO",
    },
    rules,
    uuidv4,
  }),
  methods: {
    ...mapActions({ solicitar: "datos/solicitar" }),
    async verificar() {
      this.isLoading.verify = true;
      if (!this.CASH_CODE) {
        this.registrado = false;
        this.getOS();
      } else {
        let code = this.CASH_CODE;
        this.caja = this.obtener("/cajas/verificar/" + code);

        if (!this.caja.idcaja) {
          this.caja = await this.solicitar("/cajas/verificar/" + code);
        } else {
          this.solicitar("/cajas/verificar/" + code)
            .then((r) => {
              this.registrado = true;
              this.$emit("registrado");
              this.caja = r;
              localStorage.setItem("CASH_DATA", JSON.stringify(this.caja));
            })
            .catch((err) => {
              console.log(err);
              this.registrado = false;
              this.getOS();
            });
        }
      }
      this.isLoading.verify = false;
    },

    getOS() {
      var info = {
        sistemaOperativo: "",
        nombreNavegador: "",
        versionNavegador: "",
        plataforma: "",
        vendor: "",
      };

      // Sistema Operativo
      var plataforma = window.navigator.platform;
      if (plataforma.toLowerCase().includes("win")) {
        info.sistemaOperativo = "Windows";
      } else if (plataforma.toLowerCase().includes("mac")) {
        info.sistemaOperativo = "Mac";
      } else if (plataforma.toLowerCase().includes("linux")) {
        info.sistemaOperativo = "Linux";
      } else if (
        plataforma.toLowerCase().includes("iphone") ||
        plataforma.toLowerCase().includes("ipad")
      ) {
        info.sistemaOperativo = "iOS";
      } else if (plataforma.toLowerCase().includes("android")) {
        info.sistemaOperativo = "Android";
      } else {
        info.sistemaOperativo = "Desconocido";
      }

      // Nombre del Navegador
      var userAgent = window.navigator.userAgent.toLowerCase();
      if (userAgent.includes("chrome")) {
        info.nombreNavegador = "Chrome";
      } else if (userAgent.includes("firefox")) {
        info.nombreNavegador = "Firefox";
      } else if (userAgent.includes("safari")) {
        info.nombreNavegador = "Safari";
      } else if (userAgent.includes("edge")) {
        info.nombreNavegador = "Edge";
      } else if (userAgent.includes("opera") || userAgent.includes("opr")) {
        info.nombreNavegador = "Opera";
      } else {
        info.nombreNavegador = "Desconocido";
      }

      // Versión del Navegador
      // Versión del Navegador
      var version = "";
      if (info.nombreNavegador !== "Desconocido") {
        var versionIndex =
          userAgent.indexOf(info.nombreNavegador.toLowerCase()) +
          info.nombreNavegador.length +
          1;
        version = userAgent.substring(versionIndex).split(" ")[0];
      }
      info.versionNavegador = version;

      // Plataforma
      info.plataforma = plataforma;
      console.log(plataforma);

      // Vendor
      info.vendor = window.navigator.vendor;
      this.caja.navegador = info.nombreNavegador;
      this.caja.version = info.versionNavegador;
      this.caja.os = info.sistemaOperativo;
      this.caja.codigo = uuidv4();
    },
    cajaRegistrada(code) {
      localStorage.setItem("CASH_CODE", code);
    },

    async save() {
      if (this.$refs.form.validate()) {
        this.isLoading.save = true;
        await this.$axios
          .post("/cajas", this.caja)
          .then((result) => {
            this.cajaRegistrada(result.data.codigo);
            this.caja = result.data;
            this.$emit("registrado");
          })
          .catch((err) => {
            this.error.status = true;
            this.error.msg =
              "El nombre " + this.caja.nombre + " ya ha sido registrado";
          });
        this.isLoading.save = false;
      }
    },
    async cambiarEstado(caja) {
      this.isLoading.status = true;
      await this.$axios
        .get("/cajas/estado/" + caja.idcaja)
        .then((result) => {
          caja.estado = result.data.estado;
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLoading.status = false;
    },
  },
  computed: {
    ...mapGetters({ obtener: "datos/obtener" }),
    fecha() {
      return moment(this.caja.fecha).format("DD/MM/YYYY HH:mm");
    },
    CASH_CODE() {
      return localStorage.getItem("CASH_CODE");
    },
    tipo() {
      return this.$cookie.get("tipo") || 2;
    },
  },
};
</script>

<style></style>
