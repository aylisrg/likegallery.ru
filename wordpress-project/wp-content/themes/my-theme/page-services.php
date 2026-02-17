<?php
/**
 * Template for displaying the Services page
 */
get_header();
?>

<main id="main">
    <section class="archive-header">
        <div class="container">
            <h1>Наши услуги</h1>
            <p>Профессиональная экспертиза и реставрация ваших ценных предметов</p>
        </div>
    </section>

    <section class="services-section">
        <div class="container">
            <div class="services-grid">
                <!-- Expertise Service -->
                <div class="service-card">
                    <div class="service-icon">🔍</div>
                    <h3>Научная экспертиза</h3>
                    <p>Наши специалисты проведут комплексную проверку подлинности и исторической ценности вашего предмета.</p>
                    <a href="#" class="btn btn-primary">Заказать экспертизу</a>
                    
                    <!-- Example expertise report -->
                    <div class="service-download">
                        <a href="#" download>Пример PDF-отчета</a>
                    </div>
                </div>
                
                <!-- Restoration Service -->
                <div class="service-card">
                    <div class="service-icon">🛠️</div>
                    <h3>Реставрация</h3>
                    <p>Восстановление и консервация артефактов с использованием передовых методов и материалов.</p>
                    
                    <!-- Interactive "Before/After" slider -->
                    <div class="before-after-slider">
                        <h4>Примеры работ:</h4>
                        <div class="slider-container">
                            <img src="images/restoration-before-example.jpg" alt="До реставрации" class="before-image">
                            <img src="images/restoration-after-example.jpg" alt="После реставрации" class="after-image">
                        </div>
                        
                        <div class="slider-controls">
                            <label for="before-after-slider">Сравнить:</label>
                            <input type="range" id="before-after-slider" min="0" max="100" value="50">
                        </div>
                    </div>
                    
                    <a href="https://wa.me/?text=<?php echo urlencode('Здравствуйте, хочу оценить стоимость реставрации по фото'); ?>" class="btn btn-primary">Оценить стоимость реставрации по фото</a>
                </div>
                
                <!-- Sourcing Service -->
                <div class="service-card">
                    <div class="service-icon">💎</div>
                    <h3>Подбор предметов (Sourcing)</h3>
                    <p>Поиск и приобретение уникальных артефактов по запросу коллекционеров и музеев.</p>
                    <a href="https://wa.me/?text=<?php echo urlencode('Здравствуйте, хочу предложить предмет для скупки/комиссии'); ?>" class="btn btn-primary">Предложить предмет</a>
                </div>
            </div>
        </div>
    </section>
</main>

<?php get_footer(); ?>