let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "login.html";
}
user = JSON.parse(user);
$("#profile-name").text(user.name);

async function renderWorkerDashboard() {
  const resp = await fetch(
    "http://tasksmanager:4000/api/tasks?userid=" + user.id
  );
  const tasks = await resp.json();

  let rows = "";
  let options = "";
  tasks.forEach((task, index) => {
    rows += `
      <tr>
          <th scope="row">${index + 1}</th>
          <td>${task.description}</td>
          <td>${getPriority(task.priority)}</td>
          <td>${getStatus(task.status)}</td>
      </tr>`;
    options += `<option value=${task.id}>${task.description}</option>`;
  });

  $("#task-select").html(options);
  $("#tasks-table tbody").html(rows);
}

function getPriority(priority) {
  const priorities = { LOW: "BAJA", MEDIUM: "MEDIA", HIGH: "ALTA" };
  return priorities[priority];
}

function getStatus(status) {
  const statuses = {
    CREATED: "Creada",
    IN_PROGRESS: "En Proceso",
    IN_REVIEW: "En Revisión",
    FINISHED: "Terminada",
  };
  return statuses[status];
}
renderWorkerDashboard();

$("#task-alert").hide();
$("#update-task-form").submit(async (e) => {
  e.preventDefault();
  let formData = new FormData(e.target).entries();
  formData = [...formData];
  const data = {
    status: formData[1][1],
  };
  const resp = await fetch(
    "http://tasksmanager:4000/api/tasks/" + formData[0][1],
    {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );
  if (resp.status === 200) {
    $("#task-alert").fadeIn().delay(2000).fadeOut();
    setTimeout(() => location.reload(), 2500);
  }
});
