var api;
var ready = false;
spore.debug(true);

// Create the spore client if needed and exectute the function
function api_client(callback) {
    if(!api)
        spore.create('/spore', function (a) {
            api=a;
            callback();
        });
    else
        callback();
}

// Create a new task
function send(message){
    api_client(function() {
        api.post_data({'model_name': 'todo', 'item': message, 'done': 'false'}, function (d,r) {
            var todo = {
                id: d.id,
                title: message,
                completed: false};
            App.todos.push(todo);
            App.render();
            console.log(todo);
        },function(r){
            console.log('error');
            console.log(r);
        });
    });
};

// Update the status of the task
function update(todo){
    api_client(function() {
	console.log(api);
        api.put_data_item({'model_name': 'todo', 'data_item_id': todo.id, 'item': todo.title, 'done': ""+todo.completed}, function (d,r) {
	    console.log(d);
        },function(r){
            console.log('error');
            console.log(r);
        });
    });
};

// Delete a status
function destroy(todo) {
    api_client(function() {
	console.log(api);
        api.delete_data_item({'model_name': 'todo', 'data_item_id': todo.id}, function (d,r) {
	    console.log(todo.title+" deleted.");
        },function(r){
            console.log('error');
            console.log(r);
        });
    });
};

// Get the list of task
function get_todos(){
    api_client(function () {
            api.get_data({'model_name': 'todo'}, function (d,r) {
                var todo;
                var data = d.data;            
                for (var d in data) {
                    todo = {
                        id: data[d].id,
                        title: data[d].item,
                        completed: data[d].done == "true"};
                    App.todos.push(todo);
                }
                App.render();
        },function(r){
            console.log('error');
            console.log(r);
        });
    });
};
