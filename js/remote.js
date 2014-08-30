function RemoteTodo(host, app) {
  this.app = app;
  var self = this;

  Daybed.startSession(host, {
    getToken: function() {
      if (window.location.hash !== "") {
        return window.location.hash.slice(1);
      }
    }
  }).then(function(session) {
    self.session = session;
    if (session.token !== window.location.hash.slice(1)) {
      window.location.hash = session.token;
    }
    self.getTaskList();
  });
}

RemoteTodo.prototype = {
  getTaskList: function() {
    this.session.getRecords('todo').then(function(response) {
      var records = response.records;
      for (i = 0; i < records.length; ++i) {
        console.log(records[i]);
        this.app.todos.push({
          id: records[i].id,
          title: records[i].item,
          completed: records[i].status == "done"
        });
      }
      this.app.render();
    }.bind(this));
  }, 

  createTask: function(message) {
    this.session.addRecord('todo', {item: message, status: 'todo'})
      .then(function(data) {
        var todo = {
          id: data.id,
          title: message,
          completed: false
        };
        this.app.todos.push(todo);
        this.app.render();
    }.bind(this));
  },
  updateTaskStatus: function(task) {
    this.session.patchRecord('todo', task.id, {
      item: task.title,
      status: task.completed ? 'done': 'todo'
    });
  },
  removeTask: function(task) {
    this.session.deleteRecord('todo', task.id);
  }
};
