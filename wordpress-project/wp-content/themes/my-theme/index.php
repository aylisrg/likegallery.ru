<?php
/**
 * Main index.php template for Gallery Lik
 */
get_header();
?>

<main id="main">
    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <h1>Поможем определить, оценить и продать ваши предметы в достойные руки</h1>
            <p>Экспертная оценка, аутентификация и продажа предметов искусства Востока</p>
            
            <!-- Quick Start Buttons -->
            <div class="quick-start-buttons">
                <a href="https://wa.me/" class="btn btn-whatsapp" target="_blank">WhatsApp</a>
                <a href="https://t.me/" class="btn btn-telegram" target="_blank">Telegram</a>
                <a href="#" class="btn btn-wechat" target="_blank">WeChat</a>
                <a href="#" class="btn btn-avito" target="_blank">Авито</a>
            </div>
        </div>
    </section>

    <!-- Featured Items Section -->
    <section class="featured-items">
        <div class="container">
            <h2>Избранные экспонаты</h2>
            <div class="items-grid">
                <?php
                // Query for featured/sold items
                $args = array(
                    'post_type' => 'item',
                    'posts_per_page' => 6,
                    'meta_query' => array(
                        array(
                            'key' => 'status',
                            'value' => 'sold',
                            'compare' => '='
                        )
                    )
                );
                $items = new WP_Query($args);
                
                if ($items->have_posts()) :
                    while ($items->have_posts()) : $items->the_post();
                        get_template_part('template-parts/item', 'card');
                    endwhile;
                    wp_reset_postdata();
                else :
                    echo '<p>Пока нет доступных экспонатов.</p>';
                endif;
                ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>