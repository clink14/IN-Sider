document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        if (btn.tagName === 'BUTTON') {
            btn.addEventListener('click', (e) => {
                const item = e.target.closest('.review-item');

                item.classList.toggle('active');

                e.target.textContent = item.classList.contains('active')
                    ? 'HIDE DETAILS'
                    : 'SEE DETAILS';
            });
        }
    });
});