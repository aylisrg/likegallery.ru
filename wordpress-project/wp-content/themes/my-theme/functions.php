<?php
/**
 * Functions and setup for Gallery Lik theme
 */

// Enable support for various WordPress features
function gallery_lik_setup() {
    // Add theme support for automatic feed links
    add_theme_support('automatic-feed-links');
    
    // Add theme support for title tag
    add_theme_support('title-tag');
    
    // Add theme support for post thumbnails
    add_theme_support('post-thumbnails');
    
    // Add theme support for custom logo
    add_theme_support('custom-logo');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => 'Primary Menu',
        'services' => 'Services Menu'
    ));
}
add_action('after_setup_theme', 'gallery_lik_setup');

// Enqueue styles and scripts
function gallery_lik_scripts() {
    wp_enqueue_style('gallery-lik-style', get_stylesheet_uri());
    
    // Add custom CSS for design
    wp_add_inline_style('gallery-lik-style', '
        /* Design Styles for Gallery Lik */
        :root {
            --primary-color: #d4af37; /* Gold color for luxury feel */
            --secondary-color: #1a1a1a; /* Dark background */
            --text-color: #ffffff; /* Light text */
            --accent-color: #8b0000; /* Deep red accent */
            --border-radius: 8px;
            --box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        body {
            font-family: "Helvetica Neue", Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--secondary-color);
            color: var(--text-color);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        /* Header Styles */
        #masthead {
            background-color: rgba(26, 26, 26, 0.95);
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        .logo h1 {
            margin: 0;
            font-size: 1.8rem;
            color: var(--primary-color);
            font-family: Georgia, serif; /* Serif for headings */
        }
        
        #site-navigation ul {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }
        
        #site-navigation li {
            margin-right: 2rem;
        }
        
        #site-navigation a {
            color: var(--text-color);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s ease;
        }
        
        #site-navigation a:hover {
            color: var(--primary-color);
        }
        
        .header-cta .btn {
            background-color: var(--primary-color);
            color: var(--secondary-color);
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }
        
        .header-cta .btn:hover {
            background-color: #f0c450;
        }
        
        /* Hero Section */
        .hero {
            background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("images/hero-bg.jpg") center/cover;
            padding: 5rem 0;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-family: Georgia, serif; /* Serif for headings */
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .quick-start-buttons {
            display: flex;
            justify-content: center;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        .btn {
            display: inline-block;
            padding: 0.75rem 1.5rem;
            border-radius: var(--border-radius);
            text-decoration: none;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .btn-whatsapp { background-color: #25D366; color: white; }
        .btn-telegram { background-color: #0088cc; color: white; }
        .btn-wechat { background-color: #07c160; color: white; }
        .btn-avito { background-color: #ff5722; color: white; }
        
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: var(--box-shadow);
        }
        
        /* Items Grid */
        .featured-items {
            padding: 4rem 0;
        }
        
        .featured-items h2 {
            text-align: center;
            font-size: 2rem;
            margin-bottom: 2.5rem;
            font-family: Georgia, serif; /* Serif for headings */
            color: var(--primary-color);
        }
        
        .items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .item-card {
            background-color: rgba(255,255,255,0.1);
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: var(--box-shadow);
            transition: transform 0.3s ease;
        }
        
        .item-card:hover {
            transform: translateY(-5px);
        }
        
        .item-image {
            width: 100%;
            height: 250px;
            object-fit: cover;
        }
        
        .item-info {
            padding: 1.5rem;
        }
        
        .item-title {
            font-size: 1.3rem;
            margin-top: 0;
            font-family: Georgia, serif; /* Serif for headings */
        }
        
        .item-price {
            color: var(--primary-color);
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .item-description {
            margin: 1rem 0;
            color: #ccc;
        }
        
        .item-sold {
            position: relative;
        }
        
        .item-sold::after {
            content: "Продано";
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(139, 0, 0, 0.8);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            font-weight: bold;
            z-index: 2;
        }
        
        .item-sold .item-image {
            filter: grayscale(100%);
        }
        
        /* Sticky Contact Widget */
        .sticky-contact-widget {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
        }
        
        @media (max-width: 768px) {
            .sticky-contact-widget {
                bottom: 0;
                left: 0;
                right: 0;
                width: 100%;
            }
        }
        
        .contact-trigger {
            background-color: var(--primary-color);
            color: var(--secondary-color);
            width: 60px;
            height: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: var(--box-shadow);
            font-weight: bold;
        }
        
        .contact-options {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1rem;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
        }
        
        .contact-options.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .contact-option {
            background-color: white;
            color: var(--secondary-color);
            padding: 0.75rem;
            border-radius: var(--border-radius);
            text-decoration: none;
            text-align: center;
            min-width: 150px;
            box-shadow: var(--box-shadow);
        }
        
        /* Footer */
        #colophon {
            background-color: rgba(0,0,0,0.8);
            padding: 2rem 0;
            text-align: center;
        }
        
        .footer-contacts {
            margin-top: 1rem;
        }
        
        .footer-contacts a {
            color: var(--primary-color);
            margin: 0 0.5rem;
            text-decoration: none;
        }
        
        /* Services Page Styles */
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        
        .service-card {
            background-color: rgba(255,255,255,0.1);
            padding: 2rem;
            border-radius: var(--border-radius);
            text-align: center;
        }
        
        .service-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }
        
        /* Archive Page Styles */
        .archive-header {
            text-align: center;
            padding: 3rem 0;
        }
        
        .archive-header h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            font-family: Georgia, serif; /* Serif for headings */
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .quick-start-buttons {
                flex-direction: column;
                align-items: center;
            }
            
            #site-navigation ul {
                flex-direction: column;
            }
            
            #site-navigation li {
                margin: 0.5rem 0;
            }
        }
    ');
}
add_action('wp_enqueue_scripts', 'gallery_lik_scripts');

// Register custom post type for items
function create_item_post_type() {
    register_post_type('item',
        array(
            'labels' => array(
                'name' => __('Items'),
                'singular_name' => __('Item')
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'show_in_rest' => true, // Enable Gutenberg editor
            'rewrite' => array('slug' => 'items'),
            'menu_icon' => 'dashicons-images-alt2'
        )
    );
    
    // Add custom fields for items
    add_action('admin_init', 'add_item_meta_boxes');
}
add_action('init', 'create_item_post_type');

// Add meta boxes for item custom fields
function add_item_meta_boxes() {
    add_meta_box(
        'item_details',
        'Детали предмета',
        'item_details_callback',
        'item',
        'normal',
        'high'
    );
}

// Callback function for item meta box
function item_details_callback($post) {
    wp_nonce_field('save_item_details', 'item_details_nonce');
    
    $category = get_post_meta($post->ID, 'category', true);
    $price = get_post_meta($post->ID, 'price', true);
    $status = get_post_meta($post->ID, 'status', true);
    $expertise_file = get_post_meta($post->ID, 'expertise_file', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="item_category">Категория</label></th>';
    echo '<td><select name="item_category" id="item_category" class="regular-text">';
    $categories = array('Буддизм', 'Христианство', 'Индия/Гималаи', 'Китай/Тибет', 'Монголия/Дзанабазар', 'Современники', 'Артефакты Востока');
    foreach($categories as $cat) {
        echo '<option value="' . esc_attr($cat) . '" ' . selected($cat, $category, false) . '>' . esc_html($cat) . '</option>';
    }
    echo '</select></td></tr>';
    
    echo '<tr><th><label for="item_price">Цена</label></th>';
    echo '<td><input type="text" name="item_price" id="item_price" value="' . esc_attr($price) . '" class="regular-text" /></td></tr>';
    
    echo '<tr><th><label for="item_status">Статус</label></th>';
    echo '<td><select name="item_status" id="item_status" class="regular-text">';
    $statuses = array('active' => 'В наличии', 'sold' => 'Продано', 'restoration' => 'На реставрации');
    foreach($statuses as $val => $label) {
        echo '<option value="' . esc_attr($val) . '" ' . selected($val, $status, false) . '>' . esc_html($label) . '</option>';
    }
    echo '</select></td></tr>';
    
    echo '<tr><th><label for="item_expertise_file">Файл экспертизы (PDF)</label></th>';
    echo '<td><input type="url" name="item_expertise_file" id="item_expertise_file" value="' . esc_url($expertise_file) . '" class="regular-text" /></td></tr>';
    
    echo '</table>';
}

// Save item custom fields
function save_item_details($post_id) {
    if(!isset($_POST['item_details_nonce']) || !wp_verify_nonce($_POST['item_details_nonce'], 'save_item_details')) {
        return;
    }
    
    if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if(isset($_POST['post_type']) && $_POST['post_type'] === 'item') {
        if(!current_user_can('edit_page', $post_id)) {
            return;
        }
    } else {
        if(!current_user_can('edit_post', $post_id)) {
            return;
        }
    }
    
    if(isset($_POST['item_category'])) {
        update_post_meta($post_id, 'category', sanitize_text_field($_POST['item_category']));
    }
    
    if(isset($_POST['item_price'])) {
        update_post_meta($post_id, 'price', sanitize_text_field($_POST['item_price']));
    }
    
    if(isset($_POST['item_status'])) {
        update_post_meta($post_id, 'status', sanitize_text_field($_POST['item_status']));
    }
    
    if(isset($_POST['item_expertise_file'])) {
        update_post_meta($post_id, 'expertise_file', esc_url_raw($_POST['item_expertise_file']));
    }
}
add_action('save_post', 'save_item_details');

// Register custom post type for service cases
function create_service_case_post_type() {
    register_post_type('service_case',
        array(
            'labels' => array(
                'name' => __('Service Cases'),
                'singular_name' => __('Service Case')
            ),
            'public' => true,
            'has_archive' => true,
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'show_in_rest' => true, // Enable Gutenberg editor
            'rewrite' => array('slug' => 'service-cases'),
            'menu_icon' => 'dashicons-media-document'
        )
    );
    
    // Add custom fields for service cases
    add_action('admin_init', 'add_service_case_meta_boxes');
}
add_action('init', 'create_service_case_post_type');

// Add meta boxes for service case custom fields
function add_service_case_meta_boxes() {
    add_meta_box(
        'service_case_details',
        'Детали кейса услуги',
        'service_case_details_callback',
        'service_case',
        'normal',
        'high'
    );
}

// Callback function for service case meta box
function service_case_details_callback($post) {
    wp_nonce_field('save_service_case_details', 'service_case_details_nonce');
    
    $type = get_post_meta($post->ID, 'type', true);
    $image_before = get_post_meta($post->ID, 'image_before', true);
    $image_after = get_post_meta($post->ID, 'image_after', true);
    
    echo '<table class="form-table">';
    echo '<tr><th><label for="service_case_type">Тип услуги</label></th>';
    echo '<td><select name="service_case_type" id="service_case_type" class="regular-text">';
    $types = array('restoration' => 'Реставрация', 'expertise' => 'Экспертиза');
    foreach($types as $val => $label) {
        echo '<option value="' . esc_attr($val) . '" ' . selected($val, $type, false) . '>' . esc_html($label) . '</option>';
    }
    echo '</select></td></tr>';
    
    echo '<tr><th><label for="image_before">Изображение "До"</label></th>';
    echo '<td><input type="url" name="image_before" id="image_before" value="' . esc_url($image_before) . '" class="regular-text" placeholder="URL изображения до" /></td></tr>';
    
    echo '<tr><th><label for="image_after">Изображение "После"</label></th>';
    echo '<td><input type="url" name="image_after" id="image_after" value="' . esc_url($image_after) . '" class="regular-text" placeholder="URL изображения после" /></td></tr>';
    
    echo '</table>';
}

// Save service case custom fields
function save_service_case_details($post_id) {
    if(!isset($_POST['service_case_details_nonce']) || !wp_verify_nonce($_POST['service_case_details_nonce'], 'save_service_case_details')) {
        return;
    }
    
    if(defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if(isset($_POST['post_type']) && $_POST['post_type'] === 'service_case') {
        if(!current_user_can('edit_page', $post_id)) {
            return;
        }
    } else {
        if(!current_user_can('edit_post', $post_id)) {
            return;
        }
    }
    
    if(isset($_POST['service_case_type'])) {
        update_post_meta($post_id, 'type', sanitize_text_field($_POST['service_case_type']));
    }
    
    if(isset($_POST['image_before'])) {
        update_post_meta($post_id, 'image_before', esc_url_raw($_POST['image_before']));
    }
    
    if(isset($_POST['image_after'])) {
        update_post_meta($post_id, 'image_after', esc_url_raw($_POST['image_after']));
    }
}
add_action('save_post', 'save_service_case_details');

// Create template for item card
function create_template_parts_directory() {
    $upload_dir = wp_upload_dir();
    $template_path = $upload_dir['basedir'] . '/gallery-lik-templates';
    
    if (!file_exists($template_path)) {
        wp_mkdir_p($template_path);
    }
}
add_action('init', 'create_template_parts_directory');