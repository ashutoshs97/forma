// Queue initialization until the CDN library loads. The HTML action also supports normal POST submissions.
window.formspree = window.formspree || function () {
  (window.formspree.q = window.formspree.q || []).push(arguments);
};

function setBriefSending(form, sending) {
  form.setAttribute('aria-busy', String(sending));
  form.querySelector('[data-fs-submit-btn]').textContent = sending ? 'Sending…' : 'Send project brief ↗';
}

window.formspree('initForm', {
  formElement: '#brief-form',
  formId: 'xrppwzbj',
  useDefaultStyles: false,
  onSubmit: ({ form }) => setBriefSending(form, true),
  onSuccess: ({ form }) => {
    setBriefSending(form, false);
    form.reset();
    form.querySelector('[data-fs-success]').focus();
  },
  onError: ({ form }) => {
    setBriefSending(form, false);
    (form.querySelector('[aria-invalid="true"]') || form.querySelector('[data-fs-error=""]')).focus();
  },
  onFailure: ({ form }) => {
    setBriefSending(form, false);
    form.querySelector('[data-fs-error=""]').focus();
  }
});
