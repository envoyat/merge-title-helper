// ==UserScript==
// @name         Merge Commit Title Helper
// @namespace    https://github.com/envoyat/merge-title-helper
// @version      0.3
// @description  Helps us use the correct title format for merge commits (in GitHub)
// @downloadURL  https://github.com/envoyat/merge-title-helper/raw/master/merge-title-helper.user.js
// @updateURL    https://github.com/envoyat/merge-title-helper/raw/master/merge-title-helper.user.js
// @author       https://github.com/munkijeong
// @match        https://github.com/envoyat/SpiritOfTasmania/*
// @grant        none
// ==/UserScript==

;(function() {
  'use strict'

  console.group('Merge Commit Title Helper')

  // Your code here...
  const pullReqNumber = document
    .getElementsByClassName('gh-header-number')[0]
    .innerText.replace('#', '')

  console.info({ pullReqNumber })
  console.groupEnd()

  const pullRequestNumberRegex = /\(#(\d{1,6})\)/

  function isMergeMessageValid() {
    console.group('isMergeMessageValid()')
    try {
      if (!document.getElementById('merge-message-warning')) {
        createMergeMessage()
      }

      const msgField = document.getElementById('merge_title_field')
      const message = msgField.value

      const result = message.match(pullRequestNumberRegex)

      const isError = !result || result[1] !== pullReqNumber

      console.info({ message, pullReqNumber, result, isError })

      const warningDisplay = isError
        ? 'display: block;color: red;'
        : 'display: none;'

      document
        .getElementById('merge-message-warning')
        .setAttribute('style', warningDisplay)

      const mergeButtons = document.getElementsByClassName(
        'js-merge-commit-button',
      )
      for (let i = 0; i < mergeButtons.length; i++) {
        mergeButtons[i].disabled = isError
      }
    } finally {
      console.groupEnd()
    }
  }

  function createMergeMessage() {
    console.info('createMergeMessage()')
    const msgField = document.getElementById('merge_title_field')
    const newDiv = document.createElement('div')
    const newContent = document.createTextNode(
      `New rule 101: Put PR number with # at the end of merge message e.g. SOT-9999: do thing (#${pullReqNumber})`,
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
