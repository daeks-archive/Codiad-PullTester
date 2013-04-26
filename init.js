/*
 *  Copyright (c) Codiad & daeks, distributed
 *  as-is and without warranty under the MIT License. See
 *  [root]/license.txt for more. This information must remain intact.
 */

(function(global, $){

    var codiad = global.codiad,
        scripts = document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';

    $(function() {
        codiad.tester.init();
    });

    codiad.tester = {
        
        controller: curpath + 'controller.php',
        dialog: curpath + 'dialog.php',

        init: function() {
        },
        
        pull: function(id) {
            var _this = this;
            var root = codiad.project.getCurrent();
            $('#modal-content').html('<div id="modal-loading"></div><div align="center">Downloading from GitHub...</div><br>');
            $.get(_this.controller + '?action=pull&root=' + root + '&pull=' + id, function(data) {
                createResponse = codiad.jsend.parse(data);
                if (createResponse != 'error') {
                    codiad.message.success(createResponse.message);
                    codiad.filemanager.rescan(root);
                } else {
                    codiad.message.error(createResponse.message);
                }
                codiad.modal.unload();
            });
        },
                
        open: function() {
            var _this = this;
            var root = codiad.project.getCurrent();
            codiad.modal.load(850, _this.dialog + '?action=list&root=' + root);
        }
        
    };

})(this, jQuery);
