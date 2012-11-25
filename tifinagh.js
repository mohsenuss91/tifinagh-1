var Tifinagh = require('./lib/tifinagh');
var method = "";
var text = "";
process.argv.forEach(function (val,  index,  array) {
  if( index == 2 ) { method = val.replace(/^-/, ''); }
  if( index == 3 ) { text = val; }
});

var tifinagh = new Tifinagh({
  method: method,
  text: text
});
var text = tifinagh.transliterate()
if( text ) { console.log( text ); }
