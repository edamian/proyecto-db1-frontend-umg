<template>
  <div class="q-pa-md">
    <q-table title="Cursos" :data="courses" :columns="columns">
      <template v-slot:top>
        <q-btn flat dense color="primary" label="Agregar" @click="addRow(0)" />
        <q-space />
        <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="nombre" :props="props">{{ props.row.nombre }}</q-td>
          <q-td>
            <q-btn-group>
              <q-btn color="green" @click="addRow(props.row.id)">Editar</q-btn>
              <q-btn color="red" @click="deleteRow(props.row.id)">Eliminar</q-btn>
              <q-btn color="blue" @click="takeCourseAssistance(props.row.id)">Tomar asistencia</q-btn>
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  name: "CourseList",
  data() {
    return {
      filter: "",
      courses: [],
      columns: [
        {
          name: "nombre",
          label: "Nombre",
          field: "nombre",
          sortable: true
        },
        {
          name: "opciones",
          label: "Opciones",
          field: "id"
        }
      ]
    };
  },
  created() {
    this.getCourses();
  },
  methods: {
    getCourses() {
      this.$axios
        .get("http://localhost:8080/cursos")
        .then(response => {
          this.courses = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addRow(id) {
      this.$store.commit("notas/updateShowCourseForm", { id });
      this.$store.commit("notas/updateShowCourseList");
    },
    deleteRow(id) {
      this.$axios
        .delete(`http://localhost:8080/cursos/${id}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    },
    takeCourseAssistance(courseId) {
      console.log("asistencia");
      console.log(courseId);
      this.$router.push({ name: "asistencia", params: { courseId: courseId } });
    }
  }
};
</script>
