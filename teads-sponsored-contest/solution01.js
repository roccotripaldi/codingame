// This solution works, but it is not optimized. Tests 8 and 9 will time out.

var n = parseInt(readline()); // the number of adjacency relations
var Graph = {};
var depth = 0;

for (var i = 0; i < n; i++) {
    var inputs = readline().split(' ');
    var xi = parseInt(inputs[0]); // the ID of a person which is adjacent to yi
    var yi = parseInt(inputs[1]); // the ID of a person which is adjacent to x
    if ( typeof Graph[xi] === 'undefined' ) {
        Graph[xi] = [];
    }
    if ( typeof Graph[yi] === 'undefined' ) {
        Graph[yi] = [];
    }
    Graph[xi].push(yi);
    Graph[yi].push(xi);
}

function removeNode( key, neighbor ) {
    if( typeof Graph[ neighbor ] != 'undefined' ) {
        Graph[ neighbor ] = Graph[ neighbor ].filter( function( value ) { return value != key } );
    }
}

function graphDecay() {
    var deleteKeys = [];
    for( var key in Graph ) {
        if ( Graph[key].length > 1 ) {
            continue;
        }
        deleteKeys[ key ] = Graph[ key ][ 0 ];
        delete Graph[ key ];
    }
    
    for( var d in deleteKeys ) {
        removeNode( d, deleteKeys[d] );
    }
    
    if ( Object.keys( Graph ).length > 0 ) {
        depth++;
    }
}

do {
    graphDecay();
} while( Object.keys( Graph ).length > 0 );

print( Math.max( depth, 2 ) );


