// Dữ liệu giả lập (Mock Data)
const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genres: ["Hành động", "Khoa học viễn tưởng"],
        poster: "image/anh1.jpg", // Thay bằng ảnh thật trong folder images
        description: "Một kẻ trộm chuyên trích xuất bí mật từ tiềm thức của người khác...",
        director: "Christopher Nolan",
        actors: "Leonardo DiCaprio, Joseph Gordon-Levitt"
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        genres: ["Hành động", "Tội phạm"],
        poster: "image/anh2.jpg",
        description: "Batman phải đối mặt với một tên tội phạm tâm thần mang tên Joker.",
        director: "Christopher Nolan",
        actors: "Christian Bale, Heath Ledger"
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        genres: ["Phiêu lưu", "Khoa học viễn tưởng"],
        poster: "image/anh3.jpg",
        description: "Một nhóm nhà thám hiểm du hành qua lỗ sâu vũ trụ để tìm nhà mới cho nhân loại.",
        director: "Christopher Nolan",
        actors: "Matthew McConaughey, Anne Hathaway"
    },
    {
        id: 4,
        title: "Toy Story",
        year: 1995,
        genres: ["Hoạt hình", "Gia đình"],
        poster: "image/anh4.jpg",
        description: "Đồ chơi của một cậu bé trở nên sống động khi không có ai ở xung quanh.",
        director: "John Lasseter",
        actors: "Tom Hanks, Tim Allen"
    },
    {
        id: 5,
        title: "Sự im lặng của bầy cừu",
        year: 1991,
        genres: ["Tội phạm", "Gia đình"],
        poster: "image/anh5.jpg",
        description: "Nữ học viên FBI hợp tác với kẻ sát nhân để phá án.",
        director: "Jonathan Demme",
        actors: "Jodie Foster, Anthony Hopkins"
    },
    {
        id: 6,
        title: "Nhiệm vụ bất khả thi 8",
        year: 2025,
        genres: ["Hành động", "Phiêu lưu"],
        poster: "image/anh6.jpg",
        description: "Ethan Hunt tiếp tục cuộc hành trình nguy hiểm nhất để cứu thế giới khỏi một mối đe dọa công nghệ toàn cầu.",
        director: "Christopher McQuarrie",
        actors: "Tom Cruise, Hayley Atwell"
    },
    {
        id: 7,
        title: "Quá nhanh quá nguy hiểm 6",
        year: 2013,
        genres: ["Hành động", "Tội phạm"],
        poster: "image/anh7.jpg",
        description: "Dom và đội của mình hợp tác với Hobbs để hạ gục một băng nhóm lính đánh thuê xuyên quốc gia.",
        director: "Justin Lin",
        actors: "Vin Diesel, Paul Walker, Dwayne Johnson"
    },
    {
        id: 8,
        title: "The Shawshank Redemption",
        year: 1994,
        genres: ["Tâm lý", "Tội phạm"],
        poster: "image/anh8.jpg",
        description: "Câu chuyện về tình bạn và hy vọng của hai tù nhân bên trong bức tường nhà tù Shawshank khắc nghiệt.",
        director: "Frank Darabont",
        actors: "Tim Robbins, Morgan Freeman"
    },
    {
        id: 9,
        title: "3 chàng ngốc",
        year: 2009,
        genres: ["Hài hước", "Tâm lý"],
        poster: "image/anh9.jpg",
        description: "Ba người bạn thân trong một trường kỹ thuật hàng đầu Ấn Độ cùng nhau đi tìm ý nghĩa thực sự của việc học tập.",
        director: "Rajkumar Hirani",
        actors: "Aamir Khan, Madhavan, Sharman Joshi"
    },
    {
        id: 10,
        title: "Đi tìm Nemo",
        year: 2003,
        genres: ["Hoạt hình", "Phiêu lưu", "Gia đình"],
        poster: "image/anh10.jpg",
        description: "Sau khi chú cá con Nemo bị bắt đi, người cha Marlin nhút nhát đã bắt đầu một hành trình giải cứu đầy dũng cảm trên đại dương.",
        director: "Andrew Stanton",
        actors: "Albert Brooks, Ellen DeGeneres"
    }
];
// Biến trạng thái
let currentSearch = "";
let selectedGenres = [];

// DOM Elements
const movieGrid = document.getElementById('movie-grid');
const genreFilters = document.getElementById('genre-filters');
const searchInput = document.getElementById('search-input');
const modal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');
const themeToggle = document.getElementById('theme-toggle');

// Khởi tạo ứng dụng
function init() {
    initTheme();
    generateGenreCheckboxes();
    renderMovies();
}

// ====================== BÀI 1 & BÀI 3: LIGHT/DARK MODE ======================
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️ Light Mode';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
}

// ====================== BÀI 2: HIỂN THỊ VÀ LỌC DỮ LIỆU ======================

// 1. Tự động trích xuất và tạo checkbox Thể loại
function generateGenreCheckboxes() {
    const allGenres = new Set();
    movies.forEach(movie => {
        movie.genres.forEach(genre => allGenres.add(genre));
    });

    allGenres.forEach(genre => {
        const label = document.createElement('label');
        label.innerHTML = `
            <input type="checkbox" value="${genre}" class="genre-checkbox"> ${genre}
        `;
        genreFilters.appendChild(label);
    });

    // Bắt sự kiện khi check/uncheck
    document.querySelectorAll('.genre-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectedGenres.push(e.target.value);
            } else {
                selectedGenres = selectedGenres.filter(g => g !== e.target.value);
            }
            renderMovies(); // Cập nhật lại UI
        });
    });
}

// 2. Logic Lọc phim tích hợp (Tìm kiếm + Thể loại)
function renderMovies() {
    movieGrid.innerHTML = ''; // Xóa grid cũ

    const filteredMovies = movies.filter(movie => {
        // Điều kiện 1: Tên phim chứa từ khóa tìm kiếm
        const matchSearch = movie.title.toLowerCase().includes(currentSearch.toLowerCase());
        
        // Điều kiện 2: Phim phải chứa ÍT NHẤT một thể loại đã chọn (nếu không chọn gì thì luôn đúng)
        const matchGenre = selectedGenres.length === 0 || selectedGenres.some(genre => movie.genres.includes(genre));

        return matchSearch && matchGenre;
    });

    if (filteredMovies.length === 0) {
        movieGrid.innerHTML = '<p>Không tìm thấy phim phù hợp.</p>';
        return;
    }

    filteredMovies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <div class="movie-info">
                <h4>${movie.title}</h4>
                <p>Năm: ${movie.year}</p>
                <p>Thể loại: ${movie.genres.join(', ')}</p>
            </div>
        `;
        // Thêm sự kiện mở Modal
        card.addEventListener('click', () => openModal(movie));
        movieGrid.appendChild(card);
    });
}

// 3. Tối ưu hiệu năng: Kỹ thuật Debounce cho ô tìm kiếm
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// Gắn Debounce vào Input (Chỉ chạy sau khi ngừng gõ 400ms)
searchInput.addEventListener('input', debounce((e) => {
    currentSearch = e.target.value;
    renderMovies();
}, 400));


// ====================== BÀI 3: CỬA SỔ MODAL ======================
function openModal(movie) {
    modalBody.innerHTML = `
        <div>
            <img src="${movie.poster}" alt="${movie.title}">
        </div>
        <div>
            <h2>${movie.title} (${movie.year})</h2>
            <p><strong>Thể loại:</strong> ${movie.genres.join(', ')}</p>
            <p><strong>Đạo diễn:</strong> ${movie.director}</p>
            <p><strong>Diễn viên:</strong> ${movie.actors}</p>
            <br>
            <p><strong>Nội dung:</strong> ${movie.description}</p>
        </div>
    `;
    modal.style.display = 'flex';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Đóng modal khi click ra ngoài
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Chạy hàm khởi tạo khi load trang
init();