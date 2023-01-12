const { ccclass, property } = cc._decorator;

@ccclass
export default class Move extends cc.Component {

    @property(cc.Node)
    target: cc.Node = null;

    start() {
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    onTouchMove(event) {

        let x = event.getDeltaX();
        let y = event.getDeltaY();
        this.target.x += x;
        this.target.y += y;
    }

}
