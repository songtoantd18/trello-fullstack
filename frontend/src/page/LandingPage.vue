<template>
  <div class="landing-container">
    <h1>Chào mừng bạn đến với Hệ thống</h1>
    <p>Vui lòng chọn Ứng dụng bạn muốn sử dụng:</p>
    
    <div class="app-choices">
      <div class="app-card blog-card" @click="goToApp('/dashboard')">
        <h2>📝 Ứng dụng Blog</h2>
        <p>Quản lý bài viết và bình luận (App cũ)</p>
      </div>

      <div class="app-card trello-card" @click="goToApp('/trello')">
        <h2>📋 Trello Clone</h2>
        <p>Quản lý công việc Kanban (App mới)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  methods: {
    goToApp(path) {
      this.$router.push(path);
    }
  }
}
</script>

<style scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  font-family: Arial, sans-serif;
}
.app-choices {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}
.app-card {
  width: 250px;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}
.app-card:hover {
  transform: translateY(-10px);
}
.blog-card {
  background-color: #f8f9fa;
  border: 2px solid #007bff;
}
.trello-card {
  background-color: #f8f9fa;
  border: 2px solid #28a745;
}
</style>
