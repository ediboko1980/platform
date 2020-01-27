import * as URI from "uri-js";
import * as _ from 'underscore'; 
import $ from 'jquery';              
import jQuery from 'jquery';       
import 'bootstrap';             
import 'bootstrap/dist/css/bootstrap.css';   
import 'bootstrap-switch';        
import 'bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css';         
import 'font-awesome/css/font-awesome.css'  
import '../css/site.css'
import '../css/material-icons.css'
import * as UiCommon from './ui/common.js'
import * as Common from './common.js'
import './ui/menu.js'

$(document).ready(function () {

    if (typeof mock !== 'undefined') { console.log("backend mock") };

        $("#domain_type_syncloud").click(function (event) {
				event.preventDefault();
				$("#domain_type").val('syncloud');
		});

		$("#domain_type_custom").click(function (event) {
				event.preventDefault();
				$("#domain_type").val('custom');
		});

		$("#form_activate").submit(function (event) {
				event.preventDefault();

				var values = $("#form_activate").serializeArray();

				var btn = $('#btn_activate');
				btn.button('loading');
				$("#form_activate input").prop("disabled", true);
				hide_fields_errors("form_activate");

				var on_always = function() {
					btn.button('reset');
					$("#form_activate input").prop("disabled", false);
				};

   				if ( $("#domain_type").val() == 'syncloud') {
					backend.activate(
						values,
						on_always,
						backend.login,
						ui_display_error);
				} else {
					backend.activate_custom_domain(
						values,
						on_always,
						backend.login,
						ui_display_error);
				}
		});
});

