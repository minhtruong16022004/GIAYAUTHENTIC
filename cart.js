// Lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Hàm hiển thị giỏ hàng
function renderCart() {
  const tbody = document.querySelector('#cart-table tbody');
  tbody.innerHTML = ''; // Xóa bảng cũ
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>₫${item.price.toLocaleString()}</td>
      <td><input type="number" min="1" value="${item.quantity}" data-index="${index}" style="width:50px"></td>
      <td>₫${itemTotal.toLocaleString()}</td>
      <td><button class="btn remove" data-index="${index}">Xóa</button></td>
    `;
    tbody.appendChild(tr);
  });

  // Cập nhật tổng tiền
  document.getElementById('cart-total').textContent = `Tổng: ₫${total.toLocaleString()}`;

  // Sự kiện thay đổi số lượng
  document.querySelectorAll('input[type=number]').forEach(input => {
    input.addEventListener('change', e => {
      const i = e.target.dataset.index;
      cart[i].quantity = parseInt(e.target.value);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });

  // Sự kiện xóa sản phẩm
  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const i = e.target.dataset.index;
      cart.splice(i, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

// Chạy hiển thị giỏ hàng khi load trang
renderCart();
