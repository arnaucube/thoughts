

var url="http://localhost:3000/api/";
angular.module('thoughtsApp', [])
  .controller('ThoughtsController', function(
        $scope,
        $http
    ) {

    var thoughtsList = this;

    if(window.sessionStorage.getItem('thoughtsToken'))
    {
        $scope.userLogged=true;
    }else{
        $scope.userLogged=false;

    }
    $http({
        method : "GET",
        url : url + "thoughts"
    }).then(function mySucces(response) {
        thoughtsList.thoughts = response.data;
    }, function myError(response) {
        $scope.myWelcome = response.statusText;
    });

    $scope.availableAvatars=[
        "img/icons/animals/cat.png",
        "img/icons/animals/crab.png",
        "img/icons/animals/toucan.png"
    ];

    $scope.getAllThoughts = function(){
        $http({
            method : "GET",
            url : url + "thoughts"
        }).then(function mySucces(response) {
            thoughtsList.thoughts = response.data;
        }, function myError(response) {
            $scope.myWelcome = response.statusText;
        });
    };



    thoughtsList.addTodo = function() {
      todoList.todos.push({text:todoList.todoText, done:false});
      todoList.todoText = '';
    };

    $scope.signin = function(){
        ActivateLoadBar();

        var obj = {
            username: $scope.username,
            password: $scope.password,
            description: $scope.description,
            mail: $scope.mail,
            avatar: $scope.avatar
        };
        console.log(obj);
        $http({
            method : "POST",
            url : url + "users",
            data: obj
        }).then(function mySucces(response) {
                toastr.success("Signed in, now login");
                setTimeout(function(){
                    window.location="login.html";
                }, 1000);
        }, function myError(response) {
            toastr.error(response.statusText);
        });
    };

    $scope.login = function(){
        ActivateLoadBar();

        var obj = {
            username: $scope.username,
            password: $scope.password
        };
        $http({
            method : "POST",
            url : url + "auth",
            data: obj
        }).then(function mySucces(response) {
            if(response.data.success==true)
            {
                window.sessionStorage.setItem('thoughtsUsername', $scope.username);
                window.sessionStorage.setItem('thoughtsToken', response.data.token);
                window.sessionStorage.setItem('thoughtsUserAvatar', response.data.avatar);
                toastr.success("Logged in");
                setTimeout(function(){
                    window.location="index.html";
                }, 1000);
            }else{
                toastr.error(response.data.message);
                setTimeout(function(){
                    window.location="login.html";
                }, 1000);
            }
        }, function myError(response) {
            toastr.error(response.statusText);
        });
    };
    $scope.logout = function(){
        window.sessionStorage.removeItem('thoughtsUsername')
        window.sessionStorage.removeItem('thoughtsToken');
        window.sessionStorage.removeItem('thoughtsUserAvatar');
        toastr.info("logging out");
        setTimeout(function(){
            window.location="index.html";
        }, 1000);
    }

    $scope.postThought = function(){
        ActivateLoadBar();

        var obj = {
            time: new Date(),
            content: $scope.newthought,
            username: window.sessionStorage.getItem('thoughtsUsername'),
            avatar: window.sessionStorage.getItem('thoughtsUserAvatar'),
            token: window.sessionStorage.getItem('thoughtsToken')
        };
        $http({
            method : "POST",
            url : url + "thoughts",
            data: obj
        }).then(function mySucces(response) {
            $scope.myWelcome = response.data;
            toastr.success("Thought published");
            setTimeout(function(){
                window.location="index.html";
            }, 1000);
        }, function myError(response) {
            toastr.error(response.statusText);
        });
    };

  });


/* LOADBAR */
  function ActivateLoadBar(){
      var html="";
      html+="<br>";
      html+="<div id='loadbar' class='progress'>";
      html+="    <div class='indeterminate'></div>";
      html+="</div>";
      document.body.innerHTML+=html;
  }
  function DesactivateLoadBar(){
      document.getElementById('loadbar').innerHTML="";
  }
  /* </LOADBAR */
