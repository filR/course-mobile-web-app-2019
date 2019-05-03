
// init firestore
firebase.initializeApp({
    projectId: "let-s-chat-6845b"
});

let db = firebase.firestore().collection('messages');



// send message
$('#message').keypress(event => {
    if (event.keyCode === 13) { // enter
        
        var username = $('#username').val();
        var message = $('#message').val();
        
        // write data to server
        db.add({
            user: username,
            text: message,
            time: firebase.firestore.Timestamp.now().seconds
        })
        .then(() => {
            console.log("Message successfully written!");
        })
        .catch(error => {
            console.error("Error writing message: ", error);
        });
        
        // clear input field
        $('#message').val('');
    }
});


// get message & listen for new ones
db.orderBy('time').limit(25).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(data => {

        // grab data from message
        var name = data.doc.data().user;
        var text = data.doc.data().text;

        // normalise data
        if (!name) {
            name = "Anonymous";
        }

        if (!text) {
            return;
        }

        // create html element
        var $element = $(`<li>
                           <strong>${name}</strong>: ${text}
                        </li>`);

        // append to our container
        $("#messages").append($element);

        // scroll to bottom
        $("#messages")[0].scrollTop = $("#messages")[0].scrollHeight;
    });
});


