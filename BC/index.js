var clova = require("love-clova");
var today = new Date();
//var today = todayworld.toLocaleDateString('ja-JP-u-ca-japanese');

function formatDate(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = '日月火水木金土'.charAt(date.getDay());
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${m}月${d}日 ${day}曜日，${hours}時${minutes}分です`;
}


const LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: function(handlerInput){
    var msg = "今は"+formatDate(today);
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

const SessionEndedRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('SessionEndedRequest');
  },
  handle: function(handlerInput){
    var msg = "終了します";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

const ClovaGuideIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('Clova.GuideIntent');
  },
  handle: function(handlerInput){
    var msg = `かきくけこ`;
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}


const FinishIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('FinishIntent');
  },
  handle: function(handlerInput){
    
    // slotsを取得
    var finish = handlerInput.requestEnvelope.request.intent.slots.finish.value;
    
    // clovaに話す内容を作成。
    //var msg = `${constellation}ですね。${constellation}の今日の運勢は${fortune}です。`;
    if(finish == "おやすみ"){
      var msg = `${finish}です。`;
    }else if("音楽"){
     const  URL = "https://github.com/jphacks/SD_1807/blob/master/Music/White_Noise.mp3";
      return handlerInput.responseBuilder.speak(URL).getResponse();
    }else{
      var msg = `わーーーあああ。`;
    }
    
    return handlerInput.responseBuilder.speak(msg).getResponse();
    
  }
}


  const DivinationIntentHandler = {
  
    canHandle: function(handlerInput){
      return handlerInput.requestEnvelope.isMatch('DivinationIntent');
    },
    handle: function(handlerInput){
      // 運勢を配列で。
      var fortunes = ["良い", "普通", "悪い"];
      // fortunesの中からランダムで
      var fortune = fortunes[Math.floor(Math.random() * fortunes.length)];

      // slotsを取得
      //var finish = handlerInput.requestEnvelope.request.intent.slots.finish.value;
      var constellation = handlerInput.requestEnvelope.request.intent.slots.constellation.value;
      
      // clovaに話す内容を作成。
      var msg = `${constellation}ですね。${constellation}の今日の運勢は${fortune}です。`;
      return handlerInput.responseBuilder.speak(msg).getResponse();
      
      }
    }
    
    

  
const errorHandler = {
  canHandle: function(handlerInput){
    return true;
  },
  handle: function(handlerInput){
    var msg = "わかんないや...";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

exports.handler = clova.extensionBuilders
  .addRequestHandlers(LaunchRequestHandler,SessionEndedRequestHandler,ClovaGuideIntentHandler,DivinationIntentHandler,FinishIntentHandler)
  .addErrorHandlers(errorHandler)
  .lambda()
