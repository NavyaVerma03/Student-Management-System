let courses = [];


// =========================
// LOAD COURSES
// =========================

async function loadCourses() {

    try {

        const response = await fetch(
            "http://localhost:8080/api/courses"
        );

        if (!response.ok) {
            throw new Error("Failed to load courses");
        }

        courses = await response.json();

        displayCourses(courses);

    } catch (error) {

        console.error("Error:", error);

        alert(
            "Unable to load courses. Please make sure backend is running."
        );

    }
}


// =========================
// DISPLAY COURSES
// =========================

function displayCourses(data) {

    const tableBody =
        document.getElementById("courseTableBody");

    tableBody.innerHTML = "";


    data.forEach(course => {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>
                ${course.id}
            </td>

            <td>
                ${course.courseName || ""}
            </td>

            <td>
                ${course.courseCode || ""}
            </td>

            <td>
                ${course.duration || 0} Years
            </td>

            <td>
                ${course.description || ""}
            </td>

            <td>

                <button
                    class="action-btn"
                    onclick="editCourse(${course.id})">

                    ✏️

                </button>


                <button
                    class="action-btn"
                    onclick="deleteCourse(${course.id})">

                    🗑️

                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// =========================
// ADD COURSE
// =========================

function openAddCourse() {

    const courseName = prompt(
        "Enter Course Name:"
    );

    if (courseName === null || courseName.trim() === "") {
        return;
    }


    const courseCode = prompt(
        "Enter Course Code:"
    );

    if (courseCode === null || courseCode.trim() === "") {
        return;
    }


    const duration = prompt(
        "Enter Duration (Years):"
    );

    if (duration === null) {
        return;
    }


    const description = prompt(
        "Enter Course Description:"
    );

    if (description === null) {
        return;
    }


    const course = {

        courseName: courseName.trim(),

        courseCode: courseCode.trim(),

        duration: parseInt(duration) || 0,

        description: description.trim()

    };


    addCourse(course);

}


// =========================
// SAVE COURSE
// =========================

async function addCourse(course) {

    try {

        const response = await fetch(
            "http://localhost:8080/api/courses",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(course)
            }
        );


        if (!response.ok) {
            throw new Error("Failed to add course");
        }


        alert("Course added successfully!");


        loadCourses();

    } catch (error) {

        console.error("Error:", error);

        alert("Failed to add course.");

    }

}


// =========================
// EDIT COURSE
// =========================

async function editCourse(courseId) {

    const course =
        courses.find(c => c.id === courseId);


    if (!course) {
        alert("Course not found.");
        return;
    }


    const courseName = prompt(
        "Enter Course Name:",
        course.courseName || ""
    );

    if (courseName === null) {
        return;
    }


    const courseCode = prompt(
        "Enter Course Code:",
        course.courseCode || ""
    );

    if (courseCode === null) {
        return;
    }


    const duration = prompt(
        "Enter Duration (Years):",
        course.duration || ""
    );

    if (duration === null) {
        return;
    }


    const description = prompt(
        "Enter Course Description:",
        course.description || ""
    );

    if (description === null) {
        return;
    }


    const updatedCourse = {

        courseName: courseName.trim(),

        courseCode: courseCode.trim(),

        duration: parseInt(duration) || 0,

        description: description.trim()

    };


    try {

        const response = await fetch(
            `http://localhost:8080/api/courses/${courseId}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(updatedCourse)
            }
        );


        if (!response.ok) {
            throw new Error("Update failed");
        }


        alert("Course updated successfully!");


        loadCourses();

    } catch (error) {

        console.error("Error:", error);

        alert("Failed to update course.");

    }

}


// =========================
// DELETE COURSE
// =========================

async function deleteCourse(courseId) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this course?"
    );


    if (!confirmDelete) {
        return;
    }


    try {

        const response = await fetch(
            `http://localhost:8080/api/courses/${courseId}`,
            {
                method: "DELETE"
            }
        );


        if (!response.ok) {
            throw new Error("Delete failed");
        }


        alert("Course deleted successfully!");


        loadCourses();

    } catch (error) {

        console.error("Error:", error);

        alert("Failed to delete course.");

    }

}


// =========================
// LOGOUT
// =========================

function logout() {

    window.location.href = "index.html";

}


// =========================
// LOAD COURSES
// =========================

loadCourses();