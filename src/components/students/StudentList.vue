<template>
  <div class="q-pa-md">
    <q-table title="Students" :data="students" :columns="columns">
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
          <q-td key="apellido" :props="props">{{ props.row.apellido }}</q-td>
          <q-td key="foto" :props="props">
            <q-img
              :src="props.row.foto"
              spinner-color="white"
              style="height: 140px; max-width: 150px"
            />
          </q-td>
          <q-td>
            <q-btn-group>
              <q-btn color="green" @click="addRow(props.row.id)">Editar</q-btn>
              <q-btn color="red" @click="deleteRow(props.row.id)">Eliminar</q-btn>
            </q-btn-group>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>
<script>
export default {
  name: 'StudentList',
  data() {
    return {
      filter: '',
      students: [],
      columns: [
        {
          name: 'nombre',
          label: 'Nombre',
          field: 'nombre',
          sortable: true,
        },
        {
          name: 'apellido',
          label: 'Apellido',
          field: 'apellido',
          sortable: true,
        },
        {
          name: 'foto',
          label: 'Foto',
          field: 'foto',
        },
        {
          name: 'opciones',
          label: 'Opciones',
          field: 'id',
        },
      ],
    };
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.$axios
        .get('http://localhost:8080/alumnos')
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addRow(id) {
      this.$store.commit('notas/updateShowStudentForm', { id });
      this.$store.commit('notas/updateShowStudentList');
    },
    deleteRow(id) {
      const confirmDelete = confirm('Desea borrar el registro?');
      if (confirmDelete) {
        this.$axios
          .delete(`http://localhost:8080/alumnos/${id}`)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
