document.addEventListener('DOMContentLoaded', function() {
    const startGameBtn = document.getElementById('startGameBtn');
    const instructionsBtn = document.getElementById('instructionsBtn');
    const aboutBtn = document.getElementById('aboutBtn');

    startGameBtn.addEventListener('click', function() {
        window.location.href = 'Web/game.html';
    });

    instructionsBtn.addEventListener('click', function() {
        window.location.href = 'Web/instructions.html';
    });

    aboutBtn.addEventListener('click', function() {
        window.location.href = 'Web/about.html';
    });
});
