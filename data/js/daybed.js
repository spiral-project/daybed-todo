var api;
spore.debug(true);
function send(message){
    if(!api)
        return spore.create('daybed.json', function (a) {
            api=a;
            send(message);
        });
    api.post_model_data({'model_name': 'todo', 'item': message, 'done': 'true'}, function (d,r) {
		console.log(d);
		console.log(r);
    },function(r){
		console.log('error');
		console.log(r);
    });
};
