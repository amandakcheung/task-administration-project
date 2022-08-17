/**
 * Class TaskList that manages a list of tasks
 * 
 * @version 12-14-2021
 */

// var global
var id = 0;
var LOCAL_STORAGE_KEY = "amanda_alyssa";

class TaskList{
    /**
     * constructor for the Class TaskList
     * @param key- the key of the element 
     * @param the domElt that the TaskList is going to be added to
     */
    constructor(key,domElt){
        this.key = LOCAL_STORAGE_KEY;
        this.array = [];
        this.domElt = domElt;
    }

    /**
     * Creates a new Task object given the description (a dictionary), 
     * adds it to the tasklist, and adds it to the DOM element corresponding to this list. 
     * Since the task is new, the method will assign it a unique ID.
     * 
     * @param description the object literal with the task
     */
    addNewTask(description){
        var task = new Task(description);
        console.log(task);
        id++;
        task.setId(id);
        this.array.push(task);
        task.addToDom("ul#theTasks");
    }

    /**
     * re-creates a Task object (from a dictionary saved to localStorage), 
     * adds it to the tasklist, and adds it to the DOM element corresponding with the list.
     * @param {*} dict the object literal containing the saved task we want to add back onto the screen
     */
    addSavedTask(dict){
        var task = new Task(dict);
        //task.done = dict.done;
        task.addToDom("ul#theTasks");
        if (dict["done"] == 1){
            task.toggleDone();
        }
        this.array.push(task);
        
    }

    /**
     * Returns the Task object with the given ID
     * @param the task ID
     * @returns the Task object
     */
    getTask(tid){
        function findElt(elt){
            return tid == elt.id;
            }
        this.index = this.array.findIndex(findElt);
        console.log("found element at: " , this.index);
        return this.array[this.index];
    }

    /**
     * Deletes the Task object with the given id
     * @param tid the id of the task to delete
     */
     deleteTask(tid) {
        var deletedTask = this.getTask(tid);
        // delete its DOM elt
        deletedTask.delete();
        // delete it from array
        var index = this.array.indexOf(deletedTask);
        this.array.splice(index, 1);
    }

    /**
     * sorts the elements by ID number
     */
    sortById(){
        function idCmp(a, b){
            return a.getId() - b.getId();
        }
        this.array.sort(idCmp);
        $("#theTasks").empty();
        this.array.forEach(function(elt){
            elt.addToDom("ul#theTasks");
        })
    }
    /**
     * sorts the elements by due date
     */
    sortByDueDate(){
        function dateCmp(a, b){
            return a.getDueDate()- b.getDueDate();
        }
        this.array.sort(dateCmp);
        $("#theTasks").empty();
        this.array.forEach(function(elt){
            elt.addToDom("ul#theTasks");
        })
    }

    /**
     * sorts the elements by tags
     */
    sortByTag(){
        function tagCmp(a, b) {
            let atag = a.tag;
            let btag = b.tag;
            return atag.localeCompare(btag);
        }
        this.array.sort(tagCmp);
        $("#theTasks").empty();
        this.array.forEach(function(elt){
            elt.addToDom("ul#theTasks");
        })
    }

     /**
     * sorts the elements by priority
     */
      sortByPriority(){
          var priorities = ["high", "medium", "low"];
        function priorityCmp(a, b) {
            let aPriority = a.priority;
            let bPriority = b.priority;
            return priorities.indexOf(aPriority) - priorities.indexOf(bPriority);
        }
        this.array.sort(priorityCmp);
        $("#theTasks").empty();
        this.array.forEach(function(elt){
            elt.addToDom("ul#theTasks");
        })
    }
}

// creating a global variable called theTaskList for the TaskList Class
var theTaskList = new TaskList(LOCAL_STORAGE_KEY, "ul#theTasks");
