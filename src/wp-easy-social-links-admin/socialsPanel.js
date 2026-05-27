import { useState, useEffect } from '@wordpress/element';
import { TabPanel, Button, Flex, FlexItem, TextControl, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { plus, trash, image as imageIcon } from '@wordpress/icons'; // Native WordPress SVG UI icons

// DESTRUCTURE PROPS PASSED FROM PARENT
const SocialsPanel = ({ socialData, setSocialData }) => {

    // Prevent crashes during async data loads
    if ( ! socialData || ! Array.isArray( socialData.social ) ) {
        return null;
    }

    // --- MARCEL's SOCIALS CUSTOM MEDIA UPLOADER LOGIC ---
    //Native WP Media Uploader Logic to Open the standard WP Media Library frame
    const openMediaLibrary = ( onSelectAction ) => {
        // Safe check to verify that the core WordPress media API script is ready
        if ( ! window.wp || ! window.wp.media ) {
            console.error( 'WordPress media framework is not enqueued.' );
            return;
        }

        const frame = window.wp.media( {
            title: __( 'Select or Upload Media', 'marcels-easy-socials' ), // Updated text domain
            button: { text: __( 'Use this media', 'marcels-easy-socials' ) },
            multiple: false 
        } );

        frame.on( 'select', () => {
            const attachment = frame.state().get( 'selection' ).first().toJSON();
            // This passes the attachment object down to the updated helper callback
            onSelectAction( { id: attachment.id, url: attachment.url } );
        } );

        frame.open();
    };

    // --- REPEATER ACTIONS ---
        
    // Add a new blank row structure to the repeater array
    const addRepeaterRow = () => {
        const updatedSocials = [...socialData.social,{ label: '', url: '', logo: '' }];
        setSocialData( { ...socialData, social: updatedSocials } );
    };

    // Delete a specific row by its array position index
    const removeRepeaterRow = ( indexToKill ) => {
        const updatedSocials = socialData.social.filter( ( _, index ) => index !== indexToKill );
        setSocialData( { ...socialData, social: updatedSocials } );
    };

    // Dynamically update of field strings inside a single array dictionary item
    const updateField = ( index, propertyKey, value ) => {
        const updatedSocials = socialData.social.map( ( item, idx ) => {
            if ( idx === index ) {
                return { ...item, [ propertyKey ]: value };
            }
            return item;
        } );
        setSocialData( { ...socialData, social: updatedSocials } );
    };


    return (
        <div>
           <div style={ { display: 'flex', flexDirection: 'column', gap: '24px' } }>
                    
                { /* Loop and render fields for every entry in the social array */ }
                { socialData.social.map( ( row, index ) => (
                    <Flex key={ index } align="end" gap={ 4 } style={ { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '8px', alignItems: 'center'} }>
                        {/* 1. Logo Selection Input Column */}
                        <FlexItem className="easy-socials-logo-column">
                            <div style={ { position: 'relative', width: '55px', height: '55px' } }>
                                { row.logo ? (
                                    <img className="easy-socials-logo" src={ row.logo } onClick={ () => openMediaLibrary( ( media ) => updateField( index, 'logo', media.url ) ) }
                                        alt="Selected logo" style={ { width: '100%', height: '100%', objectFit: 'contain', cursor: 'pointer', border: '1px solid #ccc', borderRadius: '4px' } } 
                                    />
                                ) : (
                                    <Button variant="secondary" onClick={ () => openMediaLibrary( ( media ) => updateField( index, 'logo', media.url ) ) } 
                                        style={ { width: '60px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }
                                    >
                                        <Icon icon={ imageIcon } />
                                    </Button>
                                )}
                                { row.logo && (
                                    <Button isDestructive onClick={ () => updateField( index, 'logo', '' ) } 
                                        style={ { position: 'absolute', top: '-8px', right: '-8px', background: '#fff', border: '1px solid #ccc', borderRadius: '50%', width: '20px', height: '20px', padding: 0, minWidth: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' } }
                                    >
                                        ✕
                                    </Button>
                                )}
                            </div>
                            <label className="components-base-control__label" style={ { display: 'block', marginTop: '8px', fontStyle: 'italic',color: '#50575e' } }>
                                { __( 'Socio Icon', 'marcels-easy-socials' ) }
                            </label>
                        </FlexItem>
                        <Flex className="easy-socials-field-inputs-column">
                            <FlexItem className="platform-label">
                                <TextControl
                                    label={ __( 'Social Platform Label', 'marcels-easy-socials' ) }
                                    value={ row.label } placeholder="e.g., GitHub"
                                    onChange={ ( val ) => updateField( index, 'label', val ) }
                                />
                            </FlexItem>
                            <FlexItem className="platform-url">
                                <TextControl label={ __( 'Social Platform URL', 'marcels-easy-socials' ) } value={ row.url }
                                    placeholder="https://..."
                                    onChange={ ( val ) => updateField( index, 'url', val ) }
                                />
                            </FlexItem>
                            <FlexItem className="platform-delete">
                                <Button  variant="secondary" isDestructive onClick={ () => removeRepeaterRow( index ) } style={ { marginTop: '15px' } }>
                                    <Icon icon={ trash } />
                                </Button>
                            </FlexItem>
                        </Flex>
                    </Flex>
                ) ) }
            </div>
            
            { /* Control UI Buttons Container Section */ }
            <Flex justify="flex-start" style={ { marginTop: '12px' } }>
                <Button variant="secondary" icon={ plus } onClick={ addRepeaterRow }>
                    { __( 'Add New Social Link', 'marcels-easy-socials' ) }
                </Button>
            </Flex>
            <style>
                {`
                    .platform-label {
                        flex-grow: 1;
                    }
                        
                    .platform-url {
                        flex-grow: 1;
                    }

                    .easy-socials-logo-column {
                        align-items: center;
                        flex-basis:70px;
                        flex-grow: 0;
                    }

                    .easy-socials-logo {
                        width: 35px;
                        height: 35px;
                    }

                    .easy-socials-field-inputs-column{
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 12px;
                    }    

                    @media (min-width: 782px) {
                        .platform-label {
                            flex-grow: 1;
                        }

                        .platform-url {
                            flex-grow: 2;
                        }

                        .easy-socials-logo-column {
                            flex-basis: 120px;
                        }

                        .easy-socials-logo {
                            width: 55px;
                            height: 55px;
                        }

                        .easy-socials-field-inputs-column {
                            flex-direction: row;
                            gap: 16px;
                            align-items: center;
                        }  
                    }
                 
                `}
            </style>
        </div>
    );
};

export default SocialsPanel;
