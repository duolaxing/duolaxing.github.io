// 留言板提交功能
const messageForm = document.getElementById('message-form');
const messagesDiv = document.getElementById('messages');

messageForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const newMessage = document.createElement('div');
    newMessage.innerHTML = `<p><strong>${name} (${email})</strong>: ${message}</p>`;
    messagesDiv.appendChild(newMessage);

    // 清空表单
    messageForm.reset();
});
