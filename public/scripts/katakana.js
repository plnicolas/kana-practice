
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
      //Down-arrow key; hide/display meaning
      else if (key == 40)
      {
        toggleDefinitionDisplay()
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
"アベック":{ romaji:"abekku", meaning:"romantic couple"},
"アイドル":{ romaji:"aidoru", meaning:"(teen) idol"},
"アイス":{ romaji:"aisu", meaning:"ice"},
"アイスクリーム":{ romaji:"aisukuriimu", meaning:"ice cream"},
"アイゼン":{ romaji:"aizen", meaning:"crampons"},
"アメフト":{ romaji:"amefuto", meaning:"American football"},
"アメリカンドッグ":{ romaji:"amerikandoggu", meaning:"corn dog"},
"アニメ":{ romaji:"anime", meaning:"animation"},
"アニソン":{ romaji:"anison", meaning:"an anime song"},
"アンケート":{ romaji:"ankeeto", meaning:"questionnaire"},
"アンニュイ":{ romaji:"annyui", meaning:"ennui"},
"アンサー":{ romaji:"ansaa", meaning:"reply to a question"},
"アパート":{ romaji:"apaato", meaning:"apartment (US)"},
"アポ":{ romaji:"apo", meaning:"appointment"},
"アロエ":{ romaji:"aroe", meaning:"aloe"},
"アルバイト":{ romaji:"arubaito", meaning:"part-time job"},
"アールブイ":{ romaji:"aarubui", meaning:"truck"},
"アルコール":{ romaji:"arukooru", meaning:"álcool"},
"アウトコース":{ romaji:"autokoosu", meaning:"outside"},
"バーゲン":{ romaji:"baagen", meaning:"a sale at a store"},
"バイキング":{ romaji:"baikingu", meaning:"smorgasbord"},
"バイク":{ romaji:"baiku", meaning:"a motorcycle"},
"バカンス":{ romaji:"bakansu", meaning:"holiday"},
"ブックカバー":{ romaji:"bukkukabaa", meaning:"dust jacket"},
"バックミラー":{ romaji:"bakkumiraa", meaning:"rear-view mirror"},
"バックナンバー":{ romaji:"bakkunanbaa", meaning:"back issue"},
"バックネット":{ romaji:"bakkunetto", meaning:"a backstop (in baseball)"},
"バリアフリー":{ romaji:"bariafurii", meaning:"Accessible facilities for handicapped persons"},
"バリカン":{ romaji:"barikan", meaning:"Hand or electric operating hair trimmer"},
"バター":{ romaji:"bataa", meaning:"butter"},
"バッティング":{ romaji:"battingu", meaning:"Swing the bat in baseball"},
"ベビーカー":{ romaji:"bebiikaa", meaning:"stroller (US)"},
"ベッドタウン":{ romaji:"beddotaun", meaning:"bedroom suburbs"},
"ビジネスホテル":{ romaji:"bijinesuhoteru", meaning:"budget hotel"},
"ビロード":{ romaji:"biroodo", meaning:"velvet"},
"ビル":{ romaji:"biru", meaning:"building (especially modern steel / concrete buildings)"},
"ビール":{ romaji:"biiru", meaning:"beer"},
"ボンベ":{ romaji:"bonbe", meaning:"a steel canister for storing pressurized gas"},
"ボタン":{ romaji:"botan", meaning:"button"},
"ブランコ":{ romaji:"buranko", meaning:"a swing"},
"ブレザー":{ romaji:"burezaa", meaning:"blazer"},
"ブルマ":{ romaji:"buruma", meaning:"short pants worn for exercise by girls"},
"チアリーダー":{ romaji:"chiariidaa", meaning:"cheerleader"},
"チアリーディング":{ romaji:"chiariidingu", meaning:"cheerleading"},
"チケット":{ romaji:"chiketto", meaning:"ticket"},
"チンキ":{ romaji:"chinki", meaning:"tincture"},
"チューハイ or 酎ハイ":{ romaji:"chuuhai", meaning:"a kind of alcoholic drink originating from Japan"},
"コラボ":{ romaji:"korabo", meaning:"A term for when two separate entities come together and make something"},
"デパート":{ romaji:"depaato", meaning:"department store"},
"デッサン":{ romaji:"dessan", meaning:"drawing"},
"デスク":{ romaji:"desuku", meaning:"an editor for a certain section of a publication"},
"ドイツ":{ romaji:"doitsu", meaning:"Deutsch(land)"},
"ドンマイ":{ romaji:"donmai", meaning:"'dont worry about it'"},
"ドライバー":{ romaji:"doraibaa", meaning:"a screwdriver"},
"ドライブイン":{ romaji:"doraibuin", meaning:"rest area"},
"ドラマ":{ romaji:"dorama", meaning:"TV drama"},
"ドリフト":{ romaji:"dorifuto", meaning:"drifting"},
"エアコン":{ romaji:"eakon", meaning:"air conditioning or air conditioner"},
"エキス":{ romaji:"ekisu", meaning:"extract"},
"エネルギッシュ":{ romaji:"enerugisshu", meaning:"energetic"},
"エンスト":{ romaji:"ensuto", meaning:"stall (as in an automobile engine)"},
"エレベーター":{ romaji:"erebeetaa", meaning:"elevator (American English)"},
"エール":{ romaji:"eeru", meaning:"(1) to cheer on a player in a sports competition; (2) to express support for a candidate in an election"},
"エスカレーター":{ romaji:"esukareetaa", meaning:"escalator"},
"エステ":{ romaji:"esute", meaning:"beauty salon"},
"エッチ":{ romaji:"etchi", meaning:"dirty"},
"ファイナル":{ romaji:"fainaru", meaning:"last"},
"ファミコン":{ romaji:"famikon", meaning:"fami(ly) com(puter)"},
"ファンファーレ":{ romaji:"fanfaare", meaning:"a musical fanfare"},
"ファンタジック":{ romaji:"fantajikku", meaning:"fantastic"},
"フェッチ":{ romaji:"fetchi", meaning:"(Computer Jargon) To fetch an instruction from main memory when a microprocessor executes a command"},
"フォアボール":{ romaji:"foabooru", meaning:"walk"},
"フライ":{ romaji:"furai", meaning:"fly ball (baseball term)"},
"フライ":{ romaji:"furai", meaning:"Deep frying"},
"フリーター":{ romaji:"furiitaa", meaning:"underemployed young adults"},
"フロント":{ romaji:"furonto", meaning:"the reception desk"},
"ガラス or 硝子":{ romaji:"garasu", meaning:"glass (material)"},
"ガーゼ":{ romaji:"gaaze", meaning:"gauze"},
"ゲレンデ":{ romaji:"gerende", meaning:"ski slope"},
"ゴム":{ romaji:"gomu", meaning:"rubber"},
"ググる":{ romaji:"guguru", meaning:"to google"},
"グラス":{ romaji:"gurasu", meaning:"drinking glass"},
"グロ":{ romaji:"guro", meaning:"grotesque"},
"ギャラリー":{ romaji:"gyararii", meaning:"an art gallery"},
"ハイカラ":{ romaji:"haikara", meaning:"In 1920s slang"},
"ハイネック":{ romaji:"hainekku", meaning:"A turtleneck style shirt or sweater"},
"ハイタッチ":{ romaji:"haitatchi", meaning:"High five"},
"ハッカー":{ romaji:"hakkaa", meaning:"refers specifically to a computer black hat"},
"ハモる":{ romaji:"hamoru", meaning:"to harmonize (when singing)"},
"ハンバーグ":{ romaji:"hanbaagu", meaning:"Salisbury steak"},
"ハンドル":{ romaji:"handoru", meaning:"steering wheel or bicycle handlebars"},
"ハンカチ":{ romaji:"hankachi", meaning:"handkerchief"},
"ハンスト":{ romaji:"hansuto", meaning:"hunger strike"},
"ハウス":{ romaji:"hausu", meaning:"greenhouse or glasshouse"},
"ヒステリー":{ romaji:"hisuterii", meaning:"loss of (self) control"},
"ヒップ":{ romaji:"hippu", meaning:"buttocks"},
"ホルモン":{ romaji:"horumon", meaning:"hormone; also offal when served for yakiniku or hotpot"},
"ホース":{ romaji:"hoosu", meaning:"a hose"},
"ホッチキス":{ romaji:"hotchikisu", meaning:"stapler (a genericized trademark of the E. H. Hotchkiss company"},
"ホーム":{ romaji:"hoomu", meaning:"a railway platform"},
"イエス":{ romaji:"iesu", meaning:"Jesus"},
"イギリス":{ romaji:"igirisu", meaning:"English"},
"イクラ":{ romaji:"ikura", meaning:"salmon roe"},
"イメージ":{ romaji:"imeeji", meaning:"an image"},
"インフレ":{ romaji:"infure", meaning:"inflation"},
"イラスト":{ romaji:"irasuto", meaning:"an illustration"},
"ジャンパー":{ romaji:"janpaa", meaning:"jacket"},
"ジンギスカン":{ romaji:"jingisukan", meaning:"Jingisukan (Mongolian style barbecue with cut lamb and vegetables)"},
"ジーパン":{ romaji:"jiipan", meaning:"jeans"},
"ジュース":{ romaji:"juusu", meaning:"often used to refer to soda or energy drinks"},
"カメラマン":{ romaji:"kameraman", meaning:"photographer"},
"カン":{ romaji:"kan", meaning:"can (beverage can or tin can)"},
"カンニング":{ romaji:"kanningu", meaning:"cheating"},
"カッパ":{ romaji:"kappa", meaning:"(rain) coat"},
"カラン":{ romaji:"karan", meaning:"faucet"},
"カラオケ":{ romaji:"karaoke", meaning:"empty) + orche(stra)"},
"カルキ":{ romaji:"karuki", meaning:"lime (mineral)"},
"カルピス":{ romaji:"karupisu", meaning:"Calpis (a milky soft drink)"},
"カルタ":{ romaji:"karuta", meaning:"karuta (Japanese playing cards)"},
"カルテ":{ romaji:"karute", meaning:"(a patients) medical record"},
"コーヒー":{ romaji:"koohii", meaning:"coffee"},
"コック":{ romaji:"kokku", meaning:"a cook"},
"コミカライズ":{ romaji:"komikaraizu", meaning:"to make a comic strip (manga) version of an originally non-comic strip title"},
"コンビニ":{ romaji:"konbini", meaning:"convenience store"},
"コンビナート":{ romaji:"konbinaato", meaning:"Combine (enterprise)"},
"コンクール":{ romaji:"konkuuru", meaning:"a contest"},
"コンセント":{ romaji:"konsento", meaning:"power outlet"},
"コント":{ romaji:"konto", meaning:"a short comedy"},
"コップ":{ romaji:"koppu", meaning:"a glass or tumbler"},
"コラーゲン":{ romaji:"koraagen", meaning:"collagen"},
"コロッケー":{ romaji:"korokkee", meaning:"croquette"},
"コスプレ":{ romaji:"kosupure", meaning:"cosplay (a subculture involving dressing up in costumes"},
"クラブ":{ romaji:"kurabu", meaning:"a club or society"},
"クラクション":{ romaji:"kurakushon", meaning:"horn (on an automobile)"},
"クランケ":{ romaji:"kuranke", meaning:"patient"},
"クレーム":{ romaji:"kureemu", meaning:"a complaint"},
"クリスタル":{ romaji:"kurisutaru", meaning:"shiny or clear"},
"キーボード":{ romaji:"kiiboodo", meaning:"a keyboard"},
"キャベツ":{ romaji:"kyabetsu", meaning:"cabbage"},
"キャンペーン":{ romaji:"kyanpeen", meaning:"a sales campaign or sweepstakes"},
"キャップ":{ romaji:"kyappu", meaning:"cap"},
"ママ":{ romaji:"mama", meaning:"mom"},
"マンダラ":{ romaji:"mandara", meaning:"circle"},
"マニア":{ romaji:"mania", meaning:"enthusiasm"},
"マンション":{ romaji:"manshon", meaning:"modern concrete apartment / condominium block"},
"マロン":{ romaji:"maron", meaning:"chestnut"},
"マスコミ":{ romaji:"masukomi", meaning:"mass media"},
"メーカー":{ romaji:"meekaa", meaning:"manufacturer"},
"メール":{ romaji:"meeru", meaning:"e-mail"},
"ミイラ":{ romaji:"miira", meaning:"a mummy"},
"ミルク":{ romaji:"miruku", meaning:"milk"},
"ミシン":{ romaji:"mishin", meaning:"sewing machine"},
"モバイル":{ romaji:"mobairu", meaning:"mobile communications"},
"ムーディ":{ romaji:"muudi", meaning:"nice"},
"ナイター":{ romaji:"naitaa", meaning:"a night game"},
"ニート　or NEET":{ romaji:"niito", meaning:"Education or Training"},
"ノルマ":{ romaji:"noruma", meaning:"quota"},
"ノート":{ romaji:"nooto", meaning:"a notebook"},
"オーディエンス":{ romaji:"oodiensu", meaning:"group of people who participate in a show"},
"オフ":{ romaji:"ofu", meaning:"a sale at a store; e.g."},
"オペ":{ romaji:"ope", meaning:"surgical operation"},
"オーライ":{ romaji:"oorai", meaning:"all right"},
"オルゴール":{ romaji:"orugooru", meaning:"a music box or any instrument that operates off of a music roll such as a calliope"},
"オートバイ":{ romaji:"ootobai", meaning:"motorcycle"},
"パイン":{ romaji:"pain", meaning:"pineapple"},
"パーマ":{ romaji:"paama", meaning:"perm"},
"パン":{ romaji:"pan", meaning:"pan"},
"パネリスト":{ romaji:"panerisuto", meaning:"panelist"},
"パンク":{ romaji:"panku", meaning:"flat tire"},
"パンスト":{ romaji:"pansuto", meaning:"pantyhose"},
"パソコン":{ romaji:"pasokon", meaning:"PC"},
"パンツ":{ romaji:"pantsu", meaning:"underpants (American English)"},
"パパ":{ romaji:"papa", meaning:"dad"},
"ペチカ":{ romaji:"pechika", meaning:"Russian oven"},
"ペンション":{ romaji:"penshon", meaning:"a resort hotel / chalet / cottage"},
"ピエロ":{ romaji:"piero", meaning:"a clown"},
"ピーマン":{ romaji:"piiman", meaning:"sweet bell pepper"},
"ピッケル":{ romaji:"pikkeru", meaning:"ice axe"},
"ピンチ":{ romaji:"pinchi", meaning:"potentially disastrous situation"},
"ピンセット":{ romaji:"pinsetto", meaning:"tweezers"},
"ポエマー":{ romaji:"poemaa", meaning:"a poet"},
"ポケベル":{ romaji:"pokeberu", meaning:"beeper"},
"ポケモン":{ romaji:"pokemon", meaning:"Pokémon"},
"ポンプ":{ romaji:"ponpu", meaning:"pump"},
"ポシェット":{ romaji:"poshetto", meaning:"a small bag"},
"ポスト":{ romaji:"posuto", meaning:"a mailbox (US)"},
"プロフィール":{ romaji:"purofiiru", meaning:"a profile"},
"プロレス":{ romaji:"puroresu", meaning:"professional wrestling"},
"ライバル":{ romaji:"raibaru", meaning:"A fellow competitor or an enemy"},
"ライフライン":{ romaji:"raifurain", meaning:"infrastructure"},
"ラッコ":{ romaji:"rakko", meaning:"a sea otter"},
"ランドセル":{ romaji:"randoseru", meaning:"a hard schoolbag"},
"レジュメ":{ romaji:"rejume", meaning:"a resume"},
"レントゲン":{ romaji:"rentogen", meaning:"X-ray"},
"レストラン":{ romaji:"resutoran", meaning:"restaurant"},
"リベンジ":{ romaji:"ribenji", meaning:"return match"},
"リフォーム":{ romaji:"rifoomu", meaning:"remodel"},
"リモコン":{ romaji:"rimokon", meaning:"remote control"},
"リニューアル":{ romaji:"rinyuuaru", meaning:"remodeling"},
"リストラ":{ romaji:"risutora", meaning:"(noun) restructuring"},
"ロマン":{ romaji:"roman", meaning:"novel"},
"ロープウェー":{ romaji:"roopuwee", meaning:"ropeway"},
"ルー":{ romaji:"ruu", meaning:"roux"},
"ルポ":{ romaji:"rupo", meaning:"Reportage"},
"リュックサック":{ romaji:"ryukkusakku", meaning:"backpack"},
"サービス":{ romaji:"saabisu", meaning:"service"},
"サボる":{ romaji:"saboru", meaning:"to slack off"},
"サイダー":{ romaji:"saidaa", meaning:"a kind of soda unrelated to actual cider"},
"サイン":{ romaji:"sain", meaning:"signature"},
"サインペン":{ romaji:"sainpen", meaning:"marker"},
"サンドイッチ or サンド":{ romaji:"sandoitchi", meaning:"sand(wich)"},
"サンドバッグ":{ romaji:"sandobaggu", meaning:"punching bag"},
"サラダ":{ romaji:"sarada", meaning:"salad"},
"サラリーマン":{ romaji:"sarariiman", meaning:"salaryman: a salaried office/white collar worker"},
"センス":{ romaji:"sensu", meaning:"understanding of subtleties"},
"セツナ":{ romaji:"setsuna", meaning:"moment"},
"シーエム":{ romaji:"shiiemu", meaning:"television commercial"},
"シール":{ romaji:"shiiru", meaning:"sticker"},
"シュークリーム":{ romaji:"shuukuriimu", meaning:"a cream puff"},
"ソフト":{ romaji:"sofuto", meaning:"video game console or computer software; also used to describe tasks or work (such as design) requiring imagination"},
"スカイ":{ romaji:"sukai", meaning:"a bib"},
"スケボー":{ romaji:"sukeboo", meaning:"skateboard"},
"スケルトン":{ romaji:"sukeruton", meaning:"translucent"},
"スキー":{ romaji:"sukii", meaning:"used as a noun to refer to skiing"},
"スコップ":{ romaji:"sukoppu", meaning:"trowel"},
"スマート":{ romaji:"sumaato", meaning:"slim"},
"スマホ":{ romaji:"sumaho", meaning:"smartphone"},
"スムーズ":{ romaji:"sumuuzu", meaning:"When a plan or transaction happens without incident"},
"スーパー":{ romaji:"suupaa", meaning:"supermarket"},
"スピン":{ romaji:"supin", meaning:"a ribbon or tassel on a book"},
"スポイト":{ romaji:"supoito", meaning:"syringe"},
"ストーブ":{ romaji:"sutoobu", meaning:"space heater"},
"タイムリー":{ romaji:"taimurii", meaning:"a clutch hit (in baseball)"},
"タレント":{ romaji:"tarento", meaning:"TV personality/celebrity"},
"テーマ":{ romaji:"teema", meaning:"theme"},
"テンキー":{ romaji:"tenkii", meaning:"numeric keypad"},
"テンション":{ romaji:"tenshon", meaning:"a state of excitement"},
"テレビ":{ romaji:"terebi", meaning:"television"},
"テレフォン":{ romaji:"terefon", meaning:"a system that converts acoustic vibrations to electrical signals in order to transmit sound"},
"テレカ":{ romaji:"tereka", meaning:"prepaid card for using public telephones"},
"ティーンエージャー":{ romaji:"tiineejaa", meaning:"A person in their teens"},
"トーチカ":{ romaji:"toochika", meaning:"bunker"},
"トイレ":{ romaji:"toire", meaning:"toilet"},
"トランプ":{ romaji:"toranpu", meaning:"playing cards"},
"トレーナー":{ romaji:"toreenaa", meaning:"a sweat shirt"},
"ワープロ":{ romaji:"waapuro", meaning:"word processor"},
"ヨット":{ romaji:"yotto", meaning:"a sailboat or yacht"},
"ゼン":{ romaji:"zen", meaning:"a meditation"},
"ゼロ":{ romaji:"zero", meaning:"zero"},
"トマト":{ romaji:"tomato", meaning:"tomato"},
"アフターサービス":{ romaji:"afutaasaabisu", meaning:"customer service"},
"ボールペン":{ romaji:"boorupen", meaning:"a ballpoint pen"},
"キャビンアテンダント":{ romaji:"kyabinatendanto", meaning:"A flight attendant"},
"コンピューター":{ romaji:"konpyuutaa", meaning:"computer"},
"ダブル(noun)":{ romaji:"daburu", meaning:"double"},
"ダンプカー":{ romaji:"danpukaa", meaning:"dump truck (US)"},
"ダストボックス":{ romaji:"dasutobokkusu", meaning:"rubbish bin (UK)"},
"デッドボール":{ romaji:"deddobooru", meaning:"hit by a pitch"},
"デコレーションケーキ":{ romaji:"dekoreeshonkeeki", meaning:"a fancy cake"},
"ドクター ストップ":{ romaji:"dokutaasutoppu", meaning:"when the doctor tells a patient to stop doing something"},
"フライドポテト":{ romaji:"furaidopoteto", meaning:"french fries (US)"},
"フリーダイアル":{ romaji:"furiidaiaru", meaning:"toll free call"},
"フリーサイズ":{ romaji:"furiisaizu", meaning:"one-size-fits-all"},
"フロントガラス":{ romaji:"furontogarasu", meaning:"windshield (US)"},
"ガードマン":{ romaji:"gaadoman", meaning:"a (private) security guard"},
"ガソリンスタンド":{ romaji:"gasorinsutando", meaning:"gas station (US)"},
"ガッツポーズ":{ romaji:"gattsupoozu", meaning:"fist pump"},
"ゲームセンター":{ romaji:"geemusentaaorgeesen", meaning:"video arcade"},
"ゴールデンアワー":{ romaji:"goorudenawaa", meaning:"prime time in Japanese television"},
"ゴールデンウィーク":{ romaji:"goorudenwiiku", meaning:"A week of holidays in Japan"},
"ハッピーエンド":{ romaji:"happiiendo", meaning:"a happy ending"},
"ハンドルキーパー":{ romaji:"handorukiipaa", meaning:"designated driver"},
"ハンドルネーム":{ romaji:"handoruneemu", meaning:"handle"},
"ヘアピンカーブ":{ romaji:"heapinkaabu", meaning:"hairpin turn"},
"ヘルスメーター":{ romaji:"herusumeetaa", meaning:"bathroom scales"},
"ホットケーキ":{ romaji:"hottokeeki", meaning:"a pancake"},
"ホワイトデー":{ romaji:"howaitodee", meaning:"White Day"},
"イン・キー":{ romaji:"inkii", meaning:"locking ones car keys inside of ones car"},
"ジェンダーフリー":{ romaji:"jendaafurii", meaning:"gender equality"},
"ジェットコースター":{ romaji:"jettokoosutaa", meaning:"roller coaster"},
"カモン":{ romaji:"kamon", meaning:"An invitation to join an activity"},
"カリウム":{ romaji:"kariumuorkari", meaning:"potassium"},
"カシューナッツ":{ romaji:"Kashuunattsu", meaning:"cashew"},
"カステラ":{ romaji:"kasutera", meaning:"a kind of sponge cake popular at festivals and as a street food in Japan"},
"キーホルダー":{ romaji:"kiihorudaa", meaning:"key ring"},
"キスマーク":{ romaji:"kisumaaku", meaning:"hickey"},
"キッチンペーパー":{ romaji:"kitchinpeepaa", meaning:"paper towel"},
"コインランドリー":{ romaji:"koinrandorii", meaning:"laundromat (US)"},
"コインロッカー":{ romaji:"koinrokkaa", meaning:"type of locker"},
"キャンピングカー":{ romaji:"kyanpingukaa", meaning:"a recreational vehicle"},
"キャッチボール":{ romaji:"kyatchibooru", meaning:"the game of catch"},
"キャッチホン":{ romaji:"kyatchihon", meaning:"call waiting"},
"キャッチコピー":{ romaji:"kyatchikopii", meaning:"tagline"},
"マグカップ":{ romaji:"magukappu", meaning:"mug"},
"マイナスドライバー":{ romaji:"mainasudoraibaa", meaning:"(flathead) screwdriver"},
"マジックテープ":{ romaji:"majikkuteepu", meaning:"Velcro"},
"メールマガジン":{ romaji:"meerumagajin", meaning:"e-mail newsletter"},
"モーニングコール":{ romaji:"mooningukooru", meaning:"wake-up call"},
"モーニングコート":{ romaji:"mooningukooto", meaning:"morning coat"},
"モーニングサービス":{ romaji:"mooningusaabisu", meaning:"breakfast special"},
"ナンバーディスプレイ":{ romaji:"nanbaadisupurei", meaning:"caller ID"},
"ナンバープレート":{ romaji:"nanbaapureeto", meaning:"number plate"},
"ノークレームノーリターン":{ romaji:"nookureemunooritaan", meaning:"no return"},
"オープンカー":{ romaji:"oopunkaa", meaning:"convertible (automobile)"},
"パーソナルコンピューター":{ romaji:"paasonarukonpyuutaa", meaning:"personal computer"},
"ペアルック":{ romaji:"pearukku", meaning:"matching outfits (usually between a couple)"},
"ペーパーカンパニー":{ romaji:"peepaakanpanii", meaning:"dummy company"},
"ペーパードライバー":{ romaji:"peepaadoraibaa", meaning:"a person who has a drivers license but does not usually drive (i.e.: a driver only on paper)"},
"ペーパーテスト":{ romaji:"peepaatesuto", meaning:"written examination/test"},
"プラスアルファ":{ romaji:"purasuarufa", meaning:"in addition"},
"プラスドライバー":{ romaji:"purasudoraibaa", meaning:"Phillips screwdriver"},
"プレイガイド":{ romaji:"pureigaido", meaning:"(theater) ticket agency"},
"プッシュホン":{ romaji:"pusshuhon", meaning:"touch-tone phone"},
"ライブアクション":{ romaji:"raibuakushon", meaning:"animated"},
"ライブハウス":{ romaji:"raibuhausu", meaning:"club with live music"},
"ランニングホームラン":{ romaji:"ranninguhoomuran", meaning:"an inside-the-park home run"},
"ランニングシャツ":{ romaji:"ranningushatsu", meaning:"a sleeveless T-shirt"},
"リードオンリーメンバー":{ romaji:"riidoonriimenbaa", meaning:"an internet lurker"},
"リンクフリー":{ romaji:"rinkufurii", meaning:"free to link"},
"リサイクルショップ":{ romaji:"risaikurushoppu", meaning:"secondhand shop (selling used"},
"ロードショー":{ romaji:"roodoshoo", meaning:"premiere"},
"ロマンスグレー":{ romaji:"romansuguree", meaning:"silver-gray hair"},
"ロマンスカー":{ romaji:"romansukaa", meaning:"deluxe train"},
"ロスタイム":{ romaji:"rosutaimu", meaning:"added time"},
"サイドブレーキ":{ romaji:"saidobureeki", meaning:"hand brake"},
"シルバーシート":{ romaji:"shirubaashiito", meaning:"priority seating on public transportation"},
"ソフトクリーム":{ romaji:"sofutokuriimu", meaning:"soft serve (ice cream)"},
"ソーラーシステム":{ romaji:"sooraashisutemu", meaning:"a solar battery"},
"スイートルーム":{ romaji:"suiitoruumu", meaning:"a suite in a hotel"},
"スリーサイズ":{ romaji:"suriisaizu", meaning:"three primary female body measurements (bust"},
"ストライキ":{ romaji:"sutoraiki", meaning:"labor strike"},
"ストレートティー":{ romaji:"sutoreetotii", meaning:"black tea without milk"},
"スーツアクター":{ romaji:"suutsuakutaa", meaning:"suit actor"},
"タバコ":{ romaji:"tabako", meaning:"tabaco"},
"タイムオーバー":{ romaji:"taimuoobaa", meaning:"when a time limit has been reached"},
"タオルケット":{ romaji:"taoruketto", meaning:"a type of blanket made of a material similar to a beach"},
"テレビゲーム":{ romaji:"terebigeemu", meaning:"video game"},
"トレーニングパンツ":{ romaji:"toreeningupantsu", meaning:"pants for toddlers"},
"ウィンカー":{ romaji:"winkaa", meaning:"turn signal"},
"ヴァージンロード":{ romaji:"vaajinroodo", meaning:"the aisle (in a Western-style"},
"ワイドショー":{ romaji:"waidoshoo", meaning:"talk show"},
"ワイシャツ":{ romaji:"waishatsu", meaning:"dress shirt (of any color)"},
"ワンパターン":{ romaji:"wanpataan", meaning:"of (artificial"},
"ワンピース":{ romaji:"wanpiisu", meaning:"(a single-piece) dress"},
"ヤンエグ":{ romaji:"yanegu", meaning:"young executive"},
"ヨードチンキ":{ romaji:"yoodochinki", meaning:"tincture of iodine"},
"ユニットバス":{ romaji:"yunittobasu", meaning:"modular bath"},
"Uターンラッシュ":{ romaji:"yuutaanrasshu", meaning:"the rush of traffic and people"},
"ワイシャツ":{romaji: "waishatsu", meaning: "white shirt"},
"レコード":{romaji: "rekoodo", meaning: "record"},
"レストラン":{romaji: "resutoran", meaning: "restaurant"},
"メートル":{romaji: "meetoru", meaning: "meter"},
"ポケット":{romaji: "poketto", meaning: "pocket"},
"ほそい":{romaji: "hosoi", meaning: "thin, fine"},
"ボタン":{romaji: "botan", meaning: "button"},
"ホテル":{romaji: "hoteru", meaning: "hotel"},
"プール":{romaji: "puuru", meaning: "pool"},
"フォーク":{romaji: "fooku", meaning: "fork"},
"マッチ":{romaji: "machi", meaning: "matches"},
"ネクタイ":{romaji: "nekutai", meaning: "necktie"},
"ノート":{romaji: "nooto", meaning: "notebook"},
"テープ":{romaji: "teepu", meaning: "tape"},
"テーブル":{romaji: "teeburu", meaning: "table"},
"ドア":{romaji: "doa", meaning: "door"},
"トイレ":{romaji: "toire", meaning: "toilet, lavatory"},
"ストーブ":{romaji: "sutoobu", meaning: "stove, heater"},
"スプーン":{romaji: "supuun", meaning: "spoon"},
"スポーツ":{romaji: "supootsu", meaning: "sports"},
"ズボン":{romaji: "zubon", meaning: "trousers"},
"スリッパ":{romaji: "surippa", meaning: "slipper"},
"スカート":{romaji: "sukaato", meaning: "skirt"},
"エレベータ":{romaji: "erebeeta", meaning: "elevator"},
"パン":{romaji: "pan", meaning: "bread"},
"ハンカチ":{romaji: "hankachi", meaning: "handkerchief"},
"バス":{romaji: "basu", meaning: "bus"},
"バター":{romaji: "bataa", meaning: "butter"},
"パーテイー":{romaji: "paateii", meaning: "party"},
"ニュース":{romaji: "nyuusu", meaning: "news"}
}