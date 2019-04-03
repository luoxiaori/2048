//游戏主逻辑

var board = new Array();
var score=0;
var hasConflicted=new Array();

var startx=0;
var starty=0;
var endx=0;
var endy=0;


$(document).ready(function(){//DOM初始化后触发
	prepareForMobile();//手机

	newgame();

});

function prepareForMobile(){//手机

	if(documentWidth>500){//适配大屏
		gridContainerWidth=500;
		cellSpace=20;
		cellSideLength=100;
	}

	$('#grid-container').css('width',gridContainerWidth - 2*cellSpace);//大格
	$('#grid-container').css('height',gridContainerWidth - 2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.02*cellSideLength);
}

function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成数字2或者4
	generateOneNumber();
	generateOneNumber();
}

function init(){//初始化棋盘格
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			var gridCell = $("#grid-cell-"+i+"-"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}

	for(var i=0;i<4;i++){//将数组borad初始化成二维
		board[i]=new Array();
		hasConflicted[i]=new Array();
		for(var j=0;j<4;j++){
			board[i][j]=0;

			hasConflicted[i][j]=false;
		}
	}
	
	updateBoardView();

	score=0;
}

//根据board值对前端number-cell标签进行规范操作
function updateBoardView(){

	$(".number-cell").remove();
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);

			if(board[i][j]==0){
				theNumberCell.css('height','0px');
				theNumberCell.css('width','0px');
				// theNumberCell.css('top',getPosTop(i,j)+50);
				// theNumberCell.css('left',getPosLeft(i,j)+50);

				//手机
				theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
				theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);

				//private   theNumberCell.css('font-size',"20px" );

			}else{
				// theNumberCell.css('height','100px');
				// theNumberCell.css('width','100px');

				//手机
				theNumberCell.css('height',cellSideLength);
				theNumberCell.css('width',cellSideLength);

				theNumberCell.css('top',getPosTop(i,j));
				theNumberCell.css('left',getPosLeft(i,j));
				theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
				theNumberCell.css('color',getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);

				//private   theNumberCell.text( getNumberText( board[i][j] ) );
                //private   theNumberCell.css('font-size',"20px" );
			}

			hasConflicted[i][j]=false;
		}
	}
	//手机	
	$('.number-cell').css('line-height',cellSideLength+'px');
	$('.number-cell').css('font-size',0.6*cellSideLength+'px');
	
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]>=1024){
				$('.number-cell').css('line-height',cellSideLength+'px');
				$('.number-cell').css('font-size',0.3*cellSideLength+'px');
			}
		}
	}

}


//在随机两个格子生成数字2或者4,随机位和随机数2、4巧妙使用Math.random()
function generateOneNumber(){
	if(nospace(board)){
		return false;//格子满了
	}
	//随机一个位
	var randx=parseInt(Math.floor(Math.random()*4));//floor出来的还是浮点型
	var randy=parseInt(Math.floor(Math.random()*4));
	// console.log(randx,randy);

	var times=0;
	while (times<50){
		if(board[randx][randy]==0){
			break;
		}
		 randx=parseInt(Math.floor(Math.random()*4));
		 randy=parseInt(Math.floor(Math.random()*4));

		 times ++;
	}
	if(times==50){
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(board[i][j]==0){
					randx=i;
					randy=j;
				}
			}
		}
	}

	// while(true){
	// 	if(board[randx][randy]==0){
	// 		break;
	// 	}
	// 	 randx=parseInt(Math.floor(Math.random()*4));
	// 	 randy=parseInt(Math.floor(Math.random()*4));
	// 	 console.log(randx,randy);
	// }

	//随机一个数字
	var randNumber=Math.random()<0.5?2:4;
	// console.log(randNumber);

	//在随机位显示随机数,加动画
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);

	return true;

}

$(document).keydown(function(event){

	switch(event.keyCode){
		case 37://left
			event.preventDefault();//取消事件：网页版放大后上下会拖动滚动条，所有按键都无效
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 38://up
			event.preventDefault();//取消事件：网页版放大后上下会拖动滚动条，所有按键都无效
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 39://right
			event.preventDefault();//取消事件：网页版放大后上下会拖动滚动条，所有按键都无效
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		case 40://down
			event.preventDefault();//取消事件：网页版放大后上下会拖动滚动条，所有按键都无效
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
			break;
		default://default
			break;
	}
});


document.addEventListener('touchstart',function(event){//event.touches
	startx=event.touches[0].pageX;
 	starty=event.touches[0].pageY;
});

document.addEventListener('touchend',function(event){
	endx=event.changedTouches[0].pageX;
 	endy=event.changedTouches[0].pageY;

 	var deltax=endx-startx;
 	var deltay=endy-starty;

 	if(Math.abs(deltax)<0.05*documentWidth && Math.abs(deltay)<0.05*documentWidth){
 		return;//不进行后面
 	}
 	// console.log(deltax,deltay,starty,startx,endy,endx)

 	if(Math.abs(deltax)>=Math.abs(deltay)){//横坐标比纵坐标变化大
 	 	if(deltax>0){//向右
 	 		//moveright
 	 		if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
 	 	}
 	 	else{
 	 		//moveleft
 	 		if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
 		}
 	}
 	else{
 	 	if(deltay>0){//向下为正
 	 		//movedown
 	 		if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
 		}
 	 	else{
 	 		//moveup
 	 		if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isgameover()",300);
			}
 		}
 	}
});


function isgameover(){
	if(nospace(board)&&nomove(board)){
		gameover();
	}
}


function gameover(){
	alert('click "help!!!" to survive');
}


function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}

	//moveLeft
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){
			if(board[i][j] !=0 ){//有值才可以移动

				for(var k=0;k<j;k++){
					if(board[i][k]==0 && noBlockHorizontal(i,k,j,board)){//第一种情况左为空且中间无障碍
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;

						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){//第二种情况左等值且中间无障碍
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						
						//add score
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);//对board更改后进行样式刷新
	return true;
}


function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}

	//moveRight
	for(var i=0;i<4;i++){
		for(var j=2;j>=0;j--){
			if(board[i][j] !=0 ){//有值才可以移动

				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){//第一种情况左为空且中间无障碍
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][j];
						board[i][j]=0;

						continue;
					}
					else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board)&& !hasConflicted[i][k]){//第二种情况左等值且中间无障碍
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k]=true;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);//对board更改后进行样式刷新
	return true;
}


function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}

	//moveUp
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){
			if(board[i][j] !=0 ){//有值才可以移动

				for(var k=0;k<i;k++){
					if(board[k][j]==0 && noBlockVertical(j,k,i,board)){//第一种情况左为空且中间无障碍
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;

						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j]){//第二种情况左等值且中间无障碍
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						
						//add score
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);//对board更改后进行样式刷新
	return true;
}


function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}

	//moveDown
	for(var j=0;j<4;j++){
		for(var i=2;i>=0;i--){
			if(board[i][j] !=0 ){//有值才可以移动

				for(var k=3;k>i;k--){
					if(board[k][j]==0 && noBlockVertical(j,i,k,board)){
						//move
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[i][j];
						board[i][j]=0;

						continue;
					}
					else if(board[k][j]==board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;
						//add score
						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j]=true;
						continue;
					}
				}
			}
		}
	}

	setTimeout("updateBoardView()",200);//对board更改后进行样式刷新
	return true;
}
//help1.1
// function help(){
// 	// if(nospace(board)){
// 	// 	return false;//格子满了
// 	// }
// 	//随机一个位
// 	var randx=parseInt(Math.floor(Math.random()*4));//floor出来的还是浮点型
// 	var randy=parseInt(Math.floor(Math.random()*4));
// 	// console.log(randx,randy);

// 	var times=0;
// 	while (times<50){
// 		if(board[randx][randy]==0){
// 			break;
// 		}
// 		 randx=parseInt(Math.floor(Math.random()*4));
// 		 randy=parseInt(Math.floor(Math.random()*4));

// 		 times ++;
// 	}
// 	if(times==50){
// 		for(var i=0;i<4;i++){
// 			for(var j=0;j<4;j++){
// 				if(board[i][j]==0){
// 					randx=i;
// 					randy=j;
// 				}
// 			}
// 		}
// 	}

// 	board[randx][randy]=0;
// 	setTimeout("updateBoardView()",200);

// 	return true;

// }

//help1.2
function help(){
	if(!nospace(board)){
		alert('还有空位，别偷懒啊老弟！！！');//格子没满
	}else{
		//随机一个位
		var randx=parseInt(Math.floor(Math.random()*4));//floor出来的还是浮点型
		var randy=parseInt(Math.floor(Math.random()*4));
		// console.log(randx,randy);
		// var times=0;
		while (true){
		// while (true){
			if(board[randx][randy]<maximum(board)){//最大值的格子不赋空
				// console.log(largestOfFour(board));
				break;
			}
			 randx=parseInt(Math.floor(Math.random()*4));
			 randy=parseInt(Math.floor(Math.random()*4));

			 // times ++;
		}		


		function maximum(board){ 
			var max=board[0][0];
			for (var i = 0; i < board.length; i++) {
			    for (var j = 0; j< board[i].length; j++) {
			        if (max<board[i][j]) {
			            max=board[i][j];
			 
			        }      
			    }
			}
			console.log(max);
			return(max);	 
		}

		

		board[randx][randy]=0;
		setTimeout("updateBoardView()",200);

		return true;
	}
}