/**
 * This file defines the Task class.
 * @version December 13, 2021
 */

// global var
var weekdays = ['Sun','Mon','Tues','Wed','Thurs','Fri','Sat'];
var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
 class Task {
    /**
     * Constructor for class Task
     * @param dict JS object literal
     */
    constructor(dict) {
        // uninitialized instance variables
        this.id; // unique integer assigned to this task
        this.done = 0;
        this.domElt;

        // initialized instance variables given the JS object literal argument
        this.text = dict['text']; // String describing task, e.g. "write essay"
        this.priority = dict['priority']; // String either "high", "medium", or "low"
        
        // TODO: ask - are we supposed to turn this into Date object now?
        this.duedate = new Date(dict['duedate']); // Date
        this.tag = dict['tag']; // e.g. "work" or "personal"
    }

    /**
     * Return a String rep of the due date instance var
     * @return String rep of due date
     */
    getFormattedDate() {
        var day = weekdays[this.duedate.getDay()];
        var month = months[this.duedate.getMonth()];
        var date = this.duedate.getDate();
        var year = this.duedate.getFullYear();
        return day + ' ' + month + ' ' + date + ' ' + year;
    }

    /**
     * Creates a DOM element for this task and adds it to the 
     * page at the specified location.
     * @param destination the specified location
     */
    addToDom(destination) {
        var elt = $('<li>');
        elt.attr('data-id',this.id);
        elt.html(this.getFormattedDate() + ' ' + this.priority + ' ' + this.tag + '<br><br>' + this.text + '<br>');        
        elt.css('background-color', tagColors[this.tag]);

        // create the checkmark button 
        var checkmark = $('<button>');
        checkmark.attr('class', 'markDone').attr('type', 'button').html('&#x2714;');

        // create the delete button
        var xbutton = $('<button>');
        xbutton.attr('class', 'delete').attr('type', 'button').html('&#x2716;');

        //appending the buttons to the screen
        elt.append(checkmark);
        elt.append(xbutton);
        $(destination).append(elt);
        this.domElt = elt; // initialize instance variable

    }
    /**
     * Returns a String rep of this task
     * @return String rep of this task
     */
    toString() {
        var s = 'Task #' + counter + ' ' + this.description + ' due ' + this.getFormattedDate() + ' for ' + this.tag;
        return s;
    }

    /**
     * Returns the unique ID for this task
     * @returns the ID of the task
     */
    getId(){
        return this.id;
    }  
    
    /**
     * Sets the ID for this task
     * @param the ID that is being assigned
     */
    setId(id){
        this.id = id;
    }

    /**
     * Toggles whether the task is done or not. Typically, they start out not done, and later become done, 
     * but sometimes the user changes their mind, so we may need to change it back, as many times as necessary. 
     * This method updates the associated DOM element, adding or removing the done class.
     */
    toggleDone(){
        // if flag = 0, not done; if flag = 1, done
        if (this.done == 0){
            $(this.domElt).addClass('done');
            this.done = 1;
        }
        else{
            $(this.domElt).removeClass('done');
            this.done = 0;
        }
    }

    /**
     * Deletes the associated DOM element from the page
     */
    delete(){
        $(this.domElt).remove();
    }

    /**
     * returns the due date as a Date object (was initialized as a Date object in constructor)
     * @returns the due date
     */
    getDueDate(){
        return this.duedate;
    }

    /**
     * returns the tag for this task
     * @returns the tag of the task
     */
    getTag(){
        return this.tag;
    }

    /**
     * returns the priority of this task
     * @returns the priority of the task
     */
    getPriority(){
        return this.priority;
    }
}

 /**
     * process a list of descriptions by creating a new task object for each one, 
     * printing it to the console, and adding it to the page. 
     * @param descriptions- the description of the task
     */
  function processDescriptions(descriptions){
    descriptions.forEach(function(element){
        var task = new Task(element);
        task.addToDom("ul#theTasks");
        console.log(task);
    })
}




