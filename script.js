const actions = [
	'del',  // delete object
	'addV',  // add vertex
	'addE',  // add edge, unimplemented
	'colV',  // color vertex, unimplemented
	'colE',  // color edge, unimplemented
	'name',  // name object, unimplemented
	'move',  // move object, unimplemented
	'pan',  // pan screen, unimplemented
}

function setMode(m){
	mode = m
}



var mode;
var nodeIdCounter = 0;
var edgeIdCounter = 0;




// empty graph
let cy = cytoscape({
	container: document.getElementById("cy"),
	layout: {name:'preset'}
})



function add_vertex(xPos, yPos){
	cy.add({
		group: 'nodes',
		position: {x:xPos, y:yPos},
		data: {id: 'n'+nodeIdCounter},
	})
	// a new vertex is given the label "n" + a number, e.g. "n5"
	return nodeIdCounter++;
	// increment the nodeIdCounter so that numbers are not reused,
	// and return the value used to create this node
}


function add_edge(node1, node2){
	if (typeof node1 == "number"){
		node1 = "n"+node1;
	}
	if (typeof node2 == "number"){
		node2 = "n"+node2;
	}
	// ^ puts it into the proper format, e.g. "n5"
	
	cy.add({
		group: 'edges',
		data: {id: 'e'+nodeIdCounter, source:node1, target:node2},
		pannable: false,
	})
	return edgeIdCounter++;
	// increment the edgeIdCounter so that numbers are not reused,
	// and return the value used to create this edge
}


function delete_vertex(node){
	if (typeof node == "number"){
		node = "n"+node;
	}
	// ^ puts it into the proper format
	
	const x = cy.$id(node);
	cy.remove(x);
}









cy.on('tap', function( evt ){
	var tgt = evt.target || evt.cyTarget; // 3.x || 2.x

	if( tgt === cy && mode == 'addV'){
		add_vertex(evt.position.x, evt.position.y)
	}
	
});


cy.on('tap', 'node', function( evt ){
	var tgt = evt.target || evt.cyTarget; // 3.x || 2.x
	
	if(mode == 'del'){
		delete_vertex(tgt.data('id'))
	}
});



add_vertex(20,20);
add_vertex(280,280);
add_edge(0,1);

