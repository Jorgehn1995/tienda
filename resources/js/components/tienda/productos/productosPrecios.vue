<template>
    <div>
        <div v-shortkey="['ctrl', 1]" @shortkey="skPreciosFocus"></div>
        <div v-shortkey="['ctrl', 0]" @shortkey="agregarPrecio()"></div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Nombre Presentación</th>
                        <th class="text-left">Unidades</th>
                        <th class="text-left">Precio</th>
                        <th>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(precio, index) in precios">
                        <td>
                            <v-text-field
                                :ref="'nombre' + index"
                                v-model="precios[index].nombre"
                                persistent-hint
                                dense
                                outlined
                                prepend-icon="mdi-card-text-outline"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                type="number"
                                :ref="'cantidad' + index"
                                v-model="precios[index].cantidad"
                                :rules="[rules.min1]"
                                @keyup="renombrarPrecio(index)"
                                persistent-hint
                                dense
                                outlined
                                prepend-icon="mdi-food-apple-outline"
                                placeholder="###"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-text-field
                                :ref="'precio' + index"
                                v-model="precios[index].precio"
                                persistent-hint
                                type="number"
                                :rules="[rules.min0]"
                                dense
                                outlined
                                prefix="Q"
                                :placeholder="posiblePrecio(index)"
                            ></v-text-field>
                        </td>
                        <td>
                            <v-btn
                                icon
                                :disabled="precios[index].cantidad == 1"
                                @click="eliminarPrecio(index)"
                            >
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <div v-if="false">
            <div
                v-for="(precio, index) in precios"
                :key="'precio' + index"
                outlined
                class="mb-1"
            >
                <v-row dense no-gutters>
                    <v-col cols="11">
                        <v-row dense>
                            <div v-if="false">
                                <v-col cols="12" md="2" class="py-0">
                                    <v-list-item class="pl-0">
                                        <v-list-item-content
                                            >Estado:</v-list-item-content
                                        >
                                        <v-list-item-content class="text-right">
                                            Activo
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>

                                <v-col cols="2" class="py-0">
                                    <v-list-item class="pl-0">
                                        <v-list-item-content
                                            >Precio Normal:</v-list-item-content
                                        >
                                        <v-list-item-content class="text-right">
                                            <span
                                                v-if="
                                                    precios[index].cantidad *
                                                    precio_unitario
                                                "
                                            >
                                                Q
                                                {{
                                                    precios[index].cantidad *
                                                    precio_unitario
                                                }}
                                            </span>
                                            <span v-else>Q 0</span>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="2" class="py-0">
                                    <v-list-item>
                                        <v-list-item-content
                                            >Descuento:</v-list-item-content
                                        >
                                        <v-list-item-content class="text-right">
                                            <span
                                                v-if="precios[index].precio > 0"
                                                >Q
                                                {{
                                                    precios[index].cantidad *
                                                        precio_unitario -
                                                    precios[index].precio
                                                }}</span
                                            >
                                            <span v-else>Q 0</span>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="2" class="py-0">
                                    <v-list-item>
                                        <v-list-item-content
                                            >Precio Final:</v-list-item-content
                                        >
                                        <v-list-item-content class="text-right">
                                            <span v-if="precios[index].precio"
                                                >Q
                                                {{
                                                    precios[index].precio
                                                }}</span
                                            >
                                            <span v-else>Q 0</span>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="12" md="2" class="py-0">
                                    <v-list-item class="pl-0">
                                        <v-list-item-content
                                            >Costo:</v-list-item-content
                                        >
                                        <v-list-item-content class="text-right">
                                            <span
                                                v-if="
                                                    precios[index].cantidad *
                                                    costo
                                                "
                                            >
                                                Q
                                                {{
                                                    precios[index].cantidad *
                                                    costo
                                                }}
                                            </span>
                                            <span v-else>Q 0</span>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="2" class="py-0">
                                    <v-list-item>
                                        <v-list-item-content
                                            >Ganancia:</v-list-item-content
                                        >
                                        <v-list-item-content class="text-right">
                                            <span v-if="precios[index].precio"
                                                >Q
                                                {{
                                                    precios[index].precio -
                                                    precios[index].cantidad *
                                                        costo
                                                }}</span
                                            >
                                            <span v-else>Q 0</span>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                            </div>
                            <v-col cols="12" md="4" class="py-0">
                                <span class="subtitle"> Nombre Oferta</span>
                                <v-text-field
                                    :ref="'nombre' + index"
                                    v-model="precios[index].nombre"
                                    persistent-hint
                                    dense
                                    outlined
                                    prepend-icon="mdi-card-text-outline"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <span class="subtitle">
                                    Unidades <span class="red--text">*</span>
                                </span>
                                <v-text-field
                                    type="number"
                                    :ref="'cantidad' + index"
                                    v-model="precios[index].cantidad"
                                    :rules="[rules.min1]"
                                    @keyup="renombrarPrecio(index)"
                                    persistent-hint
                                    dense
                                    outlined
                                    prepend-icon="mdi-food-apple-outline"
                                    placeholder="###"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" class="py-0">
                                <span class="subtitle">
                                    Precio
                                    <span class="red--text">*</span>
                                </span>
                                <v-text-field
                                    :ref="'precio' + index"
                                    v-model="precios[index].precio"
                                    persistent-hint
                                    type="number"
                                    :rules="[rules.min0]"
                                    dense
                                    outlined
                                    prefix="Q"
                                    placeholder="00.00"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="2" class="py-0" v-if="false">
                                <span class="subtitle"> Limite x Compra</span>
                                <v-text-field
                                    type="number"
                                    :ref="'limite' + index"
                                    v-model="precios[index].limite"
                                    min="0"
                                    dense
                                    outlined
                                    prepend-icon="mdi-ticket-confirmation-outline"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="2" class="py-0" v-if="false">
                                <span class="subtitle"> Fecha Limite</span>
                                <v-text-field
                                    type="date"
                                    clearable
                                    :ref="'limite' + index"
                                    v-model="precios[index].fecha"
                                    min="1"
                                    dense
                                    outlined
                                    prepend-icon="mdi-ticket-confirmation-outline"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="1" class="d-flex justify-center align-center">
                        <v-btn
                            icon
                            :disabled="precios[index].cantidad == 1"
                            @click="eliminarPrecio(index)"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
                <v-divider></v-divider>
            </div>
        </div>
        <div class="mb-2">
            <v-btn outlined @click="agregarPrecio" color="accent">
                Agregar Precio [CTRL+0]
            </v-btn>
            <v-btn @click="agregarPredeterminadas()"> P. Medicas </v-btn>
            <div v-if="false">
                <v-btn
                    text
                    v-for="(t, ind) in nombres"
                    :key="'nom' + ind"
                    :color="t.nombre == 'Agregar Precio' ? 'primary' : ''"
                    :outlined="t.nombre == 'Agregar Precio'"
                    :large="t.nombre == 'Agregar Precio'"
                    @click="agregarPrecio(t)"
                    >{{ t.nombre }}</v-btn
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Array,
            default: () => [],
        },
        costo: {
            type: [Number, String],
            default: 0,
        },
        precio_unitario: {
            type: [Number, String],
            default: 0,
        },
    },

    data: () => ({
        nombrePrecios: {
            1: "Unidad",
            3: "Tres",
            6: "Seis",
            12: "Doce",
            50: "Cincuenta",
            100: "Cien",
            1000: "Mil",
        },
        nombres: [
            { cantidad: 1, nombre: "Unidad" },
            { cantidad: 6, nombre: "Seis" },
            { cantidad: 12, nombre: "Doce" },
            { cantidad: 50, nombre: "Ciencuenta" },
            { cantidad: 100, nombre: "Cien" },
            { cantidad: 1000, nombre: "Mil" },
        ],
        rules: {
            requerido: (v) => !!v || "Campo Requerido",
            min0: (v) => v > 0 || "El precio debe ser mayor a 0",
            min1: (v) => v >= 1 || "La cantidad debe ser mayor a 0",
        },
    }),
    methods: {
        agregarPrecio(precio) {
            if (!precio) {
                this.precios.push({
                    cantidad: "",
                    nombre: "",
                    precio: "",
                    limite: 0,
                    descuento: 0,
                    fecha: "",
                });
            } else {
                this.precios.push({
                    cantidad: precio.cantidad,
                    nombre: precio.nombre,
                    precio: "",
                    limite: 0,
                    descuento: 0,
                    fecha: "",
                });
            }

            let name = "cantidad" + (this.precios.length - 1);
            this.$nextTick(() => {
                this.$refs[name][0].$refs.input.focus();
            });
        },
        agregarPredeterminadas() {
            let p = [
                {
                    nombre: "Unidad",
                    cantidad: 1,
                    precio: "",
                },
                {
                    nombre: "Media Docena",
                    cantidad: 6,
                    precio: "",
                },
                {
                    nombre: "Docena",
                    cantidad: 12,
                    precio: "",
                },
                {
                    nombre: "Blister",
                    cantidad: "",
                    precio: "",
                },
                {
                    nombre: "Media Caja",
                    cantidad: "",
                    precio: "",
                },
                {
                    nombre: "Caja",
                    cantidad: "",
                    precio: "",
                },
            ];
            p.forEach((e) => {
                this.precios.push(JSON.parse(JSON.stringify(e)));
            });
        },
        posiblePrecio(i) {
            return i > 0 && this.precios[0].precio > 0
                ? this.precios[i].cantidad * this.precios[0].precio
                : "00.00";
        },
        eliminarPrecio(index) {
            this.precios.splice(index, 1);
        },

        skPreciosFocus() {
            this.$refs["precio0"][0].$refs.input.focus();
        },
        renombrarPrecio(index, cantidad) {
            let nombre = this.nombrePrecios[this.precios[index].cantidad];
            if (nombre) {
                this.precios[index].nombre = nombre;
            } else {
                this.precios[index].nombre = "";
            }
        },
        calcularCosto(p) {
            return (this.costo || 0) * (p.cantidad || 0);
        },
        calcularGanancia(p) {
            let precio = p.precio;
            return precio - this.calcularCosto(p);
        },
    },
    computed: {
        precios: {
            get() {
                return this.value;
            },
            set(n) {
                this.$emit("input", n);
            },
        },
    },
};
</script>

<style></style>
