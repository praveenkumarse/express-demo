function addInformation() {

    var url = 'http://http://localhost:3000/add';
    var server = {};
    var data = new FormData();
    data.append('name', 'Praveen');
    data.append('Number', '9532991671');



    var init = function() {
        if (typeof XMLHttpRequest != 'undefined') {
            server = new XMLHttpRequest();
            server.open('POST', url, true);
            server.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            return true;
        }
    }();

    var send = function() {
        if (init) {
            server.send(data);
        }
    }();

}