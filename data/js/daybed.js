var api;
var ready = false;
spore.debug(true);

function api_client(callback) {
    if(!api)
        spore.create('/spore', function (a) {
            api=a;
			callback();
        });
	else
		callback();
}

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
