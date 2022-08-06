import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDecimals', function (value) {
  return value.toFixed(2)
})

Vue.filter('formatDecimals1', function (value) {
  if (value === null) {
    return value
  } else {
    return value.toFixed(1)
  }
})

Vue.filter('formatDecimals3', function (value) {
  if (value === null) {
    return value
  } else {
    return value.toFixed(3)
  }
})

Vue.filter('currence', function (value) {
  if (value === null) {
    return value
  } else {
    return parseFloat(value).toFixed(2).replace('.', ',')
  }
})

Vue.filter('formatToCountry', function (value, language, coin) {
  return value.toLocaleString(language, { style: 'currency', currency: coin})
})

Vue.filter('formatToReal', function (value) {
  let rs = parseFloat(value).toFixed(2).replace('.', ',')
  for (let ii = 0; ii <= Math.floor(rs.length / 3); ii++) {
    value = rs.replace(/([0-9])([0-9]{3})([.,])/, '$1.$2$3')
  }

  // if (value.preFixo) {
  return 'R$ ' + value
  // } else {
  //   return value
  // }
})

Vue.filter('maskTe', function (a) {
  return a + '/'
})

Vue.filter('unMaskDoc', function (a) {
  if (a !== null) {
    return a.replace('.', '').replace('-', '').replace('.', '')
  }
})

Vue.filter('formatDate', function (date) {
  return date ? moment(date).format('DD/MM/YYYY') : '-'
})

Vue.filter('dateFormated', function (date) {
  return date.split(' ')[0]
})

Vue.filter('formatDatetime', function (date) {
  return date ? moment(date).format('DD/MM/YYYY HH:mm:ss') : '-'
})

Vue.filter('formatPhone', function (value) {
  if (value) {
    value = value.replace('.', '').replace('-', '').replace('.', '').replace('(', '').replace(')', '').replaceAll(' ', '')

    if (value.length === 11) {
      value = '(' + value.substr(0, 2) + ') ' + value.substr(2, 1) + ' ' + value.substr(3, 4) + '-' + value.substr(7, 6)
      return value
    } else if (value.length === 10) {
      value = '(' + value.substr(0, 2) + ') ' + value.substr(2, 4) + '-' + value.substr(6, 6)
      return value
    } else if (value.length === 13) {
      value = value.substr(0, 3) + ' (' + value.substr(3, 2) + ') ' + value.substr(5, 4) + '-' + value.substr(9, 6)
      return value
    }
  }
})

Vue.filter('formatDatetimeWithoutSeconds', function (date) {
  return date ? moment(date).format('DD/MM/YYYY HH:mm') : '-'
})

Vue.filter('formatDateToHour', function (date) {
  return date ? moment(date).format('HH') + 'h' + moment(date).format('mm:ss') : '-'
})

Vue.filter('truncate', function (string) {
  return string.substring(0, 100) + ' (...)'
})

Vue.filter('toUpperCase', function (value) {
  if (!value) return ''

  value = value.toString()

  return value.charAt(0).toUpperCase() + value.slice(1)
})

Vue.filter('limitText10', function (value) {
  return (value.substr(0, 10) + '...')
})

Vue.filter('limitText', function (value, limit) {
  return (value.length > limit ? value.substr(0, limit) + '...' : value)
})

Vue.filter('clear', function (str, strToRemove) {
  return str.replace(strToRemove, '')
})

Vue.filter('formatCpfCnpj', function (str) {
  if (!str) {
    return false
  }

  str = str.trim()
  if (str.length === 11) {
    return (str.substr(0, 3) + '.' + str.substr(3, 3) + '.' + str.substr(6, 3) + '-' + str.substr(9, 2))
  } else if (str.length === 14) {
    return (str.substr(0, 2) + '.' + str.substr(2, 3) + '.' + str.substr(5, 3) + '/' + str.substr(8, 4) + '-' + str.substr(12, 2))
  }
})