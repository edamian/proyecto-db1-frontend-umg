<template>
  <div class="q-pa-md">
    <q-table
      title="Students"
      :data="students"
      :columns="columns"
    >
      <template v-slot:top>
        <q-btn
          flat
          dense
          color="primary"
          label="Add row"
          @click="addRow"
        />
        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
          name: 'id',
          label: 'ID',
          field: 'id',
          sortable: true,
        },
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
      ],
    };
  },
  created() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      this.$axios.get('http://localhost:8080/alumnos')
        .then((response) => {
          this.students = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addRow() {
      console.log('clicked');
    },
  },
};
</script>
