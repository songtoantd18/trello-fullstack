<template>
  <div class="board-container">
    <div class="board-header">
      <h2>📋 Trello Board</h2>
      <button class="back-btn" @click="$router.push('/')">🔙 Trở về</button>
    </div>

    <!-- Drag zone cho các List ngang (Cột) -->
    <draggable
      v-model="lists"
      group="lists"
      item-key="id"
      class="board-lists"
      direction="horizontal"
    >
      <template #item="{ element: list }">
        <div class="list-wrapper">
          <div class="list-content">
            <h3 class="list-title">{{ list.title }}</h3>
            
            <!-- Drag zone cho các Card bên trong một List -->
            <draggable
              v-model="list.cards"
              group="cards"
              item-key="id"
              class="card-list"
            >
              <template #item="{ element: card }">
                <div class="card-item">
                  {{ card.title }}
                </div>
              </template>
            </draggable>

            <div class="add-card-btn">+ Thêm thẻ mới</div>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "TrelloBoard",
  components: {
    draggable,
  },
  data() {
    return {
      // Dữ liệu giả (Mock data) để test kéo thả
      lists: [
        {
          id: 1,
          title: "To Do",
          cards: [
            { id: 101, title: "Học Vue.js Options API" },
            { id: 102, title: "Làm Backend NestJS" },
          ],
        },
        {
          id: 2,
          title: "Doing",
          cards: [
            { id: 201, title: "Tích hợp Drag and Drop" },
          ],
        },
        {
          id: 3,
          title: "Done",
          cards: [
            { id: 301, title: "Thiết kế Landing Page" },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.board-container {
  height: 100vh;
  background-color: #0079bf;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.board-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 20px;
}

.back-btn {
  padding: 8px 16px;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.back-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.board-lists {
  display: flex;
  overflow-x: auto;
  align-items: flex-start;
  height: 100%;
}

.list-wrapper {
  width: 272px;
  margin-right: 10px;
  flex-shrink: 0;
}

.list-content {
  background-color: #ebecf0;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  padding: 10px;
}

.list-title {
  margin: 0 0 10px 0;
  font-size: 16px;
  font-weight: bold;
}

.card-list {
  min-height: 20px; /* Bắt buộc để có thể thả thẻ vào cột trống */
}

.card-item {
  background-color: white;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgba(9,30,66,.25);
  cursor: grab;
  margin-bottom: 8px;
  max-width: 300px;
  min-height: 20px;
  padding: 10px;
  font-size: 14px;
}

.card-item:active {
  cursor: grabbing;
}

.add-card-btn {
  color: #5e6c84;
  cursor: pointer;
  padding: 8px;
  border-radius: 3px;
}
.add-card-btn:hover {
  background-color: rgba(9,30,66,.08);
  color: #172b4d;
}
</style>
