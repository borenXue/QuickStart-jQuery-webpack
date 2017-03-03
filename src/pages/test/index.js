require('./../../public/main.css')
console.log('~_~ jQuery can use directly ~_~')
console.log(jQuery)
console.log('add your code here ....')

require('selectize')
require('selectize/dist/css/selectize.default.css')
$('#test-jquery-plugin').selectize({
  delimiter: ',',
  persist: false,
  create: function (input) {
    return {
      value: input,
      text: input
    }
  }
})
