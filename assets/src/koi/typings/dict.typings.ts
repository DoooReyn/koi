/** 字典的键 */
export type KoiKey = string | symbol;

/** 字典类型 */
export type KoiDictionary = { [key in KoiKey]: any };
