const newsletterForm = document.getElementById('newsletterForm');
const newsletterStatus = document.getElementById('newsletterStatus');

const setStatus = (message, tone = 'note') => {
  if (!newsletterStatus) return;
  newsletterStatus.textContent = message;
  newsletterStatus.className = `form-note ${tone}`.trim();
};

const postToGoogleSheet = async (endpoint, payload) => {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    throw new Error(`Failed to send signup. Status: ${response.status}`);
  }
};

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = newsletterForm.email.value.trim();
    const endpoint = newsletterForm.dataset.endpoint;

    if (!email) {
      alert('Please add your email to join the Honey Fire dispatch.');
      return;
    }

    if (!endpoint) {
      setStatus('Missing sign-up destination. Please try again later or email hello@theallergenie.com.', 'error');
      return;
    }

    setStatus('Granting your wish and sending it to our private Google Sheet...', 'pending');

    try {
      await postToGoogleSheet(endpoint, {
        email,
        timestamp: new Date().toISOString(),
        source: 'theallergenie.com/newsletter'
      });

      setStatus(`Wish granted! ${email} is on our list for weekly sparks from The Allergenie.`, 'success');
      newsletterForm.reset();
    } catch (error) {
      console.error('Newsletter signup error', error);
      setStatus('We could not save your wish right now. Please try again or email hello@theallergenie.com.', 'error');
    }
  });
}
