/** 字典的键 */
export type KoiKey = string | symbol;

/** 字典类型 */
export type KoiDict = { [key in KoiKey]: any };

@Koi.Reg("Dict", true)
export class KoiPluginDict extends KoiPlugin {
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
  keys(dict: KoiDict) {
    return Object.keys(dict);
  }

  /**
   * 获取字段的所有域值
   * @param dict 字典
   */
  values(dict: KoiDict) {
    return Object.values(dict);
  }

  /**
   * 获取字段的所有域名和域值
   * @param dict 字典
   */
  entries(dict: KoiDict) {
    return Object.entries(dict);
  }

  /**
   * 遍历字典
   * @param dict 字典
   * @param visit 遍历方法
   */
  forEach(dict: KoiDict, visit: (k: KoiKey, v: any) => void) {
    this.keys(dict).forEach((k) => dict.hasOwnProperty(k) && visit(k, dict[k]));
  }

  /**
   * 映射字典
   * @param dict 字典
   * @param mapping 映射方法
   * @returns
   */
  mapping<T = any>(dict: KoiDict, mapping: (k: KoiKey, v: any) => T): KoiDict {
    this.forEach(dict, (k, v) => (dict[k] = mapping(k, v)));
    return dict;
  }

  /**
   * 查询字典中是否包含指定的域名
   * @param dict 字典
   * @param key 域名
   */
  exists(dict: KoiDict, key: KoiKey) {
    return dict[key] !== undefined;
  }

  /**
   * 查询字典中是否包含指定的原生域名
   * @param dict 字典
   * @param property 域名
   */
  has(dict: KoiDict, property: KoiKey) {
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
  get(dict: KoiDict, key: KoiKey) {
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
  set(dict: KoiDict, key: KoiKey, val: any) {
    dict[key] = val;
  }

  /**
   * 删除字典键值
   * @param dict 字典
   * @param key 键
   */
  unset(dict: KoiDict, key: KoiKey) {
    delete dict[key];
  }

  /**
   * 清空字典
   * @param dict 字典
   */
  clear(dict: KoiDict) {
    for (const key in dict) {
      if (this.has(dict, key)) {
        delete dict[key];
      }
    }
  }

  /**
   * 数据深拷贝（只适用于纯数据对象）
   * @param dict 字典
   */
  lossyClone(dict: KoiDict): KoiDict {
    return JSON.parse(JSON.stringify(dict));
  }

  deepClone(dict: KoiDict): KoiDict {
    if (dict == null || typeof dict !== "object") {
      return dict;
    }

    let result = null;
    if (dict instanceof Date) {
      result = new Date();
      result.setTime(dict.getTime());
    } else if (Array.isArray(dict)) {
      result = [];
      for (let i = 0, length = dict.length; i < length; i++) {
        result[i] = this.deepClone(dict[i]);
      }
    } else if (dict instanceof Object) {
      result = {} as KoiDict;
      this.forEach(dict, (k, v) => (result[k] = this.deepClone(v)));
    }

    return result;
  }

  /**
   * 挑选字典所需的属性并返回新的字典
   * @param dict 字典
   * @param props 需要保留的属性
   */
  pick(dict: KoiDict, props: KoiKey[]): KoiDict {
    const ret: KoiDict = {};
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
  omit(dict: KoiDict, props: KoiKey[]): KoiDict {
    const ret: KoiDict = {};
    this.forEach(dict, (k, v) => {
      if (props.indexOf(k) === -1) {
        ret[k] = v;
      }
    });
    return ret;
  }

  /**
   * 从原始对象上复制未定义的项到目标对象
   * @param target 目标对象
   * @param src 原始对象
   * @returns
   */
  override(target: KoiDict, src: KoiDict) {
    let unset = false;
    for (let key in src) {
      if (target[key] === undefined) {
        target[key] = src[key];
        unset = true;
      }
    }
    return unset;
  }

  /**
   * 合并字典
   * @param target 目标对象
   * @param src 原始对象
   */
  merge(target: KoiDict, src: KoiDict) {
    for (let key in src) {
      target[key] = src[key];
    }
  }
}
