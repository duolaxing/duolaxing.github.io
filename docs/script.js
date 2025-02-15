// 当前显示图片的索引
let currentImageIndex = 0;
// 图片数组，存储所有图片的路径
const images = [
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg",
    "img/image4.jpg",
    "img/image5.jpg",
    "img/image6.jpg"
];
// 图片缩放比例，初始为 1
let scale = 1;

// 打开模态框函数
function openModal(index) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const downloadLink = document.getElementById('download-link');

    currentImageIndex = index;
    modal.classList.add('show');
    modalImage.src = images[currentImageIndex];
    downloadLink.href = images[currentImageIndex];
    scale = 1;
    modalImage.style.transform = `scale(${scale})`;
    setTimeout(() => {
        modalImage.classList.add('slide-in');
    }, 0);
}

// 关闭模态框函数
function closeModal() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.classList.remove('slide-in');
    setTimeout(() => {
        modal.classList.remove('show');
    }, 300);
}

// 切换图片函数
function changeImage(offset) {
    const modalImage = document.getElementById('modal-image');
    const downloadLink = document.getElementById('download-link');
    currentImageIndex = (currentImageIndex + offset + images.length) % images.length;

    let outAnimation, inAnimation;
    if (offset > 0) {
        outAnimation = 'slideLeft';
        inAnimation = 'slideInRight';
    } else {
        outAnimation = 'slideRight';
        inAnimation = 'slideInLeft';
    }

    modalImage.style.animation = '';
    modalImage.style.animation = `${outAnimation} 0.3s ease-in-out forwards`;
    setTimeout(() => {
        modalImage.src = images[currentImageIndex];
        downloadLink.href = images[currentImageIndex];
        scale = 1;
        modalImage.style.transform = `scale(${scale})`;
        modalImage.style.animation = `${inAnimation} 0.3s ease-in-out forwards`;
    }, 300);
}

// 复制邮箱功能函数
async function copyEmail() {
    const emailText = document.getElementById('email-text').textContent;
    try {
        await navigator.clipboard.writeText(emailText);
        alert('邮箱已复制到剪贴板');
    } catch (err) {
        console.error('复制邮箱失败:', err);
        const tempInput = document.createElement('input');
        tempInput.value = emailText;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        alert('邮箱已复制到剪贴板');
    }
}

// 缩放图片函数
function zoomImage(factor) {
    const modalImage = document.getElementById('modal-image');
    if (!modalImage) {
        console.error('无法找到模态框图片元素');
        return;
    }
    scale *= factor;
    scale = Math.max(0.1, Math.min(5, scale));
    modalImage.style.transform = `scale(${scale})`;
    console.log('Zoomed. New scale:', scale);
}

// 预留手机端手势操作支持函数
function setupMobileGestures() {
    const modal = document.getElementById('image-modal');
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        if (deltaX > 50) {
            changeImage(-1);
        } else if (deltaX < -50) {
            changeImage(1);
        }
    });
}

// 页面加载完成后执行的操作
window.addEventListener('load', () => {
    setupMobileGestures();
    const zoomInButton = document.querySelector('.zoom-button.zoom-in');
    const zoomOutButton = document.querySelector('.zoom-button.zoom-out');
    if (zoomInButton) {
        zoomInButton.addEventListener('click', () => zoomImage(1.1));
    } else {
        console.error('未找到放大按钮');
    }
    if (zoomOutButton) {
        zoomOutButton.addEventListener('click', () => zoomImage(0.9));
    } else {
        console.error('未找到缩小按钮');
    }
});
