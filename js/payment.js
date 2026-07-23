const orderId = new URLSearchParams(location.search).get('orderId');

document.getElementById('qr').src =
  'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + orderId;

document.getElementById('payBtn').onclick = async () => {

  await fetch(
    'https://jigu-vend-backend.onrender.com/api/payments/mock-success',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId })
    }
  );

  window.location.href =
    'payment-success.html?orderId=' + orderId;
};