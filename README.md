# House of Fluid Reflections website

Static site for House of Fluid Reflections. Plain HTML and CSS, no build step, hosted on Cloudflare Pages. The shop and checkout live in the Square Online store; this site links to each item there.

## Structure

```
index.html              Home (Bodies of Creation)
shop/index.html         Shop grid, rendered from data/products.json
yolandamarie/           Yani's page
shaah/                  Shaah's page, plus stub pages for Visuals, Music, Photography, Canvas Art
contact/                Contact page
404.html                Not-found page
assets/css/site.css     All styling. Colors and fonts are set at the top.
assets/js/shop.js       Shop grid and collection filter
assets/img/             Logo and icons
data/products.json      Shop items, in display order
_redirects              Old Squarespace URLs mapped to new ones (Cloudflare Pages)
_headers                Security and caching headers (Cloudflare Pages)
```

## Common edits

**Reorder or add shop items.** Edit `data/products.json`. Items show in the order listed. Each item needs `name`, `price`, `category`, `url` (the product page on the Square store) and `image`. Categories must match an `id` in the `categories` list.

**Change colors or fonts.** Edit the variables at the top of `assets/css/site.css`.

**Change page text.** Edit the page's `index.html` directly.

## Deploying (Cloudflare Pages)

1. Cloudflare dashboard: Workers & Pages → Create → Pages → Connect to Git → choose `betweenkeys/hfr-site`.
2. Production branch: `main`. Framework preset: None. Build command: leave empty. Build output directory: `/`.
3. Save and deploy. The site appears at a `*.pages.dev` address.
4. When ready to go live: Custom domains → add the domain. Cloudflare walks through DNS. Copy any email (MX/TXT) records before switching nameservers.

Every push to `main` redeploys automatically.

## Open items before launch

- Images on the home, Yani and Shaah pages still load from Squarespace's image server. Replace them with files in `assets/img/` before Squarespace is cancelled.
- Fonts are free stand-ins (Libre Bodoni, Libre Caslon Text). The originals are LTC Bodoni 175 and Adobe Caslon Pro (Adobe Fonts).
- Contact email is a placeholder (`CONTACT_EMAIL_TBD` in `contact/index.html`).
- Shaah's Visuals, Music, Photography and Canvas Art pages are stubs.
- Newsletter signup is replaced by a link to the free Patreon tier.
