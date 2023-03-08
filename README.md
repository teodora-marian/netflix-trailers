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

Lastly, the app has multiple `<card>` sections displayed as horizontal lists. Each card displays an image for a trailer that increases in size on hover and once clicked, the user is redirected to a page where they can play the trailer.
