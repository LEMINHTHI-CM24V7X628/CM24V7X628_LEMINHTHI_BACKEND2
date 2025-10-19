// app/services/contact.service.js
const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
        // Gán collection vào biến this.Contact để các hàm khác sử dụng
        // client.db() sẽ lấy database, và .collection('contacts') sẽ lấy collection
        this.Contact = client.db().collection("contacts"); 
    }

    extractContactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Loại bỏ các trường undefined
        Object.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
    }

    async create(payload) {
        const contact = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            contact,
            { $set: { favorite: contact.favorite === true } },
            { returnDocument: "after", upsert: true } // Thêm upsert: true để tạo mới nếu không tìm thấy
        );
        return result.value;
    }

    async find(filter) {
        // Dùng this.Contact để gọi hàm find()
        const cursor = await this.Contact.find(filter); 
        return await cursor.toArray();
    }

    async findByName(name) {
        // Dùng biểu thức chính quy (regex) để tìm kiếm không phân biệt chữ hoa/thường
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async delete(id) {
        const result = await this.Contact.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }

    async deleteAll() {
        const result = await this.Contact.deleteMany({});
        return result.deletedCount;
    }

    async findFavorite() {
        return await this.find({ favorite: true });
    }
}

module.exports = ContactService;