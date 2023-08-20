//public/admin.js
const adminForm = document.getElementById('admin-form');
const responseInput = document.getElementById('response');
// admin.js
document.addEventListener('DOMContentLoaded', async () => {
  const analyticsChart = document.getElementById('analytics-chart').getContext('2d');

  try {
    // Fetch data from the backend (replace with your actual API endpoint)
    const response = await fetch('/api/analytics');
    const data = await response.json();

    // Example: Create a line chart using Chart.js
    new Chart(analyticsChart, {
      type: 'line',
      data: {
        labels: data.labels, // Replace with your data labels
        datasets: [{
          label: 'Sales',
          data: data.salesData, // Replace with your sales data
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
        }],
      },
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// Function to send an admin response to the backend
async function sendAdminResponse(response) {
  try {
    const response = await fetch('/users/admin/respond', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response }),
    });

    if (!response.ok) {
      throw new Error('Failed to send admin response');
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error('Error sending admin response:', error);
  }
}

// Event listener for admin form submission
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const adminResponse = responseInput.value.trim();
  if (adminResponse !== '') {
    sendAdminResponse(adminResponse);
    responseInput.value = '';
  }
});
