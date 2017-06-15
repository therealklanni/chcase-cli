[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/therealklanni/chcase-cli/master/LICENSE)
[![Build Status](https://img.shields.io/travis/therealklanni/chcase-cli.svg)](https://travis-ci.org/therealklanni/chcase-cli)
[![npm](https://img.shields.io/npm/v/chcase-cli.svg)](https://www.npmjs.com/package/chcase-cli)
[![prettier](https://img.shields.io/badge/style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# chcase-cli

> Convert names to specified case, i.e. camel case.

## Install

```
yarn global add chcase-cli
```

Or

```
npm install --global chcase-cli
```

## Usage

```
chcase [option] input
chcase -C camel input
chcase -c input
cat list-of-names.txt | chcase -k

Set output case:
  --case, -C  Which case to convert to
        [string] [choices: "camel", "kebab", "lower", "snake", "start", "upper"]

Shortcuts for --case [name]:
  --camel, -c  camelCase                                               [boolean]
  --kebab, -k  kebab-case                                              [boolean]
  --lower, -l  lowercase                                               [boolean]
  --snake, -s  snake_case                                              [boolean]
  --start, -t  Start Case                                              [boolean]
  --upper, -u  UPPERCASE                                               [boolean]

Options:
  --help  Show help                                                    [boolean]
```

#### License

MIT © [therealklanni](https://github.com/therealklanni)
