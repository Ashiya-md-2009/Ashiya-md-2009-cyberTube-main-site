// time clock .js 
function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';

      hours = hours % 12;
      hours = hours ? hours : 12; // 0 => 12
      hours = hours.toString().padStart(2, '0');

      document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
    }

    setInterval(updateClock, 1000); // update every second
    updateClock(); // initial call