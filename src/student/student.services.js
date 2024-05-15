const prisma = require("../database");
const {
  findStudent,
  findStudentById,
  insertStudent,
  deleteStudent,
  editStudent,
} = require("./student.repositorys");

const getAllStudents = async () => {
  const student = await findStudent();
  return student;
};

const getStudentsById = async (id) => {
  const student = await findStudentById(id);

  if (!student) {
    throw Error("Student tidak ditemukan");
  }

  return student;
};

const addStudent = async (newStudent) => {
  const student = await insertStudent(newStudent);

  return student;
};

const deleteStudentById = async (id) => {
  await getStudentsById(id);

  await deleteStudent(id);
};

const editStudentById = async (id, studentData) => {
  await getStudentsById(id);

  const student = await editStudent(id, studentData);

  return student;
};

module.exports = {
  getAllStudents,
  getStudentsById,
  addStudent,
  deleteStudentById,
  editStudentById,
};
