import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import SettingsPage from './SettingsPage';
import './admin-styles.css'; // Admin-specific styles

const App = () => {
    
    // Determine the current page from the URL query string
    const urlParams = new URLSearchParams( window.location.search );
    const currentPage = urlParams.get( 'page' );

    // Default route
    return <SettingsPage />;
};

/**
 * Initialize the React Admin Interface
 */
domReady(() => {
    const rootElement = document.getElementById('marcels-easy-socials-admin-app');//should be same as the div id in the PHP render function
    
    if (rootElement) {
        const root = createRoot(rootElement);
        root.render(<App />);
    }
});


