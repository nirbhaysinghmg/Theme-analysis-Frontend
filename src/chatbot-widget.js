import ReactDOM from "react-dom";
import ChatWidget from "./components/ChatWidget";
import "./components/ChatWidget.css";

// UMD export: exposes ChatBotWidget.init(...)
const ChatBotWidget = {
  init: (userConfig) => {
    // Default configuration
    const config = {
      container: "#healthcare-ai-container",
      baseUrl: "https://chatbot-theme-identifier-kzpk.onrender.com/",
      companyName: "Apollo Tyres",
      companyLogo: "/logo.png",
      primaryColor: "#0066cc",
      showButton: true,
      showGreeting: true,
      greetingText: "Need help with our products? Chat with our AI assistant!",
      introductionText:
        "Hello! I'm your Apollo assistant. How can I help you today?",
      inputPlaceholder: "Ask about tyres or services...",
      ...userConfig,
    };

    // Allow passing either a selector string or a DOM node
    const container =
      typeof config.container === "string"
        ? document.querySelector(config.container)
        : config.container;

    if (!container) {
      console.error(`Chatbot container not found: ${config.container}`);
      return;
    }

    // Create a button to open the chatbot if specified
    if (config.showButton !== false) {
      const buttonId = "healthcare-ai-button";
      let button = document.getElementById(buttonId);

      if (!button) {
        button = document.createElement("div");
        button.id = buttonId;
        button.className = "healthcare-ai-button";
        button.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
        document.body.appendChild(button);

        // Style the button
        Object.assign(button.style, {
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: config.primaryColor || "#0066cc",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: "999",
          transition: "all 0.3s ease",
        });

        // Add hover effects
        button.addEventListener("mouseenter", () => {
          button.style.transform = "scale(1.05)";
          button.style.boxShadow = "0 6px 12px rgba(0,0,0,0.3)";
        });

        button.addEventListener("mouseleave", () => {
          button.style.transform = "scale(1)";
          button.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        });

        // Add click event to open chatbot
        button.addEventListener("click", () => {
          if (window.openChatbot) {
            window.openChatbot();
          }
        });
      }
    }

    // Add greeting message if specified
    if (config.showGreeting) {
      const greetingId = "healthcare-ai-greeting";
      let greeting = document.getElementById(greetingId);

      if (!greeting) {
        greeting = document.createElement("div");
        greeting.id = greetingId;
        greeting.className = "healthcare-ai-greeting";
        greeting.innerHTML = `
          <p>${
            config.greetingText ||
            "Need help with your tyre needs? Chat with our AI assistant!"
          }</p>
          <span class="greeting-close">&times;</span>
        `;
        document.body.appendChild(greeting);

        // Style the greeting
        Object.assign(greeting.style, {
          position: "fixed",
          bottom: "90px",
          right: "20px",
          maxWidth: "300px",
          padding: "15px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          zIndex: "998",
          transition: "all 0.3s ease",
        });

        // Close button for greeting
        const closeBtn = greeting.querySelector(".greeting-close");
        if (closeBtn) {
          Object.assign(closeBtn.style, {
            position: "absolute",
            top: "5px",
            right: "10px",
            cursor: "pointer",
            fontSize: "18px",
          });

          closeBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            greeting.classList.add("hidden");
          });
        }

        // Auto-hide greeting after 8 seconds
        setTimeout(() => {
          if (greeting && !greeting.classList.contains("hidden")) {
            greeting.classList.add("hidden");
          }
        }, 8000);
      }
    }

    // Render the React ChatWidget
    ReactDOM.render(<ChatWidget config={config} />, container);
  },
};

// Make chatbot functions available globally
if (typeof window !== "undefined") {
  window.openChatbot = () => {
    const chatbot = document.getElementById("chatbot");
    const button = document.getElementById("healthcare-ai-button");
    const greeting = document.getElementById("healthcare-ai-greeting");

    if (chatbot) {
      chatbot.style.display = "block";
      requestAnimationFrame(() => {
        chatbot.classList.remove("hidden");
      });
    }

    if (button) button.style.display = "none";
    if (greeting) greeting.style.display = "none";
  };

  window.closeChatbot = () => {
    const chatbot = document.getElementById("chatbot");
    const button = document.getElementById("healthcare-ai-button");

    if (chatbot) {
      chatbot.classList.add("hidden");
      setTimeout(() => {
        chatbot.style.display = "none";
      }, 300);
    }

    if (button) button.style.display = "flex";
  };
}

export default ChatBotWidget;
