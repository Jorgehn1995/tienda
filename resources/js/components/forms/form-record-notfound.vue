<template>
  <v-card elevation="0" height="350" outlined class="rounded-lg">
    <div
      style="height: 100%"
      class="d-flex justify-center align-center flex-column"
      tyle="height: 100%"
    >
      <div v-if="isLoading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <div
        v-else
        class="d-flex justify-center align-center flex-column"
        tyle="height: 100%"
      >
        <v-icon color="grey" size="100">mdi-file-search-outline</v-icon>
        <span class="text-center my-2 grey--text font-weight-medium"
          >Registro no encontrado</span
        >
        <v-btn @click="$router.go(-1)" text>
          <v-icon left>mdi-arrow-left</v-icon>
          Regresar
        </v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
