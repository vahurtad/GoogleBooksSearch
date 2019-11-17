# Book Search using Google Books

~~_This app needs an API key under Books.js to fetch a query from Google API_~~

~~Make your API from the Google Developers Site [https://console.developers.google.com/](https://console.developers.google.com/) and the token `const key = 'YOUR_KEY_GOES_HERE';` under `Books.js`~~

# Project

## CLI

For the command line application I used the package `node-fetch` to connect to Google Books and make a query. I also used `Inquirer` as an interactive command line user interface that would help the user steps on what they need to do. Instead of using an array to store the favorites data, I used `configstore` to easily load and write data in a JSON format which was very easy to setup. For easier reading in any command line interface, I am using `chalk` which helps me style strings in the terminal.

### How to run

There are two ways to run this program:

1. Run `npm link` which will create a symlink that link any bins in the package to {prefix}/bin/{name}. [Docs](https://docs.npmjs.com/cli/link.html)

2. Then run the program:
   `g-books`

Or just run the program with:
`./bin/outside`

### Challenges

One big was trying to find a way to make it easier for the user to save to their reading list. Using the interactive interface, does make it very easy fo the user to follow the commands and it is very helpful for the user to just input and index of the top 5 query results instead of retyping the title or id of the book.

### Better

One thing that could make this CLI better, would be to write better tests. I tried my best by following examples and reading but it definitely needs more work.

I aslo think I could make the interactive interface recursive, like asking the user to make another queryafter they are done with the first one or going back to making a query from checking their reading list.

### Tools Used

[Chalk](https://github.com/chalk/chalk), [Inquirer](https://github.com/SBoudrias/Inquirer.js/), [Figlet](https://github.com/patorjk/figlet.js), [node-fetch](https://github.com/bitinn/node-fetch), [configstore](https://github.com/yeoman/configstore), [jest](https://jestjs.io/)

## React

This app was created with the help of this repo on how to use NextJS with data fetching: [example](https://github.com/zeit/next.js/tree/canary/examples/data-fetch)

This web app is calling one APIs and only calls the books with a given query.
I am using `componentDidMount()` as I needed to use props from parent component to child. I am also calling `componentDidUpdate()` to make sure data does not keep fetching unless there is a change in query so the browser will not keep fetching and reloading.

I also decided to use [grommet](https://v2.grommet.io/) as an easy theme and framework for my components so I could focus on how to build this app and used a linter to stylistic errors which keeps my code very organized and easy to read.

### How to run

Install required **dependencies** under the root directory, then run `dev` command:

```bash
npm install
npm run dev
# or
yarn
yarn dev
```

then you will be directed to open your browser to this page `http://localhost:3000` to see the final product!

You can also find this web app online : [https://googlebooks.vanessahurtado.now.sh/](https://googlebooks.vanessahurtado.now.sh/)

It was deployed using [Now](https://github.com/zeit/now)

### Challenges

There were three challenges and one of them was thinking how to make the search work for only the query as I had to use the API and save the correct data for a `favorites` list. First I found my component from `grommet` (which was easy) then I had to find a way to use the input value to show me right query.
The second challenge was saving data for a list from multiple queries which I ended up just saving data in an array instead of only saving the id and then making a query from the API. This would save time and speed as there is no need to do another query.

Another challenge was trying to figure out how to fix the flickering that happens during a refresh of the website. I was able to find an example from this link: [NextJS/styled-components](https://github.com/zeit/next.js/tree/canary/examples/with-styled-components)

### Better

I can make this app better by changing the design, colors and theme to make it more appealing towards the user. Another change I would fix the loading screens to show a better design. Lastly I would keep the favorites saved under a configstore to save the favorites list instead of an array and also find a way to delete from favorites.

### Tools Used

React, Grommet, NextJS
