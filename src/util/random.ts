/**
 * @param lower 上限值，包含上限值
 * @param upper 下限值，包含下限值
 * @returns 返回上限值与下限值区间中随机的一个整数
 */
export const getRandomnNum = (lower:number = 0, upper:number = 1) => {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
 }
