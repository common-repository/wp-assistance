<?php

class CWAAdmin {
    protected $objSettings;
    protected $objCommands;
    
    protected $arrmixTemplateVars;
    
    public function __construct() {
        $this->objSettings = get_option( 'WP_ASSISTANCE_SETTINGS' );
        $this->objCommands = get_option( 'WP_ASSISTANCE_COMMANDS' );

        add_action( 'admin_init', [ $this, 'execute' ] );
        add_action( 'admin_menu', [ $this, 'addMenuPage' ] );
    }
    
    public function execute() {
        switch ( $this->getRequestAction() ) {
            case 'save_settings':
                $this->handleSaveSettings();
                break;
        }
    }
    
    public function addMenuPage() {
        add_menu_page(
            'Wp Assistance',
            'Wp Assistance',
            'manage_options',
            'wp-assistance',
            [ $this, 'renderSettingPage'],
            WP_ASISTANCE_URL . 'admin/images/wp-icon.png',
            6
        );
    }
    
    public function handleSaveSettings() {
        if( false == is_object( $this->objSettings ) ) {
            $this->objSettings = new stdClass();
        }
        
        $this->objSettings->is_front_end_enable = ( NULL !== $this->getRequestData( ['wp_assistance', 'is_front_end_enable' ] ) );
        $this->objSettings->welcome_greeting = sanitize_text_field( $this->getRequestData( ['wp_assistance', 'welcome_greeting'] ) );
        $this->objSettings->whatsapp_number = sanitize_text_field( $this->getRequestData( ['wp_assistance', 'whatsapp_number'] ) );
        
        if( false == update_option( 'WP_ASSISTANCE_SETTINGS', $this->objSettings ) ) {
            add_option( 'WP_ASSISTANCE_SETTINGS', $this->objSettings );
        }
    }
    
    public function renderPage( $strTemplatePath ) {

        foreach( $this->arrmixTemplateVars as $strKey => $arrmixValues ) {
            $$strKey = $arrmixValues;
        }
        
        include_once( $strTemplatePath );
    }
    
    public function renderSettingPage() {

        $this->arrmixTemplateVars['settings'] = $this->objSettings;
        $this->renderPage( WP_ASISTANCE_PATH . 'admin/view/wa-settings.php' );
    }
    
    public function getRequestData( $arrstrRequestKeys ) {
        
        $arrmixRequest = $_REQUEST;
        
        foreach ( $arrstrRequestKeys as $strKey ) {
            $arrmixRequest = true == isset( $arrmixRequest[$strKey] ) ? $arrmixRequest[$strKey] : NULL;
        }
        
        return isset( $arrmixRequest ) ? $arrmixRequest : NULL;
    }
    
    public function getRequestAction() {
        return sanitize_text_field( $this->getRequestData( [ 'action' ] ) );
    }

}

new CWAAdmin();
?>