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

This is a web application for viewing trailers, displaying a structure similar to Netflix.

Contents 
The landing page has a `<navbar>` divided into two sections: to the left, there is a logo and two links: to the "Home" page, respectively to a favourites page called "My Likes". To the right, the navbar displays the email address of the logged in user, with a dropdown button to log out. User registration is done with `<Magic Link>`.

The next component is a `<banner>`, which contains a large image for a trailer in the background, with the title, subtitle (description) and a play button displayed over the image.

Lastly, the app has four `<card>` sections displayed as horizontal scrollable lists. Each card displays a thumbnail for a trailer, that scales on hover. Once the user clicks on a thumnail image, a new page modal opens, where the actual trailer can be played.

Initially, for populating the scrollable lists, I implemented the YouTube API method for `Search: list (by keyword)` with `<getServerSideProps>` for retrieving trailers (video, title, thumbnail, id) but I quickly reached my call limit due to data re-rendering on every request. Therefore, I moved all the data from the API in four separate `.json` files (one for each section displayed on the page) and created functions to retrieve and render that data in its respective section.

The `<modal>` has two main parts: an `<iframe>` for playing the trailer video and, underneath, a section with descriptive information (title, published date, plot, channel name & viewcount).

