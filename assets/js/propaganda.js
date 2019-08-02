window.propaganda = {
    template: `
<div class="propaganda">
    <div class="propaganda-title">Una piccola interruzione. <span>L'articolo prosegue sotto ↓</span></div>

    {content}
</div>
`,

    init: function(baseUrl) {
        window.propaganda.baseUrl = baseUrl;
        window.onload = window.propaganda.onLoad;

        console.log('[Propaganda] Init:', baseUrl);
    },

    onLoad: function () {
        var node = window.propaganda.findNode();

        console.log('[Propaganda] Chosen node:', node);

        if (node) {
            console.log('[Propaganda] Requesting pre-serve...');

            window.propaganda.preServe(function (res) {
                var inject = window.propaganda.template.replace('{content}', res.source);
                node.insertAdjacentHTML('beforebegin', inject);

                console.log('[Propaganda] Injected', res);
            });
        }
    },

    findNode: function() {
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

        return putBeforeThis;
    },

    preServe: function(cb) {
        var request = new XMLHttpRequest();
        
        var w = document.documentElement.clientWidth;

        request.open('GET', window.propaganda.baseUrl + '/pre-serve?clientWidth=' + w, true);

        request.onload = function () {
            if (this.status == 200) {
                cb(JSON.parse(this.response));
            }
            else {
                console.error('[Propaganda] Response:', this.status, this.response);
            }
        };

        request.onerror = function() {
            console.error('[Propaganda] Net error');
        };

        request.send();
    }
};
