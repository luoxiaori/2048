//动画效果逻辑

function showNumberWithAnimation(i,j,randNumber){//新增数字的效果
	var numberCell = $("#number-cell-"+i+'-'+j);
	numberCell.css("background-color",getNumberBackgroundColor(randNumber));
	numberCell.css("color",getNumberColor(randNumber));
	numberCell.text(randNumber);
	//private    numberCell.text( getNumberText( randNumber ) );


	numberCell.animate({//jquery动画
		// width:"100px",
		// height:"100px",
		width:cellSideLength,
		height:cellSideLength,
		top:getPosTop(i,j),
		left:getPosLeft(i,j)
	},50);
}

function showMoveAnimation(fromx,fromy,tox,toy){//移动的效果
	var numberCell=$('#number-cell-'+fromx+'-'+fromy);
	numberCell.animate({
		top:getPosTop(tox,toy),
		left:getPosLeft(tox,toy)
	},200);

}

function updateScore(score) {
	$('#score').text(score);
}
