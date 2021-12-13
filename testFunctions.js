//change date to dateobject
//fix index of task pulling first task only**maybe add message preventing duplicate
//add UI buttons
//add edit button

const projectList = document.querySelector('.projectList')
let projectNodeList = document.querySelectorAll('.project')
const projectDropDown = document.querySelector('#projectDropDown')
const addTaskForm = document.getElementById('addTask');
const addProjectForm = document.getElementById('addProject')
let projectListObject ={}
let taskDetails = document.querySelector('.taskDetails')
const createTaskButton = document.getElementById('createTask')
const createProjectButton = document.getElementById('createProject')
const projectListContainer = document.getElementById('projectListContainer')


const createTask = (task, project,priority,dueDate,details)=>{ // need to see if date should be changed to dateobject
    return{
            task, project, priority, dueDate, details
    }
}

const addTaskProject = (taskObject,projectObject) =>{
    projectObject.push(taskObject);
}
const addMultipleTaskProject = (taskArray, project) => {
    taskArray.forEach(element => {
        project.push(element)})}



const indexOfTask = (value,key, array) =>{ //returns first index, potential issue if two tasks are named the asame
    i = -1;
     array.forEach((element, index) =>{
        if ((element[key]== value)&&(i==-1)){ 
        i = index
        return true
        }})
    return i
}
        
const projectFunctions = (()=>{
    const create= (projectName) =>{
        let project = document.createElement('ul');

        let projectOption = document.createElement('option')
            projectOption.value = projectName;
            projectOption.textContent = projectName; 
            projectOption.id = projectName; 
        
        projectDropDown.appendChild(projectOption); 
            project.className = 'project';
            project.id = projectName; 
            project.textContent = projectName
        let button = document.createElement('button');
            button.addEventListener('click', () => project.remove())
            button.textContent = 'x';
            project.appendChild(button);        
        projectList.appendChild(project);
            projectNodeList = document.querySelectorAll('.project')
            projectName = [];
            projectListObject[project.id] = projectName;
            project.addEventListener('click', ()=>{
            
            const taskList = document.querySelector('.taskList')
            changeNode(taskList,createTaskListNode(projectName))   
        }) 
        return projectName
    }
    const info = (projectName) =>{
    }

    return {
        create,
        info
    }
}) ()


const projectTaskList = (project) =>{
    let taskList = [];
    project.forEach((task)=>{
        taskList.push(task.task)
    })
    return taskList;
}

const returnProjectNode = (projectName)=>{ 
let projectNode
   projectNodeList.forEach((element)=>{    
        if (element.id == projectName){
            projectNode = element
            return element
        }
    })
    return projectNode 
}

//dom manipulation

const render = (templateNode,parentNode) =>{ //add object to node
    parentNode.appendChild(templateNode);
}

const changeNode = (oldNode,newNode) =>{
    let parent = oldNode.parentNode;
    parent.replaceChild(newNode,oldNode)
}

const createTaskNode = (taskObject) => { //input task object, output task node

    const projectNameRef = taskObject.project; // references the string value of project property 
    const p = document.createElement('p');
    let taskNode = document.createElement('div')
    taskNode.className = 'taskDetails';

    let nameD = document.createElement('h2');
        nameD.textContent = "Task: "
        nameD.id = "taskHeader"
        
    let projectD = document.createElement('strong');
        projectD.textContent = "Project: ";
        
    let priorityD = document.createElement('strong');
        priorityD.textContent = "Priority: ";
       
    let dueD = document.createElement('strong'); // change to dateobject
        dueD.textContent= "Due Date: ";
        
    let detailsD = document.createElement('strong');
        detailsD.textContent= "Details: ";
      

 
    let name = document.createElement('h2');
        name.textContent = taskObject.task;
        taskNode.appendChild(nameD);
        taskNode.appendChild(name);
        taskNode.appendChild(p);
    let project = document.createElement('ul');
        project.textContent =taskObject.project;
        taskNode.appendChild(projectD)
        taskNode.appendChild(project)
        taskNode.appendChild(p);
    let priority = document.createElement('ul');
        priority.textContent =taskObject.priority;
        taskNode.appendChild(priorityD);
        taskNode.appendChild(priority);
        taskNode.appendChild(p);
    let due = document.createElement('ul'); // change to dateobject
        due.textContent=taskObject.dueDate;
        taskNode.appendChild(dueD)
        taskNode.appendChild(due)
        taskNode.appendChild(p);
    let details = document.createElement('ul');
        details.textContent= taskObject.details;
        taskNode.appendChild(detailsD); 
        taskNode.appendChild(details);
        taskNode.appendChild(p);

    let markCompleteButton = document.createElement('button')
        markCompleteButton.addEventListener('click', ()=>{//**change button color? */
            taskObject.project = 'Completed';
            addTaskProject(taskObject,getProjectArray('Completed'))
            removeTask(taskObject,getProjectArray(projectNameRef))
            let taskList = document.querySelector('.taskList')
            changeNode(taskList, createTaskListNode(getProjectArray(projectNameRef)))
        }) 
        taskNode.appendChild(markCompleteButton) 
    
        markCompleteButton.textContent = "Mark as Completed"

    let editTaskDetailsButton = document.createElement('button') //**add functionality
        editTaskDetailsButton.addEventListener('click', ()=>{
            saveButton.style.visibility = 'visible'
            editTaskDetailsButton.style.visibility = 'hidden';
            name.contentEditable = 'true';
            project.contentEditable = 'true';
            date.contentEditable = 'true';
            priority.contentEditable = 'true';
            details.contentEditable = 'true';
            [name, project, due, priority, details].forEach((element)=>
            { element.style.background = 'grey'})
        }) 
        editTaskDetailsButton.textContent = "Edit"
        taskNode.appendChild(editTaskDetailsButton)
        
    let saveButton = document.createElement('button') 
        saveButton.style.visibility = 'hidden'; 
        saveButton.textContent = "Save Changes";
        saveButton.addEventListener('click', ()=>{
            editTaskDetailsButton.style.visibility = 'visible';
            saveButton.style.visibility = 'hidden';
            [name, project, due, priority, details].forEach((element)=>{
                element.style.background = 'transparent';
                element.contentEditable = 'false';
            })
            let updateTaskDetails = document.querySelector('.taskDetails').childNodes; 
            let taskObject = {
                task: updateTaskDetails[0].textContent,
                project: updateTaskDetails[1].textContent,
                priority: updateTaskDetails[2].textContent,
                dueDate: updateTaskDetails[3].textContent,
                details: updateTaskDetails[4].textContent
            };
            console.log(taskObject)
            removeTask(taskNode,getProjectArray(projectNameRef))
            console.log(getProjectArray(projectNameRef)) 
            addTaskProject(taskObject,getProjectArray(projectNameRef)) 
            console.log(getProjectArray(projectNameRef));
            let taskList = document.querySelector('.taskList'); 
            
            changeNode(taskList,createTaskListNode(getProjectArray(projectNameRef)) )
        })

        taskNode.appendChild(saveButton)// change to only display if edit is click
        
    let removeTaskButton = document.createElement('button')//**add functionality */
        removeTaskButton.addEventListener('click',()=>{
            removeTask(taskObject,getProjectArray(projectNameRef))
            changeNode(taskNode,defaultTaskNode) //swap with default
            let taskList = document.querySelector('.taskList')
            changeNode(taskList, createTaskListNode(getProjectArray(projectNameRef)))
        })// * remove from project object *do  change node 
        removeTaskButton.textContent='Delete Task'
        taskNode.appendChild(removeTaskButton)
        
    return taskNode;
}

const createTaskListNode = (project) => {
    let node = document.createElement('div');
    
    node.className = 'taskList';
    let header = document.createElement('h2')
    header.textContent = "Tasks: "
    header.style.display = 'inline-block';
    node.appendChild(header)


    project.forEach((task) =>{
        
         let taskNode = document.createElement('ul')
            taskNode.addEventListener('click',()=>{
                taskDetails = document.querySelector('.taskDetails') 
                changeNode(taskDetails,createTaskNode(task)) 
            })
            taskNode.className = task.task;
            taskNode.textContent = task.task;
            let button = document.createElement('button');
            button.addEventListener('click',()=>{
                taskNode.remove()
   
                let index = indexOfTask(task.task,'task',project)
                project.splice(index,1)
           
            });//remove from project array as well
            button.textContent = "x";

            taskNode.appendChild(button)
            node.appendChild(taskNode)
        }) 
    return node
    }

const markTaskAsComplete = (task) => { //move from current project to completed project

}

const submitaddTaskForm = (event)=>{
    event.preventDefault()
    let f = addTaskForm.elements; //just for declutter
    let task = createTask(f['task'].value,f['projectDropDown'].value, f['priority'].value,f['date'].value, f['details'].value,)
    f['task'].value;
    let project = f['projectDropDown'].value;
    projectListObject[project].push(task)
    let node = createTaskListNode(getProjectArray(project))
    const taskList = document.querySelector('.taskList')
    changeNode(taskList,node)
    addTaskForm.style.display = 'none';
  
   // project.appendChild(taskNode)
   // let projectNode = document.getElementById(project);
}

const submitAddProjectForm = (event) => {
    event.preventDefault() 
    let projectName = addProjectForm.elements['projectName'].value; 
    projectFunctions.create(projectName)
    addProjectForm.style.display = 'none';
    
}

addTaskForm.addEventListener('submit', submitaddTaskForm)
addProjectForm.addEventListener('submit',submitAddProjectForm)

const getProjectArray = (projectName) =>{
    return projectListObject[projectName] 
}
const getProjectName = (projectArray) =>{
    return projectArray[0].project
}

const removeTask = (taskObject, projectObject) =>{
    let index = indexOfTask(taskObject.task,'task',projectObject)
    projectObject.splice(index,1)
}
//do not delete, initialization
projectFunctions.create('Unassigned'); //create unassigned category, remove typical project button options
const unassignedProjectNode = document.getElementById('Unassigned')
const unassignedButton = unassignedProjectNode.getElementsByTagName('button')
unassignedButton[0].remove()
projectListContainer.childNodes[1].after(unassignedProjectNode)    

//
projectFunctions.create('Completed'); //create unassigned category, remove typical project button options
const completedTasksNode = document.getElementById('Completed')
const completedButton = completedTasksNode.getElementsByTagName('button')
completedButton[0].remove()  
projectList.after(completedTasksNode) 
//
createTaskButton.addEventListener('click', () => {
    addTaskForm.style.display = 'inline-block';
}) 

createProjectButton.addEventListener('click', ()=> {
    addProjectForm.style.display = 'inline-block';
}) 

const defaultTask = createTask("","","","","")
const defaultTaskNode = createTaskNode(defaultTask)
console.log(defaultTaskNode)
//show addTaskForm on click 
/// end initialization

projectFunctions.create('project1')
let test1 = createTask('test1','project1','priority', 'dueDate','details')
addTaskProject(test1, getProjectArray('project1'))