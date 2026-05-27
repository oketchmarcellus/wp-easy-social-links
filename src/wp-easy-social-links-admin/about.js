import { __experimentalText as Text, ExternalLink, Flex, FlexItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const About = () => {
  return (
    /* Outer layout flex container wrapper stretched to 100% width */
    <Flex direction="column" align="stretch" gap={ 4 } style={{ width: '100%', maxWidth: '100%' }} style={ { borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '8px'} }>
      
      {/* Description Item Block */}
      <FlexItem>
        <Text as="p" style={{ margin: 0, fontStyle: 'italic', fontSize: '14px', color: '#50575e' }}>
          { __( 'This is a simple plugin to help you quickly add your company social media icons and links to your WordPress site.', 'wp-easy-social-links' ) }
        </Text>
      </FlexItem>

      {/* Usage Guidelines Item Block */}
      <FlexItem>
        <Text as="p" style={{ margin: 0, fontStyle: 'italic', fontSize: '14px', color: '#50575e' }}>
          { __( 'Add widget to your site by dragging it from the Gutenberg Widgets panel and dropping it where you want it to appear on the page.', 'wp-easy-social-links ' ) }
        </Text>
      </FlexItem>

      {/* Links Container Block */}
      <FlexItem style={{ marginTop: '10px' }}>
        <Flex direction="row" align="start" gap={ 20 } justify='flex-start'>
          <FlexItem>
            <ExternalLink href="https://yourcompany.com">
              { __( 'Visit our Help Center', 'wp-easy-social-links' ) }
            </ExternalLink>
          </FlexItem>

          <FlexItem>
            <ExternalLink href="https://profiles.wordpress.org/marcellus89/">
              { __( 'View developer profile on WordPress.org', 'wp-easy-social-links' ) }
            </ExternalLink>
          </FlexItem>
        </Flex>
      </FlexItem>

    </Flex>
  );
};

export default About;
