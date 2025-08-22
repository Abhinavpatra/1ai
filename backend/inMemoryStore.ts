import type {Message} from './types';

const EVICTION_TIME = 5*60*1000;
const EVICTION_CLOCK_TIME = 5*60*1000;

export class InMemoryStore{
    private static store: InMemoryStore;
    private store: Record<string,{
        message: Message[],
        evictionTime: Date
    }>;


    private clock: NodeJS.Timeout;// the type of this. comes from the Nodejs

    private constructor(){
        this.store={};
        this.clock = setInterval(()=>{
            Object.entries(this.store).forEach(([key, {evictionTime}])=>{
                if(evictionTime.getTime() > Date.now()){
                    delete this.store[key]
                }
            });
        }, EVICTION_CLOCK_TIME)
    }

    public destroy(){
        clearInterval(this.clock)
    }

    static getInstance(){
        if(!InMemoryStore.store){
            InMemoryStore.store = new InMemoryStore();
        }
        return InMemoryStore.store;
    }
    add(conversationId: string, message: Message){
        if(!this.store[conversationId]){
            this.store[conversationId] = {
                message:[],
                evictionTime: Date.now() +EVICTION_TIME
            }
        }
    }
}