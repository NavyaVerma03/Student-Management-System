const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        password.type = "password";
        togglePassword.textContent = "👁";
    }

});


const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const passwordValue =
        password.value.trim();


    if (username === "" || passwordValue === "") {

        alert("Please enter username and password.");

        return;
    }


    try {

        const response = await fetch(
            "http://localhost:8080/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: passwordValue
                })
            }
        );


        if (!response.ok) {

            throw new Error("Login request failed");

        }


        const loginSuccessful =
            await response.json();


        if (loginSuccessful) {

            alert("Login Successful!");

            window.location.href =
                "dashboard.html";

        } else {

            alert("Invalid username or password.");

        }


    } catch (error) {

        console.error("Login Error:", error);

        alert(
            "Unable to connect to server. Please make sure backend is running."
        );

    }

}); 