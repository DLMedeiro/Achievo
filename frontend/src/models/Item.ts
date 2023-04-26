export default   class Item {
    id: string;
    start: string;
    end: string;
    activity: string;
    target: number;
    progress: number;

    constructor (
    id: string,
    start: string, 
    end: string,          
    activity: string,
    target: number,
    progress: number,){
        this.id = id;
        this.start = start;
        this.end = end;
        this.activity = activity;
        this.target = target;
        this.progress = progress
    }

    // editItem
    getActivity(): string {
        return this.activity
    }

   editActivity(newName:string){
        this.activity = newName
    }
    
    getTimeTarget(): number {
        return this.target
    }
    
    editTimeTarget(newTime:number) {
        this.target = newTime
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