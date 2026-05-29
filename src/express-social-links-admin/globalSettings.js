import { __experimentalText as Text, ToggleControl, TextControl, ColorPicker, Dropdown, Button, RadioControl, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const GeneralSettings = ( { socialData, setSocialData } ) => {

    // Critical safety boundary check to prevent crashes during async database loading latency
    if ( ! socialData ) {
        return null;
    }

    const updateSettingKey = ( propertyKey, val ) => {
        setSocialData( {
            ...socialData,
            [ propertyKey ]: val
        } );
    };

    //console.log( 'Global Settings Render Payload:', socialData );

    return (
        <Flex direction="column" align="stretch" gap={ 5 } style={{ width: '100%', padding: '10px 0' }}>
            
            {/* Title Summary Header Section */}
            <FlexItem style={ { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' } }>
                <Text as="p" style={{ margin: 0, fontStyle: 'italic', fontSize: '14px', color: '#50575e' }}>
                    { __( 'Configure your block layout global styles and rendering options here.', 'wp-easy-socials-links' ) }
                </Text>
            </FlexItem>

            {/* Visibility Section */}
            <FlexItem style={ { borderBottom: '1px solid #f0f0f0', paddingTop: '16px' } }>
                <label className="components-base-control__label" style={{ display: 'block', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: '500'   }}>
                    { __( 'VISIBILITY', 'express-socials-links' ) }
                </label>
                <Flex direction="row" align="stretch" gap={ 4 }>
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <ToggleControl label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Show Icons', 'express-socials-links' ) }</span> }
                            help={ socialData.showHideSocials !== false ? __( 'Social platform logos will be visible sitewide.', 'express-socials-links' ) : __( 'Logos will be hidden sitewide', 'express-socials-links' ) }
                            checked={ !!socialData.showHideSocials } onChange={ ( val ) => updateSettingKey( 'showHideSocials', val ) }
                        />
                    </FlexItem>
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <ToggleControl label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Display Platform Text Labels', 'express-socials-links' ) }</span> }
                            help={ socialData.showText !== false ? __( 'Text names will render alongside icons.', 'express-socials-links' ) : __( 'Only icons will be visible.', 'express-socials-links' ) }
                            checked={ !!socialData.showText } onChange={ ( val ) => updateSettingKey( 'showText', val ) }
                        />
                        { socialData.showText !== false && (
                            <RadioControl
                                label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Text Position', 'express-socials-links' ) }</span> }
                                help={ __( 'Choose where the platform name sits relative to the logo.', 'express-socials-links' ) }
                                selected={ socialData.labelPosition }
                                options={ [
                                    { label: __( 'Left', 'express-socials-links' ), value: 'left' },
                                    { label: __( 'Right', 'express-socials-links' ), value: 'right' },
                                    { label: __( 'Top', 'express-socials-links' ), value: 'top' },
                                    { label: __( 'Bottom', 'express-socials-links' ), value: 'bottom' },
                                ] }
                                onChange={ ( val ) => updateSettingKey( 'labelPosition', val ) }
                            />
                        ) }
                    </FlexItem>
                </Flex>
            </FlexItem>

            {/* Spacing Section */}
            <FlexItem style={ { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' } }>
                <label className="components-base-control__label" style={{ display: 'block', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: '500'   }}>
                    { __( 'SPACING', 'express-socials-links' ) }
                </label>
                <Flex direction="row" align="stretch" gap={ 4 } className="subtle-field-wrapper">
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <TextControl label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Icons Gap', 'express-socials-links' ) }</span> }
                            help={ __( 'Enter a CSS spacing value (e.g., 16px, 1.5rem, 2em).', 'express-socials-links   ' ) }
                            value={ socialData.linkGap } placeholder="16px" onChange={ ( val ) => updateSettingKey( 'linkGap', val ) }
                            style={{ maxWidth: '60px' }}
                        />
                    </FlexItem>
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <TextControl label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Text & Icon Gap', 'express-socials-links' ) }</span> }
                            help={ __( 'Gap inside card.', 'express-socials-links' ) }
                            value={ socialData.textIconGap } placeholder="10px" onChange={ ( val ) => updateSettingKey( 'textIconGap', val ) }
                            style={{ maxWidth: '60px' }}
                        />
                    </FlexItem>
                </Flex>
            </FlexItem>

            {/* Content Color Section */}
            <FlexItem style={ { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' } }>
                <label className="components-base-control__label" style={{ display: 'block', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: '500'   }}>
                    { __( 'CONTENT COLOR', 'express-socials-links' ) }
                </label>
                <Flex direction="row" align="stretch" gap={ 4 } style={{ width: '100%' }}>
                    {/* Link Font Typography Color Picker */}
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <label className="components-base-control__label" style={{ display: 'block', marginBottom: '12px', color: '#50575e', fontSize: '13px', fontWeight: 'normal' }}>
                            { __( 'Link Font Typography Color', 'express-socials-links' ) }
                        </label>
                        <Dropdown
                            popoverProps={{ placement: 'bottom-start' }}
                            renderToggle={ ( { isOpen, onToggle } ) => (
                                <Button variant="secondary" onClick={ onToggle } aria-expanded={ isOpen } style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'flex-start' }}>
                                    <span style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', background: socialData.fontColor, border: '1px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ socialData.fontColor }</span>
                                </Button>
                            ) }
                            renderContent={ () => (
                                <Flex direction="column" align="stretch" gap={ 3 } style={{ padding: '16px', background: '#fff', width: '245px' }}>
                                    <ColorPicker color={ socialData.fontColor } onChange={ ( val ) => updateSettingKey( 'fontColor', val ) } enableAlpha defaultValue="#1d2327" />
                                </Flex>
                            ) }
                        />
                    </FlexItem>

                    {/* Icon Background Color Picker */}
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <label className="components-base-control__label" style={{ display: 'block', marginBottom: '12px', color: '#50575e', fontSize: '13px', fontWeight: 'normal' }}>
                            { __( 'Icon Background Color', 'express-socials-links' ) }
                        </label>
                        <Dropdown
                            popoverProps={{ placement: 'bottom-start' }}
                            renderToggle={ ( { isOpen, onToggle } ) => (
                                <Button variant="secondary" onClick={ onToggle } aria-expanded={ isOpen } style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'flex-start' }}>
                                    <span style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', background: socialData.iconBgColor, border: '1px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />
                                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ socialData.iconBgColor === 'transparent' || !socialData.iconBgColor ? __( 'Select Color', 'express-socials-links' ) : socialData.iconBgColor }</span>
                                </Button>
                            ) }
                            renderContent={ () => (
                                <Flex direction="column" align="stretch" gap={ 3 } style={{ padding: '16px', background: '#fff', width: '245px' }}>
                                    <ColorPicker color={ socialData.iconBgColor } onChange={ ( val ) => updateSettingKey( 'iconBgColor', val ) } enableAlpha defaultValue="transparent" />
                                    <Button isLink isDestructive onClick={ () => updateSettingKey( 'iconBgColor', 'transparent' ) } style={{ alignSelf: 'flex-start' }}>
                                        { __( 'Clear (Transparent)', 'express-socials-links' ) }
                                    </Button>
                                </Flex>
                            ) }
                        />
                    </FlexItem>
                </Flex>
            </FlexItem>

            {/* Text and Icons Size Section */}
            <FlexItem style={ { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' } }>
                <label className="components-base-control__label" style={{ display: 'block', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: '500'   }}>
                    { __( 'SIZE', 'wp-easy-socials-links' ) }
                </label>
                <Flex direction="row" align="stretch" gap={ 4 }>
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <TextControl label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Font Size', 'express-socials-links' ) }</span> }
                            help={ __( 'Enter a typography size value (e.g., 14px, 1rem).', 'express-socials-links' ) } value={ socialData.fontSize }
                            placeholder="14px" onChange={ ( val ) => updateSettingKey( 'fontSize', val ) } style={{ maxWidth: '60px' }}/>
                    </FlexItem>
                    <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                        <TextControl label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Icon Dimensions', 'express-socials-links' ) }</span> }
                            help={ __( 'Enter the icon width and height (e.g., 20px, 24px).', 'express-socials-links' ) }
                            value={ socialData.iconSize } placeholder="20px" onChange={ ( val ) => updateSettingKey( 'iconSize', val ) }
                            style={{ maxWidth: '60px' }}
                        />
                    </FlexItem>
                </Flex>
            </FlexItem>

            {/* Border Section */}
            <FlexItem>
                <label className="components-base-control__label" style={{ display: 'block', marginBottom: '16px', letterSpacing: '0.5px', fontWeight: '500'   }}>
                    { __( 'BORDER', 'express-socials-links' ) }
                </label>
                <Flex direction="column" align="stretch" gap={ 4 }>
                    <ToggleControl
                        label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Show Links Border', 'express-socials-links' ) }</span> }
                        help={ socialData.hasBorder ? __( 'A clean border boundary line will wrap the badges.', 'express-socials-links' ) : __( 'Links display without border grids.', 'express-socials-links' ) }
                        checked={ !!socialData.hasBorder } onChange={ ( val ) => updateSettingKey( 'hasBorder', val ) }
                    />
                    { !!socialData.hasBorder && (
                        <Flex direction="row" align="stretch" gap={ 4 } style={{ width: '100%' }}>
                            <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                                <TextControl 
                                    label={ <span style={{ color: '#50575e', fontSize: '13px', fontWeight: 'normal', textTransform: 'Capitalize' }}>{ __( 'Border Width', 'express-socials-links' ) }</span> }
                                    help={ __( 'Specify thickness (e.g., 1px, 2px).', 'express-socials-links' ) }
                                    value={ socialData.borderWidth } placeholder="1px" onChange={ ( val ) => updateSettingKey( 'borderWidth', val ) }
                                    style={{ maxWidth: '60px' }}
                                />
                            </FlexItem>
                            
                            {/* Border Color Picker */}
                            <FlexItem style={{ flexBasis: '50%', maxWidth: '50%' }}>
                                <label className="components-base-control__label" style={{ display: 'block', marginBottom: '12px', color: '#50575e', fontSize: '13px', fontWeight: 'normal' }}>
                                    { __( 'Border Color', 'express-socials-links' ) }
                                </label>
                                <Dropdown
                                    popoverProps={{ placement: 'bottom-start' }}
                                    renderToggle={ ( { isOpen, onToggle } ) => (
                                        <Button variant="secondary" onClick={ onToggle } aria-expanded={ isOpen } style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', justifyContent: 'flex-start' }}>
                                            <span style={{ display: 'inline-block', width: '16px', height: '16px', borderRadius: '50%', background: socialData.borderColor, border: '1px solid rgba(0,0,0,0.2)', flexShrink: 0 }} />
                                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ socialData.borderColor }</span>
                                        </Button>
                                    ) }
                                    renderContent={ () => (
                                        <Flex direction="column" align="stretch" gap={ 3 } style={{ padding: '16px', background: '#fff', width: '245px' }}>
                                            <ColorPicker color={ socialData.borderColor } onChange={ ( val ) => updateSettingKey( 'borderColor', val ) } enableAlpha defaultValue="#ccd0d4" />
                                        </Flex>
                                    ) }
                                />
                            </FlexItem>
                        </Flex>
                    ) }
                </Flex>
            </FlexItem>

        </Flex>
    );
};

export default GeneralSettings;
