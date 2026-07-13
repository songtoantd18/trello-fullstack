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
              @change="onCardChange($event, list.id)"
            >
              <template #item="{ element: card }">
                <div class="card-item">
                  {{ card.title }}
                </div>
              </template>
            </draggable>

            <div class="add-card-btn" @click="addCard(list.id)">+ Thêm thẻ mới</div>
          </div>
        </div>
      </template>
      <template #footer>
        <div class="add-list-btn" @click="addList">+ Thêm danh sách khác</div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import axios from "axios";
import { io } from "socket.io-client";

export default {
  name: "TrelloBoard",
  components: {
    draggable,
  },
  data() {
    return {
      boardId: null, // Sẽ lấy từ DB
      lists: [],
      socket: null,
    };
  },
  async created() {
    await this.fetchBoardData();
    this.setupWebSocket();
  },
  beforeUnmount() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
  methods: {
    setupWebSocket() {
      // Kết nối tới server NestJS
      this.socket = io("http://localhost:3000");
      
      this.socket.on("connect", () => {
        console.log("Đã kết nối WebSockets với Server!");
        // Báo cho server biết mình đang xem board nào
        this.socket.emit("joinBoard", this.boardId);
      });

      // Lắng nghe sự kiện người khác kéo thả
      this.socket.on("cardMovedToClient", (payload) => {
        console.log("Nhận dữ liệu realtime người khác vừa kéo thả:", payload);
        // Refresh lại dữ liệu ngay lập tức để đồng bộ
        this.fetchBoardData();
      });
    },
    async fetchBoardData() {
      try {
        // Tạm hardcode userId = 1 để lấy/tạo board đầu tiên
        // Trong thực tế, bạn sẽ gửi kèm Token ở headers
        const boardRes = await axios.get("http://localhost:3000/trello-board");
        let board = boardRes.data[0];
        
        // Nếu chưa có board nào, tự động tạo 1 cái
        if (!board) {
          const newBoard = await axios.post("http://localhost:3000/trello-board", { title: "Dự án mới" });
          board = newBoard.data;
          
          // Tạo 3 cột mặc định
          await axios.post("http://localhost:3000/trello-list", { boardId: board.id, title: "To Do", position: 0 });
          await axios.post("http://localhost:3000/trello-list", { boardId: board.id, title: "Doing", position: 1 });
          await axios.post("http://localhost:3000/trello-list", { boardId: board.id, title: "Done", position: 2 });
        }

        this.boardId = board.id;
        
        // Lấy danh sách lists kèm cards
        const listsRes = await axios.get(`http://localhost:3000/trello-list/board/${this.boardId}`);
        this.lists = listsRes.data;
      } catch (error) {
        console.error("Lỗi lấy dữ liệu bảng:", error);
      }
    },
    async addList() {
      const title = prompt("Nhập tên danh sách:");
      if (!title) return;
      try {
        await axios.post("http://localhost:3000/trello-list", { 
          boardId: this.boardId, 
          title, 
          position: this.lists.length 
        });
        this.fetchBoardData(); // Reload lại dữ liệu
      } catch (error) {
        console.error("Lỗi tạo list:", error);
      }
    },
    async addCard(listId) {
      const title = prompt("Nhập tên thẻ công việc:");
      if (!title) return;
      try {
        const list = this.lists.find(l => l.id === listId);
        await axios.post("http://localhost:3000/trello-card", { 
          listId, 
          title, 
          position: list.cards.length 
        });
        this.fetchBoardData(); // Reload lại dữ liệu
      } catch (error) {
        console.error("Lỗi tạo card:", error);
      }
    },
    async onCardChange(evt, targetListId) {
      // Bắt sự kiện 'added' (khi kéo 1 card từ cột khác vào cột này)
      // hoặc 'moved' (khi sắp xếp lại thứ tự trong cùng 1 cột)
      if (evt.added || evt.moved) {
        const element = evt.added ? evt.added.element : evt.moved.element;
        const newIndex = evt.added ? evt.added.newIndex : evt.moved.newIndex;
        
        try {
          await axios.put(`http://localhost:3000/trello-card/${element.id}/position`, {
            newListId: targetListId,
            newPosition: newIndex
          });
          console.log(`Đã lưu vị trí card ${element.id} vào DB`);

          // Bắn sự kiện realtime cho các màn hình khác update
          this.socket.emit("cardMoved", {
            boardId: this.boardId,
            cardId: element.id,
            newListId: targetListId,
            newPosition: newIndex
          });

        } catch (error) {
          console.error("Lỗi lưu vị trí card:", error);
        }
      }
    }
  }
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
  min-height: 20px;
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

.add-card-btn, .add-list-btn {
  color: #5e6c84;
  cursor: pointer;
  padding: 8px;
  border-radius: 3px;
}
.add-card-btn:hover {
  background-color: rgba(9,30,66,.08);
  color: #172b4d;
}
.add-list-btn {
  background-color: rgba(255,255,255,0.2);
  color: white;
  min-width: 250px;
}
.add-list-btn:hover {
  background-color: rgba(255,255,255,0.3);
}
</style>
