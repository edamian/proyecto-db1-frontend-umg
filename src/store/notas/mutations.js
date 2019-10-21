export const updateShowStudentForm = (state, { id }) => {
  state.showStudentForm = !state.showStudentForm;
  state.studentToEdit = id;
};

export const updateShowStudentList = (state) => {
  state.showStudentList = !state.showStudentList;
};
