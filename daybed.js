var fields = new Array();

function ChoiceFieldGenerator(id) {
    this.type = "choice";
    this.id = id;
    this.choices = new Array();
}

ChoiceFieldGenerator.prototype.createText = function(id, name){
    
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

ChoiceFieldGenerator.prototype.createChoices = function(){
    var ul = document.createElement('ul');
    this.addChoice(ul);
    
    var choices = document.createElement('div');
    var littlePlus = document.createElement('a');
    littlePlus.innerHTML = "yeah, add one!";
    //var self = this;
    littlePlus.onclick = function(){
        this.addChoice(ul);
    }.bind(this);
    
    choices.appendChild(ul);
    choices.appendChild(littlePlus);
    return choices;
}

ChoiceFieldGenerator.prototype.addChoice = function(ul){
    var label = document.createElement('input');
    label.type = 'text';
    
    var is_default = document.createElement('input');
    is_default.type = 'checkbox';
    
    var li = document.createElement('li');
    li.appendChild(is_default);
    li.appendChild(label);
    ul.appendChild(li);
    
    this.choices.push({is_default: is_default, label: label});
}


ChoiceFieldGenerator.prototype.build = function(node){
    var name = this.createText("name");
    node.appendChild(name);
    this.name = name.lastChild;
    
    help = this.createText("help");
    node.appendChild(help);
    this.help = help.lastChild;
    
    node.appendChild(this.createChoices("choices"));
}

ChoiceFieldGenerator.prototype.getModel = function(){

    var choices = new Array();
    for (var i = 0; i < this.choices.length; i++){
        var choice = this.choices[i];
        choices.push({label: choice.label.value, is_default: choice.is_default.checked});
    }
    
    return {
        name: this.name.value,
        help: this.help.value,
        choices: choices
    };
}

var choicefield = new ChoiceFieldGenerator("yeah"); // to do on click
choicefield.build(document.getElementById('fields'));
fields.push(choicefield);

function exportToJSON(){
    var output = new Array();
    
    for (var i = 0; i < fields.length; i++){
        output.push(fields[i].getModel());
    }
    
    return JSON.stringify(output);
}