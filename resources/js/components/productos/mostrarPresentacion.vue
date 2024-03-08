<template>
    <div class="d-flex justify-start align-center">
        <div class="pr-1">
            <div>
                {{ nombre }}
            </div>
            <span class="caption" style="white-space: nowrap">
                {{ cantidad }}
                {{ medidas }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        nombre: {
            type: String,
            default: "Presentacion",
        },
        cantidad: {
            type: [String, Number],
            default: "0",
        },
        medidas: {
            type: String,
            default: "unidades",
        },
    },
};
</script>

<style></style>
