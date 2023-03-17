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

Contents:
The landing page has a `<navbar>` divided into two sections: to the left, there is a logo and two links: to the "Home" page, respectively to a favourites page called "My Likes". To the right, the navbar displays the email address of the logged in user, with a dropdown button to log out. User registration is done via `Magic Link`.

The next component is a `<banner>`, which contains a large image for a trailer in the background, with the title, subtitle (description) and a play button displayed over the image.

Lastly, the app has four `<card>` sections displayed as horizontal scrollable lists. For populating the scrollable lists, I implemented the YouTube API method `Search: list (by keyword)` with `<getServerSideProps>`. Each card in the sections displays a thumbnail for a trailer, that scales on hover.

Once the user clicks on a thumnail image, a new page `<Modal>` opens, where the actual trailer can be played. The data is fetched via YouTube API again and rendered inside an `<iframe>` with a video player. Under the player, there is a section with descriptive information (title, published date, description, channel name & viewcount) also fetched from the API.

