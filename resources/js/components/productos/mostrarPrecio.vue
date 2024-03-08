<template>
    <div style="white-space: nowrap; min-width: 80px" class="px-1">
        <div class="d-flex justify-space-between font-weight-black">
            <span> Q </span>
            <span>
                <span class="money"> {{ precio[0] }}. </span>
                <span class="super">
                    {{ precio[1] }}
                </span>
            </span>
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
