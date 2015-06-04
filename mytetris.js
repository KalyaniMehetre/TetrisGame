var tetris = {};
var score = 0;

$(document).ready(function(){
tetris.drawplayfield();
tetris.createnewshape();
tetris.fillcells(tetris.currcoord,'black');

	$(document).keydown(function(e){
		console.log(e.keyCode);
		
		if(e.keyCode === 37)
		{
			tetris.moveside(-1);
		}
		else if(e.keyCode === 39)
		{
			tetris.moveside(1);
		}
		else if(e.keyCode === 38)
		{
			tetris.rotate();
		}
		else if(e.keyCode === 40)
		{
			tetris.movedown();
		}
	})
//add gravity in level2
var gravity = setInterval(function(){tetris.movedown();},1000);

})

//draw playfield
tetris.drawplayfield = function(){				
for(var i=0;i<22;i++)
{

$("#playfield").append("<tr class='"+i+"'></tr>");

	for(var j=0;j<10;j++)
	{
	$("."+i).append("<td id='"+j+"'></td>");
	}
}
}

//isflagset
tetris.isFlagSet = function(){
	for(var i=0;i<this.currcoord.length;i++)
	{
		var myrow = this.currcoord[i].row;
		var mycol = this.currcoord[i].col;
		var $mycoord = $('.'+myrow).find('#'+mycol);
			if(($mycoord.length === 0)||($mycoord.attr('bgColor')==='BLACK'))
			{
				return true;
			}
	}
	return false;
}

//define shape
tetris.shapetocoord = function(shape,origin){
	
	// L rotations
	if(shape === 'L'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row-1,col:origin.col},
		{row:origin.row+1,col:origin.col},
		{row:origin.row+1,col:origin.col+1}];
	}
	if(shape === 'L90'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row,col:origin.col-1},
		{row:origin.row+1,col:origin.col-1}];
	}
	
	if(shape === 'L270'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row,col:origin.col-1},
		{row:origin.row-1,col:origin.col+1}];
	}
	
	if(shape === 'L180'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row-1,col:origin.col},
		{row:origin.row-1,col:origin.col-1},
		{row:origin.row+1,col:origin.col}];
	}
	
	//J rotations
	else if(shape === 'J'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row-1,col:origin.col},
		{row:origin.row+1,col:origin.col},
		{row:origin.row+1,col:origin.col-1}];
	}
	
	else if(shape === 'J90'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row,col:origin.col-1},
		{row:origin.row-1,col:origin.col-1}];
	}
	
	else if(shape === 'J180'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row-1,col:origin.col},
		{row:origin.row+1,col:origin.col},
		{row:origin.row-1,col:origin.col+1}];
	}
	
	else if(shape === 'J270'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row,col:origin.col-1},
		{row:origin.row+1,col:origin.col+1}];
	}
	
	//rotate I
	else if(shape === 'I'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row,col:origin.col-1},
		{row:origin.row,col:origin.col+2}];
	}
	else if(shape === 'I90'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row+1,col:origin.col},
		{row:origin.row-2,col:origin.col},
		{row:origin.row-1,col:origin.col}];
	}
	
	//rotate O
	else if(shape === 'O'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row+1,col:origin.col},
		{row:origin.row+1,col:origin.col+1}];
	}
	
	//rotate S
	else if(shape === 'S'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row+1,col:origin.col},
		{row:origin.row+1,col:origin.col-1}];
	}
	else if(shape === 'S90'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col-1},
		{row:origin.row+1,col:origin.col},
		{row:origin.row-1,col:origin.col-1}];
	}
	
	//rotate T
	else if(shape === 'T'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row,col:origin.col-1},
		{row:origin.row-1,col:origin.col}];
	}
	else if(shape === 'T90'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row+1,col:origin.col},
		{row:origin.row-1,col:origin.col},
		{row:origin.row,col:origin.col+1}];
	}
	else if(shape === 'T180'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col+1},
		{row:origin.row,col:origin.col-1},
		{row:origin.row+1,col:origin.col}];
	}
	else if(shape === 'T270'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row+1,col:origin.col},
		{row:origin.row-1,col:origin.col},
		{row:origin.row,col:origin.col-1}];
	}
	
	//rotate Z
	else if(shape === 'Z'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col-1},
		{row:origin.row+1,col:origin.col},
		{row:origin.row+1,col:origin.col+1}];
	}
	else if(shape === 'Z90'){
		return [{row:origin.row,col:origin.col},
		{row:origin.row,col:origin.col-1},
		{row:origin.row+1,col:origin.col-1},
		{row:origin.row-1,col:origin.col}];
	}
}

/*tetris.origin = {row:1,col:4};
tetris.currshape = 'T';
tetris.currcoord = tetris.shapetocoord(tetris.currshape,tetris.origin);
*/

//fill cells
tetris.fillcells = function(coord,fillcolor){				

for(var i=0;i<coord.length;i++)
{
var myrow = coord[i].row;
var mycol = coord[i].col;
var mycoord = $('.'+myrow).find('#'+mycol);

mycoord.attr('bgcolor',fillcolor); 
}
}

//moveside
tetris.moveside = function(direction){
	
	this.origin.col = this.origin.col + direction;
	this.fillcells(this.currcoord,'white');
	var flag =0;
	
		for(var i=0;i<this.currcoord.length;i++)
		{
		this.currcoord[i].col = (this.currcoord[i].col) + direction;
		var myrow = this.currcoord[i].row; 
		var mycol = this.currcoord[i].col;
		var mycoord = $('.'+myrow).find('#'+mycol);
			
			if(this.currcoord[i].col<0)
			{
				flag =1;				
			}
			else if(this.currcoord[i].col>9)
			{
				flag=1;
			}
		}
			if((this.isFlagSet())&&(flag!=1))
			{
				for(var i=0;i<this.currcoord.length;i++)
				{
					this.origin.col = this.origin.col - direction;
					this.currcoord[i].col = (this.currcoord[i].col) - direction;
					var myrow = this.currcoord[i].row; 
					var mycol = this.currcoord[i].col;
					var mycoord = $('.'+myrow).find('#'+mycol);
					mycoord.attr('bgColor','black');
				}
			}
			
	if(flag===1)
	{
		this.moveside(-direction);
	}
	this.fillcells(this.currcoord,'black');	
}
//create new shape
tetris.createnewshape = function(){
	var random = Math.floor(Math.random()*7);
	var shapearray = ['L','J','I','O','S','Z','T'];
	this.currshape = shapearray[random];
	this.origin = {row:1,col:4};
	this.currcoord = this.shapetocoord(this.currshape,this.origin);
	this.fillcells(this.currcoord,'black');
}


//movedown
tetris.movedown = function(){
	score = score+1;
var flag =0;
this.fillcells(this.currcoord,'white');

this.origin.row++;


	for(var i=0;i<this.currcoord.length;i++)
	{
	this.currcoord[i].row++;
		if(this.currcoord[i].row>21)
		{
			flag=1;
		}	
	}
	
	if(this.isFlagSet())
	{
	this.origin.row--;
		for(var i=0;i<this.currcoord.length;i++)
		{
		this.currcoord[i].row--;
		}	
		flag=1;
	}
	this.fillcells(this.currcoord,'black');
	
	if(flag===1)
	{
		this.fillcells(this.currcoord,'BLACK');
		this.emptyFullRow();
		this.createnewshape();
	}
	
	if(flag===1)
	{
		if(this.gameOver())
		{
			$('#playfield').remove();
			var person = prompt("Please enter your name");
			document.getElementById("scor").innerHTML =
			"Hello " + person + "! Your Score is " + score;
		}
	}
}

//empty full row
tetris.emptyFullRow = function(){
	var drop = 0;
	for(var i=21;i>0;i--)
	{
		var rofull = true;
		for(var j=0;j<10;j++)
		{
			var mycoord = $('.'+i).find('#'+j);
			if(mycoord.attr('bgColor')!='BLACK')
			{
				rofull = false;
			}
			
			if(drop>0)
			{
			var tmp = $('.'+(drop+i)).find('#'+j);
			tmp.attr('bgColor',mycoord.attr('bgColor'));
			}
		
		}
	
		if(rofull)
		{
			drop++;
			score = score+15;
		}
		
	}
} 

//gameOver
tetris.gameOver = function(){

		for(var j=0;j<10;j++)
		{
			var mycoord = $('.'+0).find('#'+j);
			if(mycoord.attr('bgColor')==='BLACK')
			{
				return true;
			}		
		}
		return false;
} 

//rotate
tetris.rotate = function(){
	this.fillcells(this.currcoord,'white');
	var lastshape = this.currshape;
	
	if(this.currshape === 'L')
	{
		this.currshape = 'L90';
	}
	else if(this.currshape === 'L90')
	{
		this.currshape = 'L180';
	}
	else if(this.currshape === 'L180')
	{
		this.currshape = 'L270';
	}
	else if(this.currshape === 'L270')
	{
		this.currshape = 'L';
	}
	else if(this.currshape === 'J')
	{
		this.currshape = 'J90';
	}
	else if(this.currshape === 'J90')
	{
		this.currshape = 'J180';
	}
	else if(this.currshape === 'J180')
	{
		this.currshape = 'J270';
	}
	else if(this.currshape === 'J270')
	{
		this.currshape = 'J';
	}
	else if(this.currshape === 'I')
	{
		this.currshape = 'I90';
	}
	else if(this.currshape === 'I90')
	{
		this.currshape = 'I';
	}
	else if(this.currshape === 'O')
	{
		this.currshape = 'O';
	}
	else if(this.currshape === 'S')
	{
		this.currshape = 'S90';
	}
	else if(this.currshape === 'S90')
	{
		this.currshape = 'S';
	}
	else if(this.currshape === 'Z')
	{
		this.currshape = 'Z90';
	}
	else if(this.currshape === 'Z90')
	{
		this.currshape = 'Z';
	}
	else if(this.currshape === 'T')
	{
		this.currshape = 'T90';
	}
	else if(this.currshape === 'T90')
	{
		this.currshape = 'T180';
	}
	else if(this.currshape === 'T180')
	{
		this.currshape = 'T270';
	}
	else if(this.currshape === 'T270')
	{
		this.currshape = 'T';
	}
	
	this.currcoord = this.shapetocoord(this.currshape,this.origin);
	/*var flag = 0;
	for(var i=0;i<this.currcoord.length;i++)
	{
		if((this.currcoord[i].col<0)||(this.currcoord[i].row>21))
		{
			flag =1;	
		}
		else if((this.currcoord[i].col>9)||(this.currcoord[i].row>21))
		{
			flag=1;
		}
	}
	*/
	//if(flag===1)
	if(this.isFlagSet())
	{
		this.currshape = lastshape;
	}
	
	this.currcoord = this.shapetocoord(this.currshape,this.origin);
	this.fillcells(this.currcoord,'black');
}


