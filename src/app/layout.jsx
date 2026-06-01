import '../index.css';

export const metadata = {
  title: 'Splendin - Credit Card Portal',
  description: 'Splendin is a simple and innovative credit card dashboard offering secure, fast, and bank-grade credit card management services.',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#00abec" />
        {/* Google Fonts — all 5 font families preloaded */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=Roboto:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Splendin",
              "url": "https://www.splendin.com/",
              "logo": "https://www.splendin.com/favicon.png",
              "sameAs": [
                "https://www.facebook.com/splendin",
                "https://twitter.com/splendin",
                "https://www.linkedin.com/company/splendin"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Splendin",
              "url": "https://www.splendin.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.splendin.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
}
