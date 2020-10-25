
// client-side js
// run by the browser each time your view template is loaded

var buttonHiraganas = document.getElementById('buttonHiragana');

var textInput = document.getElementById('userInput');
var kanaP = document.getElementById('kana');
var wordDefinition = document.getElementById('definition');
var correctPic = document.getElementById('correct');
var wrongPic = document.getElementById('wrong');
var totalWordsDiv = document.getElementById('totalwords');
var totalRightDiv = document.getElementById('right');
var totalWrongDiv = document.getElementById('incorrect');
var totalDisplayedDiv = document.getElementById('totalDisplayed');
var definitionSpan = document.getElementById('definitionSpan');
var hideMeaning = false;

var keyList = [];
var keyListIndex = 0;
var lastIndicies = [];
var lastIndiciesInsertVal = 0;
var feedbackDisplayTime = 600;
var numberCorrect = 0;
var numberWrong = 0;
var totalShowed = 0;

var kanaToRomajiDict = {}; //this is filled in at the end of this file. So all code isn't stuck at the bottom


 
//**********HELPER FUNCTIONS**********
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}


//***********************************

function showAnswer(){
  textInput.value = kanaToRomajiDict[kanaP.innerText].romaji;
}

function toggleDefinitionDisplay(){
 if (!hideMeaning)
 {
   definitionSpan.style.display = "none";
 }
  else{
    definitionSpan.style.display = 'inline-block';
  }
  hideMeaning = !hideMeaning;
}


function setNewKana(){
  lastIndicies.splice(lastIndiciesInsertVal, 1, keyListIndex);
  lastIndiciesInsertVal = (lastIndiciesInsertVal + 1) % 5;
  
  
  var newIndex = getRandomInt(keyList.length);
  //make sure it's not the same one
  while(isInArray(newIndex, lastIndicies)){
    newIndex = getRandomInt(keyList.length);
  }
  
  keyListIndex = newIndex;
  totalShowed++;
  totalDisplayedDiv.innerText = totalShowed;
  
  //set values on the page
  kanaP.innerText = keyList[keyListIndex];
  wordDefinition.innerText = kanaToRomajiDict[keyList[keyListIndex]].meaning;
  textInput.value = '';
}

//hide the correct/wrong pics, and if there's a passed in functino, calls it
function hideFeedback(extraFunc){
  correctPic.style.display = 'none';
  wrongPic.style.display = 'none';
  if (typeof extraFunc != 'undefined'){
    extraFunc();  
  }
  
}

 //checks the answer when user presses enter
	function onKeyDownHandler(e) {
	    var key = window.event ? e.keyCode : e.which;
      if (key == 13)
      {
        
        if (textInput.value.toLowerCase() == kanaToRomajiDict[kanaP.innerText].romaji.toLowerCase())
        {
          numberCorrect++;
          totalRightDiv.innerText = numberCorrect;
          
          correctPic.style.display = 'inline-block';
          wrongPic.style.display = 'none';
          //display the "Correct!" for a little bit, then hides it and sets the new kana
          window.setTimeout(hideFeedback, feedbackDisplayTime, setNewKana);
          
        }
        else{
          numberWrong++;
          totalWrongDiv.innerText = numberWrong;
          
          correctPic.style.display = 'none';
          wrongPic.style.display = 'inline-block';
          //display the "Wrong!" for a little bit, then hids it
          window.setTimeout(hideFeedback, feedbackDisplayTime, setNewKana);
        }
        
      }
      //Right-arrow key; display another word
      else if (key == 39)
      {
          window.setTimeout(hideFeedback, feedbackDisplayTime, setNewKana);
      }
      //Left-arrow key; show answer
      else if (key == 38)
      {
        showAnswer();
      }
	}

document.addEventListener('DOMContentLoaded', function(){
	 //ON DOCUMENT READY
  
  //initialization
  
  for (var key in kanaToRomajiDict){
    keyList.push(key);
  }
  totalWordsDiv.innerText = keyList.length;
  totalRightDiv.innerText = 0;
  totalWrongDiv.innerText = 0;
  totalDisplayedDiv.innerText = 0;
  
  setNewKana();
  
  // attach handler to the keydown event of the document
  if (document.attachEvent) {
    document.attachEvent('onkeydown', onKeyDownHandler);
  }
  else {
    document.addEventListener('keydown', onKeyDownHandler);
  }
  
});


kanaToRomajiDict = {
  "あう":{ romaji:"au", meaning:"to meet"},
"あく":{ romaji:"aku", meaning:"to open"},
"あける":{ romaji:"akeru", meaning:"to open"},
"あげる":{ romaji:"ageru", meaning:"to give"},
"あそぶ":{ romaji:"asobu", meaning:"to play"},
"あびる":{ romaji:"abiru", meaning:"to take a shower"},
"あらう":{ romaji:"arau", meaning:"to wash"},
"ある":{ romaji:"aru", meaning:"to be, to exist"},
"ある":{ romaji:"aru", meaning:"to possess"},
"あるく":{ romaji:"aruku", meaning:"to walk"},
"いう":{ romaji:"iu", meaning:"to say, to tell"},
"いく":{ romaji:"iku", meaning:"to go"},
"いる":{ romaji:"iru", meaning:"need, must haven be required"},
"いる":{ romaji:"iru", meaning:"to exist"},
"いれる":{ romaji:"ireru", meaning:"to insert, to put in"},
"うたう":{ romaji:"utau", meaning:"to sing"},
"うまれる":{ romaji:"umareru", meaning:"to be born"},
"うる":{ romaji:"uru", meaning:"to sell"},
"おきる":{ romaji:"okiru", meaning:"to get up, to stand up"},
"おく":{ romaji:"oku", meaning:"to put"},
"おくる":{ romaji:"okuru", meaning:"to send"},
"おす":{ romaji:"osu", meaning:"to push"},
"おぼえる":{ romaji:"oboeru", meaning:"to memorize, to remember"},
"およぐ":{ romaji:"oyogu", meaning:"to swim"},
"おりる":{ romaji:"oriru", meaning:"to get off"},
"おわる":{ romaji:"owaru", meaning:"to end"},
"かう":{ romaji:"kau", meaning:"to buy"},
"かえす":{ romaji:"kaesu", meaning:"to return an object"},
"かえる":{ romaji:"kaeru", meaning:"to return home"},
"かかる":{ romaji:"kakaru", meaning:"to take time or money"},
"かく":{ romaji:"kaku", meaning:"to write"},
"かける":{ romaji:"kakeru", meaning:"to wear"},
"かける":{ romaji:"kakeru", meaning:"to make a phone call"},
"かす":{ romaji:"kasu", meaning:"to lend"},
"かぶる":{ romaji:"kaburu", meaning:"to put on a hat"},
"かりる":{ romaji:"kariru", meaning:"to borrow"},
"きえる":{ romaji:"kieru", meaning:"to go out, to vanish"},
"きく":{ romaji:"kiku", meaning:"to listen"},
"きる":{ romaji:"kiru", meaning:"to cut"},
"きる":{ romaji:"kiru", meaning:"to wear, to put on"},
"くる":{ romaji:"kuru", meaning:"to come"},
"けす":{ romaji:"kesu", meaning:"to turn off, to switch off"},
"こたえる":{ romaji:"kotaeru", meaning:"to answer"},
"こまる":{ romaji:"komaru", meaning:"to be in trouble"},
"さく":{ romaji:"saku", meaning:"to blossom"},
"さす":{ romaji:"sasu", meaning:"to open an umbrella"},
"しぬ":{ romaji:"shinu", meaning:"to die, to pass away"},
"しまる":{ romaji:"shimaru", meaning:"to close"},
"しめる":{ romaji:"shimeru", meaning:"to close"},
"しめる":{ romaji:"shimeru", meaning:"to fasten a belt"},
"しる":{ romaji:"shiru", meaning:"to know"},
"すう":{ romaji:"suu", meaning:"to breath, to smoke"},
"すむ":{ romaji:"sumu", meaning:"to live, to reside somewhere"},
"する":{ romaji:"suru", meaning:"to do"},
"すわる":{ romaji:"suwaru", meaning:"to sit"},
"だす":{ romaji:"dasu", meaning:"to take out, hand in"},
"たつ":{ romaji:"tatsu", meaning:"to stand"},
"たのむ":{ romaji:"tanomu", meaning:"to ask, to request"},
"たべる":{ romaji:"taberu", meaning:"to eat"},
"ちがう":{ romaji:"chigau", meaning:"to be different"},
"つかう":{ romaji:"tsukau", meaning:"to use"},
"つかれる":{ romaji:"tsukareru", meaning:"to get tired"},
"つく":{ romaji:"tsuku", meaning:"to arrive"},
"つくる":{ romaji:"tsukuru", meaning:"to make, to produce"},
"つける":{ romaji:"tsukeru", meaning:"to turn on"},
"つとめる":{ romaji:"tsutomeru", meaning:"to work for someone"},
"でかける":{ romaji:"dekakeru", meaning:"to go out"},
"できる":{ romaji:"dekiru", meaning:"can do"},
"でる":{ romaji:"deru", meaning:"to leave"},
"とぶ":{ romaji:"tobu", meaning:"to fly"},
"とまる":{ romaji:"tomaru", meaning:"to stop"},
"とる":{ romaji:"toru", meaning:"to take"},
"とる":{ romaji:"toru", meaning:"to take a photo"},
"なく":{ romaji:"naku", meaning:"to sing, mew, moo"},
"ならぶ":{ romaji:"narabu", meaning:"to form a line"},
"ならべる":{ romaji:"naraberu", meaning:"to line up"},
"なる":{ romaji:"naru", meaning:"to become"},
"ぬぐ":{ romaji:"nugu", meaning:"to take off clothes"},
"ねる":{ romaji:"neru", meaning:"to sleep"},
"のぼる":{ romaji:"noboru", meaning:"to climb up"},
"のむ":{ romaji:"nomu", meaning:"to drink"},
"のる":{ romaji:"noru", meaning:"to take, to ride"},
"はいる":{ romaji:"hairu", meaning:"to enter"},
"はく":{ romaji:"haku", meaning:"to put on shoes"},
"はじまる":{ romaji:"hajimaru", meaning:"to begin, to start"},
"はしる":{ romaji:"hashiru", meaning:"to run"},
"はたらく":{ romaji:"hataraku", meaning:"to work"},
"はなす":{ romaji:"hanasu", meaning:"to talk, to speak, to tell"},
"はる":{ romaji:"haru", meaning:"to put something on, to stick"},
"はれる":{ romaji:"hareru", meaning:"to clear up"},
"ひく":{ romaji:"hiku", meaning:"to pull"},
"ひく":{ romaji:"hiku", meaning:"to play an instrument"},
"ふく":{ romaji:"fuku", meaning:"to blow (wind"},
"ふる":{ romaji:"furu", meaning:"to fall (rain, snow"},
"まがる":{ romaji:"magaru", meaning:"to turn"},
"まつ":{ romaji:"matsu", meaning:"to wait"},
"みがく":{ romaji:"migaku", meaning:"to polish, to brush"},
"みせる":{ romaji:"miseru", meaning:"to show"},
"みる":{ romaji:"miru", meaning:"to see, to watch"},
"もつ":{ romaji:"motsu", meaning:"to have, to own"},
"やすむ":{ romaji:"yasumu", meaning:"to rest"},
"やる":{ romaji:"yaru", meaning:"to do"},
"よぶ":{ romaji:"yobu", meaning:"to call"},
"よむ":{ romaji:"yomu", meaning:"to read"},
"わかる":{ romaji:"wakaru", meaning:"to know, to understand"},
"わすれる":{ romaji:"wasureru", meaning:"to forget"},
"わたす":{ romaji:"watasu", meaning:"to hand over"},
"わたる":{ romaji:"wataru", meaning:"to cross"},
"ゼミナール":{ romaji:"zeminaaru", meaning:"seminar"},
"あう":{romaji: "au", meaning: "to meet"},
"あおい":{romaji: "aoi", meaning: "blue"},
"あかい":{romaji: "akai", meaning: "red"},
"あかるい":{romaji: "akarui", meaning: "light, bright"},
"あき":{romaji: "aki", meaning: "autumn, fall"},
"あく":{romaji: "aku", meaning: "open"},
"あける":{romaji: "akeru", meaning: "to open"},
"あげる":{romaji: "ageru", meaning: "to give"},
"あさ":{romaji: "asa", meaning: "morning"},
"あさごはん":{romaji: "asagohan", meaning: "breakfast"},
"あした":{romaji: "ashita", meaning: "tomorrow"},
"あそこ":{romaji: "asoko", meaning: "over there"},
"あそぶ":{romaji: "asobu", meaning: "to play"},
"あたたかい":{romaji: "atatakai", meaning: "warm"},
"あたま":{romaji: "atama", meaning: "head"},
"あたらしい":{romaji: "atarashii", meaning: "new"},
"あつい":{romaji: "atsui", meaning: "hot (air)"},
"あつい":{romaji: "atsui", meaning: "thick"},
"あに":{romaji: "ani", meaning: "older brother"},
"あね":{romaji: "ane", meaning: "older sister"},
"あの":{romaji: "ano", meaning: "that (over there)"},
"あの":{romaji: "ano", meaning: "well, then"},
"アパート":{romaji: "apaato", meaning: "apartment"},
"あぶない":{romaji: "abunai", meaning: "dangerous"},
"あまい":{romaji: "amai", meaning: "sweet"},
"あまり":{romaji: "amari", meaning: "not so"},
"あめ":{romaji: "ame", meaning: "rain"},
"ある":{romaji: "aru", meaning: "to possess"},
"あるく":{romaji: "aruku", meaning: "to walk"},
"あれ":{romaji: "are", meaning: "that one"},
"いいえ":{romaji: "iie", meaning: "no"},
"いえ":{romaji: "ie", meaning: "house, home"},
"いく":{romaji: "iku", meaning: "to go"},
"いくら":{romaji: "ikura", meaning: "how much"},
"いけ":{romaji: "ike", meaning: "pond"},
"いしゃ":{romaji: "isha", meaning: "doctor"},
"いす":{romaji: "isu", meaning: "chair"},
"いち":{romaji: "ichi", meaning: "one"},
"いつ":{romaji: "itsu", meaning: "when"},
"いつつ":{romaji: "itsutsu", meaning: "five"},
"いつも":{romaji: "itsumo", meaning: "always"},
"いま":{romaji: "ima", meaning: "now"},
"いみ":{romaji: "imi", meaning: "meaning"},
"いる":{romaji: "iru", meaning: "to exist"},
"いろ":{romaji: "iro", meaning: "color"},
"いろいろ":{romaji: "iroiro", meaning: "various"},
"うすい":{romaji: "usui", meaning: "thin"},
"うた":{romaji: "uta", meaning: "song"},
"うたう":{romaji: "utau", meaning: "to sing"},
"うち":{romaji: "uchi", meaning: "home"},
"うみ":{romaji: "umi", meaning: "sea"},
"うる":{romaji: "uru", meaning: "to sell"},
"うわぎ":{romaji: "uwagi", meaning: "coat, jacket"},
"え":{romaji: "e", meaning: "picture"},
"えいが":{romaji: "eiga", meaning: "movie"},
"えいがかん":{romaji: "eigakan", meaning: "cinema"},
"えいご":{romaji: "eigo", meaning: "English language"},
"えき":{romaji: "eki", meaning: "station"},
"えん":{romaji: "en", meaning: "Yen"},
"おいしい":{romaji: "oishii", meaning: "tasty, delicious"},
"おおぜい":{romaji: "oozei", meaning: "many people"},
"おかし":{romaji: "okashi", meaning: "confectionary, cake"},
"おくさん":{romaji: "okusan", meaning: "someone’s wife"},
"おくる":{romaji: "okuru", meaning: "to send"},
"おさけ":{romaji: "osake", meaning: "alcohol, sake"},
"おさら":{romaji: "osara", meaning: "plate"},
"おじいさん":{romaji: "ojiisan", meaning: "grand father"},
"おす":{romaji: "osu", meaning: "to push"},
"おそい":{romaji: "osoi", meaning: "late, slow"},
"おちゃ":{romaji: "ocha", meaning: "tea"},
"おてあらい":{romaji: "otearai", meaning: "toilet, lavatory"},
"おとうさん":{romaji: "otousan", meaning: "father"},
"おとこ":{romaji: "otoko", meaning: "man"},
"おとこのこ":{romaji: "otokonoko", meaning: "boy"},
"おとな":{romaji: "otona", meaning: "adult"},
"おなじ":{romaji: "onaji", meaning: "same"},
"おばさん":{romaji: "obasan", meaning: "aunt"},
"おばあさん":{romaji: "obaasan", meaning: "grandmother"},
"おべんとう":{romaji: "obentou", meaning: "lunchbox"},
"おもい":{romaji: "omoi", meaning: "heavy"},
"おもしろい":{romaji: "omoshiroi", meaning: "interesting, funny"},
"およぐ":{romaji: "oyogu", meaning: "to swim"},
"おわる":{romaji: "owaru", meaning: "to end"},
"おんがく":{romaji: "ongaku", meaning: "music"},
"おんな":{romaji: "onna", meaning: "woman"},
"おんなのこ":{romaji: "onnanoko", meaning: "girl"},
"がいこく":{romaji: "gaikoku", meaning: "foreign country"},
"がいこくじん":{romaji: "gaikokujin", meaning: "foreigner"},
"かいしゃ":{romaji: "kaisha", meaning: "company, enterprise"},
"かいだん":{romaji: "kaidan", meaning: "stairs"},
"かう":{romaji: "kau", meaning: "to buy"},
"かお":{romaji: "kao", meaning: "face"},
"かぎ":{romaji: "kagi", meaning: "key"},
"かく":{romaji: "kaku", meaning: "to write"},
"がくせい":{romaji: "gakusei", meaning: "student"},
"かける":{romaji: "kakeru", meaning: "to wear"},
"かさ":{romaji: "kasa", meaning: "umbrella"},
"かす":{romaji: "kasu", meaning: "to lend"},
"かぜ":{romaji: "kaze", meaning: "wind"},
"かぜ":{romaji: "kaze", meaning: "a cold"},
"かぞく":{romaji: "kazoku", meaning: "family"},
"かた":{romaji: "kata", meaning: "person (polite)"},
"かたかな":{romaji: "katakana", meaning: "Katakana"},
"いちがつ":{romaji: "ichigatsu", meaning: "January"},
"にがつ":{romaji: "nigatsu", meaning: "February"},
"さんがつ":{romaji: "sangatsu", meaning: "March"},
"しがつ":{romaji: "shigatsu", meaning: "April"},
"ごがつ":{romaji: "gogatsu", meaning: "May"},
"ろくがつ":{romaji: "rokugatsu", meaning: "June"},
"しちがつ":{romaji: "shichigatsu", meaning: "July"},
"はちがつ":{romaji: "hachigatsu", meaning: "August"},
"くがつ":{romaji: "kugatsu", meaning: "September"},
"じゅうがつ":{romaji: "juugatsu", meaning: "October"},
"じゅういちがつ":{romaji: "juuichigatsu", meaning: "November"},
"じゅうにがつ":{romaji: "juunigatsu", meaning: "December"},
"がっこう":{romaji: "gakkou", meaning: "school"},
"かど":{romaji: "kado", meaning: "corner"},
"かない":{romaji: "kanai", meaning: "my wife"},
"かばん":{romaji: "kaban", meaning: "bag"},
"かびん":{romaji: "kabin", meaning: "vase"},
"かみ":{romaji: "kami", meaning: "paper"},
"かめら":{romaji: "kamera", meaning: "camera"},
"かようび":{romaji: "kayoubi", meaning: "Tuesday"},
"からい":{romaji: "karai", meaning: "hot, spicy"},
"からだ":{romaji: "karada", meaning: "body"},
"かりる":{romaji: "kariru", meaning: "to borrow"},
"かるい":{romaji: "karui", meaning: "light (not heavy)"},
"カレンダー":{romaji: "karendaa", meaning: "calendar"},
"かわ":{romaji: "kawa", meaning: "river"},
"き":{romaji: "ki", meaning: "tree"},
"きいろい":{romaji: "kiiroi", meaning: "yellow"},
"きた":{romaji: "kita", meaning: "north"},
"ギター":{romaji: "gitaa", meaning: "guitar"},
"きたない":{romaji: "kitanai", meaning: "dirty"},
"きっさてん":{romaji: "kissaten", meaning: "coffee shop"},
"きって":{romaji: "kitte", meaning: "stamp"},
"きっぷ":{romaji: "kippu", meaning: "ticket"},
"きのう":{romaji: "kinou", meaning: "yesterday"},
"きゅう":{romaji: "kyuu", meaning: "nine"},
"ぎゅうにく":{romaji: "gyuuniku", meaning: "beef"},
"ぎゅうにゅう":{romaji: "gyuunyuu", meaning: "milk"},
"きょう":{romaji: "kyou", meaning: "today"},
"きょうしつ":{romaji: "kyoushitsu", meaning: "class room"},
"きょうだい":{romaji: "kyoudai", meaning: "siblings"},
"きょねん":{romaji: "kyonen", meaning: "last year"},
"きる":{romaji: "kiru", meaning: "to cut"},
"くる":{romaji: "kuru", meaning: "to come"},
"きれい":{romaji: "kirei", meaning: "beautiful, clean"},
"ぎんこう":{romaji: "ginkou", meaning: "bank"},
"きんようび":{romaji: "kinyoubi", meaning: "Friday"},
"く":{romaji: "ku", meaning: "nine"},
"くすり":{romaji: "kusuri", meaning: "medicine"},
"ください":{romaji: "kudasai", meaning: "give me…"},
"くだもの":{romaji: "kudamono", meaning: "fruit"},
"くち":{romaji: "kuchi", meaning: "mouth"},
"くつ":{romaji: "kutsu", meaning: "shoe"},
"くつした":{romaji: "kutsushita", meaning: "socks"},
"くに":{romaji: "kuni", meaning: "country"},
"くもり":{romaji: "kumori", meaning: "cloudy weather"},
"くらい":{romaji: "kurai", meaning: "dark"},
"ぐらい":{romaji: "gurai", meaning: "about"},
"クラス":{romaji: "kurasu", meaning: "class"},
"グラム":{romaji: "guramu", meaning: "gram"},
"くるま":{romaji: "kuruma", meaning: "car"},
"くろい":{romaji: "kuroi", meaning: "black"},
"けさ":{romaji: "kesa", meaning: "this morning"},
"けっこん":{romaji: "kekkon", meaning: "marriage"},
"げつようび":{romaji: "getsuyoubi", meaning: "Monday"},
"ご":{romaji: "go", meaning: "five"},
"こうばん":{romaji: "kouban", meaning: "police box"},
"こえ":{romaji: "koe", meaning: "voice"},
"コート":{romaji: "kooto", meaning: "coat"},
"ここ":{romaji: "koko", meaning: "here"},
"ごご":{romaji: "gogo", meaning: "afternoon"},
"ここのつ":{romaji: "kokonotsu", meaning: "nine"},
"ごぜん":{romaji: "gozen", meaning: "morning, a.m."},
"こたえる":{romaji: "kotaeru", meaning: "to answer"},
"コップ":{romaji: "koppu", meaning: "cup, glass"},
"ことし":{romaji: "kotoshi", meaning: "this year"},
"ことば":{romaji: "kotoba", meaning: "phrase, language"},
"こども":{romaji: "kodomo", meaning: "child"},
"この":{romaji: "kono", meaning: "this…"},
"これ":{romaji: "kore", meaning: "this"},
"ごろ":{romaji: "goro", meaning: "around…"},
"こんげつ":{romaji: "kongetsu", meaning: "this month"},
"こんしゅう":{romaji: "konshuu", meaning: "this week"},
"こんばん":{romaji: "konban", meaning: "this evening"},
"さあ":{romaji: "saa", meaning: "well…"},
"さかな":{romaji: "sakana", meaning: "fish"},
"さき":{romaji: "saki", meaning: "earlier, former"},
"さく":{romaji: "saku", meaning: "to blossom"},
"さくぶん":{romaji: "sakubun", meaning: "composition"},
"ざっし":{romaji: "zasshi", meaning: "magazine"},
"さとう":{romaji: "satou", meaning: "sugar"},
"さむい":{romaji: "samui", meaning: "cold"},
"さん":{romaji: "san", meaning: "three"},
"し":{romaji: "shi", meaning: "four"},
"しお":{romaji: "shio", meaning: "salt"},
"しかし":{romaji: "shikashi", meaning: "however, but"},
"じかん":{romaji: "jikan", meaning: "time"},
"しごと":{romaji: "shigoto", meaning: "work"},
"じしょ":{romaji: "jisho", meaning: "dictionary"},
"しずか":{romaji: "shizuka", meaning: "quiet"},
"した":{romaji: "shita", meaning: "under, below"},
"しつもん":{romaji: "shitsumon", meaning: "question"},
"じてんしゃ":{romaji: "jitensha", meaning: "bicycle"},
"じどうしゃ":{romaji: "jidousha", meaning: "car, vehicle"},
"じびき":{romaji: "jibiki", meaning: "dictionary"},
"じぶん":{romaji: "jibun", meaning: "oneself"},
"しまる":{romaji: "shimaru", meaning: "to close"},
"しめる":{romaji: "shimeru", meaning: "to close"},
"じゃ":{romaji: "ja", meaning: "well, then"},
"しゃしん":{romaji: "shashin", meaning: "photo"},
"シャツ":{romaji: "shatsu", meaning: "shirt"},
"じゅう":{romaji: "juu", meaning: "ten"},
"じゅぎょう":{romaji: "jugyou", meaning: "lesson, class"},
"しゅくだい":{romaji: "shukudai", meaning: "homework"},
"しょうゆ":{romaji: "shouyu", meaning: "soy sauce"},
"しる":{romaji: "shiru", meaning: "to know"},
"しろい":{romaji: "shiroi", meaning: "white"},
"しんぶん":{romaji: "shinbun", meaning: "newspaper"},
"すいようび":{romaji: "suiyoubi", meaning: "Wednesday"},
"すき":{romaji: "suki", meaning: "to like"},
"すこし":{romaji: "sukoshi", meaning: "a little"},
"すずしい":{romaji: "suzushii", meaning: "cool"},
"する":{romaji: "suru", meaning: "to do"},
"すわる":{romaji: "suwaru", meaning: "to sit"},
"せい":{romaji: "sei", meaning: "height"},
"せいと":{romaji: "seito", meaning: "student"},
"セーター":{romaji: "seetaa", meaning: "sweater"},
"せっけん":{romaji: "sekken", meaning: "soap"},
"せびろ":{romaji: "sebiro", meaning: "jacket, suit"},
"せまい":{romaji: "semai", meaning: "narrow"},
"ゼロ":{romaji: "zero", meaning: "zero"},
"せん":{romaji: "sen", meaning: "1,000, thousand"},
"せんげつ":{romaji: "sengetsu", meaning: "last month"},
"せんしゅう":{romaji: "senshuu", meaning: "last week"},
"せんせい":{romaji: "sensei", meaning: "teacher"},
"ぜんぶ":{romaji: "zenbu", meaning: "all"},
"そう":{romaji: "sou", meaning: "so"},
"そうじ":{romaji: "souji", meaning: "to clean"},
"そうして":{romaji: "soushite", meaning: "and then"},
"そこ":{romaji: "soko", meaning: "there"},
"そちら":{romaji: "sochira", meaning: "there (polite)"},
"そと":{romaji: "soto", meaning: "outside"},
"その":{romaji: "sono", meaning: "that…"},
"そば":{romaji: "soba", meaning: "next to"},
"そら":{romaji: "sora", meaning: "sky"},
"それ":{romaji: "sore", meaning: "that"},
"それから":{romaji: "sorekara", meaning: "after that"},
"それでは":{romaji: "soredewa", meaning: "then, well"},
"だいがく":{romaji: "daigaku", meaning: "university"},
"たいしかん":{romaji: "taishikan", meaning: "embassy"},
"だいじょうぶ":{romaji: "daijoubu", meaning: "OK"},
"たいせつ":{romaji: "taisetsu", meaning: "very important"},
"たいてい":{romaji: "taitei", meaning: "mostly, usually"},
"だいどころ":{romaji: "daidokoro", meaning: "kitchen"},
"たいへん":{romaji: "taihen", meaning: "very, serious"},
"たかい":{romaji: "takai", meaning: "high, expensive"},
"たくさん":{romaji: "takusan", meaning: "many, much"},
"タクシー":{romaji: "takushii", meaning: "taxi"},
"たつ":{romaji: "tatsu", meaning: "to stand"},
"たてもの":{romaji: "tatemono", meaning: "building"},
"たのしい":{romaji: "tanoshii", meaning: "pleasant, enjoyable"},
"たばこ":{romaji: "tabako", meaning: "cigarette"},
"たぶん":{romaji: "tabun", meaning: "perhaps, probably"},
"たべもの":{romaji: "tabemono", meaning: "food"},
"たべる":{romaji: "taberu", meaning: "to eat"},
"たまご":{romaji: "tamago", meaning: "egg"},
"だれ":{romaji: "dare", meaning: "who?"},
"たんじょうび":{romaji: "tanjoubi", meaning: "birthday"},
"だんだん":{romaji: "dandan", meaning: "gradually"},
"ちいさい":{romaji: "chiisai", meaning: "small"},
"ちかい":{romaji: "chikai", meaning: "near, close"},
"ちがう":{romaji: "chigau", meaning: "different"},
"ちかてつ":{romaji: "chikatetsu", meaning: "subway"},
"ちず":{romaji: "chizu", meaning: "map"},
"ちち":{romaji: "chichi", meaning: "my father"},
"ちゃいろ":{romaji: "chairo", meaning: "brown"},
"ちゃわん":{romaji: "chawan", meaning: "rice bowl"},
"ちょうど":{romaji: "choudo", meaning: "just"},
"ちょっと":{romaji: "chotto", meaning: "a little"},
"つかう":{romaji: "tsukau", meaning: "to use"},
"つぎ":{romaji: "tsugi", meaning: "next"},
"つく":{romaji: "tsuku", meaning: "to arrive"},
"つくえ":{romaji: "tsukue", meaning: "table"},
"つまらない":{romaji: "tsumaranai", meaning: "uninteresting"},
"つめたい":{romaji: "tsumetai", meaning: "cold"},
"つよい":{romaji: "tsuyoi", meaning: "strong"},
"て":{romaji: "te", meaning: "hand"},
"てがみ":{romaji: "tegami", meaning: "letter"},
"できる":{romaji: "dekiru", meaning: "can"},
"でぐち":{romaji: "deguchi", meaning: "exit"},
"テスト":{romaji: "tesuto", meaning: "test"},
"では":{romaji: "dewa", meaning: "then, well"},
"デパート":{romaji: "depaato", meaning: "department store"},
"でも":{romaji: "demo", meaning: "but"},
"でます":{romaji: "demasu", meaning: "to leave"},
"テレビ":{romaji: "terebi", meaning: "TV"},
"てんき":{romaji: "tenki", meaning: "weather"},
"でんき":{romaji: "denki", meaning: "electricity"},
"でんしゃ":{romaji: "densha", meaning: "train"},
"でんわ":{romaji: "denwa", meaning: "phone"},
"と":{romaji: "to", meaning: "door"},
"どう":{romaji: "dou", meaning: "how?"},
"どうして":{romaji: "doushite", meaning: "why?"},
"どうぶつ":{romaji: "doubutsu", meaning: "animal"},
"どうも":{romaji: "doumo", meaning: "thanks"},
"とお":{romaji: "too", meaning: "ten"},
"とおい":{romaji: "tooi", meaning: "far"},
"ときどき":{romaji: "tokidoki", meaning: "sometimes"},
"とけい":{romaji: "tokei", meaning: "watch, clock"},
"どこ":{romaji: "doko", meaning: "where?"},
"ところ":{romaji: "tokoro", meaning: "place"},
"としょかん":{romaji: "toshokan", meaning: "library"},
"どなた":{romaji: "donata", meaning: "who (polite)"},
"となり":{romaji: "tonari", meaning: "next to"},
"どの":{romaji: "dono", meaning: "which?"},
"とぶ":{romaji: "tobu", meaning: "to fly"},
"とまる":{romaji: "tomaru", meaning: "to stop"},
"ともだち":{romaji: "tomodachi", meaning: "friend"},
"どようび":{romaji: "doyoubi", meaning: "Saturday"},
"とり":{romaji: "tori", meaning: "bird"},
"とりにく":{romaji: "toriniku", meaning: "chicken meat"},
"とる":{romaji: "toru", meaning: "to take"},
"どれ":{romaji: "dore", meaning: "which?"},
"ナイフ":{romaji: "naifu", meaning: "knife"},
"なか":{romaji: "naka", meaning: "inside"},
"ながい":{romaji: "nagai", meaning: "long"},
"なつ":{romaji: "natsu", meaning: "summer"},
"なつやすみ":{romaji: "natsuyasumi", meaning: "summer vacation"},
"ななつ":{romaji: "nanatsu", meaning: "seven"},
"なに":{romaji: "nani", meaning: "what?"},
"なまえ":{romaji: "namae", meaning: "name"},
"ならう":{romaji: "narau", meaning: "to learn"},
"なる":{romaji: "naru", meaning: "to become"},
"に":{romaji: "ni", meaning: "two"},
"にぎやか":{romaji: "nigiyaka", meaning: "lively"},
"おにく":{romaji: "oniku", meaning: "meat"},
"にし":{romaji: "nishi", meaning: "west"},
"にちようび":{romaji: "nichiyoubi", meaning: "Sunday"},
"にもつ":{romaji: "nimotsu", meaning: "luggage"},
"にわ":{romaji: "niwa", meaning: "garden"},
"のみもの":{romaji: "nomimono", meaning: "drinks"},
"のむ":{romaji: "nomu", meaning: "to drink"},
"は":{romaji: "ha", meaning: "teeth"},
"はい":{romaji: "hai", meaning: "yes"},
"はいざら":{romaji: "haizara", meaning: "ashtray"},
"はいる":{romaji: "hairu", meaning: "to enter"},
"はがき":{romaji: "hagaki", meaning: "postcard"},
"はこ":{romaji: "hako", meaning: "box"},
"はし":{romaji: "hashi", meaning: "bridge"},
"はし":{romaji: "hashi", meaning: "chopsticks"},
"はしる":{romaji: "hashiru", meaning: "to run"},
"バス":{romaji: "basu", meaning: "bus"},
"バター":{romaji: "bataa", meaning: "butter"},
"はたらく":{romaji: "hataraku", meaning: "to work"},
"はち":{romaji: "hachi", meaning: "eight"},
"はな":{romaji: "hana", meaning: "flower"},
"はな":{romaji: "hana", meaning: "nose"},
"はなし":{romaji: "hanashi", meaning: "conversation, tale"},
"はは":{romaji: "haha", meaning: "my mother"},
"はやい":{romaji: "hayai", meaning: "early"},
"はやい":{romaji: "hayai", meaning: "fast, quick"},
"ばん":{romaji: "ban", meaning: "evening"},
"ばんごう":{romaji: "bangou", meaning: "number"},
"ばんごはん":{romaji: "bangohan", meaning: "dinner"},
"はんぶん":{romaji: "hanbun", meaning: "half"},
"ひがし":{romaji: "higashi", meaning: "east"},
"ひく":{romaji: "hiku", meaning: "to pull"},
"ひくい":{romaji: "hikui", meaning: "low"},
"ひこうき":{romaji: "hikouki", meaning: "plane"},
"ひだり":{romaji: "hidari", meaning: "left"},
"ひと":{romaji: "hito", meaning: "person"},
"ひとつ":{romaji: "hitotsu", meaning: "one"},
"ひとつき":{romaji: "hitotsuki", meaning: "one month"},
"ひとり":{romaji: "hitori", meaning: "one person"},
"ひゃく":{romaji: "hyaku", meaning: "hundred"},
"びょういん":{romaji: "byouin", meaning: "hospital"},
"びょうき":{romaji: "byouki", meaning: "ill, sick"},
"ひる":{romaji: "hiru", meaning: "noon"},
"ひるごはん":{romaji: "hirugohan", meaning: "lunch"},
"ひろい":{romaji: "hiroi", meaning: "wide, spacious"},
"フィルム":{romaji: "firumu", meaning: "film"},
"ふうとう":{romaji: "fuutou", meaning: "envelope"},
"ふく":{romaji: "fuku", meaning: "clothes"},
"ふたつ":{romaji: "futatsu", meaning: "two"},
"ぶたにく":{romaji: "butaniku", meaning: "pork"},
"ふたり":{romaji: "futari", meaning: "two people"},
"ふとい":{romaji: "futoi", meaning: "thick, fat"},
"ふるい":{romaji: "furui", meaning: "old"},
"おふろ":{romaji: "ofuro", meaning: "bath"},
"ページ":{romaji: "peeji", meaning: "page"},
"ベッド":{romaji: "beddo", meaning: "bed"},
"へや":{romaji: "heya", meaning: "room"},
"ぺん":{romaji: "pen", meaning: "pen"},
"べんきょう":{romaji: "benkyou", meaning: "to study"},
"べんり":{romaji: "benri", meaning: "convenient"},
"ぼうし":{romaji: "boushi", meaning: "hat"},
"ボールペン":{romaji: "boorupen", meaning: "ballpen"},
"ほか":{romaji: "hoka", meaning: "another, other"},
"ほん":{romaji: "hon", meaning: "book"},
"ほんだな":{romaji: "hondana", meaning: "bookshelf"},
"ほんとうに":{romaji: "hontouni", meaning: "really"},
"まいあさ":{romaji: "maiasa", meaning: "every morning"},
"まいしゅう":{romaji: "maishuu", meaning: "every week"},
"まいにち":{romaji: "mainichi", meaning: "every day"},
"まいばん":{romaji: "maiban", meaning: "every evening"},
"まえ":{romaji: "mae", meaning: "front"},
"まがる":{romaji: "magaru", meaning: "to turn"},
"まずい":{romaji: "mazui", meaning: "bad tasting"},
"また":{romaji: "mata", meaning: "also, again"},
"まだ":{romaji: "mada", meaning: "not yet"},
"まち":{romaji: "machi", meaning: "city, town"},
"まつ":{romaji: "matsu", meaning: "to wait"},
"まど":{romaji: "mado", meaning: "window"},
"まるい":{romaji: "marui", meaning: "round"},
"まん":{romaji: "man", meaning: "ten thousand"},
"まんねんひつ":{romaji: "mannenhitsu", meaning: "fountain pen"},
"みぎ":{romaji: "migi", meaning: "right"},
"みじかい":{romaji: "mijikai", meaning: "short"},
"おみず":{romaji: "omizu", meaning: "water"},
"みせ":{romaji: "mise", meaning: "shop"},
"みち":{romaji: "michi", meaning: "road"},
"みっつ":{romaji: "mittsu", meaning: "three"},
"みなさん":{romaji: "minasan", meaning: "everyone"},
"みなみ":{romaji: "minami", meaning: "south"},
"みみ":{romaji: "mimi", meaning: "ear"},
"みんな":{romaji: "minna", meaning: "all, everyone"},
"むこう":{romaji: "mukou", meaning: "over there"},
"むずかしい":{romaji: "muzukashii", meaning: "difficult"},
"むっつ":{romaji: "muttsu", meaning: "six"},
"め":{romaji: "me", meaning: "eye"},
"もう":{romaji: "mou", meaning: "already, yet"},
"もう":{romaji: "mou", meaning: "one) more"},
"もくようび":{romaji: "mokuyoubi", meaning: "Thursday"},
"もちろん":{romaji: "mochiron", meaning: "of course"},
"もっと":{romaji: "motto", meaning: "more"},
"もの":{romaji: "mono", meaning: "thing"},
"もん":{romaji: "mon", meaning: "gate"},
"もんだい":{romaji: "mondai", meaning: "problem, question"},
"やおや":{romaji: "yaoya", meaning: "vegetable shop"},
"やさい":{romaji: "yasai", meaning: "vegetable"},
"やさしい":{romaji: "yasashii", meaning: "gentle"},
"やすい":{romaji: "yasui", meaning: "cheap, inexpensive"},
"やすみ":{romaji: "yasumi", meaning: "holiday, vacation"},
"やすむ":{romaji: "yasumu", meaning: "to rest"},
"やっつ":{romaji: "yattsu", meaning: "eight things"},
"やま":{romaji: "yama", meaning: "mountain"},
"やる":{romaji: "yaru", meaning: "to do"},
"よく":{romaji: "yoku", meaning: "often"},
"よこ":{romaji: "yoko", meaning: "horizontal"},
"よっつ":{romaji: "yottsu", meaning: "four"},
"よぶ":{romaji: "yobu", meaning: "to call"},
"よむ":{romaji: "yomu", meaning: "to read"},
"よる":{romaji: "yoru", meaning: "night"},
"らいげつ":{romaji: "raigetsu", meaning: "next month"},
"らいしゅう":{romaji: "raishuu", meaning: "next week"},
"らいねん":{romaji: "rainen", meaning: "next year"},
"ラジオ":{romaji: "rajio", meaning: "radio"},
"りっぱ":{romaji: "rippa", meaning: "splendid"},
"りゅうがくせい":{romaji: "ryuugakusei", meaning: "foreign student"},
"りょうしん":{romaji: "ryoushin", meaning: "parents"},
"りょうり":{romaji: "ryouri", meaning: "cooking"},
"りょこう":{romaji: "ryokou", meaning: "travel"},
"れい":{romaji: "rei", meaning: "zero"},
"れいぞうこ":{romaji: "reizouko", meaning: "refrigerator"},
"れんしゅう":{romaji: "renshuu", meaning: "practice"},
"ろく":{romaji: "roku", meaning: "six"},
"わかい":{romaji: "wakai", meaning: "young"},
"わすれる":{romaji: "wasureru", meaning: "to forget"},
"わたし":{romaji: "watashi", meaning: "me, I"},
"わたる":{romaji: "wataru", meaning: "to cross"},
"わるい":{romaji: "warui", meaning: "bad"}  
}