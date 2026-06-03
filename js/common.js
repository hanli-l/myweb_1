/**
 * ============================================
 * 通用JavaScript功能
 * ============================================
 * 包含所有页面共用的交互逻辑
 */

/**
 * 初始化页面加载完成后的操作
 */
document.addEventListener('DOMContentLoaded', function () {
  // 初始化浮动联系按钮
  initFloatContactBtn();
  
  // 初始化联系模态框
  initContactModal();
  
  // 高亮当前页面导航
  highlightCurrentNav();
});

/**
 * 初始化浮动联系按钮
 */
function initFloatContactBtn() {
  const floatBtn = document.querySelector('.float-btn');
  if (floatBtn) {
    floatBtn.addEventListener('click', openContactModal);
  }
}

/**
 * 打开联系模态框
 */
function openContactModal() {
  const modal = document.querySelector('.contact-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/**
 * 关闭联系模态框
 */
function closeContactModal() {
  const modal = document.querySelector('.contact-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    // 重置表单
    document.getElementById('contact-form')?.reset();
    // 隐藏成功提示
    document.querySelector('.modal-success')?.classList.remove('active');
    document.querySelector('.modal-form')?.classList.remove('hidden');
  }
}

/**
 * 初始化联系模态框事件
 */
function initContactModal() {
  // 关闭按钮
  const closeBtn = document.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeContactModal);
  }
  
  // 点击模态框背景关闭
  const modal = document.querySelector('.contact-modal');
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeContactModal();
      }
    });
  }
  
  // 联系表单提交
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      submitContactForm();
    });
  }
}

/**
 * 提交联系表单
 */
function submitContactForm() {
  // 模拟提交成功
  setTimeout(function () {
    document.querySelector('.modal-form')?.classList.add('hidden');
    document.querySelector('.modal-success')?.classList.add('active');
  }, 500);
}

/**
 * 高亮当前页面导航
 */
function highlightCurrentNav() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('nav a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * 显示成功消息
 * @param {string} message - 成功消息内容
 */
function showSuccessMessage(message) {
  const successEl = document.querySelector('.success-message');
  if (successEl) {
    successEl.textContent = message || '操作成功！';
    successEl.classList.add('active');
    
    // 3秒后隐藏
    setTimeout(() => {
      successEl.classList.remove('active');
    }, 3000);
  }
}
