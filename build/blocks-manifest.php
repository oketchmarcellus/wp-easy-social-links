<?php
// This file is generated. Do not modify it manually.
return array(
	'express-social-links-admin' => array(
		'apiVersion' => 3,
		'name' => 'express-social-links/express-social-links-admin',
		'editorScript' => 'file:./index.js'
	),
	'express-social-links-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/express-social-links-block',
		'version' => '0.1.0',
		'title' => 'Express Social Links',
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
		'textdomain' => 'express-social-links',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'render' => 'file:./render.php'
	)
);
