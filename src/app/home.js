"use client";
import 'aframe';
import * as React from 'react'
const THREE = window.AFRAME.THREE; // これで　AFRAME と　THREEを同時に使える

import { AppMode } from './appmode.js';

//import VrControllerComponents from '../components/VrControllerComponents.jsx';

//import '../compo_aframe/motionFilter.js'

import '@ucl-nuee/robot-loader/robotRegistry.js';
import '@ucl-nuee/robot-loader/robotLoader.js';
import '@ucl-nuee/robot-loader/ikWorker.js';
import '@ucl-nuee/robot-loader/reflectWorkerJoints.js';
import '@ucl-nuee/robot-loader/armMotionUI.js';
import '@ucl-nuee/robot-loader/vrControllerThumbMenu.js';
import '@ucl-nuee/robot-loader/axesFrame.js';
//import '@ucl-nuee/robot-loader/baseMover.js';
import '@ucl-nuee/robot-loader/attachToAnother.js';


import '@ucl-nuee/robot-loader/reflectCollision.js';
import '@ucl-nuee/robot-loader/reflectJointLimits.js';
import '@ucl-nuee/robot-loader/ChangeOpacity.js';
import '@ucl-nuee/robot-loader/fingerCloser.js';

//import '../compo_aframe/ChangeOpacity.js';
import '../compo_aframe/mqttSender.js';
import '../compo_aframe/abButtonControl.js';
import '../compo_aframe/xyButtonControl.js';
import '../compo_aframe/gripControl.js';


import { getCookie } from '../lib/cookie_id.js';
import { setupMQTT } from '../lib/MQTT_jobs.js';

import StereoVideo from '../components/stereoWebRTC.js';



// 角度、横方向のオフセットを Cookie から取得して初期化
const getCookiesForInitalize = (appmode, setVrModeAngle, setVrModeOffsetX) => {
  // Cookie, Offsetの取得
  if (!(appmode === AppMode.viewer)) {
    const wk_vrModeAngle = getCookie('vrModeAngle')
    setVrModeAngle(wk_vrModeAngle ? parseFloat(wk_vrModeAngle) : 180);  // change default to 90
    const wk_vrModeOffsetX = getCookie('vrModeOffsetX')
    setVrModeOffsetX(wk_vrModeOffsetX ? parseFloat(wk_vrModeOffsetX) : 0.55); // デフォルト X 方向オフセット
    // console.log("Cookie read vrModeAngle, OffsetX:", vrModeAngle_ref.current, vrModeOffsetX_ref.current);
  }
}


export default function Home(props) {
  const robotIDRef = React.useRef("robot_id_reference"); // ロボットUUID 保持用

  const [vrModeAngle, setVrModeAngle] = React.useState(90);       // ロボット回転角度
  const [vrModeOffsetX, setVrModeOffsetX] = React.useState(0.35);   // X offset
  const [base_rotation, setBaseRotation] = React.useState(`-90 90 0`);     // ベース角度
  const [base_position, setBasePosition] = React.useState(`0.35 0.75 -1`);   // ベース位置

  const [draw_ready, set_draw_ready] = React.useState(false)

  const [debug_message, set_debug_message] = React.useState("")
  const add_debug_message = (message) => {
    set_debug_message((prev) => (prev + " " + message))
  }

  const [rtcStats, set_rtcStats] = React.useState([])

  const rightArm_ref = React.useRef(null);
  const leftArm_ref = React.useRef(null);

  const right_control = React.useRef(null);
  const left_control = React.useRef(null);

  const toSchema = (obj, separator='; ') => {
    if (typeof obj !== 'object' || obj === null) {
      return String(obj);
    }
    if (Array.isArray(obj)) {
      return obj.map((v) => toSchema(v, ',')).join(', ');
    }
    return Object.entries(obj)
      .map(([key, value]) => `${key}: `+toSchema(value,','))
      .join(separator);
  };
  const deg30 = Math.PI / 6.0;
  const deg90 = Math.PI / 2;
  const deg67 = Math.PI * 3 / 8;
  const deg45 = Math.PI / 4;
  const deg22 = Math.PI / 8;

  // モードに応じて初期ポーズを変更
  let initial_pose = `${-deg90}, ${-deg90}, ${-deg90}, 0, ${deg90}, 0`;
  if (props.appmode === AppMode.simRobot) {
    initial_pose = `${deg45}, ${-deg90}, ${deg45}, 0, ${-deg90}, 0`;
  }

  // MQTT 対応
  React.useEffect(() => {
    console.log("Home useEffect for MQTT setup");
    setupMQTT(props, robotIDRef, rightArm_ref, leftArm_ref, set_draw_ready); // useEffect で1回だけ実行される。


  }, []);

  // Cookie から初期値取得
  React.useEffect(() => {
    getCookiesForInitalize(props.appmode, setVrModeAngle, setVrModeOffsetX);
  }, []);
  // base_position, base_rotation 更新
  React.useEffect(() => {
    setBasePosition(`${vrModeOffsetX} 0.75 -1`);
    setBaseRotation(`-90 ${vrModeAngle} 0`);
    console.log("Home base_pos, rotation:", base_position, base_rotation);
  }, [vrModeAngle, vrModeOffsetX]);


  /*
  React.useEffect(() => {
    console.log("Draw Ready!", draw_ready);
    if(draw_ready){// ここでメニュー選択を実施しちゃう！
    // 右手メニュー
//        console.log("Draw Ready! with control",right_control.current, left_control.current);
        right_control.current?.emit('thumbmenu-select', {
          index: 0,
          texts: ["g1r-unitree-r-arm","ray","g1l-unitree-l-arm"]
        });
        left_control.current?.emit('thumbmenu-select', {
          index: 0,
          texts: ["g1l-unitree-l-arm","g1l-unitree-l-arm","ray"]
        });

    }
  }, [draw_ready]);
*/

  return (
    <>
      <a-scene xr-mode-ui={`enabled: ${!(props.appmode === AppMode.viewer) ? 'true' : 'false'}; XRMode: xr`} >

        <a-entity id="robot-registry"
          robot-registry
        ></a-entity>

        <a-entity right-controller
          ref={right_control}
          laser-controls="hand: right"
          thumbstick-menu="items: ray; laser: false"
          target-selector="id: sciurus-r-arm"
          event-distributor
          visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
        <a-entity left-controller
          ref={left_control}
          laser-controls="hand: left"
          thumbstick-menu="items: ray; laser: false"
          target-selector="id: sciurus-l-arm"
          event-distributor
          visible="false">
          <a-entity a-axes-frame="length: 0.1" />
        </a-entity>
        <a-entity camera position="0 1.7 1"
          look-controls
          wasd-controls="acceleration: 200"
        ></a-entity>

        <a-camera id="camera" stereocam position="0 1.1 0.2"></a-camera>


        {  // ステレオカメラ使うか extra-camera={props.appmode}>
          (props.appmode === AppMode.withCam || props.appmode === AppMode.withDualCam || props.appmode === AppMode.viewer) ?
            <StereoVideo rendered={draw_ready} set_rtcStats={set_rtcStats}
              appmode={props.appmode}
            /> : <></>
        }


        <a-plane id="sciurus17"
          position="0.0 0.5 -0.5" rotation="-90 0 90"
          width="0.4" height="0.4" color="tan"
          mqtt-sender={`left: #sciurus-l-arm; right: #sciurus-r-arm; lh: #sciurus-lgripperB; rh: #sciurus-rgripperA; appmode: ${props.appmode}`}
        >

          <a-plane id="sciurus-l-arm"
            ref={leftArm_ref}
            position="0.0 0.0 0.0" rotation="0 0 0"
            width="0.1" height="0.1" color="tan"
            material="opacity: 0.5; transparent: true; side: double;"
            robot-loader="model: sciurus17left"
            ik-worker={
              toSchema([0, -deg22, deg45, -deg45, -deg90, 0, deg67, 0])}
            joint-desirable={
                   toSchema({gain: {1:21, 2:21, 6:21},
                    			    upper: {1:-deg45, 2:deg67, 6:deg67},
			                        lower: {1:-deg45, 2:deg67, 6:deg67}})}
            joint-desirable-vlimit="all: 0.5"
            joint-weight="override: 0:0.0064"
            reflect-worker-joints
            reflect-collision="color: yellow"
            reflect-joint-limits
            add-frame-to-joints="from: 0; to: 1"
            arm-motion-ui
            grip-control
            base-mover="velocityMax: 0.2; angularVelocityMax: 0.5"
            change-original-color-recursively="color: azure"

          >
            <a-circle id="sciurus-lgripperA"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17lgripperA"
                    attach-to-another="to: sciurus-l-arm;event: x,y"
                    finger-closer={toSchema({closeMax: 0, openMax: -45,
                                             closeEvent: 'xbuttondown',
                                             closeStopEvent: 'xbuttonup',
                                             openEvent: 'ybuttondown',
                                             openStopEvent: 'ybuttonup'})}
            />
            <a-circle id="sciurus-lgripperB"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17lgripperB"
                    attach-to-another="to: sciurus-l-arm;event: x,y"
                    finger-closer={toSchema({closeMax: 0, openMax: -45,
                                             closeEvent: 'xbuttondown',
                                             closeStopEvent: 'xbuttonup',
                                             openEvent: 'ybuttondown',
                                             openStopEvent: 'ybuttonup'})}
            />
          </a-plane>

          <a-plane id="sciurus-r-arm"
            ref={rightArm_ref}
            position="0.0 0.0 0.0" rotation="0 0 0"
            width="0.1" height="0.1" color="white"
            material="opacity: 0.5; transparent: true; side: double;"
            robot-loader="model: sciurus17right"
            attach-to-another="to: sciurus-l-arm; axis: 1"
            ik-worker={
                   toSchema([deg22, -deg45, deg45, deg90, 0, -deg67, 0])}
            joint-desirable={
                   toSchema({gain: {0:21, 1:21, 5:21},
                              upper: {0:deg45, 1:-deg67, 5:-deg67},
			                        lower: {0:deg45, 1:-deg67, 5:-deg67}})}
            joint-desirable-vlimit="all: 0.5"
            reflect-worker-joints
            reflect-collision="color: yellow"
            reflect-joint-limits
            arm-motion-ui
            grip-control
            change-original-color-recursively="color: azure"

          >
            <a-circle id="sciurus-rgripperA"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17rgripperA"
                    attach-to-another="to: sciurus-r-arm;event: a,b"
                    finger-closer="closeMax: 0;openMax: 45;"
            />
            <a-circle id="sciurus-rgripperB"
                    radius="0.03" color="blue"
                    robot-loader="model: sciurus17rgripperB"
                    attach-to-another="to: sciurus-r-arm;event: a,b"
                    finger-closer="closeMax: 0;openMax: 45;"
            />
          </a-plane>
        </a-plane>




      </a-scene>
    </>
  );


}