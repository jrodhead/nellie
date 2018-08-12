function resetMessage() { //reset send-message for faster input
  var blank = document.getElementById('send-message');
  blank.value = '';
}

function sendMessage() { //get send-message input value and add to conversation
  var message = document.getElementById('send-message');
  // api hooks
  var baseUri = 'https://westus.api.cognitive.microsoft.com/qnamaker/v2.0';
  var knowledgebasesID = '41b69735-86d8-411e-8004-ced4d6903919';
  var uri = baseUri + '/knowledgebases/' + knowledgebasesID + '/generateAnswer';
  if (message.value==='') { //handle empty input value
    $('#conversation ul').append('<li class="response"><span>Whoops! Please type something into the input box to ask me a question.</span></li>'); // error response
    // no response
  } else {
    messageType = 'question';
    var question = { 'question': message.value };
    var result = postAsk(uri, question); //comment to disable post to qnamaker

    // console.log('result - ' + JSON.stringify(answers));
    $('#conversation ul').append('<li class="post"><span>' + message.value + '</span></li>');
    var convElem = document.getElementById('conversation');
    resetMessage();
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
      $('#conversation ul').append('<li class="response"><span>' + res.data.answers[0].answer + '</span></li>');
    })
  );
}


$('#send-message').on('keyup', function (enter) {
  if (enter.keyCode == 13) {
    sendMessage();
  }
});

document.getElementById('send').addEventListener('click', sendMessage);

$('#nellieContainer .toggle i').click(function() {
  $('#nellieContainer').toggleClass('on');
});
