const input = document.querySelector("input");
const doneButton = document.querySelector("#done");
let editId;
doneButton.addEventListener("click", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    for (let i of tasks) {
        if (i.id === editId) {
            i.text = input.value;
            input.value = "";
            editId = null;
        }
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
    doneButton.style.display = "none";
    render(JSON.parse(localStorage.getItem("tasks")));
});
export const addTask = () => {
    let tasks = [];
    let taskId = 0;
    localStorage.getItem("tasks") ? tasks = JSON.parse(localStorage.getItem("tasks")) : {};
    localStorage.getItem("taskId") ? taskId = JSON.parse(localStorage.getItem("taskId")) : localStorage.setItem("taskId", "0");
    if (input.value) {
        const newTask = { id: taskId + 1, text: input.value };
        localStorage.setItem("tasks", JSON.stringify([...tasks, newTask]));
        taskId += 1;
        localStorage.setItem("taskId", JSON.stringify(taskId));
        input.value = "";
        render(JSON.parse(localStorage.getItem("tasks")));
    }
};
export const editTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((x) => {
        if (x.id === id) {
            input.value = x.text;
            editId = id;
            doneButton.style.display = "block";
        }
    });
};
export const deleteTask = (id) => {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const newTasks = tasks.filter((x) => (x.id !== id));
    localStorage.setItem("tasks", JSON.stringify([...newTasks]));
    render(newTasks);
};
export const render = (x) => {
    if (x) {
        const parent = document.querySelector("ul");
        parent.innerHTML = "";
        x.forEach((x) => {
            const child = document.createElement("li");
            child.className = "flex justify-between items-center my-1";
            child.innerHTML = `<div class="flex items-center">
                <div class="w-3 h-3 rounded-full bg-gradient-to-r from-[#8e8e8e] to-[#555555]"></div>
                <p class="text-[#DADADA] ml-2">${x.text}</p>
              </div>
              <div class="flex gap-1">
                <button id=${x.id} class="edit px-2 py-1 bg-[#4c4c4e] text-[#DADADA] font-interMedium rounded-md text-sm active:scale-[0.9] transition-all ease-in-out">Edit</button>
                <button id=${x.id} class="delete px-2 py-1 bg-[#4c4c4e] text-[#DADADA] font-interMedium rounded-md text-sm active:scale-[0.9] transition-all ease-in-out">Delete</button>
              </div>`;
            parent.appendChild(child);
            const EditButtons = document.querySelectorAll(".edit");
            const DeleteButtons = document.querySelectorAll(".delete");
            EditButtons.forEach((x, index) => {
                x.addEventListener("click", () => { editTask(parseInt(x.id)); });
            });
            DeleteButtons.forEach((x) => {
                x.addEventListener("click", () => { deleteTask(parseInt(x.id)); });
            });
        });
    }
};
