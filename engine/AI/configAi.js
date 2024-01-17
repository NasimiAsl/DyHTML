var _AI = function (type,api,creator,model) {

  this.eng = _AI.prototype[type].initEng(api,creator);
  this.eng.chat = _AI.prototype[type].prompt(this.eng,model);
  this.sendMessage = _AI.prototype[type].sendMessage;

};

_AI.prototype = {
  eng: null,
  sendMessage: null,
  gemini: {
    initEng: function (API_KEY,creator ) {
      const genAI = new creator(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      return { type: 'gemini',eng: genAI,model: model };
    },
    prompt: function (eng,model) {
      const chat = eng.model.startChat({
        history: [
          {
            role: "user",
            parts: _AI.prototype.init.text1,
          },
          {
            role: "model",
            parts: model,
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

    try{  
      var result = await eng.chat.sendMessage(msg);
      var response = await result.response;

      var text = response.text();

      console.log('result:',text);

      
      var msg = "";
      text = text.replaceAll('```json','```');

      if (text && text.indexOf && (text.indexOf('```') != -1  )) {
          var text1  = text.split('```');
          msg = JSON.parse(text1[1]);
          msg.parsed = true;  
          if (fun)
          fun(msg,text[1]);
      } else {
        msg = null;
        fun(null);
      }
    
    } catch(e){  console.log(e); }
    }
  },
  init: {
    text1: ` 
      
      we make model as json   
      so always return me a json.
      add short message in json



      the json must have this parts 
      {
        action:'material, ...' or 'other',
        message:'shorter message',
        parts:['part1',...] or 'all',
        properties:['property1',...],
        values:[1,...]
      }

      `+'  use "```" as seprator for json data' +`

      try find witch part use wanna change or send me all parts 

      find the part  and find the user requirment type 

      we have 2 kind textures or images
      first icon one and second is pattern textures. 
        
      only make Json for me if you have any message write that after json as short message 
      then add full message after add a seprator   
            
       

      dont let user add any part or remove any part from model
      if user ask that let me know as uniq action "system Action" so i correct that myself
      and give him a correct message 
      
      action  "material" details is :
      "color" use hax color always is color default value  is null
      "bump" between -1 and 1 for change pattern or texture bump  default value  is null
      "uvs" a number  uvs is tile UV scale and image size ,textute size  for change pattern or texture scale default value  is null
      "uvr" between 0 and 360 for rotate pattern or texture default value  is null
      "bios" between 0 and 5 for make reflect blury or change roghness  default value  is null
      "phonge" between 0 and 1 for add light effect  default value  is null
      "metal" between 0 and 1 for add reflect  default value  is null
      "image"   texture,pattern,material,image,albido,basecolor all is  image
        
      important : when use ask show texture,pattern,material,image you must add "image" property

      result sample :  { 
        
        properties: ["image"],
         
      }

      important : if user missed part property send that as null
      

      only use mantioned properties in result
           
      properties is so important in result

      important : "and just set changed properties their not All properties."
      add message propeerty always to json
      
     result sample :  { 
        action: "material",
        parsed: true,
        message:"message",
        part: ["head","body"],
        properties: ["bump","metal"],
        values:[1,0.5] 
      } 
      
       and always make JSON as result
     ` ,
    text2: `
        wait for model come to you as 
        model = JSON;
    `,
    text3: `
       
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