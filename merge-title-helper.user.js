// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/envoyat/SpiritOfTasmania/pull*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    var pullReqNumber = document.getElementsByClassName('gh-header-number')[0].innerText.replace('#', '');

    function isMergeMessageValid() {
        debugger
        var msgField = document.getElementById('merge_title_field');
        var parentDiv = msgField.closest('div');
        var message = msgField.value;
        var rx = /\(#([^)]+)\)/;
        var result = message.match(rx);
        var disable = false;
        if (result != null && result[1] === pullReqNumber) {
            document.getElementById('merge-message-warning').setAttribute('style', 'display: none;');
        } else {
            document.getElementById('merge-message-warning').setAttribute('style', 'display: block;color: red;');
            disable = true;
        }

        var mergeButtons = document.getElementsByClassName('js-merge-commit-button');
        for (var i = 0; i < mergeButtons.length; i++) {
            mergeButtons[i].disabled = disable;
        }
    }

    var msgField = document.getElementById('merge_title_field');
    var newDiv = document.createElement('div');
    var newContent = document.createTextNode("New rule 101: Put PR number with # at the end of merge message e.g. SOT-9999: upgrade umbraco (#" + pullReqNumber + ")");
    newDiv.setAttribute("style", "display: none;");
    newDiv.setAttribute("id", "merge-message-warning");
    newDiv.appendChild(newContent);
    msgField.after(newDiv);
    isMergeMessageValid();

    document.getElementById("merge_title_field").addEventListener("input", function(){isMergeMessageValid()});
})();
