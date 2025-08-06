// Advanced Interactive Features for Independence Day Website

class IndependenceDayWebsite {
    constructor() {
        this.init();
    }

    init() {
        this.setupCountdown();
        this.setupQuiz();
        this.setupVirtualFireworks();
        this.setupPatrioticQuotes();
        this.setupMusicPlayer();
        this.setupGuestbook();
    }

    // Countdown to next Independence Day
    setupCountdown() {
        const countdownContainer = document.createElement('div');
        countdownContainer.className = 'countdown-container';
        countdownContainer.innerHTML = `
            <div class="countdown-section">
                <h3>Next Independence Day Countdown</h3>
                <div class="countdown-display">
                    <div class="countdown-item">
                        <span class="countdown-number" id="days">0</span>
                        <span class="countdown-label">Days</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="hours">0</span>
                        <span class="countdown-label">Hours</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="minutes">0</span>
                        <span class="countdown-label">Minutes</span>
                    </div>
                    <div class="countdown-item">
                        <span class="countdown-number" id="seconds">0</span>
                        <span class="countdown-label">Seconds</span>
                    </div>
                </div>
            </div>
        `;

        // Insert after hero section
        const heroSection = document.querySelector('.hero');
        heroSection.insertAdjacentElement('afterend', countdownContainer);

        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date().getTime();
        const currentYear = new Date().getFullYear();
        let nextIndependenceDay = new Date(currentYear, 7, 15).getTime(); // August 15

        if (now > nextIndependenceDay) {
            nextIndependenceDay = new Date(currentYear + 1, 7, 15).getTime();
        }

        const distance = nextIndependenceDay - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }

    // Interactive Quiz about Independence Day
    setupQuiz() {
        const quizContainer = document.createElement('div');
        quizContainer.className = 'quiz-container section';
        quizContainer.innerHTML = `
            <h2>Test Your Knowledge</h2>
            <div class="quiz-content">
                <div class="quiz-question" id="quiz-question">
                    <h3>When did India gain independence?</h3>
                    <div class="quiz-options">
                        <button class="quiz-option" data-answer="correct">August 15, 1947</button>
                        <button class="quiz-option" data-answer="wrong">August 15, 1948</button>
                        <button class="quiz-option" data-answer="wrong">July 15, 1947</button>
                        <button class="quiz-option" data-answer="wrong">September 15, 1947</button>
                    </div>
                </div>
                <div class="quiz-result" id="quiz-result" style="display: none;">
                    <h3 id="result-text"></h3>
                    <button id="next-question" class="cta-button">Next Question</button>
                </div>
                <div class="quiz-score">
                    Score: <span id="quiz-score">0</span> / <span id="quiz-total">0</span>
                </div>
            </div>
        `;

        // Insert before footer
        const footer = document.querySelector('.footer');
        footer.insertAdjacentElement('beforebegin', quizContainer);

        this.initQuiz();
    }

    initQuiz() {
        this.quizQuestions = [
            {
                question: "When did India gain independence?",
                options: ["August 15, 1947", "August 15, 1948", "July 15, 1947", "September 15, 1947"],
                correct: 0
            },
            {
                question: "Who was the first Prime Minister of India?",
                options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel", "Dr. Rajendra Prasad"],
                correct: 1
            },
            {
                question: "What are the colors of the Indian flag?",
                options: ["Red, White, Blue", "Orange, White, Green", "Yellow, White, Red", "Green, White, Orange"],
                correct: 1
            },
            {
                question: "Where does the Prime Minister hoist the flag on Independence Day?",
                options: ["India Gate", "Red Fort", "Rashtrapati Bhavan", "Parliament House"],
                correct: 1
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.setupQuizEvents();
        this.displayQuestion();
    }

    setupQuizEvents() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quiz-option')) {
                this.handleQuizAnswer(e.target);
            }
            if (e.target.id === 'next-question') {
                this.nextQuestion();
            }
        });
    }

    displayQuestion() {
        const question = this.quizQuestions[this.currentQuestion];
        const questionElement = document.getElementById('quiz-question');
        
        questionElement.innerHTML = `
            <h3>${question.question}</h3>
            <div class="quiz-options">
                ${question.options.map((option, index) => 
                    `<button class="quiz-option" data-index="${index}">${option}</button>`
                ).join('')}
            </div>
        `;

        document.getElementById('quiz-total').textContent = this.quizQuestions.length;
    }

    handleQuizAnswer(button) {
        const selectedIndex = parseInt(button.dataset.index);
        const correct = this.quizQuestions[this.currentQuestion].correct;
        const resultElement = document.getElementById('quiz-result');
        const resultText = document.getElementById('result-text');

        // Disable all options
        document.querySelectorAll('.quiz-option').forEach(opt => opt.disabled = true);

        if (selectedIndex === correct) {
            button.classList.add('correct');
            resultText.textContent = "Correct! Well done!";
            this.score++;
        } else {
            button.classList.add('wrong');
            document.querySelectorAll('.quiz-option')[correct].classList.add('correct');
            resultText.textContent = "Incorrect. The correct answer is highlighted.";
        }

        document.getElementById('quiz-score').textContent = this.score;
        resultElement.style.display = 'block';
    }

    nextQuestion() {
        this.currentQuestion++;
        if (this.currentQuestion < this.quizQuestions.length) {
            document.getElementById('quiz-result').style.display = 'none';
            this.displayQuestion();
        } else {
            this.showFinalScore();
        }
    }

    showFinalScore() {
        const quizContent = document.querySelector('.quiz-content');
        quizContent.innerHTML = `
            <div class="quiz-final">
                <h3>Quiz Complete!</h3>
                <p>Your final score: ${this.score} out of ${this.quizQuestions.length}</p>
                <p>${this.getScoreMessage()}</p>
                <button class="cta-button" onclick="location.reload()">Restart Quiz</button>
            </div>
        `;
    }

    getScoreMessage() {
        const percentage = (this.score / this.quizQuestions.length) * 100;
        if (percentage === 100) return "Perfect! You're a true patriot! 🇮🇳";
        if (percentage >= 75) return "Excellent knowledge of Indian history! 👏";
        if (percentage >= 50) return "Good job! Keep learning about our heritage! 📚";
        return "Keep exploring India's rich history! 🌟";
    }

    // Virtual Fireworks Display
    setupVirtualFireworks() {
        const fireworksButton = document.createElement('button');
        fireworksButton.className = 'fireworks-trigger';
        fireworksButton.textContent = '🎆 Launch Fireworks';
        fireworksButton.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            padding: 1rem 2rem;
            background: linear-gradient(45deg, #ff9933, #138808);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;

        document.body.appendChild(fireworksButton);

        fireworksButton.addEventListener('click', () => this.launchFireworks());
    }

    launchFireworks() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: 9999;
        `;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const fireworks = [];
        const particles = [];

        // Create fireworks
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * canvas.width;
                const y = canvas.height;
                const targetY = Math.random() * canvas.height * 0.5;
                
                fireworks.push({
                    x: x,
                    y: y,
                    targetY: targetY,
                    speed: 5,
                    exploded: false
                });
            }, i * 500);
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update fireworks
            fireworks.forEach((firework, index) => {
                if (!firework.exploded) {
                    firework.y -= firework.speed;
                    
                    // Draw firework trail
                    ctx.fillStyle = '#fff';
                    ctx.fillRect(firework.x, firework.y, 2, 10);

                    if (firework.y <= firework.targetY) {
                        firework.exploded = true;
                        this.createExplosion(firework.x, firework.y, particles);
                    }
                }
            });

            // Update particles
            particles.forEach((particle, index) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vy += 0.1; // gravity
                particle.life--;

                if (particle.life > 0) {
                    ctx.fillStyle = particle.color;
                    ctx.fillRect(particle.x, particle.y, 2, 2);
                } else {
                    particles.splice(index, 1);
                }
            });

            if (particles.length > 0 || fireworks.some(f => !f.exploded)) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(canvas);
            }
        };

        animate();
    }

    createExplosion(x, y, particles) {
        const colors = ['#ff9933', '#ffffff', '#138808', '#ff6b6b', '#4ecdc4', '#45b7d1'];
        
        for (let i = 0; i < 30; i++) {
            const angle = (Math.PI * 2 * i) / 30;
            const speed = Math.random() * 5 + 2;
            
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 60
            });
        }
    }

    // Patriotic Quotes Carousel
    setupPatrioticQuotes() {
        const quotesContainer = document.createElement('div');
        quotesContainer.className = 'quotes-container section';
        quotesContainer.innerHTML = `
            <h2>Inspiring Words</h2>
            <div class="quotes-carousel">
                <div class="quote-slide active">
                    <blockquote>
                        "Freedom is not worth having if it does not include the freedom to make mistakes."
                        <cite>- Mahatma Gandhi</cite>
                    </blockquote>
                </div>
            </div>
            <div class="quote-controls">
                <button class="quote-prev">‹</button>
                <button class="quote-next">›</button>
            </div>
        `;

        // Insert before quiz section
        const quizSection = document.querySelector('.quiz-container');
        quizSection.insertAdjacentElement('beforebegin', quotesContainer);

        this.initQuotesCarousel();
    }

    initQuotesCarousel() {
        this.quotes = [
            {
                text: "Freedom is not worth having if it does not include the freedom to make mistakes.",
                author: "Mahatma Gandhi"
            },
            {
                text: "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom.",
                author: "Jawaharlal Nehru"
            },
            {
                text: "The best way to find yourself is to lose yourself in the service of others.",
                author: "Mahatma Gandhi"
            },
            {
                text: "Unity in diversity is India's strength.",
                author: "Jawaharlal Nehru"
            },
            {
                text: "Freedom is never dear at any price. It is the breath of life. What would a man not pay for living?",
                author: "Mahatma Gandhi"
            }
        ];

        this.currentQuote = 0;
        this.setupQuoteEvents();
        this.startQuoteRotation();
    }

    setupQuoteEvents() {
        document.querySelector('.quote-prev').addEventListener('click', () => {
            this.currentQuote = (this.currentQuote - 1 + this.quotes.length) % this.quotes.length;
            this.updateQuote();
        });

        document.querySelector('.quote-next').addEventListener('click', () => {
            this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
            this.updateQuote();
        });
    }

    updateQuote() {
        const quote = this.quotes[this.currentQuote];
        const slideElement = document.querySelector('.quote-slide');
        
        slideElement.style.opacity = '0';
        
        setTimeout(() => {
            slideElement.innerHTML = `
                <blockquote>
                    "${quote.text}"
                    <cite>- ${quote.author}</cite>
                </blockquote>
            `;
            slideElement.style.opacity = '1';
        }, 300);
    }

    startQuoteRotation() {
        setInterval(() => {
            this.currentQuote = (this.currentQuote + 1) % this.quotes.length;
            this.updateQuote();
        }, 5000);
    }

    // Simple Music Player for National Songs
    setupMusicPlayer() {
        const musicContainer = document.createElement('div');
        musicContainer.className = 'music-player';
        musicContainer.innerHTML = `
            <div class="music-controls">
                <button class="music-toggle">🎵 Play National Anthem</button>
                <div class="volume-control">
                    <input type="range" id="volume" min="0" max="100" value="50">
                </div>
            </div>
        `;

        musicContainer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            z-index: 1000;
            background: rgba(255,255,255,0.9);
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(musicContainer);

        // Note: In a real implementation, you would add actual audio files
        document.querySelector('.music-toggle').addEventListener('click', (e) => {
            if (e.target.textContent.includes('Play')) {
                e.target.textContent = '⏸️ Pause Music';
                this.showMessage('🎵 Playing National Anthem (Demo)');
            } else {
                e.target.textContent = '🎵 Play National Anthem';
                this.showMessage('⏸️ Music Paused');
            }
        });
    }

    // Guest Book Feature
    setupGuestbook() {
        const guestbookContainer = document.createElement('div');
        guestbookContainer.className = 'guestbook-container section';
        guestbookContainer.innerHTML = `
            <h2>Share Your Patriotic Message</h2>
            <div class="guestbook-form">
                <input type="text" id="guest-name" placeholder="Your Name" maxlength="50">
                <textarea id="guest-message" placeholder="Share your thoughts about Independence Day..." maxlength="200"></textarea>
                <button class="cta-button" id="submit-message">Submit Message</button>
            </div>
            <div class="guestbook-messages" id="guestbook-messages">
                <div class="guest-message">
                    <strong>Priya Sharma:</strong> "Proud to be an Indian! Jai Hind! 🇮🇳"
                </div>
                <div class="guest-message">
                    <strong>Rahul Kumar:</strong> "Freedom is precious. Let's cherish and protect it always."
                </div>
            </div>
        `;

        // Insert before footer
        const footer = document.querySelector('.footer');
        footer.insertAdjacentElement('beforebegin', guestbookContainer);

        this.setupGuestbookEvents();
    }

    setupGuestbookEvents() {
        document.getElementById('submit-message').addEventListener('click', () => {
            const name = document.getElementById('guest-name').value.trim();
            const message = document.getElementById('guest-message').value.trim();

            if (name && message) {
                const messageElement = document.createElement('div');
                messageElement.className = 'guest-message new-message';
                messageElement.innerHTML = `<strong>${name}:</strong> "${message}"`;

                const messagesContainer = document.getElementById('guestbook-messages');
                messagesContainer.insertBefore(messageElement, messagesContainer.firstChild);

                // Clear form
                document.getElementById('guest-name').value = '';
                document.getElementById('guest-message').value = '';

                this.showMessage('Thank you for your message! 🙏');

                // Animate new message
                setTimeout(() => {
                    messageElement.classList.remove('new-message');
                }, 100);
            } else {
                this.showMessage('Please fill in both name and message fields.');
            }
        });
    }

    // Utility function to show temporary messages
    showMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'temp-message';
        messageElement.textContent = text;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff9933, #138808);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            z-index: 10000;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(messageElement);

        setTimeout(() => {
            messageElement.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 300);
        }, 3000);
    }
}

// Additional CSS for new features
const additionalStyles = `
    .countdown-container {
        background: linear-gradient(135deg, #ff9933, #138808);
        color: white;
        padding: 3rem 0;
        text-align: center;
    }

    .countdown-display {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .countdown-item {
        background: rgba(255,255,255,0.1);
        padding: 1.5rem;
        border-radius: 15px;
        backdrop-filter: blur(10px);
        min-width: 100px;
    }

    .countdown-number {
        display: block;
        font-size: 2.5rem;
        font-weight: bold;
    }

    .countdown-label {
        font-size: 0.9rem;
        opacity: 0.8;
    }

    .quiz-container {
        background: #f8f9fa;
        text-align: center;
    }

    .quiz-options {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin: 2rem 0;
    }

    .quiz-option {
        padding: 1rem;
        background: white;
        border: 2px solid #ddd;
        border-radius: 10px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 1rem;
    }

    .quiz-option:hover {
        border-color: #ff9933;
        transform: translateY(-2px);
    }

    .quiz-option.correct {
        background: #d4edda;
        border-color: #28a745;
    }

    .quiz-option.wrong {
        background: #f8d7da;
        border-color: #dc3545;
    }

    .quiz-option:disabled {
        cursor: not-allowed;
    }

    .quiz-score {
        font-size: 1.2rem;
        font-weight: bold;
        margin-top: 2rem;
        color: #138808;
    }

    .quotes-container {
        background: linear-gradient(135deg, #138808, #ff9933);
        color: white;
        text-align: center;
    }

    .quotes-carousel {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
    }

    .quote-slide {
        transition: opacity 0.3s ease;
    }

    .quote-slide blockquote {
        font-size: 1.5rem;
        font-style: italic;
        margin: 0;
        line-height: 1.6;
    }

    .quote-slide cite {
        display: block;
        margin-top: 1rem;
        font-size: 1.1rem;
        opacity: 0.8;
    }

    .quote-controls {
        margin-top: 2rem;
    }

    .quote-prev, .quote-next {
        background: rgba(255,255,255,0.2);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.5rem;
        transition: all 0.3s ease;
    }

    .quote-prev:hover, .quote-next:hover {
        background: rgba(255,255,255,0.3);
    }

    .music-player .music-controls {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    .music-toggle {
        background: linear-gradient(45deg, #ff9933, #138808);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .volume-control input {
        width: 100px;
    }

    .guestbook-container {
        background: white;
    }

    .guestbook-form {
        max-width: 600px;
        margin: 0 auto 3rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .guestbook-form input,
    .guestbook-form textarea {
        padding: 1rem;
        border: 2px solid #ddd;
        border-radius: 10px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }

    .guestbook-form input:focus,
    .guestbook-form textarea:focus {
        outline: none;
        border-color: #ff9933;
    }

    .guestbook-form textarea {
        min-height: 100px;
        resize: vertical;
    }

    .guestbook-messages {
        max-width: 800px;
        margin: 0 auto;
        display: grid;
        gap: 1rem;
    }

    .guest-message {
        background: #f8f9fa;
        padding: 1.5rem;
        border-radius: 10px;
        border-left: 4px solid #ff9933;
        transition: all 0.3s ease;
    }

    .guest-message.new-message {
        background: #d4edda;
        border-left-color: #28a745;
        animation: fadeInUp 0.5s ease-out;
    }

    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @media (max-width: 768px) {
        .countdown-display {
            flex-wrap: wrap;
            gap: 1rem;
        }

        .countdown-item {
            min-width: 80px;
            padding: 1rem;
        }

        .countdown-number {
            font-size: 2rem;
        }

        .quiz-options {
            grid-template-columns: 1fr;
        }

        .music-player {
            position: relative !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            margin: 2rem auto;
            max-width: 300px;
        }
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new IndependenceDayWebsite();
});

