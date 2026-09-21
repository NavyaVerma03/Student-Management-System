let students = [];
let messageRecords = [];


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
// LOAD MESSAGES
// =========================

async function loadMessages() {

    try {

        const response =
            await fetch("http://localhost:8080/api/messages");

        if (!response.ok) {
            throw new Error("Failed to load messages");
        }

        messageRecords =
            await response.json();

        displayMessages(messageRecords);

    } catch (error) {

        console.error("Message Error:", error);

        alert(
            "Unable to load message records."
        );

    }

}


// =========================
// DISPLAY MESSAGES
// =========================

function displayMessages(data) {

    const tableBody =
        document.getElementById(
            "messageTableBody"
        );

    tableBody.innerHTML = "";


    data
        .sort((a, b) => b.id - a.id)
        .forEach(message => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${message.studentName || ""}
                </td>

                <td>
                    ${message.subject || ""}
                </td>

                <td>
                    ${message.message || ""}
                </td>

                <td>
                    ${message.date || ""}
                </td>

                <td>

                    <button
                        class="action-btn"
                        onclick="editMessage(${message.id})">

                        ✏️

                    </button>

                    <button
                        class="action-btn"
                        onclick="deleteMessage(${message.id})">

                        🗑️

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });

}


// =========================
// SEND MESSAGE
// =========================

async function sendMessage() {

    const studentSelect =
        document.getElementById(
            "studentSelect"
        );

    const subjectInput =
        document.getElementById(
            "subject"
        );

    const messageInput =
        document.getElementById(
            "message"
        );


    const selectedStudentId =
        studentSelect.value;

    const subject =
        subjectInput.value.trim();

    const message =
        messageInput.value.trim();


    // =========================
    // VALIDATION
    // =========================

    if (
        selectedStudentId === "" ||
        subject === "" ||
        message === ""
    ) {

        alert(
            "Please fill all message details."
        );

        return;

    }


    const student =
        students.find(
            student =>
                student.id == selectedStudentId
        );


    if (!student) {

        alert(
            "Student not found."
        );

        return;

    }


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


    const messageData = {

        studentId: student.id,

        studentName: student.name,

        subject: subject,

        message: message,

        date:
            `${year}-${month}-${day}`

    };


    try {

        const response =
            await fetch(
                "http://localhost:8080/api/messages",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            messageData
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to send message"
            );

        }


        alert(
            "Message sent successfully!"
        );


        // Clear form

        studentSelect.value = "";

        subjectInput.value = "";

        messageInput.value = "";


        // Reload records

        loadMessages();


    } catch (error) {

        console.error(
            "Send Message Error:",
            error
        );

        alert(
            "Failed to send message."
        );

    }

}


// =========================
// EDIT MESSAGE
// =========================

async function editMessage(messageId) {

    const record =
        messageRecords.find(
            item =>
                item.id === messageId
        );


    if (!record) {

        alert(
            "Message record not found."
        );

        return;

    }


    const subject =
        prompt(
            "Enter Subject:",
            record.subject || ""
        );


    if (subject === null) {
        return;
    }


    const message =
        prompt(
            "Enter Message:",
            record.message || ""
        );


    if (message === null) {
        return;
    }


    if (
        subject.trim() === "" ||
        message.trim() === ""
    ) {

        alert(
            "Subject and message cannot be empty."
        );

        return;

    }


    const updatedMessage = {

        studentId: record.studentId,

        studentName: record.studentName,

        subject: subject.trim(),

        message: message.trim(),

        date: record.date

    };


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/messages/${messageId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            updatedMessage
                        )
                }
            );


        if (!response.ok) {

            throw new Error(
                "Update failed"
            );

        }


        alert(
            "Message updated successfully!"
        );


        loadMessages();


    } catch (error) {

        console.error(
            "Update Error:",
            error
        );

        alert(
            "Failed to update message."
        );

    }

}


// =========================
// DELETE MESSAGE
// =========================

async function deleteMessage(messageId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this message?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/messages/${messageId}`,
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
            "Message deleted successfully!"
        );


        loadMessages();


    } catch (error) {

        console.error(
            "Delete Error:",
            error
        );

        alert(
            "Failed to delete message."
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
// INITIAL LOAD
// =========================

loadStudents();

loadMessages();