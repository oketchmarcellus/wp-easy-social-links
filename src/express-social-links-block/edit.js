/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, Placeholder, Spinner } from '@wordpress/components';
import SocialsListRenderer from './socialsListRender';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export default function Edit( { attributes, setAttributes } ) {
    // Initialize the block props container hook inside the function body
    const blockProps = useBlockProps();

    //No need to initialize state here as defaults/global settings are fetched from API on mount

    // Local states mirroring the Mount lifecycle architecture
    const [ globalSettings, setGlobalSettings ] = useState( null );

    // --- FETCH THE GLOBAL SETTINGS ON MOUNT ---
    useEffect( () => {
        apiFetch( { path: '/wp/v2/settings' } )
            .then( ( response ) => {
                const data = response.express_social_links_data;
                if ( data ) {
                    setGlobalSettings( data );
                }
            } )
            .catch( ( err ) => {
                console.error( 'Error loading block fallback settings:', err );
            } );
    }, [] );

    // Render standard loading placeholder track while dynamic fetch stays active
    if ( ! globalSettings ) {
        return (
            <div { ...blockProps }>
                <Placeholder label={ __( 'Loading Global Social Options...', 'express-social-links' ) }>
                    <Spinner />
                </Placeholder>
            </div>
        );
    }

    // Check if block local attributes carry explicit populating fields
    const blockSocialHasData = attributes.social && attributes.social.length > 0 && ( attributes.social[0].label || attributes.social[0].logo );
    const activeSocialList = blockSocialHasData ? attributes.social : globalSettings.social;

    // Override Global settings since Local attribute takes precedence
    const socialDataPayload = {
        social: activeSocialList,
        showHideSocials: attributes.showHideSocials !== undefined ? attributes.showHideSocials : ( globalSettings.showHideSocials !== false ),
        showText: attributes.showText !== undefined ? attributes.showText : ( globalSettings.showText !== false ),
        hasBorder: attributes.hasBorder !== undefined ? attributes.hasBorder : ( globalSettings.hasBorder !== false ),
        linkGap: attributes.linkGap || globalSettings.linkGap,
        textIconGap: attributes.textIconGap || globalSettings.textIconGap,
        fontColor: attributes.fontColor || globalSettings.fontColor,
        fontSize: attributes.fontSize || globalSettings.fontSize,
        iconSize: attributes.iconSize || globalSettings.iconSize,
        labelPosition: attributes.labelPosition || globalSettings.labelPosition,
        iconBgColor: attributes.iconBgColor || globalSettings.iconBgColor,
        borderColor: attributes.borderColor || globalSettings.borderColor,
        borderWidth: attributes.borderWidth || globalSettings.borderWidth
    };

    // Check if active profile links loop resolves to an unpopulated state map
    const isListEmpty = ! socialDataPayload.social || socialDataPayload.social.every( row => ! row.label && ! row.logo );
    
    //console.log( 'Edit Mount Render Payload:', socialDataPayload );

    return (
        <div { ...blockProps }>
            { /* Sidebar Settings Control Panel */ }
            <InspectorControls>
                <PanelBody title={ __( 'Display Options', 'express-social-links' ) } initialOpen={ true }>
                    <ToggleControl
                        label={ __( 'Show Social Icons', 'express-social-links' ) }
                        checked={ socialDataPayload.showHideSocials }
                        onChange={ ( val ) => setAttributes( { showHideSocials: val } ) }
                    />
                    <ToggleControl
                        label={ __( 'Show Text Labels', 'express-social-links' ) }
                        checked={ socialDataPayload.showText }
                        onChange={ ( val ) => setAttributes( { showText: val } ) }
                    />
                    <ToggleControl
                        label={ __( 'Show Icon Borders', 'express-social-links' ) }
                        checked={ socialDataPayload.hasBorder }
                        onChange={ ( val ) => setAttributes( { hasBorder: val } ) }
                    />
                    {/* Additional controls for spacing, colors, etc. will be added here for future versions following the same pattern */}
                </PanelBody>
            </InspectorControls>

            { /* Main Canvas Block Content View Container */ }
            <div className="express-socials-block-editor-canvas">
                { ! socialDataPayload.showHideSocials ? (
                    // Muted placeholder warning boundary box
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80px', background: '#f0f0f1', borderRadius: '6px', border: '1px dashed #ccd0d4', padding: '10px' }}>
                        <p style={{ color: '#646970', fontStyle: 'italic', fontSize: '13px', margin: 0 }}>
                            ❌ { __( 'Social block display is toggled hidden.', 'express-social-links' ) }
                        </p>
                    </div>
                ) : isListEmpty ? (
                    // Empty Slate Fallback Notification
                    <p style={{ color: '#757575', fontStyle: 'italic', fontSize: '13px', padding: '10px 0' }}>
                        { __( 'You have not added any social links yet. Add them in the block sidebar or global options.', 'express-social-links' ) }
                    </p>
                ) : (
                    // Render live, social links grid directly onto page
                    <SocialsListRenderer socialData={ socialDataPayload } />
                )}
            </div>
        </div>
    );
}