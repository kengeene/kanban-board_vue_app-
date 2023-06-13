// eslint-disable-next-line import/no-extraneous-dependencies
import { createApp } from "vue";
import ElementPlus from "element-plus";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "element-plus/dist/index.css";

const app = createApp(App);
app.use(router).use(ElementPlus).use(store).mount("#app");
