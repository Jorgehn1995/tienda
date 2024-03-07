<template>
  <div>
    <form-struct-field :column="column" :right="right" :required="required">
      <template v-slot:label>
        {{ label }}
      </template>
      <template v-slot:field>
        <slot>
          <div v-if="btn">
            <div class="d-flex flex-column">
              <v-btn-toggle v-model="data" class="mb-1" color="primary">
                <v-btn
                  :value="s[itemValue] || s"
                  v-for="s in items"
                  :disabled="disabled"
                  :key="'btn' + (s[itemValue] || s)"
                >
                  {{ s[itemText] || s }}
                </v-btn>
              </v-btn-toggle>
              <span class="caption px-1" v-if="persistentHint">
                {{ hint }}
              </span>
            </div>
          </div>
          <div v-else-if="radio">
            <v-radio-group
              v-model="data"
              :row="$vuetify.breakpoint.smAndUp || row"
              :rules="rules"
              class="mt-0"
            >
              <v-radio
                :value="s[itemValue] || s"
                v-for="s in items"
                :disabled="disabled"
                :key="'btn' + (s[itemValue] || s)"
                :label="s[itemText] || s"
              ></v-radio>
            </v-radio-group>
            <span class="caption px-1" v-if="persistentHint">
              {{ hint }}
            </span>
          </div>
          <div v-else>
            <v-select
              :multiple="multiple"
              :disabled="disabled"
              class="rounded-lg"
              outlined
              :placeholder="placeholder"
              :hint="hint"
              :persistent-hint="persistentHint"
              :rules="rules"
              v-model="data"
              :items="items"
              :item-text="itemText"
              :item-value="itemValue"
              :menu-props="{ top: false, offsetY: true, closeOnClick: true }"
            ></v-select>
          </div>
        </slot>
      </template>
    </form-struct-field>
  </div>
</template>

<script>
import FormStructField from "./form-struct-field.vue";
export default {
  components: { FormStructField },
  props: {
    label: {
      type: String,
      default: "Nombre",
    },
    rules: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Array, Number],
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
    hint: {
      type: String,
      default: "",
    },
    persistentHint: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: "text",
    },
    itemValue: {
      type: String,
      default: "value",
    },
    required: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    btn: {
      type: Boolean,
      default: false,
    },
    radio: {
      type: Boolean,
      default: false,
    },
    row: {
      Boolean,
      default: false,
    },
    column: {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    isReady: false,
  }),
  computed: {
    data: {
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
