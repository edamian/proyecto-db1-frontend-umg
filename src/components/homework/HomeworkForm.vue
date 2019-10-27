<template>
  <div class="q-pa-md">
    <h3>Alumno</h3>
    <q-form class="q-gutter-md">
      <q-input outlined v-model="homework.nombre" label="Nombres" />
      <q-input outlined v-model="homework.descripcion" label="Descripcion" />
      <q-input outlined v-model="homework.valor" label="Valor" />
      <q-select
        outlined
        v-model="homework.curso"
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
  name: "HomeworkForm",
  data() {
    return {
      homework: {
        id: 0,
        nombre: "",
        descripcion: "",
        valor: 0,
        curso: {}
      },
      courses: []
    };
  },
  computed: {
    id: {
      get() {
        return this.$store.state.notas.homeworkToEdit;
      }
    }
  },
  created() {
    if (this.id) {
      this.getHomework(this.id);
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
    getHomework(id) {
      this.$axios
        .get(`http://localhost:8080/tareas/${id}`)
        .then(response => {
          console.log(id);
          console.log(response.data);
          this.homework = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    save() {
      let courseId = this.homework.curso.id;
      delete this.homework.curso;
      this.homework.id_curso = courseId;
      this.$axios
        .post("http://localhost:8080/tareas", this.homework)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    update() {
      let courseId = this.homework.curso.id;
      delete this.homework.curso;
      this.homework.id_curso = courseId;
      this.$axios
        .put(`http://localhost:8080/tareas/${this.id}`, this.homework)
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    },
    close() {
      const id = 0;
      this.$store.commit("notas/updateShowHomeworkForm", { id });
      this.$store.commit("notas/updateShowHomeworkList");
      this.clean();
    },
    clean() {
      this.homework.id = 0;
      this.homework.valor = 0;
      this.homework.nombre = "";
      this.homework.descripcion = "";
      this.homework.curso = {};
      this.id = 0;
    }
  }
};
</script>
