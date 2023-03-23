import { addTask, editTask, deleteTask, render } from "./todoActions.js";
render(JSON.parse(localStorage.getItem("tasks")));
const AddButton = document.querySelector("#add");
const EditButtons = document.querySelectorAll(".edit");
const DeleteButtons = document.querySelectorAll(".delete");
AddButton.addEventListener("click", addTask);
EditButtons.forEach((x) => {
    x.addEventListener("click", () => { editTask(parseInt(x.id)); });
});
DeleteButtons.forEach((x) => {
    x.addEventListener("click", () => { deleteTask(parseInt(x.id)); });
});
