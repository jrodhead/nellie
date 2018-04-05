var conversation = []; // array that will store all added messages

function resetMessage() { //reset send-message for faster input
  var blank = document.getElementById('send-message');
  blank.value = '';
}

function errBox(errText, errPar) { //error display -- ADD TO CONVERSATION
  var errBox = document.createElement('div');
  errBox.className = 'error';
  errBox.innerHTML = '<p>' + errText + '</p>';
  var refChild = errPar.firstChild;
  errPar.insertBefore(errBox, refChild);
}

function attention(elem, className) { //add a class then remove it after a set time
  $(elem).addClass(className);
  setTimeout(function() {$(elem).removeClass(className)}, 500);
}

function sendMessage() { //get send-message input value and add to conversation array
  var message = document.getElementById('send-message');
  var convElem = document.getElementById('conversation');
  var errPar = document.getElementById('conversation');
  if (message.value==='') {
    attention(document.getElementById('new-message'), 'error');
    errBox('Whoops! Please type something into the input box.', errPar);
  } else {
    conversation.push({'id':message.value,'type':'manual','name':message.value});
    showOptions();
    var convElem = document.getElementById('conversation');
    convElem.scrollIntoView(false);
  }
};

function showOptions() { //display a list of items in the conversation array
  var optionList = '<ul>';
  for (let listItem of conversation) {
    optionList += '<li><span>' + listItem.name + '</span></li>'; // new
  };
  optionList += '</ul>';
  document.getElementById('conversation').innerHTML = optionList;
  resetMessage();
}

$("#send-message").on('keyup', function (enter) {
  if (enter.keyCode == 13) {
    sendMessage();
  }
});

document.getElementById('send').addEventListener('click', sendMessage);
