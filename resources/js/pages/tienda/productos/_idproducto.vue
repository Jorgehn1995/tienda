<template>
  <div>
    <v-container>
      <div class="d-flex justify-center align-center" v-if="isLoading">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <div v-else>
        <v-row dense>
          <v-col cols="12">
            <v-card class="rounded-lg" color="teal" dark elevation="0" outlined>
              <div
                class="d-flex justify-center align-center"
                style="font-size: 1.5em !important"
              >
                <v-card-subtitle>
                  <v-icon left>mdi-barcode</v-icon>
                  {{ producto.codigo }}
                </v-card-subtitle>
              </div>
              <v-card-title
                class="d-flex justify-center align-center"
                style="font-size: 1.5em !important"
              >
                {{ producto.nombre }} {{ producto.marca }}
                {{ producto.dimension }}
              </v-card-title>
            </v-card>
          </v-col>
          <v-col cols="12" md="8" lg="9">
            <v-row dense>
              <v-col cols="12" md="12">
                <v-card outlined elevation="0" class="rounded-lg">
                  <v-card-title> Presentaciones </v-card-title>
                  <v-card-subtitle>
                    Revisa las presentaciones del producto, sus costos y
                    ganancias
                  </v-card-subtitle>
                  <v-divider inset> </v-divider>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Presentacion</th>
                          <th class="text-center">
                            {{ producto.unidades }}
                          </th>
                          <th class="text-center">Costo</th>
                          <th class="text-center">Precio</th>
                          <th class="text-center">Ganancia</th>
                          <th class="text-center">Margen</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(precio, i) in producto.precios"
                          :key="precio.idprecio"
                        >
                          <td>
                            {{ precio.nombre }}
                          </td>
                          <td class="text-center">
                            <span style="white-space: nowrap">
                              {{ precio.cantidad }}
                              {{ producto.unidades }}
                            </span>
                          </td>
                          <td>
                            <mostrar-precio
                              v-model="precio.costo"
                            ></mostrar-precio>
                          </td>
                          <td>
                            <mostrar-precio
                              v-model="precio.precio"
                            ></mostrar-precio>
                          </td>

                          <td>
                            <mostrar-precio
                              :value="precio.precio - precio.costo"
                            ></mostrar-precio>
                          </td>
                          <td>
                            <div class="d-flex justify-space-between">
                              <div>
                                <v-progress-circular
                                  color="primary"
                                  class="ml-1"
                                  :value="
                                    Math.round(
                                      ((precio.precio - precio.costo) /
                                        precio.precio) *
                                        100
                                    )
                                  "
                                ></v-progress-circular>
                              </div>
                              <div>
                                {{
                                  Math.round(
                                    ((precio.precio - precio.costo) /
                                      precio.precio) *
                                      100
                                  )
                                }}%
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-col>
              <v-col cols="12" md="12">
                <v-card outlined elevation="0" class="rounded-lg">
                  <v-card-title> Existencias Actuales </v-card-title>
                  <v-card-subtitle>
                    Revisa las existencias actuales del producto y cuales serán
                    los ingresos y ganancias previstas
                  </v-card-subtitle>
                  <v-divider inset> </v-divider>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">Presentacion</th>

                          <th class="text-center">Existencias</th>

                          <th class="text-center">Costos</th>
                          <th class="text-center">
                            Ingresos
                            <br />
                            Previstos
                          </th>
                          <th class="text-center">
                            Ganancia
                            <br />
                            Previstas
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(precio, i) in producto.precios"
                          :key="precio.idprecio"
                        >
                          <td>
                            <mostrar-presentacion
                              :nombre="precio.nombre"
                              :cantidad="precio.cantidad"
                              :medidas="producto.unidades"
                            ></mostrar-presentacion>
                          </td>

                          <td class="text-center">
                            <strong>
                              {{ cantidades[precio.idprecio] || 0 }}
                            </strong>
                          </td>
                          <td>
                            <mostrar-precio
                              :value="
                                (cantidades[precio.idprecio] || 0) *
                                precio.costo
                              "
                            ></mostrar-precio>
                          </td>

                          <td>
                            <mostrar-precio
                              :value="
                                (cantidades[precio.idprecio] || 0) *
                                precio.precio
                              "
                            ></mostrar-precio>
                          </td>
                          <td>
                            <mostrar-precio
                              :value="
                                (cantidades[precio.idprecio] || 0) *
                                  precio.precio -
                                (cantidades[precio.idprecio] || 0) *
                                  precio.costo
                              "
                            ></mostrar-precio>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-card>
              </v-col>
              <v-col cols="12" md="12">
                <v-card elevation="0" class="rounded-lg" outlined>
                  <v-card-title> Ventas del Producto </v-card-title>
                  <v-card-subtitle>
                    Rango de fechas donde se analizan las ventas
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-text>
                    <v-row dense>
                      <v-col cols="12" md="5">
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="fecha"
                          persistent
                          width="450px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="fecha"
                              prepend-icon="mdi-calendar"
                              readonly
                              class="rounded-lg"
                              v-bind="attrs"
                              v-on="on"
                              outlined
                              dense
                              hide-details=""
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fecha"
                            range
                            scrollable
                            width="450"
                            locale="es-gt"
                          >
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="modal = false">
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.dialog.save(fecha)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-dialog>
                      </v-col>
                      <v-col cols="12" md="5">
                        <v-select
                          :items="formatos"
                          v-model="format"
                          outlined
                          class="rounded-lg"
                          dense
                          prepend-icon="mdi-chart-box-outline"
                        >
                        </v-select>
                      </v-col>
                      <v-col cols="12" md="2">
                        <v-btn
                          :loading="isLoadingSales"
                          block
                          color="primary"
                          @click="obtenerVentas"
                        >
                          Generar
                        </v-btn>
                      </v-col>
                    </v-row>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Presentacion</th>
                            <th class="text-left">Vendidos</th>
                            <th>
                              {{ producto.unidades }}
                              <br />
                              Vendidas
                            </th>
                            <th>Costos</th>
                            <th>Total</th>
                            <th>Ganancia</th>
                            <th>Porcentaje</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(precio, i) in ventas.precios"
                            :key="precio.idprecio"
                          >
                            <td>
                              <mostrar-presentacion
                                :nombre="precio.nombre"
                                :cantidad="precio.cantidad"
                                :medidas="producto.unidades"
                              ></mostrar-presentacion>
                            </td>

                            <td>
                              {{ precio.vendidos_cantidad }}
                            </td>
                            <td>
                              {{ precio.vendidos_unidades }}
                            </td>
                            <td>
                              Q
                              {{ precio.vendidos_costos }}
                            </td>
                            <td>
                              Q
                              {{ precio.vendidos_total }}
                            </td>
                            <td>
                              Q
                              {{ precio.vendidos_ganancia }}
                            </td>
                            <td>
                              {{
                                (precio.vendidos_total /
                                  producto.vendidos_total) *
                                  100 +
                                "%"
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Total Ventas</strong>
                            </td>
                            <td>
                              <strong>
                                {{ producto.vendidos_cantidad }}
                              </strong>
                            </td>
                            <td>
                              <strong>
                                {{ producto.vendidos_unidades }}
                              </strong>
                            </td>
                            <td>
                              <strong> Q{{ producto.vendidos_costos }} </strong>
                            </td>
                            <td>
                              <strong> Q{{ producto.vendidos_total }} </strong>
                            </td>
                            <td>
                              <strong>
                                Q{{ producto.vendidos_ganancia }}
                              </strong>
                            </td>
                            <td>
                              <strong> 100 </strong>
                            </td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" v-if="false">
                <v-card
                  outlined
                  elevation="0"
                  class="rounded-lg"
                  height="100%"
                  v-if="isLoadingSales"
                >
                  <v-skeleton-loader type="article"></v-skeleton-loader>
                  <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-card>

                <v-card
                  v-else
                  outlined
                  elevation="0"
                  class="rounded-lg"
                  height="100%"
                >
                  <v-card-title> Más Vendidas </v-card-title>
                  <v-card-subtitle>
                    Presentaciones más vendidas
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div class="d-flex flex-column flex-grow-1">
                      <div class="px-2">
                        <div class="title mb-1">Presentaciones Vendidas</div>
                        <div class="text-h5">
                          {{ ventas.vendidos_cantidad }}
                          Presentaciones
                        </div>

                        <div class="info--text text--lighten-1 my-1">
                          Presentaciones vendidas durante los
                          {{ moment(fecha[1]).diff(moment(fecha[0]), "days") }}
                          analizados
                        </div>
                      </div>
                    </div>
                    <grafica-pie
                      :labels="graficaVendidos.labels"
                      :series="graficaVendidos.series"
                      chart-id="g2"
                      :key="'gb1' + updates"
                      :legend="true"
                      :names="$vuetify.breakpoint.smAndUp"
                      :palette="palette"
                    ></grafica-pie>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" v-if="false">
                <v-card
                  outlined
                  elevation="0"
                  class="rounded-lg"
                  height="100%"
                  v-if="isLoadingSales"
                >
                  <v-skeleton-loader type="article"></v-skeleton-loader>
                  <v-skeleton-loader type="image"></v-skeleton-loader>
                </v-card>

                <v-card
                  v-else
                  outlined
                  elevation="0"
                  class="rounded-lg"
                  height="100%"
                >
                  <v-card-title> Ganancias </v-card-title>
                  <v-card-subtitle>
                    Presentaciones que dejan mayor cantidad de Ganancia
                  </v-card-subtitle>
                  <v-divider></v-divider>
                  <v-card-text>
                    <div class="d-flex flex-column flex-grow-1">
                      <div class="px-2">
                        <div class="title mb-1">Ganancias Totales</div>
                        <div class="text-h5">
                          {{ ventas.vendidos_ganancia | formatCurrency }}
                        </div>

                        <div class="info--text text--lighten-1 my-1">
                          Presentaciones vendidas durante los
                          {{ moment(fecha[1]).diff(moment(fecha[0]), "days") }}
                          analizados
                        </div>
                      </div>
                    </div>
                    <grafica-pie
                      :labels="graficaGanancias.labels"
                      :series="graficaGanancias.series"
                      :key="'gb2' + updates"
                      :legend="true"
                      chart-id="g3"
                      :names="$vuetify.breakpoint.smAndUp"
                      :palette="palette"
                    ></grafica-pie>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="12" v-if="false">
                <v-card outlined elevation="0" class="rounded-lg">
                  <v-card-title> Presentaciones Vendidas </v-card-title>

                  <v-card-subtitle>
                    Presentaciones vendidas por {{ format }}
                  </v-card-subtitle>
                  <v-divider inset> </v-divider>
                  <v-card-text>
                    <v-card
                      outlined
                      elevation="0"
                      class="rounded-lg"
                      height="100%"
                      v-if="isLoadingSales"
                    >
                      <v-skeleton-loader type="article"></v-skeleton-loader>
                      <v-skeleton-loader type="image"></v-skeleton-loader>
                    </v-card>
                    <div v-else>
                      <grafica-barras
                        ref="barras"
                        :key="'gf' + updates"
                        :labels="graficaFechas.labels"
                        :series="graficaFechas.series"
                        :palette="palette"
                      ></grafica-barras>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="4" lg="3">
            <v-card elevation="0" outlined class="rounded-lg">
              <v-card-title> Vencimiento </v-card-title>
              <v-divider></v-divider>
              <v-card-text> asdfasd </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import MostrarPresentacion from "../../../components/productos/mostrarPresentacion.vue";
import MostrarPrecio from "../../../components/productos/mostrarPrecio.vue";
import GraficaBarras from "../../../components/graficas/grafica-barras.vue";
import TrendPercent from "../../../components/common/TrendPercent.vue";
import GraficaPie from "../../../components/graficas/grafica-pie.vue";
import moment from "moment";
export default {
  components: {
    GraficaPie,
    TrendPercent,
    GraficaBarras,
    MostrarPrecio,
    MostrarPresentacion,
  },
  mounted() {
    this.fecha.push(moment().add(-7, "days").format("YYYY-MM-DD"));
    this.fecha.push(moment().format("YYYY-MM-DD"));
    this.init();
    this.obtenerVentas();
  },
  data: () => ({
    isLoading: true,
    isLoadingSales: true,
    producto: {
      codigo: "",
      nombre: "",
      marca: "",
      dimension: "",
      detalles: "",
      precios: [],
      ventas: [],
    },
    format: "Día",
    formatos: ["Día", "Mes", "Año", "Semana"],
    ventas: {},
    fecha: [],
    modal: false,

    graficaVendidos: {
      labels: [],
      series: [],
    },
    graficaFechas: {
      labels: [],
      series: [],
    },
    graficaGanancias: {
      labels: [],
      series: [],
    },
    cantidades: {},
    palette: "palette1",
    updates: 0,
    moment: moment,
  }),
  methods: {
    async init() {
      this.isLoading = true;
      await this.$axios
        .get("productos/" + this.idproducto)
        .then((result) => {
          this.producto = result.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.calcularExistencias();
      this.isLoading = false;
    },
    calcularExistencias() {
      let presentaciones = JSON.parse(JSON.stringify(this.producto.precios));
      presentaciones = presentaciones.reverse();

      let existencias = this.producto.existencia;
      let presentacionesDisponibles = [];

      presentaciones.forEach((presentacion) => {
        let cantidadPresentaciones = Math.floor(
          existencias / presentacion.cantidad
        );
        presentacionesDisponibles[presentacion.idprecio] =
          cantidadPresentaciones;
        existencias -= cantidadPresentaciones * presentacion.cantidad;
      });

      this.cantidades = presentacionesDisponibles;
    },
    async obtenerVentas() {
      this.isLoadingSales = true;
      await this.$axios
        .get(
          "productos/" +
            this.idproducto +
            "/ventas/" +
            this.format +
            "/" +
            this.fecha[0] +
            "/" +
            this.fecha[1]
        )
        .then((result) => {
          this.ventas = result.data;
          this.graficaVendidos.series = this.ventas.precios.map(
            (e) => e.vendidos_cantidad
          );
          this.graficaVendidos.labels = this.ventas.precios.map(
            (e) => e.nombre
          );
          this.graficaGanancias.series = this.ventas.precios.map(
            (e) => e.vendidos_ganancia
          );
          this.graficaGanancias.labels = this.ventas.precios.map(
            (e) => e.nombre
          );
          this.graficaFechas.labels = [];
          this.graficaFechas.series = [];
          this.graficaFechas.labels = this.ventas.detalles.map((e) => e.fecha);

          let series = this.ventas.detalles.map((e) => e.ventas);
          let gs = [];
          this.ventas.precios.forEach((p) => {
            this.graficaFechas.series.push({
              name: p.nombre,
              data: series.map((e) => e[p.nombre]),
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });

      this.isLoadingSales = false;
      this.updates++;
    },
  },
  computed: {
    idproducto() {
      return this.$route.params.idproducto;
    },
  },
};
</script>

<style></style>
