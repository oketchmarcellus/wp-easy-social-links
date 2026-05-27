import { __ } from '@wordpress/i18n';

const SocialsListRenderer = ( { socialData } ) => {
    // Safety check for ensuring the data structures are ready before running mapped iterations
    if ( ! socialData || ! Array.isArray( socialData.social ) ) {
        return null;
    }


    if ( ! socialData.showHideSocials ) {
        // Render nothing on frontend if the block is set to hidden, in editor we'll show a placeholder
        return null;
    }

    // Map flex directions based on label position
    const flexDirections = {
        left: 'row-reverse',
        right: 'row',
        top: 'column-reverse',
        bottom: 'column'
    };

    return (
        <div className="wp-easy-social-links-box">
            { socialData.social.map( ( row, index ) => {
                if ( ! row.label && ! row.logo ) return null;

                // border control check on individual row item first, fallback to global
                const itemHasBorder = row.hasBorder !== undefined ? row.hasBorder : socialData.hasBorder;


                // Defined item-specific inline styles
                const itemStyle = {
                    flexDirection: flexDirections[socialData.labelPosition] || 'row',
                    gap: socialData.textIconGap,
                    color: socialData.fontColor,
                    fontSize: socialData.fontSize,
                    padding: itemHasBorder ? '8px 14px' : '0px',
                    background: itemHasBorder ? '#fff' : 'transparent',
                    boxShadow: itemHasBorder ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                    border: itemHasBorder ? `${socialData.borderWidth} solid ${socialData.borderColor}` : 'none',
                };

                return (
                    <a key={ index } href={ row.url || '#' } target="_blank" rel="noopener noreferrer" className="wp-easy-social-links-item" style={ itemStyle }>
                        {/* isolate icon-wrapper context inside the loop */}
                        <span className="wp-easy-social-links-icon-wrapper icon-wrapper">
                            { row.logo ? (
                                <img src={ row.logo } alt="" className="wp-easy-social-links-img" />
                            ) : (
                                <div className="wp-easy-social-links-fallback-icon">🔗</div>
                            )}
                        </span>
                        { socialData.showText && (
                            <span className="wp-easy-social-links-text-node">
                                { row.label || __( 'Unnamed Link', 'marcels-easy-socials' ) }
                            </span>
                        ) }
                    </a>
                );
            })}

            <style>
                {`
                    .wp-easy-socials-links-box {
                        display: flex;
                        flex-wrap: wrap;
                        gap: ${socialData.linkGap};
                        margin-top: 20px;
                        width: 100%;
                    }
                    .wp-easy-socials-links-item {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: ${flexDirections[socialData.labelPosition] || 'row'};
                        gap: ${socialData.textIconGap};
                        text-decoration: none;
                        font-weight: 500;
                        max-width: 220px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        
                        color: ${socialData.fontColor};
                        font-size: ${socialData.fontSize};
                        padding: ${socialData.hasBorder ? '8px 14px' : '0px'};
                        background: ${socialData.hasBorder ? '#fff' : 'transparent'};
                        box-shadow: ${socialData.hasBorder ? '0 1px 2px rgba(0,0,0,0.05)' : 'none'};
                        border-radius: 20px;
                        border: ${socialData.hasBorder ? `${socialData.borderWidth} solid ${socialData.borderColor}` : 'none'};
                    }

                    .wp-easy-social-links-icon-wrapper {
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        background-color: ${socialData.iconBgColor};
                        border-radius: 4px; 
                        padding: 4px;
                        flex-shrink: 0;
                    }

                    .wp-easy-social-links-img {
                        width: ${socialData.iconSize};
                        height: ${socialData.iconSize};
                        object-fit: contain;
                    }
                    .wp-easy-social-links-fallback-icon {
                        width: ${socialData.iconSize};
                        height: ${socialData.iconSize};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #f0f0f0;
                        border-radius: 50%;
                        font-size: calc(${socialData.iconSize} * 0.6);
                    }
                    .wp-easy-social-links-text-node {
                        line-height: 1;
                    }
                `}
            </style>
        </div>
    );
};

export default SocialsListRenderer;
