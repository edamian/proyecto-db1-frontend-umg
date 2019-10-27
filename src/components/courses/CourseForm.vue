<template>
  <div class="q-pa-md">
    <h3>Curso</h3>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="course.nombre" label="Nombre" />
      <q-select
        outlined
        v-model="course.anio"
        :options="academicYears"
        label="Año"
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
  name: "CourseForm",
  data() {
    return {
      course: {
        id: 0,
        nombre: ""
      },
      academicYears: [],
      year: {}
    };
  },
  computed: {
    id: {
      get() {
        return this.$store.state.notas.courseToEdit;
      }
    }
  },
  created() {
    if (this.id) {
      this.getCourse(this.id);
    }
    this.getYears();
  },
  methods: {
    getYears() {
      this.$axios
        .get(`http://localhost:8080/anios`)
        .then(response => {
          this.academicYears = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    getCourse(id) {
      this.$axios
        .get(`http://localhost:8080/cursos/${id}`)
        .then(response => {
          this.course = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      let yearId = this.course.anio.id;
      delete this.course.anio;
      this.course.id_anio = yearId;
      this.$axios
        .post("http://localhost:8080/cursos", this.course)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    update() {
      let yearId = this.course.anio.id;
      delete this.course.anio;
      this.course.id_anio = yearId;
      this.$axios
        .put(`http://localhost:8080/cursos/${this.id}`, this.course)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    close() {
      const id = 0;
      this.$store.commit("notas/updateShowCourseForm", { id });
      this.$store.commit("notas/updateShowCourseList");
      this.clean();
    },
    clean() {
      this.course.id = 0;
      this.course.name = "";
      this.id = 0;
    }
  }
};
</script>

<style>
</style>