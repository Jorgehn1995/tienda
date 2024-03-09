<template>
    <div
        style="white-space: nowrap; min-width: 80px"
        class="px-1 d-flex justify-space-between font-weight-black"
    >
        <span>
            <slot name="moneda"> Q </slot>
        </span>
        <span>
            <span class="money">
                <slot name="entero" v-bind:entero="precio[0]">
                    {{ precio[0] }}.
                </slot>
            </span>
            <span class="super">
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
.money {
    font-size: medium;
}
.super {
    vertical-align: super;
    font-size: x-small;
    padding-top: 10px !important;
}
</style>
