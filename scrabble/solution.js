const N = parseInt(readline());
let dictionary = [];
let letters = '';
let combinations = {}
let permutations = [];
let usedChars = [];
let possibleWords = [];
let highScoringWords = [];
let highestScore = 0;
for (var i = 0; i < N; i++) {
   dictionary.push( readline() );
}
letters = readline().split( '' );
combinations[1] = letters.map( function( value, index ) {
    return [ index ];
} );
function getLetterScore( letter ) {
    switch( letter ) {
        case 'd':
        case 'g':
            return 2;
        case 'b':
        case 'c':
        case 'm':
        case 'p':
            return 3;
        case 'f':
        case 'h':
        case 'v':
        case 'w':
        case 'y':
            return 4;
        case 'k':
            return 5;
        case 'j':
        case 'x':
            return 8;
        case 'q':
        case 'z':
            return 10;
        default:
            return 1;
    }
}
function permute( input ) {
    input.forEach( function( char ) {
        usedChars.push( char );
        if ( input.length == 1 ) {
            permutations.push( usedChars.slice() );
        }
        permute( input.filter( function( elem ) {
            return char != elem;
        } ) );
        usedChars.pop();
    } );
};
function isSequential( array ) {
    if ( array[ array.length - 1 ] == letters.length - 1 ) {
        return false;
    }
    if ( array.length === 1 ) {
        return true;
    }
    return array.some( function( value, index, a ) {
        if ( ! a[ index + 1] ) {
            return true;
        }
        return a[ index + 1 ] - a[ index ] === 1;
    } );
}
function getCombinationsForSingleCombination( array ) {
    var c = [];
    for( var i = (array[ array.length - 1 ] + 1); i < letters.length; i++ ) {
        c.push( array.concat( i ) );
    }
    return c;
}
function getNextCombinations( previousValue, currentValue ) {
   if ( isSequential( currentValue ) ) {
      getCombinationsForSingleCombination( currentValue ).forEach( function( value ) {
          previousValue.push( value );
      } );
   }
   return previousValue;
}
for( var i = 2; i <= letters.length; i++ ) {
    combinations[ i ] = combinations[ i - 1 ].reduce( getNextCombinations, [] );
}
for( var i = 1; i <= letters.length; i++ ) {
    combinations[ i ].forEach( permute );
}
possibleWords = permutations.map(
    function( permutation ) {
        return permutation.reduce(
            function( a, b ) {
                return a + letters[ b ];
            }
        , '' );
    }
).filter( 
    function( word ) {
        return dictionary.indexOf( word ) > -1;
    }
).forEach(
    function( word ) {
        var score = word.split( '' ).reduce(
            function( a, b ) {
                return a + getLetterScore( b );
            }
        , 0 );
        if ( score > highestScore ) {
            highestScore = score;
            highScoringWords = [];
            highScoringWords.push( word );
        } else if( score == highestScore ) {
            highScoringWords.push( word );
        }
    }
);
highScoringWords.sort( function( a, b ) {
    if ( dictionary.indexOf( a ) > dictionary.indexOf( b ) ) {
        return 1;
    }
    return -1;
} );
print( highScoringWords.shift() );
