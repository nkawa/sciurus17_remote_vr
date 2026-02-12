import AFRAME from 'aframe';
import {sendRobotJointMQTT, sendRobotStateMQTT} from '../lib/MQTT_jobs'
import {  isNonControlMode} from '../app/appmode';

// MQTT 送信コンポーネント for Sciurus17

function concatFloat64(...arrays) {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0);
    const result = new Float64Array(totalLength);

    let offset = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }

    return result;
}

AFRAME.registerComponent('mqtt-sender', {
	schema: {
		appmode: {type: 'string', default: ''}, // appmode を伝える
		arm: {type: 'string', default: ''}, // left or right
    left: {type: 'selector', default: '#sciurus-l-arm'}, // left arm plane
    right: {type: 'selector', default: '#sciurus-r-arm'}, // right arm plane
    lh: {type: 'selector', default: '#sciurus-lgripperB'}, // left hand gripper
    rh: {type: 'selector', default: '#sciurus-rgripperA'}, // right hand gripper
	},
  init: function(){
    console.log("mqtt-sender initialized. left:", this.data.left, " right:", this.data.right);
    if (isNonControlMode(this.data.appmode)){
      this.sendMQTT = sendRobotStateMQTT;
    }else{
      this.sendMQTT = sendRobotJointMQTT;
    }
  },
	tick: function () {
    
    const leftJointData = this.data.left.workerData?.current.joints;
    const rightJointData = this.data.right.workerData?.current.joints;

    if( leftJointData == null || rightJointData == null || leftJointData.length == undefined || rightJointData.length == undefined){
//      console.log("mqtt-sender: waiting for workerData.joints...");
    }else{
//      console.log("mqtt-sender: sending joint data via MQTT...", leftJointData, rightJointData);      
      const rh = this.data.rh.components["finger-closer"]?.jointValues
      const lh = this.data.lh.components["finger-closer"]?.jointValues
      if (rh == null || lh == null){
        console.log("mqtt-sender: waiting for finger-closer jointValues...");
        return;
      }
      const conc = Array.from(leftJointData).concat([-lh[0]]).concat(Array.from(rightJointData)).concat([-rh[0]]);
//      const conc = concatFloat64(leftJointData,[lh[0]], rightJointData,rh);
//      console.dir(this.data.lh);
      const ctrl_json = JSON.stringify({
        joints: Array.from(conc),
//        lefthand: lh[0],
//        righthand: rh[0],
//       righthand: this.data.rh.jointValues[0],
//        grip: this.data.left.gripState, // [left, right]
//        button: [this.data.left.button_a_state, this.data.left.button_b_state, this.data.right.button_a_state, this.data.right.button_b_state]
      }); 
      this.sendMQTT(ctrl_json);

    }		
  }
});

