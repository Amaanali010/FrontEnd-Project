/* =============================================
   MediCare Hospital - Appointment Page JS
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Department → Doctor Data ---- */
  const doctorsData = {
    cardiology: [
      { value: 'dr-james-wilson', text: 'Dr. James Wilson' },
      { value: 'dr-sarah-miller', text: 'Dr. Sarah Miller' },
    ],
    neurology: [
      { value: 'dr-alan-grant', text: 'Dr. Alan Grant' },
      { value: 'dr-linda-carter', text: 'Dr. Linda Carter' },
    ],
    pediatrics: [
      { value: 'dr-emma-brown', text: 'Dr. Emma Brown' },
      { value: 'dr-noah-davis', text: 'Dr. Noah Davis' },
    ],
    orthopedics: [
      { value: 'dr-oliver-smith', text: 'Dr. Oliver Smith' },
      { value: 'dr-sophia-jones', text: 'Dr. Sophia Jones' },
    ],
    'general-medicine': [
      { value: 'dr-liam-taylor', text: 'Dr. Liam Taylor' },
      { value: 'dr-ava-white', text: 'Dr. Ava White' },
    ],
    gynecology: [
      { value: 'dr-mia-hall', text: 'Dr. Mia Hall' },
      { value: 'dr-isabella-scott', text: 'Dr. Isabella Scott' },
    ],
    dermatology: [
      { value: 'dr-ethan-harris', text: 'Dr. Ethan Harris' },
      { value: 'dr-emily-king', text: 'Dr. Emily King' },
    ],
  };

  const deptSelect = document.getElementById('apptDept');
  const doctorSelect = document.getElementById('apptDoctor');
  const form = document.getElementById('appointmentForm');
  const summaryBox = document.getElementById('appt-summary');

  /* ---- Populate doctors on dept change ---- */
  if (deptSelect && doctorSelect) {
    deptSelect.addEventListener('change', function () {
      const dept = this.value;
      doctorSelect.innerHTML = '<option value="">-- Select Doctor --</option>';
      doctorSelect.disabled = !dept;

      if (dept && doctorsData[dept]) {
        doctorsData[dept].forEach(doc => {
          const opt = document.createElement('option');
          opt.value = doc.value;
          opt.textContent = doc.text;
          doctorSelect.appendChild(opt);
        });
      }
      updateSummary();
    });
    doctorSelect.addEventListener('change', updateSummary);
  }

  /* ---- Set min date to today ---- */
  const dateInput = document.getElementById('apptDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.addEventListener('change', updateSummary);
  }

  /* ---- Live summary update ---- */
  const liveFields = ['apptName', 'apptEmail', 'apptPhone', 'apptTime', 'apptType'];
  liveFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', updateSummary);
    if (el && el.tagName === 'SELECT') el.addEventListener('change', updateSummary);
  });

  function updateSummary() {
    const name = document.getElementById('apptName')?.value.trim();
    const dept = deptSelect?.options[deptSelect.selectedIndex]?.text;
    const doctor = doctorSelect?.options[doctorSelect.selectedIndex]?.text;
    const date = document.getElementById('apptDate')?.value;
    const time = document.getElementById('apptTime')?.value;
    const type = document.getElementById('apptType')?.options[document.getElementById('apptType').selectedIndex]?.text;

    const hasSomething = name || (dept && dept !== '-- Select Department --') || date;
    if (!hasSomething) { summaryBox.style.display = 'none'; return; }

    summaryBox.style.display = 'block';
    setSummaryRow('sum-name', name || '—');
    setSummaryRow('sum-dept', (dept && dept !== '-- Select Department --') ? dept : '—');
    setSummaryRow('sum-doctor', (doctor && doctor !== '-- Select Doctor --') ? doctor : '—');
    setSummaryRow('sum-date', date ? formatDate(date) : '—');
    setSummaryRow('sum-time', time || '—');
    setSummaryRow('sum-type', (type && type !== '-- Select Type --') ? type : '—');
  }

  function setSummaryRow(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function formatDate(d) {
    const date = new Date(d + 'T00:00:00');
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  /* ---- Form Submission ---- */
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Patient Name
      const name = document.getElementById('apptName');
      if (!name.value.trim() || name.value.trim().length < 2) {
        setInvalid(name); valid = false;
      } else setValid(name);

      // Email
      const email = document.getElementById('apptEmail');
      const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRx.test(email.value.trim())) {
        setInvalid(email); valid = false;
      } else setValid(email);

      // Phone
      const phone = document.getElementById('apptPhone');
      if (!/^\+?[\d\s\-()]{7,15}$/.test(phone.value.trim())) {
        setInvalid(phone); valid = false;
      } else setValid(phone);

      // Department
      if (!deptSelect.value) { setInvalid(deptSelect); valid = false; } else setValid(deptSelect);

      // Doctor
      if (!doctorSelect.value) { setInvalid(doctorSelect); valid = false; } else setValid(doctorSelect);

      // Date
      const dateEl = document.getElementById('apptDate');
      if (!dateEl.value) { setInvalid(dateEl); valid = false; } else setValid(dateEl);

      // Time
      const timeEl = document.getElementById('apptTime');
      if (!timeEl.value) { setInvalid(timeEl); valid = false; } else setValid(timeEl);

      if (valid) {
        showConfirmationModal();
      } else {
        window.showToast?.('⚠️ Please fill in all required fields.', 'danger');
      }
    });
  }

  function setInvalid(el) { el.classList.add('is-invalid'); el.classList.remove('is-valid'); }
  function setValid(el) { el.classList.remove('is-invalid'); el.classList.add('is-valid'); }

  /* ---- Confirmation Modal ---- */
  function showConfirmationModal() {
    const modal = document.getElementById('confirmModal');
    if (modal) {
      // Populate modal
      const name = document.getElementById('apptName').value.trim();
      const email = document.getElementById('apptEmail').value.trim();
      const dept = deptSelect.options[deptSelect.selectedIndex].text;
      const doctor = doctorSelect.options[doctorSelect.selectedIndex].text;
      const date = document.getElementById('apptDate').value;
      const time = document.getElementById('apptTime').value;

      document.getElementById('modal-name').textContent = name;
      document.getElementById('modal-email').textContent = email;
      document.getElementById('modal-dept').textContent = dept;
      document.getElementById('modal-doctor').textContent = doctor;
      document.getElementById('modal-date').textContent = formatDate(date);
      document.getElementById('modal-time').textContent = time;

      // Generate appointment ID
      document.getElementById('modal-appt-id').textContent = 'MC-' + Math.random().toString(36).substr(2, 8).toUpperCase();

      const bsModal = new bootstrap.Modal(modal);
      bsModal.show();

      // Reset form on close
      modal.addEventListener('hidden.bs.modal', function () {
        form.reset();
        form.querySelectorAll('.is-valid, .is-invalid').forEach(el => {
          el.classList.remove('is-valid', 'is-invalid');
        });
        summaryBox.style.display = 'none';
        doctorSelect.innerHTML = '<option value="">-- Select Doctor --</option>';
        doctorSelect.disabled = true;
      }, { once: true });
    }
  }

});
