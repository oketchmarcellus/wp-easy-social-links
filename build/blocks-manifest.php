<?php
// This file is generated. Do not modify it manually.
return array(
	'wp-easy-social-links-admin' => array(
		'apiVersion' => 3,
		'name' => 'wp-easy-social-links/wp-easy-social-links-admin',
		'editorScript' => 'file:./index.js'
	),
	'wp-easy-social-links-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/wp-easy-social-links-block',
		'version' => '0.1.0',
		'title' => 'WP Easy Social Links',
		'category' => 'dashicons-share',
		'icon' => 'share-alt',
		'description' => 'A Simple Social media plugin for adding social media links to your WordPress website.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'social' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'showHideSocials' => array(
				'type' => 'boolean'
			),
			'showText' => array(
				'type' => 'boolean'
			),
			'hasBorder' => array(
				'type' => 'boolean'
			),
			'linkGap' => array(
				'type' => 'string'
			),
			'textIconGap' => array(
				'type' => 'string'
			),
			'fontColor' => array(
				'type' => 'string'
			),
			'fontSize' => array(
				'type' => 'string'
			),
			'iconSize' => array(
				'type' => 'string'
			),
			'labelPosition' => array(
				'type' => 'string'
			),
			'iconBgColor' => array(
				'type' => 'string'
			),
			'borderColor' => array(
				'type' => 'string'
			),
			'borderWidth' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'marcels-easy-socials',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	)
);
