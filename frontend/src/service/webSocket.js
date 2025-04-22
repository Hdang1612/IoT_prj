// src/services/WebSocketService.js
class WebSocketService {
  constructor() {
    this.socket = null;
    this.onMessageCallback = null;
  }

  connect(url) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("🔗 WebSocket connected");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("📡 Received:", data);

      if (this.onMessageCallback) {
        this.onMessageCallback(data);
      }
    };

    this.socket.onclose = () => {
      console.log("❌ WebSocket disconnected");
    };

    this.socket.onerror = (error) => {
      console.error("⚠️ WebSocket Error:", error);
    };
  }

  onMessage(callback) {
    this.onMessageCallback = callback;
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
