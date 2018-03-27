const ServerInfoBlock = $("#server-info-block");
//const ContentHeader = $("#content-header");
const ServerList = $("#server-list");

$(document).ready(function() {
    var url = '/request/guilds'//Replace with heroku later.
    $.get(url, function(data) {
        console.log(data);
        for (var i in data)
        {
            ServerList.after(MakeServerInfoTab(i));
        }
    });
});

function MakeServerInfoTab(guildObj) {
    var newTab = document.createElement("button");
    newTab.value = guildObj.name;

    newTab.onclick = function() {
        ServerInfoBlock.innerHTML(GuildInfoToHTML(guildObj));
    }

    return newTab;
}


function GuildInfoToHTML(guildInfo)
{
    console.log(guildInfo);
    var info = JSON.stringify(guildInfo);
    //TURN INTO HTML
    return info;
}
//ServerInfoTab.click(function() {
 // var url = '/request/guilds/name/' + this.name;//Replace with heroku later.
  //$.get(url, function(data) {
    //cleanData
  //  ServerInfoBlock.html(data);
   // });
 // });