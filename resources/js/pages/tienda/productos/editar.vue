<template>
    <div>
        <div class="">
            <v-row dense>
                <v-col cols="12">
                    <v-form ref="formCodigo" @submit="skBuscar">
                        <v-card outlined elevation="3" tile>
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12" sm="6" class="py-0">
                                        <v-text-field
                                            height="60"
                                            style="font-size: 25px"
                                            label="Código de Barras [CTRL+Q]"
                                            v-shortkey="['ctrl', 'q']"
                                            @shortkey.native="skBuscarCodigo"
                                            v-model="codigo"
                                            :rules="[rules.requerido]"
                                            ref="buscarCodigo"
                                            prepend-icon="mdi-barcode"
                                            placeholder="Ingrese el Codigo"
                                            @keypress.enter="skBuscar"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col
                                        cols="12"
                                        sm="2"
                                        class="d-flex justify-center align-center py-0"
                                    >
                                        <v-btn
                                            outlined
                                            block
                                            color="accent"
                                            @click="skBuscar"
                                            :loading="isLoading"
                                            v-shortkey="['ctrl', 'b']"
                                            @shortkey.native="skBuscar"
                                        >
                                            Buscar [CTRL+B]
                                            <v-icon right
                                                >mdi-cloud-search-outline</v-icon
                                            >
                                        </v-btn>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="2"
                                        class="d-flex justify-center py-0 align-center"
                                    >
                                        <v-btn
                                            outlined
                                            block
                                            color="grey"
                                            @click="generarCodigo"
                                            :loading="isLoading"
                                        >
                                            Generar Codigo
                                            <v-icon right
                                                >mdi-qrcode-plus</v-icon
                                            >
                                        </v-btn>
                                    </v-col>
                                    <v-col
                                        cols="12"
                                        sm="2"
                                        class="d-flex justify-center py-0 align-center"
                                    >
                                        <v-btn
                                            outlined
                                            block
                                            color="grey"
                                            @click="skLimpiar"
                                            v-shortkey="['ctrl', 'l']"
                                            @shortkey="skLimpiar"
                                            :loading="isLoading"
                                        >
                                            Limpiar [CTRL+L]
                                            <v-icon right>mdi-broom</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-form>
                </v-col>
                <v-col
                    cols="12"
                    class="d-flex justify-center align-center"
                    v-if="isLoading"
                >
                    <v-progress-circular
                        color="primary"
                        indeterminate
                    ></v-progress-circular>
                </v-col>
            </v-row>
            <div class="top-sticky" v-if="isFound && !isLoading">
                <v-card tile color="teal" dark elevation="0">
                    <div
                        class="py-2 px-2"
                        style="font-family: 'Roboto'; font-size: 2em"
                    >
                        <span v-if="isNew">Producto Sin Registrar</span>
                        <span v-else>
                            {{ data.nombre }}
                            {{ data.marca }}
                            {{ data.dimension }}
                        </span>
                    </div>
                </v-card>
            </div>

            <v-container>
                <v-form ref="formProducto" lazy-validation>
                    <v-row dense v-if="isFound && !isLoading">
                        <v-col cols="12" md="12">
                            <v-card
                                outlined
                                elevation="0"
                                class="rounded-lg"
                                tile
                                height="100%"
                            >
                                <v-card-title>
                                    <span v-if="isNew"> Nuevo Producto </span>
                                    <span v-else> Actualizar Producto </span>
                                    <v-chip
                                        label
                                        color="grey--text text--darken-1"
                                        class="v-chip--active ml-1"
                                    >
                                        [CTRL+1]
                                    </v-chip>
                                    <v-chip
                                        color="green--text"
                                        class="v-chip--active"
                                        v-if="isNew"
                                    >
                                        Codigo Nuevo
                                    </v-chip>
                                </v-card-title>
                                <v-divider inset></v-divider>
                                <v-card-text class="py-2">
                                    <v-row dense>
                                        <v-col cols="12" md="2" class="py-0">
                                            <span class="subtitle">
                                                Codigo
                                                <span class="red--text">*</span>
                                            </span>
                                            <v-text-field
                                                disabled
                                                v-model="data.codigo"
                                                ref="codigo"
                                                :rules="[rules.requerido]"
                                                dense
                                                outlined
                                                prepend-icon="mdi-barcode"
                                                placeholder="Nombre"
                                            ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="4" class="py-0">
                                            <span class="subtitle">
                                                Producto
                                                <span class="red--text">*</span>
                                            </span>
                                            <v-textarea
                                                v-shortkey="['ctrl', '1']"
                                                @shortkey.native="
                                                    skEnfocarTextField('nombre')
                                                "
                                                ref="nombre"
                                                v-model="data.nombre"
                                                :rules="[
                                                    rules.requerido,
                                                    rules.min200,
                                                ]"
                                                dense
                                                outlined
                                                rows="1"
                                                prepend-icon="mdi-tag-outline"
                                                placeholder="Nombre"
                                            ></v-textarea>
                                        </v-col>
                                        <v-col cols="12" md="3" class="py-0">
                                            <span class="subtitle">
                                                Marca
                                            </span>
                                            <v-text-field
                                                v-model="data.marca"
                                                dense
                                                outlined
                                                rows="1"
                                                prepend-icon="mdi-trademark"
                                                placeholder="Marca"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="3" class="py-0">
                                            <span class="subtitle">
                                                Tamaño o Dimensión
                                            </span>
                                            <v-text-field
                                                v-model="data.dimension"
                                                dense
                                                outlined
                                                rows="1"
                                                prepend-icon="mdi-image-size-select-small"
                                                placeholder="Tamaño o Dimensión"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="3"
                                            class="py-0"
                                            v-if="false"
                                        >
                                            <span class="subtitle">
                                                Costo Unitario
                                            </span>
                                            <v-text-field
                                                ref="costo"
                                                type="number"
                                                prefix="Q"
                                                v-model="data.costo"
                                                :rules="[rules.min0]"
                                                dense
                                                outlined
                                                prepend-icon="mdi-text-box-outline"
                                                placeholder="##.##"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            md="3"
                                            class="py-0"
                                            v-if="false"
                                        >
                                            <span class="subtitle">
                                                Precio Unitario
                                                <span class="red--text">*</span>
                                            </span>
                                            <v-text-field
                                                ref="precioUnitario"
                                                v-shortkey="['ctrl', 'd']"
                                                @shortkey.native="
                                                    skEnfocarTextField(
                                                        'precioUnitario'
                                                    )
                                                "
                                                type="number"
                                                prefix="Q"
                                                v-model="data.precio"
                                                :rules="[rules.min0]"
                                                dense
                                                outlined
                                                prepend-icon="mdi-text-box-outline"
                                                placeholder="##.##"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-card
                                outlined
                                elevation="0"
                                class="rounded-lg"
                                height="100%"
                            >
                                <v-card-title>
                                    Presentaciones
                                    <v-chip
                                        label
                                        color="grey--text text--darken-1"
                                        class="v-chip--active ml-1"
                                    >
                                        [CTRL+2]
                                    </v-chip>
                                </v-card-title>
                                <v-divider inset></v-divider>
                                <v-card-text class="py-2">
                                    <productos-presentaciones
                                        :costo="data.costo"
                                        :precio_unitario="data.precio"
                                        ref="precios"
                                        v-model="data.precios"
                                    ></productos-presentaciones>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="8">
                            <v-row dense>
                                <v-col cols="12" md="12">
                                    <v-card
                                        outlined
                                        elevation="0"
                                        class="rounded-lg"
                                        height="100%"
                                    >
                                        <v-card-title>
                                            Agregar Existencias
                                            <v-chip
                                                label
                                                color="grey--text text--darken-1"
                                                class="v-chip--active ml-1"
                                            >
                                                [CTRL+2]
                                            </v-chip>
                                        </v-card-title>
                                        <v-divider inset></v-divider>
                                        <v-card-text class="py-2">
                                            <producto-stock
                                                :costo="data.costo"
                                                :precio_unitario="data.precio"
                                                ref="precios"
                                                v-model="data.precios"
                                            ></producto-stock>
                                        </v-card-text>
                                        <v-card-text class="pt-0">
                                            <v-card
                                                class="rounded-lg"
                                                color="teal lighten-5 "
                                                outlined
                                            >
                                                <v-list color="transparent">
                                                    <v-list-item>
                                                        <v-list-item-subtitle
                                                            class="teal--text text--darken-3"
                                                        >
                                                            Existencia Actual
                                                        </v-list-item-subtitle>
                                                        <v-list-item-title
                                                            class="text-right teal--text text--darken-3"
                                                        >
                                                            {{
                                                                data.existencia ||
                                                                0
                                                            }}
                                                            {{ data.unidades }}
                                                        </v-list-item-title>
                                                    </v-list-item>
                                                </v-list>
                                            </v-card>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-card outlined elevation="0" class="rounded-lg">
                                <v-card-title> Vencimientos </v-card-title>
                                <v-card-divider></v-card-divider>
                                <v-card-text> Vencimientos </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-form>
                <v-bottom-navigation app>
                    <v-btn
                        v-shortkey="['ctrl', 'enter']"
                        @shortkey.native="procesar()"
                        large
                        color="primary"
                        tile
                        dark
                        style="white--text"
                        @click="procesar()"
                    >
                        <span class="white--text">
                            Guardar y Agregar otro
                        </span>
                        <span class="white--text"
                            ><strong>[CTRL+ENTER]</strong></span
                        >
                    </v-btn>
                </v-bottom-navigation>
            </v-container>

            <v-nice-modal v-model="saved" @go="confirmado()">
                <template v-slot:titulo> Registro Editado </template>
                <template v-slot:descripcion>
                    El registro ha sido guardado
                </template>
                <template v-slot:btn>
                    <v-icon left>mdi-check</v-icon>
                    Ok, entendido
                </template>
            </v-nice-modal>
            <v-nice-modal
                v-model="error.status"
                color="error"
                @go="error.status = false"
                icon="mdi-alert-outline"
            >
                <template v-slot:titulo> Error </template>
                <template v-slot:descripcion>
                    <div v-html="error.msg"></div>
                </template>
                <template v-slot:btn> Ok, entendido </template>
            </v-nice-modal>
        </div>
    </div>
</template>

<script>
import ProductosPresentaciones from "../../../components/tienda/productos/productosPresentaciones.vue";
import ProductoExistencia from "../../../components/tienda/productos/productoExistencia.vue";
import ProductoStock from "../../../components/tienda/productos/productoStock.vue";

import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
    components: {
        VNiceModal,
        ProductosPrecios,
        ProductoStock,
        ProductoExistencia,
        ProductosPresentaciones,
    },
    mounted() {
        this.$refs.buscarCodigo.$refs.input.focus();
        if (this.$route.query.codigo) {
            this.codigo = this.$route.query.codigo;
            this.$nextTick(() => {
                this.skBuscar();
            });
        }
    },
    data: () => ({
        isLoading: false,
        isNew: false,
        isFound: false,
        saved: false,
        codigo: "",
        data: {
            idproducto: 0,
            codigo: "",
            nombre: "",
            marca: "",
            dimension: "",
            costo: 0,
            caducidad: "",
            existencia: 0,
            precio: 0,
            precios: [],
            recalcular_costo: false,
        },
        error: {
            status: false,
            msg: "",
        },
        rules: {
            requerido: (v) => !!v || "Campo Requerido",
            min40: (v) =>
                (v && v.length <= 40) ||
                "La información no deben superar los 40 caracteres",
            min200: (v) =>
                (v && v.length <= 200) ||
                "La información no deben superar los 200 caracteres",
            min0: (v) =>
                (v >= 0 && v <= 10000) || "El campo estas entre 0 y 10000",
        },
    }),
    methods: {
        generarCodigo() {
            let cod = Math.floor(Math.random() * (999999 - 9999 + 1)) + 9999;
            this.codigo = cod;
            setTimeout(() => {
                this.skBuscar();
            }, 100);
        },
        skBuscarCodigo() {
            this.$refs.buscarCodigo.$refs.input.select();
            this.$refs.buscarCodigo.$refs.input.focus();
        },
        async skBuscar(e) {
            if (e) {
                e.preventDefault();
            }
            if (this.$refs.formCodigo.validate()) {
                this.isLoading = true;
                this.$axios
                    .get("/productos/" + this.codigo)
                    .then((result) => {
                        this.isLoading = false;
                        this.data = result.data;
                        this.isNew = result.data.nombre == "";
                        this.isFound = true;
                        if (this.isNew) {
                            this.productoNuevo();
                        } else {
                            //setTimeout(() => {
                            //    this.$refs.existencia.$refs.input.select();
                            //    this.$refs.existencia.$refs.input.focus();
                            //}, 10);
                        }
                    })
                    .catch((err) => {
                        //this.error.msg = "Usuario no encontrado";
                        //this.error.status = true;
                        //setTimeout(() => {
                        //  this.$router.go(-1);
                        //}, 3000);
                    });
            }
        },
        skLimpiar() {
            this.codigo = "";
            this.isLoading = false;
            this.isNew = false;
            this.isFound = false;
            this.$refs.buscarCodigo.$refs.input.focus();
        },
        skEnfocarTextField(n) {
            this.$refs[n].$refs.input.select();
            this.$refs[n].$refs.input.focus();
        },
        productoNuevo() {
            this.$nextTick(() => {
                this.$refs.nombre.$refs.input.focus();
            });
        },
        confirmar() {
            if (this.$refs.form.validate()) {
                this.procesar();
            }
        },
        async procesar() {
            if (this.$refs.formProducto.validate()) {
                this.isLoading = true;
                await this.$axios
                    .post("/productos", this.data)
                    .then((result) => {
                        this.skLimpiar();
                        this.saved = true;
                        setTimeout(() => {
                            this.saved = false;
                        }, 200);
                    })
                    .catch((err) => {
                        let errores = err.response.data.errors;
                        for (const key in errores) {
                            for (const error in errores[key]) {
                                this.error.msg =
                                    "• " + errores[key][error] + "<br>";
                            }
                        }

                        this.error.status = true;
                    });
                this.isLoading = false;
            }
        },
        confirmado() {
            this.$router.go(-1);
        },
    },
    computed: {
        id() {
            return this.$route.query.id || 0;
        },
    },
};
</script>

<style>
.top-sticky {
    position: -webkit-sticky; /* Safari */
    position: sticky !important;
    top: 64px;
    z-index: 1;
}
</style>
