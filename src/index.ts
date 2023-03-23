import { addTask, editTask, deleteTask, render } from "./todoActions.js"


render(JSON.parse(localStorage.getItem("tasks")!))
const AddButton:HTMLButtonElement = document.querySelector("#add")!
const EditButtons:NodeListOf<HTMLButtonElement> = document.querySelectorAll(".edit")!
const DeleteButtons:NodeListOf<HTMLButtonElement>  = document.querySelectorAll(".delete")!

AddButton.addEventListener("click", addTask)

EditButtons.forEach((x: HTMLButtonElement) => {
    x.addEventListener("click", ()=>{editTask(parseInt(x.id))})
})

DeleteButtons.forEach((x: HTMLButtonElement) => {
    x.addEventListener("click", () => { deleteTask(parseInt(x.id)) }
)})