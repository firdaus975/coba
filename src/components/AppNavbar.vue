<template>
  <div>
    <nav
      class="navbar is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" :to="{ name: 'home' }">
            Code Image
          </router-link>

          <a
            role="button"
            class="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start"></div>

          <div class="navbar-end">
            <router-link :to="{ name: 'home' }" class="navbar-item">
              Home
            </router-link>
            <router-link :to="{ name: 'codeList' }" class="navbar-item">
              Code List
            </router-link>
            <div class="navbar-item">
              <div class="buttons">
                <router-link :to="{ name: 'logout' }" class="button is-danger">
                  Logout
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "app-navbar",
};
</script>

<style scoped>
.navbar {
  background-color: #0078d7;
}

.navbar-item {
  color: white;
}
</style>