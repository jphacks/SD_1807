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
       hello(finish,handlerInput);
    }else{
      var msg = `わーーーあああ。`;
      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }
  }
}


function startfnc(finish,handlerInput)
{
  //関数hyoji()を5秒間隔で呼び出す
  
  var count = 0;
  var countup = function(){
    count++;
  }
  var id = setInterval(function(){
    countup();
    hello(finish,handlerInput)
    if(count == 5){
      clearInterval(id);
      msg = "繰り返しはおわりです";
      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }
  },5000);

}


function hello(finish,handlerInput){
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
  const msg  = `まだ${finish}の時間ではありません．起きてください．`;
  return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
}



/*
function dontsleep(handlerInput){

}
*/

/*
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
    */
    

  
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
