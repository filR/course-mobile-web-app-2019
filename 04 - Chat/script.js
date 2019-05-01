
// create new firebase app
firebase.initializeApp({
    databaseURL: "https://chat-chat-chat-chat.firebaseio.com",
});


// send message
$('#message').keypress(function (e) {
    if (e.keyCode === 13) { // enter
        
        var username = $('#username').val();
        var message = $('#message').val();
        
        // write data to server
        firebase.database().ref('messages').push({
            name: username,
            text: message
        });
        
        $('#message').val('');
    }
});


// get last 20 and listen to updates
firebase.database().ref('messages').limitToLast(20).on('child_added', function (data) {
    // this function is called once for every message
    
    // grab data from message
    var name = data.val().name;
    var text = data.val().text;
    
    // normalise data
    if (!name) {
        name = "Anonymous";
    }
    
    if (!text) {
        return;
    }
    
//    <li>
//        <strong>Superman:</strong>
//        Your breathe is minty.
//    </li>
    
    // create html element
    var element = $('<li><strong>' + name +
                    '</strong>: ' + text + '</li>');
    
    // append to our container
    $("#messages").append(element);
    
    // scroll to bottom
    $("#messages")[0].scrollTop = $("#messages")[0].scrollHeight;
});












