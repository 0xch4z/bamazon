import { prompt } from 'inquirer'

export default (opts) => {
  return new Promise((resolve => {
    const multi = opts instanceof Array
    const $opts = multi ? opts : [ { ...opts, name: 'res' } ]
    prompt($opts).then((res) => resolve(multi ? res : res.res))
  }))
}
