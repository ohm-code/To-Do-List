//change date to dateobject
//fix index of task pulling first task only**maybe add message preventing duplicate
//add UI buttons
//add edit button


const projectList = document.querySelector('.projectList')
let projectNodeList = document.querySelectorAll('.project')
const projectDropDown = document.querySelector('#projectDropDown')
const form = document.querySelector('form');
let projectListObject ={}
const taskDetails = document.querySelector('.taskDetails') 


const createTask = (task, project,priority,dueDate,details)=>{ // need to see if date should be changed to dateobject
    return{
            task, project, priority, dueDate, details
    }
}

const addTaskProject = (task,project) =>{
    project.push(task);
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
const indexOfTaskNested = (value,key,array) =>{
    i = -1
    array.forEach()

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
        project.appendChild(button);        
        projectList.appendChild(project);
        projectNodeList = document.querySelectorAll('.project')
        projectName = [];
        projectListObject[project.id] = projectName;
        project.addEventListener('click', ()=>{
            const taskList = document.querySelector('.taskList')
            console.log("clicked project");
            console.log(taskList) 
            console.log(createTaskListNode(projectName)) 
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

const createTaskNode = (taskObject) => {
    let taskNode = document.createElement('div')
        taskNode.className = 'taskDetails';
    let name = document.createElement('h2');
        name.textContent = "Task: " + taskObject.task;
        taskNode.appendChild(name);
    let project = document.createElement('ul');
        project.textContent = "Project: " + taskObject.project;
        taskNode.appendChild(project)
    let priority = document.createElement('ul');
        priority.textContent = "Priority: " + taskObject.priority;
        taskNode.appendChild(priority);
    let due = document.createElement('ul'); // change to dateobject
        due.textContent= "Due Date: " + taskObject.dueDate;
        taskNode.appendChild(due)
    let details = document.createElement('ul');
        details.textContent= "Details: " + taskObject.details;
        taskNode.appendChild(details);
    return taskNode;
}

const createTaskListNode = (project) => {
    let node = document.createElement('div')
    node.className = 'taskList';
    let header = document.createElement('h2')
    header.textContent = "Tasks: "
    node.appendChild(header)

    project.forEach((task) =>{
        
         let taskNode = document.createElement('ul')
            taskNode.className = task.task;
            taskNode.textContent = task.task;
            let button = document.createElement('button');
            button.addEventListener('click',()=>{
                taskNode.remove()
                console.log("tasktemoval test")
                console.log(project)
                let index = indexOfTask(task.task,'task',project)
                project.splice(index,1)
                console.log(project)
            });//remove from project array as well

            taskNode.appendChild(button)
            node.appendChild(taskNode)
        }) 
    return node
    }




let task1 = createTask('task1',  'project1', 'priority1', "", "testing the details of the task")
let task11 = createTask('task11',  'project1', 'priority1', "", "testing the details of the task")
let task111 = createTask('task111',  'project1', 'priority1', "", "testing the details of the task")
let task2 = createTask('task2',  'project2', 'priority2', "3", "testing the details of the task2")
let task3 = createTask('task3',  'TaskP', 'priority2', "3", "testing the details of the task3")
let task1node = createTaskNode(task1)
let task11node= createTaskNode(task11)
let task111node= createTaskNode(task111)


let project2 =  projectFunctions.create('project2')
changeNode(taskDetails, task1node)



let project1 = projectFunctions.create('project1' )
let project1Node = createTaskListNode(project1) 
let TestP = projectFunctions.create('TestP' ) 


 
 
addTaskProject(task1, project1)
addMultipleTaskProject([task11, task111], project1)
addTaskProject(task2, project2)
addTaskProject(task3, TestP)


const submitForm = (event)=>{
    event.preventDefault()
    let f = form.elements; //just for declutter
    let task = createTask(f['task'].value,f['projectDropDown'].value, f['priority'].value,f['date'].value, f['details'].value,)
    f['task'].value;
    let project = f['projectDropDown'].value;
    projectListObject[project].push(task)
    let node = createTaskListNode(getProjectArray(project))
    console.log(node)
    const taskList = document.querySelector('.taskList')
    console.log(taskList)
    changeNode(taskList,node)
  
   // project.appendChild(taskNode)
   // let projectNode = document.getElementById(project);
}

form.addEventListener('submit', submitForm)

const getProjectArray = (projectName) =>{
    return projectListObject[projectName]
}
const getProjectName = (projectArray) =>{
    return projectArray[0].project
}
 
console.log(getProjectName(project1)) 
projectNodeList = document.querySelectorAll('.project')  
//console.log(projectNodeList[0].id) 
//console.log("return project " + returnProjectNode('TestP'))  
let TestPNode = createTaskListNode(TestP)


console.log(indexOfTask('task111','task',project1))  