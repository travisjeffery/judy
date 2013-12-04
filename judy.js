/*! written by @travisjeffery */

+function () { 'use strict';
  var initialize = function () {
    var elements = document.querySelectorAll('.js-judy')
    for (var i = 0, l = elements.length; l > i; i++) prepareChars(elements[i])
    document.addEventListener('mouseover', onMouseover, false)
  }

  var Effect = function (element) {
    this.element = element
    this.chars = element.querySelectorAll('.js-judy-char')
    this.charsLength = this.chars.length
    if (!this.charsLength) return
    this.endIndex = 0
    this.startIndex = 0
    this.hueIndex = Math.floor(360 * Math.random())
    this.colors = []
    this.hasMouseover = true
    this.isAnimating = true
    this.animate()
    activeElement = element
    document.addEventListener('mouseover', this, false)
  }

  Effect.prototype.handleEvent = function(event) {
    var typeHandler = event.type + 'Handler'
    this[typeHandler] && this[typeHandler](event)
  }

  Effect.prototype.mouseoverHandler = function(event) {
    if (this.element.contains(event.target)) return
    this.hasMouseover = false
    activeElement = null
    document.removeEventListener('mouseover', this, false)
  }

  Effect.prototype.animate = function() {
    this.endIndex = Math.min(this.endIndex + 1, this.charsLength)
    var hue = 10 * this.hueIndex % 360, color = this.hasMouseover ? 'hsl(' + hue + ', 100%, 50%)' : ''
    this.colors.unshift(color)
    for (var n = this.startIndex; n < this.endIndex; n++) this.chars[n].style.color = this.colors[n]
    this.hasMouseover ? this.hueIndex++ : this.startIndex = Math.min(this.startIndex + 1, this.charsLength)
    this.isAnimating = this.startIndex !== this.charsLength
    this.isAnimating && requestAnimationFrame(this.animate.bind(this))
  }

  var getTaggedElement = function (element, tag) {
    for (;Node.DOCUMENT_NODE !== element.nodeType;) {
      if (element.nodeName.toLowerCase() === tag) return element
      element = element.parentNode
    }
    return null
  }

  var prepareChars = function (element) {
    var words = element.textContent.split(' ')
    for (;element.firstChild;) element.removeChild(element.firstChild)
    var fragment = document.createDocumentFragment()
    for (var i = 0, l = words.length; l > i; i++) {
      var word = words[i]
        , wordElement = document.createElement('span')
        , chars = word.split('')
      wordElement.className = 'js-judy-word'
      for (var j = 0, m = chars.length; m > j; j++) {
        var charElement = document.createElement('span')
        charElement.className = 'js-judy-char'
        charElement.textContent = chars[j]
        wordElement.appendChild(charElement)
      }
      fragment.appendChild(wordElement)
      fragment.appendChild(document.createTextNode(' '))
    }
    element.appendChild(fragment)
  }

  var onMouseover = function (event) {
    var element = getTaggedElement(event.target, 'a')
    element && element !== activeElement && new Effect(element)
  }

  var activeElement = null

  window.addEventListener('DOMContentLoaded', initialize, false)
}();
