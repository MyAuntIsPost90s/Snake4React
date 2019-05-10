import BaseProp from './BaseProp'

export default interface DvaProp extends BaseProp {

  loading: any;   //暂不定义

  dispatch(obj: { type: string, payload?: any | null }): Promise<any>;

  routing: any;   //暂不定义
}
