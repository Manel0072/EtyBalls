document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('cookie-popup');
    const btnAccept = document.getElementById('cookie-accept');
    const btnNecessary = document.getElementById('cookie-necessary');
    const btnConfigure = document.getElementById('cookie-configure');
    const configMenu = document.getElementById('cookie-config-menu');
    const btnSaveConfig = document.getElementById('cookie-save-config');
    const btnCancelConfig = document.getElementById('cookie-cancel-config');
    const analyticsCheckbox = document.getElementById('cookie-analytics');
    const marketingCheckbox = document.getElementById('cookie-marketing');
    const toast = document.getElementById('toast');

    // Helper: set cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    // Helper: get cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0;i < ca.length;i++) {
            let c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    // Show popup if not accepted
    if (!getCookie('cookieConsent')) {
        popup.style.display = 'block';
    }

    function showToast(message) {
        toast.textContent = message;
        toast.className = 'toast show';
        setTimeout(() => {
            toast.className = 'toast';
        }, 2500);
    }

    btnAccept.onclick = function () {
        setCookie('cookieConsent', 'all', 365);
        popup.style.display = 'none';
        showToast('Has aceptado todas las cookies.');
    };

    btnNecessary.onclick = function () {
        setCookie('cookieConsent', 'necessary', 365);
        popup.style.display = 'none';
        showToast('Solo se usarán las cookies necesarias.');
    };

    btnConfigure.onclick = function () {
        configMenu.style.display = 'block';
    };

    btnCancelConfig.onclick = function () {
        configMenu.style.display = 'none';
    };

    btnSaveConfig.onclick = function () {
        let consent = ['necessary'];
        let msg = 'Preferencias guardadas: solo necesarias.';
        if (analyticsCheckbox.checked && marketingCheckbox.checked) {
            consent.push('analytics', 'marketing');
            msg = 'Preferencias guardadas: análisis y marketing activados.';
        } else if (analyticsCheckbox.checked) {
            consent.push('analytics');
            msg = 'Preferencias guardadas: análisis activado.';
        } else if (marketingCheckbox.checked) {
            consent.push('marketing');
            msg = 'Preferencias guardadas: marketing activado.';
        }
        setCookie('cookieConsent', consent.join(','), 365);
        popup.style.display = 'none';
        configMenu.style.display = 'none';
        showToast(msg);
    };
});