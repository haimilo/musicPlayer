/*
Xây dựng chức năng cần làm
 * Render Song
 * Scroll top
 * Play/ Pause/ Seek
 * CD Rotate
 * Next/ Previous
 * Random
 * Next/ Repeat when ended
 * Active song
 * Scroll active song into view
 * Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Get ra các biến cần dùng
const playList = $('.playlist');
const cd = $('.cd');
const heading = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playBtn = $('.btn-toggle-play');
const player = $('.player');
const progress = $('#progress');
const nextBtn = $('.btn-next');
const prevBtn = $('.btn-prev');
const randomBtn = $('.btn-random');
const repeatBtn = $('.btn-repeat');
// const activedSong = $('.song .active');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [
        {
            name: 'Running In The Sky',
            singer: 'HNYY',
            path: './assest/music/song1.mp3',
            image: './assest/img/song1.png'
        },
        {
            name: 'Qua Ta',
            singer: 'Hades & BlackT',
            path: 'https://data25.chiasenhac.com/download2/2207/1/2206490-67cccb4c/128/Buoc%20Qua%20Nhau%20-%20Vu.mp3',
            image: './assest/img/song2.png'
        },
        {
            name: 'Lý Trí Quỷ',
            singer: 'BlackBi',
            path: './assest/music/song3.mp3',
            image: './assest/img/song3.png'
        },
        {
            name: 'Đây là RAP Việt',
            singer: 'Wowy, Karik, Suboi, Binz, Rhymastic & JustaTee',
            path: './assest/music/song4.mp3',
            image: './assest/img/song4.png'
        },
        {
            name: 'Tâm Ma',
            singer: 'BlackBi, Vô Đình Hiếu & ELBI',
            path: './assest/music/song5.mp3',
            image: './assest/img/song5.png'
        },
        {
            name: 'Để anh một mình',
            singer: 'Ngô Kiến Huy & BlackBi',
            path: './assest/music/song6.mp3',
            image: './assest/img/song6.png'
        },
        {
            name: 'Thủ đô Cypher',
            singer: 'RPT',
            path: './assest/music/song7.mp3',
            image: './assest/img/song7.png'
        },
        {
            name: 'Cha',
            singer: 'MTV, Karik, Võ Trọng Phúc, Ngô Duy Khiêm, Nguyễn Quân & The Zoo',
            path: './assest/music/song8.mp3',
            image: './assest/img/song8.png'
        },
        {
            name: 'Nhật ký của mẹ',
            singer: 'Hiền Thục',
            path: './assest/music/song9.mp3',
            image: './assest/img/song9.png'
        },
        {
            name: 'Người cha câm',
            singer: 'Hydra',
            path: './assest/music/song10.mp3',
            image: './assest/img/song10.png'
        }
    ],
    // Xử lý Render Song sang HTML
    render: function () {
        // Lặp qua mảng songs để lấy thông tin với map
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        });
        // Sau đó thực hiện innerHTML ra
        playList.innerHTML = htmls.join('');
    },
    // Xử lý các thuộc tính cho object
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    // Xử lý sự kiện
    handleEvents: function () {
        const cdWidth = cd.offsetWidth;
        const _this = this;

        // Xử lý quay cd Thumb
        const cdThumbAnimate = cdThumb.animate([
            {
                transform: 'rotate(360deg)'
            }
        ], {
            duration: 10000, //10seconds
            iterations: Infinity //Lặp lại vô hạn
        })
        cdThumbAnimate.pause();

        // Xử lý phóng to/ thu nhỏ cdThumb
        document.onscroll = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            // console.log(newCdWidth);
            if (newCdWidth > 0) {
                cd.style.width = newCdWidth + 'px';
            } else if (newCdWidth < 0) {
                cd.style.width = 0;
            }
            // cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Xử lý khi click Play/ Pause
        playBtn.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        }

        // Khi bài hát được play
        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play();
        }

        // Khi bài hát bị pause
        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause();
        }

        // Khi tiến độ bài hát được thay đổi
        audio.ontimeupdate = function () {
            // Giá trị thời gian hiện tại
            // console.log(Math.floor(audio.currentTime));
            // Tổng giá trị thời gian bài hát
            // console.log(Math.floor(audio.duration));
            // % hoàn thành bài hát
            // console.log(audio.currentTime / audio.duration * 100);

            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent;
            }
        }

        // Xử lý khi tua song
        progress.onchange = function () {
            // % bài hát khi tua
            const seekTime = progress.value * audio.duration / 100;
            audio.currentTime = seekTime;
        }

        // Lắng nghe nút nextBtn
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Lắng nghe nút prevBtn
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.scrollToActiveSong();
        }

        // Lắng nghe bật/ tắt nút randomBtn
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle('active', _this.isRandom);
        }

        // Lắng nghe bật/ tắt nút repeatBtn
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle('active', _this.isRepeat);
        }

        // Xử lý nextSong khi audio kết thúc & repeat nếu đang bật repeat
        audio.onended = function () {
            if (_this.isRepeat) {
                // Thực hiện repeat lại bài hát đó
                audio.play();
            } else {
                _this.nextSong();
                audio.play();
            }
        }

        // Lắng nghe sự kiện click vào playlist
        playList.onclick = function (e) {
            /*
                e.target.closest(): Trả về element chính nó hoặc cha của nó
                Nếu k tìm ra element thì trả về null
             */
            const songNode = e.target.closest('.song:not(.active)');
            // console.log(e.target.closest('.song'));
            if (songNode || e.target.closest('option')) {
                // console.log(e.target);
                // Xử lý khi click song
                if (songNode) {
                    console.log(songNode.getAttribute('data-index'))
                    // tương tự với
                    // console.log(songNode.dataset.index)
                    _this.currentIndex = Number(songNode.getAttribute('data-index'));
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
                // Xử lý khi click song option
                if (e.target.closest('option')) {
                    // Bổ sung thêm vài tính năng khác
                }
            }
        }
    },
    // loadcurrentSong
    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
        audio.src = this.currentSong.path;
        // console.log(this.currentSong);
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        };
        this.loadCurrentSong();
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        };
        this.loadCurrentSong();
    },
    randomSong: function () {
        var newIndex
        do {
            // const newIndex = Math.floor(Math.random() * this.songs.length);
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            // Học qua gg scrollIntoView
            $('.song.active').scrollIntoView({
                behavier: 'smooth',
                block: 'center'
            });
        }, 100);
    },
    // removeActiveNextSong: function () {
    //     this.currentIndex--;
    //     if (this.currentIndex < 0) {
    //         this.currentIndex = this.songs.length - 1;
    //     };
    //     activedSong.classList.remove('active');
    // },
    // addActiveNextSong: function () {
    //     this.currentIndex++;
    //     if (this.currentIndex >= this.songs.length) {
    //         this.currentIndex = 0;
    //     };
    //     this.activeNewSong.classList.add('active');
    // },
    // Phương thức start
    start: function () {
        // Định nghĩa các thuộc tính cho object
        this.defineProperties();

        // Lắng nghe xử lý các sự kiện tương tác người dùng DOM Events
        this.handleEvents();

        // Load bài hát hiện tại vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render danh sách song
        this.render();
    }
}

app.start();