#!/usr/bin/env node
const fs = require(`fs`)
const { resolve } = require(`path`)
const yargs = require(`yargs`)
const split = require(`split`)
const utf8 = require(`utf8-stream`)
const map = require(`map-stream`)
const {
  first,
  keys,
  pick,
  pickBy,
  partial,
  flow,
  identity,
  camelCase,
  kebabCase,
  lowerCase,
  snakeCase,
  startCase,
  upperCase
} = require(`lodash`)

const _ = partial.placeholder
const choices = [`camel`, `kebab`, `lower`, `snake`, `start`, `upper`]

const argv = yargs
  .usage(
    `$0 [option] input
$0 -C camel input
$0 -c input
cat list-of-names.txt | $0 -k`
  )
  .options({
    case: {
      alias: `C`,
      choices,
      describe: `Which case to convert to`,
      group: `Set output case:`,
      requiresArg: `name`,
      type: `string`
    },
    camel: {
      alias: `c`,
      describe: `camelCase`,
      group: `Shortcuts for --case [name]:`,
      type: `boolean`
    },
    kebab: {
      alias: `k`,
      describe: `kebab-case`,
      group: `Shortcuts for --case [name]:`,
      type: `boolean`
    },
    lower: {
      alias: `l`,
      describe: `lowercase`,
      group: `Shortcuts for --case [name]:`,
      type: `boolean`
    },
    snake: {
      alias: `s`,
      describe: `snake_case`,
      group: `Shortcuts for --case [name]:`,
      type: `boolean`
    },
    start: {
      alias: `t`,
      describe: `Start Case`,
      group: `Shortcuts for --case [name]:`,
      type: `boolean`
    },
    upper: {
      alias: `u`,
      describe: `UPPERCASE`,
      group: `Shortcuts for --case [name]:`,
      type: `boolean`
    }
  })
  .help().argv

let method
const findMethod = flow(partial(pick, _, choices), partial(pickBy, _, identity), keys, first)
const methodMap = {
  camel: camelCase,
  kebab: kebabCase,
  lower: lowerCase,
  snake: snakeCase,
  start: startCase,
  upper: upperCase
}

if (!argv.C && !argv.c && !argv.k && !argv.l && !argv.s && !argv.t && !argv.u) {
  method = camelCase
} else {
  method = methodMap[findMethod(argv) || argv.C]
}

const parseBuf = buf => {
  const bufStr = buf.toString()

  if (bufStr) {
    const output = method(bufStr)

    console.log(output)

    return output
  }
}

const parseStream = stream => stream.pipe(utf8()).pipe(split()).pipe(map(parseBuf))

if (!process.stdin.isTTY) {
  parseStream(process.stdin)
} else {
  const output = method(argv._.map(method).join(`_`))

  console.log(output)
}

module.exports = { parseBuf }
