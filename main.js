const render = (template,node) =>{ //add object to node
    node.appendChild(template);
}

const createTask = (task, project,priority,dueDate,details)=>{
    return{
            task, project, priority, dueDate, details
    }
}

let task1 = createTask('task1',  'project1', 'priority1', "", "testing the details of the task")
let taskContainer = document.querySelector('.taskContainer')
render(task1,taskContainer) 

console.log(task1.task)
