

angular.module('thoughtsApp', [])
  .controller('ThoughtsController', function() {
    var thoughtsList = this;
    thoughtsList.thoughts = [
      {
          time: '9h',
          content:'primer thought',
          username: 'user1',
          fav: '',
          avatar: 'bat'
      },
      {
          time: '10h',
          content:'quart thought',
          username: 'user4',
          fav: '',
          avatar: 'tiger'
      },
      {
          time: '10h',
          content:'segon thought, aquí, provant',
          username: 'user2',
          fav: '',
          avatar: 'toucan'
      },
      {
          time: '10h',
          content:'tercer thought, responent',
          username: 'user1',
          fav: '',
          avatar: 'bat'
      },
      {
          time: '10h',
          content:'hola com va',
          username: 'user3',
          fav: '',
          avatar: 'macaw'
      },
      {
          time: '10h',
          content:'quart thought',
          username: 'user5',
          fav: '',
          avatar: 'giraffe'
      }];

    thoughtsList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };

    thoughtsList.remaining = function() {
      var count = 0;
      angular.forEach(todoList.todos, function(todo) {
        count += todo.done ? 0 : 1;
      });
      return count;
    };

    thoughtsList.archive = function() {
      var oldTodos = todoList.todos;
      todoList.todos = [];
      angular.forEach(oldTodos, function(todo) {
        if (!todo.done) todoList.todos.push(todo);
      });
    };
  });
