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
          <v-btn color="primary" class="ml-1">
            <v-icon left>mdi-cloud-upload</v-icon>
            Cargar Archivo
          </v-btn>
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
  data: () => ({
    isLoading: false,
  }),
};
</script>

<style>
</style>
