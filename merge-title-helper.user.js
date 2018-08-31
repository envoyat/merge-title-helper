// ==UserScript==
// @name         Merge Commit Title Helper
// @namespace    https://github.com/envoyat/merge-title-helper
// @version      0.2
// @description  Helps us use the correct title format for merge commits (in GitHub)
// @downloadURL  https://github.com/envoyat/merge-title-helper/raw/master/merge-title-helper.user.js
// @updateURL    https://github.com/envoyat/merge-title-helper/raw/master/merge-title-helper.user.js
// @author       https://github.com/munkijeong
// @match        https://github.com/envoyat/SpiritOfTasmania/*
// @grant        none
// ==/UserScript==

;(function() {
  'use strict'

  // Your code here...
  var pullReqNumber = document
    .getElementsByClassName('gh-header-number')[0]
    .innerText.replace('#', '')

  function isMergeMessageValid() {
    if (!document.getElementById('merge-message-warning')) {
      createMergeMessage()
    }

    var msgField = document.getElementById('merge_title_field')
    var parentDiv = msgField.closest('div')
    var message = msgField.value
    var rx = /\(#([^)]+)\)/
    var result = message.match(rx)
    var disable = false
    if (result != null && result[1] === pullReqNumber) {
      document
        .getElementById('merge-message-warning')
        .setAttribute('style', 'display: none;')
    } else {
      document
        .getElementById('merge-message-warning')
        .setAttribute('style', 'display: block;color: red;')
      disable = true
    }

    var mergeButtons = document.getElementsByClassName('js-merge-commit-button')
    for (var i = 0; i < mergeButtons.length; i++) {
      mergeButtons[i].disabled = disable
    }
  }

  function createMergeMessage() {
    var msgField = document.getElementById('merge_title_field')
    var newDiv = document.createElement('div')
    var newContent = document.createTextNode(
      'New rule 101: Put PR number with # at the end of merge message e.g. SOT-9999: upgrade umbraco (#' +
        pullReqNumber +
        ')',
    )
    newDiv.setAttribute('style', 'display: none;')
    newDiv.setAttribute('id', 'merge-message-warning')
    newDiv.appendChild(newContent)
    msgField.after(newDiv)
  }

  isMergeMessageValid()

  window.addEventListener('input', isMergeMessageValid)
  window.addEventListener('click', isMergeMessageValid)
})()
