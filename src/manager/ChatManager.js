const path = require('path');
const fs = require('fs');

class ChatManager {
    constructor(chatPath) {
        this.path = path.resolve(__dirname, '../db/', chatPath);
        this.messages = [];
        this.preload();
    }

    preload() {
        if (fs.existsSync(this.path)) {
            this.messages = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
        } else {
            this.save(this.messages);
        }
    }

    save(messages) {
        fs.writeFileSync(this.path, JSON.stringify(messages, null, 2), 'utf-8');
    }

    getMessages() {
        this.preload();
        return this.messages;
    }

    addMessage({ user, message, date }) {
        const newMessage = {
            user,
            message,
            date,
        };

        this.messages.push(newMessage);
        this.save(this.messages);

        return newMessage;
    }

    deleteDatabase() {
        this.save([]);
    }
}

module.exports = ChatManager;
