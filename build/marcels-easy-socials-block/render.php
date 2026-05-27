<?php
/**
 * Render callback for the Marcels Easy Socials block.
 *
 * This file is responsible for rendering the block on the frontend, merging local attributes with global settings,
 * and outputting a clean DOM wrapper with the necessary data attributes for the view.js to pick up.
 *
 * @package MarcelsEasySocials
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Fetching Global Settings from WP Options Table
$marcels_easy_socials_global_settings = get_option( 'marcels_easy_socials_data', [] );

// Fallback helper function to merge local attributes with global fallbacks
$marcels_easy_socials_get_value = function( $key, $default = true ) use ( $attributes, $marcels_easy_socials_global_settings ) {
    if ( isset( $attributes[$key] ) && $attributes[$key] !== '' ) {
        return $attributes[$key];
    }
    return isset( $marcels_easy_socials_global_settings[$key] ) ? $marcels_easy_socials_global_settings[$key] : $default;
};

// 3. Replicate your exact edit.js data pipeline matrix
$marcels_easy_socials_merged_payload = [
    'social'          => ( isset( $attributes['social'] ) && ! empty( $attributes['social'] ) ) ? $attributes['social'] : ( $marcels_easy_socials_global_settings['social'] ?? [] ),
    'showHideSocials' => $marcels_easy_socials_get_value( 'showHideSocials', true ),
    'showText'        => $marcels_easy_socials_get_value( 'showText', true ),
    'hasBorder'       => $marcels_easy_socials_get_value( 'hasBorder', true ),
    'linkGap'         => $marcels_easy_socials_get_value( 'linkGap', '' ),
    'textIconGap'     => $marcels_easy_socials_get_value( 'textIconGap', '' ),
    'fontColor'       => $marcels_easy_socials_get_value( 'fontColor', '' ),
    'fontSize'        => $marcels_easy_socials_get_value( 'fontSize', '' ),
    'iconSize'        => $marcels_easy_socials_get_value( 'iconSize', '' ),
    'labelPosition'   => $marcels_easy_socials_get_value( 'labelPosition', '' ),
    'iconBgColor'     => $marcels_easy_socials_get_value( 'iconBgColor', '' ),
    'borderColor'     => $marcels_easy_socials_get_value( 'borderColor', '' ),
    'borderWidth'     => $marcels_easy_socials_get_value( 'borderWidth', '' ),
];

// A clean DOM wrapper output ready for view.js to pick up
$marcels_easy_socials_wrapper_attributes = get_block_wrapper_attributes([
    'class'       => 'easy-socials-item-container',
    'data-config' => wp_json_encode( $marcels_easy_socials_merged_payload )
]);
?>


<div <?php echo wp_kses_data( $marcels_easy_socials_wrapper_attributes ); ?>></div>
