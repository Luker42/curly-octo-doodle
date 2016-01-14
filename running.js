
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

function blocksite(id){
	chrome.tabs.update(id, {
        url: chrome.extension.getURL("blockedpage.html")
    })
}

function starttimer(block,unblock,timertype){
	localStorage.blocktime = block;
	localStorage.unblocktime = unblock;
    var date = new Date();
    if (timertype === "block") {
    	var timeEnd = new Date(date.getTime() + block*60000);
    }else{
    	var timeEnd = new Date(date.getTime() + unblock*60000);
    };
    localStorage.end = timeEnd;
    var timeEndJson = { sec:timeEnd.getSeconds(), min:timeEnd.getMinutes(), hr:timeEnd.getHours(), timetype:timertype };
    localStorage.setItem("timeEndJson", JSON.stringify(timeEndJson));

}

function checkAllTabs() {
    var blocked = JSON.parse(localStorage.blocklist);
    var timerend = JSON.parse(localStorage.timeEndJson);
    console.log(blocked)
    chrome.tabs.query({}, function(a) {
        for (var b = 0; b < a.length; b++) {
        	
        	var url = a[b].url;
        
        	var parser = document.createElement('a');

			parser.href = url;
        	if(isInArray(parser.hostname,blocked) && timerend.timetype === "block"){
        		blocksite(a[b].id);       
        	}
        }
    });
}

function checkblockstatus(){
	var blocktime = localStorage.blocktime;
	var unblocktime = localStorage.unblocktime;
	var timerend = JSON.parse(localStorage.timeEndJson);
	var timerEndString = timerend.hr +':'+timerend.min+':'+timerend.sec;
	var currentTime = new Date();
	var currentTimeString = currentTime.getHours()+":"+currentTime.getMinutes()+":"+currentTime.getSeconds();
	if(currentTimeString > timerEndString && timerend.timetype === "block"){
		
		starttimer(blocktime,unblocktime,"unblock");
		console.log("made it here");
	}else if(currentTimeString > timerEndString && timerend.timetype === "unblock"){
		
		starttimer(blocktime,unblocktime,"block");
		console.log("made it here2");
	}
	console.log(timerEndString+"\n"+currentTimeString);
}

setInterval(function(){
	if(localStorage.getItem('blocktime') !== null ){
		checkblockstatus();
	}
},5000)

setInterval(function(){
	if(localStorage.getItem("blocklist") !== null){
		checkAllTabs();
		console.log("checking tabs");
	}
},500);


