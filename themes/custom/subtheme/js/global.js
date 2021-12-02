/**
 * @file
 * Global utilities.
 *
 */
(function ($, Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_barrio_subtheme = {
    attach: function (context, settings) {

$( ".navbar-toggler-icon" ).click(function() {
   var element = document.getElementById("tbm-menu-principal");
   element.classList.add("tbm--mobile-show");
});

    }
  };

})(jQuery, Drupal);
