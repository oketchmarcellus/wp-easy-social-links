/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */


export default function save( { attributes } ) {
    const blockProps = useBlockProps.save();

    // Packaged attributes to match the edit.js logic structure
    const socialDataPayload = {
        social: attributes.social || [],
        showHideSocials: attributes.showHideSocials !== undefined ? attributes.showHideSocials : true,
        showText: attributes.showText !== undefined ? attributes.showText : true,
        hasBorder: attributes.hasBorder !== undefined ? attributes.hasBorder : true,
        linkGap: attributes.linkGap || '',
        textIconGap: attributes.textIconGap || '',
        fontColor: attributes.fontColor || '',
        fontSize: attributes.fontSize || '',
        iconSize: attributes.iconSize || '',
        labelPosition: attributes.labelPosition || '',
        iconBgColor: attributes.iconBgColor || '',
        borderColor: attributes.borderColor || '',
        borderWidth: attributes.borderWidth || ''
    };

    return (
        <div { ...blockProps } 
            className="express-social-links-item-container"
            data-config={ JSON.stringify( socialDataPayload ) }
        >
            {/* Empty container for frontend React Hydration/Rendering */}
        </div>
    );
}