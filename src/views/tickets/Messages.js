import React, { useState, useEffect, useRef } from "react";
import "./messages.css"; // external CSS file

export default function ChatUI() {
    const [activeId, setActiveId] = useState(1);
    const [msg, setMsg] = useState("");
    const scrollRef = useRef();

    const contacts = [
        {
            id: 1,
            name: "Dianne Johnson",
            role: "Designer",
            avatar: "https://i.pravatar.cc/80?img=32",
            online: true,
            messages: [
                { id: 1, sender: "them", text: "Hi David, have you got the project report pdf?", time: "10:10 AM" },
                { id: 2, sender: "me", text: "NO. I did not get it", time: "10:11 AM" },


            ],
        },
        {
            id: 2,
            name: "Lisa Roy",
            role: "Product Manager",
            avatar: "https://i.pravatar.cc/80?img=12",
            online: false,
            messages: [{ id: 1, sender: "them", text: "Hi, are you available tomorrow?", time: "10:35 AM" }],
        },
    ];

    const activeChat = contacts.find((c) => c.id === activeId);

    const sendMessage = () => {
        if (!msg.trim()) return;
        activeChat.messages.push({
            id: Date.now(),
            sender: "me",
            text: msg.trim(),
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
        setMsg("");
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    };

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [activeId, activeChat.messages.length]);

    return (
        <div className="chat-app">

            {/* LEFT SIDEBAR */}
            <aside>
                <div className="profile-box">
                    <img src="https://i.pravatar.cc/100?img=4" className="profile-avatar" alt="" />
                    <div>
                        <h3 className="profile-name">David Peters</h3>
                        <p className="profile-role">Senior Developer</p>
                    </div>
                </div>

                <input className="search-box" placeholder="Search Here..." />

                <div className="contact-list">
                    {contacts.map((c) => (
                        <div
                            key={c.id}
                            className={`contact-item ${activeId === c.id ? "active" : ""}`}
                            onClick={() => setActiveId(c.id)}
                        >
                            <img src={c.avatar} className="contact-avatar" alt="" />
                            <div>
                                <div className="contact-name">{c.name}</div>
                                <div className="contact-last">{c.messages[c.messages.length - 1].text || "Attachment"}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* CHAT WINDOW */}
            <main className="chat-window">
                <div className="chat-header">
                    <img src={activeChat.avatar} className="chat-avatar" alt="" />
                    <div>
                        <h3 className="chat-name">{activeChat.name}</h3>
                        <p className="online">{activeChat.online ? "● Online" : "Offline"}</p>
                    </div>
                </div>

                <div className="chat-body" ref={scrollRef}>
                    {activeChat.messages.map((m) => (
                        <div key={m.id} className={`bubble ${m.sender}`}>
                            {m.text && <p className="bubble-text">{m.text}</p>}
                            {m.attachment && (
                                <div className="attachment">
                                    📄 {m.attachment}
                                </div>
                            )}
                            <span className="bubble-time">{m.time}</span>
                        </div>
                    ))}
                </div>

                {/* MESSAGE INPUT */}
                <div className="chat-input">
                    <textarea
                        placeholder="Write Something..."
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                    />
                    <button className="send-btn" onClick={sendMessage}>➤</button>
                </div>
            </main>
        </div>
    );
}
