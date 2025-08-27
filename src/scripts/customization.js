// Event Listener for dark mode and font size, and initialization of them
document.addEventListener('DOMContentLoaded', function () {
	// Initialize dark mode toggle (persisted)
	initDarkMode();

	// Initialize font size toggle (persisted)
	initFontSize();

});

// Dark mode: toggle and persist
function applyDarkMode(enabled) {
	if (enabled) {
		document.body.classList.add('dark');
		const btn = document.getElementById('darkModeToggle');
		if (btn) btn.textContent = '☀️';
	} else {
		document.body.classList.remove('dark');
		const btn = document.getElementById('darkModeToggle');
		if (btn) btn.textContent = '🌙';
	}
	localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
}

function initDarkMode() {
	const saved = localStorage.getItem('darkMode');
	const enabled = saved === 'enabled';
	applyDarkMode(enabled);
	const btn = document.getElementById('darkModeToggle');
	if (btn) {
		btn.addEventListener('click', () => {
			const isDark = document.body.classList.contains('dark');
			applyDarkMode(!isDark);
		});
	}
}

// Font size: toggle and persist
function applyFontSize(size) {
	document.body.classList.remove('font-small', 'font-medium', 'font-large');
	document.body.classList.add(`font-${size}`);
	localStorage.setItem('fontSize', size);
}

function initFontSize() {
	const savedSize = localStorage.getItem('fontSize') || 'medium';
	applyFontSize(savedSize);
	const btn = document.getElementById('fontSizeToggle');
	if (btn) {
		btn.addEventListener('click', () => {
			const current = localStorage.getItem('fontSize') || 'medium';
			const next = current === 'small'
				? 'medium'
				: current === 'medium'
					? 'large'
					: 'small';
			applyFontSize(next);
		});
	}
}
