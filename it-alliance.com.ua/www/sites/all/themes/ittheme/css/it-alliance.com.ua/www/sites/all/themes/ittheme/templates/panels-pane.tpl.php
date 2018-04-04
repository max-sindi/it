<?php if (isset($pane_prefix)): print $pane_prefix; endif; ?>
<<?php print $tag . $attributes . $id; ?>>
  <div class="block-inner clearfix">
    <?php if ($admin_links): ?>
      <?php print $admin_links; ?>
    <?php endif; ?>

    <?php print render($title_prefix); ?>
    <?php if ($title): ?>
      <div<?php print $title_attributes; ?>><?php print $title; ?></div>
    <?php endif; ?>
    <?php print render($title_suffix); ?>

    <?php if ($feeds): ?>
      <div class="feed">
        <?php print $feeds; ?>
      </div>
    <?php endif; ?>

    <div<?php print $content_attributes; ?>>
      <?php print render($content); ?>
    </div>

    <?php if ($links): ?>
      <nav class="links">
        <?php print $links; ?>
      </nav>
    <?php endif; ?>

    <?php if ($more): ?>
      <div class="more-link">
        <?php print $more; ?>
      </div>
    <?php endif; ?>

  </div>
</<?php print $tag; ?>>
<?php if (isset($pane_suffix)): print $pane_suffix; endif; ?>
