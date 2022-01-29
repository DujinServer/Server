var copyables;

function SplitCamelCase (value)
{
	value = value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
	value = value.replace(/([A-Z])([A-Z])([a-z])/g, '$1 $2$3');
	return value;
}

function SetTitle ()
{
	var link = document.location.href.split('/');
	var directory = link[link.length - 2];
	var title = document.getElementsByTagName("h2")[0];
	title.innerText =  SplitCamelCase(directory);
}

window.addEventListener("DOMContentLoaded", function () {
	copyables = document.querySelectorAll(".code, .copyable");

	for (var i = 0; i < copyables.length; i++)
	{
		var copyable = copyables[i];
		// copyable.oncontextmenu = event => false;
		copyable.onclick = function () { copy(copyable.innerText) };
	}

	function copy (text)
	{
		alert("copy: " + text);
		return;
		var t = document.createElement("textarea");
		document.body.appendChild(t);
		t.value = text;
		t.select();
		document.execCommand('copy');
		document.body.removeChild(t);
	}

	// function copy (value)
	// {
	// 	alert(value);
	// 	var t = document.createElement("textarea");
	// 	document.body.appendChild(t);
	// 	t.value = value;
	// 	t.select();
	// 	document.execCommand('copy');
	// 	document.body.removeChild(t);
	// }
});
