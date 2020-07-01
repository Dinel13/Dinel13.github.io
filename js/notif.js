function notifFavorite(name, text) {
    const title = 'Notifikasi Bola Info';
    const options = {
        'body': `Team ${name} ${text} favorite.`,
        'icon': '/image/icon1.png',
        'badge': '/image/icon1.png',
        tag: `team-${name}`
    }
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.showNotification(title, options);
        });
    } else {
        console.error('FItur notifikasi tidak diijinkan.');
    }
}
