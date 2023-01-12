const { executeInEditMode, ccclass, property } = cc._decorator;

@ccclass
@executeInEditMode
export default class ReactArc extends cc.Component {
    @property(cc.Node)
    target: cc.Node = null;

    @property
    maxRange = 0.3;
    @property
    minRange = 0.05;

    _face: cc.Sprite = null;
    get face() {
        if (!this._face) {
            this._face = this.getComponent(cc.Sprite);
        }
        return this._face;
    }

    update(dt: number) {
        if (!CC_EDITOR) {
            if (cc.isValid(this.target)) {
                let sub = this.target.position.sub(this.node.position);
                let dis = sub.mag();
                let rad = cc.v2(sub).signAngle(cc.Vec2.RIGHT);
                let deg = cc.misc.radiansToDegrees(rad) + 180;

                this.face.fillRange = (1 - (dis / 50)) * (this.maxRange - this.minRange);

                if (this.face.fillRange < 0.05) {
                    this.face.fillRange = 0.05;
                }
                else if (this.face.fillRange > 0.3) {
                    this.face.fillRange = 0.3;
                }
                this.face.fillStart = (-deg / 360 - this.face.fillRange / 2);

            }
        }
    }
}