import $ from 'jquery';
import 'bootstrap'
import * as mCustomScrollbar from 'mCustomScrollbar';
import * as Waves from 'Waves';
import 'growl';
import 'sweetalert';
import * as autosize from 'autosize';
import 'bootstrapselect';
import 'typeahead';
import 'bloodhound';
import 'lightgallery';
 
export class Enhanceui {
	constructor(){}

    //doesn't require new keyword
	enhance(view){
		/*
	     * Listview Search
	     */
	    if ($('.lvh-search-trigger')[0]) {

	    	var x;
	        $(view).on('click', '.lvh-search-trigger', function(e){
	            e.preventDefault();
	            x = $(this).closest('.lv-header-alt').find('.lvh-search');

	            x.fadeIn(300);
	            x.find('.lvhs-input').focus();
	        });

	        //Close Search
	        $(view).on('click', '.lvh-search-close', function(){
	            x.fadeOut(300);
	            setTimeout(function(){
	                x.find('.lvhs-input').val('');
	            }, 350);
	        })
	    }

		/*
	     * Typeahead Auto Complete
	     */
	     if($('.typeahead')[0]) {

	          var statesArray = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
	            'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
	            'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
	            'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
	            'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
	            'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
	            'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
	            'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
	            'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
	          ];
	        var states = new Bloodhound({
	            datumTokenizer: Bloodhound.tokenizers.whitespace,
	            queryTokenizer: Bloodhound.tokenizers.whitespace,
	            local: statesArray
	        });

	        $('.typeahead').typeahead({
	            hint: true,
	            highlight: true,
	            minLength: 1
	        },
	        {
	          name: 'states',
	          source: states
	        });
	    }

		/*
	     * Dropdown Menu
	     */
	    if($(view).find('.dropdown')[0]) {
		//Propagate
		$(view).on('click', '.dropdown.open .dropdown-menu', function(e){
		    e.stopPropagation();
		});

		$(view).find('.dropdown').on('shown.bs.dropdown', function (e) {
		    if($(this).attr('data-animation')) {
			$animArray = [];
			$animation = $(this).data('animation');
			$animArray = $animation.split(',');
			$animationIn = 'animated '+$animArray[0];
			$animationOut = 'animated '+ $animArray[1];
			$animationDuration = ''
			if(!$animArray[2]) {
			    $animationDuration = 500; //if duration is not defined, default is set to 500ms
			}
			else {
			    $animationDuration = $animArray[2];
			}

			$(this).find('.dropdown-menu').removeClass($animationOut)
			$(this).find('.dropdown-menu').addClass($animationIn);
		    }
		});

		$(view).find('.dropdown').on('hide.bs.dropdown', function (e) {
		    if($(this).attr('data-animation')) {
	    		e.preventDefault();
	    		$this = $(this);
	    		$dropdownMenu = $this.find('.dropdown-menu');

	    		$dropdownMenu.addClass($animationOut);
	    		setTimeout(function(){
	    		    $this.removeClass('open')

	    		}, $animationDuration);
	    	    }
	    	});
	    }

		/*
	     * HTML Editor
	     */
	    if ($(view).find('.html-editor')[0]) {
		   $('.html-editor').summernote({
	            height: 150
	        });
	    }

	    if($(view).find('.html-editor-click')[0]) {
	        //Edit
	        $(view).on('click', '.hec-button', function(){
	            $('.html-editor-click').summernote({
	                focus: true
	            });
	            $('.hec-save').show();
	        })

	        //Save
	        $(view).on('click', '.hec-save', function(){
	            $('.html-editor-click').code();
	            $('.html-editor-click').destroy();
	            $('.hec-save').hide();
	            notify('Content Saved Successfully!', 'success');
	        });
	    }

	    //Air Mode
	    if($(view).find('.html-editor-airmod')[0]) {
	        $('.html-editor-airmod').summernote({
	            airMode: true
	        });
	    }

		/*
	     * Form Wizard
	     */

	    if ($(view).find('.form-wizard-basic')[0]) {
	    	$(view).find('.form-wizard-basic').bootstrapWizard({
	    	    tabClass: 'fw-nav',
	            'nextSelector': '.next',
	            'previousSelector': '.previous'
	    	});
	    }

	    /*
	     * Bootstrap Growl - Notifications popups
	     */
	    // function notify(message, type){
	    //     $.growl({
	    //         message: message
	    //     },{
	    //         type: type,
	    //         allow_dismiss: false,
	    //         label: 'Cancel',
	    //         className: 'btn-xs btn-inverse',
	    //         placement: {
	    //             from: 'top',
	    //             align: 'right'
	    //         },
	    //         delay: 2500,
	    //         animate: {
	    //                 enter: 'animated bounceIn',
	    //                 exit: 'animated bounceOut'
	    //         },
	    //         offset: {
	    //             x: 20,
	    //             y: 85
	    //         }
	    //     });
	    // };

	    

	    /*
	     * Lightbox
	     */
	    // if ($(view).find('.lightbox')[0]) {
	    //     $(view).find('.lightbox').lightGallery({
	    //         enableTouch: true
	    //     });
	    // }

	    /*
	     * Link prevent
	     */
	    $(view).on('click', '.a-prevent', function(e){
	        e.preventDefault();
	    });

	    /*
	     * Collaspe Fix
	     */
	    if ($(view).find('.collapse')[0]) {

	        //Add active class for opened items
	        $$(view).find('.collapse').on('show.bs.collapse', function (e) {
	            $(this).closest('.panel').find('.panel-heading').addClass('active');
	        });

	        $(view).find('.collapse').on('hide.bs.collapse', function (e) {
	            $(this).closest('.panel').find('.panel-heading').removeClass('active');
	        });

	        //Add active class for pre opened items
	        $(view).find('.collapse.in').each(function(){
	            $(this).closest('.panel').find('.panel-heading').addClass('active');
	        });
	    }

	    /*
	     * Tooltips
	     */
	    if ($(view).find('[data-toggle="tooltip"]')[0]) {
	        $(view).find('[data-toggle="tooltip"]').tooltip();
	    }

	    /*
	     * Popover
	     */
	    if ($(view).find('[data-toggle="popover"]')[0]) {
	        $(view).find('[data-toggle="popover"]').popover();
	    }

	    /*
	     * Message
	     */

	    //Actions
	    if ($(view).find('.on-select')[0]) {
	        var checkboxes = '.lv-avatar-content input:checkbox';
	        var actions = $('.on-select').closest('.lv-actions');

	        $(view).on('click', checkboxes, function() {
	            if ($(checkboxes+':checked')[0]) {
	                actions.addClass('toggled');
	            }
	            else {
	                actions.removeClass('toggled');
	            }
	        });
	    }

	    if($(view).find('#ms-menu-trigger')[0]) {
	        $(view).on('click', '#ms-menu-trigger', function(e){
	            e.preventDefault();
	            $(this).toggleClass('open');
	            $('.ms-menu').toggleClass('toggled');
	        });
	    }

		/*
	     * IE 9 Placeholder
	     */
	    if($(view).find('html').hasClass('ie9')) {
	        $(view).find('input, textarea').placeholder({
	            customClass: 'ie9-placeholder'
	        });
	    }
	    
	    /*
	     * Text Feild
	     */

	    //Add blue animated border and remove with condition when focus and blur
	    if($(view).find('.fg-line')[0]) {
	        $(view).on('focus', '.fg-line .form-control', function(){
	            $(this).closest('.fg-line').addClass('fg-toggled');
	        })

	        $(view).on('blur', '.form-control', function(){
	            var p = $(this).closest('.form-group, .input-group');
	            var i = p.find('.form-control').val();

	            if (p.hasClass('fg-float')) {
	                if (i.length == 0) {
	                    $(this).closest('.fg-line').removeClass('fg-toggled');
	                }
	            }
	            else {
	                $(this).closest('.fg-line').removeClass('fg-toggled');
	            }
	        });
	    }

	    //Add blue border for pre-valued fg-flot text feilds
	    if($(view).find('.fg-float')[0]) {
	        $(view).find('.fg-float .form-control').each(function(){
	            var i = $(this).val();

	            if (!i.length == 0) {
	                $(this).closest('.fg-line').addClass('fg-toggled');
	            }

	        });
	    }

	    /*
	     * Audio and Video
	     */
	    if($(view).find('audio, video')[0]) {
	        $(view).find('video,audio').mediaelementplayer();
	    }

	    /*
	     * Tag Select
	     */
	    if($(view).find('.chosen')[0]) {
	        $(view).find('.chosen').chosen({
	            width: '100%',
	            allow_single_deselect: true
	        });
	    }

	    /*
	     * Input Slider
	     */
	    //Basic
	    if($(view).find('.input-slider')[0]) {
	        $(view).find('.input-slider').each(function(){
	            var isStart = $(this).data('is-start');

	            $(this).noUiSlider({
	                start: isStart,
	                range: {
	                    'min': 0,
	                    'max': 100,
	                }
	            });
	        });
	    }

	    //Range slider
	    if($(view).find('.input-slider-range')[0]) {
	      $(view).find('.input-slider-range').noUiSlider({
	          start: [30, 60],
	          range: {
	            'min': 0,
	            'max': 100
	          },
	          connect: true
	      });
	    }

	    //Range slider with value
	    if($(view).find('.input-slider-values')[0]) {
	      $(view).find('.input-slider-values').noUiSlider({
	          start: [ 45, 80 ],
	          connect: true,
	          direction: 'rtl',
	          behaviour: 'tap-drag',
	          range: {
	            'min': 0,
	            'max': 100
	          }
	      });

	      $(view).find('.input-slider-values').Link('lower').to($('#value-lower'));
	      $(view).find('.input-slider-values').Link('upper').to($('#value-upper'), 'html');
	    }

	    /*
	     * Input Mask
	     */
	    if ($(view).find('input-mask')[0]) {
	        $(view).find('.input-mask').mask();
	    }

	    /*
	     * Color Picker
	     */
	    if ($(view).find('.color-picker')[0]) {
	      $(view).find('.color-picker').each(function(){
	            var colorOutput = $(this).closest('.cp-container').find('.cp-value');
	            $(this).farbtastic(colorOutput);
	        });
	    }

	    /*
	     * Skin Change
	     */
	    $(view).on('click', '[data-skin]', function() {
	        var currentSkin = $(view).find('[data-current-skin]').data('current-skin');
	        var skin = $(this).data('skin');

	        $(view).find('[data-current-skin]').attr('data-current-skin', skin)

	    });

	    /*
	     * Auto Hight Textarea
	     */
	    if ($(view).find('.auto-size')[0]) {
	     //autosize($(view).find('.auto-size'));
	     autosize.default($('.auto-size')); 
	    }

	    /*
	    * Profile Menu
	    */
	    $(view).on('click', '.profile-menu > a', function(e){
	        e.preventDefault();
	        $(this).parent().toggleClass('toggled');
	      $(this).next().slideToggle(200);
	    });

	    /*
	     * Top Search
	     */
	    (function(){
	        $(view).on('click', '#top-search > a', function(e){
	            e.preventDefault();

	            $(view).find('#header').addClass('search-toggled');
	            $(view).find('#top-search-wrap input').focus();
	        });

	        $(view).on('click', '#top-search-close', function(e){
	            e.preventDefault();

	            $(view).find('#header').removeClass('search-toggled');
	        });
	    })();
	    
	    /*
	     * disappears scrollbars from side panels 
	     */
	    if (!$('html').hasClass('ismobile')) {
	        //On Custom Class
	        if ($(view).find('.c-overflow')[0]) {
	            this.scrollBar('.c-overflow', 'minimal-dark', 'y');
	        }
	    }
	    
	    /*
	     * Waves Animation
	     */
	    Waves.attach('.btn:not(.btn-icon):not(.btn-float)');
	    Waves.attach('.btn-icon, .btn-float', ['waves-circle', 'waves-float']);
	    Waves.init();

	    /*
	     * Sidebar
	     */
	    (function(){
	        //Toggle
	        $(view).on('click', '#menu-trigger, #chat-trigger', function(e){
	            e.preventDefault();
	            var x = $(this).data('trigger');

	            $(x).toggleClass('toggled');
	            $(this).toggleClass('open');

	          //Close opened sub-menus
	          $(view).find('.sub-menu.toggled').not('.active').each(function(){
	            $(this).removeClass('toggled');
	            $(this).find('ul').hide();
	          });



	      $(view).find('.profile-menu .main-menu').hide();

	            if (x == '#sidebar') {

	                var $elem = '#sidebar';
	                var $elem2 = '#menu-trigger';

	                $(view).find('#chat-trigger').removeClass('open');

	                if (!$(view).find('#chat').hasClass('toggled')) {
	                    $(view).find('#header').toggleClass('sidebar-toggled');
	                }
	                else {
	                    $(view).find('#chat').removeClass('toggled');
	                }
	            }

	            if (x == '#chat') {
	                var $elem = '#chat';
	                var $elem2 = '#chat-trigger';

	                $(view).find('#menu-trigger').removeClass('open');

	                if (!$(view).find('#sidebar').hasClass('toggled')) {
	                    $(view).find('#header').toggleClass('sidebar-toggled');
	                }
	                else {
	                    $(view).find('#sidebar').removeClass('toggled');
	                }
	            }

	            //When clicking outside
	            if ($(view).find('#header').hasClass('sidebar-toggled')) {
	                $(view).on('click', function (e) {
	                    if (($(e.target).closest($elem).length === 0) && ($(e.target).closest($elem2).length === 0)) {
	                        setTimeout(function(){
	                            $($elem).removeClass('toggled');
	                            $('#header').removeClass('sidebar-toggled');
	                            $($elem2).removeClass('open');
	                        });
	                    }
	                });
	            }
	        })

	        //Submenu
	        $(view).on('click', '.sub-menu > a', function(e){
	            e.preventDefault();
	            $(this).next().slideToggle(200);
	            $(this).parent().toggleClass('toggled');
	        });
	    })();
	
	}/* function ends */

	scrollBar(selector, theme, mousewheelaxis) {
      $(selector).mCustomScrollbar({
          theme: theme,
          scrollInertia: 100,
          axis:'yx',
          mouseWheel: {
              enable: true,
              axis: mousewheelaxis,
              preventDefault: true
          }
      });
    }

    notify(message, type){
        $.growl({
            message: message
        },{
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'top',
                align: 'right'
            },
            delay: 2500,
            animate: {
                    enter: 'animated fadeIn',
                    exit: 'animated fadeOut'
            },
            offset: {
                x: 20,
                y: 85
            }
        });
    }
}