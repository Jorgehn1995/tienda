<template>
  <div>
    <productos-buscador
      @porcodigo="data = [$event]"
      @portexto="data = $event"
    ></productos-buscador>
    <v-row dense>
      <v-col :cols="cols" v-for="item in data">
        <v-card tile height="100%">
          <v-card-title class="pb-1">
            <v-icon left>mdi-barcode</v-icon>
            {{ item.codigo }}</v-card-title
          >
          <v-card-title class="py-1">{{ item.nombre }}</v-card-title>
          <v-card-text>
            <span class="title">
              {{ item.existencia }} unidades disponibles
            </span>
            <v-row dense>
              <v-col
                cols="12"
                :sm="cols_precios"
                v-for="precio in item.precios"
              >
                <v-card outlined class="mt-1" tile>
                  <v-card-text class="mx-0">
                    <v-row>
                      <v-col
                        cols="12"
                        class="d-flex justify-center align-center"
                      >
                        <productos-mostrar-precio
                          :precio="precio"
                        ></productos-mostrar-precio>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProductosMostrarPrecio from "../../../components/tienda/productos/productosMostrarPrecio.vue";
import ProductosBuscador from "../../../components/tienda/productos/productosBuscador.vue";
export default {
  components: { ProductosBuscador, ProductosMostrarPrecio },
  data: () => ({
    isLoading: false,
    data: [],
    nombre_precios: ["Unidad", "Media Docena", "Docena", "Ciento", "Millar"],
  }),

  computed: {
    cols() {
      switch (this.data.length) {
        case 1:
          return 12;
          break;
        case 2:
          return 6;
          break;

        default:
          return 4;
          break;
      }
    },
    cols_precios() {
      switch (this.data.length) {
        case 1:
          return 4;
          break;
        case 2:
          return 6;
          break;

        default:
          return 12;
          break;
      }
    },
  },
};
</script>

<style>
</style>
