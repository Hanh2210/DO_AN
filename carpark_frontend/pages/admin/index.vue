<template>
  <div class="main">
    <div class="header">
      <div class="close">
        <i class="icon pi pi-times"></i>
      </div>
      <div class="wrap">
        <div class="avt"></div>
        <div class="username">Admin</div>
        <div class="phone">0971766370</div>
      </div>
    </div>
    <div class="content">
      <div class="menu">
        <ul class="list">
          <li>
            <i class="icon icon-style pi pi-th-large"></i>
            <NuxtLink to="/users">Quản lý bãi đỗ xe</NuxtLink>
          </li>
          <li>
            <i class="icon icon-style pi pi-users"></i>
            <NuxtLink to="/">Quản lý người dùng</NuxtLink>
          </li>
          <li>
            <i class="icon icon-style pi pi-sign-out"></i>
            <NuxtLink to="/login">Đăng xuất</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .main {
    display: flex;
    flex-direction: column;
  }
  .header {
    background-color: #0074bf;
  }

  .close {
    padding: 4px;
    display: flex;
    flex-direction: row-reverse;
  }

  .wrap {
    width: 100%;
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .avt {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #f8f8f8;
  }

  .username,
  .phone {
    font-size: 18px;
    font-weight: bold;
    margin-top: 12px;
    color: #f8f8f8;
  }

  .content {
    height: calc(100vh - 180px - 28px);
    background-color: #ccc;
  }

  .menu {
    padding: 12px;
  }

  .list > li {
    list-style: none;
    display: block;
    padding: 20px;
  }

  .list > li > a {
    font-size: 18px;
    color: #000;
    text-decoration: none;
  }

  .icon-style {
    margin-right: 10px;
  }
}
</style>
