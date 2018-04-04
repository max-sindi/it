<?php
/**
 * Override or insert variables for the page templates.
 */
function ittheme_preprocess_page(&$vars) {
  /* Add Bootstrap */
  drupal_add_js('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js', 'file');
  drupal_add_css('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css', array('group' => CSS_THEME, 'type' => 'external'));
  drupal_add_css('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css', array('group' => CSS_THEME, 'type' => 'external'));

  /* Add Font Awesome */
  drupal_add_css('https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css', array('group' => CSS_THEME, 'type' => 'external'));

  // Add Local styles
  drupal_add_css('http://localhost:8080/dev/apple/css/global.styles.css', array('group' => CSS_THEME, 'type' => 'external'));

  /* Hide H1, Logo and Site Name on a front page */
  if($vars['is_front']) {
    $vars['title'] = '';
    $vars['site_name'] = '';
    $vars['site_logo'] = '';
  }
}