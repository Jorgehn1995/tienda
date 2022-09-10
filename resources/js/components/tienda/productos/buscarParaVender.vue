<template>
  <div>
    <productos-buscador
      :elevation="0"
      @porcodigo="agregarProducto"
    ></productos-buscador>
  </div>
</template>

<script>
import ProductosBuscador from "./productosBuscador.vue";
export default {
  components: { ProductosBuscador },
  data: () => ({
    isLoading: false,
    producto: {
      codigo: "",
      nombre: "",
      cantidad: 1,
      precio: 0,
      total: 0,
      producto: {},
    },
  }),
  methods: {
    agregarProducto(e) {
      let p = JSON.parse(JSON.stringify(this.producto));

      p.codigo = e.codigo;
      p.nombre = e.nombre;
      p.cantidad = 1;
      p.precio = parseFloat(e.precio).toFixed(2);
      p.carrito = e.codigo + "-" + p.precio;

      this.$emit("producto", p);
    },
  },
};
</script>

<style>
</style>
