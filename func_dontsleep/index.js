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
    var msg = "お疲れ様です，";//今は"+formatDate(today);
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
    //var msg = `${constellation}ですね。${constellation}の今日の運勢は${fortune}です。`;
    if(finish == "おやすみ"){
      saydontsleep(handlerInput,finish);
      //setTimeout(function(){music('hoge')},5000);
      dontsleep(handlerInput);
      var msg ="おはようございます";

      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }else if(finish == "音楽"){
      //var msg = `あああ`;
      //const URL = "http://idontwork.asia/bgm/audio.mp3";
      const URL = "http://www.rec-art.jp/music/wav/noise/white-noise-96000hz.wav"
      return handlerInput.responseBuilder.audioPlay(URL).audioPlayReprompt(URL);//.getResponse();
      //return handlerInput.responseBuilder.speak(msg).getResponse();
    }else if(finish == "おはよう"){
      //sayhello(handlerInput)
       startfnc(handlerInput);
       var msg = "ばあい";
      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }else{
      var msg = `わーーーあああ。`;
      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }
  }
}


function startfnc(handlerInput)
{
  var count = 0;
  while(count<=5){
    if(count == 5){
      break;
    }
    setTimeout('sayhello(handlerInput)',5000);
    count+=1;
  }
  var msg = "繰り返しはおわりです";
  return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
}
/*
    //関数hello()を5秒間隔で呼び出す
  var id = setInterval(function(){
    countup();
    sayhello(handlerInput);
    
  },1000);*/




function sayhello(handlerInput){
  const msg  = `お早うございます`;
  return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
}

//起きる音楽を流す関数
function dontsleep(handlerInput){
  const URL = "http://idontwork.asia/bgm/audio.mp3"
  return handlerInput.responseBuilder.audioPlay(URL).audioPlayReprompt(URL);
}


//起きる音楽を流す関数
function saydontsleep(handlerInput,finish){
  const msg  = `まだ${finish}の時間ではありません．起きてください．5秒後に音楽が流れます`;
  
  return handlerInput.responseBuilder.speak(msg).reprompt(msg);
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
  .addRequestHandlers(LaunchRequestHandler,SessionEndedRequestHandler,ClovaGuideIntentHandler,FinishIntentHandler)
  .addErrorHandlers(errorHandler)
  .lambda()
