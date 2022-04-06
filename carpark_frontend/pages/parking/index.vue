<template>
  <div class="app-container">
    <div class="content">
      <div class="header">
        <i class="icon pi pi-arrow-left"></i>
        <p class="parking-name">Bãi đỗ xe Vạn Phúc</p>
        <i class="icon pi pi-heart"></i>
      </div>

      <div class="parking-info">
        <div class="status">
          <p class="label">Trạng thái</p>
          <span class="info">6/10</span>
        </div>
        <div class="hours">
          <p class="label">Giờ mở cửa</p>
          <span class="info">6:00-22:00</span>
        </div>
        <div class="maps">
          <p class="label">Chỉ đường</p>
          <i class="icon pi pi-map-marker"></i>
        </div>
      </div>

      <div class="traffic-info">
        <input class="user-name" type="text" placeholder="Họ và tên" />
        <input class="license-plate" type="text" placeholder="Biển số xe" />
        <input class="parking-house" type="text" placeholder="Số giờ gửi" />
      </div>
    </div>
    <div class="btn">
      <button class="submit">Lưu</button>
    </div>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  .header {
    height: 40px;
    background-color: #0074bf;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .parking-name {
    font-size: 18px;
    font-weight: bold;
    color: #fff;
  }

  .parking-info {
    padding: 8px 8px 16px 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .status,
  .hours,
  .maps {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .info {
    color: blue;
  }

  .traffic-info {
    display: flex;
    flex-direction: column;
  }

  .user-name,
  .license-plate,
  .parking-house {
    height: 44px;
    outline: none;
    line-height: 40px;
    border: 1px solid #b3b3b3;
    margin-top: 24px;
    font-size: 16px;
    padding: 0 8px;
  }

  .btn {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .btn .submit {
    width: 100%;
    outline: none;
    background-color: #0074bf;
    margin-top: 12px;
    padding: 14px;
    font-weight: 600;
    color: #fff;
    border: none;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
  }
}
</style>
