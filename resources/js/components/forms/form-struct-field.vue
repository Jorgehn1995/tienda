<template>
    <div
        class="d-flex"
        :class="{
            'flex-column': column || $vuetify.breakpoint.xsOnly,
            'flex-row': !column,
        }"
    >
        <div class="py-sm-0 pb-0 flex-shrink-0">
            <div :style="column ? '' : 'width: 110px !important'" class="pa-1">
                <label
                    class="v-label font-weight-medium"
                    :class="{ 'justify-end': right }"
                    style="white-space: normal"
                >
                    <slot name="label"></slot>
                    <span
                        v-if="required"
                        class="error--text ml-1"
                        :class="{ 'mr-1': !column }"
                        >*</span
                    >
                </label>
            </div>
        </div>
        <div class="cont rounded-lg flex-grow-1">
            <slot name="field"> </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        column: {
            type: Boolean,
            default: false,
        },
        right: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
