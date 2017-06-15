const test = require(`ava`)
const { parseBuf } = require(`./`)

test(`chcase parseBuf correctly changes case to default camelCase`, t => {
  t.plan(1)
  t.is(parseBuf(Buffer.from(`beep boop`, `utf8`)), `beepBoop`)
})
