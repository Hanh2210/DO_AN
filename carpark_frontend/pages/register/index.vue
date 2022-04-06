<template>
  <div class="app-container">
    <form id="form-1" action="" method="POST" class="form">
      <h3 class="heading">Đăng ký tài khoản</h3>
      <p class="desc">Vui lòng nhập đầy đủ thông tin !</p>
      <div class="spacer"></div>

      <div class="form-group">
        <label for="fullname" class="form-label">Tên đầy đủ</label>
        <input
          id="fullname"
          name="fullname"
          type="text"
          placeholder="VD: Hạnh Nguyễn"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

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

      <div class="form-group">
        <label for="password_confirmation" class="form-label"
          >Nhập lại mật khẩu</label
        >
        <input
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Nhập lại mật khẩu"
          type="password"
          class="form-control"
        />
        <span class="form-message"></span>
      </div>

      <button class="form-submit">Đăng ký</button>
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

  .form .desc {
    text-align: center;
    color: #636d77;
    font-weight: 300;
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
    line-height: 40px;
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
}
</style>
