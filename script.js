/**
 * SCRIPT.JS - LOGIC TƯƠNG TÁC CHO PORTFOLIO DO NA TRA
 * Tuân thủ phong cách lập trình phẳng tối giản và chuẩn BEM
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. HIỆU ỨNG CUỘN TRANG CHO HEADER (.header--scrolled)
       ========================================================================== */
    const headerElement = document.querySelector('.header');

    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            headerElement.classList.add('header--scrolled');
        } else {
            headerElement.classList.remove('header--scrolled');
        }
    };

    // Kiểm tra ngay khi tải trang (trường hợp F5 tại vị trí cuộn lửng)
    handleHeaderScroll();
    window.addEventListener('scroll', handleHeaderScroll);


    /* ==========================================================================
       2. HIỆU ỨNG TỰ ĐỘNG GÕ CHỮ (AUTO-TYPING) CHO HERO SECTION
       ========================================================================== */
    const typingSpan = document.getElementById('auto-typing');
    const texts = [
        "Sinh viên IT/Software Engineering tại NTTU",
        "Full-stack Web & Mobile Developer"
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeEffect = () => {
        const currentText = texts[textIndex];

        if (isDeleting) {
            // Xóa chữ từng ký tự một
            typingSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 30; // Xóa chữ nhanh hơn gõ
        } else {
            // Gõ chữ từng ký tự một
            typingSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        // Chuyển đổi trạng thái khi đã gõ xong hoặc xóa xong một câu
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Dừng lại 2 giây ở cuối câu để người dùng đọc
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length; // Chuyển sang câu tiếp theo
            typingSpeed = 400; // Nghỉ một chút trước khi bắt đầu gõ câu mới
        }

        setTimeout(typeEffect, typingSpeed);
    };

    if (typingSpan) {
        typeEffect();
    }


    /* ==========================================================================
       3. XÁC THỰC BIỂU MẪU LIÊN HỆ PHẲNG (CONTACT FORM VALIDATION)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formName = document.getElementById('form-name');
    const formEmail = document.getElementById('form-email');
    const formMsg = document.getElementById('form-msg');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let isFormValid = true;

            // 1. Kiểm tra Họ Tên
            if (!formName.value.trim()) {
                showInputError(formName);
                isFormValid = false;
            } else {
                hideInputError(formName);
            }

            // 2. Kiểm tra Email
            if (!formEmail.value.trim() || !isValidEmail(formEmail.value)) {
                showInputError(formEmail);
                isFormValid = false;
            } else {
                hideInputError(formEmail);
            }

            // 3. Kiểm tra Tin Nhắn
            if (!formMsg.value.trim()) {
                showInputError(formMsg);
                isFormValid = false;
            } else {
                hideInputError(formMsg);
            }

            // Xử lý gửi biểu mẫu nếu hợp lệ
            if (isFormValid) {
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.textContent;

                submitBtn.disabled = true;
                submitBtn.textContent = 'Đang gửi...';

                // Giả lập cuộc gọi mạng gửi tin nhắn
                setTimeout(() => {
                    formStatus.textContent = 'Cảm ơn bạn! Thông điệp đã được gửi đi thành công. Tra sẽ liên hệ sớm nhé!';
                    formStatus.className = 'contact__status contact__status--success';
                    
                    // Xóa trắng form
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalBtnText;

                    // Ẩn thông báo sau 5 giây
                    setTimeout(() => {
                        formStatus.className = 'contact__status';
                    }, 5000);

                }, 1000);
            }
        });
    }

    // Hàm hiển thị lỗi dựa trên cấu trúc BEM của form-group
    function showInputError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.add('form-group--invalid');
        }
    }

    // Hàm xóa thông tin lỗi
    function hideInputError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('form-group--invalid');
        }
    }

    // Hàm kiểm tra định dạng email tiêu chuẩn
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email.toLowerCase());
    }


    /* ==========================================================================
       4. LOGIC XỬ LÝ HỘP THOẠI DIALOG VIDEO DEMO (.dialog)
       ========================================================================== */
    const demoButtons = document.querySelectorAll('.timeline__demo-btn');
    const demoDialog = document.getElementById('demo-dialog');
    const demoVideo = document.getElementById('demo-video');
    const closeDialogBtn = document.getElementById('close-dialog');

    if (demoButtons && demoDialog && demoVideo) {
        // Gán sự kiện click cho toàn bộ nút demo
        demoButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const videoSrc = btn.getAttribute('data-video');
                if (videoSrc) {
                    // Cập nhật đường dẫn video nếu cần
                    const sourceElement = demoVideo.querySelector('source');
                    if (sourceElement && sourceElement.getAttribute('src') !== videoSrc) {
                        sourceElement.setAttribute('src', videoSrc);
                        demoVideo.load();
                    }
                    
                    // Đưa video về giây thứ 0
                    demoVideo.currentTime = 0;
                    
                    // Hiển thị dialog modal chính thức
                    demoDialog.showModal();
                    
                    // Tự động phát video
                    demoVideo.play().catch(err => {
                        console.log("Auto-play blocked by browser. User must click play.", err);
                    });
                }
            });
        });

        // Hàm tắt video và đóng dialog
        const closeVideoDialog = () => {
            demoVideo.pause();
            demoDialog.close();
        };

        // Click nút đóng dialog
        if (closeDialogBtn) {
            closeDialogBtn.addEventListener('click', closeVideoDialog);
        }

        // Đóng dialog khi click ra phần backdrop (ngoài vùng hiển thị của container)
        demoDialog.addEventListener('click', (event) => {
            const rect = demoDialog.getBoundingClientRect();
            const isInDialog = (
                rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width
            );
            if (!isInDialog) {
                closeVideoDialog();
            }
        });

        // Lắng nghe sự kiện close mặc định của dialog (Ví dụ nhấn ESC)
        demoDialog.addEventListener('close', () => {
            demoVideo.pause();
        });


    }
});
