// 当前显示图片的索引
let currentImageIndex = 0;
// 图片数组
const images = [
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg",
    "img/image4.jpg",
    "img/image5.jpg",
    "img/image6.jpg"
];
// 图片缩放比例
let scale = 1;

// 触摸起始坐标
let touchStartX = 0;
let touchEndX = 0;

// 获取模态框和相关元素
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const downloadLink = document.getElementById('download-link');

// 打开模态框
function openModal(index) {
    currentImageIndex = index;
    scale = 1;  // 重置缩放
    modal.classList.add('show');
    updateModalImage();
}

// 关闭模态框
function closeModal() {
    modal.classList.remove('show');
    scale = 1;  // 重置缩放
}

// 更新模态框图片（带动画）
function updateModalImage(direction = "none") {
    if (direction === "left") {
        animateImage("slide-out-left", "slide-in-right");
    } else if (direction === "right") {
        animateImage("slide-out-right", "slide-in-left");
    } else {
        modalImage.src = images[currentImageIndex];
        downloadLink.href = images[currentImageIndex];
        // 修正语法错误
        modalImage.style.transform = `scale(${scale})`;
    }
}

// 切换图片（带动画）
function changeImage(offset) {
    const direction = offset > 0 ? "left" : "right";
    currentImageIndex = (currentImageIndex + offset + images.length) % images.length;
    scale = 1;  // 切换图片时重置缩放
    updateModalImage(direction);
}

// 缩放图片
function zoomImage(factor) {
    scale *= factor;
    scale = Math.max(0.5, Math.min(3, scale)); // 限制缩放范围
    // 修正语法错误
    modalImage.style.transform = `scale(${scale})`;
}

// 监听触摸事件，支持移动端左右滑动切换图片
modalImage.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
});

modalImage.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
});

// 处理滑动事件
function handleSwipe() {
    const swipeThreshold = 50; // 触发滑动的最小距离
    if (touchEndX < touchStartX - swipeThreshold) {
        changeImage(1); // 向左滑动，下一张
    } else if (touchEndX > touchStartX + swipeThreshold) {
        changeImage(-1); // 向右滑动，上一张
    }
}

// 图片切换动画
function animateImage(oldClass, newClass) {
    modalImage.classList.add(oldClass);

    setTimeout(() => {
        modalImage.classList.remove(oldClass);
        modalImage.src = images[currentImageIndex];
        downloadLink.href = images[currentImageIndex];
        modalImage.classList.add(newClass);
    }, 300);

    setTimeout(() => {
        modalImage.classList.remove(newClass);
    }, 600);
}

// 复制邮箱功能
async function copyEmail() {
    const emailText = document.getElementById('email-text').textContent;
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(emailText);
            alert('邮箱已复制到剪贴板');
        } else {
            // 兼容旧浏览器的方法
            const textArea = document.createElement('textarea');
            textArea.value = emailText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('邮箱已复制到剪贴板');
        }
    } catch (err) {
        console.error('复制邮箱失败:', err);
    }
}
