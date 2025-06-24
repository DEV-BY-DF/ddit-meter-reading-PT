document.getElementById('meterForm').addEventListener('submit', function (e) {
  e.preventDefault();

  document.querySelectorAll('.error-msg').forEach(el => el.remove());

  const customerId = document.getElementById('customerId').value.trim();
  const meterId = document.getElementById('meterId').value.trim();
  const reading = document.getElementById('reading').value.trim();
  const date = document.getElementById('date').value;

  let valid = true;

  if (!/^\d{6,10}$/.test(customerId)) {
    showError('customerId', 'Bitte 6–10 Ziffern eingeben.');
    valid = false;
  }
  if (!/^\d{5,7}$/.test(meterId)) {
    showError('meterId', 'Bitte 5–7 Ziffern eingeben.');
    valid = false;
  }
  if (!/^\d+(\.\d{1,2})?$/.test(reading)) {
    showError('reading', 'Nur Zahlen, Dezimalpunkt erlaubt (max. 2 Nachkommastellen).');
    valid = false;
  }
  if (date === "") {
    showError('date', 'Bitte ein Datum wählen.');
    valid = false;
  }

  if (!valid) return;

  // ServiceNow-Table-Variante 
  /*
  const payload = {
    u_customer_number: customerId,
    u_meter_number: meterId,
    u_meter_reading: reading,
    u_meter_reading_date: date
  };

  fetch('/api/meter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) throw new Error('Fehler beim Senden');
    return response.json();
  })
  .then(data => {
    document.getElementById('result').innerHTML = `
      <h3>Bestätigung</h3>
      <p>Ihre Daten wurden erfolgreich übermittelt.</p>
    `;
    // Formular zurücksetzen
    this.reset();
  })
  .catch(error => {
    document.getElementById('result').innerHTML = `
      <h3>Fehler</h3>
      <p>Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.</p>
    `;
  });
  */

 const payload = new URLSearchParams();
payload.append('customerId', customerId);
payload.append('meterId', meterId);
payload.append('reading', reading);
payload.append('date', date);

fetch('http://itvdev054.dresden-it.de/falkus/index.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: payload
})
.then(response => response.text())
.then(data => {
  document.getElementById('result').innerHTML = `
    <h3>Backend-Antwort</h3>
    <pre>${data}</pre>
  `;
  document.getElementById('meterForm').reset();
})
.catch(error => {
  document.getElementById('result').innerHTML = `
    <h3>Fehler</h3>
    <p>Die Übermittlung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.</p>
  `;
});


function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  const error = document.createElement('div');
  error.className = 'error-msg';
  error.setAttribute('role', 'alert');
  error.style.color = '#c00';
  error.style.fontSize = '0.92em';
  error.textContent = message;
  input.insertAdjacentElement('afterend', error);
}
