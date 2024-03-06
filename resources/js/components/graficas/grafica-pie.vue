<template>
    <div>
        <apexchart type="pie" :options="options" :series="series"></apexchart>
    </div>
</template>

<script>
import moment from "moment";

export default {
    props: {
        chartId: {
            type: String,
            defautl: "chart-1",
        },
        group: {
            type: String,
            defautl: "chart-group",
        },
        labels: {
            type: Array,
            default: () => [],
        },
        series: {
            type: Array,
            default: () => [],
        },
        legend: {
            type: Boolean,
            default: true,
        },
        names: {
            type: Boolean,
            default: false,
        },
        palette: {
            type: String,
            default: "palette4",
        },
    },
    computed: {
        options() {
            const primaryColor = this.$vuetify.theme.isDark
                ? this.$vuetify.theme.themes.dark.primary
                : this.$vuetify.theme.themes.light.primary;
            const formatter = function (val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, val.toFixed(1) + "%"];
            };
            let options = {
                chart: {
                    width: 380,
                    type: "pie",
                    id: this.id,
                    group: this.group,
                },

                labels: this.labels,
                theme: {
                    palette: this.palette,
                },
                dataLabels: {},
                legend: {
                    show: this.legend,
                    position: "bottom",
                },
                yaxis: {
                    labels: {
                        minWidth: 40,
                    },
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            chart: {
                                width: 300,
                            },
                            legend: {
                                position: "bottom",
                            },
                        },
                    },
                ],
            };

            return options;
        },
    },
};
</script>

<style></style>
