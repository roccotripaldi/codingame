var n = parseInt(readline()); // the number of adjacency relations

var Graph = [];
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


function removeNode( n ) {
    for( var key in Graph ) {
        if ( Graph[key].indexOf( n ) > -1 ) {
            Graph[key].splice( Graph[key].indexOf( n ), 1 );
        }
    }
}

function graphDecay() {
    var deleteKeys = [];
    for( var key in Graph ) {
        if ( Graph[key].length > 1 ) {
            continue;
        }
        delete Graph[key];
        if ( deleteKeys.indexOf( key ) === -1 ) {
            deleteKeys.push( key );
        }
    }
    
    if ( Object.keys( Graph ).length > 0 ) {
        depth++;
    }
    
     for ( var n = 0; n < deleteKeys.length; n++ ) {
        removeNode( parseInt( deleteKeys[n] ) );
    }
}

do {
    graphDecay();
} while( Object.keys( Graph ).length > 0 );


print( Math.max( depth, 2 ) );
