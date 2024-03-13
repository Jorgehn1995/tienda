import moment from "moment";
const url = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
    "i"
);
const email = new RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
const decimal = /^\d+(\.\d{1,2})?$/;
const v5 = {
    text: {
        required: (v) =>
            (v && Boolean(v) && !!v.trim()) || "El campo es obligatorio",
        min:
            (m = 1) =>
            (v) => {
                return v
                    ? v.length >= m ||
                          "El campo debe tener un mínimo de " +
                              m +
                              " caracteres"
                    : true;
            },
        max:
            (m = 1) =>
            (v) => {
                return v
                    ? v.length <= m ||
                          "El campo debe tener un máximo de " +
                              m +
                              " caracteres"
                    : true;
            },
        confirmation: (p) => (v) => {
            return p === v || "Las contraseñas no coinciden";
        },
        url: (v) =>
            v ? url.test(v) || "Ingrese una dirección web (URL) válida" : true,
        email: (v) =>
            v ? !v || email.test(v) || "Ingrese un correo válido" : true,
        block: (p) => (v) => {
            let r = new RegExp("(?<= |^)" + p + "(?= |$)", "i");
            return (
                !v ||
                !r.test(v) ||
                "Solo agrega la especialidad del " +
                    p +
                    ". ej: En Ciencias y Letras"
            );
        },
    },

    number: {
        required: (value) =>
            (value && Number.isInteger(Number(value))) ||
            "El campo debe se un número entero válido",
        money: (v) =>
            (v && (decimal.test(v) || Number.isInteger(Number(value)))) ||
            "Debes ingresar un monto válido",
        min:
            (m = 1) =>
            (v) => {
                return (
                    (v && Number.isInteger(Number(v)) && v >= m) ||
                    "El campo debe tener un mínimo de " + m
                );
            },
        max:
            (m = 1) =>
            (v) => {
                return (
                    (v && Number.isInteger(Number(v)) && v <= m) ||
                    "El campo debe tener un máximo de " + m
                );
            },
        between:
            (mn = 1, mx = 5) =>
            (v) => {
                return (
                    (v && Number.isInteger(Number(v)) && v >= mn && v <= mx) ||
                    "El numero debe ser entre " + mn + " y " + mx
                );
            },
    },

    array: {
        required: (v) =>
            (v && v.length > 0) || "Debe seleccionar al menos 1 elemento",
    },
    datetime: {
        required: (v) =>
            (v && moment(v, "YYYY-MM-DD").isValid()) ||
            "Debes ingresar una fecha válida",
    },
    date: {
        required: (v) =>
            (v && moment(v, "YYYY-MM-DD").isValid()) ||
            "Debes ingresar una fecha válida",
        age: (v) => {
            let ys = moment().diff(v, "years");
            if (v && moment(v, "YYYY-MM-DD").isValid() && ys > 0 && ys < 100) {
                return true;
            } else {
                return "Ingresa una fecha válida";
            }
        },
        before: (inicio) => (fin) => {
            return (
                (inicio && fin && moment(inicio).isBefore(fin)) ||
                "La fecha debe ser anterior a la fecha de " +
                    moment(fin).format("DD/MM/YYYY")
            );
        },
        after: (inicio, fin) => {
            return (
                moment(inicio).isBefore(fin) ||
                "La fecha debe ser posterior a la fecha de " +
                    moment(inicio).format("DD/MM/YYYY")
            );
        },
    },
    url: {
        required: {
            default: (value) =>
                (value && url.test(value)) || "Ingrese una URL valida",
        },
    },
};
export { v5 as default };
