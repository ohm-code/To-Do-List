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
let taskList = document.querySelector('.taskList')
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
const addMultipleTaskProject = (taskArray, projectObject) => {
    console.log(taskArray)
    taskArray.forEach(element => {
        projectObject.push(element)})}


const indexOfTask = (value,key, array) =>{ //returns first index, potential issue if two tasks are named the asame
    i = -1;
     array.forEach((element, index) =>{
        if ((element[key]== value)&&(i==-1)){ 
        i = index
        return true
        }})
    return i
}
        
 const createProjectObject = (projectKey) =>{
    projectListObject[projectKey] = [{task:"PLACEHOLDER", project:projectKey, priority:"", dueDate: "", details:"placeholder"}]; //initiate key value for new project
    console.log(projectKey + " project object created!")
    console.log("check to make sure PLO has updated after creating project ob")
    console.log(projectListObject) 
    // 
    console.log(!document.getElementById(projectKey))
    if ((!document.getElementById(projectKey))&&(projectKey!='Unassigned')&&(projectKey!='Completed')){
        createProjectNode(projectKey)
    }
 }
 const createProjectNode = (projectKey) =>{ //creates project node to add to project list node
        let project = document.createElement('ul'); //create project node
            project.className = 'project'; // defining project node 
            project.id = projectKey; 
            project.textContent = projectKey;

        let projectOption = document.createElement('option')//creating and adding dropdown options
            projectOption.value = projectKey;
            projectOption.textContent = projectKey; 
            projectOption.id = projectKey; 
            projectDropDown.appendChild(projectOption); 

        let button = document.createElement('button'); //creating X button for project, should also remove dropdown option
            button.textContent = 'x';
            button.addEventListener('click', () => {
                let option = document.getElementById(projectOption.id)
                option.remove()
                project.remove()
        })
            project.appendChild(button);    
            projectList.appendChild(project);
            projectNodeList = document.querySelectorAll('.project') //update project Node List

            project.addEventListener('click', ()=>{ //shows task list 
                updateTaskListNode(getProjectObject(projectKey))
        }) }

 
const updateTaskListNode = (projectObject) =>{
    taskList = document.querySelector('.taskList')
    changeNode(taskList,createTaskListNode(projectObject))   
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
    taskNode.id = 'taskDetailsHeader'

    let nameD = document.createElement('h2');
        nameD.textContent = "Task: "
        
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
        name.style.marginLeft = '2rem';
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

    [name,priority, project, due,details].forEach((element)=>{
            element.className = 'taskDetailsItem'
        })
 

    let markCompleteButton = document.createElement('button')
        markCompleteButton.addEventListener('click', ()=>{//**change button color? */
            taskObject.project = 'Completed';
            addTaskProject(taskObject,getProjectObject('Completed'))
            removeTask(taskObject,getProjectObject(projectNameRef))
            let taskList = document.querySelector('.taskList')
            changeNode(taskList, createTaskListNode(getProjectObject(projectNameRef)))
        }) 
        taskNode.appendChild(markCompleteButton) 
    
        markCompleteButton.textContent = "Mark as Completed"

    let editTaskDetailsButton = document.createElement('button') //**add functionality
        editTaskDetailsButton.addEventListener('click', ()=>{
            saveButton.style.display = 'inline-block';
            markCompleteButton.style.display = 'none';
            editTaskDetailsButton.style.display = 'none';
            name.contentEditable = 'true';
            project.contentEditable = 'true';
            due.contentEditable = 'true';
            priority.contentEditable = 'true';
            details.contentEditable = 'true';
            [name, project, due, priority, details].forEach((element)=>
            { element.style.background = 'grey'})
        }) 
        editTaskDetailsButton.textContent = "Edit"
        taskNode.appendChild(editTaskDetailsButton)
        
    let saveButton = document.createElement('button') 
        saveButton.style.display = 'none'; 
        saveButton.textContent = "Save Changes";
        saveButton.addEventListener('click', ()=>{
            markCompleteButton.style.display = 'inline-block';
            editTaskDetailsButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
            [name, project, due, priority, details].forEach((element)=>{
                element.style.background = 'transparent';
                element.contentEditable = 'false';
            })
            let updateTaskDetails = document.querySelectorAll('.taskDetailsItem'); 
            let taskObject = {
                task: updateTaskDetails[0].textContent,
                project: updateTaskDetails[1].textContent,
                priority: updateTaskDetails[2].textContent,
                dueDate: updateTaskDetails[3].textContent,
                details: updateTaskDetails[4].textContent
            };
            console.log(taskObject)
            removeTask(taskNode,getProjectObject(projectNameRef))
            console.log(getProjectObject(projectNameRef)) 
            addTaskProject(taskObject,getProjectObject(projectNameRef)) 
            console.log(getProjectObject(projectNameRef));
            let taskList = document.querySelector('.taskList'); 
            
            changeNode(taskList,createTaskListNode(getProjectObject(projectNameRef)) )
        })

        taskNode.appendChild(saveButton)// change to only display if edit is click
        
    let removeTaskButton = document.createElement('button')//**add functionality */
        removeTaskButton.addEventListener('click',(event)=>{
            event.preventDefault()
            console.log(taskObject)
            console.log(getProjectObject(projectNameRef))
            removeTask(taskObject,getProjectObject(projectNameRef))
            changeNode(taskNode,defaultTaskNode) //swap with default
            let taskList = document.querySelector('.taskList')
            changeNode(taskList, createTaskListNode(getProjectObject(projectNameRef)))
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
    console.log(project)

    project.forEach((task,index) =>{
        console.log(index)
        if(index < 1){console.log('placeholder')
        }else
         {let taskNode = document.createElement('ul')
            taskNode.addEventListener('click',()=>{
                taskDetails = document.querySelector('.taskDetails') 
                changeNode(taskDetails,createTaskNode(task)) 
            })
            taskNode.className = task.task;
            taskNode.textContent = task.task;
            let button = document.createElement('button');
            button.addEventListener('click',(event)=>{
                event.preventDefault();
                console.log('remove triggered')
                let projectName = getProjectName[project];
                taskNode.remove()
                let index = indexOfTask(task.task,'task',project)
                console.log(projectName)
                project.splice(index,1)
                console.log(projectListObject[projectName])//expected the key reference to project in the list
                projectListObject[projectName] = project;
            });//remove from project array as well
            button.textContent = "x";
            
            taskNode.appendChild(button)
            node.appendChild(taskNode)}
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
    console.log(project)
    projectListObject[project].push(task)
    let node = createTaskListNode(getProjectObject(project))
    const taskList = document.querySelector('.taskList')
    changeNode(taskList,node)
    addTaskForm.style.display = 'none';
}

const submitAddProjectForm = (event) => {
    event.preventDefault() 
    let projectName = addProjectForm.elements['projectName'].value; 
    createProjectObject(projectName)
    addProjectForm.style.display = 'none';
    addToLocalStorage()
}

addTaskForm.addEventListener('submit', submitaddTaskForm)
addProjectForm.addEventListener('submit',submitAddProjectForm)

const getProjectObject = (projectName) =>{
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
createProjectObject('Unassigned')
createProjectNode('Unassigned'); //create unassigned category, remove typical project button options
    const unassignedProjectNode = document.getElementById('Unassigned')
    const unassignedButton = unassignedProjectNode.getElementsByTagName('button')
    unassignedButton[0].remove()
    projectListContainer.childNodes[1].after(unassignedProjectNode)    

//
createProjectObject('Completed')
createProjectNode('Completed'); //create unassigned category, remove typical project button options
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


//show addTaskForm on click 
/// end initialization


document.addEventListener('click',()=>addToLocalStorage())

const addToLocalStorage = () =>{
    localStorage.setItem("projectListObject",JSON.stringify(projectListObject))
    console.log('add to local storage triggered')
}

const getFromLocalStorage = () =>{
    console.log(' get from local storage triggeredworks!')
    const storage = JSON.parse(localStorage.getItem("projectListObject"))
    if (storage === null){console.log("nothing in storage, dont render")
    }else return storage
}

const renderPage = () =>{
    const localProjectListObject = getFromLocalStorage()
    projectListObject = localProjectListObject;
    console.log("render page local project list object")
    console.log(localProjectListObject)
    Object.keys(localProjectListObject).forEach((project)=>{ // goes through each key 
        console.log(project)
        console.log(localProjectListObject[project])
        console.log(localProjectListObject[project].length)

        if ((project!='Unassigned')&&(project!='Completed')){
            createProjectNode(project)
            console.log(project + " object node created")
            return;
        }
        //need to catch if key.length > 1 since all array will have at least 1 hidden placeholder
        if (localProjectListObject[project].length>1){
             //anything that has non-placeholder tasks
            localProjectListObject[project].forEach((taskObject, taskNumber)=>{//loops through the actual task objects 
                console.log(taskNumber) // index of task for this project, need to avoid 0 since it is placeholder
                console.log(taskObject)//tasks for this project
                if (taskNumber > 0){
                    console.log(taskObject) //just non placeholder 
                     //create project node      
                }
            
            }) 
        }
    }
    )

    }
if (getFromLocalStorage()!==null){
    renderPage()
}