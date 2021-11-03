import api from "./Api";

const getMessagesByUser = (id) => []; // api.get('/messages/', id);

const getChatList = () => api.get("/human_resources/admin/users_group_chat/");

export { getMessagesByUser, getChatList };
