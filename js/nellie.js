var conversation = []; // array that will store all added messages
var messageType = "question";

function resetMessage() { //reset send-message for faster input
  var blank = document.getElementById("send-message");
  blank.value = "";
}

function sendMessage() { //get send-message input value and add to conversation array
  var message = document.getElementById("send-message");
  var convElem = document.getElementById("conversation");
  //api hook
  var baseUri = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0';
  var knowledgebasesID = '41b69735-86d8-411e-8004-ced4d6903919';
  var uri = baseUri + '/knowledgebases/' + knowledgebasesID + '/generateAnswer';

  if (message.value==="") {
    // do nothing when submitting empty input value
  } else {
    messageType = 'question';
    var question = { "question": message.value };
    var result = postAsk(uri, question);

    conversation.push({"id":uri,"question":message.value});
    showConversation();
    convElem.scrollTop = convElem.scrollHeight;
    setTimeout(function() {$('li').removeAttr('class','new')}, 500);
  }
}

function postAsk(uri, question) {
  console.log('Starting Post')
  var response;
  return fetch(uri, {
      method: 'POST',
      headers: {
          'Ocp-Apim-Subscription-Key': 'd5cc86b877b14b9f923667c7d45a633b',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(question)
  })
  .then(response =>
    response.json().then(data => ({
        data: data,
        status: response.status
      })
    ).then(res => {
        var answers = res.data;
        console.log(res.status, JSON.stringify(answers));
        messageType = 'answer';
        conversation.push({ 'id': uri, 'type': 'response', 'name': res.data.answers[0].answer });
        showConversation();
        var convElem = document.getElementById('conversation');
        convElem.scrollIntoView(false);
    })
  );
}

function showConversation(messageType) { //display a list of items in the conversation array
  var optionList = "<ul>";
  for (let listItem of conversation) {
    if (messageType == 'message') {
      optionList += "<li class='new'><span>" + listItem.name + "</span></li>"; // new
    } else {
      optionList += "<li class='new'><span>" + listItem.question + "</span></li>"; // new
    }
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
