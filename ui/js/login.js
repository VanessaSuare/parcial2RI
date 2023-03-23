$("#login-alert").hide();
localStorage.removeItem("user");

$("#login-form").submit(async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formDataEntries = [...formData.entries()];
  const resp = await fetch("http://192.168.100.2:3000/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      username: formDataEntries[0][1],
      password: formDataEntries[1][1],
    }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (resp.status == 404) {
    $("#login-alert").fadeIn().delay(2000).fadeOut();
  } else {
    const data = await resp.json();
    if (!data.logged) {
      $("#login-alert").fadeIn().delay(2000).fadeOut();
    } else {
      localStorage.setItem("user", JSON.stringify(data.user));
      const redirectPage =
        data.user.role === "BOSS" ? "index.html" : "worker.html";
      window.location.href = redirectPage;
    }
  }
});
