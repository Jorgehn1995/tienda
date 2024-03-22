<template>
    <div
        style="white-space: nowrap; min-width: 80px"
        class="px-1 d-flex justify-space-between font-weight-black"
    >
        <span :style="'font-size:' + size + 'px !important'">
            <slot name="moneda"> Q </slot>
        </span>
        <span>
            <span class="money" :style="'font-size:' + size + 'px !important'">
                <slot name="entero" v-bind:entero="precio[0]">
                    {{ precio[0] }}.
                </slot>
            </span>
            <span
                class="decimal"
                :style="'font-size:' + (size - 5) + 'px !important'"
            >
                <slot name="decimal" v-bind:decimal="precio[1]">
                    {{ precio[1] }}
                </slot>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: [String, Number],
            default: 0,
        },
        size: {
            type: [Number, String],
            default: 15,
        },
    },
    computed: {
        precio: {
            get() {
                return parseFloat(this.value).toFixed(2).split(".");
            },
            set(n) {
                this.$emit("input", n);
            },
        },
    },
};
</script>

<style>
.decimal {
    vertical-align: super;
    padding-top: 12px !important;
}
</style>
