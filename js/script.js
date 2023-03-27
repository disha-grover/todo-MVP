/*  The JavaScript file implements the functionality for the todo app.
    
    Here is what we want to happen:

    1. The user type in a task into the text box
    2. Then they hit the "add Task" button
    3. This trigger an event
    4. We add the value in the text box to the list of tasks
    5. Clear the input text box
    
    To "add" new task, requires us to manipulate the DOM tree
    In this case insert a new list item.
    
    DOM manipulation is usually triggered by an event, here is the basic pattern
    to link everything all together. 
      * Step 0 - add id, class attributes in HTML
      * Step 1 - locate id, class, selector in HTML and assign a JavaScript 
                 variable to the DOM  element.  We will manipulate the DOM 
                 through the JavaScript variable. 
      * Step 2 - write a function to handle the event 
      * Step 3 - connect the variable and the function via the 
                 event listener so a 'event' triggers the execution
                 of our function and we update the DOM

    This pattern is very common with 'professional' developers, in part because
    you can add multiple events to the same variable.  It also assists with 
    'separation of concerns' so we don't see 'onclick' attributes or JavaScript 
    within the HTML tag.

    Professional developers tend to use more modern syntax suchs as anonymous 
    function and the arrow function syntax (similar to what we did in flatland).
    But understanding the syntax is less important that having exposure to the pattern!

    For ISYS3004 Business Web Technologies you can do well with just the using 
    the 'onclick=' (or any other event) in the HTML tag, but I do think it is 
    important that you have some exposure to the 'right' way.  At the very least
    you will be able to read code in forums perhaps even be able to answer job 
    interview questions!
*/


/*  Step 1: locate DOM element and assign to a JavaScript variable
    --------------------------------------------------------------

    Here is a table overview of five methods you can use to access elements in 
    the DOM. The two most common are getElementById() and querySelector()

    |---------|------------------| -------------------------| ----------------|       
    |Gets     |Selector Syntax   |     Method               |     Returns     |
    |         | (used in CSS)    |                          |                 |
    |---------|------------------| -------------------------| ----------------|       
    |ID       | #example         | getElementById()         | single value    |
    |Class    | .example         | getElementsByClassName() | array of values |
    |Tag      | section          | getElementsByTagName()   | array of values |
    |Selector | .section.h1      | querySelector()          | first match     |
    |Selector | .section.h1      | querySelectorAll()       | all matches     |
    |---------|------------------| -------------------------| ----------------| */ 
let addTaskButton = document.getElementById("add-task");
let newTaskInput = document.getElementById("task-input");
let todoListContainer = document.getElementById("todo-list");
let templateElement = document.getElementById("list-item-template");
let template = templateElement.innerHTML;
var showActiveButton = document.getElementById("show-active");
var showAllButton = document.getElementById("show-all");
var showCompletedButton = document.getElementById("show-completed");

function renderTasks(){
    for (i = 0; i< localStorage.length; i++){
        var taskName = localStorage.key(i)
        var isCompleted = localStorage.getItem(taskName) == "true";
        var taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
        if(!isCompleted){
            todoListContainer.insertAdjacentHTML('afterbegin', taskHTML);
        }
    }
}

function saveTasks(name, isCompleted){
    localStorage.setItem(name, isCompleted);
}
function onAddTaskClicked(event) {
    let taskName = newTaskInput.value;
    newTaskInput.value = "";
    let taskHTML = template.replace("<!-- TASK_NAME -->", taskName);
    todoListContainer.insertAdjacentHTML('beforeend', taskHTML);
    
    saveTasks(taskName, false);
}

function onTodolistClicked(event) {
    let targetElement = event.target;
    while (!targetElement.classList.contains("task")) {
        targetElement = targetElement.parentElement;
    }
    let checkbox = targetElement.querySelector(".checkbox");
    if (checkbox.checked) {
        targetElement.classList.add("completed");
    } else {
        targetElement.classList.remove("completed");
    }
    var taskNameElement = targetElement.querySelector(".task-name");
    var taskName = taskNameElement.innerText;
    saveTasks(taskName, checkbox.checked);
}

function showActiveTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display="none";
        } else{
            tasks[i].style.display="block";
        }
    }

}

function showAllTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        tasks[i].style.display="block";
    }

}

function showCompletedTasks() {
    var tasks = document.getElementsByClassName('task');
    for (let i = 0; i < tasks.length; i++){
        if (tasks[i].classList.contains("completed")){
            tasks[i].style.display="block";
        } else{
            tasks[i].style.display="none";
        }
    }

}






addTaskButton.addEventListener('click', onAddTaskClicked);
todoListContainer.addEventListener('click', onTodolistClicked);
showActiveButton.addEventListener('click', showActiveTasks);
showAllButton.addEventListener('click', showAllTasks);
showCompletedButton.addEventListener('click', showCompletedTasks);

renderTasks() 