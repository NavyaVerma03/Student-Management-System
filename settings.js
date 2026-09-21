let settingsId = null;


// ===============================
// LOAD SETTINGS
// ===============================

async function loadSettings() {

    try {

        const response = await fetch("http://localhost:8080/api/settings");

        if (!response.ok) {
            throw new Error("Failed to load settings");
        }

        const settings = await response.json();

        if (settings.length > 0) {

            const data = settings[0];

            settingsId = data.id;

            document.getElementById("adminName").value =
                data.adminName || "";

            document.getElementById("adminEmail").value =
                data.adminEmail || "";

            document.getElementById("adminPhone").value =
                data.adminPhone || "";

            document.getElementById("systemName").value =
                data.systemName || "Student Management System";

            document.getElementById("emailNotifications").checked =
                data.emailNotifications;

            document.getElementById("autoSave").checked =
                data.autoSave;
        }

    } catch (error) {

        console.error("Load Settings Error:", error);

    }
}


// ===============================
// SAVE PROFILE
// ===============================

async function saveProfile() {

    const name =
        document.getElementById("adminName").value.trim();

    const email =
        document.getElementById("adminEmail").value.trim();

    const phone =
        document.getElementById("adminPhone").value.trim();


    if (name === "") {

        alert("Please enter administrator name.");
        return;

    }


    if (email === "") {

        alert("Please enter email.");
        return;

    }


    if (phone !== "" && !/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");
        return;

    }


    try {

        const settingsData = {

            adminName: name,
            adminEmail: email,
            adminPhone: phone,

            systemName:
                document.getElementById("systemName").value,

            emailNotifications:
                document.getElementById("emailNotifications").checked,

            autoSave:
                document.getElementById("autoSave").checked
        };


        let response;


        if (settingsId === null) {

            response = await fetch(
                "http://localhost:8080/api/settings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(settingsData)
                }
            );

        } else {

            response = await fetch(
                `http://localhost:8080/api/settings/${settingsId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(settingsData)
                }
            );
        }


        if (!response.ok) {

            throw new Error("Failed to save profile");

        }


        const savedSettings = await response.json();

        settingsId = savedSettings.id;

        alert("Profile saved successfully!");

    } catch (error) {

        console.error("Save Profile Error:", error);

        alert("Failed to save profile.");

    }
}


// ===============================
// CHANGE PASSWORD
// ===============================

function changePassword() {

    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;


    if (currentPassword === "") {

        alert("Please enter current password.");
        return;

    }


    if (newPassword === "") {

        alert("Please enter new password.");
        return;

    }


    if (newPassword.length < 4) {

        alert("New password must contain at least 4 characters.");
        return;

    }


    if (newPassword !== confirmPassword) {

        alert("New password and confirm password do not match.");
        return;

    }


    alert(
        "Password validation successful.\n\n" +
        "Password authentication will be connected separately."
    );


    document.getElementById("currentPassword").value = "";

    document.getElementById("newPassword").value = "";

    document.getElementById("confirmPassword").value = "";
}


// ===============================
// SAVE SYSTEM SETTINGS
// ===============================

async function saveSystemSettings() {

    const systemName =
        document.getElementById("systemName").value.trim();


    if (systemName === "") {

        alert("Please enter system name.");
        return;

    }


    const emailNotifications =
        document.getElementById("emailNotifications").checked;

    const autoSave =
        document.getElementById("autoSave").checked;


    const settingsData = {

        adminName:
            document.getElementById("adminName").value.trim(),

        adminEmail:
            document.getElementById("adminEmail").value.trim(),

        adminPhone:
            document.getElementById("adminPhone").value.trim(),

        systemName: systemName,

        emailNotifications: emailNotifications,

        autoSave: autoSave
    };


    try {

        let response;


        if (settingsId === null) {

            response = await fetch(
                "http://localhost:8080/api/settings",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(settingsData)
                }
            );

        } else {

            response = await fetch(
                `http://localhost:8080/api/settings/${settingsId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(settingsData)
                }
            );
        }


        if (!response.ok) {

            throw new Error("Failed to save settings");

        }


        const savedSettings = await response.json();

        settingsId = savedSettings.id;

        alert("System settings saved successfully!");

    } catch (error) {

        console.error("Save System Settings Error:", error);

        alert("Failed to save system settings.");

    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    window.location.href = "index.html";

}


// ===============================
// START
// ===============================

loadSettings();