<template>
  <div class="q-pa-md">
    <h3>Maestro</h3>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="teacher.nombre" label="Nombres" />
      <q-input outlined v-model="teacher.apellido" label="Apellidos" />
      <q-select
        outlined
        v-model="course"
        :options="courses"
        label="Cursos"
        option-value="id"
        option-label="nombre"
      />
      <q-btn-group outline>
        <q-btn color="primary" v-if="id == 0" label="Guardar" @click="save" />
        <q-btn color="primary" v-if="id > 0" label="Editar" @click="update" />
        <q-btn color="secondary" label="Cancelar" @click="close" />
      </q-btn-group>
    </q-form>
  </div>
</template>
<script>
export default {
  name: "TeacherForm",
  data() {
    return {
      teacher: {
        nombre: "",
        apellido: ""
      },
      courses: [],
      course: {}
    };
  },
  computed: {
    id: {
      get() {
        return this.$store.state.notas.teacherToEdit;
      }
    }
  },
  created() {
    if (this.id) {
      this.getTeacher(this.id);
    }
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
    getTeacher(id) {
      this.$axios
        .get(`http://localhost:8080/maestros/${id}`)
        .then(response => {
          this.teacher = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      delete this.teacher.cursos;
      this.teacher.id_curso = this.course.id;

      this.$axios
        .post("http://localhost:8080/maestros", this.teacher)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    update() {
      delete this.teacher.cursos;
      this.$axios
        .put(`http://localhost:8080/maestros/${this.id}`, this.teacher)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    close() {
      const id = 0;
      this.$store.commit("notas/updateShowTeacherForm", { id });
      this.$store.commit("notas/updateShowTeacherList");
      this.clean();
    },
    clean() {
      this.id = 0;
      this.teacher.nombre = "";
      this.teacher.apellido = "";
    }
  }
};
</script>
