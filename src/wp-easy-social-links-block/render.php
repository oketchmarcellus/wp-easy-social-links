<?php
/**
 * Render callback for the WP Easy Social Links block.
 *
 * This file is responsible for rendering the block on the frontend, merging local attributes with global settings,
 * and outputting a clean DOM wrapper with the necessary data attributes for the view.js to pick up.
 *
 * @package WPEasySocialLinks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Fetching Global Settings from WP Options Table
$wp_easy_socials_links_global_settings = get_option( 'wp_easy_socials_links_data', [] );

// Fallback helper function to merge local attributes with global fallbacks
$wp_easy_socials_links_get_value = function( $key, $default = true ) use ( $attributes, $wp_easy_socials_links_global_settings ) {
    if ( isset( $attributes[$key] ) && $attributes[$key] !== '' ) {
        return $attributes[$key];
    }
    return isset( $wp_easy_socials_links_global_settings[$key] ) ? $wp_easy_socials_links_global_settings[$key] : $default;
};

// 3. Replicate your exact edit.js data pipeline matrix
$wp_easy_socials_links_merged_payload = [
    'social'          => ( isset( $attributes['social'] ) && ! empty( $attributes['social'] ) ) ? $attributes['social'] : ( $wp_easy_socials_links_global_settings['social'] ?? [] ),
    'showHideSocials' => $wp_easy_socials_links_get_value( 'showHideSocials', true ),
    'showText'        => $wp_easy_socials_links_get_value( 'showText', true ),
    'hasBorder'       => $wp_easy_socials_links_get_value( 'hasBorder', true ),
    'linkGap'         => $wp_easy_socials_links_get_value( 'linkGap', '' ),
    'textIconGap'     => $wp_easy_socials_links_get_value( 'textIconGap', '' ),
    'fontColor'       => $wp_easy_socials_links_get_value( 'fontColor', '' ),
    'fontSize'        => $wp_easy_socials_links_get_value( 'fontSize', '' ),
    'iconSize'        => $wp_easy_socials_links_get_value( 'iconSize', '' ),
    'labelPosition'   => $wp_easy_socials_links_get_value( 'labelPosition', '' ),
    'iconBgColor'     => $wp_easy_socials_links_get_value( 'iconBgColor', '' ),
    'borderColor'     => $wp_easy_socials_links_get_value( 'borderColor', '' ),
    'borderWidth'     => $wp_easy_socials_links_get_value( 'borderWidth', '' ),
];

// A clean DOM wrapper output ready for view.js to pick up
$wp_easy_socials_links_wrapper_attributes = get_block_wrapper_attributes([
    'class'       => 'easy-socials-item-container',
    'data-config' => wp_json_encode( $wp_easy_socials_links_merged_payload )
]);
?>


<div <?php echo wp_kses_data( $wp_easy_socials_links_wrapper_attributes ); ?>></div>
