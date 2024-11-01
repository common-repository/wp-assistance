<?php
/*
Plugin Name: Wp-Assistance
Plugin URI: 
Description: This plugin assists the wordpress features, Also this plugin provides the Voice user interface for your wordpress. Whatsapp chat for your website.
Version: 0.0.5
Author: WpAndro
Author URI: https://wpandro.com/
License: GPL-2.0+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt */

define( 'WP_ASISTANCE_URL', plugins_url( '/', __FILE__ ) );
define( 'WP_ASISTANCE_PATH', plugin_dir_path( __FILE__ ) );

function WpAssistanceMicIcon( \WP_Admin_Bar $bar ) {
    $bar->add_menu( array(
        'id'     => 'wp-assistance',
        'parent' => null,
        'group'  => null,
        'title'  => '',
        'href'   => '#',
        'meta'   => array(
            'target'   => '_self',
            'title'    => '',
            'html'     =>   '<div class="mic-bg" id="wp-assistance-mic">
                                <div class="pulse-ring" style="display: none;"></div>
                                <span class="ab-icon dashicons-microphone wp-assistance-mic"></span>
                            </div>
                            <div class="wp-assistance-textarea" id="wp-assistance-textarea-id" style="display: none;">
                                <textarea name="wp-assistance-text" id="wp-assistance-text" style="height: auto"></textarea>
                                <p>
                                    <input type="submit" name="copy" id="wp-assistance-copy" class="button button-primary wp-assistance-btn" value="Copy">
                                    <input type="submit" name="copy" id="wp-assistance-clear" class="button button-primary wp-assistance-btn" value="Clear">
                                    <input type="submit" name="abort" id="wp-assistance-abort" class="button button-primary wp-assistance-btn" value="X" >
                                </p>
                            </div>',
            'class'    => '',
            'rel'      => 'friend',
            'onclick'  => "",
            'tabindex' => PHP_INT_MAX,
        ),
    ) );
}

function WpAssistanceDashIcons(){
    wp_enqueue_style('dashicons');
    wp_enqueue_script('wp-assistance-essential');
}

add_action( 'wp_enqueue_scripts', function() {
    wp_enqueue_style( 'dashicons' );
} );

function loadWpAssistance() {
    $objSettings = get_option( 'WP_ASSISTANCE_SETTINGS' );

    if( true == $objSettings->is_front_end_enable )
        echo '<div class="fe-wpa" id="fe-wpa-id">
              </div>
              <div type="button" id="wpa-whats-app" class="whatsapp-button" style="display:none;">
                <img id="wpa-whatsapp" class="icon-whatsapp" src="https://image.flaticon.com/icons/svg/134/134937.svg">
              </div>
              <script> 
                    var search_url = \'' . home_url() . '\';
                    var whatsapp_number = \'' . $objSettings->whatsapp_number . '\';
                    var voices;
                    window.speechSynthesis.onvoiceschanged = function() {
                        voices = window.speechSynthesis.getVoices();
                    };
                    var objRenuAssistant = new RenuAssistant(\'' . $objSettings->welcome_greeting . '\');
              </script>';
}

wp_enqueue_script( 'jquery' );
wp_enqueue_script('wp-assistance-essential', WP_ASISTANCE_URL . 'js/wp-assistance-essential.js' );
wp_enqueue_style( 'wp-assistance-main', WP_ASISTANCE_URL . 'css/wp-assistance-main.css' );
add_action( 'admin_bar_menu', 'WpAssistanceMicIcon', 1000 );
add_action('wp_enqueue_scripts', 'WpAssistanceDashIcons');

add_action( 'wp_footer', 'loadWpAssistance' );

if( true == is_admin() ) {
    include_once( WP_ASISTANCE_PATH . 'admin/CWAAdmin.class.php');
}

?>