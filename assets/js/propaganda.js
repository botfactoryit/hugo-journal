window.propaganda = {
    template: `
<aside class="propaganda">
    <div class="propaganda-title">Una piccola interruzione. <span>L'articolo prosegue sotto ↓</span></div>
    
    <div class="propaganda-body">
        L'articolo ti sta piacendo?
        <strong>Seguici su <a target="_blank" href="https://t.me/FibraClick">Telegram</a>, <a target="_blank" href="https://www.facebook.com/fibraclick">Facebook</a> e <a target="_blank" href="https://twitter.com/fibraclick">Twitter</a></strong> per ricevere aggiornamenti sugli articoli della wiki e le novità più importanti sulla banda ultralarga in Italia.
    </div>
</aside>`,

    onLoad: function () {
        var postHeight = document.querySelector('.post-content').offsetHeight;
        var half = postHeight / 2;
        var nodes = document.querySelectorAll('h2');

        var putBeforeThis;

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].offsetTop > half) {
                if (nodes[i].offsetTop / postHeight > 0.8) {
                    i--;
                }

                putBeforeThis = nodes[i];
                break;
            }
        }

        if (!putBeforeThis) {
            if (nodes.length >= 2) {
                putBeforeThis = nodes[nodes.length - 1];
            }
            else {
                return;
            }
        }

        putBeforeThis.insertAdjacentHTML('beforebegin', window.propaganda.template);
    }
};

window.onload = window.propaganda.onLoad;
