<div class="item-card <?php echo get_post_meta(get_the_ID(), 'status', true) === 'sold' ? 'item-sold' : ''; ?>">
    <?php if (has_post_thumbnail()) : ?>
        <img src="<?php the_post_thumbnail_url('medium'); ?>" alt="<?php the_title(); ?>" class="item-image">
    <?php endif; ?>
    
    <div class="item-info">
        <h3 class="item-title"><?php the_title(); ?></h3>
        
        <?php if (get_post_meta(get_the_ID(), 'status', true) !== 'sold') : ?>
            <?php $price = get_post_meta(get_the_ID(), 'price', true); ?>
            <?php if ($price) : ?>
                <div class="item-price"><?php echo esc_html($price); ?></div>
            <?php endif; ?>
        <?php endif; ?>
        
        <div class="item-description">
            <?php echo wp_trim_words(get_the_content(), 20, '...'); ?>
        </div>
        
        <?php if (get_post_meta(get_the_ID(), 'status', true) === 'sold') : ?>
            <p>Владеете подобным предметом? Мы купим его дорого</p>
            <a href="https://wa.me/?text=<?php echo urlencode('У меня есть предмет, похожий на ' . get_the_title() . ', хочу продать'); ?>" class="btn btn-whatsapp">Оценить онлайн</a>
        <?php else : ?>
            <a href="https://wa.me/?text=<?php echo urlencode('Здравствуйте, интересует предмет "' . get_the_title() . '"'); ?>" class="btn btn-whatsapp">Обсудить покупку</a>
        <?php endif; ?>
    </div>
</div>