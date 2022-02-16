function AddDetail ()
{
	var title = document.getElementById("title");
	title.className += "hasDetail";

	title.addEventListener("click", function () {
		location.href = "Detail";
	});
}

function AddTitle ()
{
	var link = document.location.href.split('/');
	var directory = link[link.length - 2];
	var title = document.createElement("h1");
	document.body.appendChild(title);
	title.id = "title";

	if (directory.includes("%23"))
	{
		directory = directory.replace("%23", "#");
	}

	title.innerText =  SplitCamelCase(directory);
}

function Copy (text)
{
	var t = document.createElement("textarea");
	document.body.appendChild(t);
	t.value = text;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
}

function SplitCamelCase (value)
{
	value = value.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
	value = value.replace(/([A-Z])([A-Z])([a-z])/g, '$1 $2$3');
	value = value.replace(/(\+)([A-Z])/g, '$1 $2');
	return value;
}
