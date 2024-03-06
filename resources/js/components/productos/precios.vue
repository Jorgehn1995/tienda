<template>
    <div>Q {{ parseFloat(precio).toFixed(2) }}</div>
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
                return this.value;
            },
            set(n) {
                this.$emit("input", n);
            },
        },
    },
};
</script>

<style></style>
