export default   class Item {
    id: string;
    activityName: string;
    timeTarget: number;
    progress: number;

    constructor (
    id: string,
    activityName: string,
    timeTarget: number, progress: number){
        this.id = id;
        this.activityName = activityName;
        this.timeTarget = timeTarget;
        this.progress = progress
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

    getProgress(): number {
        return this.progress
    }

    // Add to progress
    addProgress(){
        this.progress += 1
    }
    // Subtract from progress
    removeProgress(){
        this.progress -= 1
    }
    // *** COME BACK TO ***
    // 1. Additions to make code more robust
}