// Submit Email 
function emailForm() {
	document.getElementById("emailForm").addEventListener("submit", function (e) {
		e.preventDefault();
		const subject = encodeURIComponent(document.getElementById("subject").value);
		const body = encodeURIComponent(document.getElementById("body").value);
		const mailtoLink = `mailto:alan.k@.com?subject=${subject}&body=${body}`;
		window.location.href = mailtoLink;
	})
};