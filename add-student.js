// =========================
// LOAD COURSES
// =========================

async function loadCourses() {

    try {

        const response =
            await fetch("http://localhost:8080/api/courses");

        if (!response.ok) {
            throw new Error("Failed to load courses");
        }

        const courses = await response.json();

        const courseSelect =
            document.getElementById("course");

        courseSelect.innerHTML = `
            <option value="">Select Course</option>
        `;

        courses.forEach(course => {

            const option =
                document.createElement("option");

            option.value = course.courseName;
            option.textContent = course.courseName;

            courseSelect.appendChild(option);

        });

    } catch (error) {

        console.error("Course Error:", error);

        alert(
            "Unable to load courses. Please make sure backend is running."
        );

    }
}

const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const studentId = document.getElementById("studentId").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.getElementById("gender").value;
    const dob = document.getElementById("dob").value;
    const course = document.getElementById("course").value;
    const admissionYear = document.getElementById("admissionYear").value;
    const admissionDate = document.getElementById("admissionDate").value;
    const semester = document.getElementById("semester").value;
    const status = document.getElementById("status").value;
    const address = document.getElementById("address").value.trim();

    if (
        name === "" ||
        studentId === "" ||
        email === "" ||
        phone === "" ||
        course === ""
    ) {
        alert("Please fill all required fields.");
        return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
    }

    const student = {
        studentId: studentId,
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        course: course,
        admissionYear: parseInt(admissionYear) || 0,
        admissionDate: admissionDate,
        semester: parseInt(semester) || 0,
        gender: gender,
        status: status,
        address: address
    };
    try {

        const response = await fetch("http://localhost:8080/api/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        const savedStudent = await response.json();

        console.log("Student saved:", savedStudent);

        alert("Student added successfully!");

        studentForm.reset();

        setTimeout(function () {
            window.location.href = "students.html";
        }, 500);

    } catch (error) {

        console.error("Error:", error);

        alert("Failed to add student. Please make sure backend is running.");

    }

});

function goBack() {
    window.location.href = "students.html";
}

function logout() {
    window.location.href = "index.html";
}

loadCourses();