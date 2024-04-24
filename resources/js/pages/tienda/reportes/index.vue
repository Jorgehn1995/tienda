<template>
  <div>
    <v-container>
      <h1>Reporte de Ventas</h1>
      <span class="subtitle-2 mb-2">
        Revisa el reporte de ventas por fechas
      </span>
      <v-row dense class="mt-2">
        <v-col cols="12" sm="6" md="4">
          <widget-small
            title="Costos"
            description="Costos de las ventas realizadas"
            :size="18"
          >
            <mostrar-precio
              :size="30"
              v-model="totales.costos"
            ></mostrar-precio>
          </widget-small>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <widget-small
            color="green"
            dark
            title="Ganancias"
            description="Ganancias obtenidas sobre las ventas realizadas"
            :size="18"
          >
            <mostrar-precio
              :size="30"
              v-model="totales.ganancias"
            ></mostrar-precio>
          </widget-small>
        </v-col>
        <v-col cols="12" sm="6" md="4">
          <widget-small
            color="primary"
            title="Total"
            dark
            description="Total de Ventas Realizadas"
            :size="18"
          >
            <mostrar-precio :size="30" v-model="totales.total"></mostrar-precio>
          </widget-small>
        </v-col>
        <v-col cols="12 " md="4">
          <v-card class="rounded-lg" elevation="0">
            <v-card-title> Totales </v-card-title>
            <v-card-text class="mx-0">
              <v-list dense>
                <v-list-item>
                  <v-list-item-title> Fecha de Inicio </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    {{ formato_inicio }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Fecha de Finalización </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    {{ formato_fin }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Articulos </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    {{ totales.articulos }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Subtotal </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    <mostrar-precio :value="totales.subtotal"></mostrar-precio>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Descuentos </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    <mostrar-precio :value="totales.descuento"></mostrar-precio>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Total </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    <mostrar-precio :value="totales.total"></mostrar-precio>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <v-list-item-title> Costos </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    <mostrar-precio :value="totales.costos"></mostrar-precio>
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title> Ganancias </v-list-item-title>
                  <v-list-item-subtitle class="text-right grey--text">
                    <mostrar-precio :value="totales.ganancias"></mostrar-precio>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <venta-reporte-total
                :value="{
                  totales: totales,
                  fechas: {
                    inicio: formato_inicio,
                    fin: formato_fin,
                  },
                }"
                style="width: 100%"
                class="px-2"
              >
                <template v-slot:default="{ open, loading }">
                  <v-btn
                    outlined
                    block
                    color="primary"
                    @click="open"
                    :loading="loading"
                  >
                    <v-icon left>mdi-printer</v-icon>
                    Imprimir
                  </v-btn>
                </template>
              </venta-reporte-total>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="12 " md="8">
          <v-card class="rounded-lg" elevation="0">
            <v-card-title> Transacciones Realizadas </v-card-title>
            <v-card-subtitle>
              Transacciones realizadas entre el inicio hasta el fin
            </v-card-subtitle>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="5">
                  <form-text-field
                    v-model="inicio"
                    type="date"
                    outlined
                    placeholder="Fecha de Inicio"
                    label="Fecha de Inicio"
                    hide-details=""
                  ></form-text-field>
                </v-col>
                <v-col cols="12" md="5">
                  <form-text-field
                    v-model="fin"
                    type="date"
                    outlined
                    placeholder="Fecha de Inicio"
                    label="Fecha de Finalización"
                  ></form-text-field>
                </v-col>
                <v-col cols="12" md="2" class="d-flex justify-center mt-1">
                  <v-btn color="primary" block @click="cargar()">
                    Consultar
                    <v-icon>mdi-chevron-right</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">#</th>
                      <th class="text-left">Fecha</th>
                      <th class="text-left">
                        Caja/
                        <br />
                        Turno
                      </th>

                      <th class="text-left">Venta</th>
                      <th class="text-left">Costos</th>
                      <th class="text-left">Ganancias</th>
                      <th>
                        <v-icon> mdi-dots-vertical </v-icon>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="ventas.length == 0">
                      <td colspan="7" class="text-center">
                        No hay ventas para mostrar
                      </td>
                    </tr>
                    <tr v-else v-for="(venta, i) in ventas" :key="i + 'v'">
                      <td>{{ i + 1 }}</td>
                      <td>
                        <span style="white-space: nowrap">
                          {{ moment(venta.created_at).format("DD/MM/YY") }}
                        </span>
                        <span style="white-space: nowrap">
                          {{ moment(venta.created_at).format("hh:mm a") }}
                        </span>
                      </td>
                      <td>
                        <v-list dense v-if="venta.turno">
                          <v-list-item class="px-0">
                            <v-list-item-content>
                              <v-list-item-subtitle>
                                {{ venta.turno.caja.nombre }}
                                / Turno
                                {{ venta.turno.idturno }}
                              </v-list-item-subtitle>
                              <v-list-item-title>
                                {{ venta.cliente_nombre || "Consumidor Final" }}
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Atendió
                                {{ venta.cajero_nombre }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <div v-else>Turno no Registrado</div>
                      </td>

                      <td>
                        <mostrar-precio
                          :size="11"
                          :value="venta.total"
                        ></mostrar-precio>
                      </td>
                      <td>
                        <mostrar-precio
                          :size="11"
                          :value="venta.costos || 0"
                        ></mostrar-precio>
                      </td>
                      <td>
                        <mostrar-precio
                          :size="11"
                          :value="venta.ganancias || 0"
                        ></mostrar-precio>
                      </td>
                      <td>
                        <venta-detalles v-model="ventas[i]"></venta-detalles>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VentaReporteTotal from "../../../components/venta/venta-reporte-total.vue";
import WidgetSmall from "../../../components/common/widget-small.vue";
import VentaDetalles from "../../../components/venta/venta-detalles.vue";
import MostrarPrecio from "../../../components/productos/mostrarPrecio.vue";
import moment from "moment";
import FormTextField from "../../../components/forms/form-text-field.vue";

export default {
  components: {
    FormTextField,
    MostrarPrecio,
    VentaDetalles,
    WidgetSmall,
    VentaReporteTotal,
  },
  beforeMount() {
    this.inicio = moment().format("Y-MM-DD");
    this.fin = moment().format("Y-MM-DD");
    this.cargar();
  },
  data: () => ({
    isLoading: false,
    isProcesed: false,
    inicio: "",
    fin: "",
    totales: {
      articulos: 0,
      costos: 0,
      subtotal: 0,
      descuento: 0,
      ganancias: 0,
      total: 0,
    },
    ventas: [],
    populares: [],
    moment,
  }),
  methods: {
    async cargar() {
      this.isLoading = true;
      await this.$axios
        .get("reporte/" + this.inicio + "/" + this.fin)
        .then((result) => {
          this.totales = result.data.totales;
          this.ventas = result.data.ventas;
          console.log(result.data.ventas);
          console.log(this.ventas);
          this.populares = result.data.populares;
        })
        .catch((err) => {});
      this.isLoading = false;
    },
    async imprimir() {
      await this.$axios
        .post("/impresiones/reporte/total", {
          inicio: this.inicio,
          fin: this.fin,
          articulos: this.totales.articulos,
          totales: this.totales,
        })
        .then((result) => {
          this.limpiar();
        })
        .catch((err) => {
          console.log("error");
        });
    },

    async recibo(id) {
      this.isProcesed = true;
      await this.$axios
        .post("/impresiones/recibos/" + id)
        .then((result) => {
          this.limpiar();
        })
        .catch((err) => {
          console.log("error");
        });
      this.isProcesed = false;
    },
  },
  computed: {
    formato_inicio() {
      if (!this.inicio) {
        return "Selecciona una fecha";
      } else {
        return this.$moment(this.inicio).format("DD/MM/YYYY h:m a");
      }
    },
    formato_fin() {
      if (!this.fin) {
        return "Selecciona una fecha";
      } else {
        return this.$moment(this.fin).format("DD/MM/YYYY h:m a");
      }
    },
  },
};
</script>

<style></style>
