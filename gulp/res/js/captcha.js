window.addEventListener('DOMContentLoaded', (event) => {

	const captchaFields = document.getElementsByClassName('captchafield');
	let refreshing = false;

	const updateCaptchaImages = (url) => {
		for (let i = 0; i < captchaFields.length; i++) {
			if (captchaFields[i].previousSibling.children.length > 0) {
				captchaFields[i].previousSibling.children[0].src = url;
			}
		}
	};

	const refreshCaptchas = function(e) {
		if (refreshing) {
			return;
		}
		refreshing = true;
		document.cookie = 'captchaid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		const captchaImg = this;
		const xhr = new XMLHttpRequest();
		xhr.onload = () => {
			refreshing = false;
			updateCaptchaImages(xhr.responseURL);
		}
		xhr.onerror = () => {
			refreshing = false;
		}
		xhr.open('GET', '/captcha', true);
		xhr.send(null);
	};

	const loadCaptcha = function(e) {
		const captchaDiv = this.previousSibling;
		const captchaImg = document.createElement('img');
		const field = this;
		captchaImg.src = '/captcha';
		captchaImg.onload = function() {
			field.placeholder = 'double click image to refresh';
			captchaDiv.appendChild(captchaImg);
			captchaDiv.style.display = '';
			captchaImg.addEventListener('dblclick', refreshCaptchas, true);
		}
	};

	for (let i = 0; i < captchaFields.length; i++) {
		captchaFields[i].placeholder = 'click to load captcha';
		captchaFields[i].addEventListener('focus', loadCaptcha, { once: true });
	}

});
