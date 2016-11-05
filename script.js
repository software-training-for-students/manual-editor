var button = document.getElementById("greenbutton");
var stylebtn = document.getElementById("stylebutton");
/*
var boldbtn = document.getElementById("boldbutton");
var italicbtn = document.getElementById("italicbutton");
var highlightbtn = document.getElementById("highlightbutton");
var typebtn = document.getElementById("typebutton");
*/
var codebtn = document.getElementById("codebutton");
var pbtn = document.getElementById("paragraphbutton");
var hbtn = document.getElementById("headlinebutton");
/*
var h1btn = document.getElementById("h1button");
var h2btn = document.getElementById("h2button");
var h3btn = document.getElementById("h3button");
*/
var listbtn = document.getElementById("listbutton");
/*
var ulbtn = document.getElementById("ulbutton");
var olbtn = document.getElementById("olbutton");
var ilbtn = document.getElementById("ilbutton");
*/
var imgbtn = document.getElementById("imagebutton");
var sbsimgbtn = document.getElementById("sidebysideimagebutton");
var toolboxbtn = document.getElementById("toolboxbutton");
var tablebtn = document.getElementById("tablebutton");
var sidebarnotebtn = document.getElementById("sidebarnotebutton");
var keyboardscbtn = document.getElementById("keyboardshortcutbutton");
var savebtn = document.getElementById("savebutton");
var loadbtn = document.getElementById("loadbutton");
var loadfile = document.getElementById("loadfile");

button.addEventListener("click", makegreen);
stylebtn.addEventListener("click", makestyle);
/*
boldbtn.addEventListener("click", makebold);
italicbtn.addEventListener("click", makeitalic);
highlightbtn.addEventListener("click", makehighlight);
typebtn.addEventListener("click", maketype);
*/
codebtn.addEventListener("click", makecodeblock);
pbtn.addEventListener("click", makep);
hbtn.addEventListener("click", makeh);
/*
h1btn.addEventListener("click", makeh1);
h2btn.addEventListener("click", makeh2);
h3btn.addEventListener("click", makeh3);
*/
listbtn.addEventListener("click", makelist);
/*
ulbtn.addEventListener("click", makeul);
olbtn.addEventListener("click", makeol);
ilbtn.addEventListener("click", makeil);
*/
imgbtn.addEventListener("click", makeimg);
sbsimgbtn.addEventListener("click", makesidebysideimg);
toolboxbtn.addEventListener("click", maketoolbox);
tablebtn.addEventListener("click", maketable);
sidebarnotebtn.addEventListener("click", makesidebarnote);
keyboardscbtn.addEventListener("click", makekeyboardshortcut);
savebtn.addEventListener("click", save);
loadbtn.addEventListener("click", load);

function load() {
	var html = document.createElement("HTML");
	var loaded = document.getElementById("loaded");
	var editor = document.getElementById("editor");
	var file = loadfile.files[0];
	var fr = new FileReader();
	fr.onload = function() {
		var text = fr.result;
		console.log(text);
		html.innerHTML = text;
		loaded.appendChild(html);
		var loadedbody = loaded.children[0].children[1];
		editor.innerHTML = loadedbody.innerHTML;
		loaded.innerHTML = "";
	}
	fr.readAsText(file);
}

function save() {
	var editor = document.getElementById("editor");
	//var filename = document.getElementsByTagName("H1")[0].innerHTML;
	var head = document.getElementsByTagName("HEAD")[0]
	var newhead = document.createElement("HEAD");
	var body = document.createElement("BODY");
	var html = document.createElement("HTML");
	var date = document.getElementById("current-date");
	var about = document.getElementById("about-page");
	var outline = document.getElementById("outline");
	date.innerHTML = "";
	about.innerHTML = "";
	outline.innerHTML = "";
	body.innerHTML = editor.innerHTML;
	for (var i in head.children) {
		child = head.children[i];
		console.log(child);
		if (child.nodeType == 1)
			newhead.appendChild(child.cloneNode(true));
	}
	html.appendChild(newhead);
	html.appendChild(body);
	//filename = filename.replace(/\s+/g, '');
	//filename += ".html";
	var blob = new Blob(["<!DOCTYPE html>", html.innerHTML], {type: "text/plain;charset=utf-8"});
	//saveAs(blob, filename);
	saveAs(blob, "manual.html");
}

function maketable() {
	var editor = document.getElementById("editor");
	var rows = parseInt(document.getElementById("rows").value);
	var cols = parseInt(document.getElementById("cols").value);
	var table = document.createElement("table");
	console.log(rows);
	console.log(cols);
	for (i=0; i<rows; ++i) {
		var row = document.createElement("tr");
		for (j=0; j<cols; ++j) {
			var col;
			if (i == 0)
				col = document.createElement("th");
			else
				col = document.createElement("td");
			col.textContent = "data";
			row.appendChild(col);
		}
		table.appendChild(row);
	}
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(table, element);
}

function surroundSelection(element) {
	if (window.getSelection) {
		var sel = window.getSelection();
		if (sel.rangeCount) {
			var range = sel.getRangeAt(0).cloneRange();
			range.surroundContents(element);
			sel.removeAllRanges();
			sel.addRange(range);
		}
	}
}

function makestyle() {
	var styleselect = document.getElementById("styleselect");
	var style;
	if (styleselect.value == "bold")
		style = document.createElement("b");
	else if (styleselect.value == "italic")
		style = document.createElement("em");
	else if (styleselect.value == "highlight") {
		style = document.createElement("span");
		style.className += "highlight";
	}
	else if (styleselect.value == "type") {
		style = document.createElement("span");
		style.className += "type-text";
	}

	if (style)
		surroundSelection(style);
}

function makesidebarnote() {
	var imgname = window.prompt("Enter the image source relative to the manual.html file. Example: images/forms-2.png");
	if (imgname == null)
		return;
	var editor = document.getElementById("editor");
	var div = document.createElement("div");
	div.className += "sidebar-note";
	var h2 = document.createElement("h2");
	h2.textContent = "Title of Note";
	var p = document.createElement("p");
	p.textContent = "Note text goes here";
	var img = document.createElement("img");
	img.src = imgname;
	div.appendChild(h2);
	div.appendChild(p);
	div.appendChild(img);
	var sel = window.getSelection();
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(div, element);
}

function makekeyboardshortcut() {
	var imgname = window.prompt("Enter the images sources relative to the manual.html file, separated by only commas. Example: keyboard-icons/icon-control,keyboard-icons/icon-alt");
	if (imgname == null)
		return;
	var imgnames = imgname.split(",");

	var editor = document.getElementById("editor");
	var div = document.createElement("div");
	div.className += "keyboard-shortcut";
	var h2 = document.createElement("h2");
	h2.textContent = "Title of shortcut";
	div.appendChild(h2);
	var p = document.createElement("p");
	p.textContent = "Description of shortcut";
	div.appendChild(p);
	for (i in imgnames) {
		var imgname = imgnames[i];
		var img = document.createElement("img");
		img.src = imgname;
		div.appendChild(img);
	}
	var sel = window.getSelection();
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(div, element);
}

function maketoolbox() {
	var imgname = window.prompt("Enter the images sources relative to the manual.html file, separated by only commas. Example: images/tool1.png,images/tool2.png");
	if (imgname == null)
		return;
	var imgnames = imgname.split(",");

	var editor = document.getElementById("editor");
	var tbdiv = document.createElement("div");
	tbdiv.className += "toolbox";
	for (i in imgnames) {
		var imgname = imgnames[i];
		var innerdiv = document.createElement("div");
		var img = document.createElement("img");
		img.src = imgname;
		innerdiv.appendChild(img);
		var p = document.createElement("p");
		var b = document.createElement("b");
		b.textContent = "Tool Name: ";
		p.appendChild(b);
		var t = document.createTextNode(" A brief description of the tool.");
		p.appendChild(t);
		innerdiv.appendChild(p);
		tbdiv.appendChild(innerdiv);
	}
	var sel = window.getSelection();
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(tbdiv, element);
}

function makesidebysideimg() {
	var imgname = window.prompt("Enter the images sources relative to the manual.html file, separated by only commas. Example: images/forms-2.png,images/forms-3.png");
	if (imgname == null)
		return;
	var imgnames = imgname.split(",");

	var editor = document.getElementById("editor");
	var div = document.createElement("div");
	var imgsel = document.getElementById("sidebysideimageselect");
	var bordersel = document.getElementById("sidebysideborderselect");
	div.className += imgsel.value;
	if (bordersel.value != "")
		div.className += " " + bordersel.value;
	for (i in imgnames) {
		var imgname = imgnames[i];
		var img = document.createElement("img");
		img.src = imgname;
		div.appendChild(img);
	}
	var p = document.createElement("p");
	var sel = window.getSelection();
	//var text = sel.toString();
	//var text = sel.anchorNode.textContent;
	p.textContent = "optional caption goes here";
	div.appendChild(p);
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(div, element);
}

function makeimg() {
	var imgname = window.prompt("Enter the image source relative to the manual.html file. Example: images/forms-2.png");
	if (imgname == null)
		return;
	var editor = document.getElementById("editor");
	var div = document.createElement("div");
	var imgsel = document.getElementById("imageselect");
	var bordersel = document.getElementById("borderselect");
	var img = document.createElement("img");
	var sel = window.getSelection();
	if (imgsel.value != "sidebar-icon") {
		div.className += imgsel.value;
		if (bordersel.value != "")
			div.className += " " + bordersel.value;
		var p = document.createElement("p");
		//var text = sel.toString();
		//var text = sel.anchorNode.textContent;
		p.textContent = "optional caption goes here";
		img.src = imgname;
		div.appendChild(img);
		div.appendChild(p);
		var anchor = sel.anchorNode;
		var element = anchor.parentNode;
		var parent = element.parentNode;
		while (parent != editor) {
			element = parent;
			parent = element.parentNode;
		}
		parent.replaceChild(div, element);
	}
	else if (imgsel.value == "sidebar-icon") {
		img.src = imgname;
		img.className += imgsel.value;
		var anchor = sel.anchorNode;
		var element = anchor.parentNode;
		var parent = element.parentNode;
		while (parent != editor) {
			element = parent;
			parent = element.parentNode;
		}
		parent.replaceChild(img, element);
	}
}

/*
function makeimg() {
	var output = document.getElementById("output");
	var file = loadfile.files[0];
	var fr = new FileReader();
	fr.onload = function() {
		var dataURL = fr.result;
		//console.log(dataURL);
		output.src = dataURL;
		//html.innerHTML = text;
		//loaded.appendChild(html);
		//var loadedbody = loaded.children[0].children[1];
		//editor.innerHTML = loadedbody.innerHTML;
		//loaded.innerHTML = "";
	}
	fr.readAsDataURL(file);
}
*/

function makelist() {
	var editor = document.getElementById("editor");
	var listsel = document.getElementById("listselect");
	var list;
	if (listsel.value == "ul")
		list = document.createElement("ul");
	else if (listsel.value == "ol" || listsel.value == "il")
		list = document.createElement("ol");
	if (listsel.value == "il")
		list.className += "instruction-list";
	var li = document.createElement("li");
	var p = document.createElement("p");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	p.textContent = text;
	li.appendChild(p);
	list.appendChild(li);//
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor && parent.nodeName != "OL" && parent.nodeName != "UL") {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(list, element);//
}

/*
function makeil() {
	var editor = document.getElementById("editor");
	var il = document.createElement("ol");
	il.className += "instruction-list";
	var li = document.createElement("li");
	var p = document.createElement("p");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	p.textContent = text;
	li.appendChild(p);
	il.appendChild(li);
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor && parent.nodeName != "OL" && parent.nodeName != "UL") {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(il, element);
}

function makeul() {
	var editor = document.getElementById("editor");
	var ul = document.createElement("ul");
	var li = document.createElement("li");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	li.textContent = text;
	ul.appendChild(li);
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor && parent.nodeName != "OL" && parent.nodeName != "UL") {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(ul, element);
}

function makeol() {
	var editor = document.getElementById("editor");
	var ol = document.createElement("ol");
	var li = document.createElement("li");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	li.textContent = text;
	ol.appendChild(li);
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor && parent.nodeName != "OL" && parent.nodeName != "UL") {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(ol, element);
}
*/

function makeh() {
	var editor = document.getElementById("editor");
	var hsel = document.getElementById("headlineselect");
	var h;
	if (hsel.value == "h1")
		h = document.createElement("h1");
	else if (hsel.value == "h2")
		h = document.createElement("h2");
	else if (hsel.value == "h3")
		h = document.createElement("h3");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	h.textContent = text;
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(h, element);
}

/*
function makeh1() {
	var editor = document.getElementById("editor");
	var h1 = document.createElement("H1");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	h1.textContent = text;
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(h1, element);
}

function makeh2() {
	var editor = document.getElementById("editor");
	var h2 = document.createElement("H2");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	h2.textContent = text;
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(h2, element);
}

function makeh3() {
	var editor = document.getElementById("editor");
	var h3 = document.createElement("H3");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	h3.textContent = text;
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(h3, element);
}
*/

function makep() {
	var editor = document.getElementById("editor");
	var p = document.createElement("P");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	p.textContent = text;
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(p, element);
}

function makecodeblock() {
	var editor = document.getElementById("editor");
	var pre = document.createElement("PRE");
	var code = document.createElement("CODE");
	var sel = window.getSelection();
	//var text = sel.toString();
	var text = sel.anchorNode.textContent;
	code.textContent = text;
	code.className += "hljs";
	pre.appendChild(code);
	var anchor = sel.anchorNode;
	var element = anchor.parentNode;
	var parent = element.parentNode;
	while (parent != editor) {
		element = parent;
		parent = element.parentNode;
	}
	parent.replaceChild(pre, element);
	//sel.deleteFromDocument();
	//range = sel.getRangeAt(0);
	//range.deleteContents();
	//range.remove();
	//range.insertNode(code);
}

function makegreen() {
	var span = document.createElement("SPAN");
	sel = window.getSelection();
	//text = sel.toString();
	var text = sel.anchorNode.textContent;
	span.textContent = text;
	span.className += "green";
	range = sel.getRangeAt(0);
	range.deleteContents();
	range.insertNode(span);
	//node = window.getSelection().anchorNode;
	//node.insertBefore();
	/*
	if (sel.getRangeAt && sel.rangeCount) {
		range = sel.getRangeAt(0);
		data = range.startContainer.data;
		range.deleteContents();
		var el = document.createElement("span");
		el.innerHTML = data;
		var frag = document.createDocumentFragment(), node, lastNode;
		while ( (node = el.firstChild) ) {
			lastNode = frag.appendChild(node);
		}
		var firstNode = frag.firstChild;
		range.insertNode(frag);

		if (lastNode) {
			range = range.cloneRange();
			range.setStartAfter(lastNode);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
		}

		//console.log(window.getSelection().anchorNode.data);
	}
	*/
}
