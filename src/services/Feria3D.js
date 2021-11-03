import api from "./Api";

const getStandData = () => api.get("/fair3D/stands/");

const testSend = (data) => api.put("/fair3D/configure_stand/3/", data)

export { getStandData, testSend };
