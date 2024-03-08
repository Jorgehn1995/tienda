<template>
    <div>
        <div v-shortkey="['ctrl', 2]" @shortkey="skPreciosFocus"></div>
        <div v-shortkey="['ctrl', 'a']" @shortkey="agregarPrecio()"></div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Presentación</th>
                        <th class="text-center">Unidades</th>
                        <th class="text-center">Costo</th>
                        <th class="text-center">Precio</th>
                        <th>
                            <v-icon>mdi-dots-horizontal</v-icon>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(precio, index) in precios">
                        <td style="height: 60px !important">
                            <div
                                class="d-flex justify-center align-center"
                                style="min-width: 120px"
                            >
                                <v-text-field
                                    class="rounded-lg"
                                    :ref="'nombre' + index"
                                    v-model="precios[index].nombre"
                                    :rules="[rules.requerido]"
                                    placeholder="Nombre de la presentacion"
                                    persistent-hint
                                    outlined
                                    dense
                                ></v-text-field>
                            </div>
                        </td>
                        <td>
                            <div style="min-width: 120px">
                                <v-text-field
                                    type="number"
                                    :ref="'cantidad' + index"
                                    v-model="precios[index].cantidad"
                                    :rules="[rules.min1]"
                                    persistent-hint
                                    class="rounded-lg"
                                    outlined
                                    dense
                                    placeholder="###"
                                ></v-text-field>
                            </div>
                        </td>
                        <td class="d-flex justify-center align-top pt-1">
                            <div class="pt-1" style="white-space: nowrap">
                                Q
                                {{
                                    parseFloat(precios[index].costo).toFixed(2)
                                        | formatCurrency
                                }}
                            </div>
                        </td>
                        <td>
                            <div style="min-width: 120px">
                                <v-text-field
                                    :ref="'3' + index"
                                    v-model="precios[index].precio"
                                    persistent-hint
                                    type="number"
                                    :rules="[rules.min0]"
                                    class="rounded-lg"
                                    dense
                                    outlined
                                    prefix="Q"
                                    :placeholder="posiblePrecio(index)"
                                ></v-text-field>
                            </div>
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

        <div class="mb-2">
            <v-btn outlined @click="agregarPrecio" color="accent">
                Agregar Precio [CTRL+A]
            </v-btn>
            <v-btn
                outlined
                class="ml-1 mb-1"
                text
                v-for="(t, ind) in predeterminados"
                :key="'nom' + ind"
                @click="agregarPredeterminadas(t)"
                >{{ t.nombre }}</v-btn
            >
            <div></div>
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
    mounted() {
        this.$nextTick(() => {
            const textFields = document.querySelectorAll(".text-field-input");
            textFields.forEach((textField, index) => {
                textField.addEventListener("keydown", (event) => {
                    const key = event.key;
                    const nextIndex =
                        index +
                        (key === "ArrowDown" ? 1 : key === "ArrowUp" ? -1 : 0);
                    if (nextIndex >= 0 && nextIndex < textFields.length) {
                        event.preventDefault();
                        textFields[nextIndex].focus();
                    }
                });
            });
        });
    },

    data: () => ({
        predeterminados: [
            {
                nombre: "Unidad",
                cantidad: 1,
                precio: "",
                existencia: 0,
                stock_nuevo: 0,
                costo: 0,
                costo_nuevo: 0,
                vencimiento: "",
            },
            {
                nombre: "Media Docena",
                cantidad: 6,
                precio: "",
                existencia: 0,
                stock_nuevo: 0,
                costo: 0,
                costo_nuevo: 0,
                vencimiento: "",
            },
            {
                nombre: "Docena",
                cantidad: 12,
                precio: "",
                existencia: 0,
                stock_nuevo: 0,
                costo: 0,
                costo_nuevo: 0,
                vencimiento: "",
            },
            {
                nombre: "Blister",
                cantidad: "",
                precio: "",
                existencia: 0,
                stock_nuevo: 0,
                costo: 0,
                costo_nuevo: 0,
                vencimiento: "",
            },
            {
                nombre: "Media Caja",
                cantidad: "",
                precio: "",
                existencia: 0,
                stock_nuevo: 0,
                costo: 0,
                costo_nuevo: 0,
                vencimiento: "",
            },
            {
                nombre: "Caja",
                cantidad: "",
                precio: "",
                existencia: 0,
                stock_nuevo: 0,
                costo: 0,
                costo_nuevo: 0,
                vencimiento: "",
            },
        ],
        rules: {
            requerido: (v) => !!v || "Campo Requerido",
            min0: (v) => v > 0 || "El precio debe ser mayor a 0",
            min1: (v) => v >= 1 || "La cantidad debe ser mayor a 0",
        },
    }),
    methods: {
        agregarPrecio(precio) {
            this.precios.push({
                cantidad: "",
                nombre: "",
                precio: "",
                existencia: 0,
                stock_nuevo: 0,
                costo: 0,
                costo_nuevo: 0,
                vencimiento: "",
            });

            let name = "nombre" + (this.precios.length - 1);
            this.$nextTick(() => {
                this.$refs[name][0].$refs.input.focus();
            });
        },
        agregarPredeterminadas(e) {
            this.precios.push(JSON.parse(JSON.stringify(e)));

            setTimeout(() => {
                if (e.cantidad) {
                    this.$refs[
                        "precio" + (this.precios.length - 1)
                    ][0].$refs.input.focus();
                } else {
                    this.$refs[
                        "cantidad" + (this.precios.length - 1)
                    ][0].$refs.input.focus();
                }
            }, 100);
        },
        posiblePrecio(i) {
            return i > 0 &&
                this.precios[0].precio > 0 &&
                this.precios[i].cantidad > 0
                ? (this.precios[i].cantidad * this.precios[0].precio).toString()
                : "00.00";
        },
        eliminarPrecio(index) {
            this.precios.splice(index, 1);
        },

        skPreciosFocus() {
            this.$refs["nombre0"][0].$refs.input.focus();
            this.$refs["nombre0"][0].$refs.input.select();
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
