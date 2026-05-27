<?php
/**
 * Fired when the plugin is uninstalled.
 */

// If uninstall not called from WordPress, exit.
if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ) {
    exit;
}

// global $wpdb;

// //Delete the Custom Database Table(For future use if we decide to use custom tables instead of options)
// $table_name = $wpdb->prefix . 'easy_socials_db_data';
// $wpdb->query( "DROP TABLE IF EXISTS $table_name" );

// Delete the Settings/Options from wp_options
delete_option( 'wp_easy_socials_links_data' );


//Clear any cached data (Optional but recommended)
wp_cache_flush();
