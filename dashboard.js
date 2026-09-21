async function loadDashboard() {

    try {

        // =========================
        // STUDENTS
        // =========================

        const studentResponse =
            await fetch("http://localhost:8080/api/students");

        if (!studentResponse.ok) {
            throw new Error("Failed to load students");
        }

        const students = await studentResponse.json();


        // Total Students
        const totalStudents =
            document.getElementById("totalStudents");

        if (totalStudents) {
            totalStudents.textContent = students.length;
        }


        // Active Students
        const activeStudents =
            document.getElementById("totalActiveStudents");

        if (activeStudents) {

            let activeCount = 0;

            students.forEach(function(student) {

                const status =
                    String(student.status || "")
                        .trim()
                        .toLowerCase();

                if (
                    status.includes("active") &&
                    !status.includes("inactive")
                ) {
                    activeCount++;
                }

            });

            activeStudents.textContent = activeCount;
        }


        // =========================
        // COURSES
        // =========================

        const courseResponse =
            await fetch("http://localhost:8080/api/courses");

        if (!courseResponse.ok) {
            throw new Error("Failed to load courses");
        }

        const courses = await courseResponse.json();


        const totalCourses =
            document.getElementById("totalCourses");

        if (totalCourses) {
            totalCourses.textContent = courses.length;
        }


        // =========================
        // FEES
        // =========================

        const feeResponse =
            await fetch("http://localhost:8080/api/fees");

        if (!feeResponse.ok) {
            throw new Error("Failed to load fees");
        }

        const fees = await feeResponse.json();


        let totalFeesCollected = 0;

        fees.forEach(function(fee) {

            totalFeesCollected +=
                Number(fee.paidAmount || 0);

        });


        const feesElement =
            document.getElementById("totalFeesCollected");


        if (feesElement) {

            feesElement.textContent =
                "₹" +
                totalFeesCollected.toLocaleString("en-IN");

        }


        // =========================
        // ENROLLMENT CHART
        // =========================

        const chartBars =
            document.querySelectorAll(
                "#enrollmentChart .bar"
            );

        const chartYear =
            document.getElementById("chartYear");


        function updateEnrollmentChart() {

            if (
                chartBars.length === 0 ||
                !chartYear
            ) {
                return;
            }


            const selectedYear =
                parseInt(chartYear.value);


            const monthCounts =
                new Array(12).fill(0);


            students.forEach(function(student) {

                if (!student.admissionDate) {
                    return;
                }


                const date =
                    new Date(student.admissionDate);


                if (isNaN(date.getTime())) {
                    return;
                }


                const year =
                    date.getFullYear();

                const month =
                    date.getMonth();


                if (year === selectedYear) {
                    monthCounts[month]++;
                }

            });


            const maxCount =
                Math.max(...monthCounts, 1);


            chartBars.forEach(function(bar, index) {

                const percentage =
                    (monthCounts[index] / maxCount) * 100;


                bar.style.height =
                    `${Math.max(percentage, 10)}%`;

            });

        }


        updateEnrollmentChart();


        if (chartYear) {

            chartYear.addEventListener(
                "change",
                updateEnrollmentChart
            );

        }


        // =========================
        // RECENT STUDENTS
        // =========================

        const recentStudentsBody =
            document.getElementById(
                "recentStudentsBody"
            );


        if (recentStudentsBody) {

            recentStudentsBody.innerHTML = "";


            students
                .sort(function(a, b) {
                    return b.id - a.id;
                })
                .slice(0, 3)
                .forEach(function(student) {

                    const row =
                        document.createElement("tr");


                    row.innerHTML = `

                        <td>
                            <div class="student">

                                <div class="student-avatar">
                                    ${student.name
                                        ? student.name
                                            .charAt(0)
                                            .toUpperCase()
                                        : "?"}
                                </div>

                                ${student.name || ""}

                            </div>
                        </td>

                        <td>
                            ${student.studentId || ""}
                        </td>

                        <td>
                            ${student.course || ""}
                        </td>

                        <td>
                            ${student.email || ""}
                        </td>

                        <td>

                            <span class="status ${
                                (student.status || "Active")
                                    .toLowerCase()
                            }">

                                ${student.status || "Active"}

                            </span>

                        </td>

                    `;


                    recentStudentsBody.appendChild(row);

                });

        }


    } catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


// =========================
// QUICK ACTIONS
// =========================

function addStudent() {

    window.location.href =
        "add-student.html";

}


function openCourses() {

    window.location.href =
        "courses.html";

}


function openAttendance() {

    window.location.href =
        "attendance.html";

}


function openSettings() {

    window.location.href =
        "settings.html";

}

function viewReport() {

    window.location.href =
        "attendance.html";

}


function logout() {

    window.location.href =
        "index.html";

}

// =========================
// NOTIFICATIONS
// =========================

async function loadNotifications() {
    try {
        const response = await fetch("http://localhost:8080/api/notifications");

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

    const panel = document.getElementById("notificationPanel");
    const list = document.getElementById("notificationList");

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
        const unreadNotifications = notifications.filter(
            notification => !(notification.read ?? notification.isRead)
        );

        list.innerHTML = "";

        if (unreadNotifications.length === 0)  {
            list.innerHTML =
                `<p class="no-notifications">No notifications</p>`;
            return;
        }

        unreadNotifications.forEach(notification => {
            const item = document.createElement("div");

            item.className =
                (notification.read ?? notification.isRead)
                    ? "notification-item read"
                    : "notification-item unread";

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
    const panel = document.getElementById("notificationPanel");

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

            if (!notification.isRead) {

                await fetch(
                    `http://localhost:8080/api/notifications/${notification.id}/read`,
                    {
                        method: "PUT"
                    }
                );
            }
        }

        await loadNotifications();
        await openNotifications();

    } catch (error) {

        console.error("Mark Read Error:", error);

        alert("Unable to mark notifications as read.");
    }
}

loadNotifications();


// =========================
// START DASHBOARD
// =========================

loadDashboard();