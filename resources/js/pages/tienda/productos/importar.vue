<template>
  <div>
    <v-container>
      <div class="d-flex flex-column justify-start">
        <h1>Importar Productos</h1>
        <span class="subtitle-2 mb-2">
          Importa los productos desde un archivo de excel
        </span>
      </div>
      <v-card outlined elevation="0" class="rounded-lg">
        <v-card-title> Productos </v-card-title>
        <v-card-subtitle>
          Importa tus productos desde un archivo de excel
        </v-card-subtitle>
        <v-card-text>
          <v-btn
            color="green"
            dark
            link
            target="_blank"
            href="/files/plantilla_productos.xlsx"
          >
            <v-icon left>mdi-microsoft-excel</v-icon>
            Descargar Plantilla
          </v-btn>
          <v-btn
            color="primary"
            class="ml-1"
            @click="onButtonClick"
            :loading="isLoading"
          >
            <v-icon left>mdi-cloud-upload</v-icon>
            Cargar Archivo
          </v-btn>

          <input
            ref="uploader"
            class="d-none"
            accept=".xlsx"
            type="file"
            @change="subirArchivo"
          />

          <div style="height: 250px">
            <div
              class="d-flex justify-center alin-center pt-6 flex-column text-center"
            >
              <v-icon size="100">mdi-cloud-upload-outline</v-icon>
              <span class="caption text-h6"
                >Sube un archivo para procesar los productos</span
              >
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  mounted() {},
  beforeDestroy() {},
  data() {
    return {
      loading: false,
      isRead: false,
      isLoading: false,
      isError: false,
      subiendo: false,
      dialog: false,
      snackbar: false,
      buscar: "",
      text: "",
      isSelecting: false,
      actividades: [],
      alumnos: [],
      total: 0,
      importado: {},
    };
  },
  methods: {
    open() {
      this.dialog = true;

      this.buscar = "";
    },

    onButtonClick() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    subirArchivo(e) {
      this.subiendo = true;
      var data = new FormData();
      if (
        e.target.files[0]["type"] !=
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        this.$swal(
          "Formato No Válido",
          "El archivo debe estar en formato .xlsx de Microsoft Excel",
          "info"
        );
        this.subiendo = false;
        return false;
      }

      data.append("archivo", e.target.files[0]);
      data.append("_method", "POST");

      return this.$axios
        .post("/excel/importar", data)
        .finally(() => {
          this.subiendo = false;
        })
        .then((response) => {
          if (
            response.data.idmateria == this.materia.idmateria &&
            response.data.idunidad == this.unidad.idunidad
          ) {
            this.importado = response.data;
            this.isRead = true;
          } else {
            this.isError = true;
          }
          e.target.value = "";
        });
    },
    async guardar() {
      this.isLoading = true;
      await this.importar({
        id: this.materia.idmateria + "-" + this.unidad.idunidad,
        idunidad: this.unidad.idunidad,
        idmateria: this.materia.idmateria,
        inscripciones: this.estudiantes.map((e) => e.idinscripcion),
        ...this.importado,
      })
        .then((e) => {
          this.$emit("guardado");
          this.isRead = false;
        })
        .catch((err) => {
          console.log(err);
        });
      this.isRead = false;
      this.isLoading = false;
    },
  },
  computed: {
    load() {
      return this.isSelecting || this.subiendo;
    },
  },
};
</script>

<style>
</style>
