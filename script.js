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
    const demoDialog = document.getElementById('demo-dialog');
    const demoVideo = document.getElementById('demo-video');
    const closeDialogBtn = document.getElementById('close-dialog');

    const bindDemoEvents = () => {
        const demoButtons = document.querySelectorAll('.timeline__demo-btn');
        if (demoButtons && demoDialog && demoVideo) {
            // Gán sự kiện click cho toàn bộ nút demo động mới tạo
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
                            console.log("Auto-play bị chặn bởi trình duyệt. Đợi người dùng tương tác.", err);
                        });
                    }
                });
            });
        }
    };

    if (demoDialog && demoVideo) {
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

    /* ==========================================================================
       5. TỰ ĐỘNG KẾT XUẤT TIMELINE DỰ ÁN TỪ DỮ LIỆU HTML HEAD (DYNAMIC TIMELINE)
       ========================================================================== */
    const timelineContainer = document.querySelector('.timeline__container');

    const renderTimeline = () => {
        if (!timelineContainer || !window.PROJECTS_DATA) return;

        // Xóa sạch placeholder tĩnh
        timelineContainer.innerHTML = '';

        // Tạo HTML động từ PROJECTS_DATA
        window.PROJECTS_DATA.forEach((project) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'timeline__item';

            const featuresHtml = project.features.map(feat => `<li>${feat}</li>`).join('');
            const tagsHtml = project.tags.map(tag => `<span class="tech-tag">#${tag}</span>`).join('');

            // Tạo nút bấm hoặc liên kết dựa trên dữ liệu cấu hình
            let actionHtml = '';
            if (project.link) {
                actionHtml = `<a href="${project.link}" target="_blank" rel="noopener" class="btn-outline">Landing Page</a>`;
            } else {
                actionHtml = `<button class="btn-outline timeline__demo-btn" data-video="${project.video || ''}">DEMO</button>`;
            }

            // Tạo khối thành tích ở phần đối diện
            let achievementHtml = '';
            if (project.achievement) {
                achievementHtml = `
                    <div class="timeline__achievement">
                        <article class="achievement-card">
                            <div class="achievement-card__header flex-between">
                                <span class="achievement-card__tag">Thành tích nổi bật</span>
                                <span class="achievement-card__icon">${project.achievement.emoji || '🏆'}</span>
                            </div>
                            <h4 class="achievement-card__title">${project.achievement.title}</h4>
                            <p class="achievement-card__desc">${project.achievement.desc}</p>
                        </article>
                    </div>
                `;
            }

            itemElement.innerHTML = `
                <div class="timeline__marker"></div>
                <div class="timeline__project">
                    <div class="timeline__content">
                        <div class="timeline__time">${project.time}</div>
                        <h3 class="timeline__project-title">${project.title}</h3>
                        <ul class="timeline__feature-list">
                            ${featuresHtml}
                        </ul>
                        <div class="timeline__tags">
                            ${tagsHtml}
                        </div>
                        <div class="timeline__actions">
                            ${actionHtml}
                        </div>
                    </div>
                </div>
                ${achievementHtml}
            `;

            timelineContainer.appendChild(itemElement);
        });

        // Liên kết sự kiện click cho các nút DEMO động mới sinh
        bindDemoEvents();
    };

    /* ==========================================================================
       6. TỰ ĐỘNG KẾT XUẤT THÔNG TIN GIỚI THIỆU TỪ DỮ LIỆU HTML HEAD (DYNAMIC ABOUT)
       ========================================================================== */
    const aboutCard = document.querySelector('.about__card');

    const renderAbout = () => {
        if (!aboutCard || !window.ABOUT_DATA) return;

        const aboutData = window.ABOUT_DATA;

        // Kết xuất danh sách giới thiệu bản thân dạng liệt kê
        const personalDetailsHtml = `<ul class="about__list">` +
            aboutData.personal.details.map(item => `<li>${item}</li>`).join('') +
            `</ul>`;

        // Kết xuất danh sách mục tiêu
        const goalsHtml = aboutData.goals.map((goal, idx) => {
            const goalDetailsHtml = `<ul class="about__list">` +
                goal.details.map(item => `<li>${item}</li>`).join('') +
                `</ul>`;

            const goalItem = `
                <div class="about__goal-item">
                    <h3 class="about__subtitle">${goal.emoji ? goal.emoji + ' ' : ''}${goal.title}</h3>
                    ${goalDetailsHtml}
                </div>
            `;
            // Thêm divider ở giữa các mục tiêu
            if (idx < aboutData.goals.length - 1) {
                return goalItem + `<div class="about__divider"></div>`;
            }
            return goalItem;
        }).join('');

        aboutCard.innerHTML = `
            <!-- About Left: Personal Info -->
            <div class="about__personal">
                <h3 class="about__subtitle">${aboutData.personal.title}</h3>
                ${personalDetailsHtml}
            </div>

            <!-- Vertical Divider -->
            <div class="about__vertical-divider"></div>

            <!-- About Right: Goals (Short-term & Long-term) -->
            <div class="about__goals">
                ${goalsHtml}
            </div>
        `;
    };

    /* ==========================================================================
       7. TỰ ĐỘNG KẾT XUẤT CHUYÊN MÔN (DYNAMIC SERVICES)
       ========================================================================== */
    const servicesGrid = document.querySelector('.services__grid');

    const renderServices = () => {
        if (!servicesGrid || !window.SERVICES_DATA) return;

        servicesGrid.innerHTML = '';

        window.SERVICES_DATA.forEach((service) => {
            const cardElement = document.createElement('article');
            cardElement.className = 'card-service';

            cardElement.innerHTML = `
                <div class="card-service__icon">
                    ${service.icon}
                </div>
                <h3 class="card-service__title">${service.title}</h3>
                <p class="card-service__desc">${service.desc}</p>
            `;

            servicesGrid.appendChild(cardElement);
        });
    };

    /* ==========================================================================
       8. TỰ ĐỘNG KẾT XUẤT KỸ NĂNG (DYNAMIC SKILLS)
       ========================================================================== */
    const skillsGrid = document.querySelector('.skills__grid');

    const renderSkills = () => {
        if (!skillsGrid || !window.ACTIVE_SKILLS || !window.AVAILABLE_SKILLS) return;

        skillsGrid.innerHTML = '';

        window.ACTIVE_SKILLS.forEach((id) => {
            const skill = window.AVAILABLE_SKILLS[id];
            if (!skill) return;

            const badgeElement = document.createElement('div');
            badgeElement.className = 'skill-badge';

            badgeElement.innerHTML = `
                <span class="skill-badge__icon">${skill.icon}</span>
                <span class="skill-badge__text">${skill.name}</span>
            `;

            skillsGrid.appendChild(badgeElement);
        });
    };

    // Khởi chạy kết xuất dòng thời gian dự án tiêu biểu, thông tin giới thiệu, chuyên môn và kỹ năng
    renderTimeline();
    renderAbout();
    renderServices();
    renderSkills();
});
