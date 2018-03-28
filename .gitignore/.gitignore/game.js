var memory_array = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0;
count = 0;
Array.prototype.memory_tile_shuffle = function() {
    var i = this.length, j, temp;
    while(--i > 0) {
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard() {
    tiles_flipped = 0;
    var output = '';
    memory_array.memory_tile_shuffle();
    var last_i = 100000;
    for(var i = 0; i < memory_array.length; i++) { 
        output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
    }
    document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val) {
    if(tile.innerHTML == "" && memory_values.length < 2){
        tile.style.background = 'url(' + val + '.png) no-repeat';
        if(memory_values.length == 0){
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
        } else if(memory_values.length == 1) {
            memory_values.push(val);
            memory_tile_ids.push(tile.id);
            if(memory_values[0] == memory_values[1]) {
                count += (18 - tiles_flipped)*42;
                tiles_flipped += 2;
                memory_values = [];
                memory_tile_ids = [];
                document.getElementById('count').innerHTML='Очки: ' + count;
                document.getElementById('count_1').innerHTML= count;
                // Check to see if the whole board is cleared
                //Тут если собрала все 
                // tiles_flipped - число раскрытых карт
                if(tiles_flipped == memory_array.length){
                    (document.getElementsByTagName('input'))[2].checked = true;
                    document.getElementById('memory_board').innerHTML = "";
                            newBoard();
                        }
            } else {
                count -= tiles_flipped*42;
                document.getElementById('count').innerHTML='Очки: ' + count;
                document.getElementById('count_1').innerHTML= count;
                function flip2Back(){
                    var tile_1 = document.getElementById(memory_tile_ids[0]);
                    var tile_2 = document.getElementById(memory_tile_ids[1]);
                    tile_1.style.background = 'url(kuar.png) no-repeat';
                    tile_1.innerHTML = "";
                    tile_2.style.background = 'url(kuar.png) no-repeat';
                    tile_2.innerHTML = "";
                    memory_values = [];
                    memory_tile_ids = [];
                }
                setTimeout(flip2Back, 700);
            }
        }
    }
    return count;
}
