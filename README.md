<div align="center">

# 🛡️ SafeSync AI
**Crisis Intelligence for Hospitality**

![GDG Hackathon](https://img.shields.io/badge/GDG_Hackathon-Submission-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Built with Lovable](https://img.shields.io/badge/Built_with-Lovable_AI-8A2BE2?style=for-the-badge&logo=ai)
![Google Gemini](https://img.shields.io/badge/Powered_by-Gemini-8E75B2?style=for-the-badge&logo=google-bard&logoColor=white)
![Google Vertex AI](https://img.shields.io/badge/Planned-Vertex_AI-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

<img src="https://img.icons8.com/color/96/000000/artificial-intelligence.png" alt="AI Icon" width="80"/>

*A next-generation emergency management prototype built for the Google Developers Group (GDG) Hackathon.*

</div>

---

## 🌟 About The Project

**SafeSync AI** is a comprehensive crisis intelligence platform designed for the hospitality industry. Built rapidly using **Lovable AI** as part of the GDG Hackathon, this prototype demonstrates how real-time data, intuitive user interfaces, and cutting-edge **Google AI technologies** can save lives during critical emergencies (fires, natural disasters, security threats).

*Note: This is currently a functional frontend prototype showcasing 14 screens and 3 distinct user flows, designed with a clear roadmap for full backend integration with Google Cloud.*

---

## 🚀 Key Features & User Flows

Our system is divided into three critical interfaces to handle different stakeholders during a crisis:

### 📱 1. Guest Mobile App (Light Theme)
* **Target Audience:** Hotel guests and visitors.
* **Features:** Real-time push notifications, dynamic 3D evacuation mapping, and one-tap emergency SOS.
* **Flow:** `Splash → Home → Emergency → Evacuation Map`

### 👷 2. Staff Mobile App (Dark Theme)
* **Target Audience:** Hotel security, floor managers, and staff.
* **Features:** Amber alert monitoring, localized incident reporting, and guest accountability tracking.
* **Flow:** `Login → Home → Amber Alert → Full Emergency`

### 💻 3. Management Dashboard (Dark Theme)
* **Target Audience:** High-level management and emergency responders.
* **Features:** Bird's-eye view of the property, AI-driven crisis simulation, and automated post-incident reporting.
* **Flow:** `Normal → Amber → Emergency → Simulator → Report`

---

## 🧠 Google Technologies Integration (Prototype & Roadmap)

Because this project was built for the **GDG Hackathon**, our core architecture revolves around the Google ecosystem. While the frontend was generated using **Lovable AI**, the brains of the operation rely on Google's AI suite:

* 🤖 **Google Gemini (Integrated Logic):** Used to dynamically generate context-aware emergency broadcast messages for guests (translating technical amber alerts into calm, actionable instructions in multiple languages) and compiling automated post-incident action reports.
* ☁️ **Vertex AI (Planned Integration):** As the product scales, Vertex AI will be used to run predictive models on building sensor data (smoke, temperature, crowd density) to simulate potential hazards and suggest optimized evacuation routes dynamically.
* 🔥 **Firebase (Planned Infrastructure):** To handle real-time WebSockets for instantaneous guest/staff syncing during an active emergency.

---

## 🏗️ System Architecture

The following diagram illustrates how the frontend applications communicate with our AI-driven backend.

```mermaid
graph TD
    subgraph Frontend Interfaces [Rapidly Built via Lovable AI]
        G[📱 Guest App]
        S[👷 Staff App]
        D[💻 Management Dashboard]
    end

    subgraph Core Infrastructure [Planned]
        API[API Gateway / Firebase]
        DB[(Cloud SQL)]
    end

    subgraph Google Cloud Platform & AI
        GEM[🤖 Google Gemini API<br>Contextual Alerts & Reports]
        VERT[☁️ Vertex AI<br>Predictive Crisis Sim]
    end

    G <-->|Real-time WebSockets| API
    S <-->|Real-time WebSockets| API
    D <-->|REST / GraphQL| API

    API <--> DB
    API -->|Prompt injection| GEM
    API -->|Sensor Data| VERT
    VERT -.->|Simulated Models| API
    GEM -.->|Generated Text| API

    style GEM fill:#8E75B2,stroke:#fff,color:#fff
    style VERT fill:#4285F4,stroke:#fff,color:#fff
````

-----

## 🎯 Use Case Interaction

How different actors interact with the SafeSync AI ecosystem during an event:

```mermaid
flowchart LR
    %% Actors
    ActorGuest([🧑‍🤝‍🧑 Guest])
    ActorStaff([👷 Staff])
    ActorAdmin([👨‍💼 Management])

    %% Actions
    Alert((Receive Alert))
    Evacuate((Follow Evacuation))
    Report((Report Incident))
    Monitor((Monitor Zones))
    Simulate((Run AI Simulation))
    Generate((Generate Report via Gemini))

    %% Connections
    ActorGuest --> Alert
    ActorGuest --> Evacuate
    ActorGuest --> Report

    ActorStaff --> Report
    ActorStaff --> Monitor
    ActorStaff --> Evacuate

    ActorAdmin --> Monitor
    ActorAdmin --> Simulate
    ActorAdmin --> Generate

    %% Styling
    style ActorGuest fill:#1A56B0,stroke:#fff,color:#fff
    style ActorStaff fill:#10B981,stroke:#fff,color:#fff
    style ActorAdmin fill:#8B5CF6,stroke:#fff,color:#fff
```

-----

## 🛠️ Technology Stack

  * **Prototyping:** [Lovable AI](https://lovable.dev/)
  * **Framework:** React 18 & Vite
  * **Language:** TypeScript
  * **Styling:** Tailwind CSS + shadcn/ui
  * **Animations:** Framer Motion
  * **Icons:** Lucide React
  * **AI Models:** Google Gemini & Vertex AI (Roadmap)

-----

## 💻 Getting Started (Running the Prototype)

To run this prototype locally on your machine:

### Prerequisites

  * Node.js (v18 or higher)
  * npm or yarn

### Installation

1.  **Clone the repository**

    ```sh
    git clone [https://github.com/your-username/safe-sync-ai.git](https://github.com/your-username/safe-sync-ai.git)
    cd safe-sync-ai
    ```

2.  **Install dependencies**

    ```sh
    npm install
    ```

3.  **Start the development server**

    ```sh
    npm run dev
    ```

4.  **Explore the Flows**
    Open `http://localhost:8080` in your browser. From the central hub (`/`), you can navigate to the Guest, Staff, and Dashboard interactive flows.

-----

## 🏆 Hackathon Context

This project was conceptualized and developed during a **The Solution Challenge Hackathon**. The primary goal was to showcase how rapid UI generation (via Lovable) combined with powerful underlying LLMs and predictive AI (Google Gemini & Vertex AI) can disrupt traditional, slow-moving industries like hospitality safety management.

<div align="center">
<br>
<i>Designed with ❤️ to save lives.</i>
</div>
