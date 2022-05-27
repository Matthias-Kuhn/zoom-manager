class Meeting {
    constructor(name, url, position) {
        this.name = name;
        this.url = url;
        this.position = position;
        this.name_selector = "#name"+position;
        this.btn_selector = "#btn"+position;
    }

    isActive() {
        return this.name != undefined && this.name.length > 0
    }
}

(function() {
    const { ipcRenderer } = require('electron')
    const shell = require('electron').shell;

    const Store = require('electron-store');
    const store = new Store();


    function init() {

        // get meetings from store
        let MEETINGS = [];
        MEETINGS.push(new Meeting(store.get('meeting0.name'), store.get('meeting0.url'), '0'));
        MEETINGS.push(new Meeting(store.get('meeting1.name'), store.get('meeting1.url'), '1'));
        MEETINGS.push(new Meeting(store.get('meeting2.name'), store.get('meeting2.url'), '2'));
        MEETINGS.push(new Meeting(store.get('meeting3.name'), store.get('meeting3.url'), '3'));
        MEETINGS.push(new Meeting(store.get('meeting4.name'), store.get('meeting4.url'), '4'));
        MEETINGS.push(new Meeting(store.get('meeting5.name'), store.get('meeting5.url'), '5'));
        MEETINGS.push(new Meeting(store.get('meeting6.name'), store.get('meeting6.url'), '6'));
        MEETINGS.push(new Meeting(store.get('meeting7.name'), store.get('meeting7.url'), '7'));

        MEETINGS.forEach(meeting => {

            // set text and button
            if (meeting.isActive()) {
                document.querySelector(meeting.name_selector).innerHTML = meeting.name
                document.querySelector(meeting.btn_selector).src = 'images/zoombtn_normal.png'
            }

            // register click listeners
            document.querySelector(meeting.btn_selector).addEventListener('click', function(e) {
                if (meeting.isActive()) shell.openExternal(meeting.url)
                else window.location.href = "input-screen.html?"+meeting.position
            });

            // right click
            document.querySelector(meeting.btn_selector).addEventListener('contextmenu', function(e) {
                window.location.href = "input-screen.html?"+meeting.position
            });

        })

        document.querySelector('#exit-btn').addEventListener("click", function(e) {
            ipcRenderer.send('close-app');
        
        });

    }


    document.onreadystatechange =  () => {
        if (document.readyState == "complete") {
            init();
        }
    };
})();