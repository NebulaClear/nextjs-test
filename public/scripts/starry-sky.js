// public/scripts/starry-sky.js
window.addEventListener('load', function () {
    const canvas = document.getElementById('starry-sky');
    const ctx = canvas.getContext('2d');
  
    // 设置画布尺寸
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    const stars = [];
    const numStars = 200;
  
    // 创建星星对象
    function createStar() {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2;
      const speed = Math.random() * 0.1;
      return { x, y, radius, speed };
    }
  
    // 初始化星星
    for (let i = 0; i < numStars; i++) {
      stars.push(createStar());
    }
  
    // 绘制星星
    function drawStar(star) {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }
  
    // 更新星星位置
    function updateStars() {
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
        }
      }
    }
  
    // 动画循环
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateStars();
      stars.forEach(drawStar);
      requestAnimationFrame(animate);
    }
  
    animate();
  });