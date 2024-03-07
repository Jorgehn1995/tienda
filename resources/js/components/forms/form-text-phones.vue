<template>
  <div class="text-right">
    <v-combobox
      v-model="model"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      hide-selected
      placeholder="Numeros telefonicos"
      :hint="hint"
      :persistent-hint="persistentHint"
      multiple
      small-chips
      outlined
      class="rounded-lg"
      append-icon="mdi-plus"
    >
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip v-bind="attrs" :input-value="selected" label>
          <span class="pr-2">
            {{ item }}
          </span>
          <v-icon small @click="parent.selectItem(item)"> $delete </v-icon>
        </v-chip>
      </template>
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-subtitle style="white-space: normal">
            Presiona <Kbd>Enter</Kbd> para agregar el nuemro de telefono
            <v-chip label x-small>
              {{ search }}
            </v-chip>
          </v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-combobox>
  </div>
</template>

<script>
import { v5 } from "@/configs/rules";
export default {
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: "Label",
    },
    placeholder: {
      type: String,
      default: "placeholder",
    },
    icon: {
      type: String,
      default: "mdi-phone",
    },
    btn: {
      type: String,
      default: "Agregar Teléfono",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    hint: {
      type: String,
      default: "",
    },
    persistentHint: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    v5,
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    editingIndex: -1,

    nonce: 1,
    menu: false,
    model: [],
    x: 0,
    search: null,
    y: 0,
  }),

  methods: {},

  computed: {
    items: {
      get() {
        return this.value;
      },
      set(n) {
        this.$emit("input", n);
      },
    },
  },
  watch: {
    model(val, prev) {
      if (val.length === prev.length) return;
      this.model = val.map((v) => {
        this.items.findIndex((e) => e == v) < 0 ? this.items.push(v) : "";
        return v;
      });
    },
    items() {
      if (!this.isReady) {
        this.model = this.items;
        this.isReady = true;
      }
    },
  },
};
</script>

<style></style>
