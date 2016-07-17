var listThoughts;


var urlapi = "http://localhost:3000/api";

function OnLoadIndex(){
    listThoughts=getAllThoughts();
}
function getAllThoughts(){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: urlapi + "/thoughts",
        success: function(data){
            listThoughts=data;

            document.getElementById('listThoughtsHtml').innerHTML=generateHtmlListThoughts();
        }
    });
}
function generateHtmlListThoughts(){
    var html="";
    html+="<div class='list'>";
    html+="</div>";
    html+="<ul class='list-group'>";
    for(var i=0; i<listThoughts.length; i++)
    {
        html+=" <li class='list-group-item'>";
        html+="<img src='"+listThoughts[i].usericon+"' width='30px' />";
        html+="<a href='/userpage.html?value="+listThoughts[i].authorname+"'>" + listThoughts[i].authorname + ":</a>";
        html+="<br>";
        html+= listThoughts[i].content;
        html+="</li>";
    }

    html+="</ul>";


    return(html);
}


















/*
##############################
userpage.html
##############################
*/

function OnLoadUserPage(){
    var username=window.location.href.split("?value=")[1];
    $.ajax({
        type: "GET",
        dataType: "json",
        url: urlapi + "/users/byusername/" + username,
        success: function(data){

            document.getElementById('userpagehtml').innerHTML=generateHtmlUserPage(data[0]);
        }
    });
}
function generateHtmlUserPage(user){
    var html="";
    html+="<div class='well'>";
    html+="<h3>" + user.username + "</h3>";
    html+="description: " + user.description;

    html+="<br>mail: " + user.mail;
    html+="";
    html+="";
    html+="";
    html+="</div>";
    return(html);
}
