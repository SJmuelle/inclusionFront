<template>
  <div class="container mx-auto p-6">
    <!-- Sección de Notificaciones -->
  <!-- Sección de Notificaciones con animaciones -->
<transition-group name="fade" tag="div">
  <div v-if="notifications.length" class="bg-green-200 text-green-800 p-4 mb-4 rounded-lg">
    <h3 class="font-semibold mb-2">Notificaciones:</h3>
    <ul>
      <transition-group name="slide" tag="ul">
        <li v-for="(notification, index) in notifications" :key="index" class="notification-item">
          {{ notification }}
        </li>
      </transition-group>
    </ul>
  </div>
</transition-group>


    <!-- Título con icono -->
    <div class="flex items-center mb-6">
      <font-awesome-icon icon="warehouse" class="text-3xl mr-3 text-blue-500" />
      <h2 class="text-3xl font-bold">Gestión de Bodegas</h2>
    </div>



    <!-- Formulario para agregar o editar bodegas -->
    <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded-lg px-8 py-6 mb-6">
      <div class="mb-4">
        <label for="bodega" class="block text-gray-700 text-sm font-bold mb-2">Bodega:</label>
        <select v-model="selectedBodega" required class="border rounded-lg w-full p-2">
          <option value="" disabled selected>Selecciona una bodega</option>
          <option v-for="bodega in filteredBodegas" :key="bodega.id" :value="bodega.id">
            {{ bodega.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-4">
        <label for="descripcion" class="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
        <textarea v-model="descripcion" required class="border rounded-lg w-full p-2" rows="4"></textarea>
      </div>
      <div class="flex justify-end">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          {{ isEditing ? 'Actualizar' : 'Crear' }}
        </button>
        <button
          type="button"
          @click="clearForm"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2">
          Cancelar
        </button>
      </div>
    </form>


        <!-- Barra de Búsqueda -->
        <div class="mb-6">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar bodega..."
        class="border rounded-lg w-full p-2"
      />
    </div>

    <!-- Lista de bodegas en forma de tabla -->
    <h3 class="text-xl font-semibold mb-2">Lista de Bodegas</h3>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th class="py-3 px-6 text-left">Nombre</th>
            <th class="py-3 px-6 text-left">Descripción</th>
            <th class="py-3 px-6 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <tr v-for="bodega in filteredBodegas" :key="bodega.id" class="border-b border-gray-200 hover:bg-gray-100">
            <td class="py-3 px-6 text-left">{{ bodega.nombre }}</td>
            <td class="py-3 px-6 text-left">{{ bodega.descripcion }}</td>
            <td class="py-3 px-6 text-center">
              <button
                @click="editBodega(bodega)"
                class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded">
                Editar
              </button>
              <button
                @click="deleteBodega(bodega.id)"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded ml-2">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {


  data() {
    return {
      bodegas: [], // Lista de bodegas
      selectedBodega: null, // ID de la bodega seleccionada
      descripcion: '', // Descripción de la bodega
      isEditing: false, // Estado de edición
      editingBodegaId: null, // ID de la bodega que se está editando
      searchQuery: '', // Consulta de búsqueda
      notifications: [], // Notificaciones
    };
  },
  computed: {
    filteredBodegas() {
      return this.bodegas.filter(bodega =>
        bodega.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchBodegas() {
      // Simulación de obtención de datos de una API
      this.bodegas = [
        { id: 1, nombre: 'Bodega A', descripcion: 'Descripción A' },
        { id: 2, nombre: 'Bodega B', descripcion: 'Descripción B' },
        { id: 3, nombre: 'Bodega C', descripcion: 'Descripción C' },
      ];
      this.notifications.push('Bodegas cargadas con éxito.');
      setTimeout(() => {
        this.notifications.shift(); // Elimina la primera notificación en la lista
      }, 5000);
    },
    handleSubmit() {
      if (this.isEditing) {
        this.updateBodega();
      } else {
        this.createBodega();
      }
      this.clearForm();
    },
    createBodega() {
      const newBodega = {
        id: this.bodegas.length + 1,
        nombre: `Bodega ${this.bodegas.length + 1}`,
        descripcion: this.descripcion,
      };
      this.bodegas.push(newBodega);
      this.notifications.push('Bodega creada!');
    },
    updateBodega() {
      const index = this.bodegas.findIndex(b => b.id === this.editingBodegaId);
      if (index !== -1) {
        this.bodegas[index].descripcion = this.descripcion;
        this.notifications.push('Bodega actualizada!');
      }
    },
    deleteBodega(id) {
      this.bodegas = this.bodegas.filter(bodega => bodega.id !== id);
      this.notifications.push('Bodega eliminada!');
    },
    editBodega(bodega) {
      this.selectedBodega = bodega.id;
      this.descripcion = bodega.descripcion;
      this.isEditing = true;
      this.editingBodegaId = bodega.id;
    },
    clearForm() {
      this.selectedBodega = null;
      this.descripcion = '';
      this.isEditing = false;
      this.editingBodegaId = null;
    },
  },
  mounted() {
    this.fetchBodegas();
  },
};
</script>

<style scoped>
/* Animación para que las notificaciones se deslicen hacia adentro y hacia afuera */
@keyframes slideIn {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  0% {
    transform: translateX(0);
    opacity: 1;
  }
  100% {
    transform: translateX(100%);
    opacity: 0;
  }
}

.notification-item {
  transition: all 0.5s ease;
  animation: slideIn 0.5s ease-out;
}

/* Animaciones de entrada y salida para el grupo de notificaciones */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slideIn 0.5s ease-out;
}
.slide-leave-active {
  animation: slideOut 0.5s ease-out;
}

</style>
