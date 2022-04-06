<template>
  <div class="app-container">
    <div class="header">
      <div class="icons">
        <i class="icon pi pi-bars"></i>
        <i class="icon pi pi-bell"></i>
      </div>
    </div>
    <div class="content">
      <div class="search">
        <i class="icon-search pi pi-search"></i>
        <input class="input-search" placeholder="Nhập địa điểm" type="text" />
      </div>
      <div class="maps">đây là gg maps</div>
    </div>
  </div>
</template>
<style scoped>
@media only screen and (max-width: 600px) {
  .header {
    height: 40px;
    background-color: #0074bf;
    padding: 8px;
  }

  .header .icons {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .search {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
  }

  .icon-search {
    left: 8px;
    z-index: 2;
    position: absolute;
  }

  .input-search {
    outline: none;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    padding: 10px 10px 10px 40px;
  }

  .maps {
    height: 100%;
    background-color: violet;
  }
}
</style>
