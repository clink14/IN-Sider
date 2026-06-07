document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        if (faqItem.classList.contains('active')) {
            faqItem.classList.remove('active');
        } else {
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            faqItem.classList.add('active');
        }
    });
});