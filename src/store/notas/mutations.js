export const updateShowStudentForm = (state, { id }) => {
  state.showStudentForm = !state.showStudentForm;
  state.studentToEdit = id;
};

export const updateShowStudentList = (state) => {
  state.showStudentList = !state.showStudentList;
};

export const updateShowAcademicYearForm = (state, { id }) => {
  state.showAcademicYearForm = !state.showAcademicYearForm;
  state.academicYearToEdit = id;
};

export const updateShowAcademicYearList = (state) => {
  state.showAcademicYearList = !state.showAcademicYearList;
};
