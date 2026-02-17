<?php
/**
 * Unit tests for Gallery Lik theme functions
 */

class TestThemeFunctions extends WP_UnitTestCase {

    /**
     * Test theme setup function
     */
    public function test_gallery_lik_setup() {
        // Call the setup function
        gallery_lik_setup();

        // Check if theme supports are properly added
        $this->assertTrue(current_theme_supports('automatic-feed-links'));
        $this->assertTrue(current_theme_supports('title-tag'));
        $this->assertTrue(current_theme_supports('post-thumbnails'));
        $this->assertTrue(current_theme_supports('custom-logo'));

        // Check if navigation menus are registered
        $locations = get_registered_nav_menus();
        $this->assertArrayHasKey('primary', $locations);
        $this->assertArrayHasKey('services', $locations);
        $this->assertEquals('Primary Menu', $locations['primary']);
        $this->assertEquals('Services Menu', $locations['services']);
    }

    /**
     * Test item post type registration
     */
    public function test_item_post_type_registration() {
        // Check if post type exists
        $this->assertTrue(post_type_exists('item'));

        // Get post type object and check properties
        $item_post_type = get_post_type_object('item');
        $this->assertNotNull($item_post_type);
        $this->assertTrue($item_post_type->public);
        $this->assertTrue($item_post_type->has_archive);
        $this->assertTrue($item_post_type->show_in_rest);
        $this->assertEquals('items', $item_post_type->rewrite['slug']);
        $this->assertEquals('dashicons-images-alt2', $item_post_type->menu_icon);

        // Check supported features
        $this->assertTrue(post_type_supports('item', 'title'));
        $this->assertTrue(post_type_supports('item', 'editor'));
        $this->assertTrue(post_type_supports('item', 'thumbnail'));
        $this->assertTrue(post_type_supports('item', 'custom-fields'));
    }

    /**
     * Test service case post type registration
     */
    public function test_service_case_post_type_registration() {
        // Check if post type exists
        $this->assertTrue(post_type_exists('service_case'));

        // Get post type object and check properties
        $service_case_post_type = get_post_type_object('service_case');
        $this->assertNotNull($service_case_post_type);
        $this->assertTrue($service_case_post_type->public);
        $this->assertTrue($service_case_post_type->has_archive);
        $this->assertTrue($service_case_post_type->show_in_rest);
        $this->assertEquals('service-cases', $service_case_post_type->rewrite['slug']);
        $this->assertEquals('dashicons-media-document', $service_case_post_type->menu_icon);

        // Check supported features
        $this->assertTrue(post_type_supports('service_case', 'title'));
        $this->assertTrue(post_type_supports('service_case', 'editor'));
        $this->assertTrue(post_type_supports('service_case', 'thumbnail'));
        $this->assertTrue(post_type_supports('service_case', 'custom-fields'));
    }

    /**
     * Test adding item meta boxes
     */
    public function test_add_item_meta_boxes() {
        // Call the function that adds meta boxes
        add_item_meta_boxes();

        // Check if the meta box was added
        global $wp_meta_boxes;
        $this->assertArrayHasKey('item', $wp_meta_boxes);
        $this->assertArrayHasKey('normal', $wp_meta_boxes['item']);
        $this->assertArrayHasKey('high', $wp_meta_boxes['item']['normal']);
        
        $meta_box_found = false;
        foreach ($wp_meta_boxes['item']['normal']['high'] as $meta_box) {
            if (isset($meta_box['id']) && $meta_box['id'] === 'item_details') {
                $meta_box_found = true;
                break;
            }
        }
        $this->assertTrue($meta_box_found);
    }

    /**
     * Test adding service case meta boxes
     */
    public function test_add_service_case_meta_boxes() {
        // Call the function that adds meta boxes
        add_service_case_meta_boxes();

        // Check if the meta box was added
        global $wp_meta_boxes;
        $this->assertArrayHasKey('service_case', $wp_meta_boxes);
        $this->assertArrayHasKey('normal', $wp_meta_boxes['service_case']);
        $this->assertArrayHasKey('high', $wp_meta_boxes['service_case']['normal']);
        
        $meta_box_found = false;
        foreach ($wp_meta_boxes['service_case']['normal']['high'] as $meta_box) {
            if (isset($meta_box['id']) && $meta_box['id'] === 'service_case_details') {
                $meta_box_found = true;
                break;
            }
        }
        $this->assertTrue($meta_box_found);
    }

    /**
     * Test saving item details
     */
    public function test_save_item_details() {
        // Create a test item
        $post_id = $this->factory()->post->create([
            'post_type' => 'item',
            'post_title' => 'Test Item'
        ]);

        // Prepare POST data
        $_POST['item_details_nonce'] = wp_create_nonce('save_item_details');
        $_POST['post_type'] = 'item';
        $_POST['item_category'] = 'Буддизм';
        $_POST['item_price'] = '1000';
        $_POST['item_status'] = 'active';
        $_POST['item_expertise_file'] = 'https://example.com/expertise.pdf';

        // Call the save function
        save_item_details($post_id);

        // Check if custom fields were saved
        $this->assertEquals('Буддизм', get_post_meta($post_id, 'category', true));
        $this->assertEquals('1000', get_post_meta($post_id, 'price', true));
        $this->assertEquals('active', get_post_meta($post_id, 'status', true));
        $this->assertEquals('https://example.com/expertise.pdf', get_post_meta($post_id, 'expertise_file', true));
    }

    /**
     * Test saving service case details
     */
    public function test_save_service_case_details() {
        // Create a test service case
        $post_id = $this->factory()->post->create([
            'post_type' => 'service_case',
            'post_title' => 'Test Service Case'
        ]);

        // Prepare POST data
        $_POST['service_case_details_nonce'] = wp_create_nonce('save_service_case_details');
        $_POST['post_type'] = 'service_case';
        $_POST['service_case_type'] = 'restoration';
        $_POST['image_before'] = 'https://example.com/before.jpg';
        $_POST['image_after'] = 'https://example.com/after.jpg';

        // Call the save function
        save_service_case_details($post_id);

        // Check if custom fields were saved
        $this->assertEquals('restoration', get_post_meta($post_id, 'type', true));
        $this->assertEquals('https://example.com/before.jpg', get_post_meta($post_id, 'image_before', true));
        $this->assertEquals('https://example.com/after.jpg', get_post_meta($post_id, 'image_after', true));
    }

    /**
     * Test that saving works only with valid nonce
     */
    public function test_save_item_details_with_invalid_nonce() {
        // Create a test item
        $post_id = $this->factory()->post->create([
            'post_type' => 'item',
            'post_title' => 'Test Item'
        ]);

        // Prepare POST data with invalid nonce
        $_POST['item_details_nonce'] = 'invalid_nonce';
        $_POST['item_category'] = 'Буддизм';
        $_POST['item_price'] = '1000';
        $_POST['item_status'] = 'active';
        $_POST['item_expertise_file'] = 'https://example.com/expertise.pdf';

        // Call the save function
        save_item_details($post_id);

        // Check that custom fields were NOT saved due to invalid nonce
        $this->assertEmpty(get_post_meta($post_id, 'category', true));
        $this->assertEmpty(get_post_meta($post_id, 'price', true));
        $this->assertEmpty(get_post_meta($post_id, 'status', true));
        $this->assertEmpty(get_post_meta($post_id, 'expertise_file', true));
    }

    /**
     * Test that saving works only with valid nonce for service case
     */
    public function test_save_service_case_details_with_invalid_nonce() {
        // Create a test service case
        $post_id = $this->factory()->post->create([
            'post_type' => 'service_case',
            'post_title' => 'Test Service Case'
        ]);

        // Prepare POST data with invalid nonce
        $_POST['service_case_details_nonce'] = 'invalid_nonce';
        $_POST['service_case_type'] = 'restoration';
        $_POST['image_before'] = 'https://example.com/before.jpg';
        $_POST['image_after'] = 'https://example.com/after.jpg';

        // Call the save function
        save_service_case_details($post_id);

        // Check that custom fields were NOT saved due to invalid nonce
        $this->assertEmpty(get_post_meta($post_id, 'type', true));
        $this->assertEmpty(get_post_meta($post_id, 'image_before', true));
        $this->assertEmpty(get_post_meta($post_id, 'image_after', true));
    }

    /**
     * Test item callback function renders properly
     */
    public function test_item_details_callback() {
        // Create a test item
        $post = $this->factory()->post->create_and_get([
            'post_type' => 'item',
            'post_title' => 'Test Item'
        ]);

        // Start output buffering to capture the rendered HTML
        ob_start();
        item_details_callback($post);
        $output = ob_get_clean();

        // Check that the output contains expected elements
        $this->assertStringContainsString('<select name="item_category"', $output);
        $this->assertStringContainsString('<input type="text" name="item_price"', $output);
        $this->assertStringContainsString('<select name="item_status"', $output);
        $this->assertStringContainsString('<input type="url" name="item_expertise_file"', $output);
    }

    /**
     * Test service case callback function renders properly
     */
    public function test_service_case_details_callback() {
        // Create a test service case
        $post = $this->factory()->post->create_and_get([
            'post_type' => 'service_case',
            'post_title' => 'Test Service Case'
        ]);

        // Start output buffering to capture the rendered HTML
        ob_start();
        service_case_details_callback($post);
        $output = ob_get_clean();

        // Check that the output contains expected elements
        $this->assertStringContainsString('<select name="service_case_type"', $output);
        $this->assertStringContainsString('<input type="url" name="image_before"', $output);
        $this->assertStringContainsString('<input type="url" name="image_after"', $output);
    }

    /**
     * Test template parts directory creation
     */
    public function test_create_template_parts_directory() {
        // Call the function
        create_template_parts_directory();

        // Get the upload directory
        $upload_dir = wp_upload_dir();
        $template_path = $upload_dir['basedir'] . '/gallery-lik-templates';

        // Check if directory exists
        $this->assertTrue(file_exists($template_path));
        $this->assertTrue(is_dir($template_path));
    }
}