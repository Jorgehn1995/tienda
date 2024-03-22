import Vue from "vue";
import moment from "moment";
import "moment/locale/es";
moment.locale("es");
/**
 * Date library momentjs
 * https://momentjs.com/
 */
Vue.prototype.$moment = moment;
