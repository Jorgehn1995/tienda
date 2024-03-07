<template>
  <div class="">
    <form-text-field
      :label="label"
      :placeholder="placeholder"
      :hint="hint"
      persistentHint
      :value="format_value"
      required
      :readonly="true"
      @click:field="click"
    >
      <div class="d-flex justify-center">
        <form-image-avatar
          ref="img"
          color="primary"
          :src="image"
          :institucion="true"
          :size="100"
        ></form-image-avatar>
      </div>
    </form-text-field>
    <v-row dense>
      <v-col cols="12" sm="8" offset-sm="4" class="text-center pl-6">
        <div class="d-flex justify-center">
          <component-file-upload
            ref="upload"
            class="mb-2"
            v-model="file"
            formato="image"
            :multiple="false"
            @complete="seleccionado"
          >
            <template v-slot:default="{ select, isLoading }">
              <v-btn
                text
                outlined
                color="primary"
                @click="select"
                :loading="isLoading"
              >
                <v-icon left color="primary">mdi-cloud-upload</v-icon>
                <span v-if="image">
                  <span v-if="$vuetify.breakpoint.smAndUp">Subir</span>
                  Otra
                </span>
                <span v-else>
                  Subir
                  <span v-if="$vuetify.breakpoint.smAndUp">Imagen</span>
                </span>
              </v-btn>
            </template>
          </component-file-upload>
          <v-btn
            tile
            text
            color="error"
            @click="image = ''"
            :disabled="image == ''"
          >
            <v-icon color="error">mdi-delete-outline</v-icon>

            <span v-if="$vuetify.breakpoint.smAndUp">Eliminar Imagen</span>
            <span v-else> Eliminar </span>
          </v-btn>
        </div>
        <div class="error--text" v-if="error">
          <span>{{ error }}</span>
        </div>
      </v-col>
    </v-row>

    <div>
      <v-dialog v-model="isOpen" :fullscreen="$vuetify.breakpoint.xsOnly">
        <v-card>
          <v-card-title>
            <v-btn icon @click="isOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            Editar imagen
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="recortar" :loading="isLoading">
              <v-icon left>mdi-image-check-outline</v-icon>
              Guardar
            </v-btn>
          </v-card-title>
          <v-card-text class="d-flex justify-center align-center">
            <component-file-image-edit
              ref="editar"
              :file="file"
              :height="size"
              :width="size"
              @click:icon="seleccionar"
              @resultado="procesarResultado"
            ></component-file-image-edit>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="isLoading" width="350">
        <v-card class="rounded-lg" color="superior" dark>
          <v-card-text class="pt-2">
            <v-list dense color="transparent">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-image-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    Procesando imagen, espere por favor...
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-progress-linear
                      :value="file.porcentaje"
                    ></v-progress-linear>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import ComponentFileImageEdit from "../components/file/component-file-image-edit.vue";
import FormImageAvatar from "./form-image-avatar.vue";
import FormTextField from "./form-text-field.vue";
import ComponentFileUpload from "../components/file/component-file-upload.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ComponentFileUpload,
    FormTextField,
    FormImageAvatar,
    ComponentFileImageEdit,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "Imagen",
    },
    placeholder: {
      type: String,
      default: "Selecione una imagen",
    },
    hint: {
      type: String,
      default: "Haz click para seleccionar una imagen",
    },
    error: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    isLoading: false,
    isOpen: false,
    file: {},
  }),
  methods: {
    ...mapActions({
      upload: "api6/fileUpload",
    }),
    seleccionar() {
      this.$refs.seleccionar.click();
    },
    seleccionado(e) {
      this.key++;

      this.isOpen = true;
    },
    recortar() {
      this.$refs.editar.recortar();
    },
    click() {
      if (this.image) {
        this.$refs.img.show();
      } else {
        this.$refs.upload.select();
      }
    },
    async procesarResultado(e) {
      this.isOpen = false;
      this.isLoading = true;
      //let token = await this.token();
      await this.upload({
        file: e,
        path: "/profile/image/",
      })
        .then((res) => {
          this.image = res;
        })
        .catch((err) => {
          // console.log(err);
        });

      //this.establecerInstitucion(this.getInstitucion);
      this.isLoading = false;
    },
  },
  computed: {
    ...mapGetters({
      institucion: "aplicacion/institucion",
    }),
    size() {
      return this.$vuetify.breakpoint.xsOnly ? 330 : 450;
    },
    idinstitucion() {
      return this.$route.params.idinstitucion;
    },
    format_value() {
      if (this.image) {
        return "Imagen seleccionada";
      } else {
        return "Haz click para seleccionar una imagen";
      }
    },
    image: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },
};
</script>

<style></style>
