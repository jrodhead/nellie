var conversation = []; // array that will store all added messages

function resetMessage() { //reset send-message for faster input
  var blank = document.getElementById("send-message");
  blank.value = "";
}

function sendMessage() { //get send-message input value and add to conversation array
  var message = document.getElementById("send-message");
  var convElem = document.getElementById("conversation");
  if (message.value==="") {
    // do nothing when submitting empty input value
  } else {
    conversation.push({"question":message.value});
    showConversation();
    convElem.scrollTop = convElem.scrollHeight;
    setTimeout(function() {$('li#new').removeAttr('id','new')}, 500);
  }
}

function showConversation() { //display a list of items in the conversation array
  var optionList = "<ul>";
  for (let listItem of conversation) {
    optionList += "<li id='new'><span>" + listItem.question + "</span></li>"; // new
  };
  optionList += "</ul>";
  document.getElementById("conversation").innerHTML = optionList;
  resetMessage();
}

$("#send-message").on("keyup", function (enter) {
  if (enter.keyCode == 13) {
    sendMessage();
  }
});

document.getElementById("send").addEventListener("click", sendMessage);
