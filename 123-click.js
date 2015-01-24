var keyboardMap = ["","","","CANCEL","","","HELP","","BACK_SPACE","TAB","","","CLEAR","ENTER","RETURN","","SHIFT","CONTROL","ALT","PAUSE","CAPS_LOCK","KANA","EISU","JUNJA","FINAL","HANJA","","ESCAPE","CONVERT","NONCONVERT","ACCEPT","MODECHANGE","SPACE","PAGE_UP","PAGE_DOWN","END","HOME","LEFT","UP","RIGHT","DOWN","SELECT","PRINT","EXECUTE","PRINTSCREEN","INSERT","DELETE","","0","1","2","3","4","5","6","7","8","9","COLON","SEMICOLON","LESS_THAN","EQUALS","GREATER_THAN","QUESTION_MARK","AT","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","WIN","","CONTEXT_MENU","","SLEEP","NUMPAD0","NUMPAD1","NUMPAD2","NUMPAD3","NUMPAD4","NUMPAD5","NUMPAD6","NUMPAD7","NUMPAD8","NUMPAD9","MULTIPLY","ADD","SEPARATOR","SUBTRACT","DECIMAL","DIVIDE","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","","","","","","","","","NUM_LOCK","SCROLL_LOCK","WIN_OEM_FJ_JISHO","WIN_OEM_FJ_MASSHOU","WIN_OEM_FJ_TOUROKU","WIN_OEM_FJ_LOYA","WIN_OEM_FJ_ROYA","","","","","","","","","","CIRCUMFLEX","EXCLAMATION","DOUBLE_QUOTE","HASH","DOLLAR","PERCENT","AMPERSAND","UNDERSCORE","OPEN_PAREN","CLOSE_PAREN","ASTERISK","PLUS","PIPE","HYPHEN_MINUS","OPEN_CURLY_BRACKET","CLOSE_CURLY_BRACKET","TILDE","","","","","VOLUME_MUTE","VOLUME_DOWN","VOLUME_UP","","","SEMICOLON","EQUALS","COMMA","MINUS","PERIOD","SLASH","BACK_QUOTE","","","","","","","","","","","","","","","","","","","","","","","","","","","OPEN_BRACKET","BACK_SLASH","CLOSE_BRACKET","QUOTE","","META","ALTGR","","WIN_ICO_HELP","WIN_ICO_00","","WIN_ICO_CLEAR","","","WIN_OEM_RESET","WIN_OEM_JUMP","WIN_OEM_PA1","WIN_OEM_PA2","WIN_OEM_PA3","WIN_OEM_WSCTRL","WIN_OEM_CUSEL","WIN_OEM_ATTN","WIN_OEM_FINISH","WIN_OEM_COPY","WIN_OEM_AUTO","WIN_OEM_ENLW","WIN_OEM_BACKTAB","ATTN","CRSEL","EXSEL","EREOF","PLAY","ZOOM","","PA1","WIN_OEM_CLEAR",""];

String.prototype.endsWith = function (suffix) {
  return this.indexOf(suffix, this.length - suffix.length) !== - 1;
};
var keyMap = {
  wahr: 49,
  falsch: 50,
  weiter: 51,
  stats: 52,
  editing: false,
  key: 0
};
var regex = /([0-9]+)\/([0-9]+).*\(([0-9]+)%\).*/;
var observer = new MutationObserver(callback);
var observerOptions = {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: false
};
$(document).ready(function () {
  $('#buttonfalse').next().attr('id', 'buttonnext');
  $('#buttonfalse').next().next().attr('id', 'buttonstats');
  $('#buttonstats').click(function (event) {
    $('#stats').hide();
    toggleStats();
  });
  $('head').append($('<link rel="stylesheet" type="text/css" />').attr('href', 'eaaTrainer.css'));
  $('#info').hide();
  $('#error').hide();
  $('#stats').hide();
  $('#buttons').wrap('<div id=\'buttonWrap\'></div>');
  $('#buttons').after('<div id=\'statsDiv\'>0<div id=\'statsBad\'>&nbsp;</div><div id=\'statsGood\'>&nbsp;</div>0</div>');
  $('#buttonWrap').after('<div id=\'keyMap\'></div>');
  for (i = 1; i <= 4; i++) {
    $('#keyMap').append('<div class=\'keyArea\' id=\'keyArea' + i + '\'></div>');
    $('#keyArea' + i).css('width', getButtonWidth(i));
    $('#keyArea' + i).append('<span class=\'keycode\'>' + i + '</span>');
  }
  $('#keyMap').append('<div id=\'changeMapping\'>change key mapping</div>');
  $('#changeMapping').click(changeKeyMap);
  $('#keyMap').fadeTo(0, 0.5);
  observer.observe(document.querySelector('#stats'), observerOptions);
  $('body').append('<p id=\'pimpNote\'>Pimped by: <span class=\'me\'>bLind17</span></p>');
});
function getButtonWidth(index) {
  var width;
  var minwidth = 64;
  switch (index)
    {
    case 1:
      width = $('#buttontrue').width();
      break;
    case 2:
      width = $('#buttonfalse').width();
      break;
    case 3:
      width = $('#buttonnext').width();
      break;
    case 4:
      width = $('#buttonstats').width();
      break;
  }
  if (width > minwidth)
  return width;
   else
  return minwidth;
}
function callback() {
  comment($('#error').text(), $('#info').text());
  var stats = $('#stats').text();
  var match = regex.exec(stats);
  // clear text
  $('#statsDiv').contents().filter(function () {
    return this.nodeType === 3;
  }).remove();
  $('.correctBracket').remove();
  $('#statsDiv').prepend(match[1]);
  $('#statsDiv').append(match[2] - match[1]);
  $('#statsDiv').append('<span class=\'correctBracket\'>(' + match[3] + '%)</span>');
  var percentage = match[3];
  $('#statsGood').css('width', percentage + 'px');
  $('#statsBad').css('width', (100 - percentage) + 'px');
};
$(document).keydown(function (event) {
  if (keyMap.editing) {
    keyMap.key = event.which;
    return;
  }
  switch (event.which) {
    case keyMap.wahr:
      $('#buttontrue:enabled').addClass('selected');
      $('#buttontrue:enabled').click();
      break;
    case keyMap.falsch:
      $('#buttonfalse:enabled').addClass('selected');
      $('#buttonfalse:enabled').click();
      break;
    case keyMap.weiter:
      $('#buttonnext:enabled').click();
      $('#buttontrue, #buttonfalse').removeClass('selected');
      $('#buttontrue, #buttonfalse').removeClass('false');
      break;
    case keyMap.stats:
      //$("#buttonstats:enabled").click();
      toggleStats();
      break;
  }
});
function comment(status, infotext) {
  $('#question').append('<div id=\'comment\'></div>');
  $('#comment').hide(0);
  if (infotext === ('|'))
  infotext = '';
  var correct = status.endsWith(':)');
  var result;
  if (correct)
  result = 'Richtig';
   else
  result = 'Leider nein';
  if (infotext.length == 0)
  result += '!';
   else
  result += ':';
  var resultid = 'result' + (correct ? 'Correct' : 'Incorrect');
  $('#comment').append('<span id=\'' + resultid + '\'>' + result + '</span>');
  $('#comment').append('<span id=\'commentInfo\'>' + infotext + '</span>');
  $('#comment').show(100);
  if (!correct)
  $('body').effect('shake', {
    distance: 2,
    times: 2
  });
  if (!correct)
  $('#buttonfalse, #buttontrue').addClass('false');
}
function changeKeyMap() {
  if (keyMap.editing == true)
  return;
  keyMap.editing = true;
  $('#keyMap').fadeTo(150, 1);
  updateKeys(undefined);
}
function updateKeys(index) {
  console.log('updateKeys: ' + index);
  if (index === undefined) {
    index = 1;
    return updateKeys(index);
  } else if (index == 5) {
    keyMap.editing = false;
    $('#keyMap').fadeTo(150, 0.5);
    return true;
  }
  var sel = '#keyArea' + index;
  $(sel).addClass('editing');
  setKey(index);
  return true;
}
function setKey(index) {
  console.log('setKey: ' + index);
  getKey(function (index) {
    var value = keyMap.key;
    switch (index) {
      case 1:
        keyMap.wahr = value;
        break;
      case 2:
        keyMap.falsch = value;
        break;
      case 3:
        keyMap.weiter = value;
        break;
      case 4:
        keyMap.stats = value;
        break;
    }
    keyMap.key = 0;
    $('#keyArea' + index + ' .keycode').text(keyboardMap[value]);
    if($('#keyArea' + index + ' .keycode').text().length > 7)      
      $('#keyArea' + index + ' .keycode').text(keyboardMap[value].substring(0, 7));
    $('#keyArea' + index).removeClass('editing');
    window.setTimeout(function () {
      updateKeys(index + 1);
    }, 1);
  },
  index);
}
function getKey(keycallback, index) {
  console.log('getKey: ' + index);
  if (keyMap.key != 0) {
    window.setTimeout(function () {
      keycallback(index);
    }, 1);
    return;
  }
  window.setTimeout(function () {
    getKey(keycallback, index);
  }, 50);
}
function toggleStats() {
  if ($('#statsDiv').css('opacity') == 0)
  $('#statsDiv').fadeTo(300, 1);
   else
  $('#statsDiv').fadeTo(600, 0);
}
