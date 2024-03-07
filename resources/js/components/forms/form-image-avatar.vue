<template>
  <div>
    <div class="cursor-pointer">
      <v-hover v-slot="{ hover }">
        <v-avatar
          :left="left"
          :color="hover && isHover ? color : background_color"
          :size="size"
          :style="borde"
          @click="show()"
        >
          <v-img :src="srcLocal"> </v-img>
        </v-avatar>
      </v-hover>
      <viewer
        style="height: 0px; width: 0px"
        :options="options"
        :images="images"
        :rebuild="true"
        class="viewer"
        ref="viewer"
      >
        <img
          v-for="{ source, thumbnail } in images"
          :src="thumbnail"
          :data-source="source"
          class="image"
          style="height: 0; width: 0"
          :key="source"
        />
      </viewer>
    </div>
  </div>
</template>

<script>
import "viewerjs/dist/viewer.css";
export default {
  props: {
    size: {
      type: [String, Number],
      default: 36,
    },
    color: {
      type: String,
      default: "transparent",
    },
    src: {
      type: String,
      defaul: "",
    },
    institucion: {
      type: Boolean,
      default: false,
    },
    isHover: {
      type: Boolean,
      default: true,
    },
    isShow: {
      type: Boolean,
      default: true,
    },
    left: {
      type: Boolean,
      default: false,
    },
    background_color: {
      type: String,
      default: "grey",
    },
  },
  mounted() {
    this.establecer();
  },
  data: () => ({
    options: {
      inline: false,
      button: true,
      navbar: false,
      title: false,
      toolbar: false,
      tooltip: false,
      movable: false,
      zoomable: false,
      rotatable: false,
      scalable: false,
      transition: false,
      fullscreen: false,
      keyboard: true,
      url: "data-source",
    },
    images: [],
  }),
  methods: {
    show() {
      if (this.isShow) {
        this.$refs.viewer.$viewer.show();
      }
    },
    establecer() {
      this.images = [];
      this.images.push({
        source: this.srcLocal,
        thumbnail: this.srcLocal,
      });
    },
  },
  computed: {
    calculo() {
      return Math.round(this.size / 60) * 2 > 4
        ? 4
        : Math.round(this.size / 60) * 2;
    },
    borde() {
      return "border:" + this.calculo + "px solid black";
    },
    srcLocal() {
      if (this.src == "" || this.src == 1 || this.src == null) {
        if (this.institucion) {
          return "https://lerniz.net/institucion.jpg";
        } else {
          return "https://lerniz.net/avatar.png";
        }
      } else {
        return this.src;
      }
    },
  },
  watch: {
    src() {
      this.establecer();
    },
  },
};
</script>

<style scooped>
.borde {
  border: 3px solid black;
}
</style>
