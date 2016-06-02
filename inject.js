(function() {
	if(document.querySelector('#pagination') == null && 
	  (window.location.href.split('?').length > 1 || window.location.href.match(/commits/) != null)){
		var xhr = new XMLHttpRequest();

		xhr.onreadystatechange= function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				commitLength = xhr.responseText.replace(/ |\n/g,'').match(/class="numtext-emphasized">([0-9]+(,){0,1}([0-9]+){0,})</)[1].replace(',','')
				
					var select = document.createElement('select')
					select.setAttribute('id','pagination')

					var pageNum = Math.ceil(commitLength / 35),i = 1

					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0,
						    false, false, false, false, 0, null);

					var cb = document.querySelector('.pagination a');

					while(i <= pageNum){
						var option = document.createElement('option');
						option.innerText = i
						select.appendChild(option)
						i++
					}
					
					document.querySelector('.branch-select-menu').appendChild(select)

					var totalPage = document.createElement('span')
					totalPage.setAttribute('id','totalpage')
					totalPage.setAttribute('style','left:0')

					totalPage.innerText = ' total page : ' + pageNum

					document.querySelector('.branch-select-menu').appendChild(totalPage)
					
					var href = window.location.href.split('?')

					if(href.length > 1)
						select.value = href[1].split('=')[1]

					select.addEventListener('change', function(){
						cb.href = window.location.href.split('?')[0] + '?page=' + select.value
						cb.dispatchEvent(evt);
					});

			}
		}
		xhr.open("GET", window.location.href.replace(/commits+\/(.*?)+/,''), true)
		xhr.send()
	}
})()
