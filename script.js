
// Formular-Validierung
document.getElementById('meterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert("Vielen Dank für den Zählerstand-Meldung!");
    // Hier können API-Aufrufe oder Validierung hinzugefügt werden
});

// FAQ-Accordion-Funktion
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
        this.nextElementSibling.classList.toggle('show');
    });
});
