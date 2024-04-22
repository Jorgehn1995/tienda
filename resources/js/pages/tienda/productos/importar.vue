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
        <div class="px-2">
          <v-btn
            color="green"
            dark
            link
            target="_blank"
            href="/files/plantilla_productos.xlsx"
            outlined
          >
            <v-icon left>mdi-microsoft-excel</v-icon>
            Descargar Plantilla
          </v-btn>
          <v-btn
            color="primary"
            class="ml-1"
            @click="onButtonClick"
            :loading="subiendo || isLoading"
            outlined
          >
            <v-icon left>mdi-cloud-upload</v-icon>
            Cargar Archivo
          </v-btn>
          <v-btn
            color="primary"
            class="ml-1"
            :disabled="importado.length == 0"
            @click="guardar"
            :loading="isSaving"
          >
            <v-icon left>mdi-content-save</v-icon>
            Guardar Productos
          </v-btn>
        </div>
        <v-card-text>
          <v-alert color="primary" text class="mt-2" v-if="isSaved">
            <strong>Productos Importados</strong>: Se han importado los
            productos con exito
          </v-alert>
          <input
            ref="uploader"
            class="d-none"
            accept=".xlsx"
            type="file"
            @change="subirArchivo"
          />

          <div style="height: 250px" v-if="importado.length == 0">
            <div
              class="d-flex justify-center alin-center pt-6 flex-column text-center"
            >
              <v-icon size="100">mdi-cloud-upload-outline</v-icon>
              <span class="caption text-h6"
                >Sube un archivo para procesar los productos</span
              >
            </div>
          </div>
          <div v-else>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">#</th>
                    <th class="text-left">
                      Código <br />
                      Existente
                    </th>
                    <th class="text-left">Codigo</th>
                    <th class="text-left">Producto</th>
                    <th class="text-left">Marca</th>
                    <th class="text-left">Dimensión</th>
                    <th class="text-left">Detalle</th>
                    <th class="text-left">Presentacion</th>
                    <th class="text-left">Unidades</th>
                    <th class="text-left">Costo</th>

                    <th class="text-left">
                      Precio <br />
                      de Venta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(producto, index) in importado">
                    <tr
                      v-for="(item, index2) in producto"
                      :key="'item' + index + index2"
                    >
                      <td>
                        {{ item[0] }}
                      </td>
                      <td>
                        <v-chip color="red" dark v-if="item[12] > 0" x-small>
                          Si
                        </v-chip>
                        <span v-else> No </span>
                      </td>
                      <td>
                        <v-chip
                          :color="color(index % 5) + '--text'"
                          class="v-chip--active"
                          small
                        >
                          {{ item[1] }}
                        </v-chip>
                      </td>
                      <td>
                        <span v-if="item[2]">
                          {{ item[2] }}
                        </span>
                        <span v-else class="text-center">
                          <v-icon small>mdi-arrow-up</v-icon>
                        </span>
                      </td>
                      <td>
                        <span v-if="index2 == 0">
                          {{ item[3] }}
                        </span>
                        <span v-else class="text-center">
                          <v-icon small>mdi-arrow-up</v-icon>
                        </span>
                      </td>
                      <td>
                        <span v-if="index2 == 0">
                          {{ item[4] }}
                        </span>
                        <span v-else class="text-center">
                          <v-icon small>mdi-arrow-up</v-icon>
                        </span>
                      </td>
                      <td>
                        <span v-if="index2 == 0">
                          {{ item[5] }}
                        </span>
                        <span v-else class="text-center">
                          <v-icon small>mdi-arrow-up</v-icon>
                        </span>
                      </td>
                      <td>
                        {{ item[6] }}
                      </td>
                      <td class="text-right">
                        {{ item[7] }}
                      </td>
                      <td>
                        <span v-if="item[8]">
                          <mostrar-precio
                            :size="12"
                            :value="item[8]"
                          ></mostrar-precio>
                        </span>
                        <span v-else> --- </span>
                      </td>

                      <td>
                        <span v-if="item[9]">
                          <mostrar-precio
                            :size="12"
                            :value="item[9] * item[7]"
                          ></mostrar-precio>
                        </span>
                        <span v-else>
                          <mostrar-precio
                            :size="12"
                            :value="item[10]"
                          ></mostrar-precio>
                        </span>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import MostrarPrecio from "../../../components/productos/mostrarPrecio.vue";
export default {
  components: { MostrarPrecio },
  mounted() {},
  beforeDestroy() {},
  data() {
    return {
      isLoading: false,
      isSaving: false,
      subiendo: false,
      isSelecting: false,
      isSaved: false,
      isImport: false,
      importado: [],
    };
  },
  methods: {
    color(i) {
      switch (i) {
        case 0:
          return "primary";
          break;
        case 2:
          return "secondary";
          break;
        case 3:
          return "accent";
          break;
        case 4:
          return "surface";
          break;
        case 5:
          return "grey";
          break;

        default:
          break;
      }
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
          this.isImport = true;
          this.subiendo = false;
        })
        .then((response) => {
          this.importado = response.data;
          e.target.value = "";
        });
    },
    async guardar() {
      this.isSaving = true;
      await this.$axios
        .post("/excel/guardar", { importado: this.importado })
        .then((e) => {
          this.importado = [];
          this.isSaved = true;
        })
        .catch((r) => {
          console.log(r);
        });
      this.isSaving = false;
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
