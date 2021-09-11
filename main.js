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

const songs = [
    {
        name: 'Running In The Sky',
        singer: 'HNYY',
        path: './assest/music/song1.mp3',
        image: './assest/img/song1.png'
    },
    {
        name: 'Qua Ta',
        singer: 'Hades & BlackT',
        path: './assest/music/song2.mp3',
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
];