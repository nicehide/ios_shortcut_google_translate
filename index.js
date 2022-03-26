const dialogTranslate = {
    ID_DIALOG: 'nicehide_tl_dialog',
    ID_CLOSE_BTN: 'nicehide_tl_close_btn',
    ID_SL: 'nicehide_tl_sl',
    ID_TL: 'nicehide_tl_tl',

    dialogHtml: `
        <div style="display: block;width: 100%; height: 30px; margin-bottom: 20px;">
            <span id="ID_CLOSE_BTN" style="float:right;cursor:pointer;margin-right: 20px;border: 1px solid #aaa;padding: 5px;line-height: 0.8;font-size: 15px;padding-top: 6px;font-weight: bold;">X</span>
        </div>
        <p id="ID_SL" style="width: 90%; margin: auto; margin-bottom:30px; border: 0px; white-space: nowrap; overflow: hidden; background: #eee;">&nbsp;</p>
        <p id="ID_TL" style="border: 0px; width: 90%; margin: auto; height: 80%; background: #eee;">&nbsp;</p>
    `,

    translate: async function(){
        const s = window.getSelection().toString();
        if (s.length < 1) {
            return;
        }

        let url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ko&dt=t&q='+s;

        const req = await fetch(url);
        const result = (await req.json())[0];

        let tl = '';
        for (let i=0; i<result.length; i++) {
            tl += result[i][0];
        }

        this.init();

        document.getElementById(this.ID_SL).innerHTML = s;
        document.getElementById(this.ID_TL).innerHTML = tl;

        document.getElementById(this.ID_DIALOG).show();
    },

    init: function(){
        if (document.getElementById(this.ID_DIALOG)) return;

        const dialog = document.createElement('dialog');
        dialog.id = this.ID_DIALOG;
        dialog.open = '';
        dialog.style = 'position: fixed; bottom: 0; width: 90%; height: 50%; border: 0px; border-radius: 10px; background: #ddd; z-index:2147483647;';

        let dialogHtml = this.dialogHtml.trim();
        dialogHtml = dialogHtml.replace('ID_CLOSE_BTN', this.ID_CLOSE_BTN);
        dialogHtml = dialogHtml.replace('ID_SL', this.ID_SL);
        dialogHtml = dialogHtml.replace('ID_TL', this.ID_TL);
        dialog.innerHTML = dialogHtml;

        document.body.appendChild(dialog);

        document.getElementById(this.ID_CLOSE_BTN).addEventListener('click', ()=>{
            dialog.close();
        });
    }
};


(async()=>{
    await dialogTranslate.translate();
    completion();
})();