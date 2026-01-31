document.addEventListener('DOMContentLoaded', () => {
    
    // --- Date Display ---
    const dateEl = document.getElementById('date-display');
    const now = new Date();
    dateEl.textContent = now.toISOString().split('T')[0].replace(/-/g, '.');

    // --- Interaction: Body Map ---
    const joints = document.querySelectorAll('.joint');
    const tooltip = document.getElementById('joint-tooltip');
    
    joints.forEach(joint => {
        // Hover Logic
        joint.addEventListener('mouseenter', (e) => {
            const jointName = joint.dataset.joint;
            tooltip.textContent = jointName;
            tooltip.style.opacity = '1';
        });

        joint.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
        });

        // Click to Toggle Injury State
        joint.addEventListener('click', () => {
            const isInjured = joint.classList.contains('injured');
            
            if (isInjured) {
                joint.classList.remove('injured');
                updateStatus("RECOVERY_MODE_OFF");
            } else {
                joint.classList.add('injured');
                updateStatus(`WARNING: ${joint.dataset.joint.toUpperCase()} STRAIN DETECTED`);
            }
        });
    });

    // --- Interaction: Readiness Score ---
    const sleepButtons = document.querySelectorAll('.range-selector button');
    let sleepScore = 4; // Default

    sleepButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from siblings
            sleepButtons.forEach(b => b.classList.remove('active'));
            // Add to current
            btn.classList.add('active');
            sleepScore = parseInt(btn.value);
            recalcReadiness();
        });
    });

    function recalcReadiness() {
        // Simple mock logic
        const base = 70;
        const newScore = base + (sleepScore * 5); // 75 to 95 range
        const scoreEl = document.getElementById('readiness-score');
        
        // Animate count up
        let current = parseInt(scoreEl.textContent);
        const interval = setInterval(() => {
            if (current < newScore) current++;
            else if (current > newScore) current--;
            else clearInterval(interval);
            scoreEl.textContent = current + "%";
        }, 20);
    }

    // --- Status Helper ---
    function updateStatus(msg) {
        const headerStatus = document.querySelector('.status-indicator');
        headerStatus.textContent = msg;
        
        // Flash effect
        headerStatus.style.color = '#cf222e'; // Red
        setTimeout(() => {
            headerStatus.style.color = '#666666'; // Back to muted
        }, 1000);
    }

    // --- Charts Animation (Mock) ---
    const bars = document.querySelectorAll('.bar');
    bars.forEach((bar, index) => {
        // Randomize heights slightly on load for dynamic feel
        const originalHeight = parseFloat(bar.style.height);
        bar.style.height = '0%';
        setTimeout(() => {
            bar.style.height = originalHeight + '%';
        }, 200 + (index * 100));
    });

});
