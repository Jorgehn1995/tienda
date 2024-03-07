<template>
  <div>
    <form-text-select label="Colegio" required>
      <v-select
        placeholder="Selecciona una institución"
        hint="Indica la institución a la que pertenece la sección"
        persistentHint
        v-model="idinstitucion"
        :rules="[required]"
        :items="instituciones"
        outlined
        class="rounded-lg"
        item-text="nombre"
        item-value="idinstitucion"
        attach
        :menu-props="{ top: false, offsetY: true, closeOnClick: true }"
      >
        <template v-slot:selection="{ item, attrs, index }">
          <v-list-item dense class="pa-0 ma-0" v-bind="attrs">
            <v-list-item-avatar class="pa-0 ma-0">
              <form-image-avatar
                :size="30"
                :isHover="false"
                institucion
                :isShow="false"
                :src="item.logo"
              ></form-image-avatar>
            </v-list-item-avatar>
            <v-list-item-content class="pa-0 ma-0 d-inline-block text-truncate">
              <v-list-item-title
                style="white-space: normal"
                class="text-truncate wrap-text"
              >
                {{ item.abreviatura }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:item="{ active, item, attrs, on }">
          <v-list-item v-on="on" v-bind="attrs" #default="{ active }">
            <v-list-item-avatar>
              <form-image-avatar
                :isHover="false"
                institucion
                :isShow="false"
                :src="item.logo"
              ></form-image-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.abreviatura }}
              </v-list-item-title>
              <v-list-item-subtitle class="d-inline-block text-truncate">
                {{ item.nombre }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-slot:prepend-item v-if="create">
          <v-list-item to="/v6/administracion/colegios/modificar?id=new">
            <v-list-item-avatar color="teal lighten-5">
              <v-icon color="teal darken-3"> mdi-plus </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title> Crear Colegio </v-list-item-title>
              <v-list-item-subtitle>
                Crea un nuevo colegio
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-subheader>Tus Colegios</v-subheader>
        </template>
      </v-select>
    </form-text-select>
  </div>
</template>

<script>
import FormImageAvatar from "./form-image-avatar.vue";
import TextSelectInstituciones from "./components/text-select-instituciones.vue";
import FormTextSelect from "./form-text-select.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { FormTextSelect, TextSelectInstituciones, FormImageAvatar },
  props: {
    value: {
      type: [String, Number],
      default: 0,
    },
    create: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      isLoading: false,
      required: (v) => v > 0 || "Selecciona una institución para continuar",
    };
  },
  methods: {
    ...mapActions({ get: "api6/get" }),
    async init() {
      this.isLoading = true;
      await this.get("instituciones");
      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters({ result: "api6/result" }),
    instituciones() {
      return this.result("instituciones") || [];
    },
    idinstitucion: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style></style>
