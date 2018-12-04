function add(obj){
	var $div = $("<div>").append($("<input>").attr("type","text")).append($("<button>").addClass("remove").attr("onclick","remove(this)").attr("type","button").text("-")).append($("<button>").addClass("add").attr("onclick","add(this)").attr("type","button").text("+"));
	$("#inputs").append($div);
	$(obj).remove()
}
function remove(obj){
	$(obj).parent().remove();
	if($(obj).next().length>0){
		$("#inputs>div:last").append($("<button>").addClass("add").attr("onclick","add(this)").attr("type","button").text("+"));
	}
}