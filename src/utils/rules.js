import { required, digits, email, max, min, regex } from 'vee-validate/dist/rules'
import { extend, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('digits', {
  ...digits,
  message: '{_field_} precisa ser de {length} digitos. ({_value_})',
})

extend('required', {
  ...required,
  message: '{_field_} não pode ficar vazio',
})

extend('max', {
  ...max,
  message: '{_field_} não pode ser maior que {length} characteres',
})

extend('min', {
  ...min,
  message: '{_field_} não pode ter menos que {length} characteres',
})

extend('regex', {
  ...regex,
  message: '{_field_} {_value_} não são iguais {regex}',
})

extend('email', {
  ...email,
  message: 'E-mail não é válido',
})