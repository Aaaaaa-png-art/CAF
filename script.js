const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// 메시지 추가 함수
function addMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content');
  contentDiv.textContent = message;
  messageDiv.appendChild(contentDiv);
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight; // 스크롤을 가장 아래로
}

// 메시지 전송 함수
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage('user', userMessage);
  userInput.value = '';
  sendButton.disabled = true;

  try {
    // AI 응답 요청
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer YOUR_API_KEY` // API_2838373737
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;
    addMessage('ai', aiMessage);
  } catch (error) {
    console.error('Error:', error);
    addMessage('ai', 'Sorry, something went wrong.');
  } finally {
    sendButton.disabled = false;
  }
}

// Enter 키로 메시지 전송
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

sendButton.addEventListener('click', sendMessage);