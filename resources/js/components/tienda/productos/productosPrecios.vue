<template>
  <div>
    <div v-shortkey="['ctrl', 1]" @shortkey="skPreciosFocus"></div>
    <div v-shortkey="['ctrl', 0]" @shortkey="agregarPrecio()"></div>

    <div v-for="(precio, index) in precios">
      <v-row dense>
        <v-col cols="3" class="py-0">
          <span class="subtitle">
            Cantidad de Unidades <span class="red--text">*</span>
          </span>
          <v-text-field
            type="number"
            :disabled="index == 0"
            :ref="'cantidad' + index"
            v-model="precios[index].cantidad"
            :rules="[rules.min1]"
            @keyup="renombrarPrecio(index)"
            :hint="
              'Precio Normal: Q' +
              (precios[index].cantidad || 0) * precios[0].precio
            "
            persistent-hint
            dense
            outlined
            prepend-icon="mdi-food-apple-outline"
            placeholder="###"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="py-0">
          <span class="subtitle">
            Precio
            <span v-if="index > 0">
              <strong>
                {{ "Costo Q" + calcularCosto(precios[index]) }}
              </strong>
            </span>
            <span class="red--text">*</span>
          </span>
          <v-text-field
            :ref="'precio' + index"
            v-model="precios[index].precio"
            :hint="'Ganancia Q' + calcularGanancia(precios[index])"
            persistent-hint
            type="number"
            :rules="[rules.min0]"
            dense
            outlined
            prefix="Q"
            placeholder="00.00"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="py-0">
          <span class="subtitle"> Nombre Precio</span>
          <v-text-field
            :ref="'nombre' + index"
            v-model="precios[index].nombre"
            persistent-hint
            dense
            outlined
            prepend-icon="mdi-card-text-outline"

          ></v-text-field>
        </v-col>

        <v-col cols="1" class="d-flex justify-center align-center">
          <v-btn
            icon
            :disabled="precios[index].cantidad == 1"
            @click="eliminarPrecio(index)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <div class="mb-2">
        <v-divider></v-divider>
      </div>
    </div>

    <div>
      <v-btn outlined @click="agregarPrecio" color="accent">
        Agregar Precio [CTRL+0]
      </v-btn>
      <v-btn
        text
        v-for="t in nombres"
        :color="t.nombre == 'Agregar Precio' ? 'primary' : ''"
        :outlined="t.nombre == 'Agregar Precio'"
        :large="t.nombre == 'Agregar Precio'"
        @click="agregarPrecio(t)"
        >{{ t.nombre }}</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    costo: {
      type: [Number, String],
      default: 0,
    },
  },
  data: () => ({
    nombrePrecios: {
      1: "Unidad",
      6: "Media Docena",
      12: "Docena",
      50: "Medio Ciento",
      100: "Ciento",
      1000: "Millar",
    },
    nombres: [
      { cantidad: 1, nombre: "Unidad" },
      { cantidad: 6, nombre: "Media Docena" },
      { cantidad: 12, nombre: "Docena" },
      { cantidad: 50, nombre: "Medio Ciento" },
      { cantidad: 100, nombre: "Ciento" },
      { cantidad: 1000, nombre: "Millar" },
    ],
    rules: {
      requerido: (v) => !!v || "Campo Requerido",

      min0: (v) => v > 0 || "El precio debe ser mayor a 0",
      min1: (v) => v >= 1 || "La cantidad debe ser mayor a 0",
    },
  }),
  methods: {
    agregarPrecio(precio) {
      if (!precio) {
        this.precios.push({
          cantidad: "",
          nombre: "",
          precio: "",
        });
      } else {
        this.precios.push({
          cantidad: precio.cantidad,
          nombre: precio.nombre,
          precio: "",
        });
      }

      let name = "cantidad" + (this.precios.length - 1);
      this.$nextTick(() => {
        this.$refs[name][0].$refs.input.focus();
      });
    },
    eliminarPrecio(index) {
      this.precios.splice(index, 1);
    },

    skPreciosFocus() {
      this.$refs["precio0"][0].$refs.input.focus();
    },
    renombrarPrecio(index, cantidad) {
      let nombre = this.nombrePrecios[this.precios[index].cantidad];
      if (nombre) {
        this.precios[index].nombre = nombre;
      } else {
        this.precios[index].nombre = "";
      }
    },
    calcularCosto(p) {
      return (this.costo || 0) * (p.cantidad || 0);
    },
    calcularGanancia(p) {
      let precio = p.precio;
      return precio - this.calcularCosto(p);
    },
  },
  computed: {
    precios: {
      get() {
        return this.value;
      },
      set(n) {
        this.$emit("input", n);
      },
    },
  },
};
</script>

<style>
</style>
