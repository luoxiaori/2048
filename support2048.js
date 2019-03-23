//底层支撑逻辑

//获取屏幕宽度并根据此值设置页面显示的相对尺寸
documentWidth=window.screen.availWidth;//当前设备屏幕可用宽度
gridContainerWidth=0.92*documentWidth;//大格
cellSideLength=0.18*documentWidth;//小方格
cellSpace=0.04*documentWidth;//间距
//格子位置绝对定位
function getPosTop(i,j){
	// return 20+i*120;
	//手机
	return cellSpace+i*(cellSpace+cellSideLength);

}
function getPosLeft(i,j){
	// return 20+j*120;
	//手机
	return cellSpace+j*(cellSpace+cellSideLength);
}
//不同数字背景颜色区分
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da";break;
		case 4:return "#ede0c8";break;
		case 8:return "#f2b179";break;
		case 16:return "#f59563";break;
		case 32:return "#f67c5f";break;
		case 64:return "#65e3b";break;
		case 128:return "#edcf72";break;
		case 256:return "#edcc61";break;
		case 512:return "#9c0";break;
		case 1024:return "#33b5e5";break;
		case 2048:return "#09c";break;
		case 4096:return "#a6c";break;
		case 8192:return "#93c";break;
	}
	return "black";
}

//数字颜色
function getNumberColor(number){
	if(number<=4){
		return "#776e65";
	}
	return "white";
}
//private
// function getNumberText( number ){
//     switch( number ){
//         case 2:return "小白";break;
//         case 4:return "实习生";break;
//         case 8:return "程序猿";break;
//         case 16:return "项目经理";break;
//         case 32:return "架构师";break;
//         case 64:return "技术经理";break;
//         case 128:return "高级经理";break;
//         case 256:return "技术总监";break;
//         case 512:return "副总裁";break;
//         case 1024:return "CTO";break;
//         case 2048:return "总裁";break;
//         case 4096:return "#a6c";break;
//         case 8192:return "#93c";break;
//     }

//     return "black";
// }

//确认是否有空格
function nospace(board){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]==0){
				return false;
			}
		}
	}
	return true;
}

function canMoveLeft(board){//判断能否左移
	for(var i=0;i<4;i++){
		for(var j=1;j<4;j++){//第一列没得左移
			if(board[i][j]!=0){
				if(board[i][j-1]==0||board[i][j-1]==board[i][j]){//有两种情况可以左移1、左边为空2、与左边值一样
					return true;
				}
			}
		}
	}
	return false;
}


function canMoveRight(board){//判断能否右移
	for(var i=0;i<4;i++){
		for(var j=0;j<3;j++){//第4列没得右移
			if(board[i][j]!=0){
				if(board[i][j+1]==0||board[i][j+1]==board[i][j]){//有两种情况可以右移1、右边为空2、与右边值一样
					return true;
				}
			}
		}
	}
	return false;
}


function canMoveUp(board){//判断能否上移
	for(var j=0;j<4;j++){
		for(var i=1;i<4;i++){//第一行没得上移
			if(board[i][j]!=0){
				if(board[i-1][j]==0||board[i-1][j]==board[i][j]){//有两种情况可以上移1、上边为空2、与上边值一样
					return true;
				}
			}
		}
	}
	return false;
}



function canMoveDown(board){//判断能否下移
	for(var j=0;j<4;j++){
		for(var i=0;i<3;i++){
			if(board[i][j]!=0){
				if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}


function noBlockHorizontal(row,col1,col2,board){//中间无障碍
	for(var i=col1+1;i<col2;i++){
		if (board[row][i]!=0) {
			return false;
		}
	}
	return true;
}


function noBlockVertical(col,raw1,raw2,board){
	for(var i=raw1+1;i<raw2;i++){
		if (board[i][col]!=0) {
			return false;
		}
	}
	return true;
}



function nomove(board){
	if(canMoveLeft(board)||canMoveRight(board)||canMoveUp(board)||canMoveDown(board)){
		return false;
	}
	return true;
}