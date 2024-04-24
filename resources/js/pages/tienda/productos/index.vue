<template>
  <div>
    <v-card tile>
      <v-card-text>
        <busqueda-text-field
          :elevation="0"
          prefix="productos_search"
          class="mt-2"
        >
          <v-btn
            dark
            block
            large
            color="primary"
            to="/tienda/productos/editar"
            v-shortkey="['ctrl', 'l']"
            :loading="isLoading"
          >
            Agregar [CTRL+A]
            <v-icon right>mdi-plus</v-icon>
          </v-btn>
        </busqueda-text-field>
      </v-card-text>
    </v-card>

    <v-container>
      <div class="d-flex flex-grow-1 flex-column">
        <v-row class="flex-grow-0" dense>
          <v-col cols="12">
            <t-listar
              ref="tabla"
              tableID="actividades.profesores"
              prefix="productos_"
              show-select
              show-expand
              toggle-columns
              :extraQuery="extraQuery"
              :apiURL="ajustes.ruta"
              :itemID="ajustes.id"
              :buscar="ajustes.buscar"
              @update:search="ajustes.buscar = $event"
              @click:row="ver($event)"
              @update:seleccion="seleccion = $event"
              :truncate="true"
              :show_menu="true"
              :pagination="10"
              :toolbar="false"
              :sm="12"
              :md="12"
              :lg="12"
              :card="$vuetify.breakpoint.xsOnly"
            >
              <template v-slot:item="{ isSelected, toggle, item, index }">
                <div
                  class="d-flex justify-space-between"
                  :class="$vuetify.breakpoint.xsOnly ? 'flex-column' : ''"
                >
                  <div style="width: 100%">
                    <v-card-title>
                      <a
                        class="undertext black--text font-weight-bold text-decoration-none"
                        :href="'/tienda/productos/' + item.idproducto"
                      >
                        {{ item.nombre }} {{ item.marca }} {{ item.dimension }}
                      </a>
                    </v-card-title>
                    <v-card-text>
                      <v-row dense style="height: 100%">
                        <v-col cols="4" md="4">
                          <a
                            class="text-left undertext green--text font-weight-bold text-decoration-none"
                            style="width: 100%"
                            :href="'/tienda/productos/' + item.idproducto"
                          >
                            <v-icon>mdi-barcode</v-icon>
                            <span>{{ item.codigo }}</span>
                          </a>
                        </v-col>
                        <v-col cols="4" md="4">
                          <v-chip
                            color="green--text"
                            class="v-chip--active"
                            dark
                            small
                            v-if="item.existencia > 0"
                          >
                            {{ item.existencia }}
                            {{ item.unidades }}
                          </v-chip>
                          <v-chip v-else small>
                            {{ item.existencia }}
                            {{ item.unidades }}
                          </v-chip>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                  <div class="py-2 pr-2 text-right" style="width: 100%">
                    <v-btn
                      color="green"
                      :to="
                        '/tienda/productos/existencias?productos_search=id:' +
                        item.idproducto
                      "
                      icon
                    >
                      <v-icon>mdi-package-variant-closed-plus</v-icon>
                    </v-btn>

                    <v-btn
                      icon
                      :to="'/tienda/productos/editar?id=' + item.idproducto"
                      class="ml-2"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>

                    <v-options :title="item.nombre" icon="mdi-dots-horizontal">
                      <template v-slot:activator="{ open }">
                        <v-btn outlined @click="open" icon class="ml-2">
                          <v-icon> mdi-dots-horizontal </v-icon>
                        </v-btn>
                      </template>
                      <template v-slot:options>
                        <v-list-item>
                          <v-list-item-title> Ver Producto </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title> Imprimir </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          :to="
                            '/tienda/productos/existencias?productos_search=idproducto:' +
                            item.idproducto
                          "
                        >
                          <v-list-item-title>
                            Agregar Existencias
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-title>
                            Revisar Vencimientos
                          </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                          :to="'/tienda/productos/editar?id=' + item.idproducto"
                        >
                          <v-list-item-title> Editar </v-list-item-title>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item
                          :to="
                            '/tienda/productos/eliminar?id=' + item.idproducto
                          "
                        >
                          <v-list-item-title class="red--text">
                            Eliminar
                          </v-list-item-title>
                        </v-list-item>
                      </template>
                    </v-options>
                  </div>
                </div>
              </template>
              <template v-slot:items="{ items }">
                <v-simple-table class="rounded-lg">
                  <thead>
                    <tr>
                      <th class="text-left">Código</th>
                      <th class="text-left">Producto</th>
                      <th class="text-left">Marca</th>
                      <th class="text-left">Dimensión</th>
                      <th class="text-left">Precios</th>
                      <th class="text-right">Opciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in items">
                      <td>
                        {{ item.codigo }}
                      </td>
                      <td>
                        {{ item.nombre }}
                      </td>
                      <td>
                        {{ item.marca || "--" }}
                      </td>
                      <td>
                        {{ item.dimension || "--" }}
                      </td>
                      <td>
                        <v-chip small>
                          {{ item.precios[0].nombre }}
                        </v-chip>
                        <v-chip small v-if="item.precios.length > 1">
                          {{ item.precios.length + 1 }}+
                        </v-chip>
                      </td>
                      <td>
                        <v-btn
                          color="green"
                          :to="
                            '/tienda/productos/existencias?productos_search=id:' +
                            item.idproducto
                          "
                          icon
                        >
                          <v-icon>mdi-package-variant-closed-plus</v-icon>
                        </v-btn>

                        <v-btn
                          icon
                          :to="'/tienda/productos/editar?id=' + item.idproducto"
                          class="ml-2"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                        <v-options
                          :title="item.nombre"
                          icon="mdi-dots-horizontal"
                        >
                          <template v-slot:activator="{ open }">
                            <v-btn outlined @click="open" icon class="ml-2">
                              <v-icon> mdi-dots-horizontal </v-icon>
                            </v-btn>
                          </template>
                          <template v-slot:options>
                            <v-list-item>
                              <v-list-item-title>
                                Ver Producto
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title> Imprimir </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              :to="
                                '/tienda/productos/existencias?productos_search=idproducto:' +
                                item.idproducto
                              "
                            >
                              <v-list-item-title>
                                Agregar Existencias
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-title>
                                Revisar Vencimientos
                              </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                              :to="
                                '/tienda/productos/editar?id=' + item.idproducto
                              "
                            >
                              <v-list-item-title> Editar </v-list-item-title>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item
                              :to="
                                '/tienda/productos/eliminar?id=' +
                                item.idproducto
                              "
                            >
                              <v-list-item-title class="red--text">
                                Eliminar
                              </v-list-item-title>
                            </v-list-item>
                          </template>
                        </v-options>
                      </td>
                    </tr>
                  </tbody>
                </v-simple-table>
              </template>
            </t-listar>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import TListarTabla from "../../../components/tienda/generales/t-listar-tabla.vue";
import BusquedaTextField from "../../../components/busqueda/busquedaTextField.vue";
import ProductosMostrarPrecio from "../../../components/tienda/productos/productosMostrarPrecio.vue";
import VOptions from "../../../components/tienda/generales/v-options.vue";
import TListar from "../../../components/tienda/generales/t-listar.vue";

import { mapActions } from "vuex";
export default {
  components: {
    TListar,
    VOptions,
    ProductosMostrarPrecio,
    BusquedaTextField,
    TListarTabla,
  },

  mounted() {
    //this.init();
  },
  data: () => ({
    isLoading: false,
    seleccion: [],
    ajustes: {
      id: "idproducto",
      ruta: "/productos",
      buscar: "",
    },
  }),
  methods: {},
  computed: {
    extraQuery() {
      return "";
    },
  },
};
</script>

<style>
.undertext {
  cursor: pointer;
  display: inline-block;
  border-bottom: 1px dashed transparent;
}
.undertext:hover {
  border-bottom: 1px dashed;
}
</style>
