/**
 * 异步任务奇思妙想
 * 构建一个Task, 函数按照添加顺序一个个的执行,
 * 1. 一个任务即一个函数, 按添加顺序依次执行
 * 2. 上一个函数执行完,手动调用next才执行下一个
 * 3. 保存每一个函数执行过程中生成的数据, 供下一个函数使用
 *    即: func1 执行的结果 可以给func2使用
 * 
 * 优化:
 *    async await 实现更优雅一点
 *    暴露合适的接口供外界使用
 */

class TaskMgr {
    constructor() {
        this._ref = { "init": "init" };
        this._cur_func = null;
        this._task = null;
    }

    /**继续执行下一个函数 */
    next(data) {
        //保存上一个函数的结果
        this._ref[this._cur_func.name] = data;
        //获取下一个函数的引用
        this._cur_func = this._task.next;
        // exec or done
        this.execOne();
    }

    exec(task) {
        this._task = task;
        this._cur_func = this._task.next;
        this.execOne();
    }

    execOne() {
        if (this._cur_func) {
            this._cur_func(this, this._ref);
        } else {
            //done
            if (this._task.done) {
                console.log(this._ref);
                this.done();
            } else {
                console.log("error");
            }
        }
    }

    reset() {
        this._ref = {};
        this._cur_func = null;
        this._task = null;
    }

    done() {
        console.log("done");
    }
}

class Task {

    constructor() {
        this._len = 0;
        this._task_obj = {};
        this._exec_index = -1;
    }

    push(cb) {
        this._task_obj[this._len] = cb;
        this._len++;
        return this;
    }

    get next() {
        this._exec_index++;
        return this._task_obj[this._exec_index]
    }

    get done() {
        return this._exec_index === this._len;
    }

    get length() {
        return this._len;
    }

    reset() {
        this._len = 0;
        this._task_obj = {};
        this._exec_index = -1;
    }

    exec() {
        //TODO: 封装好直接TaskMgr调用
        //静态调用 or 全局引用调用
    }
}

let func1 = function (mgr, data) {
    console.log("func1: ", data.init);
    setTimeout(() => {
        mgr.next("func1");
    }, 1000);
}

let func2 = function (mgr, data) {
    console.log("func2: ", data.func1);
    setTimeout(() => {
        mgr.next("func2");
    }, 1000);
}

let func3 = function (mgr, data) {
    console.log("func3: ", data.func2);
    setTimeout(() => {
        mgr.next("func3");
    }, 1000);
}

let task = new Task().push(func1).push(func2).push(func3);
let taskMgr = new TaskMgr();
taskMgr.exec(task);
