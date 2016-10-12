var calurl = require('generate-google-calendar-url')
var datePick = require('flatpickr')

var startInput = document.querySelector('.startInput')
var titleInput = document.querySelector('.titleInput')
var detailsInput = document.querySelector('.detailsInput')
var tzInput = document.querySelector('.tzInput')
var linkContainer = document.querySelector('.link')

var start = new Date()
var tz = Intl.DateTimeFormat().resolvedOptions().timeZone
tzInput.value = tz

startInput.flatpickr({enableTime: true, defaultDate: start, onChange: function (date) {
  start = date[0]
  render()
}})
titleInput.addEventListener('change', render)
detailsInput.addEventListener('change', render)
tzInput.addEventListener('change', render)

function render (e) {
  var end = new Date(start)
  end.setHours(end.getHours() + 1)
  var url = calurl({
    start: start,
    end: end,
    title: titleInput.value,
    details: detailsInput.value
  })
  var tz = tzInput.value
  if (tz) url = url + '&ctz=' + tz
  url = url.replace('http://', 'https://')
  linkContainer.innerHTML = `
    <h3>Link:</h3>
    <a target="_blank" href="${url}">${url}</a>
    <h3>Markdown:</h3>
    <pre>[📅 Add to Google Calendar](${url})</pre>
  `
}

render()