# FORMA

A minimal editorial portfolio of twenty AI-generated model and product campaign concepts.

The separate **By product** page (`dist/products.html`) organizes 57 images by product and audience: Women, Men, and Unisex. It includes sarees, purses, crop tops, tops, bottoms, kurtas, beauty, eyewear, jewelry, footwear, fragrance, watches, audio, and home & drinkware. Categories describe the featured product; audiences describe campaign styling. Product filters can be combined with audience filters and shared through the page URL.

## Preview

Open `dist/index.html` in a browser. No installation or build step is required.

## Deploy to Netlify

Import this GitHub repository in Netlify. The included `netlify.toml` sets the publish directory to `dist`. Leave the build command empty.

## Customize

- Campaign titles, descriptions, categories, and image filenames: `dist/app.js`
- Page content: `dist/index.html`
- Styling: `dist/style.css`
- Product catalog content: `dist/products-data.js`
- Product catalog behavior and styling: `dist/products.js`, `dist/products.css`
- Campaign images: `dist/assets/`

The images are illustrative AI-generated concept work, not commissioned brand photography.

## Project enquiries

The project brief form sends name, reply email, brand/product, and campaign idea to `https://formspree.io/f/xrppwzbj`. It uses the `@formspree/ajax@1` CDN library for submission states, inline validation errors, and an in-page success message. The normal HTML `POST` action is retained as a fallback if the library cannot load. No build step, server, or secret key is needed.

Form configuration and lifecycle messages are in `dist/formspree.js`. Form markup is in `dist/index.html`. Test actual delivery from the hosted HTTPS website; the Formspree account's verification and domain settings still apply. No live test enquiry was sent during integration.

Every product category now contains at least four images. The product index contains 57 images in 14 categories. Generation briefs for the category expansion are recorded in `category-image-prompts.json`.
