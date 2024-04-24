<template>
  <div>
    <v-container v-if="tipo == 1">
      <v-row dense>
        <v-col cols="12" md="7" order="2" order-md="1">
          <v-card class="rounded-lg" elevation="0">
            <v-card-title> Verificador de Precios </v-card-title>
            <v-card-subtitle> Revisa los precios de productos </v-card-subtitle>
            <v-card-text>
              <venta-busqueda :height="300"></venta-busqueda>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" order="1" order-md="2">
          <v-card class="rounded-lg mb-2" elevation="0" outlined height="150">
            <v-card-text class="pt-4">
              <div>
                <v-img :src="tienda.logos.md" contain height="80"></v-img>
              </div>
            </v-card-text>
          </v-card>

          <v-card
            class="rounded-lg mb-2"
            elevation="0"
            :to="'/tienda/productos/vencimientos'"
            color="primary"
            dark
          >
            <v-card-title> Revisión de Productos </v-card-title>
            <v-card-subtitle>
              Productos que necesitan revisión
            </v-card-subtitle>
            <v-card-text>
              <div class="d-flex justify-center" v-if="isLoading.vencimientos">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </div>
              <div
                class="d-flex flex-column justify-center mb-2"
                v-else-if="vencimientos.length == 0"
              >
                <v-icon size="80"> mdi-package-variant-closed-check </v-icon>
                <h4 class="text-center">
                  No hay productos que necesiten revisión
                </h4>
              </div>
              <div v-else>
                <v-list color="transparent">
                  <v-list-item
                    v-for="(v, i) in vencimientos"
                    :key="'venci' + i"
                  >
                    <v-list-item-avatar>
                      <v-avatar color="primary lighten-2">
                        <span>
                          {{ i + 1 }}
                        </span>
                      </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ v.producto.nombre }}
                        {{ v.producto.marca }}
                        {{ v.producto.dimension }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        Vencimiento
                        {{ moment(v.vencimiento).format("DD/MM/Y") }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </div>
            </v-card-text>
          </v-card>

          <caja-habilitada v-slot="{ caja }">
            <turno-habilitado
              :caja="caja"
              v-slot="{ turno }"
              @obtenido="obtenerVentas($event)"
            >
              <v-card
                class="rounded-lg"
                elevation="0"
                :to="'/tienda/turnos/' + turno.idturno"
              >
                <v-card-title> Ultimas Ventas </v-card-title>
                <v-card-subtitle> Ultimas ventas del turno </v-card-subtitle>
                <v-card-text>
                  <div class="d-flex justify-center" v-if="isLoading.ventas">
                    <v-progress-circular
                      indeterminate
                      color="secondary"
                    ></v-progress-circular>
                  </div>
                  <v-list dense color="transparent">
                    <v-list-item
                      v-for="(venta, i) in ventas"
                      :key="'ventas' + i"
                    >
                      <v-list-item-avatar>
                        {{ i + 1 }}
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-subtitle>
                          Vendió
                          {{ venta.articulos }}
                          articulos
                        </v-list-item-subtitle>
                        <v-list-item-title>
                          Atendió
                          {{ venta.cajero_nombre }}
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          {{
                            moment(venta.created_at).format(
                              "DD [de] MMMM [A las] hh:mm a"
                            )
                          }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <mostrar-precio :value="venta.total"></mostrar-precio>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </turno-habilitado>
          </caja-habilitada>
        </v-col>
      </v-row>
    </v-container>
    <div v-else>
      <caja-habilitada v-slot="{ caja }">
        <v-container>
          <v-row dense>
            <v-col cols="12" md="7" order="2" order-md="1">
              <v-card class="rounded-lg" elevation="0">
                <v-card-title> Verificador de Precios </v-card-title>
                <v-card-subtitle>
                  Revisa los precios de productos
                </v-card-subtitle>
                <v-card-text>
                  <venta-busqueda :height="300"></venta-busqueda>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" md="5" order="1" order-md="2">
              <v-card
                class="rounded-lg mb-2"
                elevation="0"
                outlined
                height="150"
              >
                <v-card-text class="pt-4">
                  <div>
                    <v-img :src="tienda.logos.md" contain height="80"></v-img>
                  </div>
                </v-card-text>
              </v-card>

              <v-card
                class="rounded-lg mb-2"
                elevation="0"
                :to="'/tienda/productos/vencimientos'"
                color="primary"
                dark
              >
                <v-card-title> Revisión de Productos </v-card-title>
                <v-card-subtitle>
                  Productos que necesitan revisión
                </v-card-subtitle>
                <v-card-text>
                  <div
                    class="d-flex justify-center"
                    v-if="isLoading.vencimientos"
                  >
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </div>
                  <div
                    class="d-flex flex-column justify-center mb-2"
                    v-else-if="vencimientos.length == 0"
                  >
                    <v-icon size="80">
                      mdi-package-variant-closed-check
                    </v-icon>
                    <h4 class="text-center">
                      No hay productos que necesiten revisión
                    </h4>
                  </div>
                  <div v-else>
                    <v-list color="transparent">
                      <v-list-item
                        v-for="(v, i) in vencimientos"
                        :key="'venci' + i"
                      >
                        <v-list-item-avatar>
                          <v-avatar color="primary lighten-2">
                            <span>
                              {{ i + 1 }}
                            </span>
                          </v-avatar>
                        </v-list-item-avatar>
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ v.producto.nombre }}
                            {{ v.producto.marca }}
                            {{ v.producto.dimension }}
                          </v-list-item-title>
                          <v-list-item-subtitle>
                            Vencimiento
                            {{ moment(v.vencimiento).format("DD/MM/Y") }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-card-text>
              </v-card>

              <caja-habilitada v-slot="{ caja }">
                <turno-habilitado
                  :caja="caja"
                  v-slot="{ turno }"
                  @obtenido="obtenerVentas($event)"
                >
                  <v-card
                    class="rounded-lg"
                    elevation="0"
                    :to="'/tienda/turnos/' + turno.idturno"
                  >
                    <v-card-title> Ultimas Ventas </v-card-title>
                    <v-card-subtitle>
                      Ultimas ventas del turno
                    </v-card-subtitle>
                    <v-card-text>
                      <div
                        class="d-flex justify-center"
                        v-if="isLoading.ventas"
                      >
                        <v-progress-circular
                          indeterminate
                          color="secondary"
                        ></v-progress-circular>
                      </div>
                      <v-list dense color="transparent">
                        <v-list-item
                          v-for="(venta, i) in ventas"
                          :key="'ventas' + i"
                        >
                          <v-list-item-avatar>
                            {{ i + 1 }}
                          </v-list-item-avatar>
                          <v-list-item-content>
                            <v-list-item-subtitle>
                              Vendió
                              {{ venta.articulos }}
                              articulos
                            </v-list-item-subtitle>
                            <v-list-item-title>
                              Atendió
                              {{ venta.cajero_nombre }}
                            </v-list-item-title>
                            <v-list-item-subtitle>
                              {{
                                moment(venta.created_at).format(
                                  "DD [de] MMMM [A las] hh:mm a"
                                )
                              }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                          <v-list-item-action>
                            <mostrar-precio
                              :value="venta.total"
                            ></mostrar-precio>
                          </v-list-item-action>
                        </v-list-item>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </turno-habilitado>
              </caja-habilitada>
            </v-col>
          </v-row>
        </v-container>
      </caja-habilitada>
    </div>
  </div>
</template>

<script>
import MostrarPrecio from "../../components/productos/mostrarPrecio.vue";
import TurnoHabilitado from "../../components/ventas/turno-habilitado.vue";
import CajaHabilitada from "../../components/ventas/caja-habilitada.vue";
import VentaBusqueda from "../../components/venta/ventaBusqueda.vue";
import moment from "moment";
import tienda from "@/tienda";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    VentaBusqueda,
    CajaHabilitada,
    TurnoHabilitado,
    MostrarPrecio,
  },
  mounted() {
    this.obtenerVencidos();
  },
  data: () => ({
    drawer: false,
    isLoading: {
      ventas: true,
      vencimientos: true,
    },
    ventas: [],
    vencimientos: [],
    moment,
    tienda,
  }),
  methods: {
    ...mapActions({ solicitar: "datos/solicitar" }),
    async obtenerVentas(turno) {
      this.isLoading.ventas = true;
      if (turno.idturno > 0) {
        if (!this.obtener("/turnos/" + turno.idturno + "/ventas")) {
          await this.solicitar("/turnos/" + turno.idturno + "/ventas");
        } else {
          this.solicitar("/turnos/" + turno.idturno + "/ventas")
            .then((result) => {
              this.ventas = result;
            })
            .catch((err) => {
              //console.log(err);
            });
        }

        this.ventas = this.obtener("/turnos/" + turno.idturno + "/ventas");
      }

      this.isLoading.ventas = false;
    },
    async obtenerVencidos() {
      this.isLoading.vencimientos = true;

      if (
        !this.obtener("/vencimientos?search=" + this.fecha + "&tipo=pendientes")
      ) {
        await this.solicitar(
          "/vencimientos?search=" + this.fecha + "&tipo=pendientes"
        );
        this.vencimientos = this.obtener(
          "/vencimientos?search=" + this.fecha + "&tipo=pendientes"
        );
      } else {
        this.solicitar(
          "/vencimientos?search=" + this.fecha + "&tipo=pendientes"
        )
          .then((result) => {
            this.vencimientos = result;
          })
          .catch((err) => {
            //
          });
      }

      this.vencimientos = this.obtener(
        "/vencimientos?search=" + this.fecha + "&tipo=pendientes"
      );
      this.isLoading.vencimientos = false;
    },
  },
  computed: {
    ...mapGetters({ obtener: "datos/obtener" }),

    tipo() {
      return this.$cookie.get("tipo");
    },
    CASH_CODE() {
      return localStorage.getItem("CASH_CODE");
    },
    fecha() {
      return moment().format("Y-MM-DD");
    },
  },
};
</script>

<style></style>
