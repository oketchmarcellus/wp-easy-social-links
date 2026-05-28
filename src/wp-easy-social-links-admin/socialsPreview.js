import { __ } from '@wordpress/i18n';
import SocialsListRenderer from '../wp-easy-social-links-block/socialsListRender';

const SocialsPreview = ( { socialData } ) => {
    // Root data structure availability verification checks
    if ( ! socialData || ! Array.isArray( socialData.social ) ) {
        return null;
    }

    const showHideSocials = socialData.showHideSocials !== false;
    const isListEmpty = socialData.social.every( row => !row.label && !row.logo );

    return (
        <div style={{ background: '#f9f9f9', border: '1px solid #e0e0e0', borderRadius: '8px',
            padding: '24px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.02)', minHeight: '200px' }}>
            
            <h3 style={{ marginTop: 0, paddingBottom: '12px', borderBottom: '1px solid #e0e0e0', fontSize: '14px', fontWeight: '600', color: '#333' }}>
                { __( 'WP EASY SOCIALS LINKS PREVIEW', 'wp-easy-socials-links' ) }
            </h3>
            
             { ! showHideSocials ? (
                // If it's the backend preview dashboard or editor block, show the warning box
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100px', background: '#f0f0f1', borderRadius: '6px', border: '1px dashed #ccd0d4', marginTop: '20px' }}>
                    <p style={{ color: '#646970', fontStyle: 'italic', fontSize: '13px', margin: 0 }}>
                        ❌ { __( 'WP Easy Social Links block display is toggled hidden.', 'wp-easy-socials-links' ) }
                    </p>
                </div>
                ) : isListEmpty ? (
                    // Empty Slate Fallback Notification
                    <p style={{ color: '#757575', fontStyle: 'italic', fontSize: '13px', marginTop: '20px' }}>
                        { __( 'You have not added any social links yet.', 'wp-easy-socials-links' ) }
                    </p>
                ) : (
                // Add child list layout engine directly
                <SocialsListRenderer socialData={ socialData }/>
            )}
        </div>
    );
};

export default SocialsPreview;