<template>
  <div>
    <v-container>
      <v-card outlined elevation="0" class="rounded-lg">
        <v-card-title> Revision de Productos </v-card-title>
        <v-card-subtitle>
          Revision de Productos que no tienen precios
        </v-card-subtitle>
        <v-card-text>
          <v-btn @click="getProductos" :loading="isLoading" color="primary">
            <v-icon left>mdi-hexagon-multiple-outline</v-icon>
            Iniciar Revision
          </v-btn>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">#</th>
                  <th class="text-left">Proceso</th>
                  <th>Resultado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Precios Creados</td>
                  <td>
                    {{ productos.precios }}
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Costos Actualizados</td>
                  <td>
                    {{ productos.costos }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    productos: {
      precios: -1,
      costos: -1,
    },
  }),
  methods: {
    async getProductos() {
      this.isLoading = true;
      await this.$axios
        .get("/revision/productos")
        .then((result) => {
          this.productos = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.isLoading = false;
    },
  },
};
</script>

<style>
</style>
