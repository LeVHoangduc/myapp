document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
});

const studentForm = document.getElementById('student-form');
studentForm.addEventListener('submit', addStudent);

function addStudent(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const birthYear = document.getElementById('birth-year').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const email = document.getElementById('email').value;
    const hometown = document.getElementById('hometown').value;
    const theoryScore = document.getElementById('theory-score').value;
    const practiceScore = document.getElementById('practice-score').value;

    // Validate data
    if (!validateEmail(email)) {
        alert('Email không hợp lệ');
        return;
    }

    const student = {
        name,
        birthYear,
        gender,
        email,
        hometown,
        theoryScore,
        practiceScore
    };

    const students = getStudentsFromStorage();
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));
    studentForm.reset();
    loadStudents();
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function loadStudents() {
    const students = getStudentsFromStorage();
    const studentList = document.getElementById('student-list');
    studentList.innerHTML = '';

    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.theoryScore}</td>
            <td>${student.practiceScore}</td>
            <td>${calculateAverage(student.theoryScore, student.practiceScore)}</td>
            <td>${calculateGrade(calculateAverage(student.theoryScore, student.practiceScore))}</td>
            <td>
                <button onclick="editStudent(${index})">Sửa</button>
                <button onclick="deleteStudent(${index})">Xóa</button>
            </td>
        `;
        studentList.appendChild(row);
    });
}

function calculateAverage(theoryScore, practiceScore) {
    return ((parseFloat(theoryScore) + parseFloat(practiceScore) * 2) / 3).toFixed(2);
}

function calculateGrade(average) {
    if (average < 5) {
        return 'Yếu';
    } else if (average < 7) {
        return 'Trung bình';
    } else if (average < 8.5) {
        return 'Khá';
    } else {
        return 'Giỏi';
    }
}

function getStudentsFromStorage() {
    const studentsJSON = localStorage.getItem('students');
    return studentsJSON ? JSON.parse(studentsJSON) : [];
}

function editStudent(index) {
    const students = getStudentsFromStorage();
    const studentToEdit = students[index];
    if (studentToEdit) {
        document.getElementById('name').value = studentToEdit.name;
        document.getElementById('birth-year').value = studentToEdit.birthYear;
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        genderRadios.forEach(radio => {
            if (radio.value === studentToEdit.gender) {
                radio.checked = true;
            }
        });
        document.getElementById('email').value = studentToEdit.email;
        document.getElementById('hometown').value = studentToEdit.hometown;
        document.getElementById('theory-score').value = studentToEdit.theoryScore;
        document.getElementById('practice-score').value = studentToEdit.practiceScore;
        students.splice(index, 1);
        localStorage.setItem('students', JSON.stringify(students));
        loadStudents();
    }
}

function deleteStudent(index) {
    const students = getStudentsFromStorage();
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function sortByName() {
    const students = getStudentsFromStorage();
    students.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}

function sortByAverage() {
    const students = getStudentsFromStorage();
    students.sort((a, b) => calculateAverage(b.theoryScore, b.practiceScore) - calculateAverage(a.theoryScore, a.practiceScore));
    localStorage.setItem('students', JSON.stringify(students));
    loadStudents();
}