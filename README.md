# Life

Life is a simple event timeline of events important to your life. This repository is a [fork of the original](https://github.com/cheeaun/life) repository with a few updates.

You can have a look at the new life timeline here https://mlevit.github.io/life/.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Features

- Super simple
- No fancy formatting
- No fancy setup
- No fancy effects
- Flexible datetimes because sometimes you don't remember the exact date of an event

### Newly added features

- Event filtering
- Personal avatar (because why not)
- Hashtags to help clasiffy your events (optional)
- Notes to add that extra bit of info (optional)
- Vue.js + Vite for a single HTML page design

## How to contribute

1. Fork this project.
2. Write code.
3. Make pull requests.

## How to setup your own _Life_

1. Fork this project.
2. Add your life events into `life.md`.
3. Preview it on a local server. Use [`python -m http.server`](https://docs.python.org/3/library/http.server.html) or [`http-server`](https://github.com/nodeapps/http-server).
4. Commit `life.md`.
5. Tell the world about your Life.

## How to configure your _Life_

Head on over to `src/assets/life.config.json`. There you'll find the following configurable variables:

- `avatarURL` - (_string_, default to `null`) Path to avatar.
- `showAge` - (_boolean_, default to `true`) Option to show age within the year axis.
- `yearLength` - (_number_, default to `120`) The width of the year grids, in pixels.

## Datetime "syntax"

- `2000` - event that happen in that year
- `01/2000` - event that happen in that month/year
- `01/01/2000` - event that happen exactly in that day/month/year
- `2001-2005`, `10/2001-02/03/2005` - event that happen within the two dates
- `~2005` - event that happen around the time in that year
- `2005-~` - event that happen from that year and beyond (now).

## Hashtags

Tags can be added to each event. Simple start each tag with a `#`. They will be automatically parsed up and added to the timeline.

## Notes

Notes can be added to each event. Simple enclose the note within curly braces `{}`. They will be automatically parsed and added to the timeline as a tooltip.

## Todo

- [x] Cleanup of JavaScript file
- [x] Replace CSS file with Tailwind CSS
- [x] Avatar
- [x] Better way to visualise links inside events
- [x] Event filtering / search by title or tag
- [x] Event notes

## License

[MIT](https://opensource.org/licenses/MIT)
