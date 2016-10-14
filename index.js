var datePick = require('flatpickr')

var startInput = document.querySelector('.startInput')
var titleInput = document.querySelector('.titleInput')
var detailsInput = document.querySelector('.detailsInput')
var linkContainer = document.querySelector('.link')

var start = new Date()

startInput.flatpickr({enableTime: true, defaultDate: start, onChange: function (date) {
  start = date[0]
  render()
}})
titleInput.addEventListener('change', render)
detailsInput.addEventListener('change', render)

function render (e) {
  var end = new Date(start)
  end.setHours(end.getHours() + 1)
  var url = `https://www.google.com/calendar/event?action=TEMPLATE&text=${titleInput.value}&details=${detailsInput.value}&dates=${stringifyDate(start)}/${stringifyDate(end)}`
  linkContainer.innerHTML = `
    <h3>Link:</h3>
    <a target="_blank" href="${url}">${url}</a>
    <h3>Markdown:</h3>
    <pre>[📅 Add to Google Calendar](${url})</pre>
  `
}

function stringifyDate (date) {
  return date.toISOString().replace(/(:|-|\.\d+)/g, '')
}

render()