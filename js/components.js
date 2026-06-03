/**
 * ============================================
 * 页面组件复用模块
 * ============================================
 * 提供导航栏、底部信息栏等公共组件的HTML结构和渲染逻辑
 */

/**
 * EmailJS配置常量
 * @constant {Object}
 */
const EMAILJS_CONFIG = {
  PUBLIC_KEY: 'zovN2ceDxO5PBgCrk',
  SERVICE_ID: 'service_gq4unos',
  TEMPLATE_ID: 'template_saszc21'
};

/**
 * 导航栏HTML结构
 * @constant {string}
 */
const headerHTML = `
<header>
  <div class="nav-container">
    <div class="logo">
      <div class="logo-icon">YJ</div>
      <a href="index.html" style="text-decoration: none; color: #2563eb;">翔腾机械</a>
    </div>
    <nav>
      <a href="index.html" data-page="index" >Home</a>
      <a href="products.html" data-page="products">Product</a>
      <a href="about.html" data-page="about">About</a>
      <a href="contact.html" data-page="contact">Contact</a>
      <a href="booking.html" class="btn-book" data-page="booking">Booking</a>
    </nav>
  </div>
</header>
`;

/**
 * 底部信息栏HTML结构
 * @constant {string}
 */
const footerHTML = `
<footer>
  <div class="footer-container">
    <div>
      <div class="footer-logo">翔腾机械</div>
      <p class="footer-contact">Phone：400-888-8888</p>
      <p class="footer-contact">Email：contact@yajufurniture.com</p>
    </div>
    <div class="footer-links">
      <h4>Quick Links</h4>
      <a href="index.html">Home</a>
      <a href="products.html">Product </a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </div>
    <div class="footer-links">
      <h4>LOCATIONS</h4>
      <div class="map-container">
        <iframe
          width="100%"
          height="150"
          style="border:0;"
          loading="lazy"
          allowfullscreen
          referrerpolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=22.9465620569358, 113.09033976207228&z=15&hl=zh-CN&output=embed">
        </iframe>
      </div>
    </div>
  </div>
</footer>
`;

/**
 * 浮动联系按钮HTML结构
 * @constant {string}
 */
const floatButtonHTML = `
<div class="float-btn" onclick="openContactModal()">
  <span >📞</span>
</div>
`;

/**
 * 联系模态框HTML结构（带EmailJS集成）
 * @constant {string}
 */
const contactModalHTML = `
<div class="contact-modal">
  <div class="modal-content">
    <div class="modal-header">
      <h3>Contact</h3>
      <span class="modal-close" onclick="closeContactModal()">×</span>
    </div>
    <div class="modal-form">
      <form id="contact-form">
        <input type="hidden" name="user_from" value="机械工厂">
        <div class="form-group">
          <label>name <span class="required">*</span></label>
          <input type="text" name="user_name" required>
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label>Phone</label>
          <input type="tel" name="user_phone">
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label>Email <span class="required">*</span></label>
          <input type="email" name="user_email" required>
          <span class="error-message"></span>
        </div>
        <div class="form-group">
          <label>Message<span class="required">*</span></label>
          <textarea name="user_message" rows="3" required></textarea>
          <span class="error-message"></span>
        </div>
        <button type="submit" class="btn-submit" id="contact-submit-btn">
          <span class="btn-text">Submit</span>
          <span class="btn-loading" style="display: none;">Sending...</span>
        </button>
        <span class="form-error" id="form-error"></span>
      </form>
    </div>
    <div class="modal-success">
      <i>✓</i>
      <h3>Success!</h3>
      <p>Will contact you soon</p>
    </div>
  </div>
</div>
`;

/**
 * 渲染导航栏
 * @param {string} currentPage - 当前页面标识，用于高亮当前导航项
 */
function renderHeader(currentPage) {
  const headerContainer = document.getElementById('header-container');
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
    // 高亮当前页面导航项
    const navLinks = document.querySelectorAll('nav a[data-page]');
    navLinks.forEach(link => {
      if (link.dataset.page === currentPage) {
        link.classList.add('active');
      }
    });
  }
}

/**
 * 渲染底部信息栏
 */
function renderFooter() {
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }
}

/**
 * 渲染浮动联系按钮
 */
function renderFloatButton() {
  const floatContainer = document.getElementById('float-container');
  if (floatContainer) {
    floatContainer.innerHTML = floatButtonHTML;
  }
}

/**
 * 渲染联系模态框
 */
function renderContactModal() {
  const modalContainer = document.getElementById('modal-container');
  if (modalContainer) {
    modalContainer.innerHTML = contactModalHTML;
  }
}

/**
 * 初始化页面公共组件
 * @param {string} currentPage - 当前页面标识
 */
function initPageComponents(currentPage) {
  renderHeader(currentPage);
  renderFooter();
  renderFloatButton();
  renderContactModal();
  initContactModal();
  
  // 初始化EmailJS
  initEmailJS();
}

/**
 * 初始化EmailJS服务
 */
function initEmailJS() {
  if (window.emailjs) {
    window.emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
}

/**
 * 表单验证函数
 * @param {Object} formData - 表单数据对象
 * @returns {Object} - 验证结果对象
 */
function validateForm(formData) {
  const errors = {};
  
  // 验证姓名（必填）
  if (!formData.user_name || formData.user_name.trim() === '') {
    errors.user_name = '请输入姓名';
  }
  
  // 验证电话（非必填，但如果填写则需验证格式）
  // 支持国际电话号码格式，包括各种区号、格式和长度
  if (formData.user_phone && formData.user_phone.trim() !== '') {
    // 提取纯数字部分进行验证
    const digits = formData.user_phone.replace(/\D/g, '');
    // 国际电话号码通常包含6-15位数字
    if (digits.length < 6 || digits.length > 15) {
      errors.user_phone = '请输入有效的电话号码';
    }
  }
  
  // 验证邮箱（必填）
  if (!formData.user_email || formData.user_email.trim() === '') {
    errors.user_email = '请输入邮箱地址';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.user_email.trim())) {
      errors.user_email = '请输入有效的邮箱地址';
    }
  }
  
  // 验证留言内容（必填）
  if (!formData.user_message || formData.user_message.trim() === '') {
    errors.user_message = '请输入留言内容';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
}

/**
 * 显示表单错误
 * @param {Object} errors - 错误对象
 */
function showFormErrors(errors) {
  // 清除之前的错误
  document.querySelectorAll('.error-message').forEach(el => {
    el.textContent = '';
    el.style.display = 'none';
  });
  document.querySelectorAll('.form-group').forEach(el => el.classList.remove('has-error'));
  
  // 显示新错误
  for (const [field, message] of Object.entries(errors)) {
    const errorEl = document.querySelector(`input[name="${field}"] + .error-message, textarea[name="${field}"] + .error-message`);
    const groupEl = document.querySelector(`input[name="${field}"]`).closest('.form-group');
    
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
    if (groupEl) {
      groupEl.classList.add('has-error');
    }
  }
}

/**
 * 通过EmailJS发送邮件
 * @param {Object} formData - 表单数据对象
 * @returns {Promise} - 返回Promise
 */
function sendEmail(formData) {
  return new Promise((resolve, reject) => {
    if (!window.emailjs) {
      reject(new Error('EmailJS服务未加载'));
      return;
    }
    
    window.emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      {
        user_name: formData.user_name,
        user_phone: formData.user_phone,
        user_email: formData.user_email,
        user_message: formData.user_message,
        user_from: formData.user_from || '机械工厂'
      }
    )
    .then(response => {
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(new Error('邮件发送失败'));
      }
    })
    .catch(error => {
      reject(error);
    });
  });
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
    const form = document.getElementById('contact-form');
    if (form) form.reset();
    // 隐藏成功提示
    const successEl = document.querySelector('.modal-success');
    const formEl = document.querySelector('.modal-form');
    if (successEl) successEl.classList.remove('active');
    if (formEl) formEl.classList.remove('hidden');
    // 清除错误
    showFormErrors({});
    document.getElementById('form-error').textContent = '';
    // 恢复按钮状态
    const submitBtn = document.getElementById('contact-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').style.display = 'inline';
      submitBtn.querySelector('.btn-loading').style.display = 'none';
    }
  }
}

/**
 * 初始化联系模态框事件
 */
function initContactModal() {
  // 点击模态框背景关闭
  const modal = document.querySelector('.contact-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeContactModal();
      }
    });
  }

  // 表单提交
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // 获取表单数据
      const formData = {
        user_name: this.user_name.value.trim(),
        user_phone: this.user_phone.value.trim(),
        user_email: this.user_email.value.trim(),
        user_message: this.user_message.value.trim(),
        user_from: this.user_from ? this.user_from.value : '机械工厂'
      };
      
      // 表单验证
      const validation = validateForm(formData);
      if (!validation.isValid) {
        showFormErrors(validation.errors);
        return;
      }
      
      // 清除之前的错误
      showFormErrors({});
      document.getElementById('form-error').textContent = '';
      
      // 设置加载状态
      const submitBtn = document.getElementById('contact-submit-btn');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
      
      try {
        // 发送邮件
        await sendEmail(formData);
        
        // 显示成功提示
        const formEl = document.querySelector('.modal-form');
        const successEl = document.querySelector('.modal-success');
        if (formEl) formEl.classList.add('hidden');
        if (successEl) successEl.classList.add('active');
        
      } catch (error) {
        // 显示错误提示
        const errorEl = document.getElementById('form-error');
        if (errorEl) {
          errorEl.textContent = '提交失败，请稍后重试或直接拨打客服电话 400-888-8888';
        }
        console.error('EmailJS Error:', error);
      } finally {
        // 恢复按钮状态
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
      }
    });
  }
}

/**
 * 初始化联系页面表单（单独页面的表单）
 * @param {string} formId - 表单ID
 * @param {string} successMsgId - 成功提示消息ID
 */
function initContactPageForm(formId, successMsgId) {
  const form = document.getElementById(formId);
  if (!form) return;
  
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 获取表单数据
    const formData = {
      user_name: this.user_name.value.trim(),
      user_phone: this.user_phone.value.trim(),
      user_email: this.user_email.value.trim(),
      user_message: this.user_message.value.trim(),
      user_from: this.user_from ? this.user_from.value : '机械工厂'
    };
    
    // 表单验证
    const validation = validateForm(formData);
    if (!validation.isValid) {
      showFormErrors(validation.errors);
      return;
    }
    
    // 清除之前的错误
    showFormErrors({});
    
    // 设置加载状态
    const submitBtn = this.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
      // 发送邮件
      await sendEmail(formData);
      
      // 显示成功提示
      const successEl = document.getElementById(successMsgId);
      if (successEl) {
        successEl.classList.add('active');
      }
      
      // 重置表单
      this.reset();
      
      // 3秒后隐藏成功提示
      setTimeout(() => {
        const successEl = document.getElementById(successMsgId);
        if (successEl) {
          successEl.classList.remove('active');
        }
      }, 3000);
      
    } catch (error) {
      // 显示错误提示
      alert('Failed to submit, please try again later or call customer service at 400-888-8888');
      console.error('EmailJS Error:', error);
    } finally {
      // 恢复按钮状态
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}