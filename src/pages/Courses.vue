<template>
  <div>
    <CourseForm v-if="showCourseForm" />
    <CourseList v-if="showCourseList" />
  </div>
</template>
<script>
import CourseList from "../components/courses/CourseList";
import CourseForm from "../components/courses/CourseForm";
export default {
  name: "Courses",
  components: {
    CourseList,
    CourseForm
  },
  computed: {
    showCourseForm: {
      get() {
        return this.$store.state.notas.showCourseForm;
      }
    },
    showCourseList: {
      get() {
        return this.$store.state.notas.showCourseList;
      }
    }
  }
};
</script>