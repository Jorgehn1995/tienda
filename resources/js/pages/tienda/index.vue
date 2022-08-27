<template>
  <v-container>
    <v-row dense>
      <v-col cols="12" md="4">
        <v-card color="grey darken-1" dark to="/tienda/usuarios">
          <v-card-title>Usuarios</v-card-title>
          <v-card-text>Administra los usuarios de tus tiendas</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="blue darken-2" dark to="/tienda/clientes">
          <v-card-title>Clientes</v-card-title>
          <v-card-text>Administra los clientes de tus tiendas</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card color="purple darken-2" dark to="/tienda/productos">
          <v-card-title>Productos</v-card-title>
          <v-card-text>Administra los productos de tus tiendas</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
