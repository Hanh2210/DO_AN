<template>
  <div class="app-container">
    <div class="content">
      <div class="header">
        <i class="icon pi pi-arrow-left"></i>
        <p class="title">Thêm bãi đỗ xe mới</p>
      </div>
      <div class="parking-info">
        <div class="parking-name">
          <i class="icon pi pi-tag"></i>
          <div class="desc">
            <p class="label">Nhập tên bãi đỗ xe</p>
            <input class="input-title" type="text" />
          </div>
        </div>

        <div class="parking-place">
          <i class="icon pi pi-map-marker"></i>
          <div class="desc">
            <p class="label">Nhập địa chỉ</p>
            <input class="input-title" type="text" />
          </div>
        </div>

        <div class="parking-time">
          <i class="icon pi pi-clock"></i>
          <div class="desc">
            <p class="label">Nhập giờ mở cửa</p>
            <input class="input-title" type="text" />
          </div>
        </div>

        <div class="parking-slot">
          <i class="icon pi pi-table"></i>
          <div class="desc">
            <p class="label">Nhập số lượng trống</p>
            <input class="input-title" type="text" />
          </div>
        </div>
      </div>
    </div>

    <div class="button">
      <button class="btn cancel">Hủy</button>
      <button class="btn save">Lưu</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  height: 40px;
  background-color: #0074bf;
  padding: 8px;
  display: flex;
  align-items: center;
}

.header .title {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-left: 100px;
}

.parking-name,
.parking-place,
.parking-time,
.parking-slot {
  display: flex;
  align-items: center;
  padding: 20px 12px 12px 12px;
  margin-bottom: 26px;
}

.desc {
  margin-left: 12px;
  flex: 2;
}
.label {
  color: red;
  margin: 0;
  font-size: 12px;
}
.input-title {
  height: 30px;
  width: 100%;
  outline: 0;
  border: 0;
  border-bottom: 1px solid #ccc;
}

.button {
  position: absolute;
  bottom: 0;
  padding: 6px 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
