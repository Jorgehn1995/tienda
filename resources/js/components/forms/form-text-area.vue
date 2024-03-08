<template>
    <div>
        <form-struct-field :column="column" :right="right" :required="required">
            <template v-slot:label>
                {{ label }}
            </template>
            <template v-slot:field>
                <slot>
                    <v-textarea
                        ref="field"
                        :rows="rows"
                        :autofocus="autofocus"
                        :prefix="prefix"
                        :suffix="suffix"
                        :success="success"
                        :error="error"
                        :class="{
                            'error-text': error,
                            'success-text': success,
                        }"
                        :loading="loading"
                        :disabled="disabled"
                        :type="type"
                        class="rounded-lg"
                        outlined
                        :placeholder="placeholder"
                        :hint="hint"
                        :persistent-hint="persistentHint"
                        :rules="rules"
                        v-model="data"
                        :readonly="readonly"
                        @click="$emit('click:field')"
                        @keyup="uppercase"
                    >
                        <template v-slot:append>
                            <slot name="append"></slot>
                        </template>
                        <template v-slot:append-outer>
                            <slot name="append-outer"></slot>
                        </template>
                        <template v-slot:prepend>
                            <slot name="prepend"></slot>
                        </template>
                    </v-textarea>
                </slot>
                <div
                    v-if="btn"
                    class="field-overlay cursor-pointer"
                    @click="$emit('click:field')"
                ></div>
            </template>
        </form-struct-field>
    </div>
</template>

<script>
import FormStructField from "./form-struct-field.vue";
export default {
    components: { FormStructField },
    props: {
        type: {
            type: String,
            default: "text",
        },
        mask: {
            type: String,
            default: "",
        },
        label: {
            type: String,
            default: "Nombre",
        },
        rules: {
            type: Array,
            default: () => [],
        },
        value: {
            type: [String, Number],
            default: "",
        },
        placeholder: {
            type: String,
            default: "",
        },
        column: {
            type: Boolean,
            default: false,
        },
        right: {
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
        required: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        success: {
            type: Boolean,
            default: false,
        },
        error: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        btn: {
            type: Boolean,
            default: false,
        },
        prefix: {
            type: String,
            default: "",
        },
        suffix: {
            type: String,
            default: "",
        },
        autofocus: {
            type: Boolean,
            default: false,
        },
        upper: {
            type: Boolean,
            default: false,
        },
        rows: {
            type: [String, Number],
            default: 1,
        },
    },
    data: () => ({
        isReady: false,
    }),
    methods: {
        uppercase() {
            if (this.upper) {
                this.data = this.data.toUpperCase();
            }
        },
    },
    computed: {
        data: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            },
        },
        messageColor() {
            return this.error
                ? "error-text"
                : this.success
                ? "success-text"
                : "";
        },
    },
};
</script>

<style>
.error-text .v-messages__message {
    color: var(--v-error-base);
}
.success-text .v-messages__message {
    color: var(--v-success-darken1);
}
.cont {
    position: relative;
}
.field-overlay {
    position: absolute;
    bottom: 0;
    background: transparent;
    color: #f1f1f1;
    width: 100%;
    height: 100%;
    transition: 0.5s ease;
    opacity: 1;
    color: white;
    font-size: 20px;
    padding: 20px;
    text-align: center;
}
</style>
