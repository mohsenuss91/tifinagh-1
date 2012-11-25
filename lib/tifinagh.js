var _ = require('underscore');

/**
 * A set of methods to transliterate Tamaziɣt's Tifinaɣ
 * author: Abdel Said https://github.com/abdelsaid
 * @api public
 */
function Tifinagh( options ) {
  this.options = options;
  this.types = (function() {
      var self = this;
      var private = {
        'a': 'arabic'
        , 'l': 'latin'
      };
      return { get: function( name ) { return private[name] ? private[name] : null; } };
  })();
  this.init();
  return this;
};

Tifinagh.prototype.init = function () {
  var self = this;
  self.tifinagh = [
    //
    // {
    //   code:   the unicode code of the glyph
    //   unicode the glyph
    //   latin   latin representation
    //   arabic  arabic representation
    //   name    the glyph name
    //   ircam   true if it's the base script of ircam ( Institut royal de la culture amazighe )
    // }
    //
    {
         code: "U+2D30"
       , unicode: "ⴰ"
       , latin: "a"
       , arabic: "ا"
       , ipa: "æ"
       , name: "ya"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D31"
       , unicode: "ⴱ"
       , latin: "b"
       , arabic: "ب"
       , ipa: "b or β"
       , name: "yab"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D32"
       , unicode: "ⴲ"
       , latin: "b"
       , arabic: "ٻ"
       , ipa: "b or β"
       , name: "yab fricative"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D33"
       , unicode: "ⴳ"
       , latin: "g"
       , arabic: "گ"
       , ipa: "ɡ"
       , name: "yag"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D33U+2D6F"
       , unicode: "ⴳⵯ"
       , latin: "gw"
       , arabic: "وڲ"
       , ipa: "ɡw"
       , name: "yag fricative"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D34"
       , unicode: "ⴴ"
       , latin: "g"
       , arabic: "ڲ"
       , ipa: "ɡ"
       , name: "yag fricative"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D35"
       , unicode: "ⴵ"
       , latin: "dj"
       , arabic: "ج"
       , ipa: "d͡ʒ"
       , name: "Berber Academy yadj"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D36"
       , unicode: "ⴶ"
       , latin: "dj"
       , arabic: "ج"
       , ipa: "d͡ʒ"
       , name: "yadj"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D37"
       , unicode: "ⴷ"
       , latin: "d"
       , arabic: "د"
       , ipa: "d"
       , name: "yad"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D38"
       , unicode: "ⴸ"
       , latin: "d"
       , arabic: "د"
       , ipa: "ð"
       , name: "yad fricative"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D39"
       , unicode: "ⴹ"
       , latin: "ḍ"
       , arabic: "ض"
       , ipa: "dˤ"
       , name: "yaḍ"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D3A"
       , unicode: "ⴺ"
       , latin: "ḍ"
       , arabic: "ض"
       , ipa: "ðˤ"
       , name: "yaḍ fricative"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D3B"
       , unicode: "ⴻ"
       , latin: "e"
       , arabic: "ه"
       , ipa: "ə"
       , name: "yey"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D3C"
       , unicode: "ⴼ"
       , latin: "f"
       , arabic: "ف"
       , ipa: "f"
       , name: "yaf"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D3D"
       , unicode: "ⴽ"
       , latin: "k"
       , arabic: "ک"
       , ipa: "k"
       , name: "yak"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D3DU+2D6F"
       , unicode: "ⴽⵯ"
       , latin: "kw"
       , arabic: "وک"
       , ipa: "kw"
       , name: "yakw"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D3E"
       , unicode: "ⴾ"
       , latin: "k"
       , arabic: "ک"
       , ipa: "k"
       , name: "Tuareg yak"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D3F"
       , unicode: "ⴿ"
       , latin: "k"
       , arabic: "ک"
       , ipa: "k"
       , name: "yak fricative"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D40"
       , unicode: "ⵀ"
       , latin: "h"
       , arabic: "ھ"
       , ipa: "h"
       , name: "yah"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D41"
       , unicode: "ⵁ"
       , latin: "h"
       , arabic: "ھ"
       , ipa: "h"
       , name: "Berber Academy yah"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D42"
       , unicode: "ⵂ"
       , latin: "h"
       , arabic: "ھ"
       , ipa: "h"
       , name: "Tuareg yah"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D43"
       , unicode: "ⵃ"
       , latin: "ḥ"
       , arabic: "ح"
       , ipa: "ħ"
       , name: "yaḥ"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D44"
       , unicode: "ⵄ"
       , latin: "ɛ"
       , arabic: "ع"
       , ipa: "ɛ"
       , name: "yaɛ"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D45"
       , unicode: "ⵅ"
       , latin: "kh"
       , arabic: "خ"
       , ipa: "χ"
       , name: "yax"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D46"
       , unicode: "ⵆ"
       , latin: "kh"
       , arabic: "خ"
       , ipa: "χ"
       , name: "Tuareg yax"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D47"
       , unicode: "ⵇ"
       , latin: "q"
       , arabic: "ق"
       , ipa: "q"
       , name: "yaq"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D48"
       , unicode: "ⵈ"
       , latin: "q"
       , arabic: "ق"
       , ipa: "q"
       , name: "Tuareg yaq"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D49"
       , unicode: "ⵉ"
       , latin: "i"
       , arabic: "ي"
       , ipa: "i"
       , name: "yi"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D4A"
       , unicode: "ⵊ"
       , latin: "j"
       , arabic: "ج"
       , ipa: "ʒ"
       , name: "yaj"
       , ircam: "true"
    }
    , 
    {
         code: "U+2D4B"
       , unicode: "ⵋ"
       , latin: "j"
       , arabic: "ج"
       , ipa: "ʒ"
       , name: "Ahaggar yaj"
       , ircam: "false"
    }
    , 
    {
         code: "U+2D4C"
       , unicode: "ⵌ"
       , latin: "j"
       , arabic: "ج"
       , ipa: "ʒ"
       , name: "Tuareg yaj"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D4D"
       , unicode: "ⵍ"
       , latin: "l"
       , arabic: "ل"
       , ipa: "l"
       , name: "yal"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D4E"
       , unicode: "ⵎ"
       , latin: "m"
       , arabic: "م"
       , ipa: "m"
       , name: "yam"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D4F"
       , unicode: "ⵏ"
       , latin: "n"
       , arabic: "ن"
       , ipa: "n"
       , name: "yan"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D50"
       , unicode: "ⵐ"
       , latin: "ny"
       , arabic: "ني"
       , ipa: "nj"
       , name: "Tuareg yagn"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D51"
       , unicode: "ⵑ"
       , latin: "ng"
       , arabic: "ڭ"
       , ipa: "ŋ"
       , name: "Tuareg yang"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D52"
       , unicode: "ⵒ"
       , latin: "p"
       , arabic: "پ"
       , ipa: "p"
       , name: "yap"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D53"
       , unicode: "ⵓ"
       , latin: "w"
       , arabic: "و"
       , ipa: "yu"
       , name: "yaw"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D54"
       , unicode: "ⵔ"
       , latin: "r"
       , arabic: "ر"
       , ipa: "r"
       , name: "yar"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D55"
       , unicode: "ⵕ"
       , latin: "rˤ"
       , arabic: "ڕ"
       , ipa: "rˤ"
       , name: "yaṛ"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D56"
       , unicode: "ⵖ"
       , latin: "ɣ"
       , arabic: "غ"
       , ipa: "ɣ"
       , name: "yaɣ"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D57"
       , unicode: "ⵗ"
       , latin: "ɣ"
       , arabic: "غ"
       , ipa: "ɣ"
       , name: "Tuareg yaɣ"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D58"
       , unicode: "ⵘ"
       , latin: "j"
       , arabic: "غ"
       , ipa: "ɣ"
       , name: "Aïr yaɣ"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D59"
       , unicode: "ⵙ"
       , latin: "s"
       , arabic: "س"
       , ipa: "s"
       , name: "yas"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D5A"
       , unicode: "ⵚ"
       , latin: "sˤ"
       , arabic: "ص"
       , ipa: "sˤ"
       , name: "yaṣ"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D5B"
       , unicode: "ⵛ"
       , latin: "š"
       , arabic: "ش"
       , ipa: "ʃ"
       , name: "yaš"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D5C"
       , unicode: "ⵜ"
       , latin: "t"
       , arabic: "ت"
       , ipa: "t"
       , name: "yat"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D5D"
       , unicode: "ⵝ"
       , latin: "t"
       , arabic: "ت"
       , ipa: "t"
       , name: "yat fricative"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D5E"
       , unicode: "ⵞ"
       , latin: "tš"
       , arabic: "تش"
       , ipa: "t͡ʃ"
       , name: "yatš"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D5F"
       , unicode: "ⵟ"
       , latin: "tˤ"
       , arabic: "ط"
       , ipa: "tˤ"
       , name: "yaṭ"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D60"
       , unicode: "ⵠ"
       , latin: "v"
       , arabic: ""
       , ipa: "v"
       , name: "yav"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D61"
       , unicode: "ⵡ"
       , latin: "w"
       , arabic: ""
       , ipa: "w"
       , name: "yaw"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D62"
       , unicode: "ⵢ"
       , latin: "y"
       , arabic: "ي"
       , ipa: "j"
       , name: "yay"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D63"
       , unicode: "ⵣ"
       , latin: "z"
       , arabic: "ز"
       , ipa: "z"
       , name: "yaz"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D64"
       , unicode: "ⵤ"
       , latin: "z"
       , arabic: "ز"
       , ipa: "z"
       , name: "Tawellemet yaz"
       , ircam: "false"
    }
    ,
    {
         code: "U+2D65"
       , unicode: "ⵥ"
       , latin: "ẓ"
       , arabic: "ژ"
       , ipa: "zˤ"
       , name: "yaẓ"
       , ircam: "true"
    }
    ,
    {
         code: "U+2D6F"
       , unicode: "ⵯ"
       , latin: ""
       , arabic: ""
       , ipa: "ʷ"
       , name: "Tamatart"
       , ircam: "true"
    }
  ];
};

Tifinagh.prototype.usage = function () {
  var self = this;
  console.log( process.argv[0] + " " + process.argv[1] + " [-a|-l] message" );
  console.log( "         -a show arabic" );
  console.log( "         -l show latin" );
  return false;
};

Tifinagh.prototype.transliterate = function () {
  var self = this;
  var method = self.types.get( self.options.method );
  if( method == null || !self[ method ] ) {
    return self.usage();
  }
  if( _.isEmpty( self.options.text ) ) {
    return self.usage();
  }
  return self[ method ].apply( self );
};

Tifinagh.prototype.map = function () {
  var self = this;
  return _.invert( _.pluck( self.tifinagh, 'unicode' ) );
};

Tifinagh.prototype.latin = function () {
  var self = this;
  var map = self.map();
  var codes = self.options.text.split('');
  var text = "";
  _.each( codes, function( code ) {
    if( map[ code ] ) text += self.tifinagh[ map[ code ] ].latin;
    else text += code;
  });
  return text;
};

Tifinagh.prototype.arabic = function () {
  var self = this;
  var map = self.map();
  var codes = self.options.text.split('');
  var text = "";
  _.each( codes, function( code ) {
    if( map[ code ] ) text += self.tifinagh[ map[ code ] ].arabic;
    else text += code;
  });
  return text;
};

module.exports = Tifinagh;
