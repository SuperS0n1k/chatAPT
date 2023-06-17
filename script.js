
var speechRecognition = window.webkitSpeechRecognition

var recognition = new speechRecognition()

var textbox = $("#textbox")

var instructions = $("#instructions")

var content = ''

recognition.continuous = true

// recognition is started

function generateResponse(prompt) {
  const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
  const apiKey = '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';

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 500, // Adjust the response length as desired
      temperature: 0.7, // Adjust the temperature for more or less randomness
    }),
  })
  .then((response) => response.json())
  .then((data) => data.choices[0].text.trim())
  .catch((error) => {
    console.error('Error generating response:', error);
    return null;
  });
}
recognition.onstart = function() {

 instructions.text("Voice Recognition is On")

}

recognition.onspeechend = function() {

 instructions.text("No Activity")

}

recognition.onerror = function() {

 instruction.text("Try Again")

}

recognition.onresult = function(event) {

 var current = event.resultIndex;

 var transcript = event.results[current][0].transcript



 content += transcript

 textbox.val(generateResponse(content))

}

$("#start-btn").click(function(event) {

 recognition.start()

})

textbox.on('input', function() {

 content = $(this).val()

})

