const auth = firebase.auth();

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // On successful login, redirect to dashboard
      window.location.href = "index.html";
    })
    .catch((error) => {
      document.getElementById("loginError").textContent = error.message;
    });
});
