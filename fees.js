let students = [];
let feeRecords = [];


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
// LOAD FEE RECORDS
// =========================

async function loadFees() {

    try {

        const response =
            await fetch("http://localhost:8080/api/fees");

        if (!response.ok) {
            throw new Error("Failed to load fees");
        }

        feeRecords =
            await response.json();

        displayFees(feeRecords);

    } catch (error) {

        console.error("Fee Error:", error);

        alert(
            "Unable to load fee records."
        );

    }

}


// =========================
// DISPLAY FEES
// =========================

function displayFees(data) {

    const tableBody =
        document.getElementById("feeTableBody");

    tableBody.innerHTML = "";


    data
        .sort((a, b) => b.id - a.id)
        .forEach(fee => {

            const row =
                document.createElement("tr");


            const status =
                String(
                    fee.paymentStatus || ""
                ).toLowerCase();


            row.innerHTML = `

                <td>
                    ${fee.studentId}
                </td>

                <td>
                    ${fee.studentName || ""}
                </td>

                <td>
                    ₹${Number(fee.totalFee).toFixed(2)}
                </td>

                <td>
                    ₹${Number(fee.paidAmount).toFixed(2)}
                </td>

                <td>
                    ₹${Number(fee.pendingAmount).toFixed(2)}
                </td>

                <td>
                    ${fee.paymentDate || ""}
                </td>

                <td>

                    <span class="status ${status}">

                        ${fee.paymentStatus || ""}

                    </span>

                </td>

                <td>

                    <button
                        class="action-btn"
                        onclick="editFee(${fee.id})">

                        ✏️

                    </button>

                    <button
                        class="action-btn"
                        onclick="deleteFee(${fee.id})">

                        🗑️

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });

}


// =========================
// SAVE FEE
// =========================

async function saveFee() {

    const studentSelect =
        document.getElementById(
            "studentSelect"
        );

    const totalFeeInput =
        document.getElementById(
            "totalFee"
        );

    const paidAmountInput =
        document.getElementById(
            "paidAmount"
        );

    const paymentDateInput =
        document.getElementById(
            "paymentDate"
        );

    const paymentStatusInput =
        document.getElementById(
            "paymentStatus"
        );


    const selectedStudentId =
        studentSelect.value;

    const totalFee =
        parseFloat(totalFeeInput.value);

    const paidAmount =
        parseFloat(paidAmountInput.value);

    const paymentDate =
        paymentDateInput.value;

    let paymentStatus =
        paymentStatusInput.value;


    // =========================
    // VALIDATION
    // =========================

    if (
        selectedStudentId === "" ||
        isNaN(totalFee) ||
        isNaN(paidAmount) ||
        paymentDate === ""
    ) {

        alert(
            "Please fill all fee details."
        );

        return;

    }


    if (totalFee < 0 || paidAmount < 0) {

        alert(
            "Fee amount cannot be negative."
        );

        return;

    }


    if (paidAmount > totalFee) {

        alert(
            "Paid amount cannot be greater than total fee."
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


    // =========================
    // CALCULATE PENDING
    // =========================

    const pendingAmount =
        totalFee - paidAmount;


    // Automatically determine status

    if (paidAmount === totalFee) {

        paymentStatus = "Paid";

    } else if (paidAmount > 0) {

        paymentStatus = "Partial";

    } else {

        paymentStatus = "Pending";

    }


    const fee = {

        studentId: student.id,

        studentName: student.name,

        totalFee: totalFee,

        paidAmount: paidAmount,

        pendingAmount: pendingAmount,

        paymentDate: paymentDate,

        paymentStatus: paymentStatus

    };


    try {

        const response =
            await fetch(
                "http://localhost:8080/api/fees",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(fee)
                }
            );


        if (!response.ok) {

            throw new Error(
                "Failed to save fee"
            );

        }


        alert(
            "Fee added successfully!"
        );


        // Clear form

        studentSelect.value = "";

        totalFeeInput.value = "";

        paidAmountInput.value = "";

        paymentDateInput.value = "";

        paymentStatusInput.value = "Paid";


        // Reload records

        loadFees();


    } catch (error) {

        console.error(
            "Save Fee Error:",
            error
        );

        alert(
            "Failed to add fee."
        );

    }

}


// =========================
// EDIT FEE
// =========================

async function editFee(feeId) {

    const fee =
        feeRecords.find(
            item =>
                item.id === feeId
        );


    if (!fee) {

        alert(
            "Fee record not found."
        );

        return;

    }


    const totalFee =
        prompt(
            "Enter Total Fee:",
            fee.totalFee || ""
        );


    if (totalFee === null) {
        return;
    }


    const paidAmount =
        prompt(
            "Enter Paid Amount:",
            fee.paidAmount || ""
        );


    if (paidAmount === null) {
        return;
    }


    const paymentDate =
        prompt(
            "Enter Payment Date:",
            fee.paymentDate || ""
        );


    if (paymentDate === null) {
        return;
    }


    const total =
        parseFloat(totalFee);

    const paid =
        parseFloat(paidAmount);


    if (
        isNaN(total) ||
        isNaN(paid)
    ) {

        alert(
            "Please enter valid amounts."
        );

        return;

    }


    if (total < 0 || paid < 0) {

        alert(
            "Fee amount cannot be negative."
        );

        return;

    }


    if (paid > total) {

        alert(
            "Paid amount cannot be greater than total fee."
        );

        return;

    }


    const pending =
        total - paid;


    let status;


    if (paid === total) {

        status = "Paid";

    } else if (paid > 0) {

        status = "Partial";

    } else {

        status = "Pending";

    }


    const updatedFee = {

        studentId: fee.studentId,

        studentName: fee.studentName,

        totalFee: total,

        paidAmount: paid,

        pendingAmount: pending,

        paymentDate: paymentDate,

        paymentStatus: status

    };


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/fees/${feeId}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(updatedFee)
                }
            );


        if (!response.ok) {

            throw new Error(
                "Update failed"
            );

        }


        alert(
            "Fee updated successfully!"
        );


        loadFees();


    } catch (error) {

        console.error(
            "Update Error:",
            error
        );

        alert(
            "Failed to update fee."
        );

    }

}


// =========================
// DELETE FEE
// =========================

async function deleteFee(feeId) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this fee record?"
        );


    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `http://localhost:8080/api/fees/${feeId}`,
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
            "Fee record deleted successfully!"
        );


        loadFees();


    } catch (error) {

        console.error(
            "Delete Error:",
            error
        );

        alert(
            "Failed to delete fee record."
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
            "paymentDate"
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

loadFees();

setTodayDate();