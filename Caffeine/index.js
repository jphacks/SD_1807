//
//  Created by Yushi Nakaya on 2018/10/20.
//  Copyright © 2018年 Yushi Nakaya. All rights reserved.
//

var clova = require("love-clova");
var today = new Date();

const LaunchRequestHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('LaunchRequest');
  },
  handle: function(handlerInput){
    var msg = "お疲れ様です，今は"+formatDate(today);
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
    var msg ="わかんないや";
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
    if(finish == "おやすみ"){
      saydontsleep(handlerInput,finish);
      dontsleep(handlerInput);
      var msg = "おはようございます！．目は覚めましたか？もし眠気が覚めていなければもう一度眠たいといってください．がんばってくださいね．";
      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }else if(finish == "音楽"){
      const URL = "https://maoudamashii.jokersounds.com/music/song/mp3/song_shiho_shining_star.mp3";
      return handlerInput.responseBuilder.audioPlay(URL).audioPlayReprompt(URL);
    }
  }
}

const WakeIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('WakeIntent');
  },
  handle: function(handlerInput){
    // slotsを取得
    var wake = handlerInput.requestEnvelope.request.intent.slots.wake.value;
    // clovaに話す内容を作成。
    var msg = `作業を${wake}．がんばってくださいね．`;
    const URL = "http://www.ne.jp/asahi/music/myuu/wave/musicbox.wav";
    const URL2 = "http://www.ne.jp/asahi/music/myuu/wave/springsonate.mp3"
    const URL3 = "http://www.ne.jp/asahi/music/myuu/wave/eine.mp3";
    const URL4 = "http://www.ne.jp/asahi/music/myuu/wave/menuettm.mp3";
    return handlerInput.responseBuilder.speak(msg).audioPlay(URL).audioPlay(URL2).audioPlay(URL3)
    .audioPlay(URL4).audioPlayReprompt(URL4);
  }
}

const DemoIntentHandler = {
  canHandle: function(handlerInput){
    return handlerInput.requestEnvelope.isMatch('DemoIntent');
  },
  handle: function(handlerInput){
    // slotsを取得
    var wake = handlerInput.requestEnvelope.request.intent.slots.demo.value;
    // clovaに話す内容を作成。
    if(wake == "デモ"){
      var msg = `会場の皆さんお疲れ様です，もうすぐ私達の発表は終わりですがあと2組の発表が残っています．
      最後まで寝ないでききましょうね．ありがとうございました．`;
    }else{
      var msg = "";
    }
    return handlerInput.responseBuilder.speak(msg);
  }
}

const errorHandler = {
  canHandle: function(handlerInput){
    return true;
  },
  handle: function(handlerInput){
    var msg = "えらー";
    return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
  }
}

//起きる音楽をランダムに流す関数
function dontsleep(handlerInput){
  var URLs = ["http://www.ne.jp/asahi/music/myuu/wave/loop1.wav","http://www.ne.jp/asahi/music/myuu/wave/jupiter.mp3","http://www.ne.jp/asahi/music/myuu/wave/loop3.wav","http://www.ne.jp/asahi/music/myuu/wave/fanfare.mp3","http://www.ne.jp/asahi/music/myuu/wave/montagu.mp3"];
  var URL = 0;
  URL = URLs[Math.floor(Math.random() * URLs.length)];
  return handlerInput.responseBuilder.audioPlay(URL).audioPlayReprompt(URL);
}

function saydontsleep(handlerInput,finish){
  const msg  = `まだ${finish}の時間ではありません．起きてください．このあとに音楽が流れます`;
  return handlerInput.responseBuilder.speak(msg).reprompt(msg);
}

function formatDate(date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = '日月火水木金土'.charAt(date.getDay());
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${m}月${d}日 ${day}曜日，${hours}時${minutes}分です．気合を入れていきましょう．`;
}

exports.handler = clova.extensionBuilders
  .addRequestHandlers(LaunchRequestHandler,SessionEndedRequestHandler,ClovaGuideIntentHandler,
    FinishIntentHandler,DemoIntentHandler,WakeIntentHandler)
  .addErrorHandlers(errorHandler)
  .lambda()