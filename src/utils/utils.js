/**
 * Biblioteca de funcoes disponibilizadas em todo o sistema
 */

/**
 * Funcao para gerar cores aleatoriamente
 * 
 * @param {*} opacidade 
 * @returns 
 */
export function colorRandom (opacidade = 1) {
    let r = Math.random() * 255
    let g = Math.random() * 255
    let b = Math.random() * 255

    return `rgba(${r}, ${g}, ${b}, ${opacidade})`
}

/**
 * Funcao para validar numero de CPF
 * 
 * @param {*} cpf 
 * @returns 
 */
export function isCPFValid (cpf) {
  let sum = 0
  let rest = 0

  if (!cpf) {
    return false
  }

  cpf = cpf.replaceAll(/\.|-/gm, '')

  if (cpf == "00000000000") {
  return false
  }

  let re = new RegExp(/(\d)\1{10}/)

  if(re.exec(cpf)) {
    return false
  }

  for (let i = 1; i <= 9; i++) {
    sum = sum + (parseInt(cpf.substring(i-1, i)) * (11 - i))
  }

  rest = (sum * 10) % 11

  if ((rest == 10) || (rest == 11)) {
    rest = 0
  }

  if (rest != parseInt(cpf.substring(9, 10)) ) {
    return false
  }

  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i)
  }

  rest = (sum * 10) % 11

  if ((rest == 10) || (rest == 11)) {
    rest = 0
  }

  if (rest != parseInt(cpf.substring(10, 11))) {
    return false
  }

  return true
}

/**
 * 
 * @param {String} value 
 * @returns Base64
 */
export function encryptBase64 (value) {
  return window.btoa(value)
}

/**
 * 
 * @param {String} operation 
 * @param {String} nameKey 
 * @param {JSON} obj 
 * @returns JSON
 */
export function saveRestoreSorting (operation = null, nameKey = null, obj = null) {

  if (operation === null && (operation !== 'save' && operation !== 'restore')) return

  if (operation === 'save') {
    
    if (obj.sortBy.length > 0) {

      const sorting = JSON.stringify({ sortBy: obj.sortBy, sortDesc: obj.sortDesc })
      localStorage.setItem(nameKey, sorting)

    } else {
      localStorage.removeItem(nameKey)
    }
  }

  if (operation === 'restore') {
    return JSON.parse(localStorage.getItem(nameKey))
  }

  return
}

/**
 * 
 * @param {String} plain 
 * @returns String
 */
export function convertToRtf (plain) {
  plain = plain.replace(/ç/g, "\\'e7")
  plain = plain.replace(/Ç/g, "\\'c7")
  plain = plain.replace(/À/g, "\\'c0")
  plain = plain.replace(/Á/g, "\\'c1")
  plain = plain.replace(/Â/g, "\\'c2")
  plain = plain.replace(/Ã/g, "\\'c3")
  plain = plain.replace(/Ä/g, "\\'c4")
  plain = plain.replace(/È/g, "\\'c8")
  plain = plain.replace(/É/g, "\\'c9")
  plain = plain.replace(/Ê/g, "\\'ca")
  plain = plain.replace(/Ë/g, "\\'cb")
  plain = plain.replace(/Ì/g, "\\'cc")
  plain = plain.replace(/Í/g, "\\'cd")
  plain = plain.replace(/Î/g, "\\'ce")
  plain = plain.replace(/Ï/g, "\\'cf")
  plain = plain.replace(/Ò/g, "\\'d2")
  plain = plain.replace(/Ó/g, "\\'d3")
  plain = plain.replace(/Ô/g, "\\'d4")
  plain = plain.replace(/Õ/g, "\\'d5")
  plain = plain.replace(/Ö/g, "\\'d6")
  plain = plain.replace(/Ù/g, "\\'d9")
  plain = plain.replace(/Ú/g, "\\'da")
  plain = plain.replace(/Û/g, "\\'db")
  plain = plain.replace(/Ü/g, "\\'dc")
  plain = plain.replace(/à/g, "\\'e0")
  plain = plain.replace(/á/g, "\\'e1")
  plain = plain.replace(/â/g, "\\'e2")
  plain = plain.replace(/ã/g, "\\'e3")
  plain = plain.replace(/ä/g, "\\'e4")
  plain = plain.replace(/è/g, "\\'e8")
  plain = plain.replace(/é/g, "\\'e9")
  plain = plain.replace(/ê/g, "\\'ea")
  plain = plain.replace(/ë/g, "\\'eb")
  plain = plain.replace(/ì/g, "\\'ec")
  plain = plain.replace(/í/g, "\\'ed")
  plain = plain.replace(/î/g, "\\'ee")
  plain = plain.replace(/ï/g, "\\'ef")
  plain = plain.replace(/ò/g, "\\'f2")
  plain = plain.replace(/ó/g, "\\'f3")
  plain = plain.replace(/ô/g, "\\'f4")
  plain = plain.replace(/õ/g, "\\'f5")
  plain = plain.replace(/ö/g, "\\'f6")
  plain = plain.replace(/ù/g, "\\'f9")
  plain = plain.replace(/ú/g, "\\'fa")
  plain = plain.replace(/û/g, "\\'fb")
  plain = plain.replace(/ü/g, "\\'fc")
  plain = plain.replace(/"/g, "\\ldblquote ")
  plain = plain.replace(/"/g, "\\rdblquote")
  plain = plain.replace(/º/g, "\\'ba")
  plain = plain.replace(/§/g, "\\'a7")
  plain = plain.replace(/·/g, "\\'b7")
  plain = plain.replace(/<strong>/g, "\\b ")
  plain = plain.replace(/<\/strong>/g, "\\b0")
  plain = plain.replace(/<em>/g, "\\i\\f1")
  plain = plain.replace(/<\/em>/g, "\\i0\\f0")
  plain = plain.replace(/<u>/g, "\\ul")
  plain = plain.replace(/<\/u>/g, "\\ulnone")
  plain = plain.replace(/&lt;/g, "<")
  plain = plain.replace(/&gt;/g, ">")
  plain = plain.replace(/<\/a>/g, "\\cf0")
  plain = plain.replace(/<a>/g, "\\cf1")

  plain = plain.replace(/\n/g, "\\par\n")
  return "{\\rtf1\\ansi\\ansicpg1252\\deff0\\deflang2057{\\fonttbl{\\f0\\fnil\\fcharset0 Microsoft Sans Serif;}}\n\\viewkind4\\uc1\\pard\\f0\\fs17 " + plain + "\\par\n}"
}

/**
 * 
 * @param {String} rtf 
 * @returns String
 */
export function convertToPlain (rtf) {
  rtf = rtf.replace(/\\'e7/g, "ç")
  rtf = rtf.replace(/\\'c7/g, "Ç")
  rtf = rtf.replace(/\\'c0/g, "À")
  rtf = rtf.replace(/\\'c1/g, "Á")
  rtf = rtf.replace(/\\'c2/g, "Â")
  rtf = rtf.replace(/\\'c3/g, "Ã")
  rtf = rtf.replace(/\\'c4/g, "Ä")
  rtf = rtf.replace(/\\'c8/g, "È")
  rtf = rtf.replace(/\\'c9/g, "É")
  rtf = rtf.replace(/\\'ca/g, "Ê")
  rtf = rtf.replace(/\\'cb/g, "Ë")
  rtf = rtf.replace(/\\'cc/g, "Ì")
  rtf = rtf.replace(/\\'cd/g, "Í")
  rtf = rtf.replace(/\\'ce/g, "Î")
  rtf = rtf.replace(/\\'cf/g, "Ï")
  rtf = rtf.replace(/\\'d2/g, "Ò")
  rtf = rtf.replace(/\\'d3/g, "Ó")
  rtf = rtf.replace(/\\'d4/g, "Ô")
  rtf = rtf.replace(/\\'d5/g, "Õ")
  rtf = rtf.replace(/\\'d6/g, "Ö")
  rtf = rtf.replace(/\\'d9/g, "Ù")
  rtf = rtf.replace(/\\'da/g, "Ú")
  rtf = rtf.replace(/\\'db/g, "Û")
  rtf = rtf.replace(/\\'dc/g, "Ü")
  rtf = rtf.replace(/\\'e0/g, "à")
  rtf = rtf.replace(/\\'e1/g, "á")
  rtf = rtf.replace(/\\'e2/g, "â")
  rtf = rtf.replace(/\\'e3/g, "ã")
  rtf = rtf.replace(/\\'e4/g, "ä")
  rtf = rtf.replace(/\\'e8/g, "è")
  rtf = rtf.replace(/\\'e9/g, "é")
  rtf = rtf.replace(/\\'ea/g, "ê")
  rtf = rtf.replace(/\\'eb/g, "ë")
  rtf = rtf.replace(/\\'ec/g, "ì")
  rtf = rtf.replace(/\\'ed/g, "í")
  rtf = rtf.replace(/\\'ee/g, "î")
  rtf = rtf.replace(/\\'ef/g, "ï")
  rtf = rtf.replace(/\\'f2/g, "ò")
  rtf = rtf.replace(/\\'f3/g, "ó")
  rtf = rtf.replace(/\\'f4/g, "ô")
  rtf = rtf.replace(/\\'f5/g, "õ")
  rtf = rtf.replace(/\\'f6/g, "ö")
  rtf = rtf.replace(/\\'f9/g, "ù")
  rtf = rtf.replace(/\\'fa/g, "ú")
  rtf = rtf.replace(/\\'fb/g, "û")
  rtf = rtf.replace(/\\'fc/g, "ü")
  rtf = rtf.replace(/\\'ba/g, "º")
  rtf = rtf.replace(/\\'a7/g, "§")
  rtf = rtf.replace(/\\'b7/g, "·")
  rtf = rtf.replace(/\\tab/g, " ")
  rtf = rtf.replace(/\\ldblquote /g, "\"")
  rtf = rtf.replace(/\\rdblquote/g, "\"")

  rtf = rtf.replace(/\\par[d]?/g, "")
  
  rtf = rtf.replace(/</g, "&lt;")
  rtf = rtf.replace(/>/g, "&gt;")
  rtf = rtf.replace(/\\b0/g, "</strong>")
  rtf = rtf.replace(/\\b\d?/g, "<strong>")
  rtf = rtf.replace(/\\line/g, "\n")
  rtf = rtf.replace(/\\i0\\f0/g, "</em>")
  rtf = rtf.replace(/\\i\\f1/g, "<em>")
  rtf = rtf.replace(/\\cf0/g, "</a>")
  rtf = rtf.replace(/\\cf1/g, "<a>")
  rtf = rtf.replace(/\\ulnone/g, "</u>")
  rtf = rtf.replace(/\\ul\d?/g, "<u>")

  return rtf.replace(/\{\*?\\[^{}]+}|[{}]|\\\n?[A-Za-z]+\n?(?:-?\d+)?[ ]?/g, "").trim()
}
