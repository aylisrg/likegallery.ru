<footer id="colophon">
    <div class="container">
        <p>&copy; <?php echo date('Y'); ?> Галерея ЛИК. Все права защищены.</p>
        
        <!-- Additional contact links in footer -->
        <div class="footer-contacts">
            <a href="https://wa.me/" target="_blank">WhatsApp</a>
            <a href="https://t.me/" target="_blank">Telegram</a>
            <a href="#" target="_blank">WeChat</a>
            <a href="#" target="_blank">Авито</a>
        </div>
    </div>
</footer>

<?php wp_footer(); ?>
</div><!-- #page -->

<!-- JavaScript for sticky widget -->
<script>
document.addEventListener('DOMContentLoaded', function() {
    const trigger = document.querySelector('.contact-trigger');
    const options = document.querySelector('.contact-options');
    
    if(trigger && options) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            options.classList.toggle('active');
        });
        
        // Close options when clicking outside
        document.addEventListener('click', function(e) {
            if (!trigger.contains(e.target) && !options.contains(e.target)) {
                options.classList.remove('active');
            }
        });
    }
});
</script>

</body>
</html>