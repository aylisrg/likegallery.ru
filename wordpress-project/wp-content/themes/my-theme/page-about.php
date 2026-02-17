<?php
/**
 * Template for displaying the About Us page
 */
get_header();
?>

<main id="main">
    <section class="archive-header">
        <div class="container">
            <h1>О нас</h1>
            <p>Галерея ЛИК — ваш надежный партнер в мире артефактов Востока</p>
        </div>
    </section>

    <section class="about-content">
        <div class="container">
            <div class="about-text">
                <h2>Наша история</h2>
                <p>Галерея ЛИК была основана с целью сохранения и популяризации культурного наследия Востока. Мы специализируемся на редких артефактах, произведениях искусства и исторических предметах из различных культур и эпох.</p>
                
                <h2>Наши эксперты</h2>
                <p>Наша команда состоит из признанных специалистов в области искусствознания, археологии и реставрации. Мы сотрудничаем с музеями, коллекционерами и исследовательскими институтами по всему миру.</p>
                
                <h2>Наши принципы</h2>
                <ul>
                    <li>Профессионализм и научный подход</li>
                    <li>Честность и прозрачность в работе</li>
                    <li>Уважение к культурному наследию</li>
                    <li>Индивидуальный подход к каждому предмету</li>
                </ul>
            </div>
            
            <div class="contact-cta">
                <h3>Готовы сотрудничать?</h3>
                <p>Свяжитесь с нами для оценки ваших предметов или получения дополнительной информации.</p>
                
                <div class="contact-buttons">
                    <a href="https://wa.me/?text=<?php echo urlencode('Здравствуйте, хочу получить информацию о ваших услугах'); ?>" class="btn btn-whatsapp">WhatsApp</a>
                    <a href="https://t.me/" class="btn btn-telegram">Telegram</a>
                    <a href="#" class="btn btn-wechat">WeChat</a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>