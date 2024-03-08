<template>
    <div>
        <div
            style="height: 200px; width: 100%"
            class="d-flex justify-center align-center"
            v-if="isLoading"
        >
            <v-progress-circular
                color="primary"
                indeterminate
            ></v-progress-circular>
        </div>
        <div
            style="height: 200px; width: 100%"
            class="d-flex justify-center align-center flex-column"
            v-else-if="!isFound"
        >
            <v-icon size="100" color="grey">mdi-database-remove-outline</v-icon>

            <p class="pt-2 grey--text">No se ha encontrado el producto</p>
        </div>
        <div v-else>
            <div class="top-sticky" v-if="isFound && !isLoading">
                <v-card tile color="teal" dark elevation="0">
                    <div
                        v-if="$vuetify.breakpoint.smAndUp"
                        class="py-2 px-2"
                        style="font-family: 'Roboto'; font-size: 2em"
                    >
                        <span v-if="!data.nombre">
                            Producto Sin Registrar
                        </span>
                        <span v-else>
                            {{ data.nombre }}
                            {{ data.marca }}
                            {{ data.dimension }}
                        </span>
                    </div>
                    <div v-else class="py-2 px-2">
                        <span v-if="!data.nombre">
                            Producto Sin Registrar
                        </span>
                        <div v-else>
                            <span
                                style="font-family: 'Roboto'; font-size: 1.5em"
                            >
                                {{ data.nombre }}
                            </span>
                            <br />
                            <span
                                style="font-family: 'Roboto'; font-size: 1.2em"
                            >
                                {{ data.marca }}
                                {{ data.dimension }}
                            </span>
                        </div>
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
                                <v-card-subtitle>
                                    Ingresa los datos generales del producto
                                </v-card-subtitle>
                                <v-divider></v-divider>
                                <v-card-text class="py-2">
                                    <v-row dense>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                            class="py-0"
                                        >
                                            <form-text-field
                                                v-model="data.codigo"
                                                v-shortkey="['ctrl', '1']"
                                                @shortkey.native="
                                                    textfieldEnfocar('codigo')
                                                "
                                                ref="codigo"
                                                :rules="[rules.requerido]"
                                                dense
                                                outlined
                                                label="Código"
                                                placeholder="Código de barras Producto"
                                            >
                                                <template v-slot:append-outer>
                                                    <div class="pt-1 pl-1">
                                                        <v-btn
                                                            icon
                                                            @click="
                                                                codigoGenerar
                                                            "
                                                        >
                                                            <v-icon>
                                                                mdi-qrcode-plus
                                                            </v-icon>
                                                        </v-btn>
                                                    </div>
                                                </template>
                                            </form-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="8"
                                            class="py-0"
                                        >
                                            <form-text-area
                                                ref="producto"
                                                label="Producto"
                                                v-model="data.nombre"
                                                :rules="[
                                                    rules.requerido,
                                                    rules.min200,
                                                ]"
                                                dense
                                                outlined
                                                rows="1"
                                                prepend-icon="mdi-tag-outline"
                                                placeholder="Producto"
                                            ></form-text-area>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                            class="py-0"
                                        >
                                            <form-text-field
                                                label="Marca"
                                                v-model="data.marca"
                                                dense
                                                outlined
                                                placeholder="Marca"
                                            ></form-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                            class="py-0"
                                        >
                                            <form-text-field
                                                label="Dimensión"
                                                v-model="data.dimension"
                                                dense
                                                outlined
                                                placeholder="Dimensión o Tamaño del Producto"
                                            ></form-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                            class="py-0"
                                        >
                                            <form-text-field
                                                label="Detalles"
                                                v-model="data.dimension"
                                                dense
                                                outlined
                                                placeholder="Detalles adicionales del producto"
                                            ></form-text-field>
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
                                <v-card-subtitle>
                                    Agrega las presentaciones en las que se
                                    venderá el producto
                                </v-card-subtitle>
                                <v-divider inset></v-divider>
                                <v-card-text class="py-0">
                                    <productos-presentaciones
                                        :costo="data.costo"
                                        :precio_unitario="data.precio"
                                        ref="precios"
                                        v-model="data.precios"
                                    ></productos-presentaciones>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="5">
                            <v-card
                                outlined
                                elevation="0"
                                class="rounded-lg"
                                height="100%"
                            >
                                <v-card-title>
                                    Registrar Costo
                                    <v-chip
                                        label
                                        color="grey--text text--darken-1"
                                        class="v-chip--active ml-1"
                                    >
                                        [CTRL+3]
                                    </v-chip>
                                </v-card-title>
                                <v-card-subtitle>
                                    Indica el costo del producto
                                </v-card-subtitle>
                                <v-divider></v-divider>
                                <v-card-text class="pt-0">
                                    <v-radio-group v-model="costo">
                                        <v-simple-table>
                                            <template v-slot:default>
                                                <thead>
                                                    <tr>
                                                        <th class="text-left">
                                                            Presentación
                                                        </th>
                                                        <th class="text-center">
                                                            Costo Actual
                                                        </th>
                                                        <th class="text-center">
                                                            Costo Nuevo
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr
                                                        v-for="(
                                                            p, i
                                                        ) in data.precios"
                                                        @click="
                                                            (costo = i),
                                                                textfieldEnfocar(
                                                                    'costo' + i,
                                                                    'corto'
                                                                )
                                                        "
                                                    >
                                                        <td>
                                                            <v-radio
                                                                :key="'p' + i"
                                                                :label="
                                                                    p.nombre ||
                                                                    'Presentacion ' +
                                                                        (i + 1)
                                                                "
                                                                :value="i"
                                                            ></v-radio>
                                                        </td>
                                                        <td>
                                                            Q
                                                            {{
                                                                parseFloat(
                                                                    p.costo || 0
                                                                ).toFixed(2)
                                                            }}
                                                        </td>
                                                        <td>
                                                            <div
                                                                class="pt-1"
                                                                style="
                                                                    min-width: 120px;
                                                                "
                                                            >
                                                                <v-text-field
                                                                    label="Costo Nuevo"
                                                                    :ref="
                                                                        'costo' +
                                                                        i
                                                                    "
                                                                    :disabled="
                                                                        costo !=
                                                                        i
                                                                    "
                                                                    hide-details=""
                                                                    outlined
                                                                    class="rounded-lg"
                                                                    dense
                                                                    type="number"
                                                                    prefix="Q"
                                                                    v-model="
                                                                        data
                                                                            .precios[
                                                                            i
                                                                        ]
                                                                            .costo_nuevo
                                                                    "
                                                                ></v-text-field>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </template>
                                        </v-simple-table>
                                    </v-radio-group>
                                    <p>
                                        Selecciona la presentacion e indica el
                                        costo de la presentación, el resto de
                                        costos será calculado de forma
                                        automatica
                                    </p>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="7">
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
                                <v-card-subtitle>
                                    Agrega existencias del producto registrado
                                </v-card-subtitle>
                                <v-divider></v-divider>
                                <v-card-text class="py-2">
                                    <productos-existencias
                                        :costo="data.costo"
                                        :precio_unitario="data.precio"
                                        ref="precios"
                                        v-model="data.precios"
                                        :existencia="data.existencia"
                                    ></productos-existencias>
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
                                                    {{ data.existencia }}
                                                    {{ data.unidades }}
                                                </v-list-item-title>
                                            </v-list-item>
                                        </v-list>
                                    </v-card>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-card outlined elevation="0" class="rounded-lg">
                                <v-card-title> Vencimientos </v-card-title>
                                <v-card-subtitle>
                                    Visualiza los ultimos 10 ingresos de
                                    productos y modifica las fechas de
                                    vencimiento de los productos ingresados
                                </v-card-subtitle>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <p>
                                        Si quieres marcar producto como revisado
                                        debes ingresar, al apartado de revisar
                                        mercadería
                                    </p>
                                    <v-btn text outlined>
                                        <v-icon left>
                                            mdi-file-document-outline
                                        </v-icon>
                                        Revisión de Productos
                                    </v-btn>
                                    <productos-vencimientos
                                        v-model="data.vencimientos"
                                    ></productos-vencimientos>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12">
                            <v-row dense>
                                <v-col
                                    cols="12"
                                    sm="6"
                                    md="3"
                                    order="3"
                                    order-sm="1"
                                >
                                    <v-btn
                                        outlined
                                        @click="$router.go(-1)"
                                        block
                                    >
                                        <v-icon left>mdi-chevron-left</v-icon>
                                        Regresar
                                    </v-btn>
                                </v-col>

                                <v-col cols="12" sm="6" md="3" order="2">
                                    <v-btn
                                        color="teal"
                                        dark
                                        outlined
                                        @click="procesar(false)"
                                        block
                                        :loading="isSaving"
                                    >
                                        <v-icon left>mdi-content-save</v-icon>
                                        Guardar y Ver
                                    </v-btn>
                                </v-col>
                                <v-col
                                    cols="12"
                                    sm="12"
                                    md="6"
                                    order="1"
                                    order-sm="3"
                                >
                                    <v-btn
                                        color="teal"
                                        dark
                                        @shortkey.native="procesar()"
                                        @click="procesar()"
                                        v-shortkey="['ctrl', 'enter']"
                                        block
                                        :loading="isSaving"
                                    >
                                        <v-icon left>
                                            mdi-arrow-u-left-bottom
                                        </v-icon>
                                        Guardar y Regresar [CTRL+ENTER]
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
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
import ProductoUnidadesPresentaciones from "../../../components/productos/productoUnidadesPresentaciones.vue";
import ProductosExistencias from "../../../components/tienda/productos/productosExistencias.vue";
import FormTextArea from "../../../components/forms/form-text-area.vue";
import FormTextField from "../../../components/forms/form-text-field.vue";
import ProductosVencimientos from "../../../components/tienda/productos/productosVencimientos.vue";
import ProductosPresentaciones from "../../../components/tienda/productos/productosPresentaciones.vue";
import VNiceModal from "../../../components/tienda/generales/v-nice-modal.vue";
export default {
    components: {
        VNiceModal,
        ProductosExistencias,
        ProductosPresentaciones,
        ProductosVencimientos,
        FormTextField,
        FormTextArea,
        ProductoUnidadesPresentaciones,
    },
    mounted() {
        if (this.id) {
            this.productoObtener();
        } else {
            this.$nextTick(() => {
                this.$refs["codigo"].$refs["field"].$refs.input.select();
            });
        }
    },
    data: () => ({
        isLoading: false,
        isSaving: false,
        isNew: true,
        isFound: true,
        saved: false,
        codigo: "",
        costo: -1,
        tab: 0,
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
            precios: [
                {
                    nombre: "Unidad",
                    cantidad: 1,
                    precio: 0,
                    costo: 0,
                    costo_nuevo: 0,
                    existencia: "",
                    stock_nuevo: 0,
                    vencimiento: "",
                },
            ],
            vencimientos: [],
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
        codigoGenerar() {
            let cod = Math.floor(Math.random() * (999999 - 9999 + 1)) + 9999;
            this.data.codigo = cod * 2;
            this.$refs["producto"].$refs["field"].$refs.input.focus();
        },
        textfieldEnfocar(n, p = "largo") {
            if (p == "largo") {
                this.$refs[n].$refs["field"].$refs.input.select();
                this.$refs[n].$refs["field"].$refs.input.focus();
            } else {
                this.$nextTick(() => {
                    this.$refs[n][0].$refs.input.select();
                    this.$refs[n][0].$refs.input.focus();
                });
            }
        },
        async productoObtener() {
            this.isLoading = true;
            await this.$axios
                .get("/productos/" + this.id)
                .then((result) => {
                    this.isLoading = false;
                    this.isFound = true;
                    this.data = result.data;

                    this.isFound = true;
                })
                .catch((err) => {
                    //this.error.msg = "Usuario no encontrado";
                    //this.error.status = true;
                    //setTimeout(() => {
                    //  this.$router.go(-1);
                    //}, 3000);
                });
        },
        confirmar() {
            if (this.$refs.form.validate()) {
                this.procesar();
            }
        },
        async procesar(regresar = true) {
            if (this.$refs.formProducto.validate()) {
                this.isSaving = true;
                await this.$axios
                    .post("/productos", this.data)
                    .then((result) => {
                        if (regresar) {
                            this.$router.go(-1);
                        } else {
                            this.$router.replace(
                                "/tienda/productos/" + result.data.idproducto
                            );
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                        //this.error.status = true;
                    });
                this.isSaving = false;
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
