<?php
/**
 * Template for displaying the Catalog page
 */
get_header();
?>

<main id="main">
    <section class="archive-header">
        <div class="container">
            <h1>Каталог предметов</h1>
            <p>Изучите нашу коллекцию уникальных артефактов Востока</p>
        </div>
    </section>

    <section class="catalog-items">
        <div class="container">
            <div class="items-grid">
                <?php
                // Query for all items
                $args = array(
                    'post_type' => 'item',
                    'posts_per_page' => 12,
                    'paged' => get_query_var('paged') ? get_query_var('paged') : 1
                );
                $items = new WP_Query($args);
                
                if ($items->have_posts()) :
                    while ($items->have_posts()) : $items->the_post();
                        get_template_part('template-parts/item', 'card');
                    endwhile;
                    wp_reset_postdata();
                    
                    // Pagination
                    echo '<div class="pagination">';
                    echo paginate_links(array(
                        'total' => $items->max_num_pages,
                        'current' => get_query_var('paged') ? get_query_var('paged') : 1
                    ));
                    echo '</div>';
                else :
                    echo '<p>Пока нет доступных предметов.</p>';
                endif;
                ?>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>