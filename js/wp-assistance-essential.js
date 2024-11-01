function RenuAssistant( welcomeGreeting ) {
	this.welcomeGreeting = welcomeGreeting;
};

RenuAssistant.prototype = {
	
	welcomeGreeting: '',
	voice: null,

	greet: function( onEnd ) {
		if( !('speechSynthesis' in window) ) {
			 return false;
		}
		
		if( '' == this.welcomeGreeting ) {
			return false;
		}
		
		var msg = new SpeechSynthesisUtterance();
		msg.voice = voices[4];
		msg.text = this.welcomeGreeting;
		msg.onend = onEnd;
		speechSynthesis.speak(msg);
	}
};

function CopyToClipBoard() {
  var copyText = document.getElementById("wp-assistance-text");
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand("copy");
}

function isMobile() {
	  let check = false;
	  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	  return check;
};

var final_transcript = ''
var interim_transcript = ''
if ( !('webkitSpeechRecognition' in window) ) {
    jQuery('#wpadminbar #wp-assistance-mic').html('Your browser is not compatible for speech recognization, Please use latest Chrome browser.');
} else {
    var recognition = new webkitSpeechRecognition();
	recognition.continuous = true;
	recognition.interimResults = true;
    recognition.onstart = function() {
	    recognizing = true;
	};

	recognition.onerror = function(event) {
		if (event.error == 'no-speech') {
		}
		if (event.error == 'audio-capture') {
		}
		if (event.error == 'not-allowed') {
			ignore_onend = true;
		}
	};

	recognition.onend = function() {
		recognizing = false;
		jQuery('.pulse-ring').hide();
        final_transcript = ''
        interim_transcript = ''
        jQuery('#wp-assistance-text').text('');
	};

	recognition.onresult = function(event) {
		var interim_transcript = '';
		if (typeof(event.results) == 'undefined') {
			recognition.onend = null;
			recognition.stop();
			return;
		}
		for (var i = event.resultIndex; i < event.results.length; ++i) {
		if (event.results[i].isFinal) {
			final_transcript += event.results[i][0].transcript;
		} else {
			interim_transcript += event.results[i][0].transcript;
		}
	}
    if ( interim_transcript) {
        jQuery('#wp-assistance-text').text( interim_transcript )
        	if( jQuery('#fe-wpa-text').length > 0 ) {
        		jQuery('#fe-wpa-text').val( interim_transcript );
        	}
    }
    if ( final_transcript) {
        jQuery('#wp-assistance-text').text( final_transcript )
        if( jQuery('#fe-wpa-text').length > 0 ) {
        	jQuery('#fe-wpa-text').val( final_transcript );
        }
    }
  };
}


jQuery(function(){
    if ( !('webkitSpeechRecognition' in window) ) {
        jQuery('#wpadminbar #wp-admin-bar-wp-assistance').html('<p>Your browser is not compatible for speech recognization, Please use latest Chrome browser.</p>');
    } 
    
    jQuery('#wpadminbar #wp-assistance-mic').click(function(e){
        jQuery('#wp-assistance-textarea-id').show();
        jQuery('.pulse-ring').show();
        recognition.start();
    });
    jQuery('#wpadminbar #wp-assistance-copy').click(function(e){
       CopyToClipBoard();
    });
    jQuery('#wpadminbar #wp-assistance-abort').click(function(e){
        recognition.stop();
        final_transcript = ''
        interim_transcript = ''
        jQuery('#wp-assistance-text').text('');
        jQuery('.pulse-ring').hide();
        jQuery('#wp-assistance-textarea-id').hide();
    });
    jQuery('#wpadminbar #wp-assistance-clear').click(function(e){
        recognition.stop();
        jQuery('.pulse-ring').hide();
        final_transcript = ''
        interim_transcript = ''
        jQuery('#wp-assistance-text').text('');
    });
});

jQuery(function() {
	
    if ( !('webkitSpeechRecognition' in window) ) {
        return false;
    } 
    
	if( jQuery('#fe-wpa-id').length <= 0 ) {
		return false;
	}
	
	if( '' != whatsapp_number ) {
		jQuery('#wpa-whats-app').show();
	}
	
	jQuery('#fe-wpa-id').html( '<form id="fe-wpa-search" action="' + search_url + '"><input id="fe-wpa-text" type="text" name="s" value="" placeholder="Search" style="display: none" /> <button id="speech" class="btn"><span class="dashicons dashicons-microphone fe-wpa-mic"></span><div class="pulse-ring" style="display:none;"></div></form>' );

	jQuery('#fe-wpa-id').click( function( e ) {
		e.preventDefault();
		if( true == jQuery( '.fe-wpa-mic ').hasClass( 'dashicons-microphone' ) ) {
			jQuery( '#fe-wpa-id .pulse-ring').show();
			jQuery( '#fe-wpa-text' ).show();
			jQuery( '.fe-wpa-mic' ).removeClass( 'dashicons-microphone' );
			jQuery( '.fe-wpa-mic' ).addClass( 'dashicons-search' );
			objRenuAssistant.greet(function(){
								
			});
			recognition.start();
	
		} else {
			jQuery( '#fe-wpa-id .pulse-ring').hide();
			jQuery( '#fe-wpa-text' ).hide();
			jQuery( '.fe-wpa-mic' ).addClass( 'dashicons-microphone' );
			jQuery( '.fe-wpa-mic' ).removeClass( 'dashicons-search' );
			jQuery( '#fe-wpa-search').submit();
			recognition.stop();
		}
	}); 
	
	jQuery('#wpa-whatsapp').click(function( e ) {
		window.open( 'https://api.whatsapp.com/send?phone=' + whatsapp_number + '&text=Hello, I am interested!' );
	});
});