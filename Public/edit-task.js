const taskIDDOM = document.querySelector('.task-edit-id');
const taskNameDOM = document.querySelector('.task-edit-name');
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector('.single-task-form');
const editBtnDOM = document.querySelector('.task-edit-btn');
const formAlert = document.querySelector('.form-alert');
const params = window.location.search
const id = new URLSearchParams(params).get('id');
let tempName

const showTask = async () => {
    try {
        const  {
            data: {task}
        } = await axios.get(`/api/v1/tasks/${id}`);
        const {_id : taskId, completed, name} = task
        taskIDDOM.textContent = taskId;
        taskNameDOM.value = name;
        tempName = name
        taskCompletedDOM.checked = completed
    } catch (error) {
        console.log(error);
    }
}

showTask()


editFormDOM.addEventListener('submit', async (e)=> {
    editBtnDOM.textContent = "Loading..."
    e.preventDefault()

    try {
        const taskName = taskNameDOM.value
        console.log(taskName);
        const taskCompleted = taskCompletedDOM.checked;

        const { 
            data: {task}
            } = await axios.patch( 
                `./api/v1/tasks/${id}`, 
                {
                    name: taskName, 
                    completed: taskCompleted} )

        const {_id : taskId, completed, name} = task;

        taskIDDOM.textContent = taskId;
        taskNameDOM.value = name;
        tempName = name
        taskCompletedDOM.checked = completed

        formAlert.textContent = 'Success, edited task'
        formAlert.classList.add("text-success")
        formAlert.style.display = "block"

    } catch (error) {
        console.log(error);
        taskNameDOM.value = tempName;
        formAlert.style.display = 'block'
        formAlert.textContent = `Error, please try again`;
    }

    editBtnDOM.textContent = "edit";
    setTimeout(() => {
        formAlert.style.display = "none"
        formAlert.classList.remove("text-success")
    }, 3000);

})