// We have a global variable fields containing all the fields.
var fields = new Array();

/**
 * Instanciate the field generator.
 *
 * @param rootNode: the rootNode to append to content to.
 *                  if nothing is given, then you will have to call build()
 *                  yourself.
 **/
function ChoiceFieldGenerator(rootNode) {
    this.type = "choice";
    this.choices = new Array();
    if (rootNode != undefined){
        this.build(rootNode);
    }
}

/**
 * Create a div containing an input and a label for it.
 *
 * @param id the id used for the input.
 * @param name (if not set, name fallbacks on id)
 * @return the dom element containing the label + the input.
 **/

ChoiceFieldGenerator.prototype.createTextInput = function(id, name){
    
    if (name == undefined){
        name = id;
    }
    
    var input = document.createElement('input');
    input.type = 'text';
    input.id = this.id + "_" + id;
    
    var label = document.createElement('label');
    label.for = input.id;
    label.innerHTML = name;
    
    var field = document.createElement('div');
    
    field.appendChild(label);
    field.appendChild(input);
    return field;
}

/**
 * Create a div, containing a list of choices.
 *
 * It is possible to add a choice in the ul by clicking on a link.
 *
 * @return the DOM element containing the div with the ul and the a.
 **/
ChoiceFieldGenerator.prototype.createChoicesInput = function(){
    var ul = document.createElement('ul');
    this.addChoice(ul, "li");
    
    var choices = document.createElement('div');
    var littlePlus = document.createElement('a');
    littlePlus.href = "#";
    littlePlus.innerHTML = "One more";
    //var self = this;
    littlePlus.onclick = function(){
        this.addChoice(ul, "li");
        return false;
    }.bind(this);
    
    choices.appendChild(ul);
    choices.appendChild(littlePlus);
    return choices;
}

/**
 * Add a choice to the given dom element.
 *
 * @param rootNode the root node to add the choice to.
 * @param elementType the type of the element to pass to createElement.
 * @return the created DOM element.
 **/
ChoiceFieldGenerator.prototype.addChoice = function(rootNode, elementType){
    var label = document.createElement('input');
    label.type = 'text';
    
    var is_default = document.createElement('input');
    is_default.type = 'checkbox';
    
    var element = document.createElement(elementType);
    element.appendChild(is_default);
    element.appendChild(label);
    rootNode.appendChild(element);
    
    this.choices.push({is_default: is_default, label: label});
    return element;
}


/**
 * Build the different fields needed for a ChoiceField creation.
 *
 * @param rootNode the DOM rootNode to build upon.
 **/
ChoiceFieldGenerator.prototype.build = function(rootNode){
    var name = this.createTextInput("Name of the field");
    rootNode.appendChild(name);
    this.name = name.lastChild;
    
    help = this.createTextInput("Help text");
    rootNode.appendChild(help);
    this.help = help.lastChild;
    
    rootNode.appendChild(this.createChoicesInput("choices"));
}

/**
 * Returns a javascript object containing only the information of interest for
 * the representation of it.
 * */
ChoiceFieldGenerator.prototype.getModel = function(){

    var choices = new Array();
    for (var i = 0; i < this.choices.length; i++){
        var choice = this.choices[i];
        choices.push({label: choice.label.value,
                      is_default: choice.is_default.checked});
    }
    
    return {
        name: this.name.value,
        help: this.help.value,
        choices: choices
    };
}

/**
 * Loop on the global fields and convert it to a json string
 **/
function exportToJSON(){
    var output = new Array();
    
    for (var i = 0; i < fields.length; i++){
        output.push(fields[i].getModel());
    }
    
    return JSON.stringify(output);
}

/**
 * Provides a high level API to generate fields
 *
 * @param type the type of the field to create.
 * @param id the identifier of the root node to append the field to.
 **/
function newField(type, id){
    var rootNode = document.getElementById(id);
    var newDiv = document.createElement("div");
    newDiv.className = type + " field";
    rootNode.appendChild(newDiv);

    var field;
    if (type == "enum"){
        field = new ChoiceFieldGenerator(newDiv);
    } else {
        console.error("We don't know how to generate this field");
    };
    fields.push(field);
}
