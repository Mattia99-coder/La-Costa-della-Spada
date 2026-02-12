document.querySelectorAll('.book-title').forEach(title => {
    title.addEventListener('click', function() {
        this.parentElement.classList.toggle('open');
    });
});

document.querySelectorAll('.chapter-title').forEach(title => {
    title.addEventListener('click', function() {
        const content = this.nextElementSibling;
        if (content && content.classList.contains('chapter-content')) {
            content.classList.toggle('open');
            // Quando aperto, l'ultimo chapter-title deve avere il bordo inferiore
            const allTitles = this.parentElement.querySelectorAll('.chapter-title');
            const lastTitle = allTitles[allTitles.length - 1];
            if (this === lastTitle && content.classList.contains('open')) {
                this.style.borderBottom = '#000 1px solid';
            } else if (this === lastTitle && !content.classList.contains('open')) {
                this.style.borderBottom = 'none';
            }
        }
    });
});

document.querySelectorAll('.chapter-content').forEach(title => {
    title.addEventListener('click', function() {
        this.parentElement.classList.toggle('open');
    });
});

// Rimuovi il bordo dall'ultimo chapter-title
document.querySelectorAll('.chapters').forEach(chapters => {
    const chapterTitles = chapters.querySelectorAll('.chapter-title');
    if (chapterTitles.length > 0) {
        chapterTitles[chapterTitles.length - 1].style.borderBottom = 'none';
    }
});

// Gestione menu laterale
const menuIcon = document.getElementById('menuIcon');
const sideMenu = document.getElementById('sideMenu');

menuIcon.addEventListener('click', function() {
    sideMenu.classList.toggle('open');
    menuIcon.classList.toggle('menu-open');
    
    // Cambia l'icona
    if (sideMenu.classList.contains('open')) {
        menuIcon.querySelector('span').innerHTML = '&times;';
    } else {
        menuIcon.querySelector('span').innerHTML = '☰';
    }
});

// Gestione click sugli elementi del menu
document.querySelectorAll('.menu-item').forEach(menuItem => {
    menuItem.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Trova la scheda associata
        const scheda = this.querySelector('.scheda-menu');
        if (!scheda) return;
        
        // Crea l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'scheda-overlay active';
        
        // Clona il contenuto della scheda
        const schedaFullscreen = document.createElement('div');
        schedaFullscreen.className = 'scheda-fullscreen';
        schedaFullscreen.innerHTML = scheda.innerHTML;
        
        // Aggiungi bottone di chiusura
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            overlay.remove();
            sideMenu.classList.remove('dimmed');
        });
        
        schedaFullscreen.appendChild(closeButton);
        overlay.appendChild(schedaFullscreen);
        
        // Chiudi quando si clicca sull'overlay (ma non sulla scheda o sul menu)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
                sideMenu.classList.remove('dimmed');
            }
        });
        
        // Aggiungi al body
        document.body.appendChild(overlay);
        
        // Oscura il menu
        sideMenu.classList.add('dimmed');
    });
});

// Gestione click sui giocatori per mostrare scheda a schermo intero
document.querySelectorAll('.giocatore').forEach(giocatore => {
    giocatore.addEventListener('click', function(e) {
        // Evita che l'hover interferisca
        e.stopPropagation();
        
        // Trova la scheda associata
        const scheda = this.querySelector('.scheda');
        if (!scheda) return;
        
        // Crea l'overlay
        const overlay = document.createElement('div');
        overlay.className = 'scheda-overlay active';
        
        // Clona il contenuto della scheda
        const schedaFullscreen = document.createElement('div');
        schedaFullscreen.className = 'scheda-fullscreen';
        schedaFullscreen.innerHTML = scheda.innerHTML;
        
        // Trova il model-viewer clonato e forza il caricamento
        const modelViewer = schedaFullscreen.querySelector('model-viewer');
        if (modelViewer) {
            // Forza il reload del modello
            const src = modelViewer.getAttribute('src');
            modelViewer.setAttribute('src', '');
            setTimeout(() => {
                modelViewer.setAttribute('src', src);
            }, 10);
        }
        
        // Aggiungi bottone di chiusura
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', function() {
            overlay.remove();
        });
        
        schedaFullscreen.appendChild(closeButton);
        overlay.appendChild(schedaFullscreen);
        
        // Chiudi quando si clicca sull'overlay (ma non sulla scheda)
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
        
        // Aggiungi al body
        document.body.appendChild(overlay);
    });
});

