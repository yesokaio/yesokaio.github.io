document.addEventListener('DOMContentLoaded', () => {
    // Default-Einstellungen
    const defaultSettings = {
        scale: 1,
        background: '#222',
        numberBackground: '#333',
        number: '#fff',
        label: '#fff',
        numberBorder: '#666',
        container: '#222'
    };
	

	// Countdown-Funktion
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date('2025-07-04T00:00:00');
        const diff = targetDate - now;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        document.getElementById('end-date').textContent = `bis zum ${targetDate.toLocaleDateString('de-DE')}`;

        if (diff < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = "Countdown abgelaufen";
        }
    }
	
    const interval = setInterval(updateCountdown, 1000);
	
    // Funktion zum Speichern der Einstellungen im localStorage
    function saveSettings(settings) {
        localStorage.setItem('pageSettings', JSON.stringify(settings));
    }

    // Funktion zum Laden der Einstellungen aus dem localStorage
    function loadSettings() {
        const savedSettings = localStorage.getItem('pageSettings');
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    }

    // Einstellungen laden
    const settings = loadSettings();

    // Setze die initiale Skalierung
    document.querySelector('.container').style.transform = `scale(${settings.scale})`;

    // Setze die Farben auf der Seite
    document.body.style.backgroundColor = settings.background;
    document.querySelectorAll('.countdown__number').forEach(el => {
        el.style.backgroundColor = settings.numberBackground;
        el.style.color = settings.number;
        el.style.borderColor = settings.numberBorder;
    });
    document.querySelectorAll('.countdown__label').forEach(el => el.style.color = settings.label);
    document.querySelector('.container').style.backgroundColor = settings.container;
    document.getElementById('end-date').style.color = settings.label;

    // Setze die Farbe der Farbauswahl-Boxen
    document.getElementById('background-color').style.backgroundColor = settings.background;
    document.getElementById('number-background-color').style.backgroundColor = settings.numberBackground;
    document.getElementById('number-color').style.backgroundColor = settings.number;
    document.getElementById('label-color').style.backgroundColor = settings.label;
    document.getElementById('container-background-color').style.backgroundColor = settings.container;

    // Setze den Wert des Sliders
    document.getElementById('size-slider').value = settings.scale;

    // Event-Listener für Farbwähler
    document.getElementById('background-color-picker').addEventListener('input', (e) => {
        const color = e.target.value;
        document.body.style.backgroundColor = color;
        document.getElementById('background-color').style.backgroundColor = color;
        settings.background = color;
        saveSettings(settings);
    });

    document.getElementById('number-background-color-picker').addEventListener('input', (e) => {
        const color = e.target.value;
        document.querySelectorAll('.countdown__number').forEach(el => el.style.backgroundColor = color);
        document.getElementById('number-background-color').style.backgroundColor = color;
        settings.numberBackground = color;
        saveSettings(settings);
    });

    document.getElementById('number-color-picker').addEventListener('input', (e) => {
        const color = e.target.value;
        document.querySelectorAll('.countdown__number').forEach(el => el.style.color = color);
        document.getElementById('number-color').style.backgroundColor = color;
        settings.number = color;
        saveSettings(settings);
    });

    document.getElementById('label-color-picker').addEventListener('input', (e) => {
        const color = e.target.value;
        document.querySelectorAll('.countdown__label').forEach(el => el.style.color = color);
        document.getElementById('end-date').style.color = color;
        document.getElementById('label-color').style.backgroundColor = color;
        settings.label = color;
        saveSettings(settings);
    });

    document.getElementById('container-background-color-picker').addEventListener('input', (e) => {
        const color = e.target.value;
        document.querySelector('.container').style.backgroundColor = color;
        document.getElementById('container-background-color').style.backgroundColor = color;
        settings.container = color;
        saveSettings(settings);
    });

    // Event-Listener für den Größen-Slider
    document.getElementById('size-slider').addEventListener('input', (e) => {
        const scale = e.target.value;
        document.querySelector('.container').style.transform = `scale(${scale})`;
        settings.scale = scale;
        saveSettings(settings);
    });

    // Event-Listener für das Menü-Icon
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const colorPickerMenu = document.getElementById('color-picker');
    
    hamburgerIcon.addEventListener('click', () => {
        colorPickerMenu.classList.toggle('show');
    });

    // Ensure the icon is always clickable
    hamburgerIcon.style.zIndex = '11';
});
