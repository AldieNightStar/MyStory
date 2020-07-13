/*

DOCUMENTATION
==============

print:
	print(text)
	println(text)
	hr()
	img(src, w, h[, action, data])
	imgln(src, w, h[, action, data])

input:
	link(text, action[, data])
	linkln(text, action[, data])
	input(caption, action[, data])
		caption - text for input
		action  - function(text, data)

manipulation:
	clear()
	addScript(src)

sounds:
	music(src) - play music (Looping audio)
	music()    - stop the music
	sound(src) - play sound
	sound()    - stop the sound
*/

let app = undefined;
let mus = new Audio();
let snd = new Audio();

window.addEventListener('load', function() {
	app = document.getElementById('app');
})

function print(txt) {
	let t = document.createElement('span');
	t.innerHTML = txt.replace(/\n/g, '<br>');
	app.appendChild(t);
}

function println(txt) {
	print(txt + "\n");
}

function link(text, action, data) {
	let a = document.createElement('a');
	a.innerHTML = text;
	a.onclick = function() {
		if (typeof action === "function") {
			action(data);
		} else if (typeof action === "string") {
			eval(action); // 'data' will be seen inside of the eval
		}
	}
	a.href = "#"
	app.appendChild(a);
}

function linkln(text, action, data) {
	link(text + "<br>", action, data);
}

function hr() {
	let hr = document.createElement('hr');
	app.appendChild(hr);
}

function repeat(f, count, ms) {
	if (count < 1) {
		return;
	}
	let c = 0;
	let t = setInterval(() => {
		if (c < count) {
			f(c++);
		} else {
			clearTimeout(t);
		}
	}, ms);
	return t;
}

function img(src, w, h, action, data) {
	let img = document.createElement("img");
	img.src = src;
	img.style.width  = w + "px";
	img.style.height = h + "px";
	if (!action) {
		app.appendChild(img);
	} else {
		let br = document.createElement('br');
		let a = document.createElement('a');
		a.href = "#";
		a.onclick = function() {
			action(data);
		}
		a.appendChild(img);
		app.appendChild(a);
		app.appendChild(br);
	}
	return img;
}

function imgln(src, w, h, action, data) {
	img(src, w, h, action, data);
	app.appendChild(document.createElement("br"));
}

function addScript(src) {
	let s = document.createElement('script');
	s.src = src;
	document.body.appendChild(s);
}

function clear() {
	app.innerHTML = "";
}

function input(caption, action, data) {
	let cap       = document.createElement("span");
	cap.innerHTML = caption;
	let inp       = document.createElement("input");
	let btn       = document.createElement("button");
	btn.innerHTML = "OK";
	btn.onclick   = function () {
		action(inp.value, data);
	}
	inp.onkeydown = function (e) {
		if (e.keyCode === 13) {
			e.preventDefault();
			btn.onclick();
		}
	}
	let span      = document.createElement("span");
	span.appendChild(cap);
	span.appendChild(inp);
	span.appendChild(btn);

	app.appendChild(span);
	app.appendChild(document.createElement("br"));
}

function music(src) {
	if (!src || src === ".") {
		mus.pause();
		mus.currentTime = 0;
		return;
	}
	mus.loop = true;
	mus.src  = src;
	mus.currentTime = 0;
	mus.play();
}

function sound(src) {
	if (!src || src === ".") {
		snd.pause();
		snd.currentTime = 0;
		return;
	}
	snd.src = src;
	snd.currentTime = 0;
	snd.play();
}