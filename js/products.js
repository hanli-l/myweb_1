/**
 * ============================================
 * 产品中心页面JavaScript功能
 * ============================================
 * 包含产品数据、渲染逻辑和交互功能
 * 
 * 优化说明：
 * 1. 图片懒加载 - 使用 IntersectionObserver API
 * 2. 平滑过渡动画 - CSS动画配合JavaScript控制
 * 3. 响应式设计 - 自适应不同屏幕尺寸
 * 4. 性能优化 - 减少DOM操作、优化数据结构
 * 5. 照片展示功能 - 支持多图平铺和全屏查看
 */

/**
 * 产品数据数组 - 结构化存储产品信息
 * @typedef {Object} Product
 * @property {number} id - 产品唯一标识
 * @property {string} name - 产品名称（用于卡片显示）
 * @property {string} category - 产品分类标识（用于筛选）
 * @property {string} categoryLabel - 分类显示名称
 * @property {string} image - 产品主图URL
 * @property {string[]} images - 产品多图数组（用于详情页展示）
 */

const products = [
  {
    id: 1,
    name: '岩板热弯盆机器',
    category: 'living',
    categoryLabel: '岩板热弯盆机器',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
    ]
  },
  {
    id: 2,
    name: '岩板切割机',
    category: 'living',
    categoryLabel: '岩板热弯盆机器',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1546869901-ba9599a7e63c?w=800'
    ]
  },
  {
    id: 3,
    name: '岩板倒角机',
    category: 'living',
    categoryLabel: '岩板热弯盆机器',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=800'
    ]
  },
  {
    id: 4,
    name: '岩板抛光机',
    category: 'bedroom',
    categoryLabel: '岩板深加工机器',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800'
    ]
  },
  {
    id: 5,
    name: '岩板钻孔机',
    category: 'bedroom',
    categoryLabel: '岩板深加工机器',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
    ]
  },
  {
    id: 6,
    name: '岩板磨边机',
    category: 'bedroom',
    categoryLabel: '岩板深加工机器',
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
      'https://images.unsplash.com/photo-1546869901-ba9599a7e63c?w=800',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'
    ]
  },
  {
    id: 7,
    name: '陶瓷切割机',
    category: 'dining',
    categoryLabel: '陶瓷深加工机器',
    image: 'https://images.unsplash.com/photo-1546869901-ba9599a7e63c?w=600',
    images: [
      'https://images.unsplash.com/photo-1546869901-ba9599a7e63c?w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800'
    ]
  },
  {
    id: 8,
    name: '陶瓷抛光机',
    category: 'dining',
    categoryLabel: '陶瓷深加工机器',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=800'
    ]
  },
  {
    id: 9,
    name: '陶瓷倒角机',
    category: 'dining',
    categoryLabel: '陶瓷深加工机器',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800'
    ]
  },
  {
    id: 10,
    name: '岩板水刀机',
    category: 'living',
    categoryLabel: '岩板热弯盆机器',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600',
    images: [
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
      'https://images.unsplash.com/photo-1546869901-ba9599a7e63c?w=800',
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'
    ]
  },
  {
    id: 11,
    name: '岩板真空吸盘',
    category: 'bedroom',
    categoryLabel: '岩板深加工机器',
    image: 'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=600',
    images: [
      'https://images.unsplash.com/photo-1525351326368-efbb5cb6814d?w=800',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800'
    ]
  },
  {
    id: 12,
    name: '陶瓷磨边机',
    category: 'dining',
    categoryLabel: '陶瓷深加工机器',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800',
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800'
    ]
  }
];

/**
 * 当前活跃的分类
 * @type {string}
 */
let activeCategory = 'all';

/**
 * 当前查看的产品
 * @type {Product|null}
 */
let currentProduct = null;

/**
 * 图片懒加载观察者
 * @type {IntersectionObserver|null}
 */
let lazyLoadObserver = null;

/**
 * 初始化图片懒加载
 */
function initLazyLoad() {
  lazyLoadObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        img.src = src;
        
        img.onload = function() {
          img.classList.add('loaded');
          img.style.opacity = '1';
        };
        
        img.onerror = function() {
          img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect fill="%23f3f4f6" width="400" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E';
        };
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px',
    threshold: 0.1
  });
}

/**
 * 渲染产品列表
 * @param {string} category - 分类筛选条件
 */
function renderProducts(category = 'all') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  
  activeCategory = category;
  
  const filteredProducts = category === 'all' 
    ? products 
    : products.filter(product => product.category === category);
  
  const productsHtml = filteredProducts.map(product => `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img 
          data-src="${product.image}" 
          alt="${product.name}" 
          class="lazy-image"
          style="opacity: 0.3;"
        >
        <div class="image-placeholder"></div>
      </div>
      <div class="product-info">
        <div class="product-name">${product.name}</div>
      </div>
    </div>
  `).join('');
  
  grid.innerHTML = productsHtml;
  bindProductClickEvents();
  setupLazyLoadObservations();
}

/**
 * 设置懒加载观察
 */
function setupLazyLoadObservations() {
  if (!lazyLoadObserver) return;
  
  const lazyImages = document.querySelectorAll('img.lazy-image:not([src])');
  lazyImages.forEach(img => {
    lazyLoadObserver.observe(img);
  });
}

/**
 * 绑定产品卡片点击事件
 */
function bindProductClickEvents() {
  const cards = document.querySelectorAll('.product-card');
  
  cards.forEach(card => {
    card.addEventListener('click', function() {
      const productId = parseInt(this.dataset.productId);
      if (!isNaN(productId)) {
        showProductDetail(productId);
      }
    });
  });
}

/**
 * 渲染产品详情照片展示区域
 * @param {Product} product - 产品对象
 */
function renderProductGallery(product) {
  const galleryContainer = document.getElementById('product-gallery');
  if (!galleryContainer) return;
  
  // 如果没有多图，隐藏画廊
  if (!product.images || product.images.length === 0) {
    galleryContainer.style.display = 'none';
    return;
  }
  
  galleryContainer.style.display = 'block';
  
  // 生成缩略图HTML
  const thumbnailsHtml = product.images.map((imgUrl, index) => `
    <div class="gallery-thumbnail" data-index="${index}" onclick="selectGalleryImage(${index})">
      <img 
        data-src="${imgUrl}" 
        alt="产品图片 ${index + 1}" 
        class="lazy-image"
        style="opacity: 0.3;"
        loading="lazy"
      >
      <div class="image-placeholder"></div>
      ${index === 0 ? '<div class="thumbnail-badge">主图</div>' : ''}
    </div>
  `).join('');
  
  galleryContainer.innerHTML = `
    <div class="gallery-main" onclick="openLightbox()">
      <div class="gallery-loading" id="gallery-loading">
        <div class="spinner"></div>
        <div class="loading-text">加载中...</div>
      </div>
      <img id="gallery-main-image" src="${product.images[0]}" alt="产品主图">
      <div class="gallery-overlay">
        <span class="overlay-icon">点击放大</span>
      </div>
    </div>
    <div class="gallery-thumbnails">
      ${thumbnailsHtml}
    </div>
  `;
  
  // 设置主图加载事件
  const mainImage = document.getElementById('gallery-main-image');
  const loadingIndicator = document.getElementById('gallery-loading');
  
  if (mainImage && loadingIndicator) {
    // 确保加载状态初始显示
    loadingIndicator.style.display = 'flex';
    
    mainImage.onload = function() {
      loadingIndicator.style.display = 'none';
    };
    
    mainImage.onerror = function() {
      loadingIndicator.style.display = 'none';
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect fill="%23f3f4f6" width="600" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E';
    };
  }
  
  // 重新设置懒加载观察
  setTimeout(() => {
    setupLazyLoadObservations();
  }, 100);
}

/**
 * 选择画廊图片
 * @param {number} index - 图片索引
 */
function selectGalleryImage(index) {
  if (!currentProduct || !currentProduct.images) return;
  
  const mainImage = document.getElementById('gallery-main-image');
  const loadingIndicator = document.getElementById('gallery-loading');
  
  if (mainImage && loadingIndicator) {
    // 显示加载状态
    loadingIndicator.style.display = 'flex';
    
    // 更新主图
    mainImage.src = currentProduct.images[index];
    
    mainImage.onload = function() {
      loadingIndicator.style.display = 'none';
    };
    
    mainImage.onerror = function() {
      loadingIndicator.style.display = 'none';
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect fill="%23f3f4f6" width="600" height="400"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="16" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E';
    };
  }
  
  // 更新缩略图选中状态
  document.querySelectorAll('.gallery-thumbnail').forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
  
  // 更新当前索引用于全屏查看
  currentLightboxIndex = index;
}

/**
 * 打开全屏查看模式
 */
function openLightbox() {
  if (!currentProduct || !currentProduct.images || currentProduct.images.length === 0) return;
  
  // 创建全屏模态框
  const lightbox = document.createElement('div');
  lightbox.id = 'image-lightbox';
  lightbox.className = 'lightbox-overlay';
  lightbox.innerHTML = `
    <button class="lightbox-close" onclick="closeLightbox()">×</button>
    <button class="lightbox-prev" onclick="navigateLightbox(-1)">‹</button>
    <button class="lightbox-next" onclick="navigateLightbox(1)">›</button>
    <div class="lightbox-content">
      <div class="lightbox-loading" id="lightbox-loading-indicator">
        <div class="spinner"></div>
        <div class="loading-text">加载中...</div>
      </div>
      <img id="lightbox-image" src="${currentProduct.images[currentLightboxIndex]}" alt="全屏查看">
    </div>
    <div class="lightbox-counter">${currentLightboxIndex + 1} / ${currentProduct.images.length}</div>
  `;
  
  document.body.appendChild(lightbox);
  
  // 设置关闭事件
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // 设置键盘导航
  document.addEventListener('keydown', handleLightboxKeydown);
  
  // 设置触摸滑动支持
  const lightboxContent = lightbox.querySelector('.lightbox-content');
  if (lightboxContent) {
    lightboxContent.addEventListener('touchstart', handleTouchStart, { passive: true });
    lightboxContent.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
  
  // 设置图片加载事件
  const lightboxImage = document.getElementById('lightbox-image');
  const loadingIndicator = document.getElementById('lightbox-loading-indicator');
  
  if (lightboxImage && loadingIndicator) {
    loadingIndicator.style.display = 'flex';
    
    lightboxImage.onload = function() {
      loadingIndicator.style.display = 'none';
    };
    
    lightboxImage.onerror = function() {
      loadingIndicator.style.display = 'none';
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%231a1a1a" width="800" height="600"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E';
    };
  }
  
  // 显示模态框
  setTimeout(() => {
    lightbox.classList.add('active');
  }, 50);
}

/**
 * 当前全屏查看索引
 * @type {number}
 */
let currentLightboxIndex = 0;

/**
 * 触摸滑动起始位置
 * @type {number}
 */
let touchStartX = 0;

/**
 * 触摸滑动结束位置
 * @type {number}
 */
let touchEndX = 0;

/**
 * 关闭全屏查看模式
 */
function closeLightbox() {
  const lightbox = document.getElementById('image-lightbox');
  if (lightbox) {
    lightbox.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(lightbox);
    }, 300);
  }
  document.removeEventListener('keydown', handleLightboxKeydown);
}

/**
 * 全屏查看键盘导航
 * @param {KeyboardEvent} e - 键盘事件
 */
function handleLightboxKeydown(e) {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    navigateLightbox(-1);
  } else if (e.key === 'ArrowRight') {
    navigateLightbox(1);
  }
}

/**
 * 触摸开始事件处理
 * @param {TouchEvent} e - 触摸事件
 */
function handleTouchStart(e) {
  touchStartX = e.changedTouches[0].screenX;
}

/**
 * 触摸结束事件处理
 * @param {TouchEvent} e - 触摸事件
 */
function handleTouchEnd(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipeGesture();
}

/**
 * 处理滑动手势
 */
function handleSwipeGesture() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // 向左滑动，显示下一张
      navigateLightbox(1);
    } else {
      // 向右滑动，显示上一张
      navigateLightbox(-1);
    }
  }
}

/**
 * 切换全屏图片
 * @param {number} direction - 方向（-1上一张，1下一张）
 */
function navigateLightbox(direction) {
  if (!currentProduct || !currentProduct.images) return;
  
  const total = currentProduct.images.length;
  currentLightboxIndex = (currentLightboxIndex + direction + total) % total;
  
  const lightboxImage = document.getElementById('lightbox-image');
  const loadingIndicator = document.querySelector('.lightbox-loading');
  const counter = document.querySelector('.lightbox-counter');
  
  if (lightboxImage && loadingIndicator) {
    loadingIndicator.style.display = 'flex';
    lightboxImage.src = currentProduct.images[currentLightboxIndex];
    
    lightboxImage.onload = function() {
      loadingIndicator.style.display = 'none';
    };
    
    lightboxImage.onerror = function() {
      this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600"%3E%3Crect fill="%231a1a1a" width="800" height="600"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E图片加载失败%3C/text%3E%3C/svg%3E';
      loadingIndicator.style.display = 'none';
    };
  }
  
  if (counter) {
    counter.textContent = `${currentLightboxIndex + 1} / ${total}`;
  }
}

/**
 * 显示产品详情
 * @param {number} productId - 产品ID
 */
function showProductDetail(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  
  currentProduct = product;
  
  // 更新产品标题
  const productTitle = document.getElementById('product-title');
  if (productTitle) {
    productTitle.textContent = product.name;
  }
  
  // 更新分类
  const productCategory = document.getElementById('product-category');
  if (productCategory) {
    productCategory.textContent = product.categoryLabel;
  }
  
  // 渲染照片画廊
  renderProductGallery(product);
  
  // 显示详情区域，隐藏列表
  const detailSection = document.getElementById('product-detail');
  const productsGrid = document.getElementById('products-grid');
  
  if (detailSection) {
    detailSection.classList.add('active');
  }
  if (productsGrid) {
    productsGrid.style.display = 'none';
  }
  
  // 平滑滚动
  setTimeout(() => {
    const wrapper = document.querySelector('.products-wrapper');
    if (wrapper) {
      window.scrollTo({ 
        top: wrapper.offsetTop - 100, 
        behavior: 'smooth' 
      });
    }
  }, 50);
}

/**
 * 返回产品列表
 */
function goBackToList() {
  const detailSection = document.getElementById('product-detail');
  const productsGrid = document.getElementById('products-grid');
  
  if (detailSection) {
    detailSection.classList.remove('active');
  }
  if (productsGrid) {
    productsGrid.style.display = 'grid';
  }
  
  currentProduct = null;
}

/**
 * 绑定分类导航点击事件
 */
function bindCategoryEvents() {
  const categoryLinks = document.querySelectorAll('.category-link');
  
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
      
      goBackToList();
      renderProducts(this.dataset.category);
    });
  });
}

/**
 * 初始化产品页面
 */
function initProductsPage() {
  initLazyLoad();
  renderProducts('all');
  bindCategoryEvents();
  console.log('产品中心页面初始化完成');
}

/**
 * 页面加载完成后初始化
 */
document.addEventListener('DOMContentLoaded', function() {
  initProductsPage();
});

/**
 * 页面卸载时清理资源
 */
document.addEventListener('beforeunload', function() {
  if (lazyLoadObserver) {
    lazyLoadObserver.disconnect();
    lazyLoadObserver = null;
  }
});

// 导出函数
window.renderProducts = renderProducts;
window.showProductDetail = showProductDetail;
window.goBackToList = goBackToList;
window.selectGalleryImage = selectGalleryImage;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.navigateLightbox = navigateLightbox;