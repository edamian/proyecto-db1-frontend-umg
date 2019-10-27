<template>
  <div class="q-pa-md">
    <q-table title="Tareas" :data="homeworks" :columns="columns">
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
          <q-td key="apellido" :props="props">{{ props.row.descripcion }}</q-td>
          <q-td key="valor" :props="props">{{ props.row.valor }}</q-td>
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
  name: "HomeworkList",
  data() {
    return {
      filter: "",
      homeworks: [],
      columns: [
        {
          name: "nombre",
          label: "Nombre",
          field: "nombre",
          sortable: true
        },
        {
          name: "descripcion",
          label: "Descripcion",
          field: "descripcion",
          sortable: true
        },
        {
          name: "valor",
          label: "Valor",
          field: "valor"
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
    this.getHomeworks();
  },
  methods: {
    getHomeworks() {
      this.$axios
        .get("http://localhost:8080/tareas")
        .then(response => {
          this.homeworks = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addRow(id) {
      this.$store.commit("notas/updateShowHomeworkForm", { id });
      this.$store.commit("notas/updateShowHomeworkList");
    },
    deleteRow(id) {
      this.$axios
        .delete(`http://localhost:8080/tareas/${id}`)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>
