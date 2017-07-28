var initScene,
  render,
  renderer,
  scene,
  camera,
  box,
  floor,
  player,
  playerMaterial,
  keyboard = {},
  speed = 0.005;

var friction = 0.8; // high friction
var restitution = 0.3; // low restitution

Physijs.scripts.worker = "scripts/physijs_worker.js";
Physijs.scripts.ammo = "../ammo.js";

initScene = function() {
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("viewport").appendChild(renderer.domElement);

  scene = new Physijs.Scene({ reportsize: 50, fixedTimeStep: 1 / 60 });

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  scene.add(camera);

  var material = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color: 0x888888 }),
    friction,
    restitution
  );

  var playerMaterial = Physijs.createMaterial(
    new THREE.MeshBasicMaterial({ color: "red" }),
    friction,
    restitution
  );

  // Box
  box = new Physijs.BoxMesh(
    new THREE.CubeGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: "white" })
  );

  floor = new Physijs.BoxMesh(new THREE.CubeGeometry(15, 15), material);

  player = new Physijs.BoxMesh(new THREE.CubeGeometry(1, 1, 1), playerMaterial);

  player.position.set(0, 0.5, 7);

  box.position.y = 30;

  floor.rotation.x = Math.PI / 2;
  scene.add(box);
  scene.add(floor);
  scene.add(player);

  setInterval(function() {
    camera.position.set(
      player.position.x,
      player.position.y,
      player.position.z
    );
  }, 16);

  requestAnimationFrame(render);
};

render = function() {
  scene.simulate(); // run physics
  renderer.render(scene, camera); // render the scene
  //   player.__dirtyPosition = true;

  if (keyboard[65]) {
    player.setLinearVelocity(new THREE.Vector3(-2, 0, 0));
  }

  if (keyboard[68]) {
    player.setLinearVelocity(new THREE.Vector3(2, 0, 0));
  }

  if (keyboard[87]) {
    player.setLinearVelocity(new THREE.Vector3(0, 0, -2));
  }

  if (keyboard[83]) {
    player.setLinearVelocity(new THREE.Vector3(0, 0, 2));
  }

  if (keyboard[32]) {
    player.setLinearVelocity(new THREE.Vector3(0, 1, 0));
  }

  requestAnimationFrame(render);
};

function keyDown(event) {
  keyboard[event.keyCode] = true;
}

function keyUp(event) {
  keyboard[event.keyCode] = false;
}

window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);

window.onload = initScene();

// var scene,
//   camera,
//   renderer,
//   keyboard,
//   speed = 0.05,
//   jumping = false,
//   velocity = new THREE.Vector3();

// scene = new THREE.Scene();
// camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// keyboard = {};
// var cameraForwardDirection = new THREE.Vector3(0,0,-1).applyMatrix4(camera.matrixWorld);
// var ray = new THREE.Raycaster(camera.position, cameraForwardDirection, camera.position, 1);

// renderer = new THREE.WebGLRenderer();

// renderer.setSize(window.innerWidth, window.innerHeight);

// document.body.appendChild(renderer.domElement);

// let cube = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true
//   })
// );

// cube.position.x = 1;
// cube.position.z = 1;

// let floor = new THREE.Mesh(
//   new THREE.BoxGeometry(15, 15),
//   new THREE.MeshBasicMaterial({
//     color: "skyblue",
//     wireframe: true
//   })
// );

// floor.rotation.x += Math.PI / 2;
// cube.position.y += 0.5;

// scene.add(cube, floor);

// camera.position.set(0, 1, 5);

// var lastTs = 0;

// function animate(ts) {
//   requestAnimationFrame(animate);
//   renderer.render(scene, camera);

//   let dt = (ts - lastTs) / 1000;

//   lastTs = ts;

//   if (keyboard[65]) {
//     camera.position.x -= speed;
//   }

//   if (keyboard[68]) {
//     camera.position.x += speed;
//   }

//   if (keyboard[87]) {
//     camera.position.z -= speed;
//   }

//   if (keyboard[83]) {
//     camera.position.z += speed;
//   }

//   if (camera.position.y !== 1) {
//     camera.position.y = camera.position.y / 1;
//   }

//   if (keyboard[32]) {
//   }
//   checkPlayerBounds();
//   checkColBoxes();
// }

// function keyDown(event) {
//   keyboard[event.keyCode] = true;
// }

// function keyUp(event) {
//   keyboard[event.keyCode] = false;
// }

// window.addEventListener("keydown", keyDown);
// window.addEventListener("keyup", keyUp);

// function checkPlayerBounds() {
//   if (camera.position.x > 7.5) {
//     camera.position.x = 7.5;
//   } else if (camera.position.z < -7.5) {
//     camera.position.z = -7.5;
//   }

//   if (camera.position.x < -7.5) {
//     camera.position.x = -7.5;
//   } else if (camera.position.z > 7.5) {
//     camera.position.z = 7.5;
//   }
// }

// function checkColBoxes() {
//   var distance = Math.sqrt(
//     (cube.position.x - camera.position.x) *
//       (cube.position.x - camera.position.x) +
//       (cube.position.y - camera.position.y) *
//         (cube.position.y - camera.position.y) +
//       (cube.position.z - camera.position.z) *
//         (cube.position.z - camera.position.z)
//   );

//   if (distance < 1) {
//     console.log(ray);
//   }
// }

// animate();
