import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
// import { FBXLoader } from "./FBXLoader";

const scene = new THREE.Scene();
// scene.backgroundColor = new THREE.Color(0xffffff, 0.5);
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 0.2);
renderer.shadowMap.enabled = true;
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.OrthographicCamera(
  window.innerWidth / -300,
  window.innerWidth / 300,
  window.innerHeight / 300,
  window.innerHeight / -300,
  0.1,
  1000
);

const controls = new OrbitControls(camera, renderer.domElement);
// camera.position.set(0, 1, 5);
camera.position.set(4, 1, 2);
controls.update();

document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0xffffff, 5);
scene.add(ambient);

const directionalLight = new THREE.DirectionalLight(0xffffff, 15);
directionalLight.position.set(0, 5, 0);
directionalLight.castShadow = true;
scene.add(directionalLight);
const helper = new THREE.DirectionalLightHelper(directionalLight, 3, 0xff00ff);
// scene.add( helper );

const loader = new GLTFLoader();
let obj;
let carColor = 0x020202;
let newMaterial = new THREE.MeshPhongMaterial({ color: carColor });
const blueColor = document.getElementById("blue");
const orangeColor = document.getElementById("orange");
const blackColor = document.getElementById("black");
const getIn = document.getElementById("get-in");

loader.load(
  "../assets/car/scene.gltf",
  function (gltf) {
    obj = gltf.scene;
    obj.position.y = -0.5;
    obj.rotation.y = -2;

    // const idd = obj.getObjectById(70)
    // idd.material = 'yellow'

    const materials = [
      "LOTUSLayer10_CARblack_0",
      "LOTUSLayer2_(1)_CARchrome_0",
      "LOTUSLayer2_(2)_CARchrome_0",
      "LOTUSLayer2_(3)_CARchrome_0",
      "LOTUSLayer2_(4)_CARchrome_0",
      "LOTUSLayer6_CARcarros_0",
    ];

    for (let i = 0; i < materials.length; i++) {
      obj.getObjectByName(materials[i]).material = newMaterial;
    }
    // let wall = ;
    // wall.material = newMaterial
    blueColor.addEventListener("click", () => {
      carColor = 0x040209;
      newMaterial = new THREE.MeshPhongMaterial({ color: carColor });

      for (let i = 0; i < materials.length; i++) {
        obj.getObjectByName(materials[i]).material = newMaterial;
      }
    });
    orangeColor.addEventListener("click", () => {
      carColor = 0x090602;
      newMaterial = new THREE.MeshPhongMaterial({ color: carColor });

      for (let i = 0; i < materials.length; i++) {
        obj.getObjectByName(materials[i]).material = newMaterial;
      }
    });
    blackColor.addEventListener("click", () => {
      carColor = 0x020202;
      newMaterial = new THREE.MeshPhongMaterial({ color: carColor });

      for (let i = 0; i < materials.length; i++) {
        obj.getObjectByName(materials[i]).material = newMaterial;
      }
    });

    // console.log(idd);
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// blueColor.addEventListener("click", () => {
//   console.log(carColor);
//   carColor = "blue";
//   console.log(carColor);
//   newMaterial = new THREE.MeshPhongMaterial({ color: carColor });
// });

// const loader = new FBXLoader();
// loader.load("../assets/car/fbx/source/LOTUS_fixe.fbx", function (object) {
// //   mixer = new THREE.AnimationMixer(object);
// //   const action = mixer.clipAction(object.animations[0]);
// //   action.play();

//   object.traverse(function (child) {
//     if (child.isMesh) {
//       child.castShadow = true;
//       child.receiveShadow = true;
//     }
//   });

//   scene.add(object);
// });

const light = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
// scene.add(light);

let play = false;

const changeText = () => {
  play === true
    ? (document.getElementById("play-span").innerHTML = "<span>Pause</span>")
    : (document.getElementById("play-span").innerHTML = "<span>Play</span>");
};

getIn.addEventListener("click", () => {
  play = !play;
  changeText();
});

function animate() {
  requestAnimationFrame(animate);

  play ? (obj.rotation.y += 0.002) : obj.rotation.y === obj.rotation.y;
  controls.update();
  renderer.render(scene, camera);
}

animate();
