This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

This is a web application for viewing trailers, displaying structure similar to Netflix.

Components: 
The application has a `<navbar>` which includes a logo, two links to the "Home" page, respectively to a favourites page called "My Likes". Lastly, the navbar displays the email address of the logged in user, with a dropdown button to log out.

The next component is a `<banner>`, which contains the image for a trailer in the background, with the title, subtitle (description) and a play button displayed over the image.

Lastly, the app has four `<card>` sections displayed as horizontal scrollable lists. Each card displays an image for a trailer that scales on hover and once clicked, the user is redirected to a page where they can play the trailer. Most probaly, that will be a modal - to be implemented.

Initially, I implemented the YouTube API method for `Search: list (by keyword)` with `<getServerSideProps>` for but I quickly reached my call limit due to data re-rendering on every request. Therefore, I moved all the data from the API in four separate `.json` files (one for each section displayed on the page) and created functions to retrieve and render that data in its respective section.
