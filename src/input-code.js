(function() {
    const { ipcRenderer } = require('electron')

    const Store = require('electron-store');
    const store = new Store();

    function init() {

        document.querySelector('#exit-btn').addEventListener("click", function(e) {
            ipcRenderer.send('close-app');
        
        });

        let pos = parseInt(window.location.search.substring(1))

        let name = store.get('meeting'+pos+'.name');
        let url_unformatted = store.get('meeting'+pos+'.url_unformatted')
       
        if (name != undefined) document.getElementById('input-name').value = name
        if (url_unformatted != undefined) document.getElementById('input-url').value = url_unformatted

        document.querySelector('#save-btn').addEventListener("click", function(e) {

            store.set('meeting'+pos+'.url_unformatted', document.getElementById('input-url').value)
            let convertedUrl = convertUrl(document.getElementById('input-url').value)

            store.set('meeting'+pos+'.name', document.getElementById('input-name').value)
            store.set('meeting'+pos+'.url', convertedUrl)

            window.location.href = "select-screen.html";
        });
    }


    document.onreadystatechange =  () => {
        if (document.readyState == "complete") {
            init();
        }
    };

    
    function convertUrl(url_old){
        var meetingId_start = url_old.indexOf("zoom.us")+10;
        var password_start = url_old.indexOf("pwd=")+4;
        var success_start = url_old.length

        if (url_old.includes("#success")) success_start = url_old.indexOf("#success")
        var meetingId = url_old.substring(meetingId_start, password_start-5)
        var pwd = url_old.substring(password_start, success_start)
        return "zoommtg://zoom.us/join?confno="+meetingId+"&pwd="+pwd;
    }


})();