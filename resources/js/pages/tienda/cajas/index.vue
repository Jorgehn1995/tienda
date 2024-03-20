<template>
    <div>
        <v-container>
            <v-card
                outlined
                class="rounded-lg mb-2"
                elevation="0"
                color="teal"
                dark
                v-if="!registrado"
                to="/tienda/cajas/habilitar"
            >
                <v-card-title> Dispositivo No Registrado </v-card-title>
                <v-card-subtitle>
                    Este dispositivo no esta registrado para realizar ventas,
                    registralo para procesar ventas
                </v-card-subtitle>
                <v-card-text>
                    <v-btn outlined dark> Registrar Dispositivo </v-btn>
                </v-card-text>
            </v-card>
            <v-card outlined class="rounded-lg" elevation="0">
                <v-card-title> Cajas Registradas </v-card-title>
                <v-card-subtitle>
                    Revisa todas las cajas registradas y las ventas realizadas
                    por estas cajas
                </v-card-subtitle>
                <v-divider></v-divider>
                <v-card-text>
                    <v-simple-table>
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th class="text-left">#</th>

                                    <th class="text-left">Nombre</th>
                                    <th class="text-left">
                                        Usuario
                                        <br />
                                        Que registró
                                        <br />
                                        La caja
                                    </th>
                                    <th class="text-left">Sistema Operativo</th>
                                    <th class="text-left">Navegador</th>
                                    <th class="text-left">Version</th>
                                    <th class="text-left">Estado</th>

                                    <th class="text-center">
                                        <v-icon>mdi-dots-horizontal</v-icon>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(caja, index) in cajas">
                                    <td>
                                        {{ index + 1 }}
                                    </td>
                                    <td>
                                        {{ caja.nombre }}
                                        <span v-if="CASH_CODE == caja.codigo">
                                            (Este Equipo)
                                        </span>
                                    </td>
                                    <td>
                                        {{ caja.usuario }}
                                    </td>
                                    <td>
                                        {{ caja.os }}
                                    </td>
                                    <td>
                                        {{ caja.navegador }}
                                    </td>
                                    <td>
                                        {{ caja.version }}
                                    </td>
                                    <td>
                                        <v-chip
                                            color="teal"
                                            small
                                            v-if="caja.estado"
                                            dark
                                        >
                                            <v-icon left>mdi-check</v-icon>
                                            Activo
                                        </v-chip>
                                        <v-chip color="error" small v-else dark>
                                            <v-icon left>mdi-close</v-icon>
                                            Deshabilitado
                                        </v-chip>
                                    </td>
                                    <td class="text-center">
                                        <v-btn
                                            v-if="caja.estado"
                                            color="error"
                                            outlined
                                            @click="cambiarEstado(caja)"
                                            :loading="caja.isLoading == 1"
                                        >
                                            <v-icon left>
                                                mdi-cellphone-link-off
                                            </v-icon>
                                            Deshabilitar
                                        </v-btn>
                                        <v-btn
                                            v-else
                                            color="teal"
                                            outlined
                                            @click="cambiarEstado(caja)"
                                            :loading="caja.isLoading == 1"
                                        >
                                            <v-icon left>
                                                mdi-cellphone-link
                                            </v-icon>
                                            Habilitar
                                        </v-btn>
                                    </td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    mounted() {
        this.init();
    },
    data: () => ({
        isLoading: false,
        registrado: false,
        cajas: [],
        os: {
            windows: {
                icon: "mdi-microsoft-windows",
                color: "blue",
            },
            mac: {
                icon: "mdi-apple-finder",
                color: "grey",
            },
            linux: {
                icon: "mdi-apple-finder",
                color: "linux",
            },
        },
    }),
    methods: {
        async init() {
            this.isLoading = true;
            await this.$axios
                .get("/cajas")
                .then((result) => {
                    this.cajas = result.data;
                    let encontrado = false;
                    this.cajas.forEach((c) => {
                        if (c.codigo == localStorage.getItem("CASH_CODE")) {
                            encontrado = true;
                        }
                    });
                    console.log(encontrado);
                    this.registrado = encontrado;
                })
                .catch((err) => {
                    console.log(err);
                });
            this.isLoading = false;
        },
        async cambiarEstado(caja) {
            caja.isLoading = true;
            await this.$axios
                .get("/cajas/estado/" + caja.idcaja)
                .then((result) => {
                    caja.estado = result.data.estado;
                })
                .catch((err) => {
                    console.log(err);
                });
            caja.isLoading = false;
        },
    },
    computed: {
        CASH_CODE() {
            return localStorage.getItem("CASH_CODE");
        },
    },
};
</script>

<style></style>
