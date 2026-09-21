let students = [];
let attendanceRecords = [];


// =========================
// LOAD STUDENTS
// =========================

async function loadStudents() {

    try {

        const response =
            await fetch("http://localhost:8080/api/students");

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        students = await response.json();

        const studentSelect =
            document.getElementById("studentSelect");

        studentSelect.innerHTML = `
            <option value="">
                Select Student
            </option>
        `;

        students.forEach(student => {

            const option =
                document.createElement("option");

            option.value = student.id;

            option.textContent =
                `${student.studentId || student.id} - ${student.name}`;

            studentSelect.appendChild(option);

        });

    } catch (error) {

        console.error("Student Error:", error);

        alert(
            "Unable to load students. Please make sure backend is running."
        );

    }

}


// =========================
// LOAD ATTENDANCE
// =========================

async function loadAttendance() {

    try {

        const response =
            await fetch("http://localhost:8080/api/attendance");

        if (!response.ok) {
            throw new Error("Failed to load attendance");
        }

        attendanceRecords =
            await response.json();

        displayAttendance(attendanceRecords);

    } catch (error) {

        console.error("Attendance Error:", error);

        alert(
            "Unable to load attendance records."
        );

    }

}


// =========================
// DISPLAY ATTENDANCE
// =========================

function displayAttendance(data) {

    const tableBody =
        document.getElementById(
            "attendanceTableBody"
        );

    tableBody.innerHTML = "";


    data
        .sort((a, b) => b.id - a.id)
        .forEach(record => {

            const row =
                document.createElement("tr");


            const status =
                String(record.status || "")
                    .toLowerCase();


            row.innerHTML = `

                <td>
                    ${record.studentId}
                </td>

                <td>
                    ${record.studentName || ""}
                </td>

                <td>
                    ${record.date || ""}
                </td>

                <td>

                    <span class="status ${status}">

                        ${record.status || ""}

                    </span>

                </td>

                <td>

                    <button
                        class="action-btn"
                        onclick="editAttendance(${record.id})">

                        ✏️

                    </button>

                    <button
                        class="action-btn"
                        onclick="deleteAttendance(${record.id})">

                        🗑️

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });

}


// =========================
// SAVE ATTENDANCE
// =========================

async function saveAttendance() {

    const studentSelect =
        document.getElementById(
            "studentSelect"
        );

    const dateInput =
        document.getElementById(
            "attendanceDate"
        );

    const statusInput =
        document.getElementById(
            "attendanceStatus"
        );


    const selectedStudentId =
        studentSelect.value;

    const date =
        dateInput.value;

    const status =
        statusInput.value;


    // Validation

    if (
        selectedStudentId === "" ||
        date === ""
    ) {

        alert(
            "Please select student and date."
        );

        return;

    }


    const student =
        students.find(
            student =>
                student.id == selectedStudentId
        );


    if (!student) {

        alert("Student not found.");

        return;

    }


    const attendance = {

        studentId: student.id,

        studentName: student.name,

        date: date,

        status: status

    };


    try {

        const response =
            await fetch(
                "http://localhost:8080/api/attendance",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(attendance)
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to save attendance"
            );

        }


        alert(
            "Attendance marked successfully!"
        );


        // Clear form

        studentSelect.value = "";

        dateInput.value = "";


        // Reload records

        loadAttendance();


    } catch (error) {

        console.error(
            "Save Attendance Error:",
            error
        );

        alert(
            "Failed to save attendance."
        );

    }

}


// =========================
// EDIT ATTENDANCE
// =========================

async function editAttendance(attendanceId) {

    const record =
        attendanceRecords.find(
            item =>
                item.id === attendanceId
        );


    if (!record) {

        alert(
            "Attendance record not found."
        );

        return;

    }


    const newDate =
        prompt(
            "Enter Attendance Date:",
            record.date || ""
        );


    if (newDate === null) {
        return;
    }


    const newStatus =
        prompt(
            "Enter Status (Present / Absent):",
            record.status || ""
        );


    if (newStatus === null) {
        return;
    }


    const updatedAttendance = {

        studentId: record.studentId,

        studentName: record.studentName,

        date: newDate,

        status: newStatus

    };


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/attendance/${attendanceId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedAttendance
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Update failed"
            );

        }


        alert(
            "Attendance updated successfully!"
        );


        loadAttendance();


    } catch (error) {

        console.error(
            "Update Error:",
            error
        );

        alert(
            "Failed to update attendance."
        );

    }

}


// =========================
// DELETE ATTENDANCE
// =========================

async function deleteAttendance(attendanceId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this attendance record?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/attendance/${attendanceId}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            throw new Error(
                "Delete failed"
            );

        }


        alert(
            "Attendance deleted successfully!"
        );


        loadAttendance();


    } catch (error) {

        console.error(
            "Delete Error:",
            error
        );

        alert(
            "Failed to delete attendance."
        );

    }

}


// =========================
// LOGOUT
// =========================

function logout() {

    window.location.href =
        "index.html";

}


// =========================
// SET TODAY'S DATE
// =========================

function setTodayDate() {

    const dateInput =
        document.getElementById(
            "attendanceDate"
        );


    const today =
        new Date();


    const year =
        today.getFullYear();


    const month =
        String(
            today.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            today.getDate()
        ).padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

}


// =========================
// INITIAL LOAD
// =========================

loadStudents();

loadAttendance();

setTodayDate();
