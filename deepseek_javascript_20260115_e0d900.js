// بيانات الإذاعات
const radioStations = [
    {
        id: 1,
        name: "إذاعة القرآن الكريم مصر",
        description: "أقدم إذاعة قرآنية في العالم، تبث على مدار 24 ساعة.",
        frequency: "FM 98.8",
        streamUrl: "https://stream1.mc.mashhad.ir/radio/emamzadehasghar",
        icon: "fas fa-mosque",
        color: "#1a5f7a"
    },
    {
        id: 2,
        name: "إذاعة نداء الإسلام",
        description: "تلاوات متنوعة وبرامج إسلامية هادفة من السعودية.",
        frequency: "FM 92.6",
        streamUrl: "https://stream1.mc.mashhad.ir/radio/emamzadehasghar",
        icon: "fas fa-kaaba",
        color: "#2b6cb0"
    },
    {
        id: 3,
        name: "إذاعة القرآن الكريم السعودية",
        description: "البث المباشر من المملكة العربية السعودية.",
        frequency: "FM 100.5",
        streamUrl: "https://stream1.mc.mashhad.ir/radio/emamzadehasghar",
        icon: "fas fa-star-and-crescent",
        color: "#2d3748"
    },
    {
        id: 4,
        name: "راديو القرآن الكريم",
        description: "تلاوات خاشعة وبرامج تعليمية من الأردن.",
        frequency: "FM 101.3",
        streamUrl: "https://stream1.mc.mashhad.ir/radio/emamzadehasghar",
        icon: "fas fa-microphone-alt",
        color: "#38b2ac"
    },
    {
        id: 5,
        name: "إذاعة الزيتونة",
        description: "قراءات متنوعة من تونس والبلدان المغاربية.",
        frequency: "FM 94.2",
        streamUrl: "https://stream1.mc.mashhad.ir/radio/emamzadehasghar",
        icon: "fas fa-tree",
        color: "#57cc99"
    },
    {
        id: 6,
        name: "راديو النور",
        description: "القرآن الكريم مع تفسير مبسط وفتاوى.",
        frequency: "FM 96.7",
        streamUrl: "https://stream1.mc.mashhad.ir/radio/emamzadehasghar",
        icon: "fas fa-sun",
        color: "#f6ad55"
    }
];

// بيانات القراء
const readers = [
    { id: 1, name: "الشيخ محمد رفعت", country: "مصر", icon: "fas fa-user" },
    { id: 2, name: "الشيخ عبد الباسط عبد الصمد", country: "مصر", icon: "fas fa-user" },
    { id: 3, name: "الشيخ محمد صديق المنشاوي", country: "مصر", icon: "fas fa-user" },
    { id: 4, name: "الشيخ محمود خليل الحصري", country: "مصر", icon: "fas fa-user" },
    { id: 5, name: "الشيخ سعود الشريم", country: "السعودية", icon: "fas fa-user" },
    { id: 6, name: "الشيخ مشاري العفاسي", country: "الكويت", icon: "fas fa-user" },
    { id: 7, name: "الشيخ ياسر الدوسري", country: "السعودية", icon: "fas fa-user" },
    { id: 8, name: "الشيخ أحمد العجمي", country: "السعودية", icon: "fas fa-user" },
    { id: 9, name: "الشيخ عبد الرحمن السديس", country: "السعودية", icon: "fas fa-user" },
    { id: 10, name: "الشيخ ماهر المعيقلي", country: "السعودية", icon: "fas fa-user" },
    { id: 11, name: "الشيخ ناصر القطامي", country: "السعودية", icon: "fas fa-user" },
    { id: 12, name: "الشيخ أبو بكر الشاطري", country: "السعودية", icon: "fas fa-user" }
];

// متغيرات التحكم
let currentAudio = null;
let currentStationIndex = 0;
let isPlaying = false;
let volume = 0.8;

// عناصر DOM
const controlBar = document.getElementById('radio-control-bar');
const playPauseBtn = document.getElementById('play-pause-btn');
const stopBtn = document.getElementById('stop-btn');
const volumeBtn = document.getElementById('volume-btn');
const volumeSlider = document.getElementById('volume-slider');
const prevStationBtn = document.getElementById('prev-station');
const nextStationBtn = document.getElementById('next-station');
const currentStationName = document.getElementById('current-station-name');
const nowPlaying = document.getElementById('now-playing');
const currentReader = document.getElementById('current-reader');
const stationsContainer = document.getElementById('stations-container');
const readersContainer = document.getElementById('readers-container');
const themeToggle = document.getElementById('theme-toggle');
const alertModal = document.getElementById('alert-modal');
const alertMessage = document.getElementById('alert-message');
const closeAlert = document.getElementById('close-alert');

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', function() {
    renderStations();
    renderReaders();
    setupEventListeners();
    loadTheme();
    updateControlBar();
});

// عرض الإذاعات
function renderStations() {
    stationsContainer.innerHTML = '';
    radioStations.forEach(station => {
        const stationCard = document.createElement('div');
        stationCard.className = 'station-card';
        stationCard.innerHTML = `
            <div class="station-img" style="background: linear-gradient(135deg, ${station.color}, ${station.color}99);">
                <i class="${station.icon}"></i>
            </div>
            <div class="station-content">
                <h3 class="station-name">${station.name}</h3>
                <p class="station-desc">${station.description}</p>
                <div class="station-meta">
                    <span><i class="fas fa-wifi"></i> ${station.frequency}</span>
                </div>
                <button class="play-btn" data-id="${station.id}">
                    <i class="fas fa-play"></i> تشغيل الإذاعة
                </button>
            </div>
        `;
        stationsContainer.appendChild(stationCard);
    });
    
    // إضافة حدث النقر لأزرار التشغيل
    document.querySelectorAll('.play-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const stationId = parseInt(this.getAttribute('data-id'));
            playStation(stationId - 1);
        });
    });
}

// عرض القراء
function renderReaders() {
    readersContainer.innerHTML = '';
    readers.forEach(reader => {
        const readerCard = document.createElement('div');
        readerCard.className = 'reader-card';
        readerCard.innerHTML = `
            <div class="reader-avatar" style="background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));">
                <i class="${reader.icon}"></i>
            </div>
            <h3 class="reader-name">${reader.name}</h3>
            <p class="reader-country">${reader.country}</p>
        `;
        readerCard.addEventListener('click', function() {
            showAlert(`تم اختيار قارئ: ${reader.name}`);
        });
        readersContainer.appendChild(readerCard);
    });
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    // تشغيل/إيقاف
    playPauseBtn.addEventListener('click', togglePlayPause);
    
    // إيقاف الكل
    stopBtn.addEventListener('click', stopAll);
    
    // التحكم في الصوت
    volumeSlider.addEventListener('input', function() {
        volume = this.value / 100;
        if (currentAudio) {
            currentAudio.volume = volume;
        }
        updateVolumeIcon();
    });
    
    volumeBtn.addEventListener('click', toggleMute);
    
    // تبديل الإذاعات
    prevStationBtn.addEventListener('click', playPrevStation);
    nextStationBtn.addEventListener('click', playNextStation);
    
    // تبديل الثيم
    themeToggle.addEventListener('click', toggleTheme);
    
    // إغلاق التنبيه
    closeAlert.addEventListener('click', function() {
        alertModal.classList.remove('active');
    });
    
    // جعل شريط التحكم يطفو مع التمرير
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            controlBar.style.bottom = '20px';
            controlBar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
        } else {
            controlBar.style.bottom = '20px';
            controlBar.style.boxShadow = 'var(--shadow)';
        }
    });
}

// تشغيل إذاعة محددة
function playStation(index) {
    // إيقاف الصوت الحالي إذا كان مشغلاً
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    currentStationIndex = index;
    const station = radioStations[index];
    
    // إنشاء عنصر الصوت الجديد
    currentAudio = new Audio(station.streamUrl);
    currentAudio.volume = volume;
    currentAudio.play();
    
    // تحديث حالة التشغيل
    isPlaying = true;
    updateControlBar();
    
    // تحديث المعلومات
    currentStationName.textContent = station.name;
    nowPlaying.textContent = 'جاري التشغيل الآن';
    currentReader.textContent = 'تلاوات متنوعة';
    
    // إظهار تنبيه
    showAlert(`جاري تشغيل إذاعة: ${station.name}`);
    
    // تحديث أيقونة التشغيل
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// تبديل التشغيل/الإيقاف المؤقت
function togglePlayPause() {
    if (!currentAudio) {
        // إذا لم يكن هناك صوت، تشغيل أول إذاعة
        playStation(0);
        return;
    }
    
    if (isPlaying) {
        currentAudio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        nowPlaying.textContent = 'متوقف مؤقتاً';
    } else {
        currentAudio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        nowPlaying.textContent = 'جاري التشغيل الآن';
    }
    
    isPlaying = !isPlaying;
}

// إيقاف كل شيء
function stopAll() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
    }
    
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    nowPlaying.textContent = 'غير مشغل حالياً';
    currentStationName.textContent = 'اختر إذاعة';
    currentReader.textContent = '---';
    
    showAlert('تم إيقاف جميع الإذاعات');
}

// تشغيل الإذاعة السابقة
function playPrevStation() {
    currentStationIndex--;
    if (currentStationIndex < 0) {
        currentStationIndex = radioStations.length - 1;
    }
    playStation(currentStationIndex);
}

// تشغيل الإذاعة التالية
function playNextStation() {
    currentStationIndex++;
    if (currentStationIndex >= radioStations.length) {
        currentStationIndex = 0;
    }
    playStation(currentStationIndex);
}

// تبديل كتم الصوت
function toggleMute() {
    if (!currentAudio) return;
    
    if (currentAudio.volume > 0) {
        currentAudio.volume = 0;
        volumeSlider.value = 0;
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else {
        currentAudio.volume = volume;
        volumeSlider.value = volume * 100;
        updateVolumeIcon();
    }
}

// تحديث أيقونة الصوت
function updateVolumeIcon() {
    if (volume == 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volume < 0.5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    }
}

// تحديث شريط التحكم
function updateControlBar() {
    updateVolumeIcon();
}

// تبديل الثيم (فاتح/غامق)
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme',