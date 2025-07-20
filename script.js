document.addEventListener('DOMContentLoaded', () => {

    // --- Ρύθμιση Modal (Κεντρική και ανθεκτική) ---
    let infoModal = document.getElementById("infoModal");
    let modalText = document.getElementById("modalText");
    let closeModalButton;

    // Ελέγχουμε αν το modal υπάρχει ήδη στο HTML, αλλιώς το δημιουργούμε δυναμικά
    if (!infoModal) {
        infoModal = document.createElement('div');
        infoModal.id = 'infoModal';
        infoModal.classList.add('modal');
        infoModal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p id="modalText"></p>
            </div>
        `;
        document.body.appendChild(infoModal);
        modalText = infoModal.querySelector('#modalText'); // Βρίσκουμε το modalText αφού δημιουργηθεί το modal
    }
    // Τώρα που το modal σίγουρα υπάρχει, βρίσκουμε το κουμπί κλεισίματος
    closeModalButton = infoModal.querySelector('.close-button');

    // Προσθέτουμε τον event listener για το κουμπί κλεισίματος
    if (closeModalButton) {
        closeModalButton.onclick = function() {
            infoModal.style.display = "none";
        };
    }

    // Κλείσιμο modal όταν γίνεται κλικ έξω από το περιεχόμενο του
    infoModal.addEventListener('click', (event) => {
        if (event.target === infoModal) {
            infoModal.style.display = "none";
        }
    });

    // --- Βοηθητική συνάρτηση για άνοιγμα του modal ---
    function openInfoModal(content, isHtml = false) {
        if (isHtml) {
            modalText.innerHTML = content;
        } else {
            modalText.textContent = content;
        }
        infoModal.style.display = "block";
    }

    // --- Λειτουργία Collapsible / Accordion ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const accordionContent = header.nextElementSibling;
            const accordionItem = header.parentElement;

            // Κλείσιμο άλλων ανοιχτών accordions στην ίδια ομάδα
            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                const otherAccordionItem = otherHeader.parentElement;
                const otherAccordionContent = otherHeader.nextElementSibling;
                // Ελέγχουμε αν είναι διαφορετικό item ΚΑΙ στην ίδια ομάδα accordion (αν υπάρχει)
                if (otherAccordionItem !== accordionItem && otherHeader.classList.contains('active') && otherHeader.closest('.accordion') === header.closest('.accordion')) {
                    otherHeader.classList.remove('active');
                    otherAccordionContent.style.maxHeight = 0;
                }
            });

            // Εναλλαγή (άνοιγμα/κλείσιμο) του τρέχοντος accordion
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }
        });
    });

    // --- Λειτουργία Flip Card ---
    const flipCard = document.querySelector('.flip-card');
    if (flipCard) { // Ελέγχουμε αν υπάρχει η flip card
        flipCard.querySelectorAll('.flip-button').forEach(button => {
            button.addEventListener('click', () => {
                flipCard.classList.toggle('flipped');
            });
        });
    }

    // --- Λειτουργία Quiz ---
    document.querySelectorAll('.question-block').forEach(container => {
        const options = container.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const feedback = container.querySelector('.feedback');
                
                // Απενεργοποιούμε όλες τις επιλογές μόλις επιλεγεί μία
                options.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                    opt.disabled = true; 
                });
                feedback.textContent = ''; // Καθαρίζουμε προηγούμενο feedback

                // Εφαρμόζουμε το feedback για την τρέχουσα επιλογή
                if (option.dataset.correct === 'true') {
                    option.classList.add('correct');
                    feedback.textContent = 'Σωστό! Μπράβο!';
                } else {
                    option.classList.add('incorrect');
                    feedback.textContent = 'Λάθος απάντηση.';
                    // Εμφανίζουμε τη σωστή απάντηση αν ήταν λάθος
                    const correctAnswer = container.querySelector('[data-correct="true"]');
                    if (correctAnswer) {
                        correctAnswer.classList.add('correct'); 
                    }
                }
            });
        });
    });

    // --- Λειτουργία Map Markers ---
    document.querySelectorAll('.map-marker').forEach(marker => {
        marker.addEventListener('click', () => {
            openInfoModal(marker.dataset.info);
        });
    });

    // --- Λειτουργία Timeline Events ---
    document.querySelectorAll('.timeline-event').forEach(event => {
        event.addEventListener('click', () => {
            openInfoModal(event.dataset.info);
        });
    });

    // --- Λειτουργία Info Button (το μικρό i) ---
    document.querySelectorAll('.info-button').forEach(button => {
        button.addEventListener('click', (event) => { 
            event.stopPropagation(); // Σταματάμε το event να επεκταθεί σε γονείς
            openInfoModal(button.dataset.info);
        });
    });

    // --- Λειτουργία Analysis Button ---
    const analysisButton = document.querySelector('.analysis-button');
    if (analysisButton) {
        analysisButton.addEventListener('click', () => {
            openInfoModal(analysisButton.dataset.info, true); // Το true δηλώνει ότι το περιεχόμενο είναι HTML
        });
    }

    // Η λειτουργία εκτύπωσης έχει αφαιρεθεί, όπως ζητήθηκε.
});