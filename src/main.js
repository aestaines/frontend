import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify"; // ✅ Fix Import (no semicolon at the end)

createApp(App)
  .use(router)
  .use(vuetify)
  .mount("#app");