<template>
    <v-card
        class="rounded-lg"
        :color="color"
        :dark="dark"
        elevation="0"
        width="100%"
        height="100%"
    >
        <v-card-subtitle>
            <strong>
                <slot name="title">
                    {{ title }}
                </slot>
            </strong>
        </v-card-subtitle>
        <v-card-text
            class="text-right font-weight-black"
            :style="'font-size:' + size + 'px !important'"
        >
            <slot name="default">
                {{ data }}
            </slot>
        </v-card-text>
        <v-card-text class="pt-0">
            <slot name="title">
                {{ description }}
            </slot>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Title",
        },
        data: {
            type: String,
            default: "data",
        },
        description: {
            type: String,
            default: "description",
        },
        size: {
            type: Number,
            default: 11,
        },
        dark: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: "",
        },
    },
};
</script>

<style></style>
