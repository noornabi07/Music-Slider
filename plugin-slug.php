<?php
/**
 * Plugin Name: Slider Music Player
 * Description: Add a dynamic music player to your WordPress site. Customize playlists, controls, and styling to offer your visitors an engaging audio experience on any device.
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
			add_action( 'init', [ $this, 'register_music_slider_post_type' ] );
			add_shortcode('music_slider_shortcode', [$this, 'music_slider_shortcode_handler']);

			add_filter( 'manage_music_slider_posts_columns',  [$this, 'musicSliderManageColumns'], 10 );
			add_action( 'manage_music_slider_posts_custom_column', [$this, 'musicSliderManageCustomColumns'], 10, 2 );
			add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_scripts']);
			add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_styles']);
		}

		// copy to post id function 
function enqueue_admin_scripts() {
    wp_enqueue_script('custom-admin-script', plugin_dir_url(__FILE__) . 'build/admin-post.js', [], '1.0.0', true);
}

function enqueue_admin_styles() {
    wp_enqueue_style('custom-admin-style', plugin_dir_url(__FILE__) . 'build/admin-post.css');
}

// Post type function
function register_music_slider_post_type(){    
    register_post_type( 'music_slider', [
        'label' => 'Music Slider',
        'labels' => [
        'add_new' => 'Add New Player', // Global page
        'add_new_item' => 'Add New Slider', // When click on new post
        'edit_item' => 'Edit Slider',
        'not_found' => 'There is no slider please add one'
        ],
        'show_in_rest' => true,
        'public' => true,
		'menu_icon' => 'dashicons-controls-volumeon',
        'template'				=> [ ['maps/music-slider'] ],
		'template_lock'			=> 'all',
    ] );
}

// Shortcode function here 
function music_slider_shortcode_handler($attributes){
		$postID = $attributes['id'];
    $post = get_post( $postID );
    $blocks = parse_blocks( $post->post_content );
    ob_start();
    echo render_block( $blocks[0] );
    return ob_get_clean();
}

// colum create function here 
function musicSliderManageColumns($defaults){
			unset($defaults['date']);
			$defaults['shortcode'] = 'ShortCode';
			 $defaults['song'] = 'Number Of Songs';
			$defaults['date'] = 'Date';
			return $defaults;
}

function musicSliderManageCustomColumns($column_name, $post_ID){
    if($column_name == 'shortcode'){
        echo '<div class="bPlAdminShortcode" id="bPlAdminShortcode-' . esc_attr( $post_ID ) . '">
            <input value="[music_slider_shortcode id=' . esc_attr( $post_ID ) . ']" onclick="copyBPlAdminShortcode(\'' . esc_attr( $post_ID ) . '\')" readonly>
            <span class="tooltip">Copy To Clipboard</span>
        </div>';
    }
		elseif($column_name == 'song'){
				// Retrieve the albumItems from post meta
				$content_post = get_post($post_ID);
				$content = $content_post->post_content;
				$blocks = parse_blocks($content);
        echo '<div class="bPlAdminDetails">';
        echo '<strong>Total Songs:</strong> ' . esc_html(count($blocks[0]['attrs']['albumItems'] ?? [])) . '<br>';
        echo '</div>';
    }
}

		function onInit(){
			register_block_type( __DIR__ . '/build' );
		}

	}
	new MAPSPlugin();
}