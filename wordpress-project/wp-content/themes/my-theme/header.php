<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>">
    <title><?php wp_title( '|', true, 'right' ); ?></title>
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<div id="page">
    <header id="masthead">
        <div class="container">
            <div class="logo">
                <h1>Галерея ЛИК</h1>
            </div>
            
            <nav id="site-navigation">
                <?php
                wp_nav_menu( array(
                    'theme_location' => 'primary',
                    'menu_id'        => 'primary-menu',
                ) );
                ?>
            </nav>
            
            <div class="header-cta">
                <a href="#contact" class="btn btn-primary">Оценить онлайн / Продать</a>
            </div>
        </div>
    </header>

    <!-- Global Sticky Contact Widget -->
    <div class="sticky-contact-widget">
        <div class="contact-trigger">
            <span>Связаться</span>
        </div>
        <div class="contact-options">
            <a href="https://wa.me/" class="contact-option whatsapp" target="_blank">WhatsApp</a>
            <a href="https://t.me/" class="contact-option telegram" target="_blank">Telegram</a>
            <a href="#" class="contact-option wechat" target="_blank">WeChat</a>
            <a href="#" class="contact-option avito" target="_blank">Авито</a>
            <a href="tel:" class="contact-option phone">Позвонить</a>
        </div>
    </div>
</body>
</html>