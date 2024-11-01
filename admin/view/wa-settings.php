<div class="wpAssistance">
    <div class="container">
        <h1>General Settings</h1>
        <div class="pane">
            <div class="wrap">
                <form action="" method="post" >
                    <table class="form-table">
                        <tr>
                            <th>Enable front end assistance:</th>
                            <td>
                                <input type="checkbox" name="wp_assistance[is_front_end_enable]" class="regular-text" value="1" <?php echo ( true == isset( $settings->is_front_end_enable ) && true == $settings->is_front_end_enable  ? 'checked="checked"' : '' )?>>
                                <p class="description" id="tagline-description">This will display the Wp Assistance at front end. Gives your website ability to listen from your users and search.</p>
                            </td>
                        </tr>
                        <tr>
                        	<th>Welcome Greeting:</th>
                        	<td>
                        		<input type="text" name="wp_assistance[welcome_greeting]" class="regular-text welcome-greeting" value="<?php echo ( true == isset( $settings->welcome_greeting ) ? $settings->welcome_greeting : '' ) ?>" placeholder="Welcome, How may I assist you?" />
                        		<p class="description" >Adding value here will enable Renu intelligent assistant, When a vistor clicks on the mic icon, Renu will greet a vistor. </p>
                        	</td>
                        </tr>
                        <tr>
                        	<th>Whatsapp Assistance:</th>
                        	<td>
                        		<input type="text" name="wp_assistance[whatsapp_number]" class="regular-text welcome-greeting" value="<?php echo ( true == isset( $settings->whatsapp_number ) ? $settings->whatsapp_number : '' ) ?>" placeholder="+91XXXXXXXXXX" />
                        		<p class="description" >Add a whats app number where you want to receive a messages from your visitors. Add number with country code. This will display a whats app icon from where your visitors can contact you.</p>
                        	</td>
                        </tr>
                    </table>
                    <input type='hidden' name='action' value='save_settings' >
                    <p class="submit"><input type="submit" name="submit" id="submit" class="button button-primary" value="Save Changes"></p>
                </form>
            </div>
        </div>
    </div>
</div>