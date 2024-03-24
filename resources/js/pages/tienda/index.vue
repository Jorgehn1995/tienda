<template>
    <div>
        <v-container>
            <v-row dense>
                <v-col cols="12" md="8">
                    <v-card
                        class="rounded-lg"
                        elevation="0"
                        outlined
                        height="200"
                    >
                        <v-card-text class="pt-6">
                            <div>
                                <v-img
                                    src="/images/lg_home.png"
                                    contain
                                    height="100"
                                ></v-img>
                            </div>
                        </v-card-text>
                    </v-card>
                    <v-card class="rounded-lg mt-2" elevation="0">
                        <v-card-title> Turno Actual </v-card-title>
                        <v-card-subtitle>
                            Revias las ventas del turnoa ctual
                        </v-card-subtitle>
                        <v-card-text> asdfasd </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" md="4">
                    <v-card class="rounded-lg" elevation="0" color="secondary">
                        <v-card-title> Ultimas Ventas </v-card-title>
                        <v-card-subtitle>
                            Ultimas ventas del turno
                        </v-card-subtitle>
                        <v-card-text> asdfasfass </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from "moment";

export default {
    data: () => ({
        drawer: false,
        moment,
    }),
    computed: {
        tipo() {
            return this.$cookie.get("tipo");
        },
        CASH_CODE() {
            return localStorage.getItem("CASH_CODE");
        },
    },
};
</script>

<style></style>
