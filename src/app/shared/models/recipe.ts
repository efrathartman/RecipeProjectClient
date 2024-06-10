
export interface Recipe {
    _id?: number,
    recipename?: string,
    description?: string,
    timeOfMinutes?: number,
    level?: number,
    dataAdd?: Date,
    layersOfCake?: [{description:string,ingredients:[string]}],
    instructions?: string,
    img?: string,
    isPrivate?: boolean,
    userName?: {id:string,userName:string},
    categories?: [{categoryName:string}],
}

