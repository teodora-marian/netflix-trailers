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
Also available at https://netflix-trailers.vercel.app/

## Learn More

This is a web application for viewing trailers, displaying a structure similar to Netflix.

Contents:
The login page displays an `<input>` field and a login `<button>` inside a centered `<div>`, over a background image comprised of movie posters. The Netflix logo is displayed at the top left corner, and it serves as a `<Link>` to the Home page, after the user logs in.

Authentication is managed with `Magic Link SDK`: user types in their email address and presses the login button on the page. Then, a confirmation link is sent to their inbox. By accessing the provided link, login is confirmed and the user is instructed to return to the original tab/window for Netflix Trailers.

User registration, uniqueness check and activity stats (liked videos, watched videos) are managed in `Hasura` database.

Once the user is logged in, they can access the Home page. Components: 
1. A `<navbar>` divided into two sections: to the left, the Netflix logo and two links: to the "Home" page, respectively to a favourites page called "My Likes". To the right, the navbar displays the email address of the logged in user, with a dropdown button to log out. 

2. A `<banner>`, which contains a large image for a trailer in the background, with the title, subtitle (description) and a play button displayed over the image.

3. `<card>` sections displayed as horizontal scrollable lists. For populating the scrollable lists, I implemented the YouTube API method `Search: list (by keyword)` with `<getServerSideProps>`. Each card in the sections displays a thumbnail for a trailer, that scales on hover.

Once the user clicks on a thumnail image, a new page `<Modal>` opens, where the actual trailer can be played. The data is fetched via YouTube API again and rendered inside an `<iframe>` with a video player. Under the player, there is a section with descriptive information (title, published date, description, channel name & viewcount) also fetched from the API. The `<iframe>` also includes two buttons: Like/Dislike. 

Actions done by the user in the `<Modal>` page (viewing the content, likes/dislikes) are sent to the `Hasura` database through an internal API. Therefore, if the user signs out and signs back in, their data will be preserved: watched videos will be listed under `<Watch It Again>` card section on the Home page, liked videos will be displayed in a grid view on the `<My Likes>` page.

