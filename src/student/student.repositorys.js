const prisma = require("../database");

const findStudent = async () => {
  const students = await prisma.students.findMany();

  return students;
};

const findStudentById = async (id) => {
  const student = await prisma.students.findUnique({
    where: {
      id,
    },
  });

  return student;
};

const insertStudent = async (studentData) => {
  const student = await prisma.students.create({
    data: {
      name: studentData.name,
      address: studentData.address,
    },
  });

  return student;
};

const deleteStudent = async (id) => {
  await prisma.students.delete({
    where: {
      id,
    },
  });
};

const editStudent = async (id, studentData) => {
  const student = await prisma.students.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: studentData.name,
      address: studentData.address,
    },
  });

  return student;
};

module.exports = {
  findStudent,
  findStudentById,
  insertStudent,
  deleteStudent,
  editStudent,
};
