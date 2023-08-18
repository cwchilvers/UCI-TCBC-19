const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
//* Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    // Store the event so it can be triggered later.
    window.deferredPrompt = event;

    // Hide install button
    butInstall.classList.toggle('hidden', false);
});

//* Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show the install prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable, since
    // prompt() can only be called once
    window.deferredPrompt = null;

    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

//* Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    window.deferredPrompt = null;
});
