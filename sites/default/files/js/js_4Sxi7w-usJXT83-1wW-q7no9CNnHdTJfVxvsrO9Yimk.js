/**
 * @file
 * Defines Javascript behaviors for MegaMenu backend.
 */

Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($, Drupal, drupalSettings) {
  "use strict";

  Drupal.behaviors.tbMegaMenuBackendAction = {
    attach: function (context) {
      $('select[name="tb-megamenu-animation"]').change(function () {
        $('#tb-megamenu-duration-wrapper').css({'display': ($(this).val() == 'none' ? 'none' : 'inline-block')});
        $('#tb-megamenu-delay-wrapper').css({'display': ($(this).val() == 'none' ? 'none' : 'inline-block')});
      });

      $(".tb-megamenu-column-inner .close").click(function () {
        $(this).parent().html("");
      });

      $("#tb-megamenu-admin select").chosen({
        disable_search_threshold : 15,
        allow_single_deselect: true
      });

      /* Init TB Mega Menu. */
      if (drupalSettings.TBMegaMenu.menu_name !== undefined) {
        $("#tb-megamenu-admin-mm-container").megamenuAdmin({menu_name: drupalSettings.TBMegaMenu.menu_name});
      }
    }
  };
})(jQuery, Drupal, drupalSettings);

;
/**
 * @file
 * Defines Javascript behaviors for MegaMenu toolbox.
 */

Drupal.TBMegaMenu = Drupal.TBMegaMenu || {};

(function ($, Drupal, drupalSettings) {
  "use strict";

  var currentSelected = null, megamenu, nav_items, nav_subs, nav_cols, nav_all;
  var modalTimeout;
  Drupal.TBMegaMenu.lockedAjax = false;

  Drupal.TBMegaMenu.lockAjax = function () {
    Drupal.TBMegaMenu.lockedAjax = true;
  };

  Drupal.TBMegaMenu.isLockedAjax = function () {
    return Drupal.TBMegaMenu.lockedAjax;
  };

  Drupal.TBMegaMenu.releaseAjax = function () {
    Drupal.TBMegaMenu.lockedAjax = false;
  };

  $.fn.megamenuAdmin = function (options) {
    var defaultOptions = {};
    var options = $.extend(defaultOptions, options);
    megamenu = $(this).find('.tb-megamenu');
    nav_items = megamenu.find('ul[class*="level"]>li>:first-child');
    nav_subs = megamenu.find('.nav-child');
    nav_cols = megamenu.find('[class*="span"]');

    nav_all = nav_items.add(nav_subs).add(nav_cols);
    nav_items.each(function () {
      var a = $(this);
      var liitem = a.closest('li');
      if (liitem.attr('data-hidesub') == 1) {
        var sub = liitem.find('.nav-child:first');
        sub.css('display', 'none');
        a.removeClass('dropdown-toggle').attr('data-toggle', '');
        liitem.removeClass('dropdown dropdown-submenu mega');
      }
    });

    hide_toolbox(true);

    bindEvents(nav_all);
    $('.toolbox-action, .toolbox-toggle, .toolbox-input').unbind("focus blur click change keydown");
    $('.tb-megamenu-admin-mm-row').click(function (event) {
      event.stopPropagation();
    });

    $(document.body).click(function (event) {
      hide_toolbox(true);
    });
    $('.back-megamenu-toolbox').click(function (event) {
      hide_toolbox(true);
    });

    $('.toolbox-action').click(function (event) {
      var action = $(this).attr('data-action');
      if (action) {
        actions.datas = $(this).data();
        actions[action](options);
      }
      event.stopPropagation();
      return false;
    });

    $('.toolbox-toggle').change(function (event) {
      var action = $(this).attr('data-action');
      if (action) {
        actions.datas = $(this).data();
        actions[action](options);
      }
      event.stopPropagation();
      return false;
    });

    $('.toolbox-input').bind('focus blur click', function (event) {
      event.stopPropagation();
      return false;
    });

    $('.toolbox-input').bind('keydown', function (event) {
      if (event.keyCode == '13') {
        apply_toolbox(this);
        event.preventDefault();
      }
    });

    $('.toolbox-input').change(function (event) {
      apply_toolbox(this);
      event.stopPropagation();
      return false;
    });
    return this;
  };

  var actions = {};
  actions.data = {};
  actions.toggleSub = function () {
    if (!currentSelected) {
      return;
    }
    var liitem = currentSelected.closest('li'),
            sub = liitem.find('.nav-child:first');
    if (parseInt(liitem.attr('data-group'))) {
      return;
    }
    if (sub.length == 0 || sub.css('display') == 'none') {
      if (sub.length == 0) {
        var column = ++drupalSettings.TBMegaMenu.TBElementsCounter.column;
        sub = $('<div class="tb-megamenu-submenu nav-child dropdown-menu mega-dropdown-menu"><div class="row-fluid"><div id=tb-megamenu-column-' + column + ' class="span12" data-width="12"><div class="mega-inner"></div></div></div></div>').appendTo(liitem);
        bindEvents(sub.find('[class*="span"]'));
        liitem.addClass('mega');
      }
      else {
        sub.css('display', '');
        liitem.attr('data-hidesub', 0);
      }
      liitem.attr('data-group', 0);
      currentSelected.addClass('dropdown-toggle').attr('data-toggle', 'dropdown');
      liitem.addClass(liitem.attr('data-level') == 1 ? 'dropdown' : 'dropdown-submenu');
      bindEvents(sub);
    }
    else {
      unbindEvents(sub);
      if (liitem.find('ul.level-' + liitem.attr('data-level')).length > 0) {
        sub.css('display', 'none');
        liitem.attr('data-hidesub', 1);
      }
      else {
        sub.remove();
      }
      liitem.attr('data-group', 0);
      currentSelected.removeClass('dropdown-toggle').attr('data-toggle', '');
      liitem.removeClass('dropdown dropdown-submenu mega');
    }
    update_toolbox();
  };

  actions.toggleAutoArrow = function () {
    var toggle = $('.toolitem-auto-arrow');
    toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
    if (parseInt(toggle.attr('data-auto-arrow'))) {
      update_toggle(toggle, 0);
      toggle.attr('data-auto-arrow', 0);
    }
    else {
      update_toggle(toggle, 1);
      toggle.attr('data-auto-arrow', 1);
    }
  };

  actions.toggleAlwayShowSubmenu = function () {
    var toggle = $('.toolitem-always-show-submenu');
    toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
    if (parseInt(toggle.attr('data-always-show-submenu'))) {
      update_toggle(toggle, 0);
      toggle.attr('data-always-show-submenu', 0);
    }
    else {
      update_toggle(toggle, 1);
      toggle.attr('data-always-show-submenu', 1);
    }
  };

  actions.showBlockTitle = function () {
    if (!currentSelected) {
      return;
    }
    var toggle = $('.toolcol-showblocktitle');
    toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
    if (parseInt(currentSelected.attr('data-showblocktitle'))) {
      update_toggle(toggle, 0);
      currentSelected.attr('data-showblocktitle', 0);
    }
    else {
      update_toggle(toggle, 1);
      currentSelected.attr('data-showblocktitle', 1);
    }
    if ($('#tb-megamenu-block-wrapper select[name="toolcol-block"]').val() != '') {
      var value = $('#tb-megamenu-block-wrapper select[name="toolcol-block"]').val();
      $('#tb-megamenu-admin-mm-tb #toolbox-loading').show();
      callAjax({'action': 'load_block', 'block_id': value, 'id': currentSelected.attr('id'), 'showblocktitle': parseInt(currentSelected.attr('data-showblocktitle'))});
    }
  };

  actions.toggleGroup = function () {
    if (!currentSelected) {
      return;
    }
    var liitem = currentSelected.parent();
    var sub = liitem.find('.nav-child:first');
    if (liitem.attr('data-level') == 1) {
      return;
    } // Ignore for top level.
    if (parseInt(liitem.attr('data-group'))) {
      liitem.attr('data-group', 0);
      liitem.removeClass('mega-group').addClass('dropdown-submenu');
      currentSelected.addClass('dropdown-toggle').attr('data-toggle', 'dropdown');
      sub.removeClass('mega-group-ct').addClass('dropdown-menu mega-dropdown-menu');
      sub.css('width', sub.attr('data-width'));
      rebindEvents(sub);
    }
    else {
      currentSelected.removeClass('dropdown-toggle').attr('data-toggle', '');
      liitem.attr('data-group', 1);
      liitem.removeClass('dropdown-submenu').addClass('mega-group');
      sub.removeClass('dropdown-menu mega-dropdown-menu').addClass('mega-group-ct');
      sub.css('width', '');
      rebindEvents(sub);
    }
    update_toolbox();
  };

  actions.hideWhenCollapse = function () {
    if (!currentSelected) {
      return;
    }
    var type = toolbox_type();
    if (type == 'sub') {
      var liitem = currentSelected.closest('li');
      if (parseInt(liitem.attr('data-hidewcol'))) {
        liitem.attr('data-hidewcol', 0);
        liitem.removeClass('sub-hidden-collapse');
      }
      else {
        liitem.attr('data-hidewcol', 1);
        liitem.addClass('sub-hidden-collapse');
      }
    }
    else if (type == 'col') {
      if (parseInt(currentSelected.attr('data-hidewcol'))) {
        currentSelected.attr('data-hidewcol', 0);
        currentSelected.removeClass('hidden-collapse');
      }
      else {
        currentSelected.attr('data-hidewcol', 1);
        currentSelected.addClass('hidden-collapse');
      }
    }
    update_toolbox();
  };

  actions.alignment = function () {
    var liitem = currentSelected.closest('li');
    liitem.removeClass('mega-align-left mega-align-center mega-align-right mega-align-justify').addClass('mega-align-' + actions.datas.align);
    if (actions.datas.align == 'justify') {
      currentSelected.addClass('span12');
      currentSelected.css('width', '');
    }
    else {
      currentSelected.removeClass('span12');
      if (currentSelected.attr('data-width')) {
        currentSelected.css('width', currentSelected.attr('data-width'));
      }
    }
    liitem.attr('data-alignsub', actions.datas.align);
    update_toolbox();
  };

  actions.moveItemsLeft = function () {
    if (!currentSelected) {
      return;
    }
    var $item = currentSelected.closest('li'),
            $liparent = $item.parent().closest('li'),
            level = $liparent.attr('data-level'),
            $col = $item.closest('[class*="span"]'),
            $items = $col.find('ul:first > li'),
            itemidx = $items.index($item),
            $moveitems = $items.slice(0, itemidx + 1),
            itemleft = $items.length - $moveitems.length,
            $rows = $col.parent().parent().children('[class*="row"]'),
            $cols = $rows.children('[class*="span"]').filter(function () {
      return !$(this).attr('data-block')
    }),
            colidx = $cols.index($col);
    if (!$liparent.length) {
      return;
    } // Need make this is mega first.

    if (colidx == 0) {
      var oldSelected = currentSelected;
      currentSelected = $col;
      actions.datas.addfirst = true;
      actions.addColumn();
      $cols = $rows.children('[class*="span"]').filter(function () {
        return !$(this).attr('data-block')
      });
      currentSelected = oldSelected;
      colidx++;
    }
    var $tocol = $($cols[colidx - 1]);
    var $ul = $tocol.find('ul:first');
    if (!$ul.length) {
      $ul = $('<ul class="mega-nav level' + level + ' tb-megamenu-subnav">').appendTo($tocol.children('.mega-inner'));
    }
    $moveitems.appendTo($ul);
    if (itemleft == 0) {
      $col.find('ul:first').remove();
    }
    update_toolbox();
  };

  actions.moveItemsRight = function () {
    if (!currentSelected) {
      return;
    }
    var $item = currentSelected.closest('li'),
        $liparent = $item.parent().closest('li'),
        level = $liparent.attr('data-level'),
        $col = $item.closest('[class*="span"]'),
        $items = $col.find('ul:first > li'),
        itemidx = $items.index($item),
        $moveitems = $items.slice(itemidx),
        itemleft = $items.length - $moveitems.length,
        $rows = $col.parent().parent().children('[class*="row"]'),
        $cols = $rows.children('[class*="span"]').filter(function () {
          return $(this).children('.mega-inner').children('.tb-megamenu-block').length == 0;
        });

    var colidx = $cols.index($col);
    if (!$liparent.length) {
      return;
    } // Need make this is mega first.

    if (colidx == $cols.length - 1) {
      var oldSelected = currentSelected;
      currentSelected = $col;
      actions.datas.addfirst = false;
      actions.addColumn();
      $cols = $rows.children('[class*="span"]').filter(function () {
        return $(this).children('.mega-inner').children('.tb-megamenu-block').length == 0;
      }),
      currentSelected = oldSelected;
    }
    var $tocol = $($cols[colidx + 1]);
    var $ul = $tocol.find('.mega-inner ul.tb-megamenu-subnav:first');
    if (!$ul.length) {
      $ul = $('<ul class="mega-nav level' + level + ' tb-megamenu-subnav">').appendTo($tocol.children('.mega-inner'));
    }
    $moveitems.prependTo($ul);
    if (itemleft == 0) {
      $col.find('ul:first').remove();
    }
    show_toolbox(currentSelected);
  };

  actions.addRow = function () {
    if (!currentSelected) {
      return;
    }
    var column = ++drupalSettings.TBMegaMenu.TBElementsCounter.column;
    var $row = $('<div class="row-fluid"><div id=tb-megamenu-column-' + column + ' class="span12"><div class="mega-inner"></div></div></div>').appendTo(currentSelected.find('[class*="row"]:first').parent()),
        $col = $row.children();
    bindEvents($col);
    currentSelected = null;
    show_toolbox($col);
  };

  actions.rowUp = function () {
    if (!currentSelected) {
      return;
    }
    var $row = $(currentSelected.closest('.row-fluid'));
    var $rows = $row.parent();
    var $prevRow = $row.prev();
    if ($prevRow.length == 0) {
      return;
    }
    var trow = $row.clone();
    var trow1 = $prevRow.clone();
    $row.replaceWith(trow1);
    $prevRow.replaceWith(trow);
    // Reset all events on new structure.
    megamenu = $('#tb-megamenu-admin-mm-container').find('.tb-megamenu');
    nav_items = megamenu.find('ul[class*="level"]>li>:first-child');
    nav_subs = megamenu.find('.nav-child');
    nav_cols = megamenu.find('[class*="span"]');
    nav_all = nav_items.add(nav_subs).add(nav_cols);
    bindEvents(nav_all);
    currentSelected = $rows.find('.selected');
  }

  actions.rowDown = function () {
    if (!currentSelected) {
      return;
    }
    var $row = $(currentSelected.closest('.tb-megamenu-row'));
    var $rows = $row.parent();
    var $nextRow = $row.next();
    if ($nextRow.length == 0) {
      return;
    }
    var trow = $row.clone();
    var trow1 = $nextRow.clone();
    $row.replaceWith(trow1);
    $nextRow.replaceWith(trow);

    // Reset all events on new structure.
    megamenu = $('#tb-megamenu-admin-mm-container').find('.tb-megamenu');
    nav_items = megamenu.find('ul[class*="level"]>li>:first-child');
    nav_subs = megamenu.find('.nav-child');
    nav_cols = megamenu.find('[class*="span"]');
    nav_all = nav_items.add(nav_subs).add(nav_cols);
    bindEvents(nav_all);

    currentSelected = $rows.find('.selected');
  }

  actions.addColumn = function () {
    if (!currentSelected) {
      return;
    }
    var $cols = currentSelected.parent().children('[class*="span"]');
    var colcount = $cols.length + 1;
    var colwidths = defaultColumnsWidth(colcount);
    var column = ++drupalSettings.TBMegaMenu.TBElementsCounter.column;
    var $col = $('<div id=tb-megamenu-column-' + column + '><div class="mega-inner"></div></div>');
    if (actions.datas.addfirst) {
      $col.prependTo(currentSelected.parent());
    }
    else {
      $col.insertAfter(currentSelected);
    }
    $cols = $cols.add($col);
    bindEvents($col);
    $cols.each(function (i) {
      $(this).removeClass('span' + $(this).attr('data-width')).addClass('span' + colwidths[i]).attr('data-width', colwidths[i]);
    });
    show_toolbox($col);
  };

  actions.removeColumn = function () {
    if (!currentSelected) {
      return;
    }

    var $col = currentSelected,
        $row = $col.parent(),
        $rows = $row.parent().children('[class*="row"]'),
        $allcols = $rows.children('[class*="span"]'),
        $allmenucols = $allcols.filter(function () { return !$(this).attr('data-block'); }),
        $haspos = $allcols.filter(function () { return $(this).attr('data-block'); }).length,
        $cols = $row.children('[class*="span"]'),
        colcount = $cols.length - 1,
        colwidths = defaultColumnsWidth(colcount),
        type_menu = $col.attr('data-block') ? false : true;

    if ((type_menu && ((!$haspos && $allmenucols.length == 1) || ($haspos && $allmenucols.length == 0))) || $allcols.length == 1) {
      show_toolbox($(currentSelected).closest('.tb-megamenu-item'));
      currentSelected = $(currentSelected).closest('.tb-megamenu-item');
      currentSelected.find('.tb-megamenu-submenu').remove();

    }
    // If this is the only one column left.
    else {
      if (type_menu) {
        var colidx = $allmenucols.index($col),
            tocol = colidx == 0 ? $allmenucols[1] : $allmenucols[colidx - 1];

        $col.find('ul:first > li').appendTo($(tocol).find('ul:first'));
      }

      var colidx = $allcols.index($col),
          nextActiveCol = colidx == 0 ? $allcols[1] : $allcols[colidx - 1];

      if (colcount < 1) {
        $row.remove();
      }
      else {
        $cols = $cols.not($col);
        $cols.each(function (i) {
          $(this).removeClass('span' + $(this).attr('data-width')).addClass('span' + colwidths[i]).attr('data-width', colwidths[i]);
        });
        $col.remove();
      }
      show_toolbox($(nextActiveCol));
    }
  };

  actions.resetConfig = function (options) {
    if (Drupal.TBMegaMenu.isLockedAjax()) {
      window.setTimeout(function () {
        actions.resetConfig(options);
      }, 200);
      return;
    }
    Drupal.TBMegaMenu.lockAjax();
    $('#tb-megamenu-admin-mm-tb #toolbox-message').html("").hide();
    $('#tb-megamenu-admin-mm-tb #toolbox-loading').show();
    $.ajax({
      type: "POST",
      url: drupalSettings.TBMegaMenu.saveConfigURL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        'action': 'load',
        'theme': drupalSettings.TBMegaMenu.theme,
        'menu_name': options['menu_name']
      }),
      complete: function (r) {
        switch (r.status) {
          // If an error occurred only set a status message.
          case 500:
            var statusMsg = r.responseText;
            break;
          // When successful revert the configuration displayed in the UI.
          default:
            $('#tb-megamenu-admin-mm-container').html(r.responseText).megamenuAdmin({'menu_name': options['menu_name']});
            // Collapse all expanded menu items.
            $('#tb-megamenu-admin-mm-container').find('.mega-inner').children('span.close').click(function () {
              $(this).parent().html("");
            });
            // Set a confirmation message.
            var statusMsg = Drupal.t("All unsaved changes have been reverted.");
        }
        // Display the status message modal.
        status_modal(r.status, statusMsg);

        Drupal.TBMegaMenu.releaseAjax();
      }
    });
  };

  actions.saveConfig = function (options) {
    if (Drupal.TBMegaMenu.isLockedAjax()) {
      window.setTimeout(function () {
        actions.saveConfig(options);
      }, 200);
      return;
    }
    Drupal.TBMegaMenu.lockAjax();
    var menu_config = {}, items = megamenu.find('ul[class*="level"] > li');
    items.each(function () {
      var $this = $(this),
          id = $this.attr('data-id'),
          rows = [];
      var level = parseInt($this.attr('data-level'));
      var $sub = $this.find('.nav-child:first');
      var $rows = $sub.find('[class*="row"]:first').parent().children('[class*="row"]');
      $rows.each(function () {
        var $cols = $(this).children('[class*="span"]');
        var cols = [];
        $cols.each(function () {
          var col_config = {};
          col_config['width'] = $(this).attr('data-width') ? $(this).attr('data-width') : "";
          col_config['class'] = $(this).attr('data-class') ? $(this).attr('data-class') : "";
          col_config['hidewcol'] = $(this).attr('data-hidewcol') ? $(this).attr('data-hidewcol') : "";
          col_config['showblocktitle'] = $(this).attr('data-showblocktitle') ? $(this).attr('data-showblocktitle') : "1";
          var col = {'col_content': [], 'col_config': col_config};
          $(this).find('ul[class*="level"] > li').each(function () {
            var sub_level = parseInt($(this).attr('data-level'));
            if (sub_level == level + 1) {
              var ele = {};
              ele['plugin_id'] = $(this).attr('data-id');
              ele['type'] = $(this).attr('data-type');
              ele['tb_item_config'] = {};
              col['col_content'].push(ele);
            }
          });
          $(this).children('.mega-inner').children('.tb-megamenu-block').each(function () {
            var ele = {};
            ele['block_id'] = $(this).attr('data-block');
            ele['type'] = $(this).attr('data-type');
            ele['tb_item_config'] = {};
            col['col_content'].push(ele);
          });
          if (col['col_content'].length) {
            cols.push(col);
          }
        });
        if (cols.length) {
          rows.push(cols);
        }
      });
      var submenu_config = {};
      submenu_config['width'] = $this.children('.mega-dropdown-menu').attr('data-width') ? $this.children('.mega-dropdown-menu').attr('data-width') : "";
      submenu_config['class'] = $this.children('.mega-dropdown-menu').attr('data-class') ? $this.children('.mega-dropdown-menu').attr('data-class') : "";
      submenu_config['group'] = $this.attr('data-group') ? $this.attr('data-group') : 0;
      var item_config = {};
      item_config['class'] = $this.attr('data-class') ? $this.attr('data-class') : "";
      item_config['xicon'] = $this.attr('data-xicon') ? $this.attr('data-xicon') : "";
      item_config['caption'] = $this.attr('data-caption') ? $this.attr('data-caption') : "";
      item_config['alignsub'] = $this.attr('data-alignsub') ? $this.attr('data-alignsub') : "";
      item_config['group'] = $this.attr('data-group') ? $this.attr('data-group') : "";
      item_config['hidewcol'] = $this.attr('data-hidewcol') ? $this.attr('data-hidewcol') : 1;
      item_config['hidesub'] = $this.attr('data-hidesub') ? $this.attr('data-hidesub') : 1;
      item_config['label'] = $this.attr('data-label') ? $this.attr('data-label') : "";
      var config = {'rows_content': rows, 'submenu_config': submenu_config, 'item_config': item_config};
      menu_config[id] = config;
    });
    var block_config = {};
    block_config['animation'] = $('select[name="tb-megamenu-animation"]').val();
    block_config['duration'] = parseInt($('input[name="tb-megamenu-duration"]').val());
    block_config['delay'] = parseInt($('input[name="tb-megamenu-delay"]').val());
    block_config['style'] = $('select[name="tb-megamenu-style"]').val();
    block_config['auto-arrow'] = $('#tb-megamenu-admin-mm-intro .toolitem-auto-arrow').attr('data-auto-arrow');
    block_config['always-show-submenu'] = $('#tb-megamenu-admin-mm-intro .toolitem-always-show-submenu').attr('data-always-show-submenu');
    block_config['number-columns'] = drupalSettings.TBMegaMenu.TBElementsCounter.column;
    $('#tb-megamenu-admin-mm-tb #toolbox-message').html("").hide();
    $('#tb-megamenu-admin-mm-tb #toolbox-loading').show();
    $.ajax({
      type: "POST",
      url: drupalSettings.TBMegaMenu.saveConfigURL,
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify({
        'action': 'save',
        'theme': drupalSettings.TBMegaMenu.theme,
        'menu_name': options['menu_name'],
        'menu_config': menu_config,
        'block_config': block_config
      }),
      complete: function (r) {
        // Set the status message based on the response.
        var statusMsg = r.responseText;
        // Show the status message modal.
        status_modal(r.status, statusMsg);

        Drupal.TBMegaMenu.releaseAjax();
      }
    });
  };

  var status_modal = function (code, statusMsg) {
    // Clear any previously set timeouts and hide any visible modals.
    clearTimeout(modalTimeout);
    $('#tb-megamenu-admin-mm-tb #toolbox-message').html("").hide();
    // Set the message container class based on the status code.
    switch (code) {
      case 500:
        var msgClass = 'messages--error';
        break;
      default:
        var msgClass = 'messages--status';
    }
    // Hide the loading animation.
    $('#tb-megamenu-admin-mm-tb #toolbox-loading').hide();
    // Build the modal status message container.
    var $div = $('<div class="messages ' + msgClass + '" role="contentinfo" aria-label="Status message"><h2 class="visually-hidden">Status message</h2><span class="close fa fa-times-circle" title="Dismiss this message">&nbsp;</span>' + statusMsg + '</div>');
    // Show the modal and bind a click event to its close (X) button.
    $('#tb-megamenu-admin-mm-tb #toolbox-message').html($div).show();
    $('#tb-megamenu-admin-mm-tb #toolbox-message span.close').click(function () {
      $(this).parent().html("").hide();
    });
    // Auto-dismiss all success messages after a delay.
    if (code == 200) {
      modalTimeout = window.setTimeout(function () {
        $('#tb-megamenu-admin-mm-tb #toolbox-message').html("").hide();
      }, 7000);
    }
  }

  var toolbox_type = function () {
    return currentSelected ? currentSelected.hasClass('nav-child') ? 'sub' : (currentSelected[0].tagName == 'DIV' ? 'col' : 'item') : false;
  };

  var hide_toolbox = function (show_intro) {
    $('#tb-megamenu-admin-mm-tb .admin-toolbox').hide();
    currentSelected = null;
    if (megamenu && megamenu.data('nav_all')) {
      megamenu.data('nav_all').removeClass('selected');
    }
    megamenu.find('li').removeClass('open');
    if (show_intro) {
      $('#tb-megamenu-admin-mm-intro').show();
    }
    else {
      $('#tb-megamenu-admin-mm-intro').hide();
    }
  };

  var show_toolbox = function (selected) {
    if (!selected.hasClass('tb-megamenu-column') && !selected.hasClass('tb-megamenu-submenu')) {
      var level = parseInt($(selected).parent().attr('data-level'));
      if (level > 1) {
        $("#toogle-group-wrapper").show();
        $("#toogle-break-column-wrapper").show();
      }
      else {
        $("#toogle-group-wrapper").hide();
        $("#toogle-break-column-wrapper").hide();
      }
    }
    hide_toolbox(false);
    if (selected) {
      currentSelected = selected;
    }
    // Remove class open for other.
    megamenu.find('ul[class*="level"] > li').each(function () {
      if (!$(this).has(currentSelected).length > 0) {
        $(this).removeClass('open');
      }
      else {
        $(this).addClass('open');
      }
    });

    // Set selected.
    megamenu.data('nav_all').removeClass('selected');
    currentSelected.addClass('selected');
    var type = toolbox_type();
    $('#tb-megamenu-admin-mm-tool' + type).show();
    update_toolbox(type);

    $('#tb-megamenu-admin-mm-tb').show();
  };

  var update_toolbox = function (type) {
    if (!type) {
      type = toolbox_type();
    }
    $('#tb-megamenu-admin-mm-tb .disabled').removeClass('disabled');
    $('#tb-megamenu-admin-mm-tb .active').removeClass('active');
    switch (type) {
      case 'item':
        var liitem = currentSelected.closest('li'),
            liparent = liitem.parent().closest('li'),
            sub = liitem.find('.nav-child:first');

        $('.toolitem-exclass').val(liitem.attr('data-class'));
        $('.toolitem-xicon').val(liitem.attr('data-xicon'));
        $('.toolitem-caption').val(liitem.attr('data-caption'));

        var toggle = $('.toolitem-sub');
        toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
        if (parseInt(liitem.attr('data-group'))) {
          toggle.addClass('disabled');
        }
        else if (sub.length == 0 || sub.css('display') == 'none') {
          update_toggle(toggle, 0);
        }
        else {
          update_toggle(toggle, 1);
        }

        var toggle = $('.toolitem-group');
        toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
        if (parseInt(liitem.attr('data-level')) == 1 || sub.length == 0 || parseInt(liitem.attr('data-hidesub')) == 1) {
          $('.toolitem-group').addClass('disabled');
        }
        else if (parseInt(liitem.attr('data-group'))) {
          update_toggle(toggle, 1);
        }
        else {
          update_toggle(toggle, 0);
        }

        if (!liparent.length || !liparent.hasClass('mega')) {
          $('.toolitem-moveleft, .toolitem-moveright').addClass('disabled');
        }
        break;

      case 'sub':
        var liitem = currentSelected.closest('li');
        $('.toolsub-exclass').attr('value', currentSelected.attr('data-class') || '');

        if (parseInt(liitem.attr('data-group'))) {
          $('.toolsub-width').attr('value', '').addClass('disabled');
          $('.toolitem-alignment').addClass('disabled');
        }
        else {
          $('.toolsub-width').val(currentSelected.attr('data-width'));
          if (parseInt(liitem.attr('data-level')) > 1) {
            $('.toolsub-align-center').addClass('disabled');
            $('.toolsub-align-justify').addClass('disabled');
          }

          if (liitem.attr('data-alignsub')) {
            $('.toolsub-align-' + liitem.attr('data-alignsub')).addClass('active');
            if (liitem.attr('data-alignsub') == 'justify') {
              $('.toolsub-width').addClass('disabled');
            }
          }
        }

        var toggle = $('.toolsub-hidewhencollapse');
        toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
        if (parseInt(liitem.attr('data-hidewcol'))) {
          update_toggle(toggle, 1);
        }
        else {
          update_toggle(toggle, 0);
        }
        break;

      case 'col':
        $('.toolcol-exclass').attr('value', currentSelected.attr('data-class') || '');
        $('.toolcol-block').val(currentSelected.children('.mega-inner').children('.tb-megamenu-block').attr('data-block') || '').trigger("chosen:updated");
        $('.toolcol-width').val(currentSelected.attr('data-width') || '').trigger("chosen:updated");
        if (currentSelected.find('.mega-nav').length > 0) {
          $('.toolcol-block').parent().addClass('disabled');
        }
        if (currentSelected.parent().children().length == 1) {
          $('.toolcol-width').parent().addClass('disabled');
        }

        var toggle = $('.toolcol-hidewhencollapse');
        toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
        if (parseInt(currentSelected.attr('data-hidewcol'))) {
          update_toggle(toggle, 1);
        }
        else {
          update_toggle(toggle, 0);
        }
        var toggle = $('.toolcol-showblocktitle');
        toggle.find('label').removeClass('active btn-success btn-danger btn-primary');
        if (!currentSelected.attr('data-showblocktitle') || parseInt(currentSelected.attr('data-showblocktitle'))) {
          update_toggle(toggle, 1);
        }
        else {
          update_toggle(toggle, 0);
        }
        break;
    }
  };

  var update_toggle = function (toggle, val) {
    var $input = toggle.find('input[value="' + val + '"]');
    /**
     * We use this function to set the check attribute.
     * For jquery 1.9 or higher, instead of $input.attr('checked', 'checked');
     */
    $input.prop("checked", true);
    $input.trigger('update');
  };

  var apply_toolbox = function (input) {
    var name = $(input).attr('data-name'),
            value = input.value,
            type = toolbox_type();
    switch (name) {
      case 'width':
        value = parseInt(value);
        if (isNaN(value)) {
          value = "";
          if (type == 'sub') {
            currentSelected.width(value);
          }
          if (type == 'col') {
            currentSelected.removeClass('span' + currentSelected.attr('data-' + name));
          }
          currentSelected.attr('data-' + name, value);
        }
        else {
          if (type == 'sub') {
            currentSelected.width(value);
          }
          if (type == 'col') {
            currentSelected.removeClass('span' + currentSelected.attr('data-' + name)).addClass('span' + value);
          }
          currentSelected.attr('data-' + name, value);
        }
        $(input).val(value);
        break;

      case 'duration':
        value = parseInt(value);
        if (isNaN(value)) {
          value = "";
        }
        $(input).val(value);
        break;

      case 'delay':
        value = parseInt(value);
        if (isNaN(value)) {
          value = "";
        }
        $(input).val(value);
        break;

      case 'class':
        if (type == 'item') {
          var item = currentSelected.closest('li');
        }
        else {
          var item = currentSelected;
        }
        item.removeClass(item.attr('data-' + name) || '').addClass(value);
        item.attr('data-' + name, value);
        break;

      case 'xicon':
        if (type == 'item') {
          currentSelected.closest('li').attr('data-' + name, value);
          currentSelected.find('i').remove();
          var escapedInputText = Drupal.checkPlain(value);
          if (value) {
            currentSelected.prepend($('<i class="' + escapedInputText + '"></i>'));
          }
        }
        break;

      case 'caption':
        if (type == 'item') {
          currentSelected.closest('li').attr('data-' + name, value);
          currentSelected.find('span.mega-caption').remove();
          var escapedInputText = Drupal.checkPlain(value);
          if (value) {
            currentSelected.append($('<span class="mega-caption">' + escapedInputText + '</span>'));
          }
        }
        break;

      case 'block':
        if (currentSelected.find('ul[class*="level"]').length == 0) {
          if (value) {
            $('#tb-megamenu-admin-mm-tb #toolbox-loading').show();
            callAjax({'action': 'load_block', 'block_id': value, 'id': currentSelected.attr('id'), 'showblocktitle': parseInt(currentSelected.attr('data-showblocktitle'))});
          }
          else {
            currentSelected.find('.mega-inner').html('');
          }
          currentSelected.attr('data-' + name, value);
        }
        break;
    }
  };
  var callAjax = function (data) {
    if (Drupal.TBMegaMenu.isLockedAjax()) {
      window.setTimeout(function () {
        callAjax(data);
      }, 200);
      return;
    }
    Drupal.TBMegaMenu.lockAjax();
    switch (data.action) {
      case 'load_block':
        $.ajax({
          type: "POST",
          url: drupalSettings.TBMegaMenu.saveConfigURL,
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          complete: function (msg) {
            // Check if a valid block was loaded & a JSON object was returned.
            var isJson = true;
            try {
              var resp = $.parseJSON(msg.responseText);
            }
            catch(err) {
              isJson = false;
            }
            // If we received a block, display it in the UI.
            if (isJson) {
              var content = resp.content ? resp.content : "";
              var id = resp.id ? resp.id : "";
              // Add a close (remove) button and bind a click event to it.
              var close_button = $('<span class="close fa fa-times-circle" title="' + Drupal.t("Remove this block") + '">&nbsp;</span>');
              var currentElement = $("#" + id);
              if (currentElement.length) {
                currentElement.children('.mega-inner').html("").append(close_button).append($(content)).find(':input').removeAttr('name');
                currentElement.children('.mega-inner').children('span.close').click(function () {
                  $(this).parent().html("");
                });
              }
              // Hide the loading animation.
              $('#tb-megamenu-admin-mm-tb #toolbox-loading').hide();
            }
            // If no JSON was received display an error in the modal.
            else {
              var statusMsg = msg.responseText;
              status_modal(msg.status, statusMsg);
            }

            Drupal.TBMegaMenu.releaseAjax();
          }
        });
        break;

      case 'load':
        break;

      default:
        break;
    }
  };

  var defaultColumnsWidth = function (count) {
    if (count < 1) {
      return null;
    }
    var total = 12,
            min = Math.floor(total / count),
            widths = [];
    for (var i = 0; i < count; i++) {
      widths[i] = min;
    }
    widths[count - 1] = total - min * (count - 1);
    return widths;
  };

  var bindEvents = function (els) {
    if (megamenu.data('nav_all')) {
      megamenu.data('nav_all', megamenu.data('nav_all').add(els));
    }
    else {
      megamenu.data('nav_all', els);
    }

    els.mouseover(function (event) {
      megamenu.data('nav_all').removeClass('hover');
      var $this = $(this);
      clearTimeout(megamenu.attr('data-hovertimeout'));
      megamenu.attr('data-hovertimeout', setTimeout(function () {$this.addClass('hover')}, 100));
      event.stopPropagation();
    });
    els.mouseout(function (event) {
      clearTimeout(megamenu.attr('data-hovertimeout'));
      $(this).removeClass('hover');
    });
    els.click(function (event) {
      show_toolbox($(this));
      event.stopPropagation();
      return false;
    });
  };

  var unbindEvents = function (els) {
    megamenu.data('nav_all', megamenu.data('nav_all').not(els));
    els.unbind('mouseover').unbind('mouseout').unbind('click');
  };

  var rebindEvents = function (els) {
    unbindEvents(els);
    bindEvents(els);
  };

  $.extend(Drupal.TBMegaMenu, {
    prepare: function () {
      var panel = $('#jform_params_mm_type').closest('.controls');
      panel.append($('#tb-megamenu-admin').removeClass('hidden'));
      if ($('#jform_params_navigation_type').val() == 'megamenu') {
        setTimeout(function () {
          $('#jform_params_mm_type').trigger('change.less');
        }, 500);
      }
      else {
        $('#jform_params_navigation_type').bind('change', function (e) {
          if ($(this).val() == 'megamenu') {
            $('#jform_params_mm_type').trigger('change.less');
          }
        });
      }
    },
    tb_megamenu: function (form, ctrlelm, ctrl, rsp) {
      $('#tb-megamenu-admin-mm-container').html(rsp).megamenuAdmin().find(':input').removeAttr('name');
    },
    initPanel: function () {
      $('#jform_params_mm_panel').hide();
    },
    initPreSubmit: function () {
      var form = document.adminForm;
      if (!form) {
        return false;
      }

      var onsubmit = form.onsubmit;
      form.onsubmit = function (e) {
        $('.toolbox-saveConfig').trigger('click');
        if ($.isfunction (onsubmit)) {
          onsubmit();
        }
      };
    },
    initRadioGroup: function () {
      var tb_megamenu_instance = $('.tb-megamenu-admin');
      tb_megamenu_instance.find('.radio.btn-group label').addClass('btn');
      tb_megamenu_instance.find('.btn-group label').unbind('click').click(function () {
        var label = $(this), input = $('#' + label.attr('for'));
        if (!input.attr('checked')) {
          label.closest('.btn-group').find('label').removeClass('active btn-success btn-danger btn-primary');
          label.addClass('active ' + (input.val() == '' ? 'btn-primary' : (input.val() == 0 ? 'btn-danger' : 'btn-success')));
          input.attr('checked', true).trigger('change');
        }
      });

      tb_megamenu_instance.find('input[type=radio]').bind('update', function () {
        if (this.checked) {
          $(this).closest('.btn-group')
                 .find('label').removeClass('active btn-success btn-danger btn-primary')
                 .filter('[for="' + this.id + '"]')
                 .addClass('active ' + ($(this).val() == '' ? 'btn-primary' : ($(this).val() == 0 ? 'btn-danger' : 'btn-success')));
        }
      });

      tb_megamenu_instance.find('.btn-group input[checked=checked]').each(function () {
        if ($(this).val() == '') {
          $('label[for=' + $(this).attr('id') + ']').addClass('active btn-primary');
        }
        else if ($(this).val() == 0) {
          $('label[for=' + $(this).attr('id') + ']').addClass('active btn-danger');
        }
        else {
          $('label[for=' + $(this).attr('id') + ']').addClass('active btn-success');
        }
      });
    }
  });

  $(window).on('load', function () {
    Drupal.TBMegaMenu.initPanel();
    Drupal.TBMegaMenu.initPreSubmit();
    Drupal.TBMegaMenu.initRadioGroup();
    Drupal.TBMegaMenu.prepare();
  });
})(jQuery, Drupal, drupalSettings);
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

Drupal.debounce = function (func, wait, immediate) {
  var timeout = void 0;
  var result = void 0;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var context = this;
    var later = function later() {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
    }
    return result;
  };
};;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, debounce) {
  var liveElement = void 0;
  var announcements = [];

  Drupal.behaviors.drupalAnnounce = {
    attach: function attach(context) {
      if (!liveElement) {
        liveElement = document.createElement('div');
        liveElement.id = 'drupal-live-announce';
        liveElement.className = 'visually-hidden';
        liveElement.setAttribute('aria-live', 'polite');
        liveElement.setAttribute('aria-busy', 'false');
        document.body.appendChild(liveElement);
      }
    }
  };

  function announce() {
    var text = [];
    var priority = 'polite';
    var announcement = void 0;

    var il = announcements.length;
    for (var i = 0; i < il; i++) {
      announcement = announcements.pop();
      text.unshift(announcement.text);

      if (announcement.priority === 'assertive') {
        priority = 'assertive';
      }
    }

    if (text.length) {
      liveElement.innerHTML = '';

      liveElement.setAttribute('aria-busy', 'true');

      liveElement.setAttribute('aria-live', priority);

      liveElement.innerHTML = text.join('\n');

      liveElement.setAttribute('aria-busy', 'false');
    }
  }

  Drupal.announce = function (text, priority) {
    announcements.push({
      text: text,
      priority: priority
    });

    return debounce(announce, 200)();
  };
})(Drupal, Drupal.debounce);;
window.matchMedia||(window.matchMedia=function(){"use strict";var e=window.styleMedia||window.media;if(!e){var t=document.createElement("style"),i=document.getElementsByTagName("script")[0],n=null;t.type="text/css";t.id="matchmediajs-test";i.parentNode.insertBefore(t,i);n="getComputedStyle"in window&&window.getComputedStyle(t,null)||t.currentStyle;e={matchMedium:function(e){var i="@media "+e+"{ #matchmediajs-test { width: 1px; } }";if(t.styleSheet){t.styleSheet.cssText=i}else{t.textContent=i}return n.width==="1px"}}}return function(t){return{matches:e.matchMedium(t||"all"),media:t||"all"}}}());
;
(function(){if(window.matchMedia&&window.matchMedia("all").addListener){return false}var e=window.matchMedia,i=e("only all").matches,n=false,t=0,a=[],r=function(i){clearTimeout(t);t=setTimeout(function(){for(var i=0,n=a.length;i<n;i++){var t=a[i].mql,r=a[i].listeners||[],o=e(t.media).matches;if(o!==t.matches){t.matches=o;for(var s=0,l=r.length;s<l;s++){r[s].call(window,t)}}}},30)};window.matchMedia=function(t){var o=e(t),s=[],l=0;o.addListener=function(e){if(!i){return}if(!n){n=true;window.addEventListener("resize",r,true)}if(l===0){l=a.push({mql:o,listeners:s})}s.push(e)};o.removeListener=function(e){for(var i=0,n=s.length;i<n;i++){if(s[i]===e){s.splice(i,1)}}};return o}})();
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, debounce) {
  var offsets = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };

  function getRawOffset(el, edge) {
    var $el = $(el);
    var documentElement = document.documentElement;
    var displacement = 0;
    var horizontal = edge === 'left' || edge === 'right';

    var placement = $el.offset()[horizontal ? 'left' : 'top'];

    placement -= window['scroll' + (horizontal ? 'X' : 'Y')] || document.documentElement['scroll' + (horizontal ? 'Left' : 'Top')] || 0;

    switch (edge) {
      case 'top':
        displacement = placement + $el.outerHeight();
        break;

      case 'left':
        displacement = placement + $el.outerWidth();
        break;

      case 'bottom':
        displacement = documentElement.clientHeight - placement;
        break;

      case 'right':
        displacement = documentElement.clientWidth - placement;
        break;

      default:
        displacement = 0;
    }
    return displacement;
  }

  function calculateOffset(edge) {
    var edgeOffset = 0;
    var displacingElements = document.querySelectorAll('[data-offset-' + edge + ']');
    var n = displacingElements.length;
    for (var i = 0; i < n; i++) {
      var el = displacingElements[i];

      if (el.style.display === 'none') {
        continue;
      }

      var displacement = parseInt(el.getAttribute('data-offset-' + edge), 10);

      if (isNaN(displacement)) {
        displacement = getRawOffset(el, edge);
      }

      edgeOffset = Math.max(edgeOffset, displacement);
    }

    return edgeOffset;
  }

  function calculateOffsets() {
    return {
      top: calculateOffset('top'),
      right: calculateOffset('right'),
      bottom: calculateOffset('bottom'),
      left: calculateOffset('left')
    };
  }

  function displace(broadcast) {
    offsets = calculateOffsets();
    Drupal.displace.offsets = offsets;
    if (typeof broadcast === 'undefined' || broadcast) {
      $(document).trigger('drupalViewportOffsetChange', offsets);
    }
    return offsets;
  }

  Drupal.behaviors.drupalDisplace = {
    attach: function attach() {
      if (this.displaceProcessed) {
        return;
      }
      this.displaceProcessed = true;

      $(window).on('resize.drupalDisplace', debounce(displace, 200));
    }
  };

  Drupal.displace = displace;
  $.extend(Drupal.displace, {
    offsets: offsets,

    calculateOffset: calculateOffset
  });
})(jQuery, Drupal, Drupal.debounce);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var activeItem = Drupal.url(drupalSettings.path.currentPath);

  $.fn.drupalToolbarMenu = function () {
    var ui = {
      handleOpen: Drupal.t('Extend'),
      handleClose: Drupal.t('Collapse')
    };

    function toggleList($item, switcher) {
      var $toggle = $item.children('.toolbar-box').children('.toolbar-handle');
      switcher = typeof switcher !== 'undefined' ? switcher : !$item.hasClass('open');

      $item.toggleClass('open', switcher);

      $toggle.toggleClass('open', switcher);

      $toggle.find('.action').text(switcher ? ui.handleClose : ui.handleOpen);
    }

    function toggleClickHandler(event) {
      var $toggle = $(event.target);
      var $item = $toggle.closest('li');

      toggleList($item);

      var $openItems = $item.siblings().filter('.open');
      toggleList($openItems, false);
    }

    function linkClickHandler(event) {
      if (!Drupal.toolbar.models.toolbarModel.get('isFixed')) {
        Drupal.toolbar.models.toolbarModel.set('activeTab', null);
      }

      event.stopPropagation();
    }

    function initItems($menu) {
      var options = {
        class: 'toolbar-icon toolbar-handle',
        action: ui.handleOpen,
        text: ''
      };

      $menu.find('li > a').wrap('<div class="toolbar-box">');

      $menu.find('li').each(function (index, element) {
        var $item = $(element);
        if ($item.children('ul.toolbar-menu').length) {
          var $box = $item.children('.toolbar-box');
          options.text = Drupal.t('@label', {
            '@label': $box.find('a').text()
          });
          $item.children('.toolbar-box').append(Drupal.theme('toolbarMenuItemToggle', options));
        }
      });
    }

    function markListLevels($lists, level) {
      level = !level ? 1 : level;
      var $lis = $lists.children('li').addClass('level-' + level);
      $lists = $lis.children('ul');
      if ($lists.length) {
        markListLevels($lists, level + 1);
      }
    }

    function openActiveItem($menu) {
      var pathItem = $menu.find('a[href="' + window.location.pathname + '"]');
      if (pathItem.length && !activeItem) {
        activeItem = window.location.pathname;
      }
      if (activeItem) {
        var $activeItem = $menu.find('a[href="' + activeItem + '"]').addClass('menu-item--active');
        var $activeTrail = $activeItem.parentsUntil('.root', 'li').addClass('menu-item--active-trail');
        toggleList($activeTrail, true);
      }
    }

    return this.each(function (selector) {
      var $menu = $(this).once('toolbar-menu');
      if ($menu.length) {
        $menu.on('click.toolbar', '.toolbar-box', toggleClickHandler).on('click.toolbar', '.toolbar-box a', linkClickHandler);

        $menu.addClass('root');
        initItems($menu);
        markListLevels($menu);

        openActiveItem($menu);
      }
    });
  };

  Drupal.theme.toolbarMenuItemToggle = function (options) {
    return '<button class="' + options.class + '"><span class="action">' + options.action + '</span> <span class="label">' + options.text + '</span></button>';
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var options = $.extend({
    breakpoints: {
      'toolbar.narrow': '',
      'toolbar.standard': '',
      'toolbar.wide': ''
    }
  }, drupalSettings.toolbar, {
    strings: {
      horizontal: Drupal.t('Horizontal orientation'),
      vertical: Drupal.t('Vertical orientation')
    }
  });

  Drupal.behaviors.toolbar = {
    attach: function attach(context) {
      if (!window.matchMedia('only screen').matches) {
        return;
      }

      $(context).find('#toolbar-administration').once('toolbar').each(function () {
        var model = new Drupal.toolbar.ToolbarModel({
          locked: JSON.parse(localStorage.getItem('Drupal.toolbar.trayVerticalLocked')),
          activeTab: document.getElementById(JSON.parse(localStorage.getItem('Drupal.toolbar.activeTabID'))),
          height: $('#toolbar-administration').outerHeight()
        });

        Drupal.toolbar.models.toolbarModel = model;

        Object.keys(options.breakpoints).forEach(function (label) {
          var mq = options.breakpoints[label];
          var mql = window.matchMedia(mq);
          Drupal.toolbar.mql[label] = mql;

          mql.addListener(Drupal.toolbar.mediaQueryChangeHandler.bind(null, model, label));

          Drupal.toolbar.mediaQueryChangeHandler.call(null, model, label, mql);
        });

        Drupal.toolbar.views.toolbarVisualView = new Drupal.toolbar.ToolbarVisualView({
          el: this,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.toolbarAuralView = new Drupal.toolbar.ToolbarAuralView({
          el: this,
          model: model,
          strings: options.strings
        });
        Drupal.toolbar.views.bodyVisualView = new Drupal.toolbar.BodyVisualView({
          el: this,
          model: model
        });

        model.trigger('change:isFixed', model, model.get('isFixed'));
        model.trigger('change:activeTray', model, model.get('activeTray'));

        var menuModel = new Drupal.toolbar.MenuModel();
        Drupal.toolbar.models.menuModel = menuModel;
        Drupal.toolbar.views.menuVisualView = new Drupal.toolbar.MenuVisualView({
          el: $(this).find('.toolbar-menu-administration').get(0),
          model: menuModel,
          strings: options.strings
        });

        Drupal.toolbar.setSubtrees.done(function (subtrees) {
          menuModel.set('subtrees', subtrees);
          var theme = drupalSettings.ajaxPageState.theme;
          localStorage.setItem('Drupal.toolbar.subtrees.' + theme, JSON.stringify(subtrees));

          model.set('areSubtreesLoaded', true);
        });

        Drupal.toolbar.views.toolbarVisualView.loadSubtrees();

        $(document).on('drupalViewportOffsetChange.toolbar', function (event, offsets) {
          model.set('offsets', offsets);
        });

        model.on('change:orientation', function (model, orientation) {
          $(document).trigger('drupalToolbarOrientationChange', orientation);
        }).on('change:activeTab', function (model, tab) {
          $(document).trigger('drupalToolbarTabChange', tab);
        }).on('change:activeTray', function (model, tray) {
          $(document).trigger('drupalToolbarTrayChange', tray);
        });

        if (Drupal.toolbar.models.toolbarModel.get('orientation') === 'horizontal' && Drupal.toolbar.models.toolbarModel.get('activeTab') === null) {
          Drupal.toolbar.models.toolbarModel.set({
            activeTab: $('.toolbar-bar .toolbar-tab:not(.home-toolbar-tab) a').get(0)
          });
        }

        $(window).on({
          'dialog:aftercreate': function dialogAftercreate(event, dialog, $element, settings) {
            var $toolbar = $('#toolbar-bar');
            $toolbar.css('margin-top', '0');

            if (settings.drupalOffCanvasPosition === 'top') {
              var height = Drupal.offCanvas.getContainer($element).outerHeight();
              $toolbar.css('margin-top', height + 'px');

              $element.on('dialogContentResize.off-canvas', function () {
                var newHeight = Drupal.offCanvas.getContainer($element).outerHeight();
                $toolbar.css('margin-top', newHeight + 'px');
              });
            }
          },
          'dialog:beforeclose': function dialogBeforeclose() {
            $('#toolbar-bar').css('margin-top', '0');
          }
        });
      });
    }
  };

  Drupal.toolbar = {
    views: {},

    models: {},

    mql: {},

    setSubtrees: new $.Deferred(),

    mediaQueryChangeHandler: function mediaQueryChangeHandler(model, label, mql) {
      switch (label) {
        case 'toolbar.narrow':
          model.set({
            isOriented: mql.matches,
            isTrayToggleVisible: false
          });

          if (!mql.matches || !model.get('orientation')) {
            model.set({ orientation: 'vertical' }, { validate: true });
          }
          break;

        case 'toolbar.standard':
          model.set({
            isFixed: mql.matches
          });
          break;

        case 'toolbar.wide':
          model.set({
            orientation: mql.matches && !model.get('locked') ? 'horizontal' : 'vertical'
          }, { validate: true });

          model.set({
            isTrayToggleVisible: mql.matches
          });
          break;

        default:
          break;
      }
    }
  };

  Drupal.theme.toolbarOrientationToggle = function () {
    return '<div class="toolbar-toggle-orientation"><div class="toolbar-lining">' + '<button class="toolbar-icon" type="button"></button>' + '</div></div>';
  };

  Drupal.AjaxCommands.prototype.setToolbarSubtrees = function (ajax, response, status) {
    Drupal.toolbar.setSubtrees.resolve(response.subtrees);
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.MenuModel = Backbone.Model.extend({
    defaults: {
      subtrees: {}
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarModel = Backbone.Model.extend({
    defaults: {
      activeTab: null,

      activeTray: null,

      isOriented: false,

      isFixed: false,

      areSubtreesLoaded: false,

      isViewportOverflowConstrained: false,

      orientation: 'horizontal',

      locked: false,

      isTrayToggleVisible: true,

      height: null,

      offsets: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },

    validate: function validate(attributes, options) {
      if (attributes.orientation === 'horizontal' && this.get('locked') && !options.override) {
        return Drupal.t('The toolbar cannot be set to a horizontal orientation when it is locked.');
      }
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  Drupal.toolbar.BodyVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:activeTray ', this.render);
      this.listenTo(this.model, 'change:isFixed change:isViewportOverflowConstrained', this.isToolbarFixed);
    },
    isToolbarFixed: function isToolbarFixed() {
      var isViewportOverflowConstrained = this.model.get('isViewportOverflowConstrained');
      $('body').toggleClass('toolbar-fixed', isViewportOverflowConstrained || this.model.get('isFixed'));
    },
    render: function render() {
      $('body').toggleClass('toolbar-tray-open', !!this.model.get('activeTray'));
    }
  });
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Backbone, Drupal) {
  Drupal.toolbar.MenuVisualView = Backbone.View.extend({
    initialize: function initialize() {
      this.listenTo(this.model, 'change:subtrees', this.render);
    },
    render: function render() {
      var _this = this;

      var subtrees = this.model.get('subtrees');

      Object.keys(subtrees || {}).forEach(function (id) {
        _this.$el.find('#toolbar-link-' + id).once('toolbar-subtrees').after(subtrees[id]);
      });

      if ('drupalToolbarMenu' in $.fn) {
        this.$el.children('.toolbar-menu').drupalToolbarMenu();
      }
    }
  });
})(jQuery, Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Backbone, Drupal) {
  Drupal.toolbar.ToolbarAuralView = Backbone.View.extend({
    initialize: function initialize(options) {
      this.strings = options.strings;

      this.listenTo(this.model, 'change:orientation', this.onOrientationChange);
      this.listenTo(this.model, 'change:activeTray', this.onActiveTrayChange);
    },
    onOrientationChange: function onOrientationChange(model, orientation) {
      Drupal.announce(Drupal.t('Tray orientation changed to @orientation.', {
        '@orientation': orientation
      }));
    },
    onActiveTrayChange: function onActiveTrayChange(model, tray) {
      var relevantTray = tray === null ? model.previous('activeTray') : tray;

      if (!relevantTray) {
        return;
      }
      var action = tray === null ? Drupal.t('closed') : Drupal.t('opened');
      var trayNameElement = relevantTray.querySelector('.toolbar-tray-name');
      var text = void 0;
      if (trayNameElement !== null) {
        text = Drupal.t('Tray "@tray" @action.', {
          '@tray': trayNameElement.textContent,
          '@action': action
        });
      } else {
        text = Drupal.t('Tray @action.', { '@action': action });
      }
      Drupal.announce(text);
    }
  });
})(Backbone, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings, Backbone) {
  Drupal.toolbar.ToolbarVisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        'click .toolbar-bar .toolbar-tab .trigger': 'onTabClick',
        'click .toolbar-toggle-orientation button': 'onOrientationToggleClick',
        'touchend .toolbar-bar .toolbar-tab .trigger': touchEndToClick,
        'touchend .toolbar-toggle-orientation button': touchEndToClick
      };
    },
    initialize: function initialize(options) {
      this.strings = options.strings;

      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented change:isTrayToggleVisible', this.render);
      this.listenTo(this.model, 'change:mqMatches', this.onMediaQueryChange);
      this.listenTo(this.model, 'change:offsets', this.adjustPlacement);
      this.listenTo(this.model, 'change:activeTab change:orientation change:isOriented', this.updateToolbarHeight);

      this.$el.find('.toolbar-tray .toolbar-lining').append(Drupal.theme('toolbarOrientationToggle'));

      this.model.trigger('change:activeTab');
    },
    updateToolbarHeight: function updateToolbarHeight() {
      var toolbarTabOuterHeight = $('#toolbar-bar').find('.toolbar-tab').outerHeight() || 0;
      var toolbarTrayHorizontalOuterHeight = $('.is-active.toolbar-tray-horizontal').outerHeight() || 0;
      this.model.set('height', toolbarTabOuterHeight + toolbarTrayHorizontalOuterHeight);

      $('body').css({
        'padding-top': this.model.get('height')
      });

      this.triggerDisplace();
    },
    triggerDisplace: function triggerDisplace() {
      _.defer(function () {
        Drupal.displace(true);
      });
    },
    render: function render() {
      this.updateTabs();
      this.updateTrayOrientation();
      this.updateBarAttributes();

      $('body').removeClass('toolbar-loading');

      if (this.model.changed.orientation === 'vertical' || this.model.changed.activeTab) {
        this.loadSubtrees();
      }

      return this;
    },
    onTabClick: function onTabClick(event) {
      if (event.currentTarget.hasAttribute('data-toolbar-tray')) {
        var activeTab = this.model.get('activeTab');
        var clickedTab = event.currentTarget;

        this.model.set('activeTab', !activeTab || clickedTab !== activeTab ? clickedTab : null);

        event.preventDefault();
        event.stopPropagation();
      }
    },
    onOrientationToggleClick: function onOrientationToggleClick(event) {
      var orientation = this.model.get('orientation');

      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';
      var locked = antiOrientation === 'vertical';

      if (locked) {
        localStorage.setItem('Drupal.toolbar.trayVerticalLocked', 'true');
      } else {
        localStorage.removeItem('Drupal.toolbar.trayVerticalLocked');
      }

      this.model.set({
        locked: locked,
        orientation: antiOrientation
      }, {
        validate: true,
        override: true
      });

      event.preventDefault();
      event.stopPropagation();
    },
    updateTabs: function updateTabs() {
      var $tab = $(this.model.get('activeTab'));

      $(this.model.previous('activeTab')).removeClass('is-active').prop('aria-pressed', false);

      $(this.model.previous('activeTray')).removeClass('is-active');

      if ($tab.length > 0) {
        $tab.addClass('is-active').prop('aria-pressed', true);
        var name = $tab.attr('data-toolbar-tray');

        var id = $tab.get(0).id;
        if (id) {
          localStorage.setItem('Drupal.toolbar.activeTabID', JSON.stringify(id));
        }

        var $tray = this.$el.find('[data-toolbar-tray="' + name + '"].toolbar-tray');
        if ($tray.length) {
          $tray.addClass('is-active');
          this.model.set('activeTray', $tray.get(0));
        } else {
          this.model.set('activeTray', null);
        }
      } else {
        this.model.set('activeTray', null);
        localStorage.removeItem('Drupal.toolbar.activeTabID');
      }
    },
    updateBarAttributes: function updateBarAttributes() {
      var isOriented = this.model.get('isOriented');
      if (isOriented) {
        this.$el.find('.toolbar-bar').attr('data-offset-top', '');
      } else {
        this.$el.find('.toolbar-bar').removeAttr('data-offset-top');
      }

      this.$el.toggleClass('toolbar-oriented', isOriented);
    },
    updateTrayOrientation: function updateTrayOrientation() {
      var orientation = this.model.get('orientation');

      var antiOrientation = orientation === 'vertical' ? 'horizontal' : 'vertical';

      $('body').toggleClass('toolbar-vertical', orientation === 'vertical').toggleClass('toolbar-horizontal', orientation === 'horizontal');

      var removeClass = antiOrientation === 'horizontal' ? 'toolbar-tray-horizontal' : 'toolbar-tray-vertical';
      var $trays = this.$el.find('.toolbar-tray').removeClass(removeClass).addClass('toolbar-tray-' + orientation);

      var iconClass = 'toolbar-icon-toggle-' + orientation;
      var iconAntiClass = 'toolbar-icon-toggle-' + antiOrientation;
      var $orientationToggle = this.$el.find('.toolbar-toggle-orientation').toggle(this.model.get('isTrayToggleVisible'));
      $orientationToggle.find('button').val(antiOrientation).attr('title', this.strings[antiOrientation]).text(this.strings[antiOrientation]).removeClass(iconClass).addClass(iconAntiClass);

      var dir = document.documentElement.dir;
      var edge = dir === 'rtl' ? 'right' : 'left';

      $trays.removeAttr('data-offset-left data-offset-right data-offset-top');

      $trays.filter('.toolbar-tray-vertical.is-active').attr('data-offset-' + edge, '');

      $trays.filter('.toolbar-tray-horizontal.is-active').attr('data-offset-top', '');
    },
    adjustPlacement: function adjustPlacement() {
      var $trays = this.$el.find('.toolbar-tray');
      if (!this.model.get('isOriented')) {
        $trays.removeClass('toolbar-tray-horizontal').addClass('toolbar-tray-vertical');
      }
    },
    loadSubtrees: function loadSubtrees() {
      var $activeTab = $(this.model.get('activeTab'));
      var orientation = this.model.get('orientation');

      if (!this.model.get('areSubtreesLoaded') && typeof $activeTab.data('drupal-subtrees') !== 'undefined' && orientation === 'vertical') {
        var subtreesHash = drupalSettings.toolbar.subtreesHash;
        var theme = drupalSettings.ajaxPageState.theme;
        var endpoint = Drupal.url('toolbar/subtrees/' + subtreesHash);
        var cachedSubtreesHash = localStorage.getItem('Drupal.toolbar.subtreesHash.' + theme);
        var cachedSubtrees = JSON.parse(localStorage.getItem('Drupal.toolbar.subtrees.' + theme));
        var isVertical = this.model.get('orientation') === 'vertical';

        if (isVertical && subtreesHash === cachedSubtreesHash && cachedSubtrees) {
          Drupal.toolbar.setSubtrees.resolve(cachedSubtrees);
        } else if (isVertical) {
            localStorage.removeItem('Drupal.toolbar.subtreesHash.' + theme);
            localStorage.removeItem('Drupal.toolbar.subtrees.' + theme);

            Drupal.ajax({ url: endpoint }).execute();

            localStorage.setItem('Drupal.toolbar.subtreesHash.' + theme, subtreesHash);
          }
      }
    }
  });
})(jQuery, Drupal, drupalSettings, Backbone);;
  /*
 * jQuery Foundation Joyride Plugin 2.1
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, undefined) {
  'use strict';

  var defaults = {
      'version'              : '2.1',
      'tipLocation'          : 'bottom',  // 'top' or 'bottom' in relation to parent
      'nubPosition'          : 'auto',    // override on a per tooltip bases
      'scroll'               : true,      // whether to scroll to tips
      'scrollSpeed'          : 300,       // Page scrolling speed in milliseconds
      'timer'                : 0,         // 0 = no timer , all other numbers = timer in milliseconds
      'autoStart'            : false,     // true or false - false tour starts when restart called
      'startTimerOnClick'    : true,      // true or false - true requires clicking the first button start the timer
      'startOffset'          : 0,         // the index of the tooltip you want to start on (index of the li)
      'nextButton'           : true,      // true or false to control whether a next button is used
      'tipAnimation'         : 'fade',    // 'pop' or 'fade' in each tip
      'pauseAfter'           : [],        // array of indexes where to pause the tour after
      'tipAnimationFadeSpeed': 300,       // when tipAnimation = 'fade' this is speed in milliseconds for the transition
      'cookieMonster'        : false,     // true or false to control whether cookies are used
      'cookieName'           : 'joyride', // Name the cookie you'll use
      'cookieDomain'         : false,     // Will this cookie be attached to a domain, ie. '.notableapp.com'
      'cookiePath'           : false,     // Set to '/' if you want the cookie for the whole website
      'localStorage'         : false,     // true or false to control whether localstorage is used
      'localStorageKey'      : 'joyride', // Keyname in localstorage
      'tipContainer'         : 'body',    // Where will the tip be attached
      'modal'                : false,     // Whether to cover page with modal during the tour
      'expose'               : false,     // Whether to expose the elements at each step in the tour (requires modal:true)
      'postExposeCallback'   : $.noop,    // A method to call after an element has been exposed
      'preRideCallback'      : $.noop,    // A method to call before the tour starts (passed index, tip, and cloned exposed element)
      'postRideCallback'     : $.noop,    // A method to call once the tour closes (canceled or complete)
      'preStepCallback'      : $.noop,    // A method to call before each step
      'postStepCallback'     : $.noop,    // A method to call after each step
      'template' : { // HTML segments for tip layout
        'link'    : '<a href="#close" class="joyride-close-tip">X</a>',
        'timer'   : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
        'tip'     : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
        'wrapper' : '<div class="joyride-content-wrapper" role="dialog"></div>',
        'button'  : '<a href="#" class="joyride-next-tip"></a>',
        'modal'   : '<div class="joyride-modal-bg"></div>',
        'expose'  : '<div class="joyride-expose-wrapper"></div>',
        'exposeCover': '<div class="joyride-expose-cover"></div>'
      }
    },

    Modernizr = Modernizr || false,

    settings = {},

    methods = {

      init : function (opts) {
        return this.each(function () {

          if ($.isEmptyObject(settings)) {
            settings = $.extend(true, defaults, opts);

            // non configurable settings
            settings.document = window.document;
            settings.$document = $(settings.document);
            settings.$window = $(window);
            settings.$content_el = $(this);
            settings.$body = $(settings.tipContainer);
            settings.body_offset = $(settings.tipContainer).position();
            settings.$tip_content = $('> li', settings.$content_el);
            settings.paused = false;
            settings.attempts = 0;

            settings.tipLocationPatterns = {
              top: ['bottom'],
              bottom: [], // bottom should not need to be repositioned
              left: ['right', 'top', 'bottom'],
              right: ['left', 'top', 'bottom']
            };

            // are we using jQuery 1.7+
            methods.jquery_check();

            // can we create cookies?
            if (!$.isFunction($.cookie)) {
              settings.cookieMonster = false;
            }

            // generate the tips and insert into dom.
            if ( (!settings.cookieMonster || !$.cookie(settings.cookieName) ) &&
              (!settings.localStorage || !methods.support_localstorage() || !localStorage.getItem(settings.localStorageKey) ) ) {

              settings.$tip_content.each(function (index) {
                methods.create({$li : $(this), index : index});
              });

              // show first tip
              if(settings.autoStart)
              {
                if (!settings.startTimerOnClick && settings.timer > 0) {
                  methods.show('init');
                  methods.startTimer();
                } else {
                  methods.show('init');
                }
              }

            }

            settings.$document.on('click.joyride', '.joyride-next-tip, .joyride-modal-bg', function (e) {
              e.preventDefault();

              if (settings.$li.next().length < 1) {
                methods.end();
              } else if (settings.timer > 0) {
                clearTimeout(settings.automate);
                methods.hide();
                methods.show();
                methods.startTimer();
              } else {
                methods.hide();
                methods.show();
              }

            });

            settings.$document.on('click.joyride', '.joyride-close-tip', function (e) {
              e.preventDefault();
              methods.end(true /* isAborted */);
            });

            settings.$window.on('resize.joyride', function (e) {
              if(settings.$li){
              if(settings.exposed && settings.exposed.length>0){
                var $els = $(settings.exposed);
                $els.each(function(){
                  var $this = $(this);
                  methods.un_expose($this);
                  methods.expose($this);
                });
              }
              if (methods.is_phone()) {
                methods.pos_phone();
              } else {
                methods.pos_default();
              }
              }
            });
          } else {
            methods.restart();
          }

        });
      },

      // call this method when you want to resume the tour
      resume : function () {
        methods.set_li();
        methods.show();
      },

      nextTip: function(){
            if (settings.$li.next().length < 1) {
            methods.end();
            } else if (settings.timer > 0) {
            clearTimeout(settings.automate);
            methods.hide();
            methods.show();
            methods.startTimer();
            } else {
            methods.hide();
            methods.show();
            }
      },

      tip_template : function (opts) {
        var $blank, content, $wrapper;

        opts.tip_class = opts.tip_class || '';

        $blank = $(settings.template.tip).addClass(opts.tip_class);
        content = $.trim($(opts.li).html()) +
          methods.button_text(opts.button_text) +
          settings.template.link +
          methods.timer_instance(opts.index);

        $wrapper = $(settings.template.wrapper);
        if (opts.li.attr('data-aria-labelledby')) {
          $wrapper.attr('aria-labelledby', opts.li.attr('data-aria-labelledby'))
        }
        if (opts.li.attr('data-aria-describedby')) {
          $wrapper.attr('aria-describedby', opts.li.attr('data-aria-describedby'))
        }
        $blank.append($wrapper);
        $blank.first().attr('data-index', opts.index);
        $('.joyride-content-wrapper', $blank).append(content);

        return $blank[0];
      },

      timer_instance : function (index) {
        var txt;

        if ((index === 0 && settings.startTimerOnClick && settings.timer > 0) || settings.timer === 0) {
          txt = '';
        } else {
          txt = methods.outerHTML($(settings.template.timer)[0]);
        }
        return txt;
      },

      button_text : function (txt) {
        if (settings.nextButton) {
          txt = $.trim(txt) || 'Next';
          txt = methods.outerHTML($(settings.template.button).append(txt)[0]);
        } else {
          txt = '';
        }
        return txt;
      },

      create : function (opts) {
        // backwards compatibility with data-text attribute
        var buttonText = opts.$li.attr('data-button') || opts.$li.attr('data-text'),
          tipClass = opts.$li.attr('class'),
          $tip_content = $(methods.tip_template({
            tip_class : tipClass,
            index : opts.index,
            button_text : buttonText,
            li : opts.$li
          }));

        $(settings.tipContainer).append($tip_content);
      },

      show : function (init) {
        var opts = {}, ii, opts_arr = [], opts_len = 0, p,
            $timer = null;

        // are we paused?
        if (settings.$li === undefined || ($.inArray(settings.$li.index(), settings.pauseAfter) === -1)) {

          // don't go to the next li if the tour was paused
          if (settings.paused) {
            settings.paused = false;
          } else {
            methods.set_li(init);
          }

          settings.attempts = 0;

          if (settings.$li.length && settings.$target.length > 0) {
            if(init){ //run when we first start
                settings.preRideCallback(settings.$li.index(), settings.$next_tip );
                if(settings.modal){
                    methods.show_modal();
                }
            }
            settings.preStepCallback(settings.$li.index(), settings.$next_tip );

            // parse options
            opts_arr = (settings.$li.data('options') || ':').split(';');
            opts_len = opts_arr.length;
            for (ii = opts_len - 1; ii >= 0; ii--) {
              p = opts_arr[ii].split(':');

              if (p.length === 2) {
                opts[$.trim(p[0])] = $.trim(p[1]);
              }
            }
            settings.tipSettings = $.extend({}, settings, opts);
            settings.tipSettings.tipLocationPattern = settings.tipLocationPatterns[settings.tipSettings.tipLocation];

            if(settings.modal && settings.expose){
              methods.expose();
            }

            // scroll if not modal
            if (!settings.$target.is("body") && settings.scroll) {
              methods.scroll_to();
            }

            if (methods.is_phone()) {
              methods.pos_phone(true);
            } else {
              methods.pos_default(true);
            }

            $timer = $('.joyride-timer-indicator', settings.$next_tip);

            if (/pop/i.test(settings.tipAnimation)) {

              $timer.outerWidth(0);

              if (settings.timer > 0) {

                settings.$next_tip.show();
                $timer.animate({
                  width: $('.joyride-timer-indicator-wrap', settings.$next_tip).outerWidth()
                }, settings.timer);

              } else {

                settings.$next_tip.show();

              }


            } else if (/fade/i.test(settings.tipAnimation)) {

              $timer.outerWidth(0);

              if (settings.timer > 0) {

                settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed);

                settings.$next_tip.show();
                $timer.animate({
                  width: $('.joyride-timer-indicator-wrap', settings.$next_tip).outerWidth()
                }, settings.timer);

              } else {

                settings.$next_tip.fadeIn(settings.tipAnimationFadeSpeed);

              }
            }

            settings.$current_tip = settings.$next_tip;
            // Focus next button for keyboard users.
            $('.joyride-next-tip', settings.$current_tip).focus();
            methods.tabbable(settings.$current_tip);
          // skip non-existent targets
          } else if (settings.$li && settings.$target.length < 1) {

            methods.show();

          } else {

            methods.end();

          }
        } else {

          settings.paused = true;

        }

      },

      // detect phones with media queries if supported.
      is_phone : function () {
        if (Modernizr) {
          return Modernizr.mq('only screen and (max-width: 767px)');
        }

        return (settings.$window.width() < 767) ? true : false;
      },

      support_localstorage : function () {
        if (Modernizr) {
          return Modernizr.localstorage;
        } else {
          return !!window.localStorage;
        }
      },

      hide : function () {
        if(settings.modal && settings.expose){
          methods.un_expose();
        }
        if(!settings.modal){
        $('.joyride-modal-bg').hide();
        }
        settings.$current_tip.hide();
        settings.postStepCallback(settings.$li.index(), settings.$current_tip);
      },

      set_li : function (init) {
        if (init) {
          settings.$li = settings.$tip_content.eq(settings.startOffset);
          methods.set_next_tip();
          settings.$current_tip = settings.$next_tip;
        } else {
          settings.$li = settings.$li.next();
          methods.set_next_tip();
        }

        methods.set_target();
      },

      set_next_tip : function () {
        settings.$next_tip = $('.joyride-tip-guide[data-index=' + settings.$li.index() + ']');
      },

      set_target : function () {
        var cl = settings.$li.attr('data-class'),
            id = settings.$li.attr('data-id'),
            $sel = function () {
              if (id) {
                return $(settings.document.getElementById(id));
              } else if (cl) {
                return $('.' + cl).filter(":visible").first();
              } else {
                return $('body');
              }
            };

        settings.$target = $sel();
      },

      scroll_to : function () {
        var window_half, tipOffset;

        window_half = settings.$window.height() / 2;
        tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight());

        $("html, body").stop().animate({
          scrollTop: tipOffset
        }, settings.scrollSpeed);
      },

      paused : function () {
        if (($.inArray((settings.$li.index() + 1), settings.pauseAfter) === -1)) {
          return true;
        }

        return false;
      },

      destroy : function () {
        if(!$.isEmptyObject(settings)){
        settings.$document.off('.joyride');
        }

        $(window).off('.joyride');
        $('.joyride-close-tip, .joyride-next-tip, .joyride-modal-bg').off('.joyride');
        $('.joyride-tip-guide, .joyride-modal-bg').remove();
        clearTimeout(settings.automate);
        settings = {};
      },

      restart : function () {
        if(!settings.autoStart)
        {
          if (!settings.startTimerOnClick && settings.timer > 0) {
            methods.show('init');
            methods.startTimer();
          } else {
            methods.show('init');
          }
          settings.autoStart = true;
        }
        else
        {
        methods.hide();
        settings.$li = undefined;
        methods.show('init');
        }
      },

      pos_default : function (init) {
        var half_fold = Math.ceil(settings.$window.height() / 2),
            tip_position = settings.$next_tip.offset(),
            $nub = $('.joyride-nub', settings.$next_tip),
            nub_width = Math.ceil($nub.outerWidth() / 2),
            nub_height = Math.ceil($nub.outerHeight() / 2),
            toggle = init || false;

        // tip must not be "display: none" to calculate position
        if (toggle) {
          settings.$next_tip.css('visibility', 'hidden');
          settings.$next_tip.show();
        }

        if (!settings.$target.is("body")) {
            var
              topAdjustment = settings.tipSettings.tipAdjustmentY ? parseInt(settings.tipSettings.tipAdjustmentY) : 0,
              leftAdjustment = settings.tipSettings.tipAdjustmentX ? parseInt(settings.tipSettings.tipAdjustmentX) : 0;

            if (methods.bottom()) {
              settings.$next_tip.css({
                top: (settings.$target.offset().top + nub_height + settings.$target.outerHeight() + topAdjustment),
                left: settings.$target.offset().left + leftAdjustment});

              if (/right/i.test(settings.tipSettings.nubPosition)) {
                settings.$next_tip.css('left', settings.$target.offset().left - settings.$next_tip.outerWidth() + settings.$target.outerWidth());
              }

              methods.nub_position($nub, settings.tipSettings.nubPosition, 'top');

            } else if (methods.top()) {

              settings.$next_tip.css({
                top: (settings.$target.offset().top - settings.$next_tip.outerHeight() - nub_height + topAdjustment),
                left: settings.$target.offset().left + leftAdjustment});

              methods.nub_position($nub, settings.tipSettings.nubPosition, 'bottom');

            } else if (methods.right()) {

              settings.$next_tip.css({
                top: settings.$target.offset().top + topAdjustment,
                left: (settings.$target.outerWidth() + settings.$target.offset().left + nub_width) + leftAdjustment});

              methods.nub_position($nub, settings.tipSettings.nubPosition, 'left');

            } else if (methods.left()) {

              settings.$next_tip.css({
                top: settings.$target.offset().top + topAdjustment,
                left: (settings.$target.offset().left - settings.$next_tip.outerWidth() - nub_width) + leftAdjustment});

              methods.nub_position($nub, settings.tipSettings.nubPosition, 'right');

            }

            if (!methods.visible(methods.corners(settings.$next_tip)) && settings.attempts < settings.tipSettings.tipLocationPattern.length) {

              $nub.removeClass('bottom')
                .removeClass('top')
                .removeClass('right')
                .removeClass('left');

              settings.tipSettings.tipLocation = settings.tipSettings.tipLocationPattern[settings.attempts];

              settings.attempts++;

              methods.pos_default(true);

            }

        } else if (settings.$li.length) {

          methods.pos_modal($nub);

        }

        if (toggle) {
          settings.$next_tip.hide();
          settings.$next_tip.css('visibility', 'visible');
        }

      },

      pos_phone : function (init) {
        var tip_height = settings.$next_tip.outerHeight(),
            tip_offset = settings.$next_tip.offset(),
            target_height = settings.$target.outerHeight(),
            $nub = $('.joyride-nub', settings.$next_tip),
            nub_height = Math.ceil($nub.outerHeight() / 2),
            toggle = init || false;

        $nub.removeClass('bottom')
          .removeClass('top')
          .removeClass('right')
          .removeClass('left');

        if (toggle) {
          settings.$next_tip.css('visibility', 'hidden');
          settings.$next_tip.show();
        }

        if (!settings.$target.is("body")) {

          if (methods.top()) {

              settings.$next_tip.offset({top: settings.$target.offset().top - tip_height - nub_height});
              $nub.addClass('bottom');

          } else {

            settings.$next_tip.offset({top: settings.$target.offset().top + target_height + nub_height});
            $nub.addClass('top');

          }

        } else if (settings.$li.length) {

          methods.pos_modal($nub);

        }

        if (toggle) {
          settings.$next_tip.hide();
          settings.$next_tip.css('visibility', 'visible');
        }
      },

      pos_modal : function ($nub) {
        methods.center();
        $nub.hide();

        methods.show_modal();

      },

      show_modal : function() {
        if ($('.joyride-modal-bg').length < 1) {
            $('body').append(settings.template.modal).show();
        }

        if (/pop/i.test(settings.tipAnimation)) {
          $('.joyride-modal-bg').show();
        } else {
          $('.joyride-modal-bg').fadeIn(settings.tipAnimationFadeSpeed);
        }
      },

      expose: function(){
        var expose,
          exposeCover,
          el,
          origCSS,
          randId = 'expose-'+Math.floor(Math.random()*10000);
        if (arguments.length>0 && arguments[0] instanceof $){
          el = arguments[0];
        } else if(settings.$target && !settings.$target.is("body")){
          el = settings.$target;
        }  else {
          return false;
        }
        if(el.length < 1){
          if(window.console){
            console.error('element not valid', el);
          }
          return false;
        }
        expose = $(settings.template.expose);
        settings.$body.append(expose);
        expose.css({
          top: el.offset().top,
          left: el.offset().left,
          width: el.outerWidth(true),
          height: el.outerHeight(true)
        });
        exposeCover = $(settings.template.exposeCover);
        origCSS = {
                  zIndex: el.css('z-index'),
                  position: el.css('position')
                  };
        el.css('z-index',expose.css('z-index')*1+1);
        if(origCSS.position == 'static'){
          el.css('position','relative');
        }
        el.data('expose-css',origCSS);
        exposeCover.css({
          top: el.offset().top,
          left: el.offset().left,
          width: el.outerWidth(true),
          height: el.outerHeight(true)
        });
        settings.$body.append(exposeCover);
        expose.addClass(randId);
        exposeCover.addClass(randId);
        if(settings.tipSettings['exposeClass']){
          expose.addClass(settings.tipSettings['exposeClass']);
          exposeCover.addClass(settings.tipSettings['exposeClass']);
        }
        el.data('expose', randId);
        settings.postExposeCallback(settings.$li.index(), settings.$next_tip, el);
        methods.add_exposed(el);
      },

      un_expose: function(){
        var exposeId,
          el,
          expose ,
          origCSS,
          clearAll = false;
        if (arguments.length>0 && arguments[0] instanceof $){
          el = arguments[0];
        } else if(settings.$target && !settings.$target.is("body")){
          el = settings.$target;
        }  else {
          return false;
        }
        if(el.length < 1){
          if(window.console){
            console.error('element not valid', el);
          }
          return false;
        }
        exposeId = el.data('expose');
        expose = $('.'+exposeId);
        if(arguments.length>1){
          clearAll = arguments[1];
        }
        if(clearAll === true){
          $('.joyride-expose-wrapper,.joyride-expose-cover').remove();
        } else {
          expose.remove();
        }
        origCSS = el.data('expose-css');
        if(origCSS.zIndex == 'auto'){
          el.css('z-index', '');
        } else {
          el.css('z-index',origCSS.zIndex);
        }
        if(origCSS.position != el.css('position')){
          if(origCSS.position == 'static'){// this is default, no need to set it.
            el.css('position', '');
          } else {
            el.css('position',origCSS.position);
          }
        }
        el.removeData('expose');
        el.removeData('expose-z-index');
        methods.remove_exposed(el);
      },

      add_exposed: function(el){
        settings.exposed = settings.exposed || [];
        if(el instanceof $){
          settings.exposed.push(el[0]);
        } else if(typeof el == 'string'){
          settings.exposed.push(el);
        }
      },

      remove_exposed: function(el){
        var search;
        if(el instanceof $){
          search = el[0]
        } else if (typeof el == 'string'){
          search = el;
        }
        settings.exposed = settings.exposed || [];
        for(var i=0; i<settings.exposed.length; i++){
          if(settings.exposed[i] == search){
            settings.exposed.splice(i,1);
            return;
          }
        }
      },

      center : function () {
        var $w = settings.$window;

        settings.$next_tip.css({
          top : ((($w.height() - settings.$next_tip.outerHeight()) / 2) + $w.scrollTop()),
          left : ((($w.width() - settings.$next_tip.outerWidth()) / 2) + $w.scrollLeft())
        });

        return true;
      },

      bottom : function () {
        return /bottom/i.test(settings.tipSettings.tipLocation);
      },

      top : function () {
        return /top/i.test(settings.tipSettings.tipLocation);
      },

      right : function () {
        return /right/i.test(settings.tipSettings.tipLocation);
      },

      left : function () {
        return /left/i.test(settings.tipSettings.tipLocation);
      },

      corners : function (el) {
        var w = settings.$window,
            window_half = w.height() / 2,
            tipOffset = Math.ceil(settings.$target.offset().top - window_half + settings.$next_tip.outerHeight()),//using this to calculate since scroll may not have finished yet.
            right = w.width() + w.scrollLeft(),
            offsetBottom =  w.height() + tipOffset,
            bottom = w.height() + w.scrollTop(),
            top = w.scrollTop();

            if(tipOffset < top){
              if (tipOffset <0 ){
                top = 0;
              } else {
                top = tipOffset;
              }
            }

            if(offsetBottom > bottom){
              bottom = offsetBottom;
            }

        return [
          el.offset().top < top,
          right < el.offset().left + el.outerWidth(),
          bottom < el.offset().top + el.outerHeight(),
          w.scrollLeft() > el.offset().left
        ];
      },

      visible : function (hidden_corners) {
        var i = hidden_corners.length;

        while (i--) {
          if (hidden_corners[i]) return false;
        }

        return true;
      },

      nub_position : function (nub, pos, def) {
        if (pos === 'auto') {
          nub.addClass(def);
        } else {
          nub.addClass(pos);
        }
      },

      startTimer : function () {
        if (settings.$li.length) {
          settings.automate = setTimeout(function () {
            methods.hide();
            methods.show();
            methods.startTimer();
          }, settings.timer);
        } else {
          clearTimeout(settings.automate);
        }
      },

      end : function (isAborted) {
        isAborted = isAborted || false;

        // Unbind resize events.
        if (isAborted) {
          settings.$window.off('resize.joyride');
        }

        if (settings.cookieMonster) {
          $.cookie(settings.cookieName, 'ridden', { expires: 365, domain: settings.cookieDomain, path: settings.cookiePath });
        }

        if (settings.localStorage) {
          localStorage.setItem(settings.localStorageKey, true);
        }

        if (settings.timer > 0) {
          clearTimeout(settings.automate);
        }
        if(settings.modal && settings.expose){
          methods.un_expose();
        }
        if (settings.$current_tip) {
          settings.$current_tip.hide();
        }
        if (settings.$li) {
          settings.postStepCallback(settings.$li.index(), settings.$current_tip, isAborted);
          settings.postRideCallback(settings.$li.index(), settings.$current_tip, isAborted);
        }
        $('.joyride-modal-bg').hide();
      },

      jquery_check : function () {
        // define on() and off() for older jQuery
        if (!$.isFunction($.fn.on)) {

          $.fn.on = function (types, sel, fn) {

            return this.delegate(sel, types, fn);

          };

          $.fn.off = function (types, sel, fn) {

            return this.undelegate(sel, types, fn);

          };

          return false;
        }

        return true;
      },

      outerHTML : function (el) {
        // support FireFox < 11
        return el.outerHTML || new XMLSerializer().serializeToString(el);
      },

      version : function () {
        return settings.version;
      },

      tabbable : function (el) {
        $(el).on('keydown', function( event ) {
          if (!event.isDefaultPrevented() && event.keyCode &&
              // Escape key.
              event.keyCode === 27 ) {
            event.preventDefault();
            methods.end(true /* isAborted */);
            return;
          }

          // Prevent tabbing out of tour items.
          if ( event.keyCode !== 9 ) {
            return;
          }
          var tabbables = $(el).find(":tabbable"),
            first = tabbables.filter(":first"),
            last  = tabbables.filter(":last");
          if ( event.target === last[0] && !event.shiftKey ) {
            first.focus( 1 );
            event.preventDefault();
          } else if ( event.target === first[0] && event.shiftKey ) {
            last.focus( 1 );
            event.preventDefault();
          }
        });
      }

    };

  $.fn.joyride = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.joyride');
    }
  };

}(jQuery, this));
;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Backbone, Drupal, document) {
  var queryString = decodeURI(window.location.search);

  Drupal.behaviors.tour = {
    attach: function attach(context) {
      $('body').once('tour').each(function () {
        var model = new Drupal.tour.models.StateModel();
        new Drupal.tour.views.ToggleTourView({
          el: $(context).find('#toolbar-tab-tour'),
          model: model
        });

        model.on('change:isActive', function (model, isActive) {
          $(document).trigger(isActive ? 'drupalTourStarted' : 'drupalTourStopped');
        }).set('tour', $(context).find('ol#tour'));

        if (/tour=?/i.test(queryString)) {
          model.set('isActive', true);
        }
      });
    }
  };

  Drupal.tour = Drupal.tour || {
    models: {},

    views: {}
  };

  Drupal.tour.models.StateModel = Backbone.Model.extend({
    defaults: {
      tour: [],

      isActive: false,

      activeTour: []
    }
  });

  Drupal.tour.views.ToggleTourView = Backbone.View.extend({
    events: { click: 'onClick' },

    initialize: function initialize() {
      this.listenTo(this.model, 'change:tour change:isActive', this.render);
      this.listenTo(this.model, 'change:isActive', this.toggleTour);
    },
    render: function render() {
      this.$el.toggleClass('hidden', this._getTour().length === 0);

      var isActive = this.model.get('isActive');
      this.$el.find('button').toggleClass('is-active', isActive).prop('aria-pressed', isActive);
      return this;
    },
    toggleTour: function toggleTour() {
      if (this.model.get('isActive')) {
        var $tour = this._getTour();
        this._removeIrrelevantTourItems($tour, this._getDocument());
        var that = this;
        var close = Drupal.t('Close');
        if ($tour.find('li').length) {
          $tour.joyride({
            autoStart: true,
            postRideCallback: function postRideCallback() {
              that.model.set('isActive', false);
            },

            template: {
              link: '<a href="#close" class="joyride-close-tip" aria-label="' + close + '">&times;</a>',
              button: '<a href="#" class="button button--primary joyride-next-tip"></a>'
            }
          });
          this.model.set({ isActive: true, activeTour: $tour });
        }
      } else {
        this.model.get('activeTour').joyride('destroy');
        this.model.set({ isActive: false, activeTour: [] });
      }
    },
    onClick: function onClick(event) {
      this.model.set('isActive', !this.model.get('isActive'));
      event.preventDefault();
      event.stopPropagation();
    },
    _getTour: function _getTour() {
      return this.model.get('tour');
    },
    _getDocument: function _getDocument() {
      return $(document);
    },
    _removeIrrelevantTourItems: function _removeIrrelevantTourItems($tour, $document) {
      var removals = false;
      var tips = /tips=([^&]+)/.exec(queryString);
      $tour.find('li').each(function () {
        var $this = $(this);
        var itemId = $this.attr('data-id');
        var itemClass = $this.attr('data-class');

        if (tips && !$(this).hasClass(tips[1])) {
          removals = true;
          $this.remove();
          return;
        }

        if (!itemId && !itemClass || itemId && $document.find('#' + itemId).length || itemClass && $document.find('.' + itemClass).length) {
          return;
        }
        removals = true;
        $this.remove();
      });

      if (removals) {
        var total = $tour.find('li').length;
        if (!total) {
          this.model.set({ tour: [] });
        }

        $tour.find('li').each(function (index) {
          var progress = Drupal.t('!tour_item of !total', {
            '!tour_item': index + 1,
            '!total': total
          });
          $(this).find('.tour-progress').text(progress);
        }).eq(-1).attr('data-text', Drupal.t('End tour'));
      }
    }
  });
})(jQuery, Backbone, Drupal, document);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal) {
  function TabbingManager() {
    this.stack = [];
  }

  function TabbingContext(options) {
    $.extend(this, {
      level: null,

      $tabbableElements: $(),

      $disabledElements: $(),

      released: false,

      active: false
    }, options);
  }

  $.extend(TabbingManager.prototype, {
    constrain: function constrain(elements) {
      var il = this.stack.length;
      for (var i = 0; i < il; i++) {
        this.stack[i].deactivate();
      }

      var $elements = $(elements).find(':tabbable').addBack(':tabbable');

      var tabbingContext = new TabbingContext({
        level: this.stack.length,
        $tabbableElements: $elements
      });

      this.stack.push(tabbingContext);

      tabbingContext.activate();

      $(document).trigger('drupalTabbingConstrained', tabbingContext);

      return tabbingContext;
    },
    release: function release() {
      var toActivate = this.stack.length - 1;
      while (toActivate >= 0 && this.stack[toActivate].released) {
        toActivate--;
      }

      this.stack.splice(toActivate + 1);

      if (toActivate >= 0) {
        this.stack[toActivate].activate();
      }
    },
    activate: function activate(tabbingContext) {
      var $set = tabbingContext.$tabbableElements;
      var level = tabbingContext.level;

      var $disabledSet = $(':tabbable').not($set);

      tabbingContext.$disabledElements = $disabledSet;

      var il = $disabledSet.length;
      for (var i = 0; i < il; i++) {
        this.recordTabindex($disabledSet.eq(i), level);
      }

      $disabledSet.prop('tabindex', -1).prop('autofocus', false);

      var $hasFocus = $set.filter('[autofocus]').eq(-1);

      if ($hasFocus.length === 0) {
        $hasFocus = $set.eq(0);
      }
      $hasFocus.trigger('focus');
    },
    deactivate: function deactivate(tabbingContext) {
      var $set = tabbingContext.$disabledElements;
      var level = tabbingContext.level;
      var il = $set.length;
      for (var i = 0; i < il; i++) {
        this.restoreTabindex($set.eq(i), level);
      }
    },
    recordTabindex: function recordTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices') || {};
      tabInfo[level] = {
        tabindex: $el[0].getAttribute('tabindex'),
        autofocus: $el[0].hasAttribute('autofocus')
      };
      $el.data('drupalOriginalTabIndices', tabInfo);
    },
    restoreTabindex: function restoreTabindex($el, level) {
      var tabInfo = $el.data('drupalOriginalTabIndices');
      if (tabInfo && tabInfo[level]) {
        var data = tabInfo[level];
        if (data.tabindex) {
          $el[0].setAttribute('tabindex', data.tabindex);
        } else {
            $el[0].removeAttribute('tabindex');
          }
        if (data.autofocus) {
          $el[0].setAttribute('autofocus', 'autofocus');
        }

        if (level === 0) {
          $el.removeData('drupalOriginalTabIndices');
        } else {
          var levelToDelete = level;
          while (tabInfo.hasOwnProperty(levelToDelete)) {
            delete tabInfo[levelToDelete];
            levelToDelete++;
          }
          $el.data('drupalOriginalTabIndices', tabInfo);
        }
      }
    }
  });

  $.extend(TabbingContext.prototype, {
    release: function release() {
      if (!this.released) {
        this.deactivate();
        this.released = true;
        Drupal.tabbingManager.release(this);

        $(document).trigger('drupalTabbingContextReleased', this);
      }
    },
    activate: function activate() {
      if (!this.active && !this.released) {
        this.active = true;
        Drupal.tabbingManager.activate(this);

        $(document).trigger('drupalTabbingContextActivated', this);
      }
    },
    deactivate: function deactivate() {
      if (this.active) {
        this.active = false;
        Drupal.tabbingManager.deactivate(this);

        $(document).trigger('drupalTabbingContextDeactivated', this);
      }
    }
  });

  if (Drupal.tabbingManager) {
    return;
  }

  Drupal.tabbingManager = new TabbingManager();
})(jQuery, Drupal);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone) {
  var strings = {
    tabbingReleased: Drupal.t('Tabbing is no longer constrained by the Contextual module.'),
    tabbingConstrained: Drupal.t('Tabbing is constrained to a set of @contextualsCount and the edit mode toggle.'),
    pressEsc: Drupal.t('Press the esc key to exit.')
  };

  function initContextualToolbar(context) {
    if (!Drupal.contextual || !Drupal.contextual.collection) {
      return;
    }

    var contextualToolbar = Drupal.contextualToolbar;
    contextualToolbar.model = new contextualToolbar.StateModel({
      isViewing: localStorage.getItem('Drupal.contextualToolbar.isViewing') !== 'false'
    }, {
      contextualCollection: Drupal.contextual.collection
    });

    var viewOptions = {
      el: $('.toolbar .toolbar-bar .contextual-toolbar-tab'),
      model: contextualToolbar.model,
      strings: strings
    };
    new contextualToolbar.VisualView(viewOptions);
    new contextualToolbar.AuralView(viewOptions);
  }

  Drupal.behaviors.contextualToolbar = {
    attach: function attach(context) {
      if ($('body').once('contextualToolbar-init').length) {
        initContextualToolbar(context);
      }
    }
  };

  Drupal.contextualToolbar = {
    model: null
  };
})(jQuery, Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.StateModel = Backbone.Model.extend({
    defaults: {
      isViewing: true,

      isVisible: false,

      contextualCount: 0,

      tabbingContext: null
    },

    initialize: function initialize(attrs, options) {
      this.listenTo(options.contextualCollection, 'reset remove add', this.countContextualLinks);
      this.listenTo(options.contextualCollection, 'add', this.lockNewContextualLinks);

      this.listenTo(this, 'change:contextualCount', this.updateVisibility);

      this.listenTo(this, 'change:isViewing', function (model, isViewing) {
        options.contextualCollection.each(function (contextualModel) {
          contextualModel.set('isLocked', !isViewing);
        });
      });
    },
    countContextualLinks: function countContextualLinks(contextualModel, contextualCollection) {
      this.set('contextualCount', contextualCollection.length);
    },
    lockNewContextualLinks: function lockNewContextualLinks(contextualModel, contextualCollection) {
      if (!this.get('isViewing')) {
        contextualModel.set('isLocked', true);
      }
    },
    updateVisibility: function updateVisibility() {
      this.set('isVisible', this.get('contextualCount') > 0);
    }
  });
})(Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, Backbone, _) {
  Drupal.contextualToolbar.AuralView = Backbone.View.extend({
    announcedOnce: false,

    initialize: function initialize(options) {
      this.options = options;

      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.manageTabbing);

      $(document).on('keyup', _.bind(this.onKeypress, this));
      this.manageTabbing();
    },
    render: function render() {
      this.$el.find('button').attr('aria-pressed', !this.model.get('isViewing'));

      return this;
    },
    manageTabbing: function manageTabbing() {
      var tabbingContext = this.model.get('tabbingContext');

      if (tabbingContext) {
        if (tabbingContext.active) {
          Drupal.announce(this.options.strings.tabbingReleased);
        }
        tabbingContext.release();
      }

      if (!this.model.get('isViewing')) {
        tabbingContext = Drupal.tabbingManager.constrain($('.contextual-toolbar-tab, .contextual'));
        this.model.set('tabbingContext', tabbingContext);
        this.announceTabbingConstraint();
        this.announcedOnce = true;
      }
    },
    announceTabbingConstraint: function announceTabbingConstraint() {
      var strings = this.options.strings;
      Drupal.announce(Drupal.formatString(strings.tabbingConstrained, {
        '@contextualsCount': Drupal.formatPlural(Drupal.contextual.collection.length, '@count contextual link', '@count contextual links')
      }));
      Drupal.announce(strings.pressEsc);
    },
    onKeypress: function onKeypress(event) {
      if (!this.announcedOnce && event.keyCode === 9 && !this.model.get('isViewing')) {
        this.announceTabbingConstraint();

        this.announcedOnce = true;
      }

      if (event.keyCode === 27) {
        this.model.set('isViewing', true);
      }
    }
  });
})(jQuery, Drupal, Backbone, _);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function (Drupal, Backbone) {
  Drupal.contextualToolbar.VisualView = Backbone.View.extend({
    events: function events() {
      var touchEndToClick = function touchEndToClick(event) {
        event.preventDefault();
        event.target.click();
      };

      return {
        click: function click() {
          this.model.set('isViewing', !this.model.get('isViewing'));
        },

        touchend: touchEndToClick
      };
    },
    initialize: function initialize() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'change:isViewing', this.persist);
    },
    render: function render() {
      this.$el.toggleClass('hidden', !this.model.get('isVisible'));

      this.$el.find('button').toggleClass('is-active', !this.model.get('isViewing'));

      return this;
    },
    persist: function persist(model, isViewing) {
      if (!isViewing) {
        localStorage.setItem('Drupal.contextualToolbar.isViewing', 'false');
      } else {
        localStorage.removeItem('Drupal.contextualToolbar.isViewing');
      }
    }
  });
})(Drupal, Backbone);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  var pathInfo = drupalSettings.path;
  var escapeAdminPath = sessionStorage.getItem('escapeAdminPath');
  var windowLocation = window.location;

  if (!pathInfo.currentPathIsAdmin && !/destination=/.test(windowLocation.search)) {
    sessionStorage.setItem('escapeAdminPath', windowLocation);
  }

  Drupal.behaviors.escapeAdmin = {
    attach: function attach() {
      var $toolbarEscape = $('[data-toolbar-escape-admin]').once('escapeAdmin');
      if ($toolbarEscape.length && pathInfo.currentPathIsAdmin) {
        if (escapeAdminPath !== null) {
          $toolbarEscape.attr('href', escapeAdminPath);
        } else {
          $toolbarEscape.text(Drupal.t('Home'));
        }
      }
    }
  };
})(jQuery, Drupal, drupalSettings);;
/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/

(function ($, Drupal, drupalSettings) {
  function mapTextContentToAjaxResponse(content) {
    if (content === '') {
      return false;
    }

    try {
      return JSON.parse(content);
    } catch (e) {
      return false;
    }
  }

  function bigPipeProcessPlaceholderReplacement(index, placeholderReplacement) {
    var placeholderId = placeholderReplacement.getAttribute('data-big-pipe-replacement-for-placeholder-with-id');
    var content = this.textContent.trim();

    if (typeof drupalSettings.bigPipePlaceholderIds[placeholderId] !== 'undefined') {
      var response = mapTextContentToAjaxResponse(content);

      if (response === false) {
        $(this).removeOnce('big-pipe');
      } else {
        var ajaxObject = Drupal.ajax({
          url: '',
          base: false,
          element: false,
          progress: false
        });

        ajaxObject.success(response, 'success');
      }
    }
  }

  var interval = drupalSettings.bigPipeInterval || 50;

  var timeoutID = void 0;

  function bigPipeProcessDocument(context) {
    if (!context.querySelector('script[data-big-pipe-event="start"]')) {
      return false;
    }

    $(context).find('script[data-big-pipe-replacement-for-placeholder-with-id]').once('big-pipe').each(bigPipeProcessPlaceholderReplacement);

    if (context.querySelector('script[data-big-pipe-event="stop"]')) {
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      return true;
    }

    return false;
  }

  function bigPipeProcess() {
    timeoutID = setTimeout(function () {
      if (!bigPipeProcessDocument(document)) {
        bigPipeProcess();
      }
    }, interval);
  }

  bigPipeProcess();

  $(window).on('load', function () {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    bigPipeProcessDocument(document);
  });
})(jQuery, Drupal, drupalSettings);;
