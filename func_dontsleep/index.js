var clova = require("love-clova");

const LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: function(handlerInput){
    var msg = "今夜は寝させませんよ";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

const SessionEndedRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('SessionEndedRequest');
  },
  handle: function(handlerInput){
    var msg = "";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

const ClovaGuideIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('Clova.GuideIntent');
  },
  handle: function(handlerInput){
    var msg = "このスキルは今日のあなたの運勢を占います。あなたの星座を教えてください。";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
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
    var msg = "エラー発生";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

exports.handler = clova.extensionBuilders
  .addRequestHandlers(LaunchRequestHandler,SessionEndedRequestHandler,ClovaGuideIntentHandler,DivinationIntentHandler)
  .addErrorHandlers(errorHandler)
  .lambda()