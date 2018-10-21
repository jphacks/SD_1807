//
//  Created by Yuya Ishikawa on 2018/10/20.
//  Copyright © 2018年 Yuya Ishikawa & Yushi Nakaya. All rights reserved.
//
var clova = require("love-clova");

const LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: function(handlerInput){
    var msg = "快眠サポートを始めます。まずは肉体のリラックスから始めましょう。目を閉じて、顔から足のつま先にかけて深呼吸しながら意識的に力を抜いていきましょう。";
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
    var msg = "このスキルはあなたを快眠へ導きます。";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

const GoodnightIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('GoodnightIntent');
  },
  handle: function(handlerInput){
    // slotsを取得
    var goodnight = handlerInput.requestEnvelope.request.intent.slots.goodnight.value;
    // clovaに話す内容を作成。
    var msg = `そろそろ寝ましょうか．${goodnight}なさい。私もそろそろ寝ますね．三回ゆっくりと深呼吸をしましょう。次に心を落ち着かせます。心を無にしていきましょう`;
    const URL = "http://www.rec-art.jp/music/wav/noise/white-noise-96000hz.wav";
    return handlerInput.responseBuilder.speak(msg).audioPlay(URL).audioPlayReprompt(URL);//.getResponse();
  }
}

const errorHandler = {
  canHandle: function(handlerInput){
    return true;
  },
  handle: function(handlerInput){
    var msg = "リラックスしましょう。目を閉じて、顔から足のつま先にかけて深呼吸しながら意識的に力を抜いていきましょう。おやすみなさい";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

exports.handler = clova.extensionBuilders
  .addRequestHandlers(LaunchRequestHandler,SessionEndedRequestHandler,ClovaGuideIntentHandler,GoodnightIntentHandler)
  .addErrorHandlers(errorHandler)
  .lambda()
