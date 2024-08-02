const { v4: uuidv4 } = require('uuid');

// 定义要生成的UUID数量
const count = 10; // 例如生成10个UUID

// 生成随机UUID的函数
function generateUUIDs(count) {
  const uuids = [];
  for (let i = 0; i < count; i++) {
    uuids.push(uuidv4());
  }
  return uuids;
}

// 调用函数并打印结果
const generatedUUIDs = generateUUIDs(count);
console.log('Generated UUIDs:', generatedUUIDs);