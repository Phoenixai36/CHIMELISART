
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string[];
  author?: string;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image = '/logo.png',
  url = window.location.href,
  type = 'website',
  keywords = ['Francesc Chimelis', 'Arte Contemporáneo', 'Surrealismo Figurativo', 'Galería Virtual', 'Barcelona Art', 'Pintura', 'Literatura'],
  author = 'Francesc Chimelis'
}) => {
  useEffect(() => {
    // Update Title
    document.title = title;

    // Helper function to update or create meta tags
    const setMetaTag = (attrName: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Standard Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords.join(', '));
    setMetaTag('name', 'author', author);
    setMetaTag('name', 'robots', 'index, follow');
    setLinkTag('canonical', url);

    // Open Graph / Facebook
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:site_name', 'CHIMELISART');
    if (image) {
      setMetaTag('property', 'og:image', window.location.origin + image);
    }

    // Twitter
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:url', url);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    if (image) {
      setMetaTag('name', 'twitter:image', window.location.origin + image);
    }

    // JSON-LD Schema.org
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "Person",
        "name": "Francesc Chimelis",
        "alternateName": "Chimelis Art",
        "jobTitle": "Contemporary Artist & Writer",
        "url": url,
        "location": {
          "@type": "Place",
          "name": "Barcelona, Spain"
        },
        "sameAs": [
          "https://www.instagram.com/fchimelis",
          "https://www.facebook.com/francesc.chimelis",
          "https://www.linkedin.com/in/francescchimelis",
          "https://www.pinterest.com/fchimelis"
        ],
        "description": "Francesc Chimelis is a multifaceted contemporary artist from Barcelona specializing in figurative surrealism and literary works.",
        "image": window.location.origin + "/logo.png"
      },
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        "url": url,
        "name": "CHIMELISART",
        "alternateName": "Francesc Chimelis Virtual Gallery",
        "description": description,
        "publisher": {
          "@type": "Organization",
          "name": "CHIMELISART",
          "logo": window.location.origin + "/logo.png"
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Gallery",
            "item": url + "#gallery"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Written Works",
            "item": url + "#written-works"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Acquisition",
            "item": url + "#acquisition"
          }
        ]
      }
    ];

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.innerHTML = JSON.stringify(schemaOrgJSONLD);

  }, [title, description, image, url, type, keywords, author]);

  return null;
};

export default SEO;
