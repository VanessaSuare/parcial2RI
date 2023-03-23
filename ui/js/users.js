let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "login.html";
}
user = JSON.parse(user);
$("#profile-name").text(user.name);

async function renderUsersTable() {
  const users = await fetch(
    "http://tasksmanager:3000/api/users?role=BOSS&role=WORKER"
  ).then((data) => data.json());

  let rows = "";
  users.forEach((user, index) => {
    rows += `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${getUserRole(user.role)}</td>
    </tr>`;
  });

  $("#users-table tbody").html(rows);
}

function getUserRole(role) {
  const roles = { BOSS: "Jefe", WORKER: "Trabajador" };
  return roles[role];
}

renderUsersTable();
$("#user-alert").hide();
$("#create-user-form").submit(async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target).entries();
  formData = [...formData];
  const data = {
    name: formData[0][1],
    email: formData[1][1],
    password: formData[2][1],
    role: formData[3][1],
    requestUser: user.id,
  };
  console.log(user, data);
  const resp = await fetch("http://tasksmanager:3000/api/users", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (resp.status == 201) {
    if (resp.status === 201) {
      $("#user-alert").fadeIn().delay(2000).fadeOut();
    }

    setTimeout(() => location.reload(), 2500);
  }
});
