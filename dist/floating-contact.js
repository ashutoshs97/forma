const floatingContact = document.querySelector('.floating-contact');
const briefTrigger = document.querySelector('#brief-button');

if (floatingContact && briefTrigger) {
  floatingContact.setAttribute('aria-haspopup', 'dialog');
  floatingContact.setAttribute('aria-controls', 'brief-dialog');
  floatingContact.addEventListener('click', event => {
    event.preventDefault();
    briefTrigger.click();
  });
}

// The product page links directly to the enquiry dialog on the home page.
const contactQuery = new URLSearchParams(location.search);
if (briefTrigger && contactQuery.get('contact') === 'open') {
  briefTrigger.click();
  contactQuery.delete('contact');
  try {
    history.replaceState(null, '', location.pathname + (contactQuery.size ? '?' + contactQuery : '') + location.hash);
  } catch {}
}
