cocos creator version: 2.x

2d 简单光影效果实现


核心代码:
`
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
`

参考:  https://forum.cocos.org/t/topic/125861