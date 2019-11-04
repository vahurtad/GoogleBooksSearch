# Work Orders

_This app needs an API key under Books.js to fetch a query from Google API_

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

# Project

This app was created with the help of this repo on how to use NextJS with data fetching: [example](https://github.com/zeit/next.js/tree/canary/examples/data-fetch)

This web app is calling one APIs and only calls the books with a given query.
I am using `componentDidMount()` as I needed to use props from parent component to child. I am also calling `componentDidUpdate()` to make sure data does not keep fetching unless there is a change in query so the browser will not keep fetching and reloading.

I also decided to use [grommet](https://v2.grommet.io/) as an easy theme and framework for my components so I could focus on how to build this app and used a linter to stylistic errors which keeps my code very organized and easy to read.

### Challenges

There were three challenges and one of them was thinking how to make the search work for only the query as I had to use the API and save the correct data for a `favorites` list. First I found my component from grommet (which was easy) then I had to find a way to use the input value to show me right query.
The second challenge was saving data for a list from multiple queries which I ended up just saving data locally instead of only saving the id and then making a query from the API. This would save time and speed as there is no need to do another query.

### Better

I can make this app better by changing the design, colors and theme to make it more appealing towards the user. Another change I would fix the loading screens to show a better design.
