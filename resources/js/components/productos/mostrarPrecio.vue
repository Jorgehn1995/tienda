<template>
    <div
        style="white-space: nowrap; min-width: 80px"
        class="px-1 d-flex justify-space-between font-weight-black"
    >
        <span :style="'font-size:' + size + 'px !important'">
            <slot name="moneda"> Q </slot>
        </span>
        <div>
            <div class="d-flex flex-row">
                <div
                    class="money"
                    :style="'font-size:' + size + 'px !important'"
                >
                    <slot name="entero" v-bind:entero="precio[0]">
                        {{ precio[0] }}.
                    </slot>
                </div>
                <div
                    :class="decimalSize != size ? 'decimal' : ''"
                    :style="'font-size:' + decimalSize + 'px !important'"
                >
                    <slot name="decimal" v-bind:decimal="precio[1]">
                        {{ precio[1] }}
                    </slot>
                </div>
            </div>
        </div>
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
        decimalSize() {
            return this.size < 15 ? this.size : this.size - 3;
        },
    },
};
</script>

<style>
.decimal {
    vertical-align: super;
    margin-top: -3px;
}
</style>
