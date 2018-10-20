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
      /*sleep(5, function () {
   
        console.log('5秒経過しました！');
     
    }); 
    */ 
      dontsleep(handlerInput);
      
      
      
      //dontsleep(handlerInput);
      var msg ="おはようございます！．目は覚めましたか？もし眠気が覚めていなければもう一度眠たいといってください．がんばってくださいね．";

      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }else if(finish == "音楽"){
      //var msg = `あああ`;
      //const URL = "http://idontwork.asia/bgm/audio.mp3";
      const URL = "https://maoudamashii.jokersounds.com/music/song/mp3/song_shiho_shining_star.mp3";
      //http://www.rec-art.jp/music/wav/noise/white-noise-96000hz.wav"
      return handlerInput.responseBuilder.audioPlay(URL).audioPlayReprompt(URL);//.getResponse();
      //return handlerInput.responseBuilder.speak(msg).getResponse();
    }
    /*else{
      var msg = `わーーーあああ。`;
      return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
    }*/
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
    
    // full 
    const URL = "http://www.ne.jp/asahi/music/myuu/wave/musicbox.wav";
    const URL2 = "http://www.ne.jp/asahi/music/myuu/wave/springsonate.mp3"
    const URL3 = "http://www.ne.jp/asahi/music/myuu/wave/eine.mp3";
    const URL4 = "http://www.ne.jp/asahi/music/myuu/wave/menuettm.mp3";
   
    //return handlerInput.responseBuilder.speak(msg).audioPlay(URL).audioPlayReprompt(URL).audioPlay(URL2).audioPlayReprompt(URL2).audioPlay(URL3).audioPlayReprompt(URL3).audioPlay(URL4).audioPlayReprompt(URL4);//.getResponse();
    return handlerInput.responseBuilder.speak(msg).audioPlay(URL).audioPlay(URL2).audioPlay(URL3).audioPlay(URL4).audioPlayReprompt(URL4);//.getResponse();
    //return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();

  }
}

/*
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
}*/
/*
    //関数hello()を5秒間隔で呼び出す
  var id = setInterval(function(){
    countup();
    sayhello(handlerInput);
    
  },1000);*/


  // setIntervalを使う方法
  function sleep(waitSec, callbackFunc) {
   
      // 経過時間（秒）
      var spanedSec = 0;
   
      // 1秒間隔で無名関数を実行
      var id = setInterval(function () {
   
          spanedSec++;
   
          // 経過時間 >= 待機時間の場合、待機終了。
          if (spanedSec >= waitSec) {
   
              // タイマー停止
              clearInterval(id);
   
              // 完了時、コールバック関数を実行
              if (callbackFunc) callbackFunc();
          }
      }, 1000);
   
  }
   
   


function sayhello(handlerInput){
  const msg  = `お早うございます`;
  return handlerInput.responseBuilder.speak(msg).reprompt(msg).getResponse();
}

//起きる音楽を流す関数
function dontsleep(handlerInput){
  //const URL = "http://idontwork.asia/bgm/audio.mp3"
  const URL = "http://www.ne.jp/asahi/music/myuu/wave/loop1.wav";
  return handlerInput.responseBuilder.audioPlay(URL).audioPlayReprompt(URL);//.getResponse();
}

//起きる音楽を流す関数
function saydontsleep(handlerInput,finish){
  const msg  = `まだ${finish}の時間ではありません．起きてください．このあとに音楽が流れます`;
  
  return handlerInput.responseBuilder.speak(msg).reprompt(msg);
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

exports.handler = clova.extensionBuilders
  .addRequestHandlers(LaunchRequestHandler,SessionEndedRequestHandler,ClovaGuideIntentHandler,FinishIntentHandler,WakeIntentHandler)
  .addErrorHandlers(errorHandler)
  .lambda()
