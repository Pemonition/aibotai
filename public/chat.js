//public/chat.js
const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const adminResponseInput = document.getElementById('admin-response');
const sendAdminButton = document.getElementById('send-admin-button');

// Function to append a new message to the chat
function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.innerText = `${sender}: ${message}`;
  chatMessages.appendChild(messageElement);
}

// Function to send a message to the backend
async function sendMessage(message) {
  try {
    const response = await fetch('/whatsapp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    const data = await response.json();
    appendMessage(data.message, 'You');
  } catch (error) {
    console.error('Error sending message:', error);
    appendMessage('Error sending message', 'System');
  }
}

// Function to send an admin response to the backend
async function sendAdminResponse(response) {
  try {
    const adminResponse = response.trim();
    if (adminResponse !== '') {
      const adminResponseData = await fetch('/users/admin/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: adminResponse }),
      });

      if (!adminResponseData.ok) {
        throw new Error('Failed to send admin response');
      }

      const responseData = await adminResponseData.json();
      console.log(responseData.message);
    }
  } catch (error) {
    console.error('Error sending admin response:', error);
  }
}

// Event listener for Send button click
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    appendMessage(message, 'You');
    sendMessage(message);
    messageInput.value = '';
  }
});

// Event listener for Send Admin Response button click
sendAdminButton.addEventListener('click', () => {
  const adminResponse = adminResponseInput.value.trim();
  if (adminResponse !== '') {
    sendAdminResponse(adminResponse);
    adminResponseInput.value = '';
  }
});
