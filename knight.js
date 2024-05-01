//Create GameBoard
//fundamental rules of a knight in chess: moves in L-shape - so at most it can move in 8 different ways 
// 2nd rule: cannot move beyond the boundaries of the chess board
// strategy: use a queue to keep track of the current position of the knight and the path it has taken to get there
// This will be a breadth-first search algorithm - the first path that reaches the end point will be the shortest path

//Creates a node which returns starting point and end point if both are valid (within the bounds of the 8x8 chessboard)
// so the [x,y] coordinates of the start/end cannot go less than 0 or be greater than 7
function Node(pos, path){
    if (pos[0] < 0 || pos[0] > 7 || pos[1] < 0 || pos[1] > 7){
        return null;
    }
    return {pos, path};
}


function knightMoves([startX, startY], [endX, endY]){
    let q = [Node( [startX, startY] , [[endX, endY]] )]; //create a queue with the starting point and end point
    //the second set of brackets is the path the knight has taken to get to the starting point
    let currentNode = q.shift(); //remove the first element from the queue

    //BFS is used as it explores all possible paths before moving on to the next shortest path
    //while the current node's x and y coordinates are not equal to the end point's x and y coordinates
    while (currentNode.pos[0] !== endX || currentNode.pos[1] !== endY) {
        let moves = [
            [currentNode.pos[0] + 2, currentNode.pos[1] - 1], //move 2 right, 1 down
            [currentNode.pos[0] + 2, currentNode.pos[1] + 1], //move 2 right, 1 up
            [currentNode.pos[0] + 1, currentNode.pos[1] + 2], //move 1 right, 2 up
            [currentNode.pos[0] - 1, currentNode.pos[1] + 2], //move 1 left, 2 up
            [currentNode.pos[0] - 2, currentNode.pos[1] + 1], //move 2 left, 1 up
            [currentNode.pos[0] - 2, currentNode.pos[1] - 1], //move 2 left, 1 down
            [currentNode.pos[0] - 2, currentNode.pos[1] + 1], //move 1 left, 2 down
            [currentNode.pos[0] + 1, currentNode.pos[1] - 2], //move 1 right, 2 down
        ]; //moves array contains all the possible moves the knight can make
        moves.forEach((move) => {
            let node = Node(move, currentNode.path.concat([move])); //create a new node with the move and the path taken to get there
            if (node){
                q.push(node); //add the node to the queue
            }
        }); //by adding the node to the queue, we are keeping track of the path the knight has taken to get to the end point
        currentNode = q.shift(); //remove the first element from the queue
        
        //we remove the first element from the queue because we are using a breadth-first search algorithm 
        // -- the first path that reaches the end point will be the shortest path
        //each iteration of the while loop will move the knight to a new position (it generates all 8 possible moves)
        //in a sense we are exploring all possible paths the knight can take to get to the end point
        
        //this ensures that the first path that reaches the end point is the shortest path
    }

    console.log(`==> You made it in ${currentNode.path.length - 1} moves! Here's your path: `);

    //we use the queue to keep track of the path the knight has taken to get to the end point
    currentNode.path.forEach((pos) => {
        console.log(pos);
    });

    //the path will be printed out as a series of [x,y] coordinates
}

knightMoves([0,0], [1,2]); //returns 1 move

knightMoves([0,0], [3,3]); //returns 2 moves

knightMoves([0,0], [7,7]); //returns 6 moves