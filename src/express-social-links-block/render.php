<?php
/**
 * Render callback for the Express Social Links block.
 *
 * This file is responsible for rendering the block on the frontend, merging local attributes with global settings,
 * and outputting a clean DOM wrapper with the necessary data attributes for the view.js to pick up.
 *
 * @package ExpressSocialLinks
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Fetching Global Settings from WP Options Table
$express_social_links_global_settings = get_option( 'express_social_links_data', [] );

// Fallback helper function to merge local attributes with global fallbacks
$express_social_links_get_value = function( $key, $default = true ) use ( $attributes, $express_social_links_global_settings ) {
    if ( isset( $attributes[$key] ) && $attributes[$key] !== '' ) {
        return $attributes[$key];
    }
    return isset( $express_social_links_global_settings[$key] ) ? $express_social_links_global_settings[$key] : $default;
};

// Replicate your exact edit.js data pipeline matrix
$express_social_links_merged_payload = [
    'social'          => ( isset( $attributes['social'] ) && ! empty( $attributes['social'] ) ) ? $attributes['social'] : ( $express_social_links_global_settings['social'] ?? [] ),
    'showHideSocials' => $express_social_links_get_value( 'showHideSocials', true ),
    'showText'        => $express_social_links_get_value( 'showText', true ),
    'hasBorder'       => $express_social_links_get_value( 'hasBorder', true ),
    'linkGap'         => $express_social_links_get_value( 'linkGap', '' ),
    'textIconGap'     => $express_social_links_get_value( 'textIconGap', '' ),
    'fontColor'       => $express_social_links_get_value( 'fontColor', '' ),
    'fontSize'        => $express_social_links_get_value( 'fontSize', '' ),
    'iconSize'        => $express_social_links_get_value( 'iconSize', '' ),
    'labelPosition'   => $express_social_links_get_value( 'labelPosition', '' ),
    'iconBgColor'     => $express_social_links_get_value( 'iconBgColor', '' ),
    'borderColor'     => $express_social_links_get_value( 'borderColor', '' ),
    'borderWidth'     => $express_social_links_get_value( 'borderWidth', '' ),
];

// A clean DOM wrapper output ready for view.js to pick up
$express_social_links_wrapper_attributes = get_block_wrapper_attributes([
    'class'       => 'express-social-links-item-container',
    'data-config' => wp_json_encode( $express_social_links_merged_payload )
]);
?>


<div <?php echo wp_kses_data( $express_social_links_wrapper_attributes ); ?>></div>
