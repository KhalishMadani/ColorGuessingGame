// Notification data
const notifications = {
    success: {
        emoji: '✅',
        title: "Yay You're Correct!",
        message: "Great job! You got it right.",
        type: 'success'
    },
    error: {
        emoji: '❌',
        title: "Wrong choice",
        message: "Don't worry, try again!",
        type: 'error'
    }
};

// Show notification function
export function showNotification(type) {
    const overlay = document.getElementById('notification-overlay');
    const popup = document.getElementById('notification-popup');
    const emoji = document.getElementById('notification-emoji');
    const title = document.getElementById('notification-title');
    const message = document.getElementById('notification-message');
    const icon = document.querySelector('.notification-icon');
    
    const notification = notifications[type];
    
    // Set content
    emoji.textContent = notification.emoji;
    title.textContent = notification.title;
    message.textContent = notification.message;
    
    // Set icon style
    icon.className = `notification-icon ${notification.type}`;
    
    // Show overlay
    overlay.classList.add('show');
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        hideNotification();
    }, 3000);
}

// Hide notification function
export function hideNotification() {
    const overlay = document.getElementById('notification-overlay');
    overlay.classList.remove('show');
}

// Random notification for demo
function showRandomNotification() {
    const types = ['success', 'error'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    showNotification(randomType);
}

// Quiz example function
function checkAnswer(answer) {
    const correctAnswer = 4;
    
    if (answer === correctAnswer) {
        showNotification('success');
    } else {
        showNotification('error');
        // Add shake animation for wrong answer
        const popup = document.getElementById('notification-popup');
        popup.classList.add('shake');
        setTimeout(() => {
            popup.classList.remove('shake');
        }, 500);
    }
}

// Close notification when clicking outside
document.getElementById('notification-overlay').addEventListener('click', function(e) {
    if (e.target === this) {
        hideNotification();
    }
});

// Close notification with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideNotification();
    }
});