let currentImageIndex = 0;
const images = [
    "img/image1.jpg",
    "img/image2.jpg",
    "img/image3.jpg",
    "img/image4.jpg",
    "img/image5.jpg",
    "img/image6.jpg"
];
let scale = 1;

// 打开模态框
function openModal(index) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const downloadLink = document.getElementById('download-link');

    currentImageIndex = index;
    modal.classList.add('show');
    modalImage.src = images[currentImageIndex];
    downloadLink.href = images[currentImageIndex];
    scale = 1;
    modalImage.style.transform = `scale(1)`;
    setTimeout(() => {
        modalImage.classList.add('slide-in');
    }, 0);
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.classList.remove('slide-in');
    setTimeout(() => {
        modal.classList.remove('show');
    }, 300);
}

// 切换图片
function changeImage(offset) {
    const modalImage = document.getElementById('modal-image');
    const downloadLink = document.getElementById('download-link');
    const oldIndex = currentImageIndex;
    currentImageIndex = (currentImageIndex + offset + images.length) % images.length;

    let outAnimation, inAnimation;
    if (offset > 0) {
        outAnimation = 'slideLeft';
        inAnimation = 'slideInRight';
    } else {
        outAnimation = 'slideRight';
        inAnimation = 'slideInLeft';
    }

    modalImage.style.animation = `${outAnimation} 0.3s ease-in-out forwards`;
    setTimeout(() => {
        modalImage.src = images[currentImageIndex];
        downloadLink.href = images[currentImageIndex];
        scale = 1;
        modalImage.style.transform = `scale(1)`;
        modalImage.style.animation = `${inAnimation} 0.3s ease-in-out forwards`;
    }, 300);
}

// 复制邮箱功能
function copyEmail() {
    const emailText = document.getElementById('email-text').textContent;
    const tempInput = document.createElement('input');
    tempInput.value = emailText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('邮箱已复制到剪贴板');
}

// 缩放图片
function zoomImage(factor) {
    const modalImage = document.getElementById('modal-image');
    scale *= factor;
    modalImage.style.transform = `scale(${scale})`;
}
