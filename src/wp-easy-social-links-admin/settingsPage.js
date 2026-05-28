import { useState, useEffect } from '@wordpress/element';
import { Panel, TabPanel, Button, Flex, FlexItem, NoticeList,  __experimentalText as Text, TextControl, Dashicon, Icon } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useDispatch, useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { plus, trash, image as imageIcon, border } from '@wordpress/icons'; // Native WordPress SVG UI icons
import SocialsPanel from './socialsPanel';
import GlobalSettings from './globalSettings';
import About from './about';
import SocialsPreview from './socialsPreview'; // New preview component

const SettingsPage = () => {
    // --- STATE MANAGEMENT ---

    // Initialize clear state structure since we're now initializing with defaults from server on activation
    const [ socialData, setSocialData ] = useState( null );
    const [ isSaving, setIsSaving ] = useState( false );

    // --- NOTICES SETUP ---
    const notices = useSelect( ( select ) => select( noticesStore ).getNotices(), [] );
    const { createSuccessNotice, createErrorNotice, removeNotice } = useDispatch( noticesStore );

    // --- LOAD DATA ON MOUNT ---
    useEffect( () => {
        apiFetch( { path: '/wp/v2/settings' } )
            .then( ( response ) => {
                const data = response.wp_easy_social_links_data;
                // populated data arrays from DB activation fallback
                if ( data ) {
                    setSocialData( data );
                }
            } )
            .catch( ( err ) => {
                console.error( 'Error loading settings:', err );
                createErrorNotice( __( 'Failed to load settings data.', 'wp-easy-social-links' ) );
            } );
    }, [] );

    // --- SAVE DATA ACTION ---
    const handleSave = async () => {
        setIsSaving( true );
        try {
            await apiFetch( {
                path: '/wp/v2/settings',
                method: 'POST',
                data: {
                    wp_easy_social_links_data: socialData, // Sends the fully bundled state object
                },
            } );
            createSuccessNotice( __( 'Settings saved successfully!', 'wp-easy-social-links' ), {
                type: 'snackbar',
            } );
        } catch ( error ) {
            
            // Log the detailed error to the developer console for debugging purposes
            console.error( 'Internal Save Error:', error );

            // Generic notice string definition
            let generalizedMessage = __( 'An error occurred while saving your configuration.', 'wp-easy-social-links' );

            /**
             * Check if is is a native WP REst validation failure and obfuscate the message to a more user-friendly, non-technical string.
             * This prevents exposing raw error details that may contain sensitive information or be confusing to end users, while still providing actionable feedback.
             */
            if ( error.code === 'rest_invalid_param' || error.status === 400 ) {
                generalizedMessage = __( 'One or more styling selections contain an invalid format.', 'wp-easy-social-links' );
            } else if ( error.message ) {
                // Fall back to the original error message if it's not a validation error
                generalizedMessage = error.message;
            }

            // Pass only the sanitized, safe message string to your notice library
            createErrorNotice( generalizedMessage );
        } finally {
            setIsSaving( false );
        }
    };

    // Prevent rendering child panels until state payload checks are successful
    if ( ! socialData ) {
        return <div className="welcome-panel" style={{ padding: '20px' }}>{__( 'Loading settings...', 'wp-easy-social-links' )}</div>;
    }


    const tabs = [
        { name: 'socials', title: (<div className="tab-label"><span>{__('SOCIAL LINKS', 'wp-easy-social-links')}</span><Dashicon icon="share" style={{marginLeft:'10px;'}}/></div>) },
        { name: 'global', title: (<div className="tab-label"><span>{__('GLOBAL SETTINGS', 'wp-easy-social-links')}</span><Dashicon icon="admin-generic" style={{marginLeft:'10px;'}}/></div>) },
        { name: 'about', title: (<div className="tab-label"><span>{__('ABOUT', 'wp-easy-social-links')}</span><Dashicon icon="search" style={{marginLeft:'10px;'}}/></div>) },
    ];

    return (
        <div className="wrap">
            <NoticeList notices={ notices } onRemove={ removeNotice } style={ { marginBottom: '20px' } }/>

            <h1 className="wp-heading-inline" style={ { marginBottom: '20px' } }>
                { __( 'Marcels Easy Socials Settings', 'wp-easy-social-links' ) }
            </h1>
            <hr className="wp-header-end" />

            <Panel className="wp-easy-socials-panel">
                 <TabPanel className="marcels-socials-tabs" orientation="horizontal"  initialTabName="socials" tabs={tabs} style={{ background: "#fff" }}>
                    {(tab) => (
                        <div style={{ padding: '0', height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1, padding: '24px 10px' }}>
                                {tab.name === 'socials' && (
                                    <Flex align="start" gap={ 6 } className="wp-easy-socials-responsive-flex">
                                        {/* Left Repeater Fields Panel */}
                                        {/* PASSED DATA PROPS DOWN TO CHILD PANEL */}
                                        <FlexItem className="wp-easy-socials-form-column">
                                            <div className="tab-content">
                                                <SocialsPanel socialData={socialData} setSocialData={setSocialData} />
                                            </div>
                                        </FlexItem>
                                        
                                        {/* Right Live Socials Preview Rendering Box */}
                                        <FlexItem style={{ flex: '1', position: 'sticky', top: '20px' }}>
                                            <SocialsPreview socialData={socialData} />
                                        </FlexItem>
                                    </Flex>
                                )}
                                {tab.name === 'global' && (
                                    <Flex align="start" gap={ 6 } className="wp-easy-socials-responsive-flex">
                                        {/* Left Repeater Fields Panel */}
                                        {/* PASSED DATA PROPS DOWN TO CHILD PANEL */}
                                        <FlexItem className="wp-easy-socials-form-column">
                                            <div className="tab-content">
                                                <GlobalSettings socialData={socialData} setSocialData={setSocialData}/>
                                            </div>
                                        </FlexItem>
                                        {/* Right Live Socials Preview Rendering Box */}
                                        <FlexItem style={{ flex: '1', position: 'sticky', top: '20px' }}>
                                            <SocialsPreview socialData={socialData} />
                                        </FlexItem>
                                    </Flex>
                                )}
                                {tab.name === 'about' && (
                                    <div className="tab-content">
                                        <About />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </TabPanel>
                { /* Control UI Buttons Container Section */ }
                <Flex justify="flex-end" className="wp-easy-socials-footer-actions">
                    <Button variant="primary" isBusy={ isSaving } disabled={ isSaving } onClick={ handleSave }>
                        { __( 'Save Settings', 'wp-easy-social-links' ) }
                    </Button>
                </Flex>
            </Panel>
            <style>
                {`
                    .wrap {
                        margin: 10px !important;
                    }

                    .components-panel {
                        padding: 20px !important;
                    }

                    .tab-label .dashicons {
                        margin-left: 10px;
                    }

                    .components-tab-panel__tabs-item.is-active:after {
                        outline: none !important;
                    }  

                    .components-tab-panel__tabs-item.is-active {
                        background: #f7f7f7;
                    }

                    .components-tab-panel__tabs {
                        border-bottom: '1px solid #e0e0e0 !important';
                    }

                    .wp-easy-socials-panel {
                        margin-top:'20px';
                        background: '#fff';
                        border: '1px solid #e0e0e0';
                        padding: '20px';
                    }

                    .wp-easy-socials-responsive-flex {
                        width: 100%;
                        flex-direction: column;
                    }

                    .wp-easy-socials-form-column {
                        flex: 1;
                    }

                    .wp-easy-socials-preview-column {
                        flex: 1;
                        top: '20px';
                    }

                    .wp-easy-socials-footer-actions {
                        margin-top: '12px';
                    }

                     @media (min-width: 782px) {

                        .wp-easy-socials-responsive-flex {
                            flex-direction: row;
                        }
                        .wp-easy-socials-form-column {
                            flex: 0 0 65%;
                            min-width: 400px;
                        }
                        .wp-easy-socials-preview-column {
                            flex: 1;
                            position: 'sticky';
                            top: '20px';
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default SettingsPage;
