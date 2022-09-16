<template>
  <div>
    <v-card tile>
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="inicio"
              type="date"
              outlined
              placeholder="Fecha de Inicio"
              hide-details=""
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="5">
            <v-text-field
              v-model="fin"
              type="date"
              outlined
              placeholder="Fecha de Inicio"
              hide-details=""
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="2" class="d-flex justify-center align-center">
            <v-btn color="primary" block large @click="cargar()">
              Consultar
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-container>
      <v-row>
        <v-col cols="12 " md="4">
          <v-card>
            <v-card-title> Totales </v-card-title>
            <v-card-text class="mx-0">
              <v-list>
                <v-list-item>
                  <v-list-item-subtitle class="text-h6">
                    Fecha de Inicio
                  </v-list-item-subtitle>
                  <v-list-item-title class="text-right text-h6 grey--text pr-3">
                    {{ formato_inicio }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-subtitle class="text-h6">
                    Fecha de Finalización
                  </v-list-item-subtitle>
                  <v-list-item-title class="text-right text-h6 grey--text pr-3">
                    {{ formato_fin }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-subtitle class="text-h6">
                    Articulos
                  </v-list-item-subtitle>
                  <v-list-item-title class="text-right text-h6 grey--text pr-3">
                    Q {{ totales.articulos }}
                  </v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-subtitle class="text-h6">
                    Total
                  </v-list-item-subtitle>
                  <v-list-item-title class="text-right text-h6 grey--text pr-3">
                    Q {{ totales.total }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12 " md="8">
          <v-card>
            <v-card-title> Recibos </v-card-title>
            <v-card-text>
              <v-expansion-panels accordion v-if="ventas.length > 0">
                <v-expansion-panel v-for="(venta, i) in ventas" :key="i">
                  <v-expansion-panel-header v-slot="{ open }">
                    <v-row no-gutters>
                      <v-col cols="4"> Documento {{ venta.documento }} </v-col>
                      <v-col cols="8" class="text--secondary">
                        <v-fade-transition leave-absolute>
                          <span v-if="open">Total: Q{{ venta.total }}</span>
                          <v-row v-else no-gutters style="width: 100%">
                            <v-col cols="6">
                              {{
                                $moment(venta.created_at).format(
                                  "DD/MM/YYYY h:m a"
                                )
                              }}
                            </v-col>
                            <v-col cols="6"> Total: Q{{ venta.total }} </v-col>
                          </v-row>
                        </v-fade-transition>
                      </v-col>
                    </v-row>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Cantidad</th>
                            <th class="text-left">producto</th>
                            <th class="text-left">Precio</th>
                            <th class="text-left">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="prod in venta.detalles" >
                            <td>{{ prod.cantidad}}</td>
                            <td>{{ prod.nombre_producto}}</td>
                            <td>{{ prod.precio}}</td>
                            <td>{{ prod.total}}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <v-list-item v-else>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    Sin ventas para mostrar
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12 " md="3" v-if="false">
          <v-card>
            <v-card-title> Productos Más Vendidos </v-card-title>
            <v-card-text>
              <v-list v-if="populares.length > 0">
                <v-list-item v-for="producto in populares">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ producto.nombre }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      {{ producto.precio }}
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list v-else>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>
                      Sin productos para mostrar
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    isLoading: false,
    inicio: "",
    fin: "",
    totales: {
      articulos: 0,
      total: 0,
    },
    ventas: [],
    populares: [],
  }),
  methods: {
    cargar() {
      this.isLoading = true;
      this.$axios
        .get("reporte/" + this.inicio + "/" + this.fin)
        .then((result) => {
          this.totales = result.data.totales;
          this.ventas = result.data.ventas;
          this.populares = result.data.populares;
        })
        .catch((err) => {});
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

<style>
</style>
