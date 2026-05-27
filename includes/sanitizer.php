<?php
//SERVER-SIDE SANITIZATION FOR THE SETTINGS DATA TO PREVENT MALICIOUS INPUT (XSS/SQL INJECTION)
/**
 * Gatekeep and sanitize the input data for the plugin settings before it gets saved to the database.
 */


if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}


function marcels_easy_socials_sanitize_payload( $input ) {
    if ( ! is_array( $input ) ) {
        return array();
    }

    $sanitized = array();

    // SANITIZATION OF VISIBILITY SETTINGS (Toggle and Radio Controls)
    // Coerce toggle data strictly to true/false booleans to maintain database consistency
    $sanitized['showHideSocials'] = isset( $input['showHideSocials'] ) ? (bool) $input['showHideSocials'] : true;
    $sanitized['showText']        = isset( $input['showText'] ) ? (bool) $input['showText'] : true;
    $sanitized['hasBorder']       = isset( $input['hasBorder'] ) ? (bool) $input['hasBorder'] : true;

    // Strict value whitelist for the text position radio layout selections
    $allowed_positions = array( 'left', 'right', 'top', 'bottom' );
    if ( isset( $input['labelPosition'] ) && in_array( $input['labelPosition'], $allowed_positions, true ) ) {
        $sanitized['labelPosition'] = $input['labelPosition'];
    } else {
        $sanitized['labelPosition'] = 'right'; // Secure boundary fallback string matching your interface layout
    }

    // SANITIZATION OF SPACING SETTINGS
    // Sizing input check using regex
    $css_unit_pattern = '/^\d+(px|rem|em)$/i';
    $size_fields      = array( 'linkGap', 'textIconGap', 'iconSize', 'fontSize', 'borderWidth' );
    $size_defaults    = array( 'linkGap' => '16px', 'textIconGap' => '10px', 'iconSize' => '20px', 'fontSize' => '14px', 'borderWidth' => '1px' );

    foreach ( $size_fields as $field ) {
        if ( isset( $input[ $field ] ) && preg_match( $css_unit_pattern, trim( $input[ $field ] ) ) ) {
            $sanitized[ $field ] = sanitize_text_field( trim( $input[ $field ] ) );
        } else {
            $sanitized[ $field ] = $size_defaults[ $field ]; // Secure boundary fallback string
        }
    }

    // SANITIZATION OF COLOR SETTINGS
    // Color check for hex and rgba formats
    $hex_pattern  = '/^#([A-Fa-f0-9]{3,8})$/';
    $rgba_pattern = '/^rgba\([^)]+\)$/i';

    // Font Color check
    if ( isset( $input['fontColor'] ) && preg_match( $hex_pattern, trim( $input['fontColor'] ) ) ) {
        $sanitized['fontColor'] = sanitize_text_field( trim( $input['fontColor'] ) );
    } else {
        $sanitized['fontColor'] = '#1d2327';
    }

    // Border Color check
    if ( isset( $input['borderColor'] ) && preg_match( $hex_pattern, trim( $input['borderColor'] ) ) ) {
        $sanitized['borderColor'] = sanitize_text_field( trim( $input['borderColor'] ) );
    } else {
        $sanitized['borderColor'] = '#ccd0d4';
    }

    // Icon Background picker check
    if ( isset( $input['iconBgColor'] ) ) {
        $bg_color = trim( $input['iconBgColor'] );
        if ( 'transparent' === $bg_color || preg_match( $hex_pattern, $bg_color ) || preg_match( $rgba_pattern, $bg_color ) ) {
            $sanitized['iconBgColor'] = sanitize_text_field( $bg_color );
        } else {
            $sanitized['iconBgColor'] = 'transparent';
        }
    }
    

    // SANITIZATION OF REPEATER DATA SETTINGS
    // Deep-sanitization of nested repeater socials list arrays
    if ( isset( $input['social'] ) && is_array( $input['social'] ) ) {
        $sanitized['social'] = array();
        foreach ( $input['social'] as $row ) {
            // Drop rows entirely if fields are fully unpopulated
            if ( empty( $row['label'] ) && empty( $row['url'] ) && empty( $row['logo'] ) ) {
                continue;
            }
            $sanitized['social'][] = array(
                'label' => isset( $row['label'] ) ? sanitize_text_field( $row['label'] ) : '',
                // esc_url_raw checks for malicious scripting protocol triggers (like javascript:alert)
                'url'   => isset( $row['url'] ) ? esc_url_raw( trim( $row['url'] ) ) : '',
                'logo'  => isset( $row['logo'] ) ? esc_url_raw( trim( $row['logo'] ) ) : '',
            );
        }
    }

    return $sanitized;
}
