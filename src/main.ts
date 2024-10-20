// Importa estilos globales y Tailwind CSS
import 'element-plus/dist/index.css';
import './assets/tailwind.css';
import './assets/main.css';

// Importa Vue, el componente principal, el enrutador y Element Plus
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';

// Importa todos los iconos de Element Plus
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// Crea la instancia de la aplicación Vue
const app = createApp(App);

// Usa el enrutador y Element Plus en la aplicación
app.use(router);
app.use(ElementPlus);

// Registra todos los iconos de Element Plus como componentes globales
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// Registra iconos específicos
// app.component('Home', Home);
// app.component('Search', Search);

// Monta la aplicación en el elemento con el ID 'app'
app.mount('#app');
