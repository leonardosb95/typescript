System.register(["../views/View"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var View_1, MensagemView;
    return {
        setters: [
            function (View_1_1) {
                View_1 = View_1_1;
            }
        ],
        execute: function () {
            MensagemView = class MensagemView extends View_1.View {
                update(model) {
                    this._elemento.html(this.template(model));
                }
                template(model) {
                    return `<p class="alert alert-info">${model}</p>`;
                }
            };
            exports_1("MensagemView", MensagemView);
        }
    };
});
