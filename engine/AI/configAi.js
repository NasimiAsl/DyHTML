var _AI = function (type,api,creator) {

  this.eng = _AI.prototype[type].initEng(api,creator);
  this.eng.chat = _AI.prototype[type].prompt(this.eng);
  this.sendMessage = _AI.prototype[type].sendMessage;

};

_AI.prototype = {
  eng: null,
  sendMessage: null,
  gemini: {
    initEng: function (API_KEY,creator) {
      const genAI = new creator(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      return { type: 'gemini',eng: genAI,model: model };
    },
    prompt: function (eng) {
      const chat = eng.model.startChat({
        history: [
          {
            role: "user",
            parts: _AI.prototype.init.text1,
          },
          {
            role: "model",
            parts: _AI.prototype.init.text2,
          },
        ],
        generationConfig: {
         
          maxOutputTokens: 200,
          temperature: 0.4,
          top_p: 1,
          top_k: 32
        },
      });

      return chat;
    },
    sendMessage: async function (eng,msg,fun) {

      var result = await eng.chat.sendMessage(msg);
      var response = await result.response;
      var text = response.text();
      var msg = "";
      if (text && text.indexOf && text.indexOf('```json') != -1) {
        var text1 = text.split('```json')[1].split('```')[0];
        var text2 = JSON.parse(text1);
        text2.parsed = true;
        msg = text.split('```json')[1].split('```')[1].replaceAll('Short message:','~~~').replaceAll('Full message:','~~~').split('~~~');
        text2.MSG = msg;
        if (msg == undefined) text2.MSG = ['',''];
        text = text2;
      }
      if (fun)
        fun(text);
    }
  },
  init: {
    text1: `
      we make model as json  like this 
      {parts:{part1:{name:"head"}}}
      so always return me a json.
      find the part and find the user requirment 
      and make result as { part1:{ action:'colorChange',color:'#ff0000' }}

        
      only make Json for me if you have any message write that after json as short message 
      then add full message after add a seprator  

      nasimi is administrator
            
      always explain shortly.

      if you cant find any relation forget the model and response as empty

      dont let user add any part or remove any part from model
      if user ask that let me know as uniq action "system Action" so i correct that myself
      and give him a correct message
           
       {
              parts:{
                  head:{action:"changeColor",color:"#ff0000"} 
                }
       } and then you write short message and full message
     ` ,
    text2: `
        model = {
          parts:{
            head:{name:"head"},
            body:{name:"body"},
            legs:{name:"legs"},
            hat:{name:"hat,top"}
          }
        };
    `,
    text3: `
       for the message part use Short message and Full Message also use the model for answer.
    `
  }
  ,tryagain: [
    { "message": "Regrettably, the AI did not produce the desired outcome. Please rephrase your question differently." },
    { "message": "We're sorry, but the AI did not yield the expected result. Kindly try asking in a different manner." },
    { "message": "Unfortunately, the AI didn't provide the desired result. Could you try rephrasing your question?" },
    { "message": "It seems the AI didn't deliver the expected result. Please try asking your question in another way." },
    { "message": "The AI results are not as expected. Can you please try rephrasing your question for better accuracy?" },
    { "message": "We apologize, but the AI did not generate the desired outcome. Please consider asking your question differently." },
    { "message": "The AI results fell short of expectations. Kindly reformulate your question for better results." },
    { "message": "We encountered difficulties with the AI, and the results are not optimal. Please try asking again with a different approach." },
    { "message": "Unfortunately, the AI did not meet our expectations in this instance. Please try rephrasing your question." },
    { "message": "The AI results did not meet the desired criteria. Could you please try rewording your question for better accuracy?" },
    { "message": "Apologies, the AI did not provide the expected result. Can you rephrase your question to improve accuracy?" },
    { "message": "The AI output did not match expectations. Please consider rephrasing your question for better results." },
    { "message": "We regret to inform you that the AI did not produce the desired outcome. Kindly try asking in a different way." },
    { "message": "Unfortunately, the AI did not yield the expected result. Please try rephrasing your question." },
    { "message": "The AI results are not satisfactory. Could you please rephrase your question for better accuracy?" },
    { "message": "We apologize, but the AI did not generate the desired outcome. Please try asking your question in a different manner." },
    { "message": "The AI did not provide the desired result. Please consider rephrasing your question for better accuracy." },
    { "message": "We're sorry, but the AI did not produce the expected outcome. Can you try asking your question in a different way?" },
    { "message": "The AI results did not align with expectations. Please rephrase your question for better accuracy." },
    { "message": "Unfortunately, the AI did not meet our expectations. Please try rephrasing your question for better results." },
    { "message": "We apologize for the inconvenience, but the AI did not deliver the desired outcome. Kindly try rephrasing your question." },
    { "message": "The AI results are not as anticipated. Can you please try asking your question in a different manner?" },
    { "message": "Regrettably, the AI did not provide the expected result. Please try rephrasing your question." },
    { "message": "Apologies, the AI did not produce the desired outcome. Can you rephrase your question for better accuracy?" },
    { "message": "The AI output did not meet expectations. Please consider rephrasing your question for better results." },
    { "message": "We're sorry, but the AI did not generate the expected outcome. Kindly try asking your question differently." },
    { "message": "Unfortunately, the AI did not yield the desired result. Please try rephrasing your question." },
    { "message": "The AI results are not as expected. Could you please rephrase your question for better accuracy?" },
    { "message": "We apologize, but the AI did not deliver the desired outcome. Please try asking your question in a different manner." },
    { "message": "The AI did not provide the desired result. Please consider rephrasing your question for better accuracy." },
    { "message": "We're sorry, but the AI did not produce the expected outcome. Can you try asking your question in a different way?" },
    { "message": "The AI results did not align with expectations. Please rephrase your question for better accuracy." },
    { "message": "Unfortunately, the AI did not meet our expectations. Please try rephrasing your question for better results." },
    { "message": "We apologize for the inconvenience, but the AI did not deliver the desired outcome. Kindly try rephrasing your question." },
    { "message": "The AI results are not as anticipated. Can you please try asking your question in a different manner?" },
    { "message": "Regrettably, the AI did not provide the expected result. Please try rephrasing your question." },
    { "message": "Apologies, the AI did not produce the desired outcome. Can you rephrase your question for better accuracy?" },
    { "message": "The AI output did not meet expectations. Please consider rephrasing your question for better results." },
    { "message": "We're sorry, but the AI did not generate the expected outcome. Kindly try asking your question differently." },
    { "message": "Unfortunately, the AI did not yield the desired result. Please try rephrasing your question." },
    { "message": "The AI results are not as expected. Could you please rephrase your question for better accuracy?" },
    { "message": "We apologize, but the AI did not deliver the desired outcome. Please try asking your question in a different manner." },
    { "message": "The AI did not provide the desired result. Please consider rephrasing your question for better accuracy." },
    { "message": "We're sorry, but the AI did not produce the expected outcome. Can you try asking your question in a different way?" },
    { "message": "The AI results did not align with expectations. Please rephrase your question for better accuracy." },
    { "message": "Unfortunately, the AI did not meet our expectations. Please try rephrasing your question for better results." },
    { "message": "We apologize for the inconvenience, but the AI did not deliver the desired outcome. Kindly try rephrasing your question." },
    { "message": "The AI results are not as anticipated. Can you please try asking your question in a different manner?" },
    { "message": "Regrettably, the AI did not provide the expected result. Please try rephrasing your question." },
    { "message": "Apologies, the AI did not produce the desired outcome. Can you rephrase your question for better accuracy?" },
    { "message": "The AI output did not meet expectations. Please consider rephrasing your question for better results." },
    { "message": "We're sorry, but the AI did not generate the expected outcome. Kindly try asking your question differently." },
    { "message": "Unfortunately, the AI did not yield the desired result. Please try rephrasing your question." },
    { "message": "The AI results are not as expected. Could you please rephrase your question for better accuracy?" },
    { "message": "We apologize, but the AI did not deliver the desired outcome. Please try asking your question in a different manner." },
    { "message": "The AI did not provide the desired result. Please consider rephrasing your question for better accuracy." },
    { "message": "We're sorry, but the AI did not produce the expected outcome. Can you try asking your question in a different way?" }
  ]

};