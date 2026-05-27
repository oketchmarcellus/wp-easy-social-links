/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
import { createRoot } from '@wordpress/element';
import SocialsListRenderer from './socialsListRender';


/* eslint-disable no-console */
// console.log( 'Hello World! (from create-block-marcels-socials-plugin block)' );
/* eslint-enable no-console */

const viewEasySocials = () => {
	// Locate all block instances on the page that haven't been rendered yet and render them
	document.querySelectorAll( '.wp-easy-social-links-item-container:not([data-rendered="true"])' ).forEach( ( container ) => {
		try {
			const payload = JSON.parse( container.dataset.config || '{}' );
			const hasSocials = payload.social?.some( row => row.label || row.logo );
			
			// Skip block rendering if it's set to be hidden or has no social links
			if ( ! payload.showHideSocials || ! hasSocials ) {
				container.remove();
				return;
			}
			// Render the React component into the container
			createRoot( container ).render( <SocialsListRenderer socialData={ payload } /> );
			container.dataset.rendered = 'true';
		} catch ( err ) {
			console.error( 'WP Easy Social Links Render Error:', err );
		}
	} );
};
// Run the rendering function on initial page load and whenever new content is loaded (e.g., via AJAX)
if ( document.readyState === 'loading' ) {
	document.addEventListener( 'DOMContentLoaded', viewEasySocials );
} else {
	viewEasySocials();
}
