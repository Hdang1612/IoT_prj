// src/services/WebSocketService.js

class WebSocketService {
  constructor() {
    this.socket = null;
    this.messageCallbacks = []; // Danh sách các callback
  }

  connect(url) {
    if (this.socket) return;

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log(" WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log(" Received:", data);

        // Gọi tất cả các callback đã đăng ký
        this.messageCallbacks.forEach((cb) => {
          if (typeof cb === "function") cb(data);
        });
      } catch (err) {
        console.error(" Failed to parse WebSocket message:", err);
      }
    };

    this.socket.onclose = () => {
      console.log(" WebSocket disconnected");
      this.socket = null;
    };

    this.socket.onerror = (error) => {
      console.error(" WebSocket Error:", error);
    };
  }

  // Thêm listener
  onMessage(callback) {
    if (typeof callback === "function") {
      this.messageCallbacks.push(callback);
    }
  }

  // Ngắt kết nối và xóa toàn bộ callback
  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.messageCallbacks = []; // clear callbacks
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
