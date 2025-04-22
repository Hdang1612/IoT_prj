class WebSocketService {
    constructor() {
      this.socket = null;
    }
  
    connect(url) {
      this.socket = new WebSocket(url);
  
      this.socket.onopen = () => {
        console.log("🔗 Connected to WebSocket server");
      };
  
      this.socket.onmessage = (event) => {
        console.log("📡 Received data:", JSON.parse(event.data));
      };
  
      this.socket.onclose = () => {
        console.log("❌ Disconnected from WebSocket server");
      };
  
      this.socket.onerror = (error) => {
        console.error("⚠️ WebSocket Error:", error);
      };
    }
  
    sendMessage(message) {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      } else {
        console.error("🚫 WebSocket is not connected.");
      }
    }
  
    close() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  
  const webSocketService = new WebSocketService();
  export default webSocketService;
  