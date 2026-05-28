<?php
/**
 * Plugin Name:       WP Easy Social Links
 * Description:       A simple plugin to add easy social media links to your WordPress site.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Marcel Oketch
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-easy-social-links
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// SEC HARDENING
$wp_easy_socials_links_security_file = plugin_dir_path( __FILE__ ) . 'includes/sanitizer.php';
if ( file_exists( $wp_easy_socials_links_security_file ) ) {
    require_once $wp_easy_socials_links_security_file;
}

// LOAD DEFAULTS AND GENERATOR FUNCTION
$wp_easy_socials_links_defaults_file = plugin_dir_path( __FILE__ ) . 'includes/defaults.php';
if ( file_exists( $wp_easy_socials_links_defaults_file ) ) {
    require_once $wp_easy_socials_links_defaults_file;
}

/**
 * Plugin Activation Hoook
 */
function wp_easy_social_links_activate_plugin() {
    $existing_options = get_option( 'wp_easy_social_links_data' );

    // Only populate if database options row is blank or uninitialized
    if ( false === $existing_options ) {
        $default_profile = wp_easy_social_links_get_default_settings();
        update_option( 'wp_easy_social_links_data', $default_profile );
    }
}
register_activation_hook( __FILE__, 'wp_easy_social_links_activate_plugin' );


/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */

function wp_easy_socials_links_block_init() {
	if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
		wp_register_block_types_from_metadata_collection( __DIR__ . '/build', __DIR__ . '/build/blocks-manifest.php' );
	}
}
add_action( 'init', 'wp_easy_socials_links_block_init' );



// REGISTER SETTINGS FOR THE REST API

/**
 * Register the settings for the REST API.
 */
add_action( 'init', 'wp_easy_social_links_register_settings' ); 

function wp_easy_social_links_register_settings() {
    register_setting(
        'options', // MUST be exactly 'options' to permit REST endpoint mapping
        'wp_easy_social_links_data', 
        array(
            'type'         => 'object',
            'sanitize_callback' => 'wp_easy_social_links_sanitize_payload',
            'default'           => wp_easy_social_links_get_default_settings(),
            'show_in_rest' => array(
                'schema' => array(
                    'type'       => 'object',
                    'additionalProperties' => true, // Stops WordPress from throwing away your data payload when properties change (Can remove for security hardening if you want to strictly define all properties and prevent any extra data from being saved)
                    'properties' => array(
                        //visuals settings for the frontend block
                        'showHideSocials' => array( 'type' => 'boolean' ),
                        'hasBorder' => array( 'type' => 'boolean' ),
                        'borderWidth' => array( 'type' => 'string', 'pattern' => '^[0-9]+(px|rem|em)$' ),
                        'borderColor' => array( 'type' => 'string', 'pattern' => '^#([A-Fa-f0-9]{3,8})$' ),
                        'linkGap'   => array( 'type' => 'string', 'pattern' => '^[0-9]+(px|rem|em)$' ),
                        'textIconGap' => array( 'type' => 'string', 'pattern' => '^[0-9]+(px|rem|em)$' ),
                        'iconSize'  => array( 'type' => 'string', 'pattern' => '^[0-9]+(px|rem|em)$' ),
                        'iconBgColor' => array( 'type' => 'string', 'pattern' => '^#([A-Fa-f0-9]{3,8})$|^rgba\([^)]+\)$|^transparent$'),
                        'fontSize'  => array( 'type' => 'string', 'pattern' => '^[0-9]+(px|rem|em)$' ), 
                        'fontColor' =>  array( 'type' => 'string', 'pattern' => '^#([A-Fa-f0-9]{3,8})$' ),
                        'showText'      => array( 'type' => 'boolean' ),
                        'labelPosition' => array( 'type' => 'string' ),
                        'social' => array(
                            'type'  => 'array',
                            'items' => array(
                                'type'       => 'object',
                                'properties' => array(
                                    'label' => array( 'type' => 'string' ),
                                    'url'   =>  array( 'type' => 'string', 'format' => 'uri' ),
                                    'logo'  => array( 'type' => 'string' ),
                                ),
                            ),
                        ),
                    ),
                ),
            ),
        )
    );
}



// ADMIN UI & ASSETS
/**
 * Add an admin menu for the plugin Admin settings page.
 * We capture the hook suffix to ensure asset loading is 100% accurate.
 */

add_action( 'admin_menu', 'wp_easy_social_links_add_admin_menu' );

function wp_easy_social_links_add_admin_menu() {
    add_menu_page(
        'Easy Social Links Settings',
        'Easy Social Links',
        'manage_options',
        'wp-easy-social-links-settings',
        'wp_easy_social_links_render_admin_page',
        'dashicons-share-alt',
        57
    );

    //Overwrite parameters for the main submenu
    // add_submenu_page(
    //     'wp-easy-social-links-settings', 
    //     'WP Easy Social Links App Settings',  
    //     '<span class="dashicons dashicons-share"></span> Socials Settings',               
    //     'manage_options',
    //     'wp-easy-social-links-other-media-settings', 
    //     'wp_easy_social_links_render_admin_page'
    // );
}

/**
 * The callback function that outputs the initial HTML.
 */
function wp_easy_social_links_render_admin_page() {
    // wrap class provides standard WP padding and font styles
    echo '<div class="wrap"><div id="wp-easy-social-links-admin-app"></div></div>';
}

add_action( 'admin_enqueue_scripts','wp_easy_social_links_enqueue_admin_assets' );
/**
 * Enqueue the admin JavaScript and CSS assets.
 */
function wp_easy_social_links_enqueue_admin_assets( $hook ) {
    // Only load on our specific admin page
    $allowed_pages = [
        'toplevel_page_wp-easy-social-links-settings',
        //'wp-easy-social-links_page_other-settings-page' 
    ];


    if ( ! in_array( $hook, $allowed_pages ) ) {
        return;
    }

    // Load Core WordPress Media Library (JS/CSS)
    wp_enqueue_media();

    // Load Core WordPress Component Styles (Required for TabPanel/Flex/Panels)
    wp_enqueue_style( 'wp-components' );

    // Path to the auto-generated asset file from @wordpress/scripts
    $asset_path = plugin_dir_path( __FILE__ ) . 'build/wp-easy-social-links-admin/index.asset.php';
    
    if ( file_exists( $asset_path ) ) {
        $assets = include $asset_path;

        // Enqueue your compiled React App
        wp_enqueue_script(
            'wp-easy-socials-links-admin-script', 
            plugins_url( 'build/wp-easy-social-links-admin/index.js', __FILE__ ),
            $assets['dependencies'], 
            $assets['version'],
            true 
        );

        // Enqueue your compiled CSS generated by @wordpress/scripts
        if ( file_exists( plugin_dir_path( __FILE__ ) . 'build/wp-easy-social-links-admin/index.css' ) ) {
            wp_enqueue_style(
                'wp-easy-socials-links-admin-styles',
                plugins_url( 'build/wp-easy-social-links-admin/index.css', __FILE__ ),
                array(),
                $assets['version']
            );
        }
    }
}   


// For debugging: Display the current screen ID or Admin hook in an admin notice
// This helps ensure the plugin assets are loading on the correct admin page(s)
add_action( 'admin_notices', 'wp_easy_social_links_current_screen_id' );
function wp_easy_social_links_current_screen_id() {
    if ( current_user_can( 'manage_options' ) ) {
        $screen = get_current_screen();
        echo '<div class="notice notice-info"><p>Current Screen ID: <strong>' . esc_html( $screen->id ) . '</strong></p></div>';
    }
}



// REST API REGISTRATIONS   

// add_action('rest_api_init', 'wp_easy_socials_links_register_public_api');

// function wp_easy_socials_links_register_public_api() {
// 	$namespace = 'wp-easy-socials/v1';
	
// 	// Get Public Map Settings for Public API for plugin Access
//     register_rest_route( $namespace, '/wp-easy-social-links-data', array(
//         'methods'             => 'GET',
//         'callback'            => 'wp_easy_social_links_get_public_data',
//         'permission_callback' => '__return_true', // Publicly open endpoint
//     ) );
// }

// // ENQUEUE AND LOCALIZE THE FRONTEND BLOCK INLINE SCRIPTS
// // Localize the frontend block script with the public map data for direct access in JS
// add_action( 'wp_enqueue_scripts', 'wp_easy_social_links_localize_frontend_block' );

// function wp_easy_social_links_localize_frontend_block() {
// 	// This handle must match the exact registered block view script handle string identifier
// 	$handle = 'wp-easy-social-links-block-view-script';
	
// 	// Get the data directly from the DB
// 	// Call your sanitized array cleanup function instead of raw get_option to escape data safely
// 	$clean_plugin_settings = wp_easy_social_links_get_public_data();
// 	//$plugin_settings = get_option( 'wp_easy_socials_links_data' );

// 		if ( ! empty( $clean_plugin_settings ) ) {
// 		// Creates a clean, safe, global window.easySocialsSettings object array inside the client browser DOM
// 		$data = "var easySocialsSettings = " . wp_json_encode( $clean_plugin_settings ) . ";";
// 		wp_add_inline_script( $handle, $data, 'before' );
// 	}


// }

// //public API callback to serve only the necessary plugin data for the frontend block, keeping it secure and efficient
// function wp_easy_social_links_get_public_data() {
//     $settings = get_option( 'wp_easy_social_links_data' );
// 	$public_data = array();

// 	// Verify that our nested 'social' array exists and is not empty
//     if ( isset( $settings['social'] ) && is_array( $settings['social'] ) ) {
//         foreach ( $settings['social'] as $profile ) {
            
//             // Map and sanitize each profile entry for public safety (escaping URLs and strings)
//             $public_data[] = array(
//                 'label' => isset( $profile['label'] ) ? sanitize_text_field( $profile['label'] ) : '',
//                 'url'   => isset( $profile['url'] )   ? esc_url( $profile['url'] ) : '',
//                 'logo'  => isset( $profile['logo'] )  ? esc_url( $profile['logo'] ) : '',
//             );
//         }
// 	}
// 	 // Returns a clean, perfectly structured array of items matching your frontend expectations
// 	return $public_data;
// }