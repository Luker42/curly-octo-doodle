$(document).ready(function(){
function addtoblocklist(url){
	if(localStorage.getItem("blocklist") !== null){
		var list = JSON.parse(localStorage.blocklist);
		localStorage.blocklist = JSON.stringify(list + url);
	} else {
		var list = [url]
		localStorage.blocklist = JSON.stringify(list);
	}
}

function starttimer(block,unblock,timertype){
	localStorage.blocktime = block;
	localStorage.unblocktime = unblock;
    var date = new Date();
    if (timertype === "block") {
    	var timeEnd = new Date(date.getTime() +block*60000);
    }else{
    	var timeEnd = new Date(date.getTime() +unblock*60000);
    };
    localStorage.end = timeEnd;
    var timeEndJson = { sec:timeEnd.getSeconds(), min:timeEnd.getMinutes(), hr:timeEnd.getHours(), timetype:timertype };
    localStorage.setItem("timeEndJson", JSON.stringify(timeEndJson));
}	


$("#submit").click(function(){
	addtoblocklist($("#sitename").val());
	var blocktime = $("#blocktime").val();
	var unblocktime = $("#unblocktime").val();
	starttimer(blocktime,unblocktime,"block");
});

$("#stop").click(function(){
	localStorage.clear();
});
});