/**
 * 处理本地存储的相关方法
 */

// 获取本地存储数据
export const getItem = (name) => {
    // 获取未经处理的本地数据
    const names = localStorage.getItem(name)
    // 交由trycatch处理
    try {
        // 将其转化为string，若是成功则返回转化后的数据
        return JSON.parse(names);
    } catch (error) {
        // 转化失败则说明获取的数据非对象类型，可直接返回
        return names;
    };
};

// 添加本地存储数据
export const setItem = (name, value) => {
    // 判断用户传入的数据类型是否为对象
    // 是则将其转为字符串设置--不是则直接设置
    if ((typeof value) === 'Object') {
        let values = JSON.stringify(value);
        localStorage.setItem(name, values);
    } else {
        localStorage.setItem(name, value);
    }

};

// 移除本地存储数据
export const removeItem = name => {
    localStorage.removeItem(name);
}