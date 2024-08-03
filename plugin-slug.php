<?php
/**
 * Plugin Name: Music Slider
 * Description: Add a dynamic music player to your WordPress site with the Music Player Slider Block for Gutenberg. Customize playlists, controls, and styling to offer your visitors an engaging audio experience on any device.
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: music-slider
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'MAPS_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'MAPS_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'MAPS_DIR_PATH', plugin_dir_path( __FILE__ ) );

if( !class_exists( 'MAPSPlugin' ) ){
	class MAPSPlugin{
		function __construct(){
			add_action( 'init', [ $this, 'onInit' ] );
		}

		function onInit(){
			register_block_type( __DIR__ . '/build' );
		}
	}
	new MAPSPlugin();
}