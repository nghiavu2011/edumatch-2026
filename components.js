/* components.js - Reusable Web Components for NM Studio Ecosystem */

// ==========================================
// 1. NMStudioHeader
// ==========================================
class NMStudioHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <header class="nm-header">
                <div class="nm-header-container">
                    <!-- Left: Logo & Brand -->
                    <a href="/" class="nm-brand">
                        <img src="logo.png" alt="NM Studio Logo" class="nm-logo">
                        <div class="nm-brand-text">
                            <span class="nm-parent">NM Studio</span>
                            <span class="nm-sep">/</span>
                            <span class="nm-app-name">EduMatch 2026</span>
                        </div>
                    </a>

                    <!-- Right: Actions (Theme Toggle & Google Sign-In) -->
                    <div class="nm-header-actions">
                        <div class="nm-actions-group">
                            <!-- Help Button -->
                            <button id="help-btn" class="icon-btn" title="Hướng dẫn sử dụng">
                                <i data-lucide="help-circle"></i>
                            </button>

                            <!-- Theme Toggle -->
                            <button id="theme-toggle" class="icon-btn nm-theme-btn" title="Chuyển chế độ Sáng/Tối">
                                <i data-lucide="sun" class="sun-icon"></i>
                                <i data-lucide="moon" class="moon-icon"></i>
                            </button>
                            
                            <!-- Google Sign-In Area -->
                            <div id="google-auth-container" style="display: flex; align-items: center; gap: 8px;">
                                <div id="g_id_onload"
                                     data-client_id="YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com"
                                     data-callback="handleCredentialResponse"
                                     data-auto_prompt="false">
                                </div>
                                <div class="g_id_signin" data-type="standard" data-shape="pill" data-theme="filled_blue" data-text="signin_with" data-size="large" data-logo_alignment="left"></div>
                                <button onclick="handleMockLogin()" class="nm-demo-btn" title="Đăng nhập nhanh không cần tài khoản">
                                    <i data-lucide="sparkles"></i> Demo
                                </button>
                            </div>
                            
                            <!-- Logged In User Widget -->
                            <div id="user-widget" class="user-widget hidden">
                                <img id="user-avatar" src="" alt="Avatar" class="avatar">
                                <div class="user-info">
                                    <span id="user-name" class="user-name">Người dùng</span>
                                    <span class="user-role">Học sinh</span>
                                </div>
                                <button id="logout-btn" class="icon-btn" title="Đăng xuất">
                                    <i data-lucide="log-out"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        `;
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}
customElements.define("nm-studio-header", NMStudioHeader);


// ==========================================
// 2. AIDisclaimerAccordion
// ==========================================
class AIDisclaimerAccordion extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initAccordion();
    }

    render() {
        this.innerHTML = `
            <div class="nm-accordion">
                <button class="nm-accordion-header" type="button">
                    <span>Miễn trừ trách nhiệm AI</span>
                    <i data-lucide="chevron-down" class="nm-accordion-chevron"></i>
                </button>
                <div class="nm-accordion-content">
                    <div class="nm-accordion-body">
                        Các nội dung, hình ảnh, video, dữ liệu, gợi ý hoặc phản hồi được tạo ra bởi công cụ thuộc hệ sinh thái NM Studio có thể được xử lý thông qua các mô hình trí tuệ nhân tạo và/hoặc dịch vụ AI của bên thứ ba. Kết quả do AI tạo ra chỉ có giá trị tham khảo, hỗ trợ sáng tạo, phân tích hoặc đề xuất ý tưởng ban đầu. NM Studio không cam kết rằng mọi nội dung được tạo ra luôn chính xác, đầy đủ, cập nhật, phù hợp pháp luật, phù hợp bản quyền, phù hợp tiêu chuẩn chuyên môn hoặc phù hợp với mọi mục đích sử dụng cụ thể. Người dùng có trách nhiệm tự kiểm tra, đánh giá, biên tập, xác minh và phê duyệt kết quả trước khi sử dụng cho mục đích thương mại, truyền thông, thiết kế, pháp lý, giáo dục, y tế, tài chính, xây dựng hoặc các mục đích quan trọng khác. NM Studio không chịu trách nhiệm đối với bất kỳ tổn thất, thiệt hại, tranh chấp, khiếu nại, chi phí, trách nhiệm pháp lý hoặc hệ quả nào phát sinh từ việc người dùng sử dụng trực tiếp hoặc gián tiếp các kết quả do AI tạo ra mà không có sự kiểm duyệt phù hợp.
                    </div>
                </div>
            </div>
        `;
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initAccordion() {
        const header = this.querySelector(".nm-accordion-header");
        const content = this.querySelector(".nm-accordion-content");
        const chevron = this.querySelector(".nm-accordion-chevron");

        if (header && content) {
            header.addEventListener("click", () => {
                const isOpen = content.classList.contains("open");
                if (isOpen) {
                    content.classList.remove("open");
                    chevron.style.transform = "rotate(0deg)";
                } else {
                    content.classList.add("open");
                    chevron.style.transform = "rotate(180deg)";
                }
            });
        }
    }
}
customElements.define("ai-disclaimer-accordion", AIDisclaimerAccordion);


// ==========================================
// 3. NMStudioFooter
// ==========================================
class NMStudioFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.initContactAccordion();
    }

    render() {
        this.innerHTML = `
            <footer class="nm-footer">
                <div class="nm-footer-container">
                    <!-- Brand Section -->
                    <div class="nm-footer-brand">
                        <div class="nm-footer-logo-row">
                            <img src="logo.png" alt="NM Studio Logo" class="nm-logo">
                            <h3>NM Studio</h3>
                        </div>
                        <p class="nm-footer-tagline">Design &bull; AI &bull; Visualization &bull; Digital Tools</p>
                    </div>

                    <!-- Contact Section (Collapsible Accordion) -->
                    <div class="nm-footer-contact nm-accordion">
                        <button class="nm-accordion-header nm-contact-header" type="button">
                            <span>THÔNG TIN LIÊN HỆ</span>
                            <i data-lucide="chevron-down" class="nm-accordion-chevron nm-contact-chevron"></i>
                        </button>
                        <div class="nm-accordion-content nm-contact-content">
                            <div class="nm-accordion-body">
                                <p><strong>Địa chỉ:</strong> Số 10 ngõ 142 Hào Nam, Đống Đa, Hà Nội</p>
                                <p><strong>Hotline:</strong> 0985578385</p>
                                <p><strong>Email:</strong> <a href="mailto:nghiavu2011@gmail.com">nghiavu2011@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- AI Disclaimer Accordion -->
                <div class="nm-footer-disclaimer">
                    <ai-disclaimer-accordion></ai-disclaimer-accordion>
                </div>

                <!-- Copyright Bar -->
                <div class="nm-footer-bottom">
                    <p>&copy; 2026 NM Studio. All rights reserved.</p>
                </div>
            </footer>
        `;
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    initContactAccordion() {
        const header = this.querySelector(".nm-contact-header");
        const content = this.querySelector(".nm-contact-content");
        const chevron = this.querySelector(".nm-contact-chevron");

        if (header && content) {
            header.addEventListener("click", () => {
                const isOpen = content.classList.contains("open");
                if (isOpen) {
                    content.classList.remove("open");
                    chevron.style.transform = "rotate(0deg)";
                } else {
                    content.classList.add("open");
                    chevron.style.transform = "rotate(180deg)";
                }
            });
        }
    }
}
customElements.define("nm-studio-footer", NMStudioFooter);
