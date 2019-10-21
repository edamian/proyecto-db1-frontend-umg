<template>
  <div>
    <StudentForm v-if="showStudentForm" />
    <StudentList v-if="showStudentList" />
  </div>
</template>
<script>
import StudentList from '../components/students/StudentList';
import StudentForm from '../components/students/StudentForm';

export default {
  name: 'Students',
  components: {
    StudentList,
    StudentForm,
  },
  computed: {
    showStudentForm: {
      get() {
        return this.$store.state.notas.showStudentForm;
      },
    },
    showStudentList: {
      get() {
        return this.$store.state.notas.showStudentList;
      },
    },
  },
};
</script>
