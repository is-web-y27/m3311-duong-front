(function() {
    // Cấu hình API
    const API_URL = 'https://jsonplaceholder.typicode.com/comments';
    const ITEMS_PER_PAGE = 5;
    
    // DOM Elements
    const elements = {
        list: document.getElementById('api-feedback-list'),
        preloader: document.getElementById('api-preloader'),
        error: document.getElementById('api-error'),
        template: document.getElementById('api-feedback-template'),
        reloadBtn: document.getElementById('reload-api-btn')
    };
    
    // Biến toàn cục
    let currentPostId = 1;
    
    // Hàm hiển thị preloader
    function showPreloader() {
        elements.preloader.style.display = 'block';
        elements.error.style.display = 'none';
    }
    
    // Hàm ẩn preloader
    function hidePreloader() {
        elements.preloader.style.display = 'none';
    }
    
    // Hàm hiển thị lỗi
    function showError(message) {
        elements.error.innerHTML = `<strong>Lỗi:</strong> ${message}`;
        elements.error.style.display = 'block';
    }
    
    // Hàm tạo ID ngẫu nhiên cho post (Yêu cầu: lọc khác nhau mỗi lần)
    function getRandomPostId() {
        return Math.floor(Math.random() * 100) + 1;
    }
    
    // Hàm fetch dữ liệu từ API
    async function fetchFeedback() {
        showPreloader();
        elements.list.innerHTML = '';
        
        try {
            // Lấy postId ngẫu nhiên (Yêu cầu 4: lọc phía server)
            currentPostId = getRandomPostId();
            const url = `${API_URL}?postId=${currentPostId}&_limit=${ITEMS_PER_PAGE}`;
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.length === 0) {
                showError('Không tìm thấy đánh giá nào cho bài viết này.');
                return;
            }
            
            // Hiển thị dữ liệu
            displayFeedback(data);
            
        } catch (error) {
            // Xử lý các loại lỗi khác nhau
            let errorMessage = 'Không thể tải dữ liệu. ';
            
            if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Lỗi kết nối mạng hoặc API không khả dụng.';
            } else if (error.message.includes('HTTP 404')) {
                errorMessage += 'Không tìm thấy tài nguyên.';
            } else {
                errorMessage += error.message;
            }
            
            showError(errorMessage);
            console.error('API Error:', error);
        } finally {
            hidePreloader();
        }
    }
    
    // Hàm hiển thị dữ liệu từ template
    function displayFeedback(feedbacks) {
        feedbacks.forEach(item => {
            const clone = elements.template.content.cloneNode(true);
            
            clone.querySelector('.api-name').textContent = item.name;
            clone.querySelector('.api-email').textContent = item.email;
            clone.querySelector('.api-body').textContent = item.body;
            clone.querySelector('.api-post-id span').textContent = item.postId;
            
            elements.list.appendChild(clone);
        });
    }
    
    // Sự kiện khi trang load
    document.addEventListener('DOMContentLoaded', function() {
        // Tải dữ liệu lần đầu
        fetchFeedback();
        
        // Sự kiện cho nút reload
        if (elements.reloadBtn) {
            elements.reloadBtn.addEventListener('click', fetchFeedback);
        }
    });
})();