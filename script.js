document.addEventListener('DOMContentLoaded', () => {
    // Accordion functionality (applied to all accordion items)
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordionItem = header.parentElement;
            const accordionContent = header.nextElementSibling;

            // Close all other open accordions except if it's within the same parent accordion group
            accordionHeaders.forEach(otherHeader => {
                const otherAccordionItem = otherHeader.parentElement;
                const otherAccordionContent = otherHeader.nextElementSibling;
                // Check if they share the same direct parent (e.g., .accordion) to avoid closing unrelated accordions
                if (otherAccordionItem !== accordionItem && otherHeader.closest('.accordion') === header.closest('.accordion') && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    otherAccordionContent.style.maxHeight = 0;
                }
            });

            // Toggle current accordion
            header.classList.toggle('active');
            if (header.classList.contains('active')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = 0;
            }
        });
    });

    // Flip Card functionality
    const flipButtonFront = document.querySelector('.flip-card-front .flip-button');
    const flipButtonBack = document.querySelector('.flip-card-back .flip-button');
    const flipCard = document.querySelector('.flip-card');

    if (flipButtonFront) {
        flipButtonFront.addEventListener('click', () => {
            flipCard.classList.add('flipped');
        });
    }

    if (flipButtonBack) {
        flipButtonBack.addEventListener('click', () => {
            flipCard.classList.remove('flipped');
        });
    }

    // Quiz functionality (applies to both multiple choice and true/false)
    const quizContainers = document.querySelectorAll('.question-block');
    quizContainers.forEach(container => {
        const options = container.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const feedback = container.querySelector('.feedback');
                
                // Reset previous selections and feedback for THIS question
                options.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                    opt.disabled = true; // Disable all options for this question once an answer is chosen
                });
                feedback.textContent = '';

                // Apply feedback for current selection
                if (option.dataset.correct === 'true') {
                    option.classList.add('correct');
                    feedback.textContent = 'Σωστό! Μπράβο!';
                } else {
                    option.classList.add('incorrect');
                    feedback.textContent = 'Λάθος απάντηση.';
                    // Find and highlight the correct answer if incorrect
                    options.forEach(opt => {
                        if (opt.dataset.correct === 'true') {
                            opt.classList.add('correct'); // Highlight correct answer
                        }
                    });
                }
            });
        });
    });

    // Simple Modal for Map Markers, Timeline Events, and Info Buttons
    // Create modal dynamically or add to HTML
    let modal = document.getElementById("infoModal");
    let modalContent = document.getElementById("modalText");
    let closeBtn = document.getElementsByClassName("close-button")[0];

    if (!modal) { // If modal doesn't exist, create it
        modal = document.createElement('div');
        modal.id = 'infoModal';
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p id="modalText"></p>
            </div>
        `;
        document.body.appendChild(modal);
        modalContent = modal.querySelector('#modalText');
        closeBtn = modal.querySelector('.close-button');
    }

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = "none";
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Map Marker functionality
    const mapMarkers = document.querySelectorAll('.map-marker');
    mapMarkers.forEach(marker => {
        marker.addEventListener('click', () => {
            const info = marker.dataset.info;
            modalContent.textContent = info;
            modal.style.display = "block";
        });
    });

    // Timeline Event functionality
    const timelineEvents = document.querySelectorAll('.timeline-event');
    timelineEvents.forEach(event => {
        event.addEventListener('click', () => {
            const info = event.dataset.info;
            modalContent.textContent = info;
            modal.style.display = "block";
        });
    });

    // Info Button (i icon) functionality
    const infoButtons = document.querySelectorAll('.info-button');
    infoButtons.forEach(button => {
        button.addEventListener('click', (event) => { // Added event parameter
            const info = button.dataset.info;
            modalContent.textContent = info;
            modal.style.display = "block";
            event.stopPropagation(); // Prevent modal from closing immediately if button is inside another click handler
        });
    });

    // New: Analysis Button functionality
    const analysisButton = document.querySelector('.analysis-button');
    if (analysisButton) {
        analysisButton.addEventListener('click', () => {
            const info = analysisButton.dataset.info;
            modalContent.innerHTML = info; // Use innerHTML to allow HTML tags like <ul> in data-info
            modal.style.display = "block";
        });
    }

    // PDF Save functionality (using window.print())
    const savePdfButton = document.getElementById('savePdfButton');
    if (savePdfButton) {
        savePdfButton.addEventListener('click', () => {
            // Before printing, ensure the summary accordion is open
            const summaryAccordionHeader = document.querySelector('#summary-section .accordion-header');
            const summaryAccordionContent = document.querySelector('#summary-section .accordion-content');
            
            let wasCollapsed = false;
            if (summaryAccordionHeader && !summaryAccordionHeader.classList.contains('active')) {
                summaryAccordionHeader.click(); // Programmatically click to expand if not already
                wasCollapsed = true;
            }

            alert('Θα εμφανιστεί το παράθυρο εκτύπωσης του browser σας. Παρακαλώ επιλέξτε "Αποθήκευση ως PDF" ή "Print to PDF" για να αποθηκεύσετε την περίληψη.');
            
            // A small delay to ensure CSS changes (accordion expansion) are applied before print
            setTimeout(() => {
                window.print();
                // If it was collapsed, collapse it back after a short delay
                if (wasCollapsed) {
                    setTimeout(() => {
                        summaryAccordionHeader.click();
                    }, 500); // Give browser time to close print dialog
                }
            }, 100); 
        });
    }
});