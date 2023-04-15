export default   class Item {
    id: string;
    activityName: string;
    timeTarget: number;

    constructor (
    id: string,
    activityName: string,
    timeTarget: number){
        this.id = id;
        this.activityName = activityName;
        this.timeTarget = timeTarget
    }

    // editItem
    getActivity(): string {
        return this.activityName
    }

   editActivity(newName:string){
        this.activityName = newName
    }
    
    getTimeTarget(): number {
        return this.timeTarget
    }
    
    editTimeTarget(newTime:number) {
        this.timeTarget = newTime
    }

    // can't use set on multiple inputs
    // get editFields(): object {
    //     return (
    //         {
    //            "activityName": this.activityName,
    //             "timeTarget": this.timeTarget
    //         })
    // }
    // set editFields( activityName: string,
    //     timeTarget: number){
    //         // Add check if inputs are empty
    //         this.activityName = activityName
    //         this.timeTarget = timeTarget
    //     }

    // edit(
    //     activityName: string,
    //     timeTarget: number,
    //   ): void {
    //     this.activityName = activityName;
    //     this.timeTarget = timeTarget
    // }




    // Add to progress

    // Subtract from progress

    // *** COME BACK TO ***
    // 1. Additions to make code more robust
}