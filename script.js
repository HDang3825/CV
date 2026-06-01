/**
 * SCRIPT.JS - LOGIC TƯƠNG TÁC CHO PORTFOLIO DO NA TRA
 * Tuân thủ phong cách lập trình phẳng tối giản và chuẩn BEM
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       -1. ĐA NGÔN NGỮ (I18N IMPLEMENTATION)
       ========================================================================== */
    const translations = {
        vi: {
            "nav.about": "Giới Thiệu",
            "nav.services": "Chuyên Môn",
            "nav.projects": "Dự Án",
            "nav.skills": "Kỹ Năng",
            "nav.contact": "Liên Hệ",
            "hero.greeting": "Xin chào, ",
            "hero.intro": "tôi là ",
            "hero.cta": "Xem Projects",
            "about.title": "Giới Thiệu",
            "services.title": "Chuyên Môn",
            "projects.title": "Dự Án Tiêu Biểu",
            "skills.title": "Kỹ năng",
            "skills.tech": "Frameworks & Công nghệ",
            "skills.soft": "Kỹ năng mềm",
            "contact.title": "Liên Hệ",
            "dialog.title": "Xem Demo Dự Án",
            "dialog.unsupported": "Trình duyệt của bạn không hỗ trợ phát video này.",
            "footer.thankyou": "Chân thành cảm ơn Quý Nhà tuyển dụng (HR) đã dành thời gian quý báu xem qua hồ sơ năng lực của tôi. Chúc bạn một ngày tốt lành và ngập tràn niềm vui!"
        },
        en: {
            "nav.about": "About",
            "nav.services": "Services",
            "nav.projects": "Projects",
            "nav.skills": "Skills",
            "nav.contact": "Contact",
            "hero.greeting": "Hello, ",
            "hero.intro": "I am ",
            "hero.cta": "View Projects",
            "about.title": "About Me",
            "services.title": "My Services",
            "projects.title": "Featured Projects",
            "skills.title": "Skills",
            "skills.tech": "Frameworks & Tech",
            "skills.soft": "Soft Skills",
            "contact.title": "Contact Me",
            "dialog.title": "Project Demo",
            "dialog.unsupported": "Your browser does not support the video tag.",
            "footer.thankyou": "Sincere thanks to HR for spending your valuable time reviewing my portfolio. Wish you a wonderful day filled with joy!"
        }
    };

    let currentLang = localStorage.getItem('lang') || 'vi';

    // Dynamic data translated to maintain switch compatibility
    const getProjectsData = (lang) => {
        if (lang === 'en') {
            return [
                {
                    time: "2026 - Present",
                    title: "EzBiz AI Chatbot",
                    features: [
                        "Provides businesses with automated customer response through AI.",
                        "Integrates semantic search utilizing RAG model.",
                        "Manages reliable real-time conversational states."
                    ],
                    tags: ["FastAPI", "RAG", "Firestore"],
                    link: "https://hdang3825.github.io/EZBIZ_Data_3D/",
                    achievement: {
                        title: "Top 5 NTTU Startup Challenge",
                        desc: "Outstanding project entering the top 5 school startup competition and received prototyping sponsorship.",
                        emoji: `<i class="fa-solid fa-trophy" style="color: var(--accent);"></i>`
                    }
                },
                {
                    time: "2025",
                    title: "LibTech System",
                    features: [
                        "Smart library management software and document digitalization.",
                        "Automates borrow-return activities and book categorizations.",
                        "Optimizes book searches and inventory bookkeeping."
                    ],
                    tags: ["React", "NestJS", "MySQL"],
                    video: "DEMO/DM1.mp4.mp4",
                    achievement: {
                        title: "Excellent Scientific Research Paper",
                        desc: "Received certificate from NTTU IT Faculty for innovative digitized management system.",
                        emoji: `<i class="fa-solid fa-scroll" style="color: var(--accent);"></i>`
                    }
                },
                {
                    time: "2024",
                    title: "LMS Deployment",
                    features: [
                        "Deployed large scale virtual learning management system.",
                        "Containerized application configurations to avoid human errors.",
                        "Maintained resilient process management and auto-restart on crashes."
                    ],
                    tags: ["Azure", "Docker", "PM2", "Ubuntu"],
                    video: "DEMO/DM1.mp4.mp4",
                    achievement: {
                        title: "Production Release for 500+ Students",
                        desc: "System ran stably for the whole term with error logs rate under 1%.",
                        emoji: `<i class="fa-solid fa-rocket" style="color: var(--accent);"></i>`
                    }
                }
            ];
        }
        return window.PROJECTS_DATA;
    };

    const getAboutData = (lang) => {
        if (lang === 'en') {
            return {
                personal: {
                    title: "About Me",
                    details: [
                        "Software Engineering student at Nguyen Tat Thanh University (NTTU).",
                        "Aiming to become a professional Full-stack Web & Mobile Developer.",
                        "Passionate about Clean Code, Flat Design, and performance optimizations.",
                        "Constantly learning new technologies to solve real-world problems."
                    ]
                },
                goals: [
                    {
                        emoji: "",
                        title: "Short-term Goals",
                        details: [
                            "Graduate with honors from NTTU majoring in Software Engineering.",
                            "Gain hands-on industry experience by building production applications.",
                            "Fully master Agile/Scrum software development methodology."
                        ]
                    },
                    {
                        emoji: "",
                        title: "Long-term Goals",
                        details: [
                            "Become a Senior Full-stack Engineer within 3-5 years of industry work.",
                            "Master large-scale distributed system architectures and query scaling.",
                            "Conduct research and specialize in Big Data and Smart Machine Learning models."
                        ]
                    }
                ]
            };
        }
        return window.ABOUT_DATA;
    };

    const getServicesData = (lang) => {
        if (lang === 'en') {
            return [
                {
                    title: "Web Development",
                    desc: "Build modern web apps using React, Next.js, and NestJS. Deliver fast load times and responsive interfaces.",
                    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>`
                },
                {
                    title: "Mobile App Development",
                    desc: "Develop multi-platform mobile apps using Flutter to guarantee highly performant, flat experiences.",
                    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>`
                },
                {
                    title: "Database Management",
                    desc: "Efficient database modeling and optimized queries in Oracle, MySQL, and MongoDB.",
                    icon: `<svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>`
                }
            ];
        }
        return window.SERVICES_DATA;
    };

    const getSoftSkillsData = (lang) => {
        if (lang === 'en') {
            return [
                { name: "Teamwork", icon: `<i class="fa-solid fa-users"></i>` },
                { name: "Problem Solving", icon: `<i class="fa-solid fa-lightbulb"></i>` },
                { name: "Communication & Presentation", icon: `<i class="fa-solid fa-comments"></i>` },
                { name: "Time Management", icon: `<i class="fa-solid fa-clock"></i>` },
                { name: "Self-study & Research", icon: `<i class="fa-solid fa-book-open"></i>` },
                { name: "Adaptability", icon: `<i class="fa-solid fa-bolt"></i>` }
            ];
        }
        return window.SOFT_SKILLS;
    };

    const getContactDesc = (lang) => {
        if (lang === 'en') {
            return "I am always open to new challenging opportunities. Let's connect via:";
        }
        return window.CONTACT_DATA ? window.CONTACT_DATA.desc : "";
    };

    const getHeroTypingTexts = (lang) => {
        if (lang === 'en') {
            return [
                "IT/Software Engineering Student at NTTU",
                "Full-stack Web & Mobile Developer"
            ];
        }
        return [
            "Sinh viên IT/Software Engineering tại NTTU",
            "Full-stack Web & Mobile Developer"
        ];
    };

    const updateLanguageUI = () => {
        // Translate all static data-i18n attributes
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                el.innerHTML = translations[currentLang][key];
            }
        });

        // Update active class on Lang Switcher Button
        const langToggle = document.getElementById('lang-toggle');
        if (langToggle) {
            langToggle.textContent = currentLang === 'vi' ? 'EN' : 'VI';
        }

        // Trigger updates on dynamically loaded data structures
        renderTimeline();
        renderAbout();
        renderServices();
        renderSkills();
        renderContact();
    };

    /* ==========================================================================
       0. CẬP NHẬT TÊN HIỂN THỊ TOÀN CỤC (DYNAMIC NAME RESOLUTION)
       ========================================================================== */
    const renderGlobalName = () => {
        const globalName = window.USER_NAME;

        // 1. Cập nhật Title của trang web
        document.title = `${globalName} | Personal Portfolio`;

        // 2. Cập nhật các vị trí dynamic-name thông thường
        const nameElements = document.querySelectorAll('.dynamic-name');
        nameElements.forEach(el => {
            el.textContent = globalName;
        });

        // 3. Cập nhật các vị trí dynamic-name chữ IN HOA
        const upperNameElements = document.querySelectorAll('.dynamic-name-upper');
        upperNameElements.forEach(el => {
            el.textContent = globalName.toUpperCase();
        });
    };

    // Chạy render tên ngay lập tức
    renderGlobalName();

    /* ==========================================================================
       0.1. CẬP NHẬT KHỐI CODE MOCKUP Ở HERO (DYNAMIC HERO SNIPPET)
       ========================================================================== */
    const renderHeroSnippet = () => {
        const snippetBody = document.getElementById('hero-snippet-body');
        if (!snippetBody || !window.HERO_SNIPPET_DATA) return;

        const data = window.HERO_SNIPPET_DATA;
        const globalName = window.USER_NAME || "Do Na Tra";

        // Tạo chuỗi HTML cho danh sách kỹ năng
        const skillsHtml = data.skills.map(skill => `<span class="hero__snippet-str">'${skill}'</span>`).join(', ');

        snippetBody.innerHTML = `
            <div class="hero__snippet-line"><span class="hero__snippet-keyword">const</span> <span class="hero__snippet-name">student</span> = {</div>
            <div class="hero__snippet-line hero__snippet-line--indent">name: <span class="hero__snippet-str">'<span class="dynamic-name">${globalName}</span>'</span>,</div>
            <div class="hero__snippet-line hero__snippet-line--indent">university: <span class="hero__snippet-str">'${data.university}'</span>,</div>
            <div class="hero__snippet-line hero__snippet-line--indent">major: <span class="hero__snippet-str">'${data.major}'</span>,</div>
            <div class="hero__snippet-line hero__snippet-line--indent">skills: [${skillsHtml}]</div>
            <div class="hero__snippet-line">};</div>
        `;
    };

    // Chạy render mockup code ngay lập tức
    renderHeroSnippet();

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
    let texts = getHeroTypingTexts(currentLang);
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;
    let typingTimeoutId = null;

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

        typingTimeoutId = setTimeout(typeEffect, typingSpeed);
    };

    const startTyping = () => {
        if (typingTimeoutId) clearTimeout(typingTimeoutId);
        texts = getHeroTypingTexts(currentLang);
        textIndex = 0;
        charIndex = 0;
        isDeleting = false;
        if (typingSpan) {
            typingSpan.textContent = "";
            typeEffect();
        }
    };

    startTyping();


    /* Contact form logic removed as form is deleted */


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
                        // MOBILE: Mở video trực tiếp trên tab mới để trình duyệt phát native
                        if (window.innerWidth <= 768) {
                            window.open(videoSrc, '_blank');
                            return;
                        }

                        // DESKTOP: Hiển thị trong dialog modal
                        const sourceElement = demoVideo.querySelector('source');
                        if (sourceElement && sourceElement.getAttribute('src') !== videoSrc) {
                            sourceElement.setAttribute('src', videoSrc);
                            demoVideo.load();
                        }

                        demoVideo.currentTime = 0;
                        demoDialog.showModal();

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

        // Lấy dữ liệu theo ngôn ngữ hiện tại
        const projectsData = getProjectsData(currentLang);

        // Tạo HTML động từ projectsData
        projectsData.forEach((project) => {
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
                const achievementTag = currentLang === 'en' ? 'Outstanding Achievement' : 'Thành tích nổi bật';
                achievementHtml = `
                    <div class="timeline__achievement">
                        <article class="achievement-card">
                            <div class="achievement-card__header flex-between">
                                <span class="achievement-card__tag">${achievementTag}</span>
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

        const aboutData = getAboutData(currentLang);

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

        const servicesData = getServicesData(currentLang);

        servicesData.forEach((service) => {
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
    const frameworksGrid = document.getElementById('frameworks-grid');
    const softskillsGrid = document.getElementById('softskills-grid');

    const renderSkills = () => {
        // Kết xuất Frameworks & Công nghệ (bên trái)
        if (frameworksGrid && window.ACTIVE_SKILLS && window.AVAILABLE_SKILLS) {
            frameworksGrid.innerHTML = '';
            window.ACTIVE_SKILLS.forEach((id) => {
                const skill = window.AVAILABLE_SKILLS[id];
                if (!skill) return;

                const badgeElement = document.createElement('div');
                badgeElement.className = 'skill-badge';

                badgeElement.innerHTML = `
                    <span class="skill-badge__icon">${skill.icon}</span>
                    <span class="skill-badge__text">${skill.name}</span>
                `;

                frameworksGrid.appendChild(badgeElement);
            });
        }

        // Kết xuất Kỹ năng mềm (bên phải) dạng danh sách liệt kê
        if (softskillsGrid && window.SOFT_SKILLS) {
            softskillsGrid.innerHTML = '';
            const softSkillsData = getSoftSkillsData(currentLang);
            softSkillsData.forEach((skill) => {
                const listItem = document.createElement('li');
                listItem.className = 'skills__list-item';

                listItem.innerHTML = `
                    <span class="skills__list-icon">${skill.icon}</span>
                    <span class="skills__list-text">${skill.name}</span>
                `;

                softskillsGrid.appendChild(listItem);
            });
        }
    };

    /* ==========================================================================
       9. TỰ ĐỘNG KẾT XUẤT LIÊN HỆ (DYNAMIC CONTACT)
       ========================================================================== */
    const contactDesc = document.getElementById('contact-desc');
    const contactList = document.getElementById('contact-list');

    const renderContact = () => {
        if (!window.CONTACT_DATA) return;

        if (contactDesc) {
            contactDesc.textContent = getContactDesc(currentLang);
        }

        if (contactList && window.CONTACT_DATA.items) {
            contactList.innerHTML = '';
            window.CONTACT_DATA.items.forEach((item) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'contact__info-item flex';

                const contactLabel = currentLang === 'en' && item.label === 'Số điện thoại / Zalo' ? 'Phone / Zalo' : item.label;

                itemElement.innerHTML = `
                    <div class="contact__info-icon">${item.icon}</div>
                    <div class="contact__info-content">
                        <span class="contact__info-label">${contactLabel}</span>
                        <a href="${item.url}" target="_blank" rel="noopener" class="contact__info-link">${item.value}</a>
                    </div>
                `;

                contactList.appendChild(itemElement);
            });
        }
    };

    // Khởi chạy kết xuất dòng thời gian dự án tiêu biểu, thông tin giới thiệu, chuyên môn, kỹ năng và liên hệ
    renderTimeline();
    renderAbout();
    renderServices();
    renderSkills();
    renderContact();

    // Lắng nghe sự kiện đổi ngôn ngữ
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'vi' ? 'en' : 'vi';
            localStorage.setItem('lang', currentLang);
            updateLanguageUI();
            startTyping();
        });
    }

    // Khởi chạy đồng bộ hóa ngôn ngữ ban đầu
    updateLanguageUI();

    /* ==========================================================================
       10. HIỆU ỨNG CUỘN TRANG & ACTIVE NAVIGATION spy
       ========================================================================== */
    const navLinks = document.querySelectorAll('.header__link');
    const sections = document.querySelectorAll('section');

    const handleScrollEffects = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset to trigger active state slightly before entry

        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // Hỗ trợ trường hợp cuộn tới cuối trang (Liên hệ) nhưng không đủ chiều cao để đạt trigger
        if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60)) {
            currentSectionId = 'contact';
        }

        navLinks.forEach(link => {
            link.classList.remove('header__link--active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('header__link--active');
            }
        });
    };

    window.addEventListener('scroll', handleScrollEffects);
    handleScrollEffects();

    // Intersection Observer cho hiệu ứng Reveal cuộn trang mượt mà
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal--visible');
            }
        });
    }, {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px"
    });

    const setupScrollReveal = () => {
        // Tự động gán class reveal cho các section và card chính để tạo hiệu ứng chuyển động
        const itemsToReveal = document.querySelectorAll('.about__card, .card-service, .timeline__item, .skills__col, .contact__info, .hero__content, .hero__visual');
        itemsToReveal.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    };

    // Kích hoạt reveal sau khi dữ liệu động render xong hoàn toàn
    setTimeout(setupScrollReveal, 150);

    /* ==========================================================================
       11. BỘ CHUYỂN ĐỔI CHẾ ĐỘ SÁNG/TỐI (THEME TOGGLE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
});
