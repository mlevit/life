# Life

Life is a simple event timeline of events important to your life. This repository is a [fork of the original](https://github.com/cheeaun/life) repository with a few updates.

- Update style sheet utilising Tailwind CSS where possible
- Easier to read dates
- Event tagging

You can have a look at the new life timeline here https://mlevit.github.io/life/.

## Features

- Super simple
- No fancy formatting
- No fancy setup
- No fancy effects
- Flexible datetimes because sometimes you don't remember the exact date of an event
- Hashtags to clasiffy your events (optional)

## How to contribute

1. Fork this project.
2. Write code.
3. Make pull requests.

## How to setup your own _Life_

1. Fork this project.
2. Add your life events into `life.md`.
3. Preview it on a local server. Use [`python -m http.server`](https://docs.python.org/3/library/http.server.html) or [`http-server`](https://github.com/nodeapps/http-server).
4. Commit `life.md`.
5. Update the website link in your GitHub repo description.
6. Tell the world about your Life.

## How to configure your _Life_

- `customStylesheetURL` - (_string_, default to `null`) Path to a custom stylesheet file, for those who doesn't like the default _theme_.
- `yearLength` - (_number_, default to `120`) The width of the year grids, in pixels.
- `hideAge` - (_boolean_, default to `false`) Option to hide age from year axis.

## Datetime "syntax"

- `2000` - event that happen in that year
- `01/2000` - event that happen in that month/year
- `01/01/2000` - event that happen exactly in that day/month/year
- `2001-2005`, `10/2001-02/03/2005` - event that happen within the two dates
- `~2005` - event that happen around the time in that year
- `2005-~` - event that happen from that year and beyond (now).

## Hashtags

Tags can be added to each event line. Simple place them at the end of the event and start them with a `#`.

## Todo

- [ ] Better way to visualise links inside events
- [ ] Replace CSS file with Tailwind CSS
- [ ] Cleanup of JavaScript file
- [ ] Event filtering /search by title or tag

## License

[MIT](https://opensource.org/licenses/MIT)
