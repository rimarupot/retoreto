// Initialize the highest z-index so clicked windows always come to the front
let highestZIndex = 1;

// Select all elements with the 'drag-window' class
const windows = document.querySelectorAll('.drag-window');

windows.forEach(win => {
    // We only want to drag when clicking the designated handle (title bar or container)
    const handle = win.querySelector('.drag-handle');
    
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    // Bring window to front when clicked anywhere on it
    win.addEventListener('mousedown', bringToFront);
    win.addEventListener('touchstart', bringToFront, {passive: true});

    function bringToFront() {
        highestZIndex++;
        win.style.zIndex = highestZIndex;
    }

    // --- MOUSE EVENTS ---
    handle.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialLeft = win.offsetLeft;
        initialTop = win.offsetTop;
        // Prevent text selection while dragging
        e.preventDefault(); 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        
        win.style.left = `${initialLeft + dx}px`;
        win.style.top = `${initialTop + dy}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // --- TOUCH EVENTS (For Mobile) ---
    handle.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        initialLeft = win.offsetLeft;
        initialTop = win.offsetTop;
    }, {passive: true});

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        const dx = touch.clientX - startX;
        const dy = touch.clientY - startY;
        
        win.style.left = `${initialLeft + dx}px`;
        win.style.top = `${initialTop + dy}px`;
    }, {passive: true});

    document.addEventListener('touchend', () => {
        isDragging = false;
    });
});
