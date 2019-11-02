<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Quasar App</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Essential Links</q-item-label>
        <q-item>
          <router-link :to="{ name: 'home' }">Inicio</router-link>
        </q-item>
        <q-item>
          <router-link :to="{ name: 'students' }">Estudiantes</router-link>
        </q-item>
        <q-item>
          <router-link :to="{ name: 'academic-years' }">Grados</router-link>
        </q-item>
        <q-item>
          <router-link :to="{ name: 'courses' }">Cursos</router-link>
        </q-item>
        <q-item>
          <router-link :to="{ name: 'teachers' }">Maestros</router-link>
        </q-item>
        <q-item>
          <router-link :to="{ name: 'homeworks' }">Tareas</router-link>
        </q-item>
        <q-item>
          <router-link :to="{ name: 'asistencia' }">Asistencia</router-link>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: false
    };
  }
};
</script>
