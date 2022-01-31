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

function copy (text)
{
	var t = document.createElement("textarea");
	document.body.appendChild(t);
	t.value = text;
	t.select();
	document.execCommand('copy');
	document.body.removeChild(t);
}
