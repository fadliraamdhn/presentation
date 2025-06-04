function togglePassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

setTimeout(() => {
    const flash = document.querySelector('.flash-message');
    if (flash) {
        flash.style.transition = 'opacity 1s';
        flash.style.opacity = '0';
        setTimeout(() => flash.remove(), 2000);
    }
}, 2000);