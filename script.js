window.addEventListener("DOMContentLoaded", function () {
	var elements = document.getElementsByTagName("pre");
	
	for (var element of elements)
	{
		element.oncontextmenu = event => false;
	
		element.addEventListener("mousedown", function (event) {
			if (event.button == 2)
			{
				copy(element.innerText);
			}
		});
	}
	
	function copy (value)
	{
		var t = document.createElement("textarea");
		document.body.appendChild(t);
		t.value = value;
		t.select();
		document.execCommand('copy');
		document.body.removeChild(t);
	}
});