document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    const newTitle = prompt();
    if (newTitle) {
      edit(newTitle, id).then(() => {
        event.target.closest("li").childNodes[1].textContent = newTitle;
      });
    }
  }
});

async function edit(title, id) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ title }),
  });
}

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
