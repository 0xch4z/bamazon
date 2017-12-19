const genericHandler = (err, type) => {
  console.error(`${type}: ${err.message}`)
  console.trace(err.stack)
  process.exit(1)
}

process.on('uncaughtException', err => genericHandler(err, 'Uncaught exception'))
process.on('unhandledRejection', err => genericHandler(err, 'Unhandled rejection'))

process.on('exit', () => {
  if (process.exitCode === 0) {
    console.log('✨ Goodbye!')
  }
})

console.log('\x1Bc')
