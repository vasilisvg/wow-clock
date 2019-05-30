// Get current date
var now = new Date();
var h = hh = now.getHours();
var m = mm = now.getMinutes();
// if hours and minutes are <10 add a 0 to the front -> 3 becomes 03
if (h < 10) {
	hh = '0' + h;
}
if (m < 10) {
	mm = '0' + m;
}
// write the current time into the h1, for screenreaders
document.querySelector('h1 time').innerHTML = hh + ':' + mm;

// The megafunction, does it all.
function setTime(){
	//update time every time this function is called
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	// This array is for the classNames
	var t = ['zero','one','two','three','four','five','six','seven','eight','nine'];
	// This array is for making the screenrrader version more humane
	var turn = ['turned into', 'slowly, slowly morphed into','changed and is now','mutated and looks like','transforns into, wait for it, there it is,'];
	// Four sections, because time consists of four numbers
	var h1t = document.querySelector('section');
	var h2t = document.querySelector('section:nth-of-type(2)');
	var m1t = document.querySelector('section:nth-of-type(3)');
	var m2t = document.querySelector('section:nth-of-type(4)')
	// Need the current className of each number to see if it changes later on
	var h1b = h1t.className;
	var h2b = h2t.className;
	var m1b = m1t.className;
	var m2b = m2t.className;
	// "Live Region Time", updating string for screen readers. We start with an empty string
	var lrt = '';

	// First number is either 0, 1 or 2
	h1 = "zero";
	h2 = t[h];
	if( h > 9) {
		h1 = "one";
		h2 = t[h - 10]; // find the right className
	}
	if( h > 19 ) {
		h1 = "two";
		h2 = t[h - 20]; // find the right className
	}
	// If the current className is outdated
	if (h1t.className !== h1) {
		h1t.className = h1; // update the className
		// update the Live Region Time string
		lrt += 'a ' + h1b + ' ' + turn[Math.floor(Math.random()*turn.length)] + ' a ' + h1 + ', ';
	}
	// Similar for second number of the hour
	if (h2t.className !== h2) {
		h2t.className = h2;
		// Complicated but needed: "an" not "a" if the number is eight.
		var aoran = aoran1 = 'a ';
		if(h2b == 'eight') {
			aoran = 'an ';
		}
		if(h2 == 'eight') {
			aoran1 = 'an ';
		}
		lrt += aoran + h2b + ' ' + turn[Math.floor(Math.random()*turn.length)] + ' ' + aoran1 + h2 + ', ';
	}

	// For minutes, things are similar to the hours above, read the comments there if needed
	m1 = t[0];
	m2 = t[m];
	if(m > 9) {
		m1 = t[1];
		m2 = t[m - 10];
	}
	if(m > 19) {
		m1 = t[2];
		m2 = t[m - 20];
	}
	if(m > 29) {
		m1 = t[3];
		m2 = t[m - 30];
	}
	if(m > 39) {
		m1 = t[4];
		m2 = t[m - 40];
	}
	if(m > 49) {
		m1 = t[5];
		m2 = t[m - 50];
	}
	
	if (m1t.className !== m1) {
		m1t.className = m1;
		lrt += 'a ' + m1b + ' ' + turn[Math.floor(Math.random()*turn.length)] + ' a ' + m1 + ', ';
	}
	// We need an and here for grammar’s sake …
	if(lrt != '') {
		lrt += 'and '
	}

	if (m2t.className !== m2) {
		m2t.className = m2;
		var aoran = aoran1 = 'a ';
		if(m2b == 'eight') {
			aoran = 'an ';
		}
		if(m2 == 'eight') {
			aoran1 = 'an ';
		}
		lrt += aoran + m2b + ' ' + turn[Math.floor(Math.random()*turn.length)] + ' ' + aoran1 + m2 + ', ';
	}

	// update live region, and do analog time thingy
	// Is only triggered once a minute when lrt is not empty
	if( lrt !== '') {
		// remove all .analog classes if they exist
		var an = document.querySelectorAll('.analog');
		var i = 0;
		while (i < an.length) {
			an[i].classList.remove('analog');
			i++;
		}
		// For variation’s sake, random intros
		var intros = ['Boing, ','Mama mia, ','Wonderful, ','Incredible, ','This very instant, ','Oh wow, ', 'Oooh, look, ','Ha, ','Look at that, ','Bleep, ','Whoah, '];
		var intro = intros[Math.floor(Math.random()*intros.length)];
		if (h < 10) {
			h = '0' + h;
		}
		if (m < 10) {
			m = '0' + m;
		}
		// Update the live region 
		document.querySelector('[aria-live]').innerHTML = 
		intro + lrt + 'so at this moment the time reads <time>' + h + ':' + m + '</time>';
		// UPdate the time in the H1
		document.querySelector('h1 time').innerHTML = h + ':' + m;
		// Nerdy stuff!
		if (m == '37' && h == '13') {
			document.body.classList.add('leet');
		}
		else if (document.body.classList.contains('leet')) {
			document.body.classList.remove('leet');
		}

		// update empty digits
		// These are the empty digits that are not used to create the numbers
		var analogs = [
			'.one div:nth-of-type(4)',
			'.one div:nth-of-type(8)',
			'.one div:nth-of-type(9)',
			'.one div:nth-of-type(12)',
			'.one div:nth-of-type(13)',
			'.one div:nth-of-type(16)',
			'.three div:nth-of-type(9)',
			'.three div:nth-of-type(13)',
			'.four div:nth-of-type(1)',
			'.four div:nth-of-type(2)',
			'.four div:nth-of-type(5)',
			'.four div:nth-of-type(8)',
			'.four div:nth-of-type(21)',
			'.four div:nth-of-type(22)',
			'.seven div:nth-of-type(9)',
			'.seven div:nth-of-type(10)',
			'.seven div:nth-of-type(13)',
			'.seven div:nth-of-type(16)',
			'.seven div:nth-of-type(17)',
			'.seven div:nth-of-type(20)',
			'.seven div:nth-of-type(21)',
			'.seven div:nth-of-type(24)'
		];
		var emptyDigits = document.querySelectorAll(analogs);
		var i = 0;
		// Add the class .analog to the empty digits
		while(i < emptyDigits.length) {
			emptyDigits[i].classList.add('analog');
			i++;
		}
		// If at least one analog digit exists …
		if(document.querySelector('.analog')) {
			var st = document.querySelector('#analog');
			// calculate minute degrees
			var anaMinute = (6 * m);
			// calculate hour degrees
			var anaHour = (h * 30) + (m/2);
			// hacky but works like a charm: 
			// write these styles into the empty <style> element
			var styleInner = ".analog::before{transform:rotate("+ anaHour +"deg) scaleY(.8) !important;}.analog::after{transform:rotate("+ anaMinute +"deg) !important;}";
			st.innerHTML = styleInner;
		}
	}
	// Call this function every second
	setTimeout(function(){setTime()},1000);
}
// Call this function 0.1 second after this line is read by the browser.
setTimeout(function(){setTime()},100);