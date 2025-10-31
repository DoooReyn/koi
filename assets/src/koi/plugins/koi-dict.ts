import { KoiDictionary, KoiKey } from "../typings/dict.typings";

@Koi.Reg("Dict", true)
export class KoiDict extends KoiPlugin {
  readonly name = "Koi.Plugin.Dict";
  readonly version = "0.0.1";
  readonly description = "Koi Dict Plugin";
  readonly author = "Koi Team | DoooReyn";

  onAttach() {
    console.log("Koi Dict Plugin Attached");
  }

  onDetach() {
    console.log("Koi Dict Plugin Detached");
  }

  /**
   * 获取字段的所有域名
   * @param dict 字典
   */
  keys(dict: KoiDictionary) {
    return Object.keys(dict);
  }

  /**
   * 获取字段的所有域值
   * @param dict 字典
   */
  values(dict: KoiDictionary) {
    return Object.values(dict);
  }

  /**
   * 获取字段的所有域名和域值
   * @param dict 字典
   */
  entries(dict: KoiDictionary) {
    return Object.entries(dict);
  }

  /**
   * 遍历字典
   * @param dict 字典
   * @param visit 遍历方法
   */
  forEach(dict: KoiDictionary, visit: (k: KoiKey, v: any) => void) {
    this.keys(dict).forEach((k) => dict.hasOwnProperty(k) && visit(k, dict[k]));
  }

  /**
   * 映射字典
   * @param dict 字典
   * @param mapping 映射方法
   * @returns
   */
  mapping<T = any>(dict: KoiDictionary, mapping: (k: KoiKey, v: any) => T): KoiDictionary {
    this.forEach(dict, (k, v) => (dict[k] = mapping(k, v)));
    return dict;
  }

  /**
   * 查询字典中是否包含指定的域名
   * @param dict 字典
   * @param key 域名
   */
  exists(dict: KoiDictionary, key: KoiKey) {
    return dict[key] !== undefined;
  }

  /**
   * 查询字典中是否包含指定的原生域名
   * @param dict 字典
   * @param property 域名
   */
  has(dict: KoiDictionary, property: KoiKey) {
    return dict.hasOwnProperty(property);
  }

  /**
   * 获取一份原生的字典
   * @returns 原生的字典
   */
  plainDict() {
    return Object.create(null);
  }

  /**
   * 获取字典指定的键值
   * @param dict 字典
   * @param key 键
   * @returns
   */
  get(dict: KoiDictionary, key: KoiKey) {
    if (this.exists(dict, key)) {
      return dict[key];
    }
    return undefined;
  }

  /**
   * 设置字典的键值
   * @param dict 字典
   * @param key 键
   * @param val 值
   */
  set(dict: KoiDictionary, key: KoiKey, val: any) {
    dict[key] = val;
  }

  /**
   * 删除字典键值
   * @param dict 字典
   * @param key 键
   */
  unset(dict: KoiDictionary, key: KoiKey) {
    delete dict[key];
  }

  /**
   * 清空字典
   * @param dict 字典
   */
  clear(dict: KoiDictionary) {
    for (const key in dict) {
      if (this.has(dict, key)) {
        delete dict[key];
      }
    }
  }

  /**
   * 有损拷贝（只适用于纯数据对象）
   * @param dict 字典
   * @returns 有损拷贝后的字典
   */
  lossyClone(dict: KoiDictionary): KoiDictionary {
    return JSON.parse(JSON.stringify(dict));
  }

  /**
   * 深拷贝（递归处理）
   * @param dict 字典
   * @returns 深拷贝后的字典
   */
  deepClone(dict: KoiDictionary): KoiDictionary {
    if (dict === null || typeof dict !== "object") {
      return dict;
    }

    let result = null;
    if (Array.isArray(dict)) {
      result = [];
      for (let i = 0, length = dict.length; i < length; i++) {
        result[i] = this.deepClone(dict[i]);
      }
    } else if (dict instanceof Object) {
      result = {} as KoiDictionary;
      this.forEach(dict, (k, v) => (result[k] = this.deepClone(v)));
    }

    return result;
  }

  /**
   * 挑选字典所需的属性并返回新的字典
   * @param dict 字典
   * @param props 需要保留的属性
   */
  pick(dict: KoiDictionary, props: KoiKey[]): KoiDictionary {
    const ret: KoiDictionary = {};
    for (let p of props) {
      if (dict[p] != undefined) {
        ret[p] = dict[p];
      }
    }
    return ret;
  }

  /**
   * 剔除字典不需要的属性并返回新的字典
   * @param dict 字典
   * @param props 需要剔除的属性
   * @returns
   */
  omit(dict: KoiDictionary, props: KoiKey[]): KoiDictionary {
    const ret: KoiDictionary = {};
    this.forEach(dict, (k, v) => {
      if (props.indexOf(k) === -1) {
        ret[k] = v;
      }
    });
    return ret;
  }

  /**
   * 从原始对象上复制未定义的项到目标对象
   * @param dst 目标对象
   * @param src 原始对象
   * @returns
   */
  override(dst: KoiDictionary, src: KoiDictionary) {
    let unset = false;
    for (let key in src) {
      if (dst[key] === undefined) {
        dst[key] = src[key];
        unset = true;
      }
    }
    return unset;
  }

  /**
   * 合并字典
   * @param dst 目标对象
   * @param src 原始对象
   */
  merge(dst: KoiDictionary, src: KoiDictionary) {
    for (let key in src) {
      dst[key] = src[key];
    }
  }

  /**
   * 冻结字典（递归处理）
   * @param dict 字典
   * @returns 冻结后的字典
   */
  freeze(dict: KoiDictionary) {
    return Object.freeze(dict);
  }
}
