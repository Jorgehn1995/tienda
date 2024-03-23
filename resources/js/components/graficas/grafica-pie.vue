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
        dark: {
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
                    background: "transparent",
                    width: 380,
                    type: "pie",
                    id: this.id,
                    group: this.group,
                },

                labels: this.labels,
                colors: [
                    this.$vuetify.theme.currentTheme.primary,
                    this.$vuetify.theme.currentTheme.secondary,
                    this.$vuetify.theme.currentTheme.accent,
                    this.$vuetify.theme.currentTheme.surface,
                    this.$vuetify.theme.currentTheme.background,
                ],
                theme: {
                    mode: this.dark ? "dark" : "light",
                    palette: this.palette,
                    monochrome: {
                        enabled: false,
                        color: "#2f64f7",
                        shadeTo: "light",
                        shadeIntensity: 0.65,
                    },
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
