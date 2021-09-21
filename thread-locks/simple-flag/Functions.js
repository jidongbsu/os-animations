/// Lines for Mutex Lock


var mutexLines = [
    {text: "typedef struct __lock_t { int flag; } lock_t;",},
    {text: ""},
    {text: "void init(lock_t*mutex) {"},
    {text: "\t\t// 0 -> lock is available, 1 -> held"},
    {text: "\t\tmutex->flag = 0;"},
    {text: "}"},
    {text: ""},
    {text: "void lock(lock_t*mutex) {", index: 0, name: "lock" }, //action: () => console.log("Test the flag")},
    {text: "\t\twhile (mutex->flag == 1)  // TEST the flag", index: 1, action: function () {
       if(mutexState.value == 1){

        } else {
           this.nextLine = 3;
       }
    }},
    {text: "\t\t\t; // spin-wait (do nothing)", index: 2, action: function(){ this.nextLine = 1}},
    {text: "\t\tmutex->flag = 1;", index: 3, action: () => mutexState.value = 1},
    {text: "}", index: 4, return: 0},
    {text: "",},
    {text: "void unlock(lock_t*mutex) {", index: 5, name: "unlock"},
    {text: "\t\t//Reset to zero"},
    {text: "\t\tmutex->flag = 0;", index: 6, action: () => mutexState.value = 0},
    {text: "}", index: 7, return: 0}
];


/// Lines for demo function of critical area

var criticalFunctionLines = [{text: "void init(lock_t*mutex) {"},
    {text: "\t\t// 0 -> lock is available, 1 -> held"},
    {text: "\t\tmutex->flag = 0;"},
    {text: "}"},
    {text: "", index: -1},
    {text: "void criticalFunction() {", index: 0},
    {text: "\t\tlock(); // Obtain the lock", index: 1, func: "mutex.lock"},
    {text: "\t\t\t; // Do something critical", index: 2},
    {text: "\t\tunlock() //Release the lock;", index: 3, func: "mutex.unlock"},
    {text: "}", index: 4, return: 0},

];
