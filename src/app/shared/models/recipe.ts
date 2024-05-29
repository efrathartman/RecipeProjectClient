
export interface Recipe {
    id?: number,
    recipename?: string,
    description?: string,
    timeOfMinutes?: number,
    level?: number,
    dateAdd?: Date,
    layersOfCake?: {description:string,ingredients:[string]},
    instructions?: string,
    img?: string,
    isPrivate?: boolean,
    userName?: {id:number,userName:string},
    categories?: {description:string},
}

