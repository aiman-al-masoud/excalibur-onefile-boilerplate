export default interface Damageable{
    
    getCurrentHealth():number,
    
    damageBy(healthPoints:number):void,

    

}