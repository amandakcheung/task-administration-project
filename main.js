/**
 * The main file that puts everything together
 * @version December 19, 2021
 */

// the add button to add a new task from the form
$("#addTaskButton").click(function () { addTaskFromForm(); });

// cancels the form
$("#cancelAddTask").click(function () {  
    $("#addTaskDropDown").removeClass("show");
    $("#addTask")[0].reset();
});

/**
 * Gathers the inputs from the form into a single description dictionary
 */
function addTaskFromForm(){
    // gets all of the values from the form
    var text = $("[name=taskText]").val();
    var priority = $("[name=taskPriority]").val();
    var duedate = $("[name=taskDueDate]").val();
    var tag = $("[name=tag]:checked").val();
    theTaskList.addNewTask( {text: text, priority: priority, duedate: duedate, tag: tag});
    // remove the drop down from screen after we submit
    $("#addTaskDropDown").removeClass("show");
    // resets the form
    $("#addTask")[0].reset();
}


// Checkmark button event handler
$('ul#theTasks').on('click', '.markDone', function (event) {
    markDone(event.target);
});
 
/** 
* Gets the corresponding task (by id) and toggles its done state
* @param the event being delegated
*/
function markDone(event) {
    var id = $(event).closest('li').attr("data-id"); 
    var task = theTaskList.getTask(id);
    task.toggleDone();
}

// Checkmark button event handler
$('ul#theTasks').on('click', '.delete', function (event) {deleteTask(event.target);
});

/**
 * Gets the corresponding task (by id), then deletes the task and removes
 * its DOM element
 * @param the event that is selecting the event being deleted
*/
function deleteTask(event) {
    var id = $(event).closest('li').attr("data-id");
    theTaskList.deleteTask(id);
}

// create event handlers for the sorting functions

// sort by ID event handler
$("#sortIdButton").click(function(){theTaskList.sortById();})

// sort by tag event handler
$("#sortTagButton").click(function(){theTaskList.sortByTag();})

// sort by due date event handler
$("#sortDueDateButton").click(function(){theTaskList.sortByDueDate();})

// sort by priority event handler
$("#sortPriorityButton").click(function(){theTaskList.sortByPriority();})