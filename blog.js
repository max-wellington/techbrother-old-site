// Blog Filter Functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // Filter posts
            blogPosts.forEach(post => {
                if (filter === 'all') {
                    post.classList.remove('hidden');
                } else {
                    const category = post.getAttribute('data-category');
                    if (category === filter) {
                        post.classList.remove('hidden');
                    } else {
                        post.classList.add('hidden');
                    }
                }
            });
            
            // Update grid layout after filtering
            const blogGrid = document.querySelector('.blog-grid');
            if (blogGrid) {
                blogGrid.style.display = 'grid';
            }
        });
    });
});

