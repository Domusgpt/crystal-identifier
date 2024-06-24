document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('crystalForm');
    const resultDiv = document.getElementById('result');
    const analysisResult = document.getElementById('analysisResult');
    const loadingDiv = document.getElementById('loading');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        // Show loading message
        loadingDiv.classList.remove('hidden');
        resultDiv.classList.add('hidden');

        try {
            const response = await fetch('https://crystalgpt.azurewebsites.net/api/httptrigger5', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            
            // Hide loading, show result
            loadingDiv.classList.add('hidden');
            resultDiv.classList.remove('hidden');
            
            analysisResult.textContent = data.message;
        } catch (error) {
            console.error('Error:', error);
            loadingDiv.classList.add('hidden');
            analysisResult.textContent = 'An error occurred while analyzing the crystal. Please try again.';
            resultDiv.classList.remove('hidden');
        }
    });
});
