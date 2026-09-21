const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");
const tableBody = document.getElementById("studentTableBody");
const studentCount = document.getElementById("studentCount");

let students = [];


// =========================
// LOAD STUDENTS
// =========================

async function loadStudents() {

    try {

        const response = await fetch("http://localhost:8080/api/students");

        if (!response.ok) {
            throw new Error("Failed to load students");
        }

        students = await response.json();


        // =========================
        // DYNAMIC COURSE FILTER
        // =========================

        const courseResponse =
            await fetch("http://localhost:8080/api/courses");

        if (!courseResponse.ok) {
            throw new Error("Failed to load courses");
        }

        const courses = await courseResponse.json();

        courseFilter.innerHTML = `
            <option value="all">All Courses</option>
        `;

        courses.forEach(course => {

            const option = document.createElement("option");

            option.value = course.courseName;
            option.textContent = course.courseName;

            courseFilter.appendChild(option);

        });


        displayStudents(students);

    } catch (error) {

        console.error("Error:", error);

        alert("Unable to load students. Please make sure backend is running.");

    }
}


// =========================
// DISPLAY STUDENTS
// =========================

function displayStudents(data) {

    tableBody.innerHTML = "";

    data.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <div class="student">
                    <div class="avatar">
                        ${student.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <strong>${student.name}</strong>
                        <small>${student.gender || ""}</small>
                    </div>
                </div>
            </td>

            <td>${student.studentId || ""}</td>

            <td>${student.course || ""}</td>

            <td>${student.semester || ""}</td>

            <td>${student.dob || ""}</td>

            <td>${student.admissionYear || ""}</td>

            <td>${student.email || ""}</td>

            <td>${student.phone || ""}</td>

            <td>${student.gender || ""}</td>

            <td>${student.address || ""}</td>

            <td>
                <span class="status ${student.status || "Active"}">
                    ${student.status || "Active"}
                </span>
            </td>

            <td>
                <button onclick="editStudent(${student.id})">✏️</button>

                <button onclick="deleteStudent(${student.id})">🗑️</button>
            </td>
        `;

        tableBody.appendChild(row);

    });


    studentCount.textContent = `Showing ${data.length} students`;

    const paginationText = document.getElementById("paginationText");

    if (paginationText) {

        paginationText.textContent =
            `Showing ${data.length} students`;

    }
}


// =========================
// SEARCH + COURSE FILTER
// =========================

function filterStudents() {

    const searchValue =
        searchInput.value.toLowerCase().trim();

    const selectedCourse =
        courseFilter.value;


    const filteredStudents = students.filter(student => {

        const name =
            (student.name || "").toLowerCase();

        const id =
            String(student.studentId || "").toLowerCase();

        const course =
            student.course || "";


        const matchesSearch =
            name.includes(searchValue) ||
            id.includes(searchValue);


        const matchesCourse =
            selectedCourse === "all" ||
            course === selectedCourse;


        return matchesSearch && matchesCourse;

    });


    displayStudents(filteredStudents);
}


searchInput.addEventListener(
    "input",
    filterStudents
);

courseFilter.addEventListener(
    "change",
    filterStudents
);


// =========================
// DELETE STUDENT
// =========================

async function deleteStudent(studentId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this student?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/students/${studentId}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error("Failed to delete student");
        }


        alert("Student deleted successfully.");


        loadStudents();

    } catch (error) {

        console.error("Error:", error);

        alert("Failed to delete student.");

    }
}


// =========================
// EDIT STUDENT
// =========================

async function editStudent(studentId) {

    try {

        const response = await fetch(
            `http://localhost:8080/api/students/${studentId}`
        );


        if (!response.ok) {
            throw new Error("Student not found");
        }


        const student = await response.json();


        const studentIdValue = prompt(
            "Enter Student ID:",
            student.studentId || ""
        );


        if (studentIdValue === null) return;


        const name = prompt(
            "Enter Student Name:",
            student.name
        );


        if (name === null) return;


        const email = prompt(
            "Enter Email:",
            student.email
        );


        if (email === null) return;


        const phone = prompt(
            "Enter Phone:",
            student.phone
        );


        if (phone === null) return;


        const dob = prompt(
            "Enter Date of Birth:",
            student.dob || ""
        );


        if (dob === null) return;


        const course = prompt(
            "Enter Course:",
            student.course
        );


        if (course === null) return;


        const semester = prompt(
            "Enter Semester:",
            student.semester
        );


        if (semester === null) return;


        const admissionYear = prompt(
            "Enter Admission Year:",
            student.admissionYear || ""
        );


        if (admissionYear === null) return;

        const admissionDate = prompt(
            "Enter Admission Date:",
            student.admissionDate || ""
        );

        if (admissionDate === null) return;


        const gender = prompt(
            "Enter Gender:",
            student.gender
        );


        if (gender === null) return;


        const address = prompt(
            "Enter Address:",
            student.address
        );


        if (address === null) return;


        const status = prompt(
            "Enter Status (Active / Inactive / Pending):",
            student.status
        );


        if (status === null) return;


        const updatedStudent = {

            studentId: studentIdValue,

            name: name,

            email: email,

            phone: phone,

            dob: dob,

            course: course,

            admissionYear:
            parseInt(admissionYear) || 0,

            admissionDate:
                admissionDate,

            semester:
                parseInt(semester) || 0,
                
            gender: gender,

            address: address,

            status: status

        };


        const updateResponse = await fetch(
            `http://localhost:8080/api/students/${studentId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedStudent)
            }
        );


        if (!updateResponse.ok) {
            throw new Error("Update failed");
        }


        alert("Student updated successfully!");


        loadStudents();

    } catch (error) {

        console.error("Error:", error);

        alert("Failed to update student.");

    }
}


// =========================
// ADD STUDENT
// =========================

function openAddStudent() {

    window.location.href =
        "add-student.html";

}


// =========================
// LOGOUT
// =========================

function logout() {

    window.location.href =
        "index.html";

}

// =========================
// NOTIFICATIONS
// =========================

async function loadNotifications() {
    try {
        const response =
            await fetch("http://localhost:8080/api/notifications");

        if (!response.ok) {
            throw new Error("Failed to load notifications");
        }

        const notifications = await response.json();

        const unreadCount = notifications.filter(
            notification => !(notification.read ?? notification.isRead)
        ).length;

        const notificationCount =
            document.getElementById("notificationCount");

        if (notificationCount) {
            notificationCount.textContent = unreadCount;
        }

    } catch (error) {
        console.error("Notification Error:", error);
    }
}


async function openNotifications() {

    const panel =
        document.getElementById("notificationPanel");

    const list =
        document.getElementById("notificationList");

    panel.classList.toggle("show");

    if (!panel.classList.contains("show")) {
        return;
    }

    try {

        const response =
            await fetch("http://localhost:8080/api/notifications");

        if (!response.ok) {
            throw new Error("Failed to load notifications");
        }

        const notifications = await response.json();

        const unreadNotifications =
            notifications.filter(
                notification =>
                    !(notification.read ?? notification.isRead)
            );

        list.innerHTML = "";

        if (unreadNotifications.length === 0) {

            list.innerHTML =
                `<p class="no-notifications">
                    No notifications
                </p>`;

            return;
        }

        unreadNotifications.forEach(notification => {

            const item =
                document.createElement("div");

            item.className =
                "notification-item unread";

            item.innerHTML = `
                <div class="notification-icon">🔔</div>

                <div class="notification-content">
                    <strong>${notification.title}</strong>

                    <p>${notification.message}</p>

                    <small>${notification.date || ""}</small>
                </div>
            `;

            list.appendChild(item);
        });

    } catch (error) {

        console.error("Notification Error:", error);

        list.innerHTML =
            `<p class="no-notifications">
                Unable to load notifications.
            </p>`;
    }
}


function closeNotifications() {

    const panel =
        document.getElementById("notificationPanel");

    if (panel) {
        panel.classList.remove("show");
    }
}


async function markAllNotificationsRead() {

    try {

        const response =
            await fetch("http://localhost:8080/api/notifications");

        if (!response.ok) {
            throw new Error("Failed to load notifications");
        }

        const notifications = await response.json();

        for (const notification of notifications) {

            const isRead =
                notification.read ?? notification.isRead;

            if (!isRead) {

                const readResponse =
                    await fetch(
                        `http://localhost:8080/api/notifications/${notification.id}/read`,
                        {
                            method: "PUT"
                        }
                    );

                if (!readResponse.ok) {
                    throw new Error(
                        "Failed to mark notification as read"
                    );
                }
            }
        }

    
        const notificationCount =
            document.getElementById("notificationCount");

        if (notificationCount) {
            notificationCount.textContent = "0";
        }

    
        const list =
            document.getElementById("notificationList");

        if (list) {
            list.innerHTML =
                `<p class="no-notifications">
                    No notifications
                </p>`;
        }

    } catch (error) {

        console.error("Mark Read Error:", error);

        alert("Unable to mark notifications as read.");
    }
}

loadNotifications();


// =========================
// START
// =========================

loadStudents();