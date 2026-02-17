<?php
/**
 * Template for displaying individual item pages
 */
get_header();
?>

<main id="main">
    <?php if (have_posts()) : ?>
        <?php while (have_posts()) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <header class="entry-header">
                    <div class="container">
                        <h1><?php the_title(); ?></h1>
                        
                        <?php $category = get_post_meta(get_the_ID(), 'category', true); ?>
                        <?php if ($category) : ?>
                            <div class="item-category">Категория: <?php echo esc_html($category); ?></div>
                        <?php endif; ?>
                        
                        <?php $status = get_post_meta(get_the_ID(), 'status', true); ?>
                        <?php if ($status === 'sold') : ?>
                            <div class="item-status sold">Статус: Продано</div>
                        <?php elseif ($status === 'restoration') : ?>
                            <div class="item-status restoration">Статус: На реставрации</div>
                        <?php else : ?>
                            <div class="item-status active">Статус: В наличии</div>
                            
                            <?php $price = get_post_meta(get_the_ID(), 'price', true); ?>
                            <?php if ($price) : ?>
                                <div class="item-price">Цена: <?php echo esc_html($price); ?></div>
                            <?php endif; ?>
                        <?php endif; ?>
                    </div>
                </header>
                
                <div class="container">
                    <div class="entry-content">
                        <div class="item-gallery">
                            <?php if (has_post_thumbnail()) : ?>
                                <div class="main-image">
                                    <?php the_post_thumbnail('large'); ?>
                                </div>
                            <?php endif; ?>
                            
                            <!-- Additional images could be implemented here -->
                        </div>
                        
                        <div class="item-details">
                            <?php the_content(); ?>
                            
                            <?php $expertise_file = get_post_meta(get_the_ID(), 'expertise_file', true); ?>
                            <?php if ($expertise_file) : ?>
                                <div class="expertise-report">
                                    <a href="<?php echo esc_url($expertise_file); ?>" target="_blank">Смотреть отчет экспертизы</a>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                    
                    <div class="item-actions">
                        <?php if ($status === 'sold') : ?>
                            <p>Этот предмет уже продан, но мы можем помочь найти похожие экземпляры или оценить ваш предмет.</p>
                            <a href="https://wa.me/?text=<?php echo urlencode('У меня есть предмет, похожий на ' . get_the_title() . ', хочу продать'); ?>" class="btn btn-whatsapp">Оценить мой предмет</a>
                        <?php elseif ($status === 'restoration') : ?>
                            <p>Этот предмет находится на реставрации. Свяжитесь с нами для получения дополнительной информации.</p>
                            <a href="https://wa.me/?text=<?php echo urlencode('Здравствуйте, интересует предмет "' . get_the_title() . '" который находится на реставрации'); ?>" class="btn btn-whatsapp">Узнать подробнее</a>
                        <?php else : ?>
                            <a href="https://wa.me/?text=<?php echo urlencode('Здравствуйте, интересует предмет "' . get_the_title() . '"'); ?>" class="btn btn-whatsapp">Получить консультацию</a>
                        <?php endif; ?>
                        
                        <a href="#" class="btn btn-secondary">Поделиться</a>
                    </div>
                </div>
            </article>
        <?php endwhile; ?>
    <?php endif; ?>
</main>

<?php get_footer(); ?>