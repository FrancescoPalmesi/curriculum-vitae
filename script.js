function setListener(element) {
	element.addEventListener('click', function (event) {
		scroll(element);

		event.preventDefault();
	});
}

function scroll(element) {
	var to = document.getElementById(element.getAttribute("href").substring(1, element.getAttribute("href").length)).offsetTop;
	var duration = 400;

	doScroll(element, to, duration);
}

function doScroll(element, to, duration) {
	console.log("HEY");
	if (duration <= 0) return;
	var difference = to - document.body.scrollTop;
	var perTick = difference / duration * 10;

	setTimeout(function() {
		document.body.scrollTop = document.body.scrollTop + perTick;
		if (document.body.scrollTop == to) return;
		doScroll(element, to, duration - 10);
	}, 10);
}

window.onload = function () {
	var elems = document.getElementsByTagName("a");
	for (var i = 0; i < elems.length; i++) {
		if (elems[i].hasAttribute("anchor")) {
			if (elems[i].getAttribute("anchor")) setListener(elems[i]);
		}
	}

	var lazyboys = document.getElementsByClassName("lazyloaded");
	for (var i = 0; i < lazyboys.length; i++) { 
		lazyboys[i].setAttribute('src', lazyboys[i].getAttribute('data-src'));
		lazyboys[i].onload = function() {
			lazyboys[i].removeAttribute('data-src');
		};
	};
};  