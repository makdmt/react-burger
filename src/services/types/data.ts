export interface IServerResponse<T = any> {
  readonly ok: boolean,
  readonly status: number,
  readonly url: string,
  json(): Promise<T>
}

export type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
  [Property in TDataKey]: TDataType;
} & {
  readonly success: boolean;
  readonly message?: string;
}

export interface IFetchRequest {
    method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE',
    headers: {
      [property: string]: any
    }
  }

export interface IIngredient {
  readonly _id: string,
  readonly name: string,
  readonly image: string,
  readonly price: number,
  readonly type: string,
  readonly proteins: number,
  readonly fat: number,
  readonly carbohydrates: number,
  readonly calories: number,
  readonly image_mobile: string,
  readonly image_large: string,
  readonly __v: number
}

export interface IingredientInConstructor {
  readonly uuid: string,
  readonly ingredientDetails: IIngredient
}

export type TingredientsId = ReadonlyArray<string>;
export type TAllIngredients = ReadonlyArray<IIngredient>;

export interface IingredientInBurgerConstructor extends IIngredient {
  readonly isLocked: boolean
}

export interface IFeedOrders {
  readonly total: number,
  readonly totalToday: number,
  readonly orders: ReadonlyArray<IOrderDetails>
}

export interface IOrderDetails {
  readonly _id: string,
  readonly status?: TOrderStatus,
  readonly name: string,
  readonly createdAt: string,
  readonly updatedAt?: string,
  readonly number: number | string,
  readonly ingredients: ReadonlyArray<string>
}

export interface IorderToPost {
  readonly orderNumber: number | string,
  readonly orderPostSuccess: boolean
}

export type TOrderStatus = 'done' | 'created' | 'canceled' | 'default';
export type TOrderStatusColors = 'white' | '#00CCCC' | 'red' | '#8585AD';
export type TOrderStatusCorrelation = {
  [Property in TOrderStatus]: [string, TOrderStatusColors];
};


export type TUserData = {
  readonly id: number;
  readonly name: string;
  readonly password: string;
  readonly email: string;
}

export type TUserDataForm = Omit<TUserData, 'id'>
export type TUserAuthForm = Omit<TUserData, 'id' | 'name'>
export type TUserDataServerResponce = Omit<TUserData, 'id' | 'password'>
