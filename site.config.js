// Site-wide details used by the blog generator and SEO tags.
// Change these once and every generated page, the sitemap and the RSS feed follow.
export default {
  name: 'Waldos',
  // Your live domain, no trailing slash. Used for canonical links, sitemap and RSS.
  url: 'https://www.example.com',
  description:
    'A little back garden cafe in Fitzroy, and an old two storey house that turns into a house party every Friday and Saturday night.',
  locale: 'en_AU',
  address: {
    locality: 'Fitzroy',
    region: 'VIC',
    postcode: '3065',
    country: 'AU',
  },
  // Garden cafe opening hours (24h), every day. Used for Google's opening hours.
  hours: [
    { opens: '05:30', closes: '11:00' },
    { opens: '15:30', closes: '19:00' },
  ],
};
