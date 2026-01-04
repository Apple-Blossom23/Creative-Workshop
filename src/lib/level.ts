/**
 * 等级系统配置
 * 定义了经验值（闪电/lightning）与等级的对应关系
 */

// 等级经验值阈值配置
// 每个等级的最小经验值要求
export const LEVEL_THRESHOLDS = [
  { level: 0, minExp: 0, maxExp: 0 },        // LV0: 新注册用户（经验值为0）
  { level: 1, minExp: 0, maxExp: 199 },      // LV1: 通过入站考试（经验值0-199）
  { level: 2, minExp: 200, maxExp: 499 },    // LV2
  { level: 3, minExp: 500, maxExp: 799 },    // LV3
  { level: 4, minExp: 800, maxExp: 1299 },   // LV4
  { level: 5, minExp: 1300, maxExp: 1799 },  // LV5
  { level: 6, minExp: 1800, maxExp: 2799 },  // LV6
  { level: 7, minExp: 2800, maxExp: 3999 },  // LV7
  { level: 8, minExp: 4000, maxExp: 4999 },  // LV8
  { level: 9, minExp: 5000, maxExp: 6999 },  // LV9
  { level: 10, minExp: 7000, maxExp: 8999 }, // LV10
  { level: 11, minExp: 9000, maxExp: 11999 },  // LV11
  { level: 12, minExp: 12000, maxExp: 14999 }, // LV12
  { level: 13, minExp: 15000, maxExp: 17999 }, // LV13
  { level: 14, minExp: 18000, maxExp: 22999 }, // LV14
  { level: 15, minExp: 23000, maxExp: 27999 }, // LV15
  { level: 16, minExp: 28000, maxExp: 34999 }, // LV16
  { level: 17, minExp: 35000, maxExp: 41999 }, // LV17
  { level: 18, minExp: 42000, maxExp: 49999 }, // LV18
  { level: 19, minExp: 50000, maxExp: 59999 }, // LV19
  { level: 20, minExp: 60000, maxExp: Infinity }, // LV20: 60000及以上
];

/**
 * 获取用户显示等级
 * 优先使用后端返回的等级值，确保前后端数据一致
 * @param currentLevel 后端返回的当前等级
 * @param lightning 经验值（闪电），仅用于进度条显示，不影响等级计算
 * @returns 显示等级 (0-20)
 */
export function getLevelFromExperience(lightning: number, currentLevel: number = 0): number {
  // 直接使用后端返回的等级值，确保范围在 0-20 之间
  return Math.min(Math.max(currentLevel, 0), 20);
}

/**
 * 根据经验值计算等级（仅用于前端独立计算场景）
 * @param lightning 经验值（闪电）
 * @param hasPassedExam 是否通过入站考试（用于区分LV0和LV1）
 * @returns 计算后的等级 (0-20)
 */
export function calculateLevelFromExp(lightning: number, hasPassedExam: boolean = true): number {
  // LV0: 新注册用户，未通过入站考试
  if (!hasPassedExam) {
    return 0;
  }
  
  // 从高等级开始检查，找到第一个满足条件的等级
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 1; i--) {
    if (lightning >= LEVEL_THRESHOLDS[i].minExp) {
      return LEVEL_THRESHOLDS[i].level;
    }
  }
  
  // 通过考试但经验值为0时返回LV1
  return 1;
}

/**
 * 获取升级到下一等级所需的经验值
 * @param currentLevel 当前等级
 * @returns 下一等级所需的最小经验值，如果已是最高等级则返回 null
 */
export function getNextLevelRequirement(currentLevel: number): number | null {
  if (currentLevel >= 20) {
    return null;
  }
  return LEVEL_THRESHOLDS[currentLevel + 1]?.minExp ?? null;
}

/**
 * 计算当前等级的经验值进度百分比
 * @param lightning 当前经验值
 * @param level 当前等级
 * @returns 进度百分比 (0-100)
 */
export function getLevelProgress(lightning: number, level: number): number {
  if (level >= 20) {
    return 100;
  }
  
  const currentThreshold = LEVEL_THRESHOLDS[level];
  const nextThreshold = LEVEL_THRESHOLDS[level + 1];
  
  if (!currentThreshold || !nextThreshold) {
    return 0;
  }
  
  const currentMin = currentThreshold.minExp;
  const nextMin = nextThreshold.minExp;
  const progress = ((lightning - currentMin) / (nextMin - currentMin)) * 100;
  
  return Math.min(Math.max(progress, 0), 100);
}

/**
 * 获取等级图标路径
 * @param level 等级 (0-20)
 * @returns 图标路径
 */
export function getLevelIconPath(level: number): string {
  const safeLevel = Math.min(Math.max(level, 0), 20);
  return `/img/level/lv${safeLevel}.png`;
}
