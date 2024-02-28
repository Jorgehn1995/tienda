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
                    type: "bar",
                    height: 350,
                    stacked: true,
                    toolbar: {
                        show: true,
                    },
                    zoom: {
                        enabled: true,
                    },
                },
                theme: {
                    palette: this.palette,
                },
                responsive: [
                    {
                        breakpoint: 480,
                        options: {
                            legend: {
                                position: "bottom",
                                offsetX: -10,
                                offsetY: 0,
                            },
                        },
                    },
                ],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        borderRadius: 10,
                        dataLabels: {
                            total: {
                                enabled: true,
                                style: {
                                    fontSize: "13px",
                                    fontWeight: 900,
                                },
                            },
                        },
                    },
                },
                xaxis: {
                    type: "datetime",
                    categories: this.labels,
                },
                legend: {
                    position: "right",
                    offsetY: 40,
                },
                fill: {
                    opacity: 1,
                },
            };

            return options;
        },
    },
};
</script>

<style></style>
