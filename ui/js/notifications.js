let user = localStorage.getItem("user");
if (!user) {
  window.location.href = "login.html";
}
user = JSON.parse(user);
$("#profile-name").text(user.name);

async function renderNotifications() {
  const notifications = await fetch(
    "http://tasksmanager:5000/api/notifications"
  ).then((resp) => resp.json());
  let rows = "";
  notifications.forEach((notification, index) => {
    rows += `
    <tr>
        <th scope="row">${index + 1}</th>
        <td>${notification.task}</td>
        <td>${notification.user}</td>
        <td>${getStatus(notification.status)}</td>
        <td>${new Date(notification.createdAt).toLocaleString("en-US", {
          timeZone: "America/Bogota",
        })}</td>
    </tr>`;
  });

  $("#notifications-table tbody").html(rows);
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

renderNotifications();
