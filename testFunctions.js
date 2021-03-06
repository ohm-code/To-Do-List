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
const menuButton = document.getElementById('menu')
let closeTaskFormButton = document.getElementById('closeForm')
let closeProjectFormButton = document.getElementById('closeForm2')
let menuHide = false;

menuButton.addEventListener('click', ()=>{
    menuHide = !menuHide;
    console.log(menuHide);
    if (menuHide){
        projectListContainer.style.display = "none";
    }else projectListContainer.style.display = "block";
})

closeTaskFormButton.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    addTaskForm.style.display ="none";
    
})
closeProjectFormButton.addEventListener('click', (event) => {
    event.preventDefault()
    event.stopPropagation()
    addProjectForm.style.display = "none";
})

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
    projectListObject[projectKey] = [{task:"Tasks in this project completed!", project:projectKey, priority:"", dueDate: "", details:""}]; //initiate key value for new project
    // 
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
            projectOption.id = projectKey + "option"; 
            projectDropDown.appendChild(projectOption); 

        let button = document.createElement('button'); //creating X button for project, should also remove dropdown option
            button.textContent = 'x';
            button.addEventListener('click', (event) => {
                event.preventDefault()
                event.stopPropagation()
                let option = document.getElementById(projectOption.id)
                option.remove()
                console.log(option)
                
                console.log("clicked on X ")
                projectListObject[projectKey] = [];
                delete projectListObject[projectKey];
                console.log(projectListObject)
                
                console.log(option)
                project.remove()
                removeProjectUpdateTaskDetails()
                updateTaskListNode(getProjectObject('Unassigned'))
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
    console.log("changenode debug")
    console.log(oldNode)
    let parent = oldNode.parentNode;
    parent.replaceChild(newNode,oldNode)
}

const markComplete= (taskObject, indexOfTaskDetailsInProject)=>{
  
    console.log('markcomplete start')

    let nextTaskDetails;
    let thisTaskDetails = document.querySelector('.taskDetails');
    let projectObject = getProjectObject(taskObject.project);
    let taskIndex = indexOfTask(taskObject.task, "task",projectObject);//store current task index

    if (projectListObject[taskObject.project].length>0){
        nextTaskDetails = createTaskNode(projectListObject[taskObject.project][1])//task details index 1
    }else{ //task details index 0 
        nextTaskDetails = createTaskNode(projectListObject[taskObject.project][0])
    }// update current taskdetails to next task in project; reference project object ,if object at 1 exist 1, else 0
    
    removeTask(taskObject,getProjectObject(taskObject.project))

    taskObject.project = 'Completed' //change change the project property to completed
    addTaskProject(taskObject,getProjectObject('Completed')) // ,move task to completed
    
    let taskList = document.querySelector('.taskList'); //update tasklist 
    changeNode(taskList, createTaskListNode(getProjectObject(taskObject.project))) //update taskListNode
    
    if ((taskIndex == indexOfTaskDetailsInProject)&&(taskIndex != 1)) { // if taskObject is the same as object in taskDetails
        changeNode(thisTaskDetails,nextTaskDetails) //update taskdetails to default or first task based on conditions
    }else{
        nextTaskDetails = createTaskNode(projectListObject[taskObject.project][0])
        changeNode(thisTaskDetails,nextTaskDetails)
    }
    updateTaskListNode(projectObject);
    console.log('mark complete end') 
}

const createTaskNode = (taskObject) => { //input task object, output task node

    const projectNameRef = taskObject.project; // references the string value of project property 
    let projectObject = getProjectObject(projectNameRef) //set as project object for placeholder comparison
    const p = document.createElement('p');
    let taskNode = document.createElement('div')
    let name 
    let project
    let nameD
    let projectD
    let priority
    let priorityD
    let dueD
    let due
    let details
    let detailsD
    taskNode.className = 'taskDetails';
    taskNode.id = 'taskDetailsHeader'
    
    if (taskObject.task != projectObject[0].task){
         nameD = document.createElement('h2');
            nameD.textContent = "Task: "
            
         projectD = document.createElement('strong');
            projectD.textContent = "Project: ";
            
         priorityD = document.createElement('strong');
            priorityD.textContent = "Priority: ";
        
         dueD = document.createElement('strong'); // change to dateobject
            dueD.textContent= "Due Date: ";
            
         detailsD = document.createElement('strong');
            detailsD.textContent= "Details: ";
        
            name = document.createElement('h2');
            name.textContent = taskObject.task;
            name.style.marginLeft = '2rem';
            taskNode.appendChild(nameD);
            taskNode.appendChild(name);
            taskNode.appendChild(p);
         project = document.createElement('ul');
            project.textContent =taskObject.project;
            taskNode.appendChild(projectD)
            taskNode.appendChild(project)
            taskNode.appendChild(p);
         priority = document.createElement('ul');
            priority.textContent =taskObject.priority;
            taskNode.appendChild(priorityD);
            taskNode.appendChild(priority);
            taskNode.appendChild(p);
         due = document.createElement('ul'); // change to dateobject
            due.textContent=taskObject.dueDate;
            taskNode.appendChild(dueD)
            taskNode.appendChild(due)
            taskNode.appendChild(p);
         details = document.createElement('ul');
            details.textContent= taskObject.details;
            taskNode.appendChild(detailsD); 
            taskNode.appendChild(details);
            taskNode.appendChild(p);

        [name,priority, project, due,details].forEach((element)=>{
                element.className = 'taskDetailsItem'
            })
        }else{
            nameD = document.createElement('h2');
            nameD.textContent = "Task: "
            
            projectD = document.createElement('strong');
            projectD.textContent = "Project: ";

            name = document.createElement('h2');
            name.textContent = taskObject.task;
            name.style.marginLeft = '2rem';
            taskNode.appendChild(nameD);
            taskNode.appendChild(name);

            project = document.createElement('ul');
            project.textContent =taskObject.project;
            taskNode.appendChild(projectD)
            taskNode.appendChild(project)
            taskNode.appendChild(p);

        }

        let markCompleteButton = document.createElement('button')
        markCompleteButton.addEventListener('click', ()=>{//**change button color? */
            markComplete(taskObject,indexOfTask(taskObject.task,"task",getProjectObject(taskObject.project)));
        }) 
        //
  
        
    
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
            let index
            
            removeTask(taskNode,getProjectObject(projectNameRef))
            addTaskProject(taskObject,getProjectObject(projectNameRef)) 
            let taskList = document.querySelector('.taskList');            
            changeNode(taskList,createTaskListNode(getProjectObject(projectNameRef)) )
        })

      // change to only display if edit is click
        
    let removeTaskButton = document.createElement('button')//**add functionality */
        removeTaskButton.addEventListener('click',(event)=>{
            event.preventDefault()
            removeTask(taskObject,getProjectObject(projectNameRef))
            changeNode(taskNode,defaultTaskNode) //swap with default
            let taskList = document.querySelector('.taskList')
            changeNode(taskList, createTaskListNode(getProjectObject(projectNameRef)))
        })// * remove from project object *do  change node 
        removeTaskButton.textContent='Delete Task'
        taskNode.prepend(removeTaskButton)
        taskNode.prepend(editTaskDetailsButton)
        taskNode.prepend(saveButton)
        if (projectNameRef != 'Completed')
        {taskNode.prepend(markCompleteButton)}
        
    return taskNode;
}

const createTaskListNode = (project) => {
    let node = document.createElement('div');
    node.className = 'taskList';
    let header = document.createElement('h2')

    header.textContent = project[0].project ;
    header.style.display = 'inline-block';
    node.appendChild(header)
 

    if(project)
    {project.forEach((task,index) =>{
    
        if(index < 1){console.log('placeholder')
        }else
         { 
            const button = document.createElement('button');
                button.textContent = "x";
                button.addEventListener('click',(event)=>{
                    event.preventDefault();
                    event.stopPropagation()
                    taskNode.remove()
                    removeTask(task,project)    
                    projectListObject[task.project] = project;
                    console.log(project)
                    console.log("debug taskdetails") //task object should be removed and not present in project
                    if( project.length >1){
                        console.log("projectlength >1 caught")
                        console.log(project)
                        updateTaskDetails(project[1])// update task details
                    }else {
                        console.log("project lenge =1 condition")
                        console.log(project[0])
                        updateTaskDetails(project[0]); // just changed to project for testi
                    }
                });//remove from project array as well
               
             let taskNode = document.createElement('ul')
             taskNode.addEventListener('click',(event)=>{
                 taskDetails = document.querySelector('.taskDetails') 
                 changeNode(taskDetails,createTaskNode(task)) 
             })
             taskNode.className = task.task;
             taskNode.textContent = task.task;
             
            let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.name = task.task
                checkbox.id = task.task + "id";  
                checkbox.addEventListener('click', ()=>{
                    console.log("checkbox click function trigger")
                    markComplete(task,index);
                    
                })
            
            taskNode.prepend(checkbox)
            node.appendChild(taskNode)
            taskNode.appendChild(button)
            }
        }) 
    }else {console.log("no project length caught error")}
    return node
    }

const removeProjectUpdateTaskDetails=()=>{   
    if (getProjectObject('Unassigned')[1]){
        updateTaskDetails(getProjectObject('Unassigned')[1])
    }else {
        updateTaskDetails(getProjectObject('Unassigned')[0])
    }}
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
    addToLocalStorage()
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
const updateTaskDetails = (newTaskObject)=>{
    let currentTaskDetails = document.querySelector('.taskDetails');
    console.log("current task details debug")
    console.log(currentTaskDetails)
    let newTaskDetails = createTaskNode(newTaskObject);
    changeNode(currentTaskDetails,newTaskDetails)
    console.log(newTaskDetails)
    console.log("updateTaskDetails triggered")
}

const removeTask = (taskObject, projectObject) =>{
    console.log("removed!!")
    console.log(taskObject)
    console.log(projectObject)
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
 

    Object.keys(localProjectListObject).forEach((project)=>{ // goes through each key 
       

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
        }} )
    updateTaskListNode(projectListObject.Unassigned)
    }

     
    getFromLocalStorage()? renderPage(): console.log("null caught")
