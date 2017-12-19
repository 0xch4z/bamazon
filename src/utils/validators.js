const $interface = {}

$interface.isMoney = n => {
  let $n = typeof n === 'string' ? parseFloat(n) : n
  $n = $n.toFixed(2)
  return (/^\d+\.\d{2}$/.test($n)) 
}

$interface.isPositiveInteger = n => !isNaN(n) && n > 0 && n % 1 === 0

export default $interface
