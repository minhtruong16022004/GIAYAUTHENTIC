// assets/js/main.js - demo cart using localStorage
document.addEventListener('DOMContentLoaded', function(){
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', function(){
      const id = this.dataset.id || 'demo-1';
      const name = this.dataset.name || this.closest('.card').querySelector('h3').innerText;
      const price = parseInt(this.dataset.price || '0',10);
      let cart = JSON.parse(localStorage.getItem('giay_cart')||'[]');
      const found = cart.find(i=>i.id===id);
      if(found){ found.qty += 1; } else { cart.push({id,name,price,qty:1}); }
      localStorage.setItem('giay_cart', JSON.stringify(cart));
      updateCartCount();
      alert('Đã thêm vào giỏ (demo).');
    })
  });
  function updateCartCount(){
    const cart = JSON.parse(localStorage.getItem('giay_cart')||'[]');
    const c = cart.reduce((s,i)=>s+i.qty,0);
    const el = document.getElementById('cart-count');
    if(el) el.innerText = c;
  }
  updateCartCount();
});
