setInterval(function(){
	if(document.querySelectorAll('#pagination').length == 2){
		document.querySelector('#pagination').remove()
		document.querySelector('#totalpage').remove()
	}
})
