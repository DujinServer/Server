function SplitCamelCase (value)
{
	return value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function SetTitle ()
{
	var link = document.location.href.split('/');
	var directory = link[link.length - 2];
	var title = document.getElementsByTagName("h2")[0];
	title.innerText =  SplitCamelCase(directory);
}

window.addEventListener("DOMContentLoaded", function () {
	var elements = document.getElementsByClassName("code");

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
