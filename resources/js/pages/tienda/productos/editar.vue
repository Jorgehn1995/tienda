<template>
    <div>
        <div class="">
            <v-row dense>
                <v-col cols="12" class="mb-1">
                    <v-form ref="formCodigo" @submit="skBuscar">
                        <v-card outlined elevation="3" tile>
                            <v-card-text>
                                <v-row dense>
                                    <v-col cols="12" sm="6">
                                        <v-text-field
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
                                        class="d-flex justify-center align-center"
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
                                        class="d-flex justify-center align-center"
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
                                        class="d-flex justify-center align-center"
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

            <v-form ref="formProducto" lazy-validation>
                <v-row dense v-if="isFound && !isLoading">
                    <v-col cols="12">
                        <v-card tile color="transparent" elevation="0">
                            <v-row dense>
                                <v-col cols="12">
                                    <v-card-title>
                                        <span v-if="isNew"
                                            >Producto Sin Registrar</span
                                        >
                                        <span v-else>{{ data.nombre }}</span>
                                    </v-card-title>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="12">
                        <v-card outlined elevation="3" tile height="100%">
                            <v-card-title>
                                <span v-if="isNew"> Nuevo Producto </span>
                                <span v-else> Actualizar Producto </span>
                                [CTRL+A]
                                <v-chip
                                    color="green--text"
                                    class="v-chip--active"
                                    v-if="isNew"
                                >
                                    Codigo Nuevo
                                </v-chip>
                            </v-card-title>
                            <v-card-text class="py-2">
                                <v-row dense>
                                    <v-col cols="12" md="3" class="py-0">
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
                                            v-shortkey="['ctrl', 'a']"
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
                                            rows="2"
                                            prepend-icon="mdi-tag-outline"
                                            placeholder="Nombre"
                                        ></v-textarea>
                                    </v-col>
                                    <v-col cols="12" md="3" class="py-0">
                                        <span class="subtitle"> Marca </span>
                                        <v-text-field
                                            v-model="data.marca"
                                            dense
                                            outlined
                                            rows="1"
                                            prepend-icon="mdi-trademark"
                                            placeholder="Marca"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="2" class="py-0">
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
                                    <v-col cols="12" class="py-0">
                                        <span class="title"
                                            >Existencia Actual
                                            {{ data.existencia }}</span
                                        >
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-card outlined elevation="3" tile height="100%">
                            <v-card-title>
                                Presentaciones y Precio [CTRL+D]
                            </v-card-title>

                            <v-card-text class="py-2">
                                <productos-precios
                                    :costo="data.costo"
                                    :precio_unitario="data.precio"
                                    ref="precios"
                                    v-model="data.precios"
                                ></productos-precios>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-card outlined elevation="3" tile height="100%">
                            <v-card-title> Stock y Costo [CTRL+S]</v-card-title>
                            <v-card-text class="py-2">
                                <v-row dense>
                                    <v-col cols="12" md="6" class="py-0">
                                        <span class="subtitle">
                                            Agregar Stock
                                        </span>
                                        <v-text-field
                                            v-shortkey="['ctrl', 's']"
                                            @shortkey.native="
                                                skEnfocarTextField('existencia')
                                            "
                                            ref="existencia"
                                            type="number"
                                            v-model="data.existencia_nueva"
                                            :rules="[rules.min0]"
                                            dense
                                            outlined
                                            prepend-icon="mdi-package-variant-plus"
                                            placeholder="Agregar Existencias"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" class="py-0">
                                        <span class="subtitle">
                                            Caducidad
                                        </span>
                                        <v-text-field
                                            v-model="data.caducidad"
                                            ref="caducidad"
                                            type="date"
                                            dense
                                            outlined
                                            prepend-icon="mdi-calendar-outline"
                                            placeholder="Fecha de Vencimiento"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <div class="d-flex justify-center align-center">
                            <v-btn
                                v-shortkey="['ctrl', 'alt', 'enter']"
                                @shortkey.native="procesar()"
                                large
                                color="primary"
                                outlined
                                tile
                                @click="procesar(false)"
                            >
                                <v-icon>mdi-content-save</v-icon>
                                Guardar y Regresar [CTRL+ALT+P]
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                v-shortkey="['ctrl', 'enter']"
                                @shortkey.native="procesar()"
                                large
                                color="primary"
                                tile
                                @click="procesar()"
                            >
                                <v-icon>mdi-content-save</v-icon>
                                Guardar y Agregar otro [CTRL+P]
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-form>

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
import ProductosPrecios from "../../../components/tienda/productos/productosPrecios.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
    components: { VNiceModal, ProductosPrecios },
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
            costo: 0,
            caducidad: "",
            existencia: 0,
            precio: 0,
            precios: [
                {
                    nombre: "Unidad",
                    cantidad: 1,
                    precio: "",
                },
            ],
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
                            this.$nextTick(() => {
                                this.$refs.existencia.$refs.input.select();
                                this.$refs.existencia.$refs.input.focus();
                            });
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
                console.log(this.data);
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

<style></style>
