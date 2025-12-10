document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('video-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const filterSelect = document.getElementById('filter-select');
    const sortSelect = document.getElementById('sort-select');

    // Live Data URL (Google Apps Script)
    const LIVE_DATA_URL = 'https://script.googleusercontent.com/a/macros/sett.ai/echo?user_content_key=AehSKLi9smCHUL_fn0_MmDWeSdPimzu6Bk8tiKwKTV_5CmrLVOILZUKnlNjelllNOUdyQYS5y3KacXmLY7R5eS-CWPz8RXP_ULY5agyNlooltX0J1Lcpc-noIP5UyYkf_xakLvq3TNskEBlYd_uFwXaEZ_n4YAJ3Qn41kl-uyZ0SnF9TN_HDo6sI_Hc-N4o2ddHNIP4mRnQxxaroaxeIZyT6RbqkF_TaaK6gOptuRGZ0xjRHGE6kRkfLmBzRS3eHX4SKnL6vRrjrU1opzZ092ZQkqKl874ltsG4jma3k8KBRpdxjTsctCoc&lib=MHs0efkla0CHf1su8vv2t8_LSJHYMIpDM';

    // Global Data Variables
    let allData = (typeof hooksData !== 'undefined') ? hooksData : [];
    let currentData = [...allData];

    // Initialize with fallback
    initApp(allData);

    // Fetch Live Data
    fetchLiveData();

    async function fetchLiveData() {
        try {
            const response = await fetch(LIVE_DATA_URL);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            console.log("Live data loaded!", data);

            // Update Global Data
            allData = data;

            // Re-initialize app with new data
            initApp(allData);

        } catch (error) {
            console.error("Failed to load live data, using fallback.", error);
        }
    }

    function initApp(data) {
        currentData = [...data]; // Reset currentData to new full dataset
        renderGallery(currentData);
        populateFilter(data);
    }

    // Filter Logic
    filterSelect.addEventListener('change', (e) => {
        applyFilterAndSort();
    });

    // Sort Logic
    sortSelect.addEventListener('change', (e) => {
        applyFilterAndSort();
    });

    function applyFilterAndSort() {
        const filterValue = filterSelect.value;
        const sortValue = sortSelect.value;

        // 1. Filter
        let filtered = (filterValue === 'all')
            ? [...allData]
            : allData.filter(item => item.hook_type === filterValue);

        // 2. Sort
        if (sortValue === 'az') {
            filtered.sort((a, b) => a.hook_text.localeCompare(b.hook_text));
        }

        currentData = filtered;
        renderGallery(currentData);
    }


    // Render Gallery
    function renderGallery(data) {
        galleryContainer.innerHTML = '';
        data.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-index', index);

            const fallbackVideo = 'https://ilans.org/sett_videos/anna1.mp4';
            const videoSrc = item.video ? item.video : fallbackVideo;

            card.innerHTML = `
                <div class="card-image-wrapper">
                    <video 
                        src="${videoSrc}" 
                        class="card-thumbnail video-thumbnail" 
                        muted 
                        loop 
                        playsinline 
                        preload="metadata"
                        onmouseover="this.play()" 
                        onmouseout="this.pause()">
                    </video>
                    <div class="play-overlay">
                        <div class="play-btn">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <span class="badge">${item.hook_type}</span>
                    <div class="hook-main">
                        <h3 class="hook-title">${item.hook_text}</h3>
                        ${item.hook_why ? `<p class="hook-why">${item.hook_why}</p>` : ''}
                    </div>
                    <!-- Stats removed as per user request -->
                </div>
            `;

            card.addEventListener('click', () => openModal(item));
            galleryContainer.appendChild(card);
        });
    }

    // Modal Logic
    function openModal(item) {
        const modalVideo = modal.querySelector('video');
        const modalTitle = modal.querySelector('.modal-info-h2');
        const originalText = document.getElementById('modal-original-text');
        const rewrittenText = document.getElementById('modal-rewritten-text');
        const statsContainer = document.getElementById('modal-stats');

        const fallbackVideo = 'https://ilans.org/sett_videos/anna1.mp4';
        modalVideo.src = item.video ? item.video : fallbackVideo;
        modalTitle.textContent = item.hook_type;

        // Repurposing fields for Modal:
        // Original Hook -> Idea
        // Rewritten Post -> Why
        originalText.textContent = item.hook_text;

        // If we want to show "Why", we can put it in the second slot or hide the second slot?
        // Let's use rewrittenText for "Why"
        rewrittenText.textContent = item.hook_why;

        // Clear stats in modal since we removed them
        statsContainer.innerHTML = '';
        if (item.link_reference) {
            // Split by space, comma, or newline to handle multiple links
            const links = item.link_reference.split(/[\s,]+/).filter(link => link.length > 5);

            links.forEach((link, index) => {
                const btn = document.createElement('a');
                btn.href = link;
                btn.target = '_blank';
                btn.className = 'reference-link';
                btn.style.marginBottom = '5px';
                btn.style.marginRight = '8px';
                btn.innerHTML = `Reference ${links.length > 1 ? index + 1 : ''} <i class="fas fa-external-link-alt"></i>`;
                statsContainer.appendChild(btn);
            });
        }

        modal.classList.add('active');
        modalVideo.play();
    }

    function closeModal() {
        const modalVideo = modal.querySelector('video');
        modal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = ''; // Stop buffering
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Helper: Format Numbers nicely (Unused but kept if needed later)
    function formatNumber(num) {
        if (!num) return '0';
        return num.toLocaleString();
    }

    // Filter Logic Helper
    function populateFilter(data) {
        const types = [...new Set(data.map(item => item.hook_type))];
        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.textContent = type;
            filterSelect.appendChild(option);
        });
    }
});
