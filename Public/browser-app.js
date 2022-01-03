const formInput = document.querySelector(".task-input")
const formAlert = document.querySelector(".form-alert")
const loading = document.querySelector(".loading-text")
const tasks = document.querySelector(".tasks")
const form = document.querySelector(".task-form")

// load tasks 
const setTasks = async () => {
    try {
        loading.style.visibility = "visible"
        const {data} = await axios.get("/api/v1/tasks");
        const tasksData = data.tasks;
        if(tasksData.length < 1){
            tasks.innerHTML = `<h5 class='empty-list>No tasks in your list</h5>`
            loading.style.visibility = "hidden"
        }
        const updateTasks = tasksData.map(data => {
            const {completed, name, _id: taskID} = data
            return `
            <div class="single-task ${completed && 'task-completed'}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">
            <!-- edit link -->
            <a href="task.html?id=${taskID}"  class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <!-- delete btn -->
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
            </button>
            </div>
            </div> `
        }).join('')
        loading.classList.add('loading-text')
        tasks.innerHTML = updateTasks
        
    } catch (error) {
        loading.style.visibility = "hidden"
        tasks.innerHTML = `<h5 class="empty-list">There was an error, please try later....</h5>`
    }
    loading.style.visibility = "hidden"
} 

setTasks()

// delete a task
tasks.addEventListener('click', async (e)=> {
    const el = e.target;
    const id = el.parentElement.dataset.id;
    if(el.parentElement.classList.contains('delete-btn')){
        try {
            await axios.delete(`/api/v1/tasks/${id}`)
            setTasks()
        } catch (error) {
            console.log(error);
        }
    }
})

// form

form.addEventListener('submit', async (e)=>{
    e.preventDefault()
    const name = formInput.value

    try {
        await axios.post("/api/v1/tasks", {name})
        setTasks();
        formInput.value = "";
        formAlert.textContent = "Success, task added";
        formAlert.classList.add('alert-success')
    } catch (error) {
        console.log(error)
        formAlert.style.display = "block";
        formAlert.innerHTML = "Error, please try again"
        formAlert.classList.add('alert-danger')
    }
    setTimeout(() => {
        const styleClass = formAlert.classList.contains("alert-success")? "alert-success" : 'alert-danger';
        formAlert.style.display = "none";
        formAlert.classList.remove(styleClass)
        formAlert.innerHTML = ""
    }, 3000);
})