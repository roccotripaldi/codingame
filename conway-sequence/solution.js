var R = parseInt(readline());
var L = parseInt(readline());
var lines = [];
function conwaySequence() {
    this.keys = [];
    this.numbers = {};
    this.currentNumber = false;
    this.currentKey = 0;
    this.bump = function(n) {
        if( this.currentNumber != n ) {
            this.currentKey++;
            this.currentNumber = n;
            this.keys.push( this.currentKey );
            this.numbers[this.currentKey] = {};
            this.numbers[this.currentKey].value = n;
            this.numbers[this.currentKey].freq = 0;
        }
        this.numbers[this.currentKey].freq++;
    }
}
function decode( lineIndex ) {
   var line = lines[lineIndex];
   var output = '';
   if( lineIndex === 1 ) {
       return R;
   }
   for ( var i = 0; i < line.keys.length; i++ ) {
       var key = line.keys[i];
       var number = line.numbers[key];
       output += number.freq.toString() + ' ' + number.value.toString() + ' ';
   }
   return output.trim();
}
function encode( s ) {
   var array = s.split(' ');
   var parsed = new conwaySequence();
   for( var i = 0; i < array.length; i++ ) {
       var value = array[i];
       parsed.bump( value );
   }
   return parsed;
}
lines[2] = new conwaySequence();
lines[2].bump( R );
for( var l = 3; l <= L; l++ ) {
    var prevLine = l - 1;
    var s = decode( prevLine );
    lines[l] = encode( s );
}
print( decode( L ) );
