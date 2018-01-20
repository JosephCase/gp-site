'use strict';

const assetManifest = require('../build/asset-manifest.json');
const bundlePath = assetManifest['main.js'];
const stylePath = assetManifest['main.css'];

exports.render = (html, state) => {

	return (
		`<!DOCTYPE html>
		<html lang="en">

		<head>
		    <meta charset="utf-8">
		    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">

		    <meta property='og:image' content='http://www.giusypirrotta.com/shareImg.jpg'/>
		    <link rel="image_src" href="http://www.giusypirrotta.com/shareImg.jpg" / >

		    <meta name="theme-color" content="#000000">
		    <link rel="manifest" href="/manifest.json">
		    <link rel="shortcut icon" href="/favicon.ico">
		    <title>artist: Giusy Pirrotta</title>
		    <link href='/${stylePath}' rel="stylesheet">
		</head>

		<body>
		    <noscript>You need to enable JavaScript to run this app.</noscript>
		    <div id="root">${html}</div>
		    <script>
	        	window.__PRELOADED_STATE__ = ${JSON.stringify(state).replace(/</g, '\\u003c')}
	        </script>
		    <script type="text/javascript" src='/${bundlePath}'></script>
		</body>

		</html>`
	)
}