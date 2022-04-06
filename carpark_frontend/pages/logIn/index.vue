<template>
  <div class="app-container">
    <form id="form-1" action="" method="POST" class="form">
      <h3 class="heading">Car Parking</h3>
      <div class="spacer"></div>

      <div class="form-group">
        <label for="sdt" class="form-label">Số điện thoại</label>
        <input
          id="sdt"
          name="sdt"
          type="text"
          placeholder="VD: 0971766370"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

      <div class="form-group">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

      <button class="form-submit">Đăng nhập</button>
      <div class="bottom">
        <p>Bạn chưa có tài khoản?</p>
        <NuxtLink to="/register">Vui lòng đăng ký tại đây!</NuxtLink>
      </div>
    </form>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 600px) {
  .app-container {
    height: 100vh;
    background-color: #f8f8f8;
  }

  .form {
    padding: 32px 24px;
    text-align: center;
    align-self: center;
  }

  .form .heading {
    font-size: 32px;
    font-weight: 700;
  }

  .form-group {
    display: flex;
    margin-bottom: 16px;
    flex-direction: column;
  }

  .form-label,
  .form-message {
    text-align: left;
  }

  .form-label {
    font-weight: 700;
    padding-bottom: 6px;
    line-height: 18px;
    font-size: 18px;
  }

  .form-control {
    height: 24px;
    padding: 8px;
    border: 1px solid #b3b3b3;
    border-radius: 3px;
    outline: none;
    font-size: 16px;
  }

  .form-control:hover {
    border-color: #1dbfaf;
  }

  .form-group.invalid .form-control {
    border-color: #f33a58;
  }

  .form-group.invalid .form-message {
    color: #f33a58;
  }

  .form-message {
    font-size: 12px;
    line-height: 16px;
    padding: 12px 0 0;
  }

  .form-submit {
    outline: none;
    background-color: #0074bf;
    margin-top: 12px;
    padding: 14px;
    font-weight: 600;
    color: #fff;
    border: none;
    width: 100%;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
  }

  .disabled {
    cursor: default;
    background-color: #ccc;
  }

  .spacer {
    margin-top: 100px;
  }

  .bottom {
    margin-top: 32px;
  }
}
</style>
