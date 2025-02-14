// 轮播图逻辑
let index = 0;
function slideShow() {
    const carousel = document.querySelector('.carousel-inner');
    const totalImages = document.querySelectorAll('.carousel-inner img').length;
    index = (index + 1) % totalImages;
    carousel.style.transform = `translateX(-${index * 100}%)`;
}
setInterval(slideShow, 3000);  // 每 3 秒轮播一张图

// 留言板逻辑
document.getElementById('message-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let messageText = document.getElementById('message').value;
    if (messageText.trim() === "") return;

    let messageContainer = document.getElementById('messages');

    let messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = messageText;

    // 添加留言时间
    let timeStamp = document.createElement('small');
    timeStamp.textContent = new Date().toLocaleString();
    messageDiv.appendChild(timeStamp);

    messageContainer.appendChild(messageDiv);

    document.getElementById('message').value = ''; // 清空输入框
});
