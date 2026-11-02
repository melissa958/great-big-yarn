// Progressively enhance the POST form with the official Formspree Ajax SDK.
const form = document.querySelector('.refresh-contact-form');
const button = form.querySelector('[data-fs-submit-btn]');
const status = document.getElementById('contact-status');
const success = document.getElementById('contact-success');
const error = document.getElementById('contact-error');
window.formspree = window.formspree || function (...args) {
  (window.formspree.q = window.formspree.q || []).push(args);
};
window.formspree('initForm', {
  formElement:form,
  formId:new URL(form.action).pathname.split('/').pop(),
  useDefaultStyles:false,
  disable() {
    button.disabled = true;
    button.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your message…';
  },
  enable() {
    button.disabled = false;
    button.textContent = 'Send message →';
    form.removeAttribute('aria-busy');
    status.textContent = '';
  },
  renderFormError(context, message) {
    error.toggleAttribute('data-fs-active', Boolean(message));
    error.textContent = !message ? '' : /rate|too many|limit/i.test(message)
      ? 'Please wait a moment before trying again. Your message is still here.'
      : 'Your message couldn’t be sent. Please try again. Your details are still here.';
  },
  onSuccess() {
    form.reset();
    success.focus();
  },
  onError() {
    const invalid = form.querySelector('[aria-invalid="true"]');
    (invalid || error).focus();
  },
  onFailure() {
    error.focus();
  }
});
