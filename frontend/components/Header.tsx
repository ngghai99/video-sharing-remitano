import React from 'react';

export default function Header() {
  return (
    <head>
      <meta charSet="utf-8" />
      <title>Video Sharing</title>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=5"
        data-testid="viewport-meta"
      />
      <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
      <link rel="icon" href="/images/favicon.png" type="image/x-icon" />
    </head>
  );
}
